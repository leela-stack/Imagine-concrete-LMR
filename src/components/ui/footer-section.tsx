import React from 'react';

interface FooterLink {
  title: string;
  href: string;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'PLATFORM SECTIONS',
    links: [
      { title: '01 // Dataset Explorer', href: '#dataset' },
      { title: '02 // ML Model Hub', href: '#model-hub' },
      { title: '03 // Mix Calculator', href: '#calculator' },
      { title: '04 // AI Assistant', href: '#assistant' },
    ],
  },
  {
    label: 'INTERNATIONAL STANDARDS',
    links: [
      { title: 'ACI 211.1 Mix Practice', href: '#calculator' },
      { title: 'ACI 318 Building Code', href: '#calculator' },
      { title: 'EN 206 Concrete Spec', href: '#calculator' },
      { title: 'ASTM C39 Compression Breaks', href: '#calculator' },
    ],
  },
  {
    label: 'DATA & MACHINE LEARNING',
    links: [
      { title: 'UCI Concrete Benchmark (Yeh 1998)', href: '#dataset' },
      { title: 'XGBoost & Random Forest Models', href: '#model-hub' },
      { title: 'Pearson Correlation Matrix', href: '#dataset' },
      { title: 'Abrams\' Empirical Law', href: '#calculator' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#111827] text-white border-t-4 border-black pt-16 pb-12 font-mono">
      {/* Top Hazard Accent Bar */}
      <div className="w-full h-2 hazard-stripes mb-12 border-b-2 border-black" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#ff5500] text-black border-2 border-black font-black flex items-center justify-center text-xs">
                LMR
              </div>
              <span className="text-white font-black text-xl uppercase tracking-tight">
                IMAGINE CONCRETE <span className="text-[#ff5500]">LMR</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              AI-Powered Engineering SaaS &bull; Interactive ML platform for civil engineers and materials data scientists.
            </p>
            <div className="text-[10px] text-slate-500 border border-slate-800 p-2.5 bg-black">
              DISCLAIMER: Empirical regression models are intended for preliminary optimization. Physical cylinder testing (ASTM C39) is legally mandatory for construction approval.
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.label}>
                <h3 className="text-xs text-[#ff5500] font-black tracking-wider uppercase mb-4 border-b border-slate-800 pb-1">
                  {section.label}
                </h3>
                <ul className="space-y-2.5 text-slate-400 text-xs">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a href={link.href} className="hover:text-white hover:underline transition-colors">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Massive Brutalist Monochromatic Brand Header */}
        <div className="w-full border-t-2 border-slate-800 pt-8 pb-6 text-center select-none">
          <h1 className="text-[13vw] font-black tracking-tighter text-slate-800/80 leading-none">
            CONCRETE LMR
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] pt-4 border-t border-slate-800">
          <p>© 2026 IMAGINE CONCRETE LMR. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4 text-slate-400 font-bold">
            <span className="text-[#ff5500]">SPEC: ACI 211.1 &bull; EN 206 &bull; ASTM C39 &bull; IS 456</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
