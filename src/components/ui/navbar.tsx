import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-6xl"
    >
      <div className={`flex items-center justify-between px-5 py-3 border-2 border-black transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-[4px_4px_0px_0px_#111827]' 
          : 'bg-[#f3f4f6] shadow-[4px_4px_0px_0px_#ff5500]'
      }`}>
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-[#111827] text-white flex items-center justify-center font-mono text-xs font-black border-2 border-black group-hover:bg-[#ff5500] transition-colors">
            LMR
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold uppercase tracking-tight text-slate-900 text-sm md:text-base leading-none">
              Imagine Concrete <span className="text-[#ff5500] font-mono">LMR</span>
            </span>
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest leading-tight">
              // CIVIL ENGR &bull; ML PLATFORM
            </span>
          </div>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
          {[
            { label: '01. Dataset', href: '#dataset' },
            { label: '02. ML Hub', href: '#model-hub' },
            { label: '03. Mix Calc', href: '#calculator' },
            { label: '04. AI Assistant', href: '#assistant' },
          ].map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="px-2 py-1 border border-transparent hover:border-black hover:bg-white hover:text-[#ff5500] transition-all"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <a 
            href="#calculator" 
            className="px-5 py-2 bg-[#ff5500] text-white text-xs font-extrabold uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_#111827] hover:bg-[#111827] hover:text-[#ff5500] hover:shadow-[3px_3px_0px_0px_#ff5500] transition-all"
          >
            Calculate Mix &rarr;
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-900 p-1.5 border-2 border-black bg-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden absolute top-full left-0 w-full mt-2 p-5 bg-white border-2 border-black shadow-[6px_6px_0px_0px_#111827] flex flex-col gap-3"
          >
            {[
              { label: '01. Dataset Explorer', href: '#dataset' },
              { label: '02. ML Model Hub', href: '#model-hub' },
              { label: '03. Concrete Mix Calculator', href: '#calculator' },
              { label: '04. AI Assistant Chatbot', href: '#assistant' },
            ].map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className="text-slate-900 font-mono text-sm font-bold p-2 border border-slate-200 hover:border-black hover:bg-[#ff5500] hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#calculator" 
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full text-center px-5 py-3 bg-[#ff5500] text-white text-xs font-extrabold uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_#111827]"
            >
              Launch Mix Calculator &rarr;
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
