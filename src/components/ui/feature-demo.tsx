'use client';
import React from 'react';
import { Database, Cpu, Calculator, Bot, Sliders, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { FeatureCard } from '@/components/ui/grid-feature-cards';

const features = [
  {
    title: '1,030 Batch Dataset Explorer',
    icon: Database,
    description: 'Dynamic scatter plots, feature distributions, and interactive Pearson correlation heatmaps across 9 mix parameters.',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    title: 'ML Model Evaluation Hub',
    icon: Cpu,
    description: 'Direct comparison across XGBoost, Random Forest, ANN, SVR, and Ridge regression with R², MAE, and RMSE metrics.',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Hyperparameter Tuning',
    icon: Sliders,
    description: 'Calibrate tree depth, estimator counts, and learning rates with instantaneous parity curve recalculations.',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Mandatory Lab Disclaimers',
    icon: ShieldCheck,
    description: 'Built-in structural engineering disclaimers adhering to ACI 318, EN 206, and ASTM C39 physical testing standards.',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    title: 'Mix Proportioning Calculator',
    icon: Calculator,
    description: 'Predict exact water content demand and superplasticizer dosages for specified target compressive strengths.',
    className: 'md:col-span-2 md:row-span-1',
  },
  {
    title: 'AI Engineering Assistant',
    icon: Bot,
    description: 'Domain-specific technical copilot for concrete materials science, hydration kinetics, and predictive machine learning models.',
    className: 'md:col-span-3 md:row-span-1',
  },
];

export default function DemoOne() {
  return (
    <section className="py-20 md:py-28 w-full relative z-10 border-b-2 border-black bg-[#eceff1]">
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111827] text-white border-2 border-black text-[11px] font-mono font-bold uppercase tracking-wider mb-4 shadow-[2px_2px_0px_0px_#ff5500]">
            <span className="w-2 h-2 bg-[#ff5500]" />
            SECTION 00 // CORE SPECIFICATION MATRIX
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111827] leading-[1.05]">
            ENGINEERING <br className="hidden md:block" />
            <span className="text-[#ff5500]">CAPABILITIES</span>
          </h2>
          <p className="text-slate-700 mt-4 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
            Bridging empirical civil engineering datasets with cutting-edge nonlinear machine learning pipelines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
          {features.map((feature, i) => (
            <FeatureCard 
              key={i} 
              feature={feature} 
              className={feature.className}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
