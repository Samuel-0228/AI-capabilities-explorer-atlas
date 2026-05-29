/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LOGIC_SCENARIOS } from '../data';
import { Brain, Terminal, Play, CheckCircle2, RotateCcw, AlertCircle } from 'lucide-react';

export default function LogicPlayground() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1); // -1 means loaded, but not started
  const [logs, setLogs] = useState<string[]>([]);
  const [isSolving, setIsSolving] = useState(false);

  const scenario = LOGIC_SCENARIOS[activeScenarioIdx];

  // Run the multi-step simulator
  const startSolving = () => {
    if (isSolving) return;
    setIsSolving(true);
    setCurrentStep(0);
    setLogs([`[INFO] Ingesting logic constraints into reasoning engine...`]);
  };

  const resetSolving = () => {
    setIsSolving(false);
    setCurrentStep(-1);
    setLogs([]);
  };

  useEffect(() => {
    if (!isSolving || currentStep < 0) return;

    if (currentStep >= scenario.steps.length) {
      setIsSolving(false);
      setLogs((prev) => [
        ...prev,
        `[SUCCESS] Reasoning sequence successfully integrated. Deduction verified. Match rate: 98.1%!`,
      ]);
      return;
    }

    const timer = setTimeout(() => {
      const stepData = scenario.steps[currentStep];
      setLogs((prev) => [
        ...prev,
        `[STEP ${currentStep + 1}] Executing: ${stepData.action}...`,
        `[TRACE] ${stepData.details}`,
        `[STATUS] Completed with code 0x000 (OK)`,
      ]);
      setCurrentStep((prev) => prev + 1);
    }, 1800);

    return () => clearTimeout(timer);
  }, [isSolving, currentStep, activeScenarioIdx]);

  return (
    <div className="bg-slate-900/30 border border-slate-850 p-6 rounded-2xl flex flex-col gap-5">
      {/* Module Title Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Brain className="text-purple-400" size={18} />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-display">
            Axiomatic Reasoner & Step Solver
          </h4>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-purple-400 bg-purple-950/40 px-2.5 py-1 rounded-full border border-purple-900/20">
          <Terminal size={11} />
          <span>LISP Solver</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed font-sans">
        Observe symbolic Monte Carlo logic rollouts. Select a target logical proof, trigger the solver queue, and track chain-of-thought steps in real-time.
      </p>

      {/* Select Scenario Box */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
          Reasoning Target Model
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {LOGIC_SCENARIOS.map((sc, i) => (
            <button
              key={sc.title}
              type="button"
              disabled={isSolving}
              onClick={() => {
                setActiveScenarioIdx(i);
                resetSolving();
              }}
              className={`text-[10.5px] font-sans px-3 py-2 rounded-xl border flex flex-col items-start gap-1 text-left transition-colors ${
                isSolving 
                  ? 'opacity-50 cursor-not-allowed border-slate-950/20 bg-slate-950/10' 
                  : activeScenarioIdx === i
                  ? 'bg-purple-500/10 border-purple-500/40 text-purple-300'
                  : 'bg-slate-950/40 border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-850 cursor-pointer'
              }`}
            >
              <span className="font-semibold text-white truncate w-full">{sc.title}</span>
              <span className="text-[9px] text-slate-400 truncate w-full opacity-80">{sc.prompt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Proof Goal block */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex flex-col gap-1.5">
        <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
          Axiomatic Hypothesis
        </div>
        <code className="text-[11.5px] font-mono text-purple-300 leading-normal block">
          "{scenario.prompt}"
        </code>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {currentStep === -1 ? (
          <button
            onClick={startSolving}
            className="flex-1 bg-purple-600 hover:bg-purple-500 text-slate-950 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-purple-500/10"
          >
            <Play size={12} className="fill-slate-950" />
            <span>Compute Inference Cycle</span>
          </button>
        ) : (
          <button
            onClick={resetSolving}
            className="flex-1 bg-slate-950 border border-slate-800 text-slate-350 hover:text-white hover:border-slate-700 text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Reset Proof Stack</span>
          </button>
        )}
      </div>

      {/* Visual Progress Steps Map */}
      <div className="grid grid-cols-3 gap-2.5">
        {scenario.steps.map((st, i) => {
          const isDone = currentStep > i;
          const isCurrent = currentStep === i;
          return (
            <div
              key={st.step}
              className={`p-3 rounded-xl border flex flex-col gap-1 transition-all ${
                isDone
                  ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                  : isCurrent
                  ? 'bg-purple-500/10 border-purple-500/30 text-purple-300 ring-1 ring-purple-500/30'
                  : 'bg-slate-950/20 border-slate-900 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-mono uppercase tracking-widest">
                  STEP 0{st.step}
                </span>
                {isDone ? (
                  <CheckCircle2 size={11} className="text-emerald-400" />
                ) : isCurrent ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                ) : (
                  <AlertCircle size={11} className="text-slate-800" />
                )}
              </div>
              <span className="text-[10.5px] font-semibold truncate text-white">{st.action}</span>
            </div>
          );
        })}
      </div>

      {/* Terminal Real-time Console Log */}
      <div className="flex flex-col gap-1 bg-slate-950 border border-slate-900 rounded-xl p-4 font-mono text-[10px]">
        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-900/80 text-xs text-slate-500">
          <span>CONSOLE RECEIVER: STT_DOCK_1</span>
          <span className="text-purple-400 animate-pulse text-[10px]">● ACTIVE</span>
        </div>
        <div className="space-y-1.5 max-h-36 overflow-y-auto min-h-20 flex flex-col justify-end">
          {logs.length === 0 ? (
            <span className="text-slate-600 italic">Console idle. Click "Compute Inference Cycle" to inject signals.</span>
          ) : (
            logs.map((log, i) => {
              const isErr = log.includes('[ERROR]');
              const isSucc = log.includes('[SUCCESS]');
              const isStep = log.includes('[STEP');
              let tint = 'text-slate-400';
              if (isErr) tint = 'text-red-400 font-bold';
              else if (isSucc) tint = 'text-emerald-400 font-bold';
              else if (isStep) tint = 'text-cyan-400 font-bold';
              return (
                <div key={i} className={`leading-normal ${tint}`}>
                  {log}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
