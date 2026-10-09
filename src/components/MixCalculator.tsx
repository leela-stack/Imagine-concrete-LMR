import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  FlaskConical, 
  Droplet, 
  ShieldAlert, 
  CheckCircle, 
  ClipboardCopy,
  Check
} from 'lucide-react';
import { computeMixPrediction } from '@/data/concreteDataset';

export function MixCalculator() {
  // Input parameters
  const [targetStrength, setTargetStrength] = useState<number>(40); // MPa
  const [cement, setCement] = useState<number>(340); // kg/m3
  const [slag, setSlag] = useState<number>(80); // kg/m3
  const [flyAsh, setFlyAsh] = useState<number>(60); // kg/m3
  const [coarseAgg, setCoarseAgg] = useState<number>(980); // kg/m3
  const [fineAgg, setFineAgg] = useState<number>(750); // kg/m3
  const [age, setAge] = useState<number>(28); // days
  const [targetSlump, setTargetSlump] = useState<number>(120); // mm

  const [copied, setCopied] = useState<boolean>(false);

  // Computed Mix Proportioning & Machine Learning Prediction reading directly from dataset
  const predictions = useMemo(() => {
    return computeMixPrediction({
      targetStrength,
      cement,
      slag,
      flyAsh,
      coarseAgg,
      fineAgg,
      age,
      targetSlump
    });
  }, [targetStrength, cement, slag, flyAsh, coarseAgg, fineAgg, age, targetSlump]);

  const copyRecipe = () => {
    const text = `Imagine concrete LMR - Mix Design Proportioning
Target Strength: ${targetStrength} MPa (at ${age} days)
Cement: ${cement} kg/m³
Blast Furnace Slag: ${slag} kg/m³
Fly Ash: ${flyAsh} kg/m³
Predicted Water: ${predictions.water} kg/m³ (W/CM: ${predictions.wcRatio})
Recommended Superplasticizer: ${predictions.spKg} kg/m³ (${predictions.spPercent}% binder)
Coarse Aggregate: ${coarseAgg} kg/m³
Fine Aggregate: ${fineAgg} kg/m³
Estimated 28d Strength: ${predictions.predictedStrength} MPa (${predictions.ciLower} - ${predictions.ciUpper} MPa 95% CI)
Wet Density: ${predictions.density} kg/m³
Mandatory Notice: Physical ASTM C39 cylinder testing required.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="calculator" className="py-20 w-full relative z-10 scroll-mt-20 border-b-2 border-black bg-[#e5e7eb]">
      <div className="mx-auto w-full max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111827] text-white border-2 border-black text-[11px] font-mono font-bold uppercase tracking-wider mb-4 shadow-[2px_2px_0px_0px_#ff5500]">
              <Calculator className="w-3.5 h-3.5 text-[#ff5500]" />
              SECTION 03 // BATCH PROPORTIONING ENGINE
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111827]">
              CONCRETE MIX DESIGN <span className="text-[#ff5500]">CALCULATOR</span>
            </h2>
            <p className="text-slate-700 mt-2 text-sm md:text-base font-semibold max-w-2xl leading-relaxed">
              Input target strength, cement, and aggregates to predict water content and superplasticizer dosage with machine learning precision.
            </p>
          </div>

          <button
            onClick={copyRecipe}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-black text-[#111827] hover:bg-[#111827] hover:text-[#ff5500] font-mono text-xs font-black uppercase shadow-[3px_3px_0px_0px_#111827] transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-[#ff5500]" /> : <ClipboardCopy className="w-4 h-4" />}
            {copied ? 'FORMULATION COPIED' : 'COPY MIX SPECIFICATION'}
          </button>
        </div>

        {/* Mandatory Laboratory Validation Banner - Brutalist Safety Orange Hazard */}
        <div className="mb-10 bg-[#ff5500] text-white border-2 border-black p-5 shadow-[6px_6px_0px_0px_#111827] flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="p-2.5 bg-black text-[#ff5500] border-2 border-black shrink-0">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div className="font-mono text-xs md:text-sm leading-relaxed">
            <strong className="block font-black text-black bg-white w-fit px-2 py-0.5 mb-1.5 uppercase tracking-wide border border-black">
              MANDATORY LABORATORY VALIDATION NOTICE // ACI 318 &bull; EN 206 &bull; IS 456
            </strong>
            Machine learning predictions are for preliminary proportioning only. International building codes require physical trial batches, ASTM C143 slump tests, and ASTM C39 laboratory cylinder compression testing prior to structural placement.
          </div>
        </div>

        {/* Main Grid: Inputs on Left, Predicted Yield on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono">
          
          {/* Inputs Panel - Brutalist Industrial Form */}
          <div className="lg:col-span-7 bg-white border-2 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#111827] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b-2 border-black">
              <h3 className="text-base font-black uppercase text-[#111827] flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-[#ff5500]" />
                CONSTITUENT INPUT MATRIX
              </h3>
              <span className="text-xs bg-[#111827] text-white px-2 py-0.5 font-bold">1.0 m³ BATCH</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Target Strength */}
              <div className="space-y-1.5 bg-[#f3f4f6] border-2 border-black p-3">
                <label className="text-[11px] font-black uppercase text-black flex justify-between">
                  <span>TARGET f'c:</span>
                  <span className="text-[#ff5500] font-black">{targetStrength} MPa</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="70"
                  step="5"
                  value={targetStrength}
                  onChange={(e) => setTargetStrength(parseInt(e.target.value))}
                  className="w-full accent-[#ff5500] cursor-pointer"
                />
                <span className="text-[9px] text-slate-500 uppercase font-bold block">STRUCTURAL TARGET (28-DAY)</span>
              </div>

              {/* Target Slump */}
              <div className="space-y-1.5 bg-[#f3f4f6] border-2 border-black p-3">
                <label className="text-[11px] font-black uppercase text-black flex justify-between">
                  <span>WORKABILITY SLUMP:</span>
                  <span className="text-[#ff5500] font-black">{targetSlump} mm</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  step="10"
                  value={targetSlump}
                  onChange={(e) => setTargetSlump(parseInt(e.target.value))}
                  className="w-full accent-[#ff5500] cursor-pointer"
                />
                <span className="text-[9px] text-slate-500 uppercase font-bold block">ASTM C143 SLUMP CONE</span>
              </div>

              {/* Cement */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase text-black flex justify-between">
                  <span>PORTLAND CEMENT:</span>
                  <span className="text-black">{cement} kg/m³</span>
                </label>
                <input
                  type="number"
                  min="150"
                  max="550"
                  step="10"
                  value={cement}
                  onChange={(e) => setCement(Math.max(100, parseInt(e.target.value) || 0))}
                  className="w-full bg-[#f8f9fa] border-2 border-black px-3 py-2 text-sm font-bold text-black focus:outline-none focus:border-[#ff5500]"
                />
              </div>

              {/* Blast Furnace Slag */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase text-black flex justify-between">
                  <span>BLAST FURNACE SLAG (GGBS):</span>
                  <span className="text-black">{slag} kg/m³</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="250"
                  step="10"
                  value={slag}
                  onChange={(e) => setSlag(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-[#f8f9fa] border-2 border-black px-3 py-2 text-sm font-bold text-black focus:outline-none focus:border-[#ff5500]"
                />
              </div>

              {/* Fly Ash */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase text-black flex justify-between">
                  <span>FLY ASH (CLASS F/C):</span>
                  <span className="text-black">{flyAsh} kg/m³</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="180"
                  step="10"
                  value={flyAsh}
                  onChange={(e) => setFlyAsh(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-[#f8f9fa] border-2 border-black px-3 py-2 text-sm font-bold text-black focus:outline-none focus:border-[#ff5500]"
                />
              </div>

              {/* Curing Age */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase text-black flex justify-between">
                  <span>FORECAST CURING AGE:</span>
                  <span className="text-[#ff5500] font-black">{age} DAYS</span>
                </label>
                <select
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className="w-full bg-[#f8f9fa] border-2 border-black px-3 py-2 text-sm font-bold text-black focus:outline-none focus:border-[#ff5500]"
                >
                  <option value={3}>3 DAYS (STRIPPING CHECK)</option>
                  <option value={7}>7 DAYS (EARLY COMPRESSION)</option>
                  <option value={14}>14 DAYS (INTERMEDIATE)</option>
                  <option value={28}>28 DAYS (STANDARD STRUCTURAL)</option>
                  <option value={56}>56 DAYS (DURABILITY / SCM)</option>
                  <option value={90}>90 DAYS (ULTIMATE HYDRATION)</option>
                </select>
              </div>

              {/* Coarse Aggregate */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase text-black flex justify-between">
                  <span>COARSE AGGREGATE (10-20mm):</span>
                  <span className="text-black">{coarseAgg} kg/m³</span>
                </label>
                <input
                  type="number"
                  min="700"
                  max="1250"
                  step="20"
                  value={coarseAgg}
                  onChange={(e) => setCoarseAgg(Math.max(500, parseInt(e.target.value) || 0))}
                  className="w-full bg-[#f8f9fa] border-2 border-black px-3 py-2 text-sm font-bold text-black focus:outline-none focus:border-[#ff5500]"
                />
              </div>

              {/* Fine Aggregate */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase text-black flex justify-between">
                  <span>FINE AGGREGATE (SAND):</span>
                  <span className="text-black">{fineAgg} kg/m³</span>
                </label>
                <input
                  type="number"
                  min="550"
                  max="1000"
                  step="20"
                  value={fineAgg}
                  onChange={(e) => setFineAgg(Math.max(400, parseInt(e.target.value) || 0))}
                  className="w-full bg-[#f8f9fa] border-2 border-black px-3 py-2 text-sm font-bold text-black focus:outline-none focus:border-[#ff5500]"
                />
              </div>

            </div>

            {/* Total Binder Summary Pill */}
            <div className="bg-[#111827] text-white border-2 border-black p-3.5 flex flex-wrap items-center justify-between text-xs gap-2">
              <span>
                TOTAL BINDER CONTENT: <strong className="text-[#ff5500] font-black">{predictions.totalBinder} kg/m³</strong>
              </span>
              <span className="text-slate-400">
                SLAG: {predictions.slagReplacement}% &bull; FLY ASH: {predictions.flyAshReplacement}%
              </span>
            </div>
          </div>

          {/* Machine Learning Output Forecast - Brutalist Industrial */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Primary Result Card */}
            <div className="bg-[#111827] text-white border-2 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#ff5500] relative">
              
              <div className="flex items-center justify-between pb-4 border-b-2 border-slate-700">
                <div className="flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-[#ff5500]" />
                  <span className="text-xs font-black uppercase tracking-wider text-white">ML PREDICTED DOSING</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-[#ff5500] text-white font-black uppercase">
                  &plusmn;4.2 MPa 95% CI
                </span>
              </div>

              <div className="mt-6 space-y-6">
                
                {/* Strength Prediction Big Display */}
                <div>
                  <div className="text-[11px] text-slate-400 font-bold uppercase">FORECAST COMPRESSIVE STRENGTH ({age}D)</div>
                  <div className="text-5xl font-black text-white mt-1 tracking-tight flex items-baseline gap-2">
                    {predictions.predictedStrength} <span className="text-2xl text-[#ff5500]">MPa</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    95% INTERVAL: [{predictions.ciLower} &ndash; {predictions.ciUpper} MPa]
                  </div>
                </div>

                {/* Predicted Water & SP */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-slate-700">
                  <div className="bg-black border border-slate-700 p-3.5">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">WATER DEMAND</div>
                    <div className="text-2xl font-black text-white mt-1">
                      {predictions.water} <span className="text-xs font-normal text-slate-400">kg/m³</span>
                    </div>
                    <div className="text-[10px] text-[#ff5500] mt-1 font-bold">
                      W/CM = {predictions.wcRatio}
                    </div>
                  </div>

                  <div className="bg-black border border-slate-700 p-3.5">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">SUPERPLASTICIZER</div>
                    <div className="text-2xl font-black text-[#ff5500] mt-1">
                      {predictions.spKg} <span className="text-xs font-normal text-slate-400">kg/m³</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {predictions.spPercent}% BINDER
                    </div>
                  </div>
                </div>

                {/* Additional Mix Characteristics */}
                <div className="pt-2 text-xs space-y-2 text-slate-300 border-t border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">CALCULATED WET DENSITY:</span>
                    <strong className="text-white">{predictions.density} kg/m³</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">CONSISTENCY CLASS:</span>
                    <strong className="text-[#ff5500]">{targetSlump} mm (SLUMP S3)</strong>
                  </div>
                </div>

              </div>
            </div>

            {/* Compliance Badge */}
            <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_#111827] flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#ff5500] shrink-0" />
              <div className="text-xs text-black font-sans font-medium">
                <strong>STANDARD COMPLIANCE:</strong> Proportioning curves aligned with ACI 211.1 Normal Weight Concrete Standard Practice.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
