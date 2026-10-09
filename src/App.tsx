/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SplineSceneBasic } from "@/components/ui/demo";
import { Navbar } from "@/components/ui/navbar";
import DemoOne from "@/components/ui/feature-demo";
import { DatasetExplorer } from "@/components/DatasetExplorer";
import { ModelEvaluationHub } from "@/components/ModelEvaluationHub";
import { MixCalculator } from "@/components/MixCalculator";
import { EngineeringAssistant } from "@/components/EngineeringAssistant";
import { Footer } from "@/components/ui/footer-section";

export default function App() {
  return (
    <div className="min-h-screen bg-[#e5e7eb] font-sans text-slate-900 relative selection:bg-[#ff5500] selection:text-white">
      {/* Brutalist Industrial Structural Framework */}
      <div className="w-full bg-[#111827] text-white border-b-2 border-black px-4 py-1.5 text-[11px] font-mono tracking-wider flex items-center justify-between overflow-x-auto whitespace-nowrap z-50 relative">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-[#ff5500] animate-ping" />
          <span className="font-bold text-[#ff5500]">[SYS // IMAGINE CONCRETE LMR]</span>
          <span className="text-slate-400">ENGINEERING SAAS &bull; ML BATCH PREDICTOR</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400 text-[10px]">
          <span>DATASET: 1,030 YEH SAMPLES</span>
          <span className="text-[#ff5500]">CODE: ACI 318 / EN 206</span>
          <span className="text-emerald-400">STATUS: CALIBRATED</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <Navbar />
        <main className="w-full flex flex-col items-center">
          <SplineSceneBasic />
          <DemoOne />
          <DatasetExplorer />
          <ModelEvaluationHub />
          <MixCalculator />
          <EngineeringAssistant />
        </main>
        <Footer />
      </div>
    </div>
  );
}
