/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { FilterState, CapabilityId } from './types';
import { getMetricsForConfig } from './data';
import AtlasGlobe from './components/AtlasGlobe';
import LeftSidebar from './components/LeftSidebar';
import LanguagePlayground from './components/LanguagePlayground';
import VisionPlayground from './components/VisionPlayground';
import LogicPlayground from './components/LogicPlayground';
import EthicalPlayground from './components/EthicalPlayground';
import { Activity, ShieldCheck, Languages, Brain, Scan, Sliders, Play, Minimize2, Cpu } from 'lucide-react';

export default function App() {
  // 1. GLOBAL REACTIVE FILTER STATES
  const [filters, setFilters] = useState<FilterState>({
    size: 'Frontier',
    dataset: 'Duality',
    competencyZoneEnabled: true,
    competencyZoneValue: 'AI - M/S',
    partitionEnabled: false,
    partitionMode: 'OFF',
    datasetSize: 'M',
  });

  // 2. ACTIVE DETAILED ISOLATION SELECTION
  const [selectedCapabilityId, setSelectedCapabilityId] = useState<CapabilityId>('vision');

  // 3. REACTIVE DATA COMPUTATIONS based on active sidebar configs
  const computedData = useMemo(() => {
    return getMetricsForConfig(filters);
  }, [filters]);

  const handleFilterUpdate = (updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  // Resolve matching details icon
  const getHeaderIcon = (id: CapabilityId) => {
    switch (id) {
      case 'language': return <Languages size={18} className="text-cyan-400" />;
      case 'vision': return <Scan size={18} className="text-pink-400" />;
      case 'logic': return <Brain size={18} className="text-purple-400 animate-pulse" />;
      case 'ethical': return <ShieldCheck size={18} className="text-indigo-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-x-hidden pb-12 relative selection:bg-cyan-500/30 selection:text-white">
      
      {/* Background underlays for decorative space feeling */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[180px] pointer-events-none" />

      {/* 1. APPLET VIEW HEADER PANEL */}
      <header id="atlas-hologram-header" className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 py-2 transition-all">
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 w-full">
          
          {/* Main Title branding matching standard requirements */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <Cpu className="text-cyan-400 w-5 h-5 animate-pulse" />
              <h1 className="text-base md:text-lg font-bold font-display uppercase tracking-widest text-white leading-none">
                AI Capabilities Explorer Atlas
              </h1>
            </div>
            <p className="text-[10px] md:text-xs text-slate-400 font-sans tracking-wide">
              An interactive multi-dimensional map detailing the structural progression, key frameworks, and validation metrics of model agents.
            </p>
          </div>

          {/* Telemetry Status metadata block */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 font-mono text-[9.5px]">
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-md py-1 px-2 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>SIZE: <strong className="text-white font-semibold">{filters.size.toUpperCase()}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-md py-1 px-2 text-slate-400">
              <span>DATASET: <strong className="text-white font-semibold">{filters.dataset.toUpperCase()}</strong></span>
            </div>
            <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-md py-1 px-2 text-slate-500 hover:text-slate-350 transition-colors">
              <span>REF: UTC 2026-05-29</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. CHASSIS DESCRIPTOR SUMMARY AREA */}
      <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto w-full px-4 pt-4 flex-1 flex flex-col gap-4">
        
        {/* Main 3-Column / Responsive 1-Column bento interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          
          {/* LEFT COLUMN: FILTER CONTROLS & telemetry logs (Span 3 on desktop) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <LeftSidebar
              filters={filters}
              onChange={handleFilterUpdate}
              accuracyTrend={computedData.accuracyTrend}
              kvCache={computedData.kvCacheStatus}
            />
          </div>

          {/* CENTER COLUMN: INTERACTIVE CONSTELLATION GLOBE MAP (Span 6 on desktop) */}
          <div className="lg:col-span-6 flex flex-col gap-5 order-1 lg:order-2">
            
            {/* Primary Interactive Atlas Globe Map Container */}
            <div className="bg-slate-900/10 border border-slate-900 rounded-3xl p-1 shadow-2xl relative">
              
              <AtlasGlobe
                capabilities={computedData.capabilities}
                selectedId={selectedCapabilityId}
                onSelect={(id) => setSelectedCapabilityId(id)}
              />
              
              {/* Quick indicator instructions overlay beneath globe */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-slate-950/80 border border-slate-800 py-1.5 px-4 rounded-full backdrop-blur z-20 pointer-events-none select-none">
                <span className="text-[9.5px] font-mono text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Play size={10} className="fill-cyan-400 animate-pulse" />
                  <span>Interactive Map Trigger: Click a main core hub to focus alignment detail</span>
                </span>
              </div>
            </div>

            {/* Quick selector bar on tablet/mobile viewport for convenience */}
            <div className="lg:hidden flex justify-center flex-wrap gap-2 py-1">
              {computedData.capabilities.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedCapabilityId(zone.id)}
                  style={{
                    backgroundColor: selectedCapabilityId === zone.id ? 'rgba(34, 211, 238, 0.1)' : 'rgba(15,23,42,0.4)',
                    borderColor: selectedCapabilityId === zone.id ? zone.color : 'rgba(255,255,255,0.05)',
                  }}
                  className="px-3.5 py-2 text-xs font-mono font-bold tracking-wide uppercase border rounded-xl flex items-center gap-1.5 transition-all text-slate-300 hover:text-white cursor-pointer"
                >
                  {getHeaderIcon(zone.id)}
                  <span>{zone.displayName}</span>
                </button>
              ))}
            </div>

            {/* 3. EXPANDED BENCHMARK COVERS: LIVE SANDBOX DETAILS */}
            <section id="capabilities-interactive-playgrounds" className="mt-2 border-t border-slate-900/50 pt-4">
              <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5">
                <div className="flex gap-2 items-center">
                  <span className="p-1 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800">
                    <Sliders size={14} />
                  </span>
                  <h2 className="text-xs md:text-sm font-bold font-display uppercase tracking-widest text-white">
                    Core Capability Sandbox Integrations
                  </h2>
                </div>
                <div className="flex items-center bg-slate-900/50 p-1 rounded-xl border border-slate-900 text-[9.5px] font-mono">
                  <span className="text-slate-500 uppercase px-2">Isolated Playground:</span>
                  <span className="text-cyan-400 bg-cyan-950/40 border border-cyan-500/10 px-2 py-0.5 rounded-lg font-bold">
                    {selectedCapabilityId.toUpperCase()} ENGINE
                  </span>
                </div>
              </div>

              <div className="transition-all duration-300">
                {selectedCapabilityId === 'language' && <LanguagePlayground />}
                {selectedCapabilityId === 'vision' && <VisionPlayground />}
                {selectedCapabilityId === 'logic' && <LogicPlayground />}
                {selectedCapabilityId === 'ethical' && <EthicalPlayground />}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: ACTIVE DETAILED INTERACTIVE SANDBOX PLAYGROUNDS (Span 3 on desktop) */}
          <div className="lg:col-span-3 order-3">
            
            {/* Ambient detail wrapper panel */}
            <div className="flex flex-col gap-4">
              
              {/* Target active Zone card status indicator */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-2 right-2 flex items-center gap-1 opacity-70">
                  <Activity size={10} className="text-cyan-500 animate-pulse" />
                  <span className="text-[7.5px] font-mono uppercase text-slate-400 font-bold">Isolated Segment</span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 rounded-lg bg-slate-950 border border-slate-850">
                    {getHeaderIcon(selectedCapabilityId)}
                  </div>
                  <h3 className="text-sm font-bold font-display uppercase tracking-widest text-white">
                    {selectedCapabilityId.toUpperCase()} INTEL
                  </h3>
                </div>

                <p className="text-[11.5px] text-slate-400 leading-normal mb-4 font-sans">
                  {computedData.capabilities.find((z) => z.id === selectedCapabilityId)?.description}
                </p>

                {/* Scaled primary summary indicators from selectedCapabilityId */}
                <div className="space-y-2.5">
                  {computedData.capabilities
                    .find((z) => z.id === selectedCapabilityId)
                    ?.summaryMetrics.map((sm, sIdx) => (
                      <div key={sIdx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-900 flex items-center justify-between font-mono text-[10.5px]">
                        <span className="text-slate-500 uppercase">{sm.label}:</span>
                        <span className="text-white font-bold tracking-wide">
                          {sm.value} {sm.unit}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>

      {/* 4. APP FOOTER */}
      <footer className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto w-full px-4 mt-2 text-center border-t border-slate-900 py-3">
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
          AI Capabilities Explorer Atlas • Sandbox Terminal Layer 1 • System Active
        </p>
      </footer>
    </div>
  );
}
