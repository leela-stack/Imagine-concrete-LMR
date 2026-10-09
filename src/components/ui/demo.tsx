'use client'

import { SplineScene } from "@/components/ui/splite";
import { motion } from "framer-motion";
 
export function SplineSceneBasic() {
  return (
    <section className="w-full min-h-[100vh] relative flex flex-col md:flex-row md:items-center md:justify-center overflow-hidden pt-28 md:pt-16 pb-12">
      
      {/* Mobile Heading (Hidden on desktop) */}
      <div className="w-full px-6 relative z-10 pointer-events-none md:hidden pt-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111827] text-white border-2 border-black text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 bg-[#ff5500]" />
            SPEC // AI-POWERED ENGINEERING SAAS
          </div>
          <h1 className="text-[12vw] leading-[0.88] font-black uppercase tracking-tighter text-[#111827]">
            Imagine <br/>
            <span className="text-[#ff5500]">Concrete</span> LMR
          </h1>
        </motion.div>
      </div>

      {/* 3D Scene Background */}
      <div className="relative md:absolute md:inset-0 z-0 flex justify-center md:justify-end items-center opacity-100 md:translate-x-[10%] pointer-events-auto w-full h-[40vh] md:h-auto mt-4 mb-4 md:mt-0 md:mb-0">
        <div 
          className="w-[120%] h-[55vh] md:max-w-none md:w-[70vw] md:h-[100vh] mx-auto md:mx-0 transform scale-[0.75] md:scale-100 origin-center flex items-center justify-center"
          style={{
            maskImage: 'radial-gradient(50% 50% at 50% 50%, black 60%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(50% 50% at 50% 50%, black 60%, transparent 100%)'
          }}
        >
          <SplineScene 
            scene="https://prod.spline.design/pO7qjtkgJE8ykpq8/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
      
      {/* Foreground Content */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 pointer-events-none flex flex-col justify-center md:min-h-screen pb-12 md:pb-0 md:pt-16">
        
        {/* Desktop Heading (Hidden on mobile) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="max-w-3xl hidden md:block"
        >
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#111827] text-white border-2 border-black text-xs font-mono font-bold uppercase tracking-wider mb-6 shadow-[3px_3px_0px_0px_#ff5500]">
            <span className="w-2.5 h-2.5 bg-[#ff5500] animate-pulse" />
            AI-POWERED ENGINEERING SAAS &bull; INTERACTIVE ML PLATFORM
          </div>
          <h1 className="text-[6.2vw] leading-[0.85] font-black uppercase tracking-tighter text-[#111827]">
            IMAGINE <br/>
            <span className="text-[#ff5500] inline-block">CONCRETE</span> LMR
          </h1>
        </motion.div>

        {/* Brutalist Raw Concrete Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-6 md:mt-8 pointer-events-auto flex justify-center md:justify-start"
        >
          <div className="bg-[#f3f4f6] border-2 border-black p-6 md:p-8 w-full max-w-xl md:inline-block shadow-[8px_8px_0px_0px_#111827] relative">
            
            {/* Corner Industrial Tag */}
            <div className="absolute -top-3.5 right-4 bg-[#ff5500] text-white font-mono text-[10px] font-bold uppercase px-2.5 py-0.5 border-2 border-black">
              STATION // CIV-ML-90
            </div>

            <p className="text-[#111827] text-sm md:text-base leading-relaxed font-semibold">
              Provide civil engineers and data scientists with an interactive platform to explore concrete datasets, optimize mix designs using machine learning, evaluate regression models, and query an embedded AI engineering assistant.
            </p>

            {/* Monochromatic & Safety Orange Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 my-6 pt-5 border-t-2 border-black font-mono">
              <div className="bg-white border-2 border-black p-2.5 shadow-[2px_2px_0px_0px_#111827]">
                <span className="text-slate-500 block text-[10px] font-bold uppercase">SAMPLES</span>
                <strong className="text-black text-base font-black">1,030</strong>
              </div>
              <div className="bg-white border-2 border-black p-2.5 shadow-[2px_2px_0px_0px_#111827]">
                <span className="text-slate-500 block text-[10px] font-bold uppercase">XGB R²</span>
                <strong className="text-[#ff5500] text-base font-black">0.938</strong>
              </div>
              <div className="bg-white border-2 border-black p-2.5 shadow-[2px_2px_0px_0px_#111827]">
                <span className="text-slate-500 block text-[10px] font-bold uppercase">STANDARDS</span>
                <strong className="text-black text-base font-black">ACI 211.1</strong>
              </div>
            </div>

            {/* Brutalist Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a 
                href="#calculator" 
                className="w-full sm:w-auto px-6 py-3 bg-[#ff5500] text-white text-xs font-black uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_#111827] hover:bg-[#111827] hover:text-[#ff5500] hover:shadow-[5px_5px_0px_0px_#ff5500] transition-all text-center"
              >
                Launch Mix Calculator &rarr;
              </a>
              <a 
                href="#dataset" 
                className="w-full sm:w-auto px-6 py-3 bg-white text-black text-xs font-black uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_#111827] hover:bg-[#e5e7eb] transition-all text-center"
              >
                Explore Dataset &rarr;
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
