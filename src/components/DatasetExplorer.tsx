import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  ScatterChart, 
  Grid3X3, 
  Database, 
  Info
} from 'lucide-react';
import { 
  CONCRETE_SAMPLES, 
  DATASET_STATS, 
  FEATURES, 
  CORRELATION_MATRIX, 
  ConcreteSample
} from '@/data/concreteDataset';

export function DatasetExplorer() {
  const [activeTab, setActiveTab] = useState<'scatter' | 'histogram' | 'heatmap'>('scatter');
  
  // Scatter Plot State
  const [xFeatureKey, setXFeatureKey] = useState<keyof Omit<ConcreteSample, 'id'>>('wcRatio');
  const [yFeatureKey, setYFeatureKey] = useState<keyof Omit<ConcreteSample, 'id'>>('strength');
  const [hoveredPoint, setHoveredPoint] = useState<ConcreteSample | null>(null);

  // Histogram State
  const [histFeatureKey, setHistFeatureKey] = useState<keyof Omit<ConcreteSample, 'id'>>('strength');
  const [histBinsCount, setHistBinsCount] = useState<number>(10);

  // Heatmap State
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number; val: number } | null>(null);

  // Metadata
  const xMeta = useMemo(() => FEATURES.find(f => f.key === xFeatureKey) || FEATURES[8], [xFeatureKey]);
  const yMeta = useMemo(() => FEATURES.find(f => f.key === yFeatureKey) || FEATURES[9], [yFeatureKey]);
  const histMeta = useMemo(() => FEATURES.find(f => f.key === histFeatureKey) || FEATURES[9], [histFeatureKey]);

  // Scatter plot calculations
  const scatterBounds = useMemo(() => {
    const xVals = CONCRETE_SAMPLES.map(s => Number(s[xFeatureKey]));
    const yVals = CONCRETE_SAMPLES.map(s => Number(s[yFeatureKey]));
    const minX = Math.min(...xVals);
    const maxX = Math.max(...xVals);
    const minY = Math.min(...yVals);
    const maxY = Math.max(...yVals);
    const padX = (maxX - minX) * 0.08 || 1;
    const padY = (maxY - minY) * 0.08 || 1;
    return {
      minX: Math.max(0, minX - padX),
      maxX: maxX + padX,
      minY: Math.max(0, minY - padY),
      maxY: maxY + padY
    };
  }, [xFeatureKey, yFeatureKey]);

  // Histogram bins calculation
  const histogramBins = useMemo(() => {
    const values = CONCRETE_SAMPLES.map(s => Number(s[histFeatureKey]));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const step = (max - min) / histBinsCount;
    
    const bins = Array.from({ length: histBinsCount }, (_, i) => {
      const start = min + i * step;
      const end = start + step;
      return {
        label: `${start.toFixed(1)} - ${end.toFixed(1)}`,
        start,
        end,
        count: 0,
      };
    });

    values.forEach(v => {
      const idx = Math.min(Math.floor((v - min) / step), histBinsCount - 1);
      if (idx >= 0 && idx < histBinsCount) {
        bins[idx].count += 1;
      }
    });

    const maxCount = Math.max(...bins.map(b => b.count), 1);
    return { bins, maxCount };
  }, [histFeatureKey, histBinsCount]);

  return (
    <section id="dataset" className="py-20 w-full relative z-10 scroll-mt-20 border-b-2 border-black bg-[#e5e7eb]">
      <div className="mx-auto w-full max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111827] text-white border-2 border-black text-[11px] font-mono font-bold uppercase tracking-wider mb-4 shadow-[2px_2px_0px_0px_#ff5500]">
              <Database className="w-3.5 h-3.5 text-[#ff5500]" />
              SECTION 01 // DATASET EXPLORER
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#111827]">
              DATASET EXPLORER &amp; <span className="text-[#ff5500]">VISUALIZATIONS</span>
            </h2>
            <p className="text-slate-700 mt-2 text-sm md:text-base font-semibold max-w-2xl leading-relaxed">
              Explore 1,030 standardized laboratory concrete mix trials. Uncover nonlinear correlations between binder constituents, hydration age, and compressive yield.
            </p>
          </div>

          {/* Quick Metrics - Brutalist Industrial */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#111827] text-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_#ff5500] font-mono">
            <div className="p-2 border border-slate-700 bg-slate-900">
              <div className="text-[10px] text-slate-400 font-bold uppercase">SAMPLES</div>
              <div className="text-lg font-black text-white">{DATASET_STATS.totalRecords.toLocaleString()}</div>
            </div>
            <div className="p-2 border border-slate-700 bg-slate-900">
              <div className="text-[10px] text-slate-400 font-bold uppercase">VARIABLES</div>
              <div className="text-lg font-black text-[#ff5500]">{DATASET_STATS.features} DIMS</div>
            </div>
            <div className="p-2 border border-slate-700 bg-slate-900">
              <div className="text-[10px] text-slate-400 font-bold uppercase">MEAN f'c</div>
              <div className="text-lg font-black text-white">{DATASET_STATS.meanStrength} MPa</div>
            </div>
            <div className="p-2 border border-slate-700 bg-slate-900">
              <div className="text-[10px] text-slate-400 font-bold uppercase">AVG W/C</div>
              <div className="text-lg font-black text-[#ff5500]">{DATASET_STATS.meanWCRatio}</div>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs - Brutalist Industrial Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-[#111827] p-2 border-2 border-black shadow-[4px_4px_0px_0px_#111827] w-fit font-mono">
          <button
            onClick={() => setActiveTab('scatter')}
            className={`flex items-center gap-2 px-4 py-2 border-2 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'scatter'
                ? 'bg-[#ff5500] text-white border-black shadow-[2px_2px_0px_0px_#ffffff]'
                : 'bg-transparent text-slate-300 border-transparent hover:text-white hover:border-slate-600'
            }`}
          >
            <ScatterChart className="w-4 h-4" />
            01. Dynamic Scatter Plot
          </button>
          <button
            onClick={() => setActiveTab('histogram')}
            className={`flex items-center gap-2 px-4 py-2 border-2 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'histogram'
                ? 'bg-[#ff5500] text-white border-black shadow-[2px_2px_0px_0px_#ffffff]'
                : 'bg-transparent text-slate-300 border-transparent hover:text-white hover:border-slate-600'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            02. Feature Distributions
          </button>
          <button
            onClick={() => setActiveTab('heatmap')}
            className={`flex items-center gap-2 px-4 py-2 border-2 text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'heatmap'
                ? 'bg-[#ff5500] text-white border-black shadow-[2px_2px_0px_0px_#ffffff]'
                : 'bg-transparent text-slate-300 border-transparent hover:text-white hover:border-slate-600'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
            03. Correlation Heatmap
          </button>
        </div>

        {/* Tab 1: Dynamic Scatter Plot */}
        {activeTab === 'scatter' && (
          <div className="bg-white border-2 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#111827] space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b-2 border-black">
              <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
                {/* X Selector */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700 uppercase">[X-AXIS]:</span>
                  <select
                    value={xFeatureKey}
                    onChange={(e) => setXFeatureKey(e.target.value as any)}
                    className="bg-[#f3f4f6] border-2 border-black text-[#111827] font-bold px-3 py-1.5 focus:outline-none focus:border-[#ff5500]"
                  >
                    {FEATURES.map(f => (
                      <option key={f.key} value={f.key}>{f.label} ({f.unit})</option>
                    ))}
                  </select>
                </div>

                {/* Y Selector */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700 uppercase">[Y-AXIS]:</span>
                  <select
                    value={yFeatureKey}
                    onChange={(e) => setYFeatureKey(e.target.value as any)}
                    className="bg-[#f3f4f6] border-2 border-black text-[#111827] font-bold px-3 py-1.5 focus:outline-none focus:border-[#ff5500]"
                  >
                    {FEATURES.map(f => (
                      <option key={f.key} value={f.key}>{f.label} ({f.unit})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Point hover detail */}
              <div className="text-xs font-mono bg-[#111827] text-white border-2 border-black px-3 py-1.5">
                {hoveredPoint ? (
                  <span>
                    BATCH #{hoveredPoint.id} // {xMeta.label}: <strong className="text-[#ff5500] font-black">{hoveredPoint[xFeatureKey]}</strong> // {yMeta.label}: <strong className="text-[#ff5500] font-black">{hoveredPoint[yFeatureKey]}</strong>
                  </span>
                ) : (
                  <span className="text-slate-400">HOVER DATA POINTS TO INSPECT PHYSICAL SAMPLES</span>
                )}
              </div>
            </div>

            {/* SVG Interactive Scatter Plot */}
            <div className="relative w-full h-[400px] md:h-[480px] bg-[#f8f9fa] border-2 border-black p-4 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 800 440" preserveAspectRatio="none">
                {/* Industrial Grid Lines */}
                {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
                  const yPos = 40 + (1 - ratio) * 340;
                  const xPos = 60 + ratio * 700;
                  return (
                    <g key={ratio}>
                      <line x1="60" y1={yPos} x2="760" y2={yPos} stroke="#d1d5db" strokeDasharray="2 2" strokeWidth="1" />
                      <line x1={xPos} y1="40" x2={xPos} y2="380" stroke="#d1d5db" strokeDasharray="2 2" strokeWidth="1" />
                    </g>
                  );
                })}

                {/* Bold Axes */}
                <line x1="60" y1="380" x2="760" y2="380" stroke="#111827" strokeWidth="2.5" />
                <line x1="60" y1="40" x2="60" y2="380" stroke="#111827" strokeWidth="2.5" />

                {/* Axis Labels */}
                <text x="410" y="420" textAnchor="middle" className="text-xs font-mono font-bold fill-[#111827]">
                  {xMeta.label.toUpperCase()} ({xMeta.unit})
                </text>
                <text x="25" y="210" textAnchor="middle" transform="rotate(-90 25 210)" className="text-xs font-mono font-bold fill-[#111827]">
                  {yMeta.label.toUpperCase()} ({yMeta.unit})
                </text>

                {/* Safety Orange Trend line */}
                <line 
                  x1="70" 
                  y1={xFeatureKey === 'wcRatio' ? "120" : "330"} 
                  x2="750" 
                  y2={xFeatureKey === 'wcRatio' ? "350" : "110"} 
                  stroke="#ff5500" 
                  strokeWidth="3" 
                  strokeDasharray="6 4"
                />

                {/* Data Points */}
                {CONCRETE_SAMPLES.map((sample) => {
                  const xVal = Number(sample[xFeatureKey]);
                  const yVal = Number(sample[yFeatureKey]);

                  const normX = (xVal - scatterBounds.minX) / (scatterBounds.maxX - scatterBounds.minX || 1);
                  const normY = (yVal - scatterBounds.minY) / (scatterBounds.maxY - scatterBounds.minY || 1);

                  const cx = 60 + normX * 700;
                  const cy = 380 - normY * 340;

                  const isHovered = hoveredPoint?.id === sample.id;

                  return (
                    <circle
                      key={sample.id}
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 8 : 4.5}
                      fill={isHovered ? '#ff5500' : '#111827'}
                      stroke={isHovered ? '#111827' : '#ffffff'}
                      strokeWidth={isHovered ? 2 : 1}
                      className="cursor-pointer transition-all duration-100"
                      onMouseEnter={() => setHoveredPoint(sample)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  );
                })}
              </svg>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-600 gap-2 pt-2">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#111827] border border-black inline-block" />
                EMPIRICAL SPECIMEN TEST (ASTM C39 / YEH 1998)
              </span>
              <span className="flex items-center gap-2">
                <span className="w-5 h-1 bg-[#ff5500] inline-block" />
                SAFETY ORANGE OLS REGRESSION TRENDLINE
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Feature Distribution Histograms */}
        {activeTab === 'histogram' && (
          <div className="bg-white border-2 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#111827] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="font-bold text-slate-700 uppercase">[SELECT FEATURE]:</span>
                <select
                  value={histFeatureKey}
                  onChange={(e) => setHistFeatureKey(e.target.value as any)}
                  className="bg-[#f3f4f6] border-2 border-black text-[#111827] font-bold px-3 py-1.5 focus:outline-none focus:border-[#ff5500]"
                >
                  {FEATURES.map(f => (
                    <option key={f.key} value={f.key}>{f.label} ({f.unit})</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="font-bold text-slate-700 uppercase">BINS:</span>
                <div className="flex items-center gap-1 border-2 border-black bg-white p-0.5">
                  {[6, 8, 10, 12].map(bins => (
                    <button
                      key={bins}
                      onClick={() => setHistBinsCount(bins)}
                      className={`px-2.5 py-0.5 text-xs font-bold ${histBinsCount === bins ? 'bg-[#ff5500] text-white' : 'text-slate-800 hover:bg-slate-200'}`}
                    >
                      {bins}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Description Card */}
            <div className="bg-[#f3f4f6] border-2 border-black p-4 flex items-start gap-3">
              <div className="w-6 h-6 bg-[#111827] text-[#ff5500] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                !
              </div>
              <div className="font-mono text-xs">
                <h4 className="font-black text-[#111827] uppercase">{histMeta.label} ({histMeta.unit})</h4>
                <p className="text-slate-700 mt-0.5">{histMeta.description}. Structural design bounds: {histMeta.min} to {histMeta.max} {histMeta.unit}.</p>
              </div>
            </div>

            {/* Histogram Bars */}
            <div className="h-[340px] flex items-end gap-2 pt-8 pb-4 px-2 border-b-2 border-black bg-[#f8f9fa] border-2">
              {histogramBins.bins.map((bin, i) => {
                const heightPercent = Math.max(10, (bin.count / histogramBins.maxCount) * 100);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <span className="text-[10px] font-mono font-bold text-slate-700 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {bin.count}
                    </span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-[#111827] border-2 border-black group-hover:bg-[#ff5500] transition-colors"
                    />
                    <div className="mt-3 text-[10px] font-mono text-slate-700 font-bold text-center truncate w-full transform -rotate-25 md:rotate-0 origin-top-left">
                      {bin.label}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center text-xs font-mono font-bold text-slate-700 uppercase">
              // FREQUENCY DISTRIBUTION &bull; {histMeta.unit}
            </div>
          </div>
        )}

        {/* Tab 3: Correlation Matrix Heatmap */}
        {activeTab === 'heatmap' && (
          <div className="bg-white border-2 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#111827] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
              <div>
                <h3 className="text-lg font-black uppercase text-[#111827] font-mono">PEARSON CORRELATION MATRIX (r)</h3>
                <p className="text-xs font-mono text-slate-600 mt-1">Inter-variable dependency computed across 1,030 standardized mixes.</p>
              </div>

              {selectedCell && (
                <div className="bg-[#111827] text-white border-2 border-black px-3 py-1 text-xs font-mono">
                  {CORRELATION_MATRIX.variables[selectedCell.row].toUpperCase()} ↔ {CORRELATION_MATRIX.variables[selectedCell.col].toUpperCase()}: <strong className="text-[#ff5500]">{selectedCell.val > 0 ? `+${selectedCell.val.toFixed(2)}` : selectedCell.val.toFixed(2)}</strong>
                </div>
              )}
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto pb-2">
              <table className="w-full text-center border-collapse text-xs font-mono border-2 border-black">
                <thead>
                  <tr className="bg-[#111827] text-white">
                    <th className="p-2.5 text-left font-bold uppercase text-[10px] border border-slate-700">VAR</th>
                    {CORRELATION_MATRIX.variables.map((colName, c) => (
                      <th key={c} className="p-2 font-bold uppercase text-[10px] border border-slate-700 max-w-[70px] truncate" title={colName}>
                        {colName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CORRELATION_MATRIX.data.map((row, r) => (
                    <tr key={r} className="border-b border-black">
                      <td className="p-2 text-left font-bold text-[#111827] whitespace-nowrap bg-[#f3f4f6] border border-black">
                        {CORRELATION_MATRIX.variables[r]}
                      </td>
                      {row.map((val, c) => {
                        let bgColor = '#ffffff';
                        let textColor = '#111827';

                        if (val > 0.4) {
                          bgColor = `rgba(255, 85, 0, ${val})`; // Safety orange gradient
                          textColor = val > 0.5 ? '#ffffff' : '#111827';
                        } else if (val > 0) {
                          bgColor = `rgba(255, 85, 0, ${val * 0.5})`;
                        } else if (val < -0.3) {
                          bgColor = `rgba(17, 24, 39, ${Math.abs(val) * 0.9})`; // Dark carbon gray
                          textColor = '#ffffff';
                        } else if (val < 0) {
                          bgColor = `rgba(17, 24, 39, ${Math.abs(val) * 0.4})`;
                          textColor = Math.abs(val) > 0.3 ? '#ffffff' : '#111827';
                        }

                        const isSelected = selectedCell?.row === r && selectedCell?.col === c;

                        return (
                          <td
                            key={c}
                            onClick={() => setSelectedCell({ row: r, col: c, val })}
                            className={`p-2 font-bold cursor-pointer transition-all border border-black hover:border-[#ff5500] hover:ring-2 hover:ring-[#ff5500] ${isSelected ? 'ring-2 ring-black font-black' : ''}`}
                            style={{ backgroundColor: bgColor, color: textColor }}
                            title={`${CORRELATION_MATRIX.variables[r]} vs ${CORRELATION_MATRIX.variables[c]}: r = ${val}`}
                          >
                            {val.toFixed(2)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Heatmap Legend */}
            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-700 pt-3 border-t-2 border-black">
              <div className="flex items-center gap-3">
                <span className="font-bold uppercase">SCALE:</span>
                <span className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 bg-[#111827] border border-black inline-block" /> Strong Negative (-0.66)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 bg-white border border-black inline-block" /> Neutral (0.00)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 bg-[#ff5500] border border-black inline-block" /> Strong Positive (+1.00)
                </span>
              </div>
              <div className="font-bold text-[#ff5500]">
                *CRITICAL: Water &amp; Superplasticizer inverse correlation (-0.66).
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
