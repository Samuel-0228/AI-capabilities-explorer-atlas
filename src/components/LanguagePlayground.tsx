/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Type, Sparkles, Languages, RefreshCw, Hash } from 'lucide-react';

const PRESETS = [
  "Multi-modal frontier alignment models are live and running.",
  "Deep neural weights converge when trained on bimodal distributions.",
  "Speculative sampling enhances latency in 12B autoregressive decoders.",
];

export default function LanguagePlayground() {
  const [inputText, setInputText] = useState(PRESETS[0]);
  const [tokens, setTokens] = useState<{ id: number; text: string; tint: string }[]>([]);

  // Simple, realistic BPE simulation for visual representation
  useEffect(() => {
    if (!inputText) {
      setTokens([]);
      return;
    }

    // Split text into words, then split longer words into visual subwords
    const words = inputText.split(/(\s+)/);
    const simulatedTokens: { id: number; text: string; tint: string }[] = [];
    let idAcc = 10000;

    const tints = [
      'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
      'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',
      'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
      'bg-pink-500/10 border-pink-500/20 text-pink-300',
      'bg-purple-500/10 border-purple-500/20 text-purple-300',
    ];

    words.forEach((word) => {
      if (word.trim() === '') {
        simulatedTokens.push({
          id: idAcc++,
          text: '␣',
          tint: 'bg-slate-900 border-slate-800 text-slate-500',
        });
      } else if (word.length > 5 && Math.random() > 0.4) {
        // Mock subword token break
        const pivot = Math.floor(word.length / 2);
        const pt1 = word.substring(0, pivot);
        const pt2 = word.substring(pivot);
        const randomTint1 = tints[idAcc % tints.length];
        simulatedTokens.push({ id: idAcc++, text: pt1, tint: randomTint1 });
        const randomTint2 = tints[(idAcc + 1) % tints.length];
        simulatedTokens.push({ id: idAcc++, text: '##' + pt2, tint: randomTint2 });
      } else {
        const randomTint = tints[idAcc % tints.length];
        simulatedTokens.push({ id: idAcc++, text: word, tint: randomTint });
      }
    });

    setTokens(simulatedTokens);
  }, [inputText]);

  const compressionRatio = inputText.length > 0 
    ? (inputText.length / tokens.length).toFixed(1) 
    : '0';

  return (
    <div className="bg-slate-900/30 border border-slate-850 p-6 rounded-2xl flex flex-col gap-5">
      {/* Module Title Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Languages className="text-cyan-400" size={18} />
          <h4 className="text-sm font-semibold tracking-wide text-white uppercase font-display">
            Interactive Tokenizer Sandbox
          </h4>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-800/20">
          <Type size={12} />
          <span>BPE Lexer</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed font-sans">
        Analyze how raw alphanumeric strings are digested into vector-addressable integer indexes by modern model feed vocabulary registers.
      </p>

      {/* Input area */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            Linguistic Input Stream
          </span>
          <button
            onClick={() => setInputText(PRESETS[Math.floor(Math.random() * PRESETS.length)])}
            className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 hover:text-white transition-colors"
          >
            <RefreshCw size={10} className="animate-spin-slow" />
            <span>Shuffle Preset</span>
          </button>
        </div>
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter custom prompt text here..."
          className="w-full h-20 bg-slate-950 border border-slate-800 hover:border-slate-750 p-3 text-xs text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors placeholder:text-slate-600 font-sans"
        />
      </div>

      {/* Preset Pills */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setInputText(preset)}
            className={`text-[10.5px] font-sans px-3 py-1.5 rounded-lg border transition-colors ${
              inputText === preset
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-950/40 border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-800'
            }`}
          >
            Preset {idx + 1}
          </button>
        ))}
      </div>

      {/* Output results details */}
      <div className="flex flex-col gap-2 bg-slate-950 border border-slate-900/60 p-4 rounded-xl">
        <h5 className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
          Token Sequence Assembly
        </h5>

        {tokens.length === 0 ? (
          <div className="text-center py-6 text-slate-600 font-mono text-xs">
            Awaiting input stream...
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1.5 bg-slate-900/30 rounded-lg">
            {tokens.map((token, i) => (
              <motion.div
                key={`tok-${i}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15, delay: Math.min(0.5, i * 0.015) }}
                className={`group relative text-[10px] font-mono px-2 py-1 rounded-md border flex items-center gap-1 cursor-help transition-all ${token.tint}`}
              >
                <span>{token.text}</span>
                
                {/* Embedding index small indicator */}
                <span className="text-[7.5px] opacity-45 pointer-events-none">
                  {token.id}
                </span>

                {/* Vector Details Hover popup */}
                <div className="absolute opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all pointer-events-none bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 w-32 bg-slate-950 border border-slate-700 font-mono p-2 rounded shadow-2xl z-20 text-[8.5px]">
                  <div className="text-cyan-400 font-bold flex items-center gap-1 pb-0.5 mb-1 border-b border-slate-900/60">
                    <Hash size={10} />
                    <span>REGISTRY INDEX</span>
                  </div>
                  <div className="text-slate-400">Byte: <span className="text-white">{encodeURIComponent(token.text)}</span></div>
                  <div className="text-slate-400">Index: <span className="text-white">{token.id}</span></div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quantified dynamic statistics */}
        <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-slate-900/80 text-center font-mono text-xs">
          <div className="flex flex-col border-r border-slate-900">
            <span className="text-[10px] text-slate-500 uppercase">Tokens Count</span>
            <span className="text-cyan-400 font-bold mt-0.5 text-sm">{tokens.length}</span>
          </div>
          <div className="flex flex-col border-r border-slate-900">
            <span className="text-[10px] text-slate-500 uppercase">Chars Ratio</span>
            <span className="text-indigo-400 font-bold mt-0.5 text-sm">{compressionRatio}x</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase">Vocabulary Dim</span>
            <span className="text-purple-400 font-bold mt-0.5 text-sm">320,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
