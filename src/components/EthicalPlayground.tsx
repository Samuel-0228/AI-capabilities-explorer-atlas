/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Info, Sparkles, Sliders, ChevronRight } from 'lucide-react';

interface AlignmentLayer {
  id: string;
  name: string;
  desc: string;
  metric: string;
  color: string;
  borderGlow: string;
}

const LAYERS: AlignmentLayer[] = [
  { id: 'refusal', name: 'Safety Refusal Guardrails', desc: 'Active prompt checking filters that refuse instruction vectors corresponding to classified harmful intents.', metric: '99.9% Refusal Acc', color: 'rgba(99, 102, 241, 0.4)', borderGlow: 'border-indigo-500/50 text-indigo-300' },
  { id: 'robustness', name: 'Jailbreak Robustness Shield', desc: 'Overcomes complex semantic obfuscations and automated adversarial suffix token injections.', metric: '98.5% Jailbreak Def', color: 'rgba(34, 211, 238, 0.4)', borderGlow: 'border-cyan-500/50 text-cyan-300' },
  { id: 'bias', name: 'Bias Alignment Damping', desc: 'Normalizes weight values inside logits distributions to prevent demographic or toxic content shifts.', metric: '94.2% Toxic Mitigation', color: 'rgba(168, 85, 247, 0.4)', borderGlow: 'border-purple-500/50 text-purple-300' },
  { id: 'compliance', name: 'Jurisdictional Policy Check', desc: 'Checks outputs against international regulations and legal copyright filters prior to final output.', metric: '100% Policy Match', color: 'rgba(236, 72, 153, 0.4)', borderGlow: 'border-pink-500/50 text-pink-300' },
  { id: 'trace', name: 'Duality Logging Audit', desc: 'Generates secure cryptographic logs verifying that compliance models checked target output vectors.', metric: '2.1ms Latency Overhead', color: 'rgba(16, 185, 129, 0.4)', borderGlow: 'border-emerald-500/50 text-emerald-300' },
];

export default function EthicalPlayground() {
  const [selectedLayerId, setSelectedLayerId] = useState('refusal');
  const [safetyMargin, setSafetyMargin] = useState(0.85); // 0 to 1
  const [temperature, setTemperature] = useState(0.7); // 0 to 1

  const activeLayer = LAYERS.find((la) => la.id === selectedLayerId) || LAYERS[0];

  // Dynamic values calculated by weights
  const complianceScore = Math.min(100, Math.round(92 + safetyMargin * 7.9));
  const refusalRate = Math.min(15, Math.round(3.5 + safetyMargin * 11)).toFixed(1);
  const helpScore = Math.round(100 - (safetyMargin * 25));

  return (
    <div className="bg-slate-900/30 border border-slate-850 p-6 rounded-2xl flex flex-col gap-6">
      {/* Module Title Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-indigo-400" size={18} />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-display">
            Alignment Stack & Safety Tuner
          </h4>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-indigo-400 bg-indigo-950/40 px-2.5 py-1 rounded-full border border-indigo-900/20">
          <Sparkles size={11} className="animate-pulse" />
          <span>RLHF Aligned</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed font-sans">
        Modern frontier models enforce multi-layered alignment safety blocks. Select a stack layer, adjust alignment coefficients, and view training trade-off curves.
      </p>

      {/* Main Interactive Controls: Left Stack, Right Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side: 3-D Isometric Stack Panel */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center py-6 select-none relative">
          
          {/* Animated Glow Backdrops */}
          <div className="absolute w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Isometric Perspective Wrapper */}
          <div className="flex flex-col -space-y-4 cursor-pointer transform hover:scale-[1.02] transition-transform duration-300">
            {LAYERS.map((la, index) => {
              const matchesVal = selectedLayerId === la.id;
              
              // Scale layered index to render overlap
              return (
                <div
                  key={la.id}
                  onClick={() => setSelectedLayerId(la.id)}
                  style={{
                    transform: 'rotateX(55deg) rotateZ(-30deg)',
                    zIndex: LAYERS.length - index,
                  }}
                  className={`w-64 h-11 relative transition-all duration-300 rounded-lg flex items-center justify-center text-xs font-semibold select-none border ${
                    matchesVal
                      ? 'bg-indigo-950 text-white border-indigo-400 translate-y-[-10px] glow-purple/30 shadow-[0_15px_30px_rgba(168,85,247,0.3)]'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-300 hover:translate-y-[-3px] hover:border-slate-700/60'
                  }`}
                >
                  {/* Decorative horizontal depth grid lines */}
                  <div className="absolute inset-x-2 top-1.5 bottom-1.5 border border-dashed border-slate-800/40 rounded pointer-events-none" />

                  {/* Colored horizontal stack identifier stripe */}
                  <div
                    style={{ backgroundColor: la.color }}
                    className="absolute left-2.5 w-1.5 h-6 rounded-full"
                  />

                  {/* Core Title */}
                  <span className="relative z-10 px-5 text-[10.5px] tracking-wide truncate w-[90%] font-display block text-center">
                    {la.name.split(' ')[0]} {la.name.split(' ')[1] || ''}
                  </span>

                  {/* Small layer numbers label */}
                  <span className="absolute right-3 text-[8px] font-mono text-slate-600">
                    L0{LAYERS.length - index}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="text-[10px] font-mono text-slate-500 mt-6 flex items-center gap-1">
            <Info size={11} />
            <span>Click layer slabs to isolate telemetry details</span>
          </div>
        </div>

        {/* Right Side: Selected Stack Component Information & Sliders */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          {/* Active Detail Display */}
          <div className={`p-4 rounded-xl bg-slate-950 border transition-all ${activeLayer.borderGlow}`}>
            <span className="text-[8.5px] font-mono uppercase tracking-widest block mb-1">
              Active Layer Isolation
            </span>
            <h5 className="text-xs font-semibold font-display text-white mb-1.5 flex items-center justify-between">
              <span>{activeLayer.name}</span>
              <span className="text-[9.5px] font-mono bg-indigo-950 text-indigo-400 px-2.5 py-0.5 rounded border border-indigo-900/30">
                {activeLayer.metric}
              </span>
            </h5>
            <p className="text-[11.5px] text-slate-300 leading-relaxed font-sans">
              {activeLayer.desc}
            </p>
          </div>

          {/* Tuner Sliders Block */}
          <div className="flex flex-col gap-3 bg-slate-950/50 p-4 border border-slate-900 rounded-xl">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-wider pb-1 ml-0.5">
              <Sliders size={12} className="text-indigo-400" />
              <span>Safety Alignment Coefficients</span>
            </div>

            {/* Slider 1: Safety Margin */}
            <div>
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                <span>Fine-Tuning Margin (Refusal)</span>
                <span className="text-indigo-400 font-bold">{(safetyMargin * 100).toFixed(0)}% Str</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="0.98"
                step="0.02"
                value={safetyMargin}
                onChange={(e) => setSafetyMargin(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Slider 2: Temp logic */}
            <div>
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                <span>Decoder Temp (Stochasticity)</span>
                <span className="text-cyan-400 font-bold">{temperature.toFixed(2)} Temp</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1.2"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Aligned Result Trade-off Curves */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Metric Card 1: Safety Compliance */}
        <div className="bg-slate-950 border border-slate-900 rounded-xl p-3.5 text-center font-mono flex flex-col justify-between">
          <span className="text-[10px] text-slate-500 uppercase">Compliance Accord</span>
          <span className="text-indigo-400 font-bold text-lg my-1">{complianceScore}%</span>
          <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
            <div style={{ width: `${complianceScore}%` }} className="bg-indigo-500 h-full transition-all" />
          </div>
        </div>

        {/* Metric Card 2: Refusal Overheads */}
        <div className="bg-slate-950 border border-slate-900 rounded-xl p-3.5 text-center font-mono flex flex-col justify-between">
          <span className="text-[10px] text-slate-500 uppercase">Model Refusal Rate</span>
          <span className="text-pink-400 font-bold text-lg my-1">{refusalRate}%</span>
          <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
            <div style={{ width: `${parseFloat(refusalRate) * 6.5}%` }} className="bg-pink-500 h-full transition-all" />
          </div>
        </div>

        {/* Metric Card 3: Model Helpfulness */}
        <div className="bg-slate-950 border border-slate-900 rounded-xl p-3.5 text-center font-mono flex flex-col justify-between">
          <span className="text-[10px] text-slate-500 uppercase">Utility Optimization</span>
          <span className="text-cyan-400 font-bold text-lg my-1">{helpScore}%</span>
          <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
            <div style={{ width: `${helpScore}%` }} className="bg-cyan-500 h-full transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
}
