
import { 
  CP_DATA, K_DATA, SD42_DATA, SR42_DATA, SR43_DATA, SR513_CB_DATA, SR513_CS_DATA, SR515_DATA, ER55_DATA, ER53_CB_DATA, ER53_CS_DATA, ER42_DATA, ER43_DATA, ED42_DATA
} from './ashraeData';

// --- HELPER FUNCTIONS ---

const interpolate = (x: number, xValues: number[], yValues: number[]): number => {
  if (isNaN(x)) return yValues[0];
  if (x <= xValues[0]) return yValues[0];
  if (x >= xValues[xValues.length - 1]) return yValues[yValues.length - 1];

  for (let i = 0; i < xValues.length - 1; i++) {
    if (x >= xValues[i] && x <= xValues[i + 1]) {
      const t = (x - xValues[i]) / (xValues[i + 1] - xValues[i]);
      return yValues[i] + t * (yValues[i + 1] - yValues[i]);
    }
  }
  return yValues[0];
};

const interpolate2D = (
  x: number, 
  y: number, 
  xValues: number[], 
  yValues: number[], 
  zValues: number[][]
): number => {
  if (isNaN(x) || isNaN(y)) return 0;
  
  // Safe bounds check
  const xLen = xValues.length;
  const yLen = yValues.length;
  if (xLen === 0 || yLen === 0) return 0;

  // Clamp indices to ensure we stay within bounds for bilinear interpolation
  let xi = 0;
  while (xi < xLen - 2 && x > xValues[xi + 1]) xi++;
  
  let yi = 0;
  while (yi < yLen - 2 && y > yValues[yi + 1]) yi++;

  const x1 = xValues[xi];
  const x2 = xValues[xi + 1];
  const y1 = yValues[yi];
  const y2 = yValues[yi + 1];

  // Safeguard array access
  const row1 = zValues[xi];
  const row2 = zValues[xi + 1];
  
  if (!row1 || !row2) return 0;

  const z11 = row1[yi] ?? 0;
  const z12 = row1[yi + 1] ?? z11;
  const z21 = row2[yi] ?? z11;
  const z22 = row2[yi + 1] ?? z21;

  // Bilinear interpolation
  const denom = (x2 - x1) * (y2 - y1);
  if (denom === 0) return z11;

  return (
    z11 * (x2 - x) * (y2 - y) +
    z21 * (x - x1) * (y2 - y) +
    z12 * (x2 - x) * (y - y1) +
    z22 * (x - x1) * (y - y1)
  ) / denom;
};

// --- CALCULATION FUNCTIONS ---

export const calculateCR31 = (w: number, h: number, rw: number, angle: number, cfm: number) => {
  if (w <= 0 || h <= 0) return null;
  const area = (w * h) / 144;
  const velocity = cfm / area;
  const vp = Math.pow(velocity / 4005, 2);
  const hw = h / w;

  const cp = interpolate2D(rw, hw, CP_DATA.rw, CP_DATA.hw, CP_DATA.values);
  const k = interpolate(angle, K_DATA.theta, K_DATA.values);
  const c = cp * k;

  return {
    c,
    velocity,
    velocityPressure: vp,
    totalPressureLoss: c * vp,
    reasoning: `Rectangular Elbow (CR3-1): r/W=${rw}, H/W=${hw.toFixed(2)}, Angle=${angle}°. Base Cp=${cp.toFixed(2)}, Angle Factor K=${k.toFixed(2)}.`
  };
};

export const calculateSD42 = (w1: number, h1: number, do_inch: number, l: number, cfm: number) => {
  // Inputs per ASHRAE SD4-2 Diagram 5-27:
  // H1, W1 (Rectangular Inlet)
  // Do (Round Outlet)
  // L (Length)
  // Q (Flow Rate)
  
  if (h1 <= 0 || w1 <= 0 || do_inch <= 0 || l <= 0) return null;

  // 1. Areas
  const a1 = (h1 * w1) / 144; // Rectangular Area (ft2)
  const ao = (Math.PI * Math.pow(do_inch / 2, 2)) / 144; // Round Area (ft2)

  // 2. Velocity at Outlet (Round Section Ao)
  const vo = cfm / ao;
  
  // 3. Velocity Pressure at Outlet
  const pvo = Math.pow(vo / 4005, 2);

  // 4. Angles (Degrees)
  // Theta1 uses H1 (Height)
  const theta1 = Math.abs((2 * 180 / Math.PI) * Math.atan((h1 - do_inch) / (2 * l)));
  // Theta2 uses W1 (Width)
  const theta2 = Math.abs((2 * 180 / Math.PI) * Math.atan((w1 - do_inch) / (2 * l)));
  
  const theta = Math.max(theta1, theta2);

  // 5. Area Ratio: Ao / A1 (Round Outlet / Rect Inlet)
  const ao_a1 = ao / a1;

  // 6. Loss Coefficient Co
  const co = interpolate2D(ao_a1, theta, SD42_DATA.ao_a1, SD42_DATA.theta, SD42_DATA.values);

  // 7. Pressure Loss
  const po = co * pvo;

  return {
    c: co,
    velocity: vo,
    velocityPressure: pvo,
    theta,
    totalPressureLoss: po,
    reasoning: `Transition SD4-2: Rect ${w1.toFixed(2)}x${h1.toFixed(2)} to Round Ø${do_inch.toFixed(2)}. Ao/A1=${ao_a1.toFixed(2)}, Max Theta=${theta.toFixed(1)}°. Co=${co.toFixed(2)} (Ref Outlet VP).`
  };
};

export const calculateSR21 = (w: number, h: number, cfm: number) => {
    if (w <= 0 || h <= 0) return null;
    const area = (w * h) / 144;
    const velocity = cfm / area;
    const vp = Math.pow(velocity / 4005, 2);
    return {
        c: 1.0,
        velocity,
        velocityPressure: vp,
        totalPressureLoss: 1.0 * vp,
        reasoning: "Abrupt Exit (SR2-1): Loss coefficient is 1.0 (one velocity head)."
    };
};

export const calculateSR42 = (w1_inlet: number, h1_inlet: number, wo_outlet: number, ho_outlet: number, l: number, cfm: number) => {
    // Correct mapping based on ASHRAE SR4-2 Diagram 5-4
    // Subscript 'o' = Upstream (Inlet) dimensions (Ho, Wo)
    // Subscript '1' = Downstream (Outlet) dimensions (H1, W1)
    
    // The inputs come in as (w1, h1) for Inlet and (w2, h2) for Outlet from the UI mapping
    // So we map:
    const wo = w1_inlet; // Inlet Width
    const ho = h1_inlet; // Inlet Height
    const w1 = wo_outlet; // Outlet Width
    const h1 = ho_outlet; // Outlet Height

    if (ho <= 0 || wo <= 0 || h1 <= 0 || w1 <= 0 || l <= 0) return null;

    // 1. Areas (sq ft)
    const ao = (ho * wo) / 144; // Inlet (Upstream) Area
    const a1 = (h1 * w1) / 144; // Outlet (Downstream) Area

    // 2. Velocity (fpm) at Inlet
    const vo = cfm / ao; 
    
    // 3. Velocity Pressure at Inlet
    const pvo = Math.pow(vo / 4005, 2);

    // 4. Angles (Degrees)
    const theta1 = Math.abs((2 * 180 / Math.PI) * Math.atan((h1 - ho) / (2 * l)));
    const theta2 = Math.abs((2 * 180 / Math.PI) * Math.atan((w1 - wo) / (2 * l)));
    const theta = Math.max(theta1, theta2);

    // 5. Area Ratio: Outlet / Inlet (Ao / A1 is actually Outlet/Inlet ratio in the table lookup context, 
    // BUT typically ASHRAE Transition tables are Ao/A1 where Ao is smaller or specific. 
    // For SR4-2 Pyramidal Supply, the table uses Ao/A1. 
    // Wait, let's verify the table. The table provided has Ao/A1 ranges from 0.1 to 16.0.
    // In SR4-2 diagram: 'o' is upstream, '1' is downstream.
    // The table header says Ao/A1. So we calculate that ratio.
    const ratio = ao / a1; // Upstream Area / Downstream Area

    // 6. Loss Coefficient Co
    const co = interpolate2D(ratio, theta, SR42_DATA.ao_a1, SR42_DATA.theta, SR42_DATA.values);

    // 7. Pressure Loss based on Inlet VP (Pvo)
    const po = co * pvo;

    return {
        c: co,
        velocity: vo,
        velocityPressure: pvo,
        theta,
        totalPressureLoss: po,
        reasoning: `Pyramidal Transition (SR4-2): Inlet(o)=${wo.toFixed(2)}x${ho.toFixed(2)}, Outlet(1)=${w1.toFixed(2)}x${h1.toFixed(2)}. Ao/A1=${ratio.toFixed(2)}, Theta=${theta.toFixed(1)}°. Co=${co.toFixed(2)} (Ref Inlet VP).`
    };
};

export const calculateER42 = (wo_inlet: number, ho_inlet: number, w1_outlet: number, h1_outlet: number, l: number, cfm: number) => {
    // ER4-2: Transition, Pyramidal, Exhaust/Return
    // Inputs:
    // wo_inlet, ho_inlet: Upstream (Inlet) Dimensions (Wo, Ho)
    // w1_outlet, h1_outlet: Downstream (Outlet) Dimensions (W1, H1)
    
    const wo = wo_inlet;
    const ho = ho_inlet;
    const w1 = w1_outlet;
    const h1 = h1_outlet;

    if (wo <= 0 || ho <= 0 || w1 <= 0 || h1 <= 0 || l <= 0) return null;

    // 1. Areas
    const ao = (wo * ho) / 144; // Upstream Area (Ao)
    const a1 = (w1 * h1) / 144; // Downstream Area (A1)

    // 2. Velocity at Inlet (Ao)
    const vo = cfm / ao;
    
    // 3. Velocity Pressure at Inlet (Pvo)
    // Equation 5: Pvo = (Vo / 4005)^2
    const pvo = Math.pow(vo / 4005, 2);

    // 4. Angles
    const theta1 = Math.abs((2 * 180 / Math.PI) * Math.atan((w1 - wo) / (2 * l)));
    const theta2 = Math.abs((2 * 180 / Math.PI) * Math.atan((h1 - ho) / (2 * l)));
    const theta = Math.max(theta1, theta2);

    // 5. Area Ratio: Ao / A1
    const ao_a1 = ao / a1;

    // 6. Loss Coefficient Co
    // Interpolate using ER42_DATA (Ao/A1 vs Theta)
    const co = interpolate2D(ao_a1, theta, ER42_DATA.ao_a1, ER42_DATA.theta, ER42_DATA.values);

    // 7. Pressure Loss
    // Equation 12: Po = Co * Pvo (Based on Inlet VP)
    const po = co * pvo;

    return {
        c: co,
        velocity: vo,
        velocityPressure: pvo,
        theta,
        totalPressureLoss: po,
        reasoning: `Pyramidal Transition (ER4-2): Inlet(o)=${wo.toFixed(2)}x${ho.toFixed(2)}, Outlet(1)=${w1.toFixed(2)}x${h1.toFixed(2)}. Ao/A1=${ao_a1.toFixed(2)}, Theta=${theta.toFixed(1)}°. Co=${co.toFixed(2)} (Ref Inlet VP).`
    };
};

export const calculateSR43 = (d1: number, wo: number, ho: number, l: number, cfm: number) => {
     // Round to Rectangular Supply (SR4-3)
     // D1: Inlet Diameter
     // Wo: Outlet Width
     // Ho: Outlet Height
     
     if (d1 <= 0 || wo <= 0 || ho <= 0 || l <= 0) return null;

     // 1. Areas
     const a1 = (Math.PI * Math.pow(d1 / 2, 2)) / 144; // Inlet Round (A1)
     const ao = (wo * ho) / 144; // Outlet Rect (Ao)

     // 2. Velocity & VP at Outlet (Rectangular Ao)
     const vo = cfm / ao;
     const pvo = Math.pow(vo / 4005, 2);

     // 3. Angles
     // Theta1 uses Ho (Height) vs Diameter
     const theta1 = Math.abs((2 * 180 / Math.PI) * Math.atan((d1 - ho) / (2 * l)));
     // Theta2 uses Wo (Width) vs Diameter
     const theta2 = Math.abs((2 * 180 / Math.PI) * Math.atan((d1 - wo) / (2 * l)));
     const theta = Math.max(theta1, theta2);

     // 4. Area Ratio: Outlet (Rect) / Inlet (Round) = Ao/A1
     const ao_a1 = ao / a1;

     // 5. Loss Coefficient Co
     // Interpolate using SR43_DATA (Ao/A1 vs Theta)
     const co = interpolate2D(ao_a1, theta, SR43_DATA.ao_a1, SR43_DATA.theta, SR43_DATA.values);

     // 6. Pressure Loss (based on Outlet VP)
     const po = co * pvo;

     return {
        c: co,
        velocity: vo,
        velocityPressure: pvo,
        theta,
        totalPressureLoss: po,
        reasoning: `Transition SR4-3: Round Ø${d1.toFixed(2)} to Rect ${wo.toFixed(2)}x${ho.toFixed(2)}. Ao/A1=${ao_a1.toFixed(2)}, Max Theta=${theta.toFixed(1)}°. Co=${co.toFixed(2)} (Ref Outlet VP).`
     };
};

export const calculateER43 = (wo: number, ho: number, d1: number, l: number, cfm: number) => {
    // ER4-3: Transition, Rectangular to Round, Exhaust/Return (Idelchik 1986, Diagram 5-27)
    // Inputs:
    // wo, ho: Rectangular dimensions (Inlet for Exhaust)
    // d1: Round diameter (Outlet for Exhaust)
    
    if (wo <= 0 || ho <= 0 || d1 <= 0 || l <= 0) return null;

    // 1. Areas
    const ao = (wo * ho) / 144; // Rectangular (Inlet) Area
    const a1 = (Math.PI * Math.pow(d1 / 2, 2)) / 144; // Round (Outlet) Area

    // 2. Velocity at Inlet (Ao) - Rectangular
    const vo = cfm / ao;
    
    // 3. Velocity Pressure at Inlet (Pvo)
    const pvo = Math.pow(vo / 4005, 2);

    // 4. Angles
    // Equation 7: Theta1 based on Height (Ho) and Diameter (D1)
    const theta1 = Math.abs((2 * 180 / Math.PI) * Math.atan((d1 - ho) / (2 * l)));
    // Equation 8: Theta2 based on Width (Wo) and Diameter (D1)
    const theta2 = Math.abs((2 * 180 / Math.PI) * Math.atan((d1 - wo) / (2 * l)));
    
    // Equation 9: Max Theta
    const theta = Math.max(theta1, theta2);

    // 5. Area Ratio Ao/A1 (Rect Inlet / Round Outlet)
    const ao_a1 = ao / a1;

    // 6. Loss Coefficient Co
    // Interpolate using ER43_DATA (Ao/A1 vs Theta)
    const co = interpolate2D(ao_a1, theta, ER43_DATA.ao_a1, ER43_DATA.theta, ER43_DATA.values);

    // 7. Pressure Loss
    // Equation 12: Po = Co * Pvo (Based on Inlet VP)
    const po = co * pvo;

    return {
        c: co,
        velocity: vo,
        velocityPressure: pvo,
        theta,
        totalPressureLoss: po,
        reasoning: `Transition ER4-3: Rect ${wo.toFixed(2)}x${ho.toFixed(2)} to Round Ø${d1.toFixed(2)}. Ao/A1=${ao_a1.toFixed(2)}, Max Theta=${theta.toFixed(1)}°. Co=${co.toFixed(2)} (Ref Inlet VP).`
    };
};

export const calculateED42 = (d_inlet: number, w_outlet: number, h_outlet: number, l: number, cfm: number) => {
     // ED4-2: Transition, Round to Rectangular, Exhaust/Return (Idelchik 1986, Diagram 5-27)
     // Inputs:
     // d_inlet: Do (Round Inlet)
     // w_outlet, h_outlet: W1, H1 (Rectangular Outlet)
     
     const do_in = d_inlet;
     const w1 = w_outlet;
     const h1 = h_outlet;

     if (do_in <= 0 || w1 <= 0 || h1 <= 0 || l <= 0) return null;

     // 1. Areas
     const ao = (Math.PI * Math.pow(do_in / 2, 2)) / 144; // Round Inlet Area (Ao)
     const a1 = (w1 * h1) / 144; // Rect Outlet Area (A1)

     // 2. Velocity at Inlet (Ao) - Round
     const vo = cfm / ao;
     
     // 3. Velocity Pressure at Inlet (Pvo)
     const pvo = Math.pow(vo / 4005, 2);

     // 4. Angles
     // Equation 7: Theta1 using H1 and Do
     const theta1 = Math.abs((2 * 180 / Math.PI) * Math.atan((h1 - do_in) / (2 * l)));
     // Equation 8: Theta2 using W1 and Do
     const theta2 = Math.abs((2 * 180 / Math.PI) * Math.atan((w1 - do_in) / (2 * l)));
     const theta = Math.max(theta1, theta2);

     // 5. Area Ratio Ao/A1 (Round Inlet / Rect Outlet)
     const ao_a1 = ao / a1;

     // 6. Loss Coefficient Co
     // Interpolate using ED42_DATA (Ao/A1 vs Theta)
     const co = interpolate2D(ao_a1, theta, ED42_DATA.ao_a1, ED42_DATA.theta, ED42_DATA.values);

     // 7. Pressure Loss
     // Equation 12: Po = Co * Pvo (Based on Inlet VP)
     const po = co * pvo;

     return {
        c: co,
        velocity: vo,
        velocityPressure: pvo,
        theta,
        totalPressureLoss: po,
        reasoning: `Transition ED4-2: Round Ø${do_in.toFixed(2)} to Rect ${w1.toFixed(2)}x${h1.toFixed(2)}. Ao/A1=${ao_a1.toFixed(2)}, Max Theta=${theta.toFixed(1)}°. Co=${co.toFixed(2)} (Ref Inlet VP).`
     };
};

export const calculateCD85 = (d: number, cfm: number) => {
    if (d <= 0) return null;
    const area = (Math.PI * Math.pow(d/2, 2)) / 144;
    const velocity = cfm / area;
    const vp = Math.pow(velocity / 4005, 2);
    const c = 0.87; 
    return {
        c, velocity, velocityPressure: vp, totalPressureLoss: c*vp,
        reasoning: "Standard Silencer (CD8-5) approximation."
    };
};

export const calculateCR93 = (w: number, h: number, cfm: number) => {
    if (w <= 0 || h <= 0) return null;
    const area = (w*h)/144;
    const velocity = cfm / area;
    const vp = Math.pow(velocity / 4005, 2);
    const c = 0.37; // Open damper approx
    return {
        c, velocity, velocityPressure: vp, totalPressureLoss: c*vp,
        reasoning: "Damper Open (CR9-3): Fixed coefficient approximation."
    };
};

export const calculateCR95 = (w: number, h: number, cfm: number) => {
    if (w <= 0 || h <= 0) return null;
    const area = (w*h)/144;
    const velocity = cfm / area;
    const vp = Math.pow(velocity / 4005, 2);
    
    // Per Idelchik 1986, Diagram 5-27 / ASHRAE CR9-5 Type A
    // Co is fixed at 0.46
    const c = 0.46; 
    
    return {
        c, 
        velocity, 
        velocityPressure: vp, 
        totalPressureLoss: c * vp,
        reasoning: "Fire Damper Type A (CR9-5): Fixed coefficient Co = 0.46."
    };
};

export const calculateCR111 = (w: number, h: number, l: number, cfm: number, roughnessFt: number) => {
    if (w <= 0 || h <= 0 || l <= 0) return null;
    
    // 1. Area (sq ft)
    const area = (w * h) / 144;
    
    // 2. Velocity (fpm)
    const velocity = cfm / area;
    
    // 7. Velocity Pressure
    const vp = Math.pow(velocity / 4005, 2);
    
    // 4. Hydraulic Diameter (inches)
    // Dh = 4 * Area / Perimeter = 4WH / 2(W+H) = 2WH/(W+H)
    const dh = (2 * w * h) / (w + h);
    
    // 5. Reynolds Number
    // Re = 8.56 * Dh(in) * V(fpm) (Standard Air approximation)
    const re = 8.56 * dh * velocity;
    
    // Roughness (epsilon) in inches (input is feet)
    // Handle '0' input correctly: allow explicit 0 (smooth), default to 0.0003 only if undefined/null.
    const r = (roughnessFt === undefined || roughnessFt === null) ? 0.0003 : roughnessFt;
    const epsilon = r * 12;
    
    // 9. Friction Factor (f) via Swamee-Jain approximation of Colebrook
    let f = 0.02; 
    if (re > 0) {
        if (re < 2000) {
            f = 64 / re; // Laminar
        } else {
             // Turbulent
             const t1 = epsilon / (3.7 * dh);
             const t2 = 5.74 / Math.pow(re, 0.9);
             f = 0.25 / Math.pow(Math.log10(t1 + t2), 2);
        }
    }
    
    // 12. Pressure Loss
    // Standard Darcy: hf = f * (L/D) * VP
    // Inputs: l (inches), dh (inches)
    // Standard formula is dimensionless ratio, so inches/inches is correct
    const totalPressureLoss = f * (l / dh) * vp;
    
    // Create an effective "C" coefficient representing friction loss per VP
    const effectiveC = totalPressureLoss / (vp || 1);

    // Display length in feet for readability in the output message
    const lengthFt = l / 12;

    return {
        c: effectiveC,
        velocity,
        velocityPressure: vp,
        totalPressureLoss,
        reasoning: `Straight Duct (CR11-1): L=${lengthFt.toFixed(1)}ft, Dh=${dh.toFixed(1)}", e=${r}ft. Re=${re.toExponential(2)}, f=${f.toFixed(4)}.`
    };
};

export const calculateSR513 = (w: number, h: number, w2: number, h2: number, w3: number, h3: number, qc: number, qb: number) => {
    if (w <= 0 || h <= 0 || w2 <= 0 || h2 <= 0) return null;
    
    // Areas
    const ac = (w * h) / 144; // Common (Inlet)
    const ab = (w2 * h2) / 144; // Branch
    // If downstream width/height not specified, assume same as common (straight run)
    const as = (w3 > 0 && h3 > 0) ? (w3 * h3) / 144 : ac; 
    
    // Flow
    const qs = qc - qb;

    // Velocities & Velocity Pressures
    const vc = qc / ac;
    
    const vb = ab > 0 ? qb / ab : 0;
    const vpb = Math.pow(vb / 4005, 2);

    const vs = as > 0 ? qs / as : 0;
    const pvs = Math.pow(vs / 4005, 2);

    // Ratios
    const ab_ac = ab / ac;
    const as_ac = as / ac;
    const qb_qc = qc > 0 ? qb / qc : 0;
    const qs_qc = qc > 0 ? qs / qc : 0;
    
    // Interpolate Branch Cb based on Ab/Ac and Qb/Qc
    // Correct order for interpolate2D based on table structure: (qb_qc, ab_ac)
    const cb = interpolate2D(ab_ac, qb_qc, SR513_CB_DATA.ab_ac, SR513_CB_DATA.qb_qc, SR513_CB_DATA.values);
    
    // Interpolate Main Cs based on As/Ac and Qs/Qc
    const cs = interpolate2D(as_ac, qs_qc, SR513_CS_DATA.as_ac, SR513_CS_DATA.qs_qc, SR513_CS_DATA.values);
    
    return {
        mainVelocity: vs,
        branchVelocity: vb,
        mainVelocityPressure: pvs,
        branchVelocityPressure: vpb,
        mainCo: cs,
        branchCo: cb,
        mainLoss: cs * pvs, // Eq 14: Pos = Cs * Pvs
        branchLoss: cb * vpb, // Eq 12: Pob = Cb * Pvb
        reasoning: `Diverging Tee (SR5-13): Ab/Ac=${ab_ac.toFixed(2)}, Qb/Qc=${qb_qc.toFixed(2)} -> Cb=${cb.toFixed(2)} (on Pvb). As/Ac=${as_ac.toFixed(2)}, Qs/Qc=${qs_qc.toFixed(2)} -> Cs=${cs.toFixed(2)} (on Pvs).`
    };
};

export const calculateER53 = (w: number, h: number, w2: number, h2: number, w3: number, h3: number, qc: number, qb: number) => {
    // ER5-3: Tee, 45 Degree Entry Branch, Converging
    // Inputs:
    // W, H: Common (Downstream) dimensions (Qc) - mapped from inputs 'width', 'height'
    // Wb, Hb: Branch dimensions (Qb) - mapped from inputs 'width2', 'height2'
    // Ws, Hs: Main (Upstream) dimensions (Qs) - mapped from inputs 'width3', 'height3'
    // Qc: Common flow (Total)
    // Qb: Branch flow
    
    if (w <= 0 || h <= 0 || w2 <= 0 || h2 <= 0) return null;

    // Areas (sq ft)
    const ac = (w * h) / 144; // Common (Downstream)
    const ab = (w2 * h2) / 144; // Branch
    const as = (w3 > 0 && h3 > 0) ? (w3 * h3) / 144 : ac; // Main Upstream (defaults to common size)

    // Flow
    // For converging tee: Qc = Qb + Qs  =>  Qs = Qc - Qb
    const qs = qc - qb;
    if (qs < 0) return null; // Invalid flow

    // Velocities
    const vc = qc / ac;
    // const pvc = Math.pow(vc / 4005, 2);

    const vb = ab > 0 ? qb / ab : 0;
    const vpb = Math.pow(vb / 4005, 2);

    const vs = as > 0 ? qs / as : 0;
    const pvs = Math.pow(vs / 4005, 2);

    // Ratios
    const qb_qc = qc > 0 ? qb / qc : 0;
    const qs_qc = qc > 0 ? qs / qc : 0;

    // Coefficients
    // Interpolate Cb using Qb/Qc (1D interpolation per supplied table)
    const cb = interpolate(qb_qc, ER53_CB_DATA.qb_qc, ER53_CB_DATA.values);

    // Interpolate Cs using Qs/Qc (1D interpolation per supplied table)
    const cs = interpolate(qs_qc, ER53_CS_DATA.qs_qc, ER53_CS_DATA.values);

    return {
        mainVelocity: vs,
        branchVelocity: vb,
        mainVelocityPressure: pvs,
        branchVelocityPressure: vpb,
        mainCo: cs,
        branchCo: cb,
        mainLoss: cs * pvs, // Pos = Cs * Pvs
        branchLoss: cb * vpb, // Pob = Cb * Pvb
        reasoning: `Converging Tee (ER5-3): Qb/Qc=${qb_qc.toFixed(2)} -> Cb=${cb.toFixed(2)} (on Pvb). Qs/Qc=${qs_qc.toFixed(2)} -> Cs=${cs.toFixed(2)} (on Pvs).`
    };
};

export const calculateSR515 = (wc: number, h: number, wb1: number, wb2: number, qc: number, qb1: number) => {
  if (wc <= 0 || h <= 0 || wb1 <= 0 || wb2 <= 0) return null;
  
  if (qb1 > qc) return null;

  // Common (Inlet) Area
  const ac = (wc * h) / 144;
  if (ac <= 0) return null;
  const vc = qc / ac;
  const vpc = Math.pow(vc / 4005, 2);

  // Branch 1
  const ab1 = (wb1 * h) / 144;
  const vb1 = ab1 > 0 ? qb1 / ab1 : 0;
  const vpb1 = Math.pow(vb1 / 4005, 2);
  const ab_ac_1 = ab1 / ac;
  const qb_qc_1 = qc !== 0 ? qb1 / qc : 0;
  
  const cb1 = interpolate2D(ab_ac_1, qb_qc_1, SR515_DATA.ab_ac, SR515_DATA.qb_qc, SR515_DATA.values);

  // Branch 2
  const qb2 = qc - qb1;
  const ab2 = (wb2 * h) / 144;
  const vb2 = ab2 > 0 ? qb2 / ab2 : 0;
  const vpb2 = Math.pow(vb2 / 4005, 2);
  const ab_ac_2 = ab2 / ac;
  const qb_qc_2 = qc !== 0 ? qb2 / qc : 0;
  
  const cb2 = interpolate2D(ab_ac_2, qb_qc_2, SR515_DATA.ab_ac, SR515_DATA.qb_qc, SR515_DATA.values);

  return {
    velocity: vc,
    velocityPressure: vpc,
    
    b1_velocity: vb1,
    b1_vp: vpb1,
    b1_c: cb1,
    b1_loss: cb1 * vpb1,
    b1_reasoning: `Branch 1: Ab1/Ac=${ab_ac_1.toFixed(2)}, Qb1/Qc=${qb_qc_1.toFixed(2)} -> Cb1=${cb1.toFixed(2)} based on Branch VP.`,

    b2_velocity: vb2,
    b2_vp: vpb2,
    b2_c: cb2,
    b2_loss: cb2 * vpb2,
    b2_reasoning: `Branch 2: Ab2/Ac=${ab_ac_2.toFixed(2)}, Qb2/Qc=${qb_qc_2.toFixed(2)} -> Cb2=${cb2.toFixed(2)} based on Branch VP.`,

    c: cb1,
    totalPressureLoss: cb1 * vpb1,
    reasoning: `Bullhead Tee Diverging (SR5-15): Calculated for both branches using area and flow ratios.`
  };
};

export const calculateER55 = (wc: number, h: number, wb1: number, wb2: number, qc: number, qb1: number) => {
  if (wc <= 0 || h <= 0 || wb1 <= 0 || wb2 <= 0) return null;
  if (qc <= 0) return null;
  
  if (qb1 > qc) return null;

  const ac = (wc * h) / 144;
  const vc = qc / ac;
  const vpc = Math.pow(vc / 4005, 2);

  // Branch 1
  const ab1 = (wb1 * h) / 144;
  const vb1 = ab1 > 0 ? qb1 / ab1 : 0;
  const vpb1 = Math.pow(vb1 / 4005, 2);
  const ab_ac_1 = ab1 / ac;
  const qb_qc_1 = qb1 / qc;
  const cb1 = interpolate2D(ab_ac_1, qb_qc_1, ER55_DATA.ab_ac, ER55_DATA.qb_qc, ER55_DATA.values);

  // Branch 2
  const qb2 = qc - qb1;
  const ab2 = (wb2 * h) / 144;
  const vb2 = ab2 > 0 ? qb2 / ab2 : 0;
  const vpb2 = Math.pow(vb2 / 4005, 2);
  const ab_ac_2 = ab2 / ac;
  const qb_qc_2 = qb2 / qc;
  const cb2 = interpolate2D(ab_ac_2, qb_qc_2, ER55_DATA.ab_ac, ER55_DATA.qb_qc, ER55_DATA.values);

  return {
    velocity: vc,
    velocityPressure: vpc,

    b1_velocity: vb1,
    b1_vp: vpb1,
    b1_c: cb1,
    b1_loss: cb1 * vpb1,
    b1_reasoning: `Branch 1: Ab1/Ac=${ab_ac_1.toFixed(2)}, Qb1/Qc=${qb_qc_1.toFixed(2)} based on Branch VP`,

    b2_velocity: vb2,
    b2_vp: vpb2,
    b2_c: cb2,
    b2_loss: cb2 * vpb2,
    b2_reasoning: `Branch 2: Ab2/Ac=${ab_ac_2.toFixed(2)}, Qb2/Qc=${qb_qc_2.toFixed(2)} based on Branch VP`,

    c: cb1,
    totalPressureLoss: cb1 * vpb1,
    reasoning: `Bullhead Tee Converging (ER5-5): Calculated for both branches.`
  };
};
