/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CapabilityId, CapabilityZone } from '../types';
import { Sparkles, BrainCircuit, ScanEye, ShieldCheck, Languages } from 'lucide-react';

interface AtlasGlobeProps {
  capabilities: CapabilityZone[];
  selectedId: CapabilityId;
  onSelect: (id: CapabilityId) => void;
}

export default function AtlasGlobe({ capabilities, selectedId, onSelect }: AtlasGlobeProps) {
  const [pulse, setPulse] = useState(0);
  const [hoveredHub, setHoveredHub] = useState<CapabilityId | null>(null);
  const [hoveredSubNode, setHoveredSubNode] = useState<{ hub: string; label: string; desc: string } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Hub positions matches responsive relative space layout
  const hubs: Record<CapabilityId, { x: number; y: number; labelX: number; labelY: number; icon: any }> = {
    language: { x: 270, y: 160, labelX: 200, labelY: 130, icon: Languages },
    vision: { x: 270, y: 340, labelX: 200, labelY: 370, icon: ScanEye },
    ethical: { x: 530, y: 160, labelX: 600, labelY: 130, icon: ShieldCheck },
    logic: { x: 530, y: 340, labelX: 600, labelY: 370, icon: BrainCircuit },
  };

  // Subnode branches to trace elegant glowing paths
  const subnodePositions: Record<string, { x: number; y: number }[]> = {
    language: [
      { x: 90, y: 80 },
      { x: 110, y: 125 },
      { x: 80, y: 170 },
      { x: 100, y: 215 },
      { x: 130, y: 260 },
    ],
    vision: [
      { x: 130, y: 290 },
      { x: 90, y: 335 },
      { x: 75, y: 380 },
      { x: 95, y: 425 },
      { x: 120, y: 470 },
    ],
    ethical: [
      { x: 710, y: 80 },
      { x: 690, y: 125 },
      { x: 720, y: 170 },
      { x: 700, y: 215 },
      { x: 670, y: 260 },
    ],
    logic: [
      { x: 670, y: 290 },
      { x: 710, y: 335 },
      { x: 725, y: 380 },
      { x: 705, y: 425 },
      { x: 680, y: 470 },
    ],
  };

  return (
    <div className="relative w-full aspect-[8/5] min-h-[300px] bg-cyan-950/5 rounded-3xl border border-gray-800/60 p-2 overflow-hidden flex items-center justify-center select-none shadow-inner">
      {/* Background radial starry sweep */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,17,32,0.6)_0%,rgba(3,7,18,0.95)_80%)] pointer-events-none" />
      
      {/* Cybernetic grid ambient layout */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      {/* Main SVG Layout */}
      <svg
        id="holographic-atlas-svg"
        viewBox="0 0 800 500"
        className="w-full h-full relative z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glowing Filter effects */}
          <filter id="glow-cyan-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-magenta-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-purple-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-indigo-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Holographic linear gradients */}
          <linearGradient id="cyan-magenta-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="purple-indigo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
          </linearGradient>

          {/* Masking and clip path of globe */}
          <clipPath id="globe-clip">
            <circle cx="400" cy="250" r="145" />
          </clipPath>
        </defs>

        {/* 1. CENTRAL GRAPHIC GLOBE WIREFRAMES */}
        <g id="central-globe-group">
          {/* Outer glowing halo ring */}
          <circle
            cx="400"
            cy="250"
            r="145"
            fill="none"
            stroke="rgba(34, 211, 238, 0.15)"
            strokeWidth="1.5"
            className="animate-[pulse_4s_infinite]"
          />
          <circle
            cx="400"
            cy="250"
            r="155"
            fill="none"
            stroke="rgba(168, 85, 247, 0.08)"
            strokeWidth="1"
            strokeDasharray="4,8"
          />

          {/* Clipping area for internal map lines to resemble sphere curves */}
          <g clipPath="url(#globe-clip)" className="opacity-75">
            {/* Dark background inside globe */}
            <circle cx="400" cy="250" r="145" fill="#050811" />

            {/* Simulated Earth outline dot map overlay */}
            <image
              href="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 100 100'%3E%3Cpath d='M10,20 Q15,40 25,30 T45,50 T65,25 T90,45 T85,75 T60,65 T40,80 T25,60 Z' fill='none' stroke='hsla(180,60%25,50%25,0.06)' stroke-width='4' stroke-dasharray='1 4'/%3E%3C/svg%3E"
              x="250"
              y="100"
              width="300"
              height="300"
              className="opacity-40 animate-[spin_100s_linear_infinite]"
            />

            {/* Latitude Parallels */}
            {[-100, -60, -20, 20, 60, 100].map((offset, idx) => (
              <line
                key={`lat-${idx}`}
                x1={400 - Math.sqrt(145 * 145 - offset * offset)}
                y1={250 + offset}
                x2={400 + Math.sqrt(145 * 145 - offset * offset)}
                y2={250 + offset}
                stroke="rgba(34, 211, 238, 0.08)"
                strokeWidth="1"
              />
            ))}

            {/* Longitude Meridians (Rotating ellipse layers simulating 3D sphere) */}
            <ellipse
              cx="400"
              cy="250"
              rx="120"
              ry="145"
              fill="none"
              stroke="rgba(34, 211, 238, 0.08)"
              strokeWidth="0.8"
            />
            <ellipse
              cx="400"
              cy="250"
              rx="70"
              ry="145"
              fill="none"
              stroke="rgba(34, 211, 238, 0.06)"
              strokeWidth="0.8"
            />
            <ellipse
              cx="400"
              cy="250"
              rx="25"
              ry="145"
              fill="none"
              stroke="rgba(34, 211, 238, 0.05)"
              strokeWidth="0.8"
            />

            {/* Dynamic circulating digital grid points */}
            {Array.from({ length: 40 }).map((_, i) => {
              const angle = (i * Math.PI * 2) / 40;
              const radiusX = 110 + (i % 3) * 10;
              const radiusY = 70 + (i % 2) * 20;
              const xPos = 400 + Math.cos(angle + (pulse * Math.PI) / 180) * radiusX;
              const yPos = 250 + Math.sin(angle + (pulse * Math.PI) / 180) * radiusY;
              return (
                <circle
                  key={`glob-pt-${i}`}
                  cx={xPos}
                  cy={yPos}
                  r="1.2"
                  fill={i % 2 === 0 ? '#22d3ee' : '#a855f7'}
                  className="opacity-40"
                />
              );
            })}
          </g>

          {/* Central organic pulsating neuron-star synapse (Vibrant Star in Image) */}
          <g id="synapse-star-neuron" className="opacity-90">
            {/* Outer central particle clusters */}
            <circle
              cx="400"
              cy="250"
              r="22"
              fill="rgba(34, 211, 238, 0.12)"
              filter="url(#glow-cyan-filter)"
            />
            <circle
              cx="400"
              cy="250"
              r="14"
              fill="rgba(168, 85, 247, 0.25)"
              filter="url(#glow-purple-filter)"
            />

            {/* Curved organic rays of the neon multidirectional star in photo */}
            {Array.from({ length: 12 }).map((_, i) => {
              const rotation = (i * 360) / 12 + pulse * 0.15;
              const scalePulse = 1 + Math.sin((pulse * 3 * Math.PI) / 180 + i) * 0.15;
              return (
                <g key={`star-ray-${i}`} transform={`translate(400, 250) rotate(${rotation})`}>
                  <path
                    d={`M 0 0 C 8 30, 2 55, 0 ${75 * scalePulse} C -2 55, -8 30, 0 0`}
                    fill="url(#cyan-magenta-grad)"
                    className="opacity-70 blur-[0.6px]"
                  />
                  {/* Glowing core tip for that high-intensity futuristic look */}
                  <circle
                    cx="0"
                    cy={75 * scalePulse}
                    r="2.5"
                    fill="#ffffff"
                    filter="url(#glow-cyan-filter)"
                  />
                </g>
              );
            })}
          </g>
        </g>

        {/* 2. CORE CONSTELLATION CONNECTION LINES & GLOW PATHS */}
        <g id="routes-and-links">
          {/* Main hubs connections to center */}
          {Object.entries(hubs).map(([id, pos]) => {
            const isActive = selectedId === id;
            const isHovered = hoveredHub === id;
            const glowColor =
              id === 'language' ? '#22d3ee' : id === 'vision' ? '#ec4899' : id === 'ethical' ? '#6366f1' : '#a855f7';
            
            return (
              <g key={`hub-center-link-${id}`}>
                {/* Thick underlying focus track vector */}
                <line
                  x1="400"
                  y1="250"
                  x2={pos.x}
                  y2={pos.y}
                  stroke={glowColor}
                  strokeOpacity={isActive ? 0.35 : isHovered ? 0.2 : 0.08}
                  strokeWidth={isActive ? 3.5 : isHovered ? 2.5 : 1}
                  strokeDasharray="4, 4"
                />
                
                {/* Dynamic flowing animated packet on the path */}
                <motion.circle
                  r="3.5"
                  fill="#ffffff"
                  filter={`url(#glow-${id === 'language' || id === 'ethical' ? 'cyan' : 'purple'}-filter)`}
                  initial={{ offset: 0 }}
                  animate={{
                    cx: [400, pos.x],
                    cy: [250, pos.y],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: id === 'language' ? 0 : id === 'vision' ? 0.75 : id === 'ethical' ? 1.5 : 2.25,
                    ease: "linear",
                  }}
                />
              </g>
            );
          })}

          {/* Hub connections to subnode detail pins */}
          {Object.entries(subnodePositions).map(([hubId, points]) => {
            const hubPos = hubs[hubId as CapabilityId];
            const zone = capabilities.find(z => z.id === hubId);
            const isActive = selectedId === hubId;
            const isHovered = hoveredHub === hubId;
            const themeColor =
              hubId === 'language' ? '#22d3ee' : hubId === 'vision' ? '#ec4899' : hubId === 'ethical' ? '#6366f1' : '#a855f7';

            return (
              <g key={`sub-links-group-${hubId}`}>
                {points.map((pt, index) => {
                  const nodeData = zone?.subNodes[index];
                  
                  // Curved logic paths matching natural branching in photo
                  const midX = (hubPos.x + pt.x) / 2;
                  const pathString = `M ${hubPos.x} ${hubPos.y} C ${midX} ${hubPos.y}, ${midX} ${pt.y}, ${pt.x} ${pt.y}`;
                  
                  const isSpecificSubHovered = hoveredSubNode?.label === nodeData?.label;

                  return (
                    <g key={`branch-${hubId}-${index}`}>
                      {/* Connection curve underglow */}
                      <path
                        d={pathString}
                        fill="none"
                        stroke={themeColor}
                        strokeOpacity={isActive ? 0.45 : isHovered ? 0.25 : 0.08}
                        strokeWidth={isSpecificSubHovered ? 2.5 : isActive ? 1.5 : 0.8}
                        strokeDasharray={index % 2 === 0 ? "none" : "3,3"}
                      />

                      {/* Animated dashed stream for active zones */}
                      {isActive && (
                        <path
                          d={pathString}
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="1"
                          strokeDasharray="4, 15"
                          className="opacity-70"
                          style={{
                            strokeDashoffset: -pulse * 2.5,
                            animation: 'dash 10s linear infinite',
                          }}
                        />
                      )}

                      {/* Interaction Pin Circle */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSpecificSubHovered ? 6 : 4}
                        fill={isActive ? '#ffffff' : themeColor}
                        stroke={themeColor}
                        strokeWidth="1.5"
                        filter={isActive || isSpecificSubHovered ? `url(#glow-${zone?.themeColor || 'cyan'}-filter)` : undefined}
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => {
                          if (nodeData) {
                            setHoveredSubNode({
                              hub: zone?.displayName || '',
                              label: nodeData.label,
                              desc: nodeData.details,
                            });
                          }
                        }}
                        onMouseLeave={() => setHoveredSubNode(null)}
                      />

                      {/* Mini Node Tag label (highly legible text) */}
                      {nodeData && (
                        <text
                          x={pt.x + (hubId === 'language' || hubId === 'vision' ? -10 : 10)}
                          y={pt.y + 3}
                          fill={isSpecificSubHovered ? '#ffffff' : isActive ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.35)'}
                          fontSize="9.5"
                          fontFamily="var(--font-display)"
                          fontWeight={isSpecificSubHovered ? '600' : '400'}
                          textAnchor={hubId === 'language' || hubId === 'vision' ? 'end' : 'start'}
                          className="cursor-help transition-all duration-150"
                          onMouseEnter={() => {
                            setHoveredSubNode({
                              hub: zone?.displayName || '',
                              label: nodeData.label,
                              desc: nodeData.details,
                            });
                          }}
                          onMouseLeave={() => setHoveredSubNode(null)}
                        >
                          {nodeData.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </g>

        {/* 3. CAPABILITY HUB CIRCULAR CORES (The 4 interactive nodes) */}
        <g id="interactive-nodes-group">
          {Object.entries(hubs).map(([id, pos]) => {
            const isActive = selectedId === id;
            const isHovered = hoveredHub === id;
            const zone = capabilities.find(z => z.id === id);
            
            const outerRadius = isActive ? 34 : isHovered ? 30 : 26;
            const strokeColor =
              id === 'language' ? '#22d3ee' : id === 'vision' ? '#ec4899' : id === 'ethical' ? '#6366f1' : '#a855f7';
            const filterColor = id === 'language' ? 'cyan' : id === 'vision' ? 'magenta' : id === 'ethical' ? 'indigo' : 'purple';
            const IconComponent = pos.icon;

            return (
              <g
                key={`hub-${id}`}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="cursor-pointer"
                onClick={() => onSelect(id as CapabilityId)}
                onMouseEnter={() => setHoveredHub(id as CapabilityId)}
                onMouseLeave={() => setHoveredHub(null)}
              >
                {/* 1. Underlying giant glowing anchor radar */}
                {isActive && (
                  <circle
                    r="45"
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    className="opacity-20 animate-ping"
                  />
                )}

                {/* 2. Radial Gradient core container */}
                <circle
                  r={outerRadius}
                  fill={isActive ? 'rgba(11, 15, 25, 0.95)' : 'rgba(8, 12, 21, 0.75)'}
                  stroke={isActive ? '#ffffff' : strokeColor}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  filter={isActive || isHovered ? `url(#glow-${filterColor}-filter)` : undefined}
                  className="transition-all duration-300"
                />

                {/* 3. Inner dotted technical decoration ring */}
                <circle
                  r={outerRadius - 6}
                  fill="none"
                  stroke={isActive ? strokeColor : 'rgba(255, 255, 255, 0.1)'}
                  strokeWidth="1"
                  strokeDasharray="3, 3"
                  className="transition-all duration-300"
                />

                {/* 4. Core Lucide Hub Icon */}
                <g transform="translate(-10, -10)">
                  <foreignObject width="20" height="20">
                    <IconComponent
                      size={20}
                      className="transition-all duration-350"
                      style={{
                        color: isActive ? strokeColor : isHovered ? '#ffffff' : 'rgba(255,255,255,0.45)',
                        filter: isActive ? `drop-shadow(0 0 4px ${strokeColor})` : 'none',
                      }}
                    />
                  </foreignObject>
                </g>

                {/* 5. Center Title Label inside/beneath hub */}
                <g transform={`translate(0, ${outerRadius + 15})`}>
                  {/* Backdrop pill */}
                  <rect
                    x="-65"
                    y="-10"
                    width="130"
                    height="20"
                    rx="10"
                    fill={isActive ? 'rgba(15, 23, 42, 0.85)' : 'rgba(3, 7, 18, 0.6)'}
                    stroke={isActive ? strokeColor : 'rgba(255, 255, 255, 0.05)'}
                    strokeWidth="1"
                    className="transition-all duration-300"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill={isActive ? '#ffffff' : isHovered ? strokeColor : 'rgba(255,255,255,0.65)'}
                    fontSize="9"
                    fontFamily="var(--font-display)"
                    fontWeight="700"
                    letterSpacing="0.05em"
                    className="uppercase transition-all duration-200"
                  >
                    {zone?.displayName.split(' ')[0]} {zone?.displayName.split(' ')[1] || ''}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>

      {/* DYNAMIC PIN TOOLTIP OVERLAY */}
      <AnimatePresence>
        {hoveredSubNode && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-slate-950/95 border border-cyan-500/40 p-4 rounded-xl shadow-2xl backdrop-blur-md z-30"
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} className="text-cyan-400 animate-spin-slow" />
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
                {hoveredSubNode.hub} Integration Detail
              </span>
            </div>
            <h5 className="text-xs font-display font-medium text-white mb-1">
              {hoveredSubNode.label}
            </h5>
            <p className="text-[11px] text-slate-300 leading-normal font-sans">
              {hoveredSubNode.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Interactive Hover Hint */}
      <div className="absolute top-3 left-4 flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-slate-950/40 px-2 py-1 rounded-md border border-slate-800/50 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>INTERACTIVE WORKSPACE</span>
      </div>
    </div>
  );
}
