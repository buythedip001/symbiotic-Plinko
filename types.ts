
export interface Pin {
  x: number;
  y: number;
  id: string;
}

export interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  landed: boolean;
  color: string;
  landedMultiplierIndex: number | null;
}

export interface Multiplier {
  value: number;
  color: string;
}
