
import React, { useState, useCallback, useMemo } from 'react';
import { DuctShape, DuctDimensions, FittingResult } from '../types';
import { 
  calculateCR31, calculateSD42, calculateSR21, calculateSR42, 
  calculateSR43, calculateSR513, calculateCD85, calculateCR93, 
  calculateCR95, calculateER53, calculateER42, calculateER43, calculateED42,
  calculateSR515, calculateER55, calculateCR111
} from '../services/ashraeService';
import { CalculatorInputs } from './CalculatorInputs';
import { ResultSection } from './ResultSection';
import { ProjectSchedule } from './ProjectSchedule';
import { FITTING_DB } from '../constants/fittings';

export const FittingCalculator: React.FC = () => {
  // --- Input State ---
  const [shape, setShape] = useState<DuctShape>(DuctShape.RECTANGULAR);
  const [cfm, setCfm] = useState<string>((3000 / 1.699).toString()); 
  const [cfm2, setCfm2] = useState<string>((1500 / 1.699).toString());
  
  const [dimensions, setDimensions] = useState<DuctDimensions>({ 
    width: 300 / 25.4, height: 300 / 25.4, width2: 0, height2: 0, 
    width3: 0, height3: 0, diameter: 300 / 25.4, length: 300 / 25.4 
  });
  
  const [fittingType, setFittingType] = useState<string>('Rectangular Elbow, Smooth Radius without Vanes');
  const [ashraeCode, setAshraeCode] = useState<string>('CR3-1');
  
  const [angle, setAngle] = useState<number>(90);
  const [radiusRatio, setRadiusRatio] = useState<number>(0.75);
  const [pressurePath, setPressurePath] = useState<'main' | 'branch'>('main');
  const [showSiUnits, setShowSiUnits] = useState<boolean>(true); 
  const [roughness, setRoughness] = useState<number>(0.0003); // Default Galvanized Steel in ft
  const [currentResult, setCurrentResult] = useState<FittingResult | null>(null);
  const [projectRows, setProjectRows] = useState<FittingResult[]>([]);
  const [systemNo, setSystemNo] = useState<string>('');

  const handleDimChange = (field: keyof DuctDimensions, val: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) return;
    setDimensions(prev => ({ ...prev, [field]: showSiUnits ? num / 25.4 : num }));
  };

  const handleFlowChange = (val: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) return;
    setCfm(showSiUnits ? (num / 1.699).toString() : val);
  };

  const handleFlow2Change = (val: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) return;
    setCfm2(showSiUnits ? (num / 1.699).toString() : val);
  };

  const handleClear = () => {
    setCfm('');
    setCfm2('');
    setDimensions({ width: 0, height: 0, width2: 0, height2: 0, width3: 0, height3: 0, diameter: 0, length: 0 });
    setRadiusRatio(NaN);
    setAngle(NaN);
    setCurrentResult(null);
  };

  const handleFittingTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setFittingType(selectedName);
    const found = FITTING_DB.find(f => f.name === selectedName);
    if (found) {
      setAshraeCode(found.code);
      if (found.code === 'Custom') {
        setCurrentResult(null);
      }
      if (['CD8-5', 'SR4-3', 'ED4-2'].includes(found.code)) {
        setShape(DuctShape.ROUND);
      } else {
        setShape(DuctShape.RECTANGULAR);
      }

      // Default values for SR5-15 (Bullhead Tee Diverging)
      if (found.code === 'SR5-15') {
        setDimensions(prev => ({
          ...prev,
          width: 300 / 25.4,
          height: 300 / 25.4,
          width2: 200 / 25.4,
          width3: 200 / 25.4
        }));
        setCfm((2500 / 1.699).toString());
        setCfm2((1200 / 1.699).toString());
      }

      // Default values for ER5-5 (Bullhead Tee Converging)
      if (found.code === 'ER5-5') {
        setDimensions(prev => ({
          ...prev,
          width: 300 / 25.4,
          height: 300 / 25.4,
          width2: 200 / 25.4,
          width3: 200 / 25.4
        }));
        setCfm((2500 / 1.699).toString());
        setCfm2((1200 / 1.699).toString());
      }

      // Default values for ER5-3
      if (found.code === 'ER5-3') {
        setDimensions(prev => ({
          ...prev,
          width: 300 / 25.4,
          height: 300 / 25.4,
          width2: 200 / 25.4,
          height2: 200 / 25.4
        }));
        setCfm((2500 / 1.699).toString());
        setCfm2((1200 / 1.699).toString());
      }

      // Default values for SR5-13
      if (found.code === 'SR5-13') {
        setDimensions(prev => ({
          ...prev,
          width: 300 / 25.4,
          height: 300 / 25.4,
          width2: 200 / 25.4,
          height2: 200 / 25.4,
          width3: 200 / 25.4,
          height3: 200 / 25.4
        }));
        setCfm((2500 / 1.699).toString());
        setCfm2((1200 / 1.699).toString());
      }

      // Default values for SR2-1 (Abrupt Exit)
      if (found.code === 'SR2-1') {
        setDimensions(prev => ({
          ...prev,
          width: 300 / 25.4,
          height: 300 / 25.4,
        }));
        setCfm((2500 / 1.699).toString());
      }
    }
  };

  const calculateVelocity = useCallback((): number => {
    const airflow = parseFloat(cfm) || 0;
    if (airflow <= 0) return 0;
    let areaSqFt = 0;
    if (['SD4-2', 'CD8-5', 'ED4-2', 'SR4-3'].includes(ashraeCode)) {
         const d = dimensions.diameter || 0;
         areaSqFt = (Math.PI * Math.pow(d / 2, 2)) / 144;
         if (ashraeCode === 'SR4-3') {
              const w = dimensions.width || 0; const h = dimensions.height || 0;
              areaSqFt = (w * h) / 144;
         }
    } else {
      const w = dimensions.width || 0; const h = dimensions.height || 0;
      areaSqFt = (w * h) / 144;
    }
    return areaSqFt <= 0 ? 0 : airflow / areaSqFt;
  }, [cfm, dimensions, shape, ashraeCode]);

  const generateDescription = (code: string, dims: DuctDimensions, unit: string, fmt: (v: number|undefined) => number) => {
      if (['SD4-2', 'ER4-3', 'ED4-2'].includes(code)) return `${fmt(dims.width)}x${fmt(dims.height)} to ø${fmt(dims.diameter)} ${unit}`;
      if (['SR4-2', 'ER4-2'].includes(code)) return `${fmt(dims.width)}x${fmt(dims.height)} to ${fmt(dims.width2)}x${fmt(dims.height2)} ${unit}`;
      if (code === 'SR4-3') return `ø${fmt(dims.diameter)} to ${fmt(dims.width)}x${fmt(dims.height)} ${unit}`;
      if (['SR5-13', 'ER5-3'].includes(code)) return `${fmt(dims.width)}x${fmt(dims.height)} w/ ${fmt(dims.width2)}x${fmt(dims.height2)} Br`;
      if (['SR5-15', 'ER5-5'].includes(code)) return `Common ${fmt(dims.width)}x${fmt(dims.height)}, B1: ${fmt(dims.width2)}W, B2: ${fmt(dims.width3)}W`;
      if (code === 'CD8-5') return `ø${fmt(dims.diameter)} ${unit}`;
      if (code === 'CR11-1') return `${fmt(dims.width)}x${fmt(dims.height)} ${unit}, L=${fmt(dims.length)}`;
      return shape === DuctShape.RECTANGULAR || code === 'SR2-1' ? `${fmt(dims.width)}x${fmt(dims.height)} ${unit}` : `${fmt(dims.diameter)} ${unit} diameter`;
  };

  const handleCalculate = async () => {
    const safeCfm = parseFloat(cfm) || 0;
    const safeCfm2 = parseFloat(cfm2) || 0;
    const velocity = calculateVelocity();

    if (velocity <= 0 && !['SR5-13', 'ER5-3', 'SR5-15', 'ER5-5'].includes(ashraeCode)) {
      alert("Please check your dimensions and airflow inputs."); return;
    }

    const fmt = (val: number | undefined) => (val === undefined ? 0 : (showSiUnits ? Math.round(val * 25.4) : parseFloat(val.toFixed(2))));
    const dimDesc = generateDescription(ashraeCode, dimensions, showSiUnits ? 'mm' : 'inch', fmt);
    const fullDescription = `${fittingType}, ${dimDesc}`;
    
    // Dispatcher
    let result: any = null;
    let tip = "";

    if (ashraeCode === 'SR5-15') {
        const res = calculateSR515(dimensions.width||0, dimensions.height||0, dimensions.width2||0, dimensions.width3||0, safeCfm, safeCfm2);
        if (res) {
            const isB1 = pressurePath === 'main';
            result = {
                velocity: isB1 ? res.b1_velocity : res.b2_velocity,
                velocityPressure: isB1 ? res.b1_vp : res.b2_vp,
                c: isB1 ? res.b1_c : res.b2_c,
                totalPressureLoss: isB1 ? res.b1_loss : res.b2_loss,
                reasoning: isB1 ? res.b1_reasoning : res.b2_reasoning
            };
            tip = "Use toggle to switch branches.";
        }
    } else if (ashraeCode === 'ER5-5') {
        const res = calculateER55(dimensions.width||0, dimensions.height||0, dimensions.width2||0, dimensions.width3||0, safeCfm, safeCfm2);
        if (res) {
            const isB1 = pressurePath === 'main';
            result = {
                velocity: isB1 ? res.b1_velocity : res.b2_velocity,
                velocityPressure: isB1 ? res.b1_vp : res.b2_vp,
                c: isB1 ? res.b1_c : res.b2_c,
                totalPressureLoss: isB1 ? res.b1_loss : res.b2_loss,
                reasoning: isB1 ? res.b1_reasoning : res.b2_reasoning
            };
            tip = "Use toggle to switch branches.";
        }
    } else if (ashraeCode === 'CD8-5') {
        result = calculateCD85(dimensions.diameter||0, safeCfm);
        tip = "Silencer pressure drop is fixed by bullet geometry.";
    } else if (ashraeCode === 'CR9-3') {
        result = calculateCR93(dimensions.width||0, dimensions.height||0, safeCfm);
        tip = "Ensure damper is fully open.";
    } else if (ashraeCode === 'CR9-5') {
        result = calculateCR95(dimensions.width||0, dimensions.height||0, safeCfm);
        tip = "Type A fire dampers have blades in airstream.";
    } else if (ashraeCode === 'CR3-1') {
        result = calculateCR31(dimensions.width||0, dimensions.height||0, radiusRatio||0, angle||0, safeCfm);
        tip = "Efficiency depends heavily on aspect ratio.";
    } else if (ashraeCode === 'SD4-2') {
        result = calculateSD42(dimensions.width||0, dimensions.height||0, dimensions.diameter||0, dimensions.length||0, safeCfm);
        tip = "Minimize transition angle.";
    } else if (ashraeCode === 'SR2-1') {
        result = calculateSR21(dimensions.width||0, dimensions.height||0, safeCfm);
        tip = "Abrupt exits lose all velocity pressure.";
    } else if (ashraeCode === 'SR4-2') {
        result = calculateSR42(dimensions.width||0, dimensions.height||0, dimensions.width2||0, dimensions.height2||0, dimensions.length||0, safeCfm);
        tip = "Minimize expansion angle.";
    } else if (ashraeCode === 'ER4-2') {
        result = calculateER42(dimensions.width||0, dimensions.height||0, dimensions.width2||0, dimensions.height2||0, dimensions.length||0, safeCfm);
    } else if (ashraeCode === 'ER4-3') {
        result = calculateER43(dimensions.width||0, dimensions.height||0, dimensions.diameter||0, dimensions.length||0, safeCfm);
    } else if (ashraeCode === 'SR4-3') {
        result = calculateSR43(dimensions.diameter||0, dimensions.width||0, dimensions.height||0, dimensions.length||0, safeCfm);
    } else if (ashraeCode === 'ED4-2') {
        result = calculateED42(dimensions.diameter||0, dimensions.width||0, dimensions.height||0, dimensions.length||0, safeCfm);
    } else if (ashraeCode === 'CR11-1') {
        result = calculateCR111(dimensions.width||0, dimensions.height||0, dimensions.length||0, safeCfm, roughness);
        tip = "Friction depends on roughness and hydraulic diameter.";
    } else if (ashraeCode === 'SR5-13') {
        const res = calculateSR513(dimensions.width||0, dimensions.height||0, dimensions.width2||0, dimensions.height2||0, dimensions.width3||0, dimensions.height3||0, safeCfm, safeCfm2);
        if (res) {
            const isMain = pressurePath === 'main';
            result = {
                velocity: isMain ? res.mainVelocity : res.branchVelocity,
                velocityPressure: isMain ? res.mainVelocityPressure : res.branchVelocityPressure,
                c: isMain ? res.mainCo : res.branchCo,
                totalPressureLoss: isMain ? res.mainLoss : res.branchLoss,
                reasoning: res.reasoning
            };
            tip = "Use toggle for Main/Branch path.";
        }
    } else if (ashraeCode === 'ER5-3') {
        // For ER5-3, input cfm is Upstream (Qs) and cfm2 is Branch (Qb).
        // The service expects Common (Qc) and Branch (Qb).
        // Qc = Qs + Qb.
        const totalQc = safeCfm + safeCfm2;
        
        // Pass 0 for upstream dimensions (w3, h3) so service defaults As = Ac.
        const res = calculateER53(dimensions.width||0, dimensions.height||0, dimensions.width2||0, dimensions.height2||0, 0, 0, totalQc, safeCfm2);
        if (res) {
            const isMain = pressurePath === 'main';
            result = {
                velocity: isMain ? res.mainVelocity : res.branchVelocity,
                velocityPressure: isMain ? res.mainVelocityPressure : res.branchVelocityPressure,
                c: isMain ? res.mainCo : res.branchCo,
                totalPressureLoss: isMain ? res.mainLoss : res.branchLoss,
                reasoning: res.reasoning
            };
            tip = "Use toggle for Main/Branch path.";
        }
    }

    if (result) {
        setCurrentResult({
            id: crypto.randomUUID(),
            ashraeCode, fittingType, shape, dimensions: { ...dimensions },
            angle: fittingType.toLowerCase().includes('elbow') ? angle : result.theta,
            radiusRatio: fittingType.toLowerCase().includes('elbow') ? radiusRatio : undefined,
            airflow: (ashraeCode === 'SR5-15' || ashraeCode === 'ER5-5') ? (pressurePath === 'main' ? safeCfm2 : (safeCfm - safeCfm2)) : (ashraeCode === 'SR5-13' ? (pressurePath === 'branch' ? safeCfm2 : (safeCfm - safeCfm2)) : (ashraeCode === 'ER5-3' ? (pressurePath === 'branch' ? safeCfm2 : safeCfm) : safeCfm)),
            velocity: result.velocity,
            velocityPressure: result.velocityPressure,
            coefficient: result.c,
            totalPressureLoss: result.totalPressureLoss,
            fittingDescription: (ashraeCode === 'SR5-15' || ashraeCode === 'ER5-5' || ashraeCode === 'SR5-13' || ashraeCode === 'ER5-3') ? `${fullDescription} [${pressurePath === 'main' ? (ashraeCode === 'SR5-13' || ashraeCode === 'ER5-3' ? 'Main' : 'Branch 1') : (ashraeCode === 'SR5-13' || ashraeCode === 'ER5-3' ? 'Branch' : 'Branch 2')}]` : fullDescription,
            aiReasoning: result.reasoning,
            aiTip: tip,
            timestamp: Date.now()
        });
    } else {
        alert("Calculation for this fitting type is not yet implemented or inputs are invalid.");
    }
  };

  const addToProject = () => { if (currentResult) { setProjectRows(prev => [...prev, currentResult]); setCurrentResult(null); } };
  const totalProjectLoss = useMemo(() => projectRows.reduce((sum, row) => sum + row.totalPressureLoss, 0), [projectRows]);

  const handleDirectInsertCustom = (data: {
    ashraeNo: string;
    fittingType: string;
    airflow: string;
    size: string;
    velocity: string;
    velPressure: string;
    coefficient: string;
    loss: string;
  }) => {
    const safeLoss = parseFloat(data.loss) || 0;
    const safeFlow = parseFloat(data.airflow) || 0;
    const safeVel = parseFloat(data.velocity) || 0;
    const safeVp = parseFloat(data.velPressure) || 0;
    const safeCoeff = parseFloat(data.coefficient) || 0;

    // Convert values to internal IP units:
    // Airflow: CFM
    const internalFlow = showSiUnits ? (safeFlow / 1.699) : safeFlow;
    // Velocity: FPM
    const internalVel = showSiUnits ? (safeVel / 0.00508) : safeVel;
    // Vel Pressure: in. wg
    const internalVp = showSiUnits ? (safeVp / 249.089) : safeVp;
    // Total Pressure Loss: in. wg
    const internalLoss = showSiUnits ? (safeLoss / 249.089) : safeLoss;

    const code = data.ashraeNo.trim() || 'Custom';
    const typeName = data.fittingType.trim() || 'Custom';
    const sizeStr = data.size.trim();

    let width = 0;
    let height = 0;
    let diameter = 0;
    let customShape = DuctShape.RECTANGULAR;

    const rectMatch = sizeStr.match(/^(\d+(?:\.\d+)?)\s*[xX*×]\s*(\d+(?:\.\d+)?)$/);
    const roundMatch = sizeStr.match(/^[dDøØ]?\s*(\d+(?:\.\d+)?)$/);

    if (rectMatch) {
      const w = parseFloat(rectMatch[1]);
      const h = parseFloat(rectMatch[2]);
      width = showSiUnits ? w / 25.4 : w;
      height = showSiUnits ? h / 25.4 : h;
      customShape = DuctShape.RECTANGULAR;
    } else if (roundMatch && (sizeStr.toLowerCase().startsWith('d') || sizeStr.startsWith('ø') || sizeStr.startsWith('Ø'))) {
      const d = parseFloat(roundMatch[1]);
      diameter = showSiUnits ? d / 25.4 : d;
      customShape = DuctShape.ROUND;
    }

    const newRow: FittingResult = {
      id: crypto.randomUUID(),
      ashraeCode: code,
      fittingType: typeName,
      shape: customShape,
      dimensions: { width, height, diameter },
      customSize: sizeStr || 'Custom',
      airflow: internalFlow,
      velocity: internalVel,
      velocityPressure: internalVp,
      coefficient: safeCoeff,
      totalPressureLoss: internalLoss,
      fittingDescription: `${typeName}${sizeStr ? `, ${sizeStr}` : ''}`,
      aiReasoning: '',
      timestamp: Date.now()
    };

    setProjectRows(prev => [...prev, newRow]);
    setCurrentResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <CalculatorInputs 
        fittingType={fittingType} ashraeCode={ashraeCode} shape={shape} dimensions={dimensions} cfm={cfm} angle={angle} radiusRatio={radiusRatio} showSiUnits={showSiUnits} isLoading={false}
        onFittingTypeChange={handleFittingTypeChange} setShowSiUnits={setShowSiUnits} handleDimChange={handleDimChange} handleFlowChange={handleFlowChange} setRadiusRatio={setRadiusRatio} setAngle={setAngle}
        onCalculate={handleCalculate} onClear={handleClear} cfm2={cfm2} handleFlow2Change={handleFlow2Change} pressurePath={pressurePath} setPressurePath={setPressurePath}
        roughness={roughness} setRoughness={setRoughness} onDirectInsertCustom={handleDirectInsertCustom}
      />
      <ResultSection currentResult={currentResult} showSiUnits={showSiUnits} onAddToProject={addToProject} />
      <ProjectSchedule projectRows={projectRows} totalProjectLoss={totalProjectLoss} showSiUnits={showSiUnits} systemNo={systemNo} setSystemNo={setSystemNo} setProjectRows={setProjectRows} />
    </div>
  );
};
