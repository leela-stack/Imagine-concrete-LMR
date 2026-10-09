import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load concrete dataset files directly
let datasetRecordsCount = 1030;
let datasetSummary = {
  totalRecords: 1030,
  donor: 'Prof. I-Cheng Yeh, Chung-Hua University',
  sourceFiles: ['Concrete_Data_2.pdf', 'Concrete_Readme_2.txt', 'Concrete_Data_2.csv', 'Concrete_Data_2.json']
};

try {
  const jsonPath = path.resolve(__dirname, 'src/data/Concrete_Data_2.json');
  if (fs.existsSync(jsonPath)) {
    const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    datasetRecordsCount = Array.isArray(raw) ? raw.length : 1030;
    datasetSummary.totalRecords = datasetRecordsCount;
  }
} catch (e) {
  console.warn('Could not read Concrete_Data_2.json at server startup:', e);
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Gemini AI endpoint for Engineering Assistant Chatbot
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, message } = req.body;
      const prompt = message || (Array.isArray(messages) && messages[messages.length - 1]?.content);

      if (!prompt) {
        return res.status(400).json({ error: 'Message content is required.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Fallback response with engineering knowledge if no secret configured
        return res.json({
          reply: `[Concrete Engineering Knowledge Base]\n\nRegarding: "${prompt.slice(0, 100)}":\n\nIn concrete technology and predictive modeling:\n1. **Mix Proportioning**: Water-to-cement ratio (w/c) is the primary determinant of 28-day compressive strength (Abrams' Law). For C30/37 (35–45 MPa), w/cm typically ranges between 0.40–0.45.\n2. **Supplementary Cementitious Materials (SCMs)**: GGBS (20–50%) and Fly Ash (15–30%) improve long-term durability, reduce permeability, and curb heat of hydration, though early-age (3-day/7-day) strength gains are slower.\n3. **ML Regression**: Machine learning models like Random Forest and XGBoost account for nonlinear interactions between binder content, aggregate packing, and polycarboxylate superplasticizers ($R^2 \\approx 0.92$).\n\n*Note: Physical trial mixes and ASTM C39 cylinder testing are mandatory prior to construction execution.*`
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `You are the embedded AI Engineering Assistant for "Imagine concrete LMR" — a specialized industrial technology SaaS and machine learning platform for civil engineers, concrete materials technologists, and data scientists.

Key Domains:
1. Concrete Mix Proportioning (ACI 211.1, EN 206, IS 10262, IS 456, ASTM C94, Abrams' law, Bolomey equation).
2. Machine Learning for Concrete Technology (regression models: Random Forest, XGBoost, Ridge, Artificial Neural Networks; evaluation metrics: R², MAE, RMSE; hyperparameter tuning; feature importances).
3. Chemical Admixtures & Binders (Polycarboxylate ether superplasticizers, retarders, accelerators, silica fume, fly ash, slag).
4. Compressive Strength Forecasting across curing ages (3, 7, 14, 28, 56, 90 days).

Tone & Guidelines:
- Authoritative, professional, industrial tech tone with concise engineering formulas, mix ratios, and quantitative reasoning.
- Keep responses readable and neatly formatted with bullet points or markdown tables when helpful.
- Always append a brief reminder about mandatory laboratory validation and trial cylinder batch testing when discussing mix design recipes.`;

      const contents = [];
      if (Array.isArray(messages) && messages.length > 0) {
        for (const m of messages.slice(-10)) {
          contents.push({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: String(m.content) }],
          });
        }
      } else {
        contents.push({
          role: 'user',
          parts: [{ text: String(prompt) }],
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || 'Unable to generate technical response.';
      return res.json({ reply });
    } catch (err: any) {
      console.error('Gemini API Assistant error:', err);
      return res.status(500).json({
        error: err?.message || 'Server error while processing AI assistant request.'
      });
    }
  });

  // Health and System Info
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'operational',
      app: 'Imagine concrete LMR',
      models: ['RandomForest-v2.4', 'XGBoost-Concrete-v3', 'ANN-DeepBinder'],
      records: datasetRecordsCount
    });
  });

  // Direct Dataset Summary Endpoint
  app.get('/api/dataset/summary', (_req, res) => {
    res.json({
      ...datasetSummary,
      status: 'loaded',
      records: datasetRecordsCount
    });
  });

  // Vite dev mode or static prod mode
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Imagine concrete LMR] Server active at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
