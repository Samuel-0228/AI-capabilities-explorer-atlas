/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CapabilityId = 'language' | 'vision' | 'logic' | 'ethical';

export interface SubNode {
  id: string;
  label: string;
  details: string;
  progress: number; // 0 to 100 for visual bar
}

export interface CapabilityZone {
  id: CapabilityId;
  name: string;
  displayName: string;
  description: string;
  color: string; // Hex color for CSS or Canvas rendering
  themeColor: 'cyan' | 'magenta' | 'purple' | 'indigo';
  subNodes: SubNode[];
  summaryMetrics: {
    label: string;
    value: number;
    unit: string;
    icon?: string;
  }[];
}

export type DatasetSize = 'L' | 'M' | 'S';

export interface FilterState {
  size: 'Sovereign' | 'Frontier' | 'Enterprise' | 'Lite';
  dataset: 'Duality' | 'Synthesis' | 'Omni' | 'Chronos';
  competencyZoneEnabled: boolean;
  competencyZoneValue: 'AI - M/S' | 'AGI - Tier 1' | 'Autonomous - L4';
  partitionEnabled: boolean;
  partitionMode: 'ON' | 'OFF';
  datasetSize: DatasetSize;
}
