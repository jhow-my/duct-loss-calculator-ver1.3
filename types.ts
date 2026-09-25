
export enum DuctShape {
  RECTANGULAR = 'Rectangular',
  ROUND = 'Round',
}

export interface DuctDimensions {
  width?: number; // inches (W1 or Inlet or Common W)
  height?: number; // inches (H1 or Inlet or Common H)
  width2?: number; // inches (W2 or Outlet or Branch Wb)
  height2?: number; // inches (H2 or Outlet or Branch Hb)
  width3?: number; // inches (Ws - Main Downstream)
  height3?: number; // inches (Hs - Main Downstream)
  diameter?: number; // inches
  length?: number; // inches
  customSize?: string;
}

export interface FittingResult {
  id: string;
  ashraeCode?: string;
  fittingType: string;
  shape: DuctShape;
  dimensions: DuctDimensions;
  angle?: number; // degrees
  radiusRatio?: number; // r/W
  airflow: number; // CFM (Common/Main)
  velocity: number; // fpm
  velocityPressure: number; // in. wg
  coefficient: number; // C
  totalPressureLoss: number; // in. wg
  fittingDescription: string;
  customSize?: string;
  aiReasoning?: string;
  aiTip?: string;
  timestamp: number;
}

export interface CurvePoint {
  velocity: number;
  pressureLoss: number;
}