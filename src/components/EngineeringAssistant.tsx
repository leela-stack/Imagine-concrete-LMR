import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  RotateCcw, 
  Check, 
  Copy, 
  Terminal, 
  HelpCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const PRESET_QUERIES = [
  "How does GGBS blast furnace slag alter heat of hydration & 28d strength?",
  "Calculate target mean strength (f'cr) for specified f'c = 40 MPa per ACI 318",
  "Why does XGBoost achieve higher R² than linear regression on concrete data?",
  "Optimal polycarboxylate superplasticizer dosage for 0.35 W/C high-strength mixes"
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'intro-1',
    role: 'assistant',
    content: `[AI ENGINEERING ASSISTANT // IMAGINE CONCRETE LMR]\n\nSystem initialized for civil engineers and materials technologists.\n\nTechnical Coverage:\n- Concrete Mix Proportioning (ACI 211.1, EN 206, IS 10262, Abrams' Law)\n- Machine Learning Technology (Regression metrics R², MAE, RMSE, XGBoost, Random Forest)\n- Supplementary Cementitious Materials (Fly Ash, Slag GGBS, Silica Fume)\n- Hydration Kinetics & Compressive Yield Forecasting\n\nEnter your query or select a technical prompt below.`,
    timestamp: 'INITIALIZED'
  }
];

export function EngineeringAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const promptToSend = (customPrompt || inputPrompt).trim();
    if (!promptToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            role: m.role,
            content: m.content
          })),
          message: promptToSend
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No technical response was returned.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `**NOTICE:** Unable to connect to backend AI agent. ${err?.message || 'Check network connection'}.\n\n*Technical Tip:* Abrams' Law defines f'c = A / B^(w/c). Mandatory physical trial cylinder validation required per ASTM C39.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <section id="assistant" className="py-20 w-full relative z-10 scroll-mt-20 border-b-2 border-black bg-[#eceff1]">
      <div className="mx-auto w-full max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111827] text-white border-2 border-black text-[11px] font-mono font-bold uppercase tracking-wider mb-4 shadow-[2px_2px_0px_0px_#ff5500]">
              <Bot className="w-3.5 h-3.5 text-[#ff5500]" />
              SECTION 04 // DOMAIN KNOWLEDGE AGENT
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111827]">
              AI ENGINEERING <span className="text-[#ff5500]">ASSISTANT</span>
            </h2>
            <p className="text-slate-700 mt-2 text-sm md:text-base font-semibold max-w-2xl leading-relaxed">
              Technical Q&amp;A interface for concrete mix design, machine learning concepts, and strength prediction.
            </p>
          </div>

          <button
            onClick={handleResetChat}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black text-black hover:bg-[#ff5500] hover:text-white font-mono text-xs font-bold uppercase shadow-[3px_3px_0px_0px_#111827] transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            RESET TERMINAL
          </button>
        </div>

        {/* Brutalist Chatbot Container */}
        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#111827] flex flex-col h-[650px] font-mono">
          
          {/* Terminal Header Bar */}
          <div className="px-5 py-3.5 bg-[#111827] text-white border-b-2 border-black flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-[#ff5500] text-black border border-black flex items-center justify-center font-bold">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-white">IMAGINE CONCRETE LMR // ENGINEERING COPILOT</h3>
                <p className="text-[10px] text-slate-400">ENGINE: GEMINI-3.8-FLASH &bull; PROTOCOL: ACI / ASTM / EN</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#ff5500] animate-pulse" />
              <span className="text-[11px] text-[#ff5500] font-bold">SYSTEM ONLINE</span>
            </div>
          </div>

          {/* Preset Chips */}
          <div className="p-3 bg-[#f3f4f6] border-b-2 border-black overflow-x-auto flex items-center gap-2">
            <span className="text-[11px] font-bold text-black uppercase tracking-wider shrink-0 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-[#ff5500]" />
              PRESETS:
            </span>
            {PRESET_QUERIES.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(preset)}
                disabled={isLoading}
                className="whitespace-nowrap px-3 py-1 bg-white border border-black text-black hover:bg-[#ff5500] hover:text-white text-xs font-bold transition-all shadow-[1px_1px_0px_0px_#111827] shrink-0 disabled:opacity-50"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#e5e7eb]/40">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-3xl ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center shrink-0 mt-1 border-2 border-black shadow-[2px_2px_0px_0px_#111827] ${
                      isAssistant ? 'bg-[#ff5500] text-white' : 'bg-[#111827] text-white'
                    }`}
                  >
                    {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1">
                    <div
                      className={`p-4 border-2 border-black text-xs md:text-sm leading-relaxed ${
                        isAssistant
                          ? 'bg-white text-black shadow-[4px_4px_0px_0px_#111827]'
                          : 'bg-[#111827] text-white shadow-[4px_4px_0px_0px_#ff5500]'
                      }`}
                    >
                      <div className="whitespace-pre-wrap font-mono">
                        {msg.content}
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 px-1 text-[10px] text-slate-500 ${isAssistant ? '' : 'justify-end'}`}>
                      <span>{msg.timestamp}</span>
                      {isAssistant && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="hover:text-black transition-colors p-0.5"
                          title="Copy message"
                        >
                          {copiedId === msg.id ? <Check className="w-3 h-3 text-[#ff5500]" /> : <Copy className="w-3 h-3" />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 max-w-3xl mr-auto">
                <div className="w-8 h-8 bg-[#ff5500] text-white border-2 border-black flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 bg-white border-2 border-black text-black text-xs shadow-[3px_3px_0px_0px_#111827] flex items-center gap-2 font-mono">
                  <Sparkles className="w-4 h-4 text-[#ff5500] animate-spin" />
                  <span>SYNTHESIZING CONCRETE KINETICS &amp; REGRESSION FORMULAS...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-white border-t-2 border-black">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask about water-cement ratios, GGBS replacement, XGBoost R², or ASTM C39..."
                disabled={isLoading}
                className="flex-1 bg-[#f8f9fa] border-2 border-black px-4 py-3 text-xs md:text-sm text-black placeholder-slate-400 focus:outline-none focus:border-[#ff5500] font-mono shadow-inner disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !inputPrompt.trim()}
                className="px-6 py-3 bg-[#ff5500] text-white border-2 border-black font-black uppercase text-xs hover:bg-[#111827] hover:text-[#ff5500] shadow-[3px_3px_0px_0px_#111827] transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>TRANSMIT</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-slate-500 text-center mt-2 font-mono uppercase">
              // MANDATORY PHYSICAL TRIAL CYLINDER VALIDATION REQUIRED FOR ALL STRUCTURAL CASTING //
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
