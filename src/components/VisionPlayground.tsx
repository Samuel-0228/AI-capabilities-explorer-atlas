/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VISION_SCENARIOS } from '../data';
import { Scan, Eye, Sliders, Play, Aperture } from 'lucide-react';

export default function VisionPlayground() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.9);
  const [showLabels, setShowLabels] = useState(true);
  const [showBoxes, setShowBoxes] = useState(true);
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);

  const scenario = VISION_SCENARIOS[activeScenarioIdx];

  return (
    <div className="bg-slate-900/30 border border-slate-850 p-6 rounded-2xl flex flex-col gap-5">
      {/* Module Title Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Scan className="text-pink-400" size={18} />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-display">
            Spatial Object Detection Simulator
          </h4>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-pink-400 bg-pink-950/40 px-2.5 py-1 rounded-full border border-pink-900/20">
          <Eye size={12} />
          <span>Real-time Inference</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed font-sans">
        Simulate multi-class object localization pipelines. Adjust confidence thresholds to view how neural networks filter low-probability detections and coordinate overlays.
      </p>

      {/* Control selectors block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scenario Selectors */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            Active Camera Feed
          </span>
          <div className="grid grid-cols-2 gap-2">
            {VISION_SCENARIOS.map((sc, i) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => setActiveScenarioIdx(i)}
                className={`text-[10.5px] font-sans px-3 py-2.5 rounded-xl border flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  activeScenarioIdx === i
                    ? 'bg-pink-500/10 border-pink-500/40 text-pink-300'
                    : 'bg-slate-950/40 border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-850'
                }`}
              >
                <Play size={10} className={activeScenarioIdx === i ? 'text-pink-400 fill-pink-400' : ''} />
                <span className="truncate">{sc.title.split(' ')[0]} {sc.title.split(' ')[1] || ''}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Inference Sliders config */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="text-slate-500 uppercase tracking-wider">Minimum Confidence Cutoff</span>
            <span className="text-pink-400 font-bold bg-pink-950/30 px-2 py-0.5 rounded border border-pink-900/10">
              {(confidenceThreshold * 100).toFixed(0)}% Match
            </span>
          </div>
          <div className="flex items-center gap-3 h-full">
            <input
              type="range"
              min="0.80"
              max="0.99"
              step="0.01"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-ew-resize accent-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Layer switch boxes */}
      <div className="flex flex-wrap gap-4 items-center justify-between p-3 bg-slate-950/50 border border-slate-900 rounded-xl text-[10.5px] font-mono">
        <span className="text-slate-500 uppercase flex items-center gap-1.5">
          <Aperture size={12} className="text-pink-400" />
          <span>Active Layer Toggles:</span>
        </span>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showBoxes}
              onChange={(e) => setShowBoxes(e.target.checked)}
              className="rounded border-slate-800 text-pink-500 focus:ring-transparent focus:ring-offset-0 cursor-pointer h-3.5 w-3.5 bg-slate-900"
            />
            <span className={showBoxes ? 'text-pink-300' : 'text-slate-500'}>Bounding Boxes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="rounded border-slate-800 text-pink-500 focus:ring-transparent focus:ring-offset-0 cursor-pointer h-3.5 w-3.5 bg-slate-900"
            />
            <span className={showLabels ? 'text-pink-300' : 'text-slate-500'}>Class Identifier tags</span>
          </label>
        </div>
      </div>

      {/* Main Image container with relative SVG detection overlays */}
      <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-xl overflow-hidden border border-slate-850 shadow-inner group">
        {/* Underlay Raw Image */}
        <img
          src={scenario.imageUrl}
          alt={scenario.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
        />

        {/* Ambient Dark Filter */}
        <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />

        {/* SVG Annotations */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
          {scenario.targets.map((tgt, idx) => {
            const isVisible = tgt.confidence >= confidenceThreshold;
            const [x1, y1, x2, y2] = tgt.box;
            const isHovered = hoveredBox === `${tgt.label}-${idx}`;

            if (!isVisible) return null;

            return (
              <g key={`bbox-${idx}`} className="transition-opacity duration-300">
                {/* 1. Transparent Heat overlay */}
                <rect
                  x={x1}
                  y={y1}
                  width={x2 - x1}
                  height={y2 - y1}
                  fill="rgba(236,72,153, 0.05)"
                  className="transition-colors pointer-events-auto cursor-help"
                  onMouseEnter={() => setHoveredBox(`${tgt.label}-${idx}`)}
                  onMouseLeave={() => setHoveredBox(null)}
                />

                {/* 2. Neon Bounding Line Box */}
                {showBoxes && (
                  <rect
                    x={x1}
                    y={y1}
                    width={x2 - x1}
                    height={y2 - y1}
                    fill="none"
                    stroke={isHovered ? '#ffffff' : '#ec4899'}
                    strokeWidth={isHovered ? '2' : '1.2'}
                    strokeDasharray={isHovered ? 'none' : '3, 1'}
                    className="transition-all"
                  />
                )}

                {/* 3. Small Corner targeting crosshairs */}
                {showBoxes && (
                  <g stroke="#ffffff" strokeWidth="0.8">
                    <line x1={x1} y1={y1} x2={x1 + 4} y2={y1} />
                    <line x1={x1} y1={y1} x2={x1} y2={y1 + 4} />
                    <line x1={x2} y1={y2} x2={x2 - 4} y2={y2} />
                    <line x1={x2} y1={y2} x2={x2} y2={y2 - 4} />
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Overlay HTML text badges to scale correctly outside coordinate distortion */}
        <div className="absolute inset-0 pointer-events-none">
          {scenario.targets.map((tgt, idx) => {
            const isVisible = tgt.confidence >= confidenceThreshold;
            const [x1, y1, x2, y2] = tgt.box;
            const isHovered = hoveredBox === `${tgt.label}-${idx}`;

            if (!isVisible || !showLabels) return null;

            return (
              <div
                key={`badge-${idx}`}
                style={{ left: `${x1}%`, top: `${y1}%` }}
                className={`absolute transform -translate-y-full mb-1 flex gap-1 items-center pointer-events-auto cursor-help font-mono text-[9px] px-1 py-0.5 rounded-md border transition-colors ${
                  isHovered 
                    ? 'bg-white border-white text-slate-950 font-bold z-20 shadow' 
                    : 'bg-pink-500/80 border-pink-400 text-white z-10'
                }`}
                onMouseEnter={() => setHoveredBox(`${tgt.label}-${idx}`)}
                onMouseLeave={() => setHoveredBox(null)}
              >
                <span>{tgt.label}</span>
                <span className="opacity-80">{(tgt.confidence * 100).toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Summary Stats based on slide filtering */}
      <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-900 border-dashed text-[10.5px] font-mono">
        <div className="text-slate-500">
          Detected Classes Flagged:{' '}
          <span className="text-white font-bold">
            {scenario.targets.filter((tgt) => tgt.confidence >= confidenceThreshold).length} Objects
          </span>
        </div>
        <div className="text-slate-500 text-right">
          Inference Latency:{' '}
          <span className="text-pink-400 font-bold">12 ms @ INT8</span>
        </div>
      </div>
    </div>
  );
}
