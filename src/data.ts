/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CapabilityZone, FilterState } from './types';

export const CAPABILITY_ZONES: CapabilityZone[] = [
  {
    id: 'language',
    name: 'Language Processing',
    displayName: 'Language Processing',
    description: 'High-density linguistic feature embedding, token prediction modeling, and conversational routing architecture for complex instruction following.',
    color: '#22d3ee', // Cyan
    themeColor: 'cyan',
    summaryMetrics: [
      { label: 'Token Efficiency', value: 94.6, unit: '%' },
      { label: 'Embedding Dimensions', value: 12288, unit: 'd' },
      { label: 'Context Horizon', value: 2048, unit: 'k tokens' },
    ],
    subNodes: [
      { id: 'lang-nlu', label: 'Semantic Routing', details: 'Directs complex instructions to specialized low-latency subsystem routing models.', progress: 92 },
      { id: 'lang-gen', label: 'Autoregressive Decoding', details: 'Generates responses utilizing speculative sampling and active token-tree verification.', progress: 97 },
      { id: 'lang-poly', label: 'Cross-Lingual Tokenizer', details: 'Compacts vocabulary embeddings into an optimal multilingual index mapping.', progress: 85 },
      { id: 'lang-gate', label: 'Context Gateways', details: 'Filters prompt embeddings to isolate attention space buffers from noise artifacts.', progress: 79 },
      { id: 'lang-proc', label: 'Heuristic Filtering', details: 'Removes repetitive syntax patterns and cleans training distribution artifacts.', progress: 88 },
    ],
  },
  {
    id: 'vision',
    name: 'Computer Vision',
    displayName: 'Computer Vision',
    description: 'Multi-scale spatial analysis, real-time object segmentation, and deep convolutional vector mappings for dense environments.',
    color: '#ec4899', // Magenta
    themeColor: 'magenta',
    summaryMetrics: [
      { label: 'Segmentation Acc.', value: 89.2, unit: 'IoU' },
      { label: 'Frame Ingestion', value: 120, unit: 'FPS' },
      { label: 'Spatial Resolution', value: 4096, unit: 'px' },
    ],
    subNodes: [
      { id: 'vis-seg', label: 'Semantic Segments', details: 'Delineates object pixel borders using dense spatial grid attention mechanics.', progress: 91 },
      { id: 'vis-obj', label: 'Spatial Bounding Boxes', details: 'Localizes multiple class targets with coordinates and confidence weights.', progress: 95 },
      { id: 'vis-embed', label: 'Contrastive Projection', details: 'Embeds raw pixels and semantic text into a unified multi-modal latent space.', progress: 82 },
      { id: 'vis-depth', label: 'Relative Depth Field', details: 'Calculates structural gradient depths from single-angle static frame feeds.', progress: 74 },
      { id: 'vis-vqa', label: 'Visual Refinement', details: 'Interfaces spatial features with linguistic registers to enable scene QA queries.', progress: 86 },
    ],
  },
  {
    id: 'logic',
    name: 'Reasoning & Logic',
    displayName: 'Reasoning & Logic',
    description: 'Multi-step planning, symbolic deduction, algorithmic verification, and dynamic self-correction loops to secure computational accuracy.',
    color: '#a855f7', // Purple
    themeColor: 'purple',
    summaryMetrics: [
      { label: 'Plan Generation', value: 87.4, unit: 'mS/step' },
      { label: 'Deduction Depth', value: 24, unit: 'Levels' },
      { label: 'Duality Match Rate', value: 98.1, unit: '%' },
    ],
    subNodes: [
      { id: 'log-deduct', label: 'Symbolic Deduction', details: 'Solves complex symbolic variables and rulesets under axiomatic conditions.', progress: 89 },
      { id: 'log-plan', label: 'Monte Carlo Selection', details: 'Searches optimal action paths by compiling speculative simulation rollouts.', progress: 83 },
      { id: 'log-multimodal', label: 'Inductive Logic Map', details: 'Synthesizes structural logic chains across multi-format token registries.', progress: 76 },
      { id: 'log-algo', label: 'Algorithmic Assembly', details: 'Writes and compiles structural code syntax inside a sandboxed VM environment.', progress: 91 },
      { id: 'log-loop', label: 'Self-Correction Loops', details: 'Identifies faulty logical jumps and edits target strategies before execution.', progress: 85 },
    ],
  },
  {
    id: 'ethical',
    name: 'Ethical Reasoning',
    displayName: 'Ethical Reasoning',
    description: 'Deep value alignment layers, policy enforcement monitors, and adversarial safety systems protecting user interactions.',
    color: '#6366f1', // Indigo
    themeColor: 'indigo',
    summaryMetrics: [
      { label: 'Alignment Compliance', value: 99.8, unit: '%' },
      { label: 'Guardrail Latency', value: 2.1, unit: 'ms' },
      { label: 'Refusal Rate', value: 4.8, unit: '%' },
    ],
    subNodes: [
      { id: 'eth-bias', label: 'Bias Disentanglement', details: 'Detects and dampens demographic stereotypes in the model output distributions.', progress: 94 },
      { id: 'eth-safe', label: 'Safety Alignment Stack', details: 'Enforces interactive guard rails on harmful, illegal, or unethical instructions.', progress: 99 },
      { id: 'eth-poly', label: 'Policy Representation', details: 'Matches generated concepts against multi-jurisdictional policy maps.', progress: 90 },
      { id: 'eth-trace', label: 'Explainable Attribution', details: 'Provides clear structural records of why a specific routing decision was executed.', progress: 87 },
      { id: 'eth-red', label: 'Red-Teaming Defense', details: 'Withstands advanced adversarial suffix prompt injections.', progress: 95 },
    ],
  },
];

// Generate dynamic data points based on filter state
export function getMetricsForConfig(filters: FilterState) {
  let scale = 1.0;
  
  // Size factor
  if (filters.size === 'Sovereign') scale *= 1.35;
  else if (filters.size === 'Frontier') scale *= 1.15;
  else if (filters.size === 'Enterprise') scale *= 0.95;
  else scale *= 0.75; // Lite

  // Dataset factor
  if (filters.dataset === 'Duality') scale *= 1.05;
  else if (filters.dataset === 'Omni') scale *= 1.20;
  else if (filters.dataset === 'Synthesis') scale *= 0.95;
  else scale *= 0.85; // Chronos

  // Dataset size factor
  if (filters.datasetSize === 'L') scale *= 1.10;
  else if (filters.datasetSize === 'M') scale *= 1.0;
  else scale *= 0.88; // S

  // Competency factor
  if (filters.competencyZoneEnabled) {
    if (filters.competencyZoneValue === 'AGI - Tier 1') scale *= 1.15;
    else if (filters.competencyZoneValue === 'Autonomous - L4') scale *= 1.10;
    else scale *= 1.05;
  }

  // Bound the scale
  return {
    scale,
    accuracyTrend: [
      { year: '2021', train: Math.round(55 * scale), eval: Math.round(50 * scale) },
      { year: '2022', train: Math.round(68 * scale), eval: Math.round(62 * scale) },
      { year: '2023', train: Math.round(79 * scale), eval: Math.round(74 * scale) },
      { year: '2024', train: Math.round(88 * scale), eval: Math.round(83 * scale) },
      { year: '2025', train: Math.round(94 * scale), eval: Math.round(89 * scale) },
      { year: '2026', train: Math.min(100, Math.round(98 * scale)), eval: Math.min(100, Math.round(94 * scale)) },
    ],
    kvCacheStatus: {
      allocated: Math.round(16 * scale),
      active: Math.round(11 * scale),
      empty: Math.max(1, Math.round((16 - 11) * scale)),
    },
    capabilities: CAPABILITY_ZONES.map(zone => {
      // Scale variables based on filters
      const scaledMetrics = zone.summaryMetrics.map(m => {
        let val = m.value;
        if (m.unit === '%') {
          val = Math.min(99.9, m.value * (scale > 1 ? 1 + (scale - 1) * 0.1 : scale));
        } else {
          val = Math.round(m.value * scale);
        }
        return { ...m, value: parseFloat(val.toFixed(m.unit === '%' ? 1 : 0)) };
      });

      const scaledSubNodes = zone.subNodes.map(s => {
        const val = Math.min(100, Math.round(s.progress * (scale > 1 ? 1 + (scale - 1) * 0.05 : scale)));
        return { ...s, progress: val };
      });

      return {
        ...zone,
        summaryMetrics: scaledMetrics,
        subNodes: scaledSubNodes,
      };
    }),
  };
}

// Logic Sandbox Scenarios
export const LOGIC_SCENARIOS = [
  {
    title: 'Axiomatic Goal Deduction',
    prompt: 'If System A depends on System B, and System B cannot initialize if safety guardrails are tripped. System B reports a warning. Find safety state.',
    steps: [
      { step: 1, action: 'Parse Axioms', details: 'Axiom 1: A(init) -> B(init). Axiom 2: SafetyTrip -> ~B(init). Fact: B(warning).', status: 'success' },
      { step: 2, action: 'Axiomatic Substitution', details: 'Check warning classification against trip states. Query DB.', status: 'success' },
      { step: 3, action: 'Logical Inference', details: 'B is active but warning indicates partial guardrail damping. Output: System A is degraded but secure.', status: 'success' },
    ]
  },
  {
    title: 'Multi-Step Route Allocation',
    prompt: 'Route payload across nodes [N1 -> N2 -> N3] ensuring maximum bandwidth and latency under 12ms.',
    steps: [
      { step: 1, action: 'Query Node Densities', details: 'N1 load: 45%, N2 load: 88%, N3 load: 12%. Calculate route delays.', status: 'success' },
      { step: 2, action: 'Heuristic Selection', details: 'Route via bypass fiber N1B -> N3 if N2 latency exceeds threshold.', status: 'success' },
      { step: 3, action: 'Path Activation', details: 'Alternate route verified. Latency: 8.4ms. Executing switchover.', status: 'success' },
    ]
  }
];

// Vision Object Detection Scenarios
export const VISION_SCENARIOS = [
  {
    id: 'highway',
    title: 'Autonomous Navigation Feed',
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
    targets: [
      { label: 'Vehicle', box: [20, 30, 45, 55], confidence: 0.98 },
      { label: 'Vehicle', box: [48, 55, 68, 72], confidence: 0.94 },
      { label: 'Lane Ribbon', box: [10, 80, 90, 95], confidence: 0.89 },
      { label: 'Hazard Sign', box: [75, 20, 85, 38], confidence: 0.91 }
    ]
  },
  {
    id: 'medical',
    title: 'Biological Tissue Analysis',
    imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=800&q=80',
    targets: [
      { label: 'Cellular Nuclei', box: [35, 25, 48, 42], confidence: 0.95 },
      { label: 'Membrane Bound', box: [12, 15, 88, 85], confidence: 0.87 },
      { label: 'Lipid Ring', box: [65, 50, 78, 68], confidence: 0.92 }
    ]
  }
];
