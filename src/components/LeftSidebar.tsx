/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FilterState, DatasetSize } from '../types';
import { Layers, SlidersHorizontal, Info, Cpu, HelpCircle, HardDrive } from 'lucide-react';

interface LeftSidebarProps {
  filters: FilterState;
  onChange: (updates: Partial<FilterState>) => void;
  accuracyTrend: { year: string; train: number; eval: number }[];
  kvCache: { allocated: number; active: number; empty: number };
}

export default function LeftSidebar({ filters, onChange, accuracyTrend, kvCache }: LeftSidebarProps) {
  return (
    <div className="w-full flex flex-col gap-5">
      {/* Filtering Section Card */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 glow-cyan/10">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-cyan-400" />
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase font-display">
              Filtering Engine
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-800/40 font-bold">
            Live Config
          </span>
        </div>

        <div className="space-y-4">
          {/* Size Select Dropdown */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Model Classifier Size</span>
              <Info size={11} className="text-slate-500 cursor-help" />
            </label>
            <select
              value={filters.size}
              onChange={(e) => onChange({ size: e.target.value as any })}
              className="w-full bg-slate-950/80 border border-slate-800 hover:border-slate-700/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 font-sans tracking-wide transition-colors"
            >
              <option value="Sovereign">Sovereign (Frontier Class)</option>
              <option value="Frontier">Frontier (Standard-64B)</option>
              <option value="Enterprise">Enterprise (Light-32B)</option>
              <option value="Lite">Lite (Damped-8B)</option>
            </select>
          </div>

          {/* Dataset Select Dropdown */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Primary Eval Dataset</span>
              <Cpu size={11} className="text-slate-500" />
            </label>
            <select
              value={filters.dataset}
              onChange={(e) => onChange({ dataset: e.target.value as any })}
              className="w-full bg-slate-950/80 border border-slate-800 hover:border-slate-700/80 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-sans transition-colors"
            >
              <option value="Duality">Duality (Bimodal Distribution)</option>
              <option value="Synthesis">Synthesis (Algorithmic CoT)</option>
              <option value="Omni">Omni (Multi-Modal Atlas)</option>
              <option value="Chronos">Chronos (Temporal Sequence)</option>
            </select>
          </div>

          {/* Competency Zone Selector with Switch */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Competency Partition Zone
              </label>
              <button
                type="button"
                onClick={() => onChange({ competencyZoneEnabled: !filters.competencyZoneEnabled })}
                className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${
                  filters.competencyZoneEnabled ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 bg-slate-950 w-3 h-3 rounded-full transition-transform ${
                    filters.competencyZoneEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <select
              disabled={!filters.competencyZoneEnabled}
              value={filters.competencyZoneValue}
              onChange={(e) => onChange({ competencyZoneValue: e.target.value as any })}
              className={`w-full bg-slate-950/80 border rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 font-sans transition-all ${
                filters.competencyZoneEnabled
                  ? 'border-slate-850 text-white cursor-pointer'
                  : 'border-slate-900/60 text-slate-600 cursor-not-allowed bg-slate-950/20'
              }`}
            >
              <option value="AI - M/S">AI - Autonomous (M/S)</option>
              <option value="AGI - Tier 1">AGI - Sovereign (Tier 1)</option>
              <option value="Autonomous - L4">Autonomous Agent (L4)</option>
            </select>
          </div>

          {/* Competency Zone Partition Toggle */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                System Partition Check
              </label>
              <button
                type="button"
                onClick={() => onChange({ partitionEnabled: !filters.partitionEnabled })}
                className={`w-8 h-4 rounded-full transition-colors relative cursor-pointer ${
                  filters.partitionEnabled ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 bg-slate-950 w-3 h-3 rounded-full transition-transform ${
                    filters.partitionEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-900">
              {(['ON', 'OFF'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  disabled={!filters.partitionEnabled}
                  onClick={() => onChange({ partitionMode: mode })}
                  className={`text-[10px] font-mono py-1 rounded-md uppercase font-bold transition-all ${
                    !filters.partitionEnabled
                      ? 'text-slate-700 cursor-not-allowed'
                      : filters.partitionMode === mode
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white border border-transparent'
                  }`}
                >
                  {mode}
                </button>
              ))}
              <div className="text-[9px] font-mono flex items-center justify-center text-slate-500">
                L-STK
              </div>
            </div>
          </div>

          {/* Dataset Size Toggle Buttons */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
              Evaluation Size Scale
            </label>
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-900">
              {(['L', 'M', 'S'] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => onChange({ datasetSize: sz })}
                  className={`text-[11px] font-mono font-bold py-1.5 rounded-lg transition-all cursor-pointer ${
                    filters.datasetSize === sz
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  {sz === 'L' ? 'Large (10T)' : sz === 'M' ? 'Medium (5T)' : 'Small (1T)'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Data Summary Section Card */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 glow-purple/10 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-purple-400" />
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase font-display">
              Data Summary
            </h3>
          </div>
          <span className="text-[9px] font-mono text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded-full border border-purple-800/30 font-bold">
            Loss Metrics
          </span>
        </div>

        {/* Dynamic Dual-Bar SVG Graph */}
        <div>
          <div className="flex items-center justify-between mb-3 text-[10px] font-mono">
            <span className="text-slate-400 font-medium">Evaluation Loss Trend</span>
            <div className="flex gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-sm" />
                <span className="text-cyan-300">Train</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-gradient-to-t from-purple-600 to-purple-400 rounded-sm" />
                <span className="text-purple-300">Eval</span>
              </span>
            </div>
          </div>

          <div className="relative w-full aspect-[16/9] bg-slate-955 rounded-xl border border-slate-900/50 p-2 overflow-hidden flex flex-col justify-end">
            {/* Grid Lines */}
            <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none opacity-30 px-1 py-4">
              {[100, 75, 50, 25, 0].map((v) => (
                <div key={v} className="w-full flex items-center gap-2">
                  <span className="text-[7.5px] font-mono text-slate-500 w-4 tracking-tighter">
                    {v}%
                  </span>
                  <div className="flex-1 border-t border-slate-800 border-dashed" />
                </div>
              ))}
            </div>

            {/* Custom Responsive SVG Dual Columns Bar Chart */}
            <svg viewBox="0 0 300 130" className="w-full h-full relative z-10 overflow-visible">
              {accuracyTrend.map((chunk, idx) => {
                const totalBars = accuracyTrend.length;
                const colWidth = 26;
                const spacing = (300 - totalBars * colWidth) / (totalBars + 1);
                const xOffset = spacing + idx * (colWidth + spacing);
                
                // SVG coordinates
                const barYTrain = 110 - chunk.train * 0.9;
                const barHEval = chunk.eval * 0.9;
                const barYEval = 110 - barHEval;

                return (
                  <g key={chunk.year} className="group cursor-help">
                    {/* Hover indicator background */}
                    <rect
                      x={xOffset - 4}
                      y="10"
                      width={colWidth + 8}
                      height="105"
                      rx="4"
                      fill="rgba(34, 211, 238, 0.02)"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />

                    {/* Train Bar (Left) */}
                    <rect
                      x={xOffset}
                      y={barYTrain}
                      width="10"
                      height={chunk.train * 0.9}
                      rx="1.5"
                      fill="url(#train-grad)"
                      className="transition-all duration-500"
                    />

                    {/* Eval Bar (Right) */}
                    <rect
                      x={xOffset + 12}
                      y={barYEval}
                      width="10"
                      height={barHEval}
                      rx="1.5"
                      fill="url(#eval-grad)"
                      className="transition-all duration-500"
                    />

                    {/* Top Pop Value on Hover */}
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <rect
                        x={xOffset - 15}
                        y={Math.min(barYTrain, barYEval) - 20}
                        width="52"
                        height="16"
                        rx="4"
                        fill="#020617"
                        stroke="rgba(168, 85, 247, 0.4)"
                        strokeWidth="1"
                      />
                      <text
                        x={xOffset + 11}
                        y={Math.min(barYTrain, barYEval) - 9}
                        fill="#ffffff"
                        fontSize="7.5"
                        fontFamily="var(--font-mono)"
                        textAnchor="middle"
                      >
                        T:{chunk.train}% E:{chunk.eval}%
                      </text>
                    </g>

                    {/* Year Label */}
                    <text
                      x={xOffset + 11}
                      y="124"
                      fill="rgba(255,255,255,0.45)"
                      fontSize="8"
                      fontFamily="var(--font-mono)"
                      textAnchor="middle"
                    >
                      {chunk.year}
                    </text>
                  </g>
                );
              })}

              {/* Define gradients for the custom responsive columns */}
              <defs>
                <linearGradient id="train-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
                <linearGradient id="eval-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Transformer KV Cache Sequence Visual (Replica from Lower Corner) */}
        <div>
          <div className="flex items-center justify-between pb-1.5 text-[10px] font-mono">
            <span className="text-slate-400 font-medium">Attention Sequence Map</span>
            <div className="flex gap-1.5 items-center">
              <HardDrive size={10} className="text-purple-400" />
              <span className="text-[9px] text-slate-500">KV Caching</span>
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 flex flex-col gap-2 relative">
            <div className="absolute top-2 right-2 text-[8px] font-mono text-cyan-400">
              LIMIT: 2048K
            </div>
            
            {/* Attention Input -> Embedding slot visual */}
            <div className="flex items-center gap-2 justify-center py-1">
              {/* Input tokens block */}
              <div className="flex flex-col gap-1 items-center">
                <span className="text-[7.5px] font-mono text-slate-500">Inputs</span>
                <div className="flex gap-1">
                  <span className="w-2.5 h-2.5 bg-cyan-500/20 rounded border border-cyan-500/40 animate-pulse" />
                  <span className="w-2.5 h-2.5 bg-cyan-500/20 rounded border border-cyan-500/40 animate-pulse" />
                  <span className="w-2.5 h-2.5 bg-cyan-500/20 rounded border border-cyan-500/40 animate-pulse" />
                </div>
              </div>

              {/* Transfer direction arrow */}
              <div className="flex-1 flex items-center justify-center relative px-2">
                <div className="w-full h-0.5 bg-slate-800" />
                <span className="absolute text-[8px] font-mono text-purple-400 bg-slate-950 px-1 -top-1.5 hover:text-white transition-colors cursor-pointer select-none">
                  attn(q, k)
                </span>
                <div className="w-1.5 h-1.5 border-t border-r border-cyan-400 transform rotate-45 absolute right-1 -top-[2px]" />
              </div>

              {/* Memory Register blocks */}
              <div className="flex flex-col gap-1 items-center">
                <span className="text-[7.5px] font-mono text-slate-500">Registers</span>
                <div className="flex gap-1">
                  {Array.from({ length: 6 }).map((_, i) => {
                    const isActiveReg = i < Math.floor(kvCache.active / 2.2);
                    return (
                      <span
                        key={`cache-${i}`}
                        className={`w-2 h-4 rounded transition-colors ${
                          isActiveReg 
                            ? 'bg-purple-500/30 border border-purple-400/50 glow-purple/10' 
                            : 'bg-slate-900 border border-slate-800'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Diagnostic stats list */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-900/80 text-[9px] font-mono">
              <div className="flex justify-between items-center text-slate-400">
                <span>Active Slots:</span>
                <span className="text-cyan-400 font-bold">{kvCache.active} Gb</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Total Staged:</span>
                <span className="text-purple-400 font-bold">{kvCache.allocated} Gb</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
