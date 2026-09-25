
import React, { useMemo, useState, useEffect } from 'react';
import { DuctShape, DuctDimensions } from '../types';
import { FittingDiagram } from './FittingDiagram';
import { Hash, ChevronDown, Loader2, Calculator, Plus, Check } from 'lucide-react';
import { FITTING_DB, CATEGORIES, RADIUS_RATIO_OPTIONS, ANGLE_OPTIONS } from '../constants/fittings';

interface CalculatorInputsProps {
  fittingType: string;
  ashraeCode: string;
  shape: DuctShape;
  dimensions: DuctDimensions;
  cfm: string;
  angle: number;
  radiusRatio: number;
  showSiUnits: boolean;
  isLoading: boolean;
  onFittingTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setShowSiUnits: (show: boolean) => void;
  handleDimChange: (field: keyof DuctDimensions, val: string) => void;
  handleFlowChange: (val: string) => void;
  setRadiusRatio: (val: number) => void;
  setAngle: (val: number) => void;
  onCalculate: () => void;
  onClear: () => void;
  cfm2?: string;
  handleFlow2Change?: (val: string) => void;
  pressurePath?: 'main' | 'branch';
  setPressurePath?: (path: 'main' | 'branch') => void;
  roughness?: number;
  setRoughness?: (val: number) => void;
  onDirectInsertCustom?: (data: {
    ashraeNo: string;
    fittingType: string;
    airflow: string;
    size: string;
    velocity: string;
    velPressure: string;
    coefficient: string;
    loss: string;
  }) => void;
}

export const CalculatorInputs: React.FC<CalculatorInputsProps> = (props) => {
  const {
    fittingType, ashraeCode, shape, dimensions, cfm, angle, radiusRatio,
    showSiUnits, isLoading, onFittingTypeChange, setShowSiUnits,
    handleDimChange, handleFlowChange, setRadiusRatio, setAngle, onCalculate, onClear,
    cfm2, handleFlow2Change, pressurePath, setPressurePath, roughness, setRoughness,
    onDirectInsertCustom
  } = props;

  const isCustom = ashraeCode === 'Custom' || fittingType === 'Custom';

  const [customAshraeNo, setCustomAshraeNo] = useState<string>('Custom');
  const [customFittingType, setCustomFittingType] = useState<string>('Custom');
  const [customAirflow, setCustomAirflow] = useState<string>('');
  const [customSize, setCustomSize] = useState<string>('');
  const [customVelocity, setCustomVelocity] = useState<string>('');
  const [customVelPressure, setCustomVelPressure] = useState<string>('');
  const [customCoefficient, setCustomCoefficient] = useState<string>('');
  const [customLoss, setCustomLoss] = useState<string>('');
  const [customSuccess, setCustomSuccess] = useState<boolean>(false);

  const handleCustomClear = () => {
    setCustomAshraeNo('Custom');
    setCustomFittingType('Custom');
    setCustomAirflow('');
    setCustomSize('');
    setCustomVelocity('');
    setCustomVelPressure('');
    setCustomCoefficient('');
    setCustomLoss('');
  };

  const handleCustomInsert = () => {
    if (onDirectInsertCustom) {
      onDirectInsertCustom({
        ashraeNo: customAshraeNo,
        fittingType: customFittingType,
        airflow: customAirflow,
        size: customSize,
        velocity: customVelocity,
        velPressure: customVelPressure,
        coefficient: customCoefficient,
        loss: customLoss,
      });
      setCustomSuccess(true);
      setTimeout(() => setCustomSuccess(false), 2200);
      setCustomAirflow('');
      setCustomSize('');
      setCustomVelocity('');
      setCustomVelPressure('');
      setCustomCoefficient('');
      setCustomLoss('');
    }
  };

  const getUnitLabel = (type: 'len' | 'flow') => showSiUnits ? (type === 'len' ? 'mm' : 'cmh') : (type === 'len' ? 'in' : 'cfm');
  const formatDisplayVal = (val: number | undefined) => {
    if (val === undefined || isNaN(val)) return '';
    return showSiUnits ? Math.round(val * 25.4) : parseFloat(val.toFixed(2));
  };

  const displayWidth = formatDisplayVal(dimensions.width);
  const displayHeight = formatDisplayVal(dimensions.height);
  const displayWidth2 = formatDisplayVal(dimensions.width2);
  const displayHeight2 = formatDisplayVal(dimensions.height2);
  const displayWidth3 = formatDisplayVal(dimensions.width3);
  const displayHeight3 = formatDisplayVal(dimensions.height3);
  const displayDiameter = formatDisplayVal(dimensions.diameter);
  const displayLength = formatDisplayVal(dimensions.length);
  
  const getDisplayFlow = (valStr: string | undefined, isSi: boolean) => {
    if (!valStr || valStr === '') return '';
    const val = parseFloat(valStr);
    return isNaN(val) ? '' : Math.round(isSi ? val * 1.699 : val).toString();
  };

  const displayFlow = getDisplayFlow(cfm, showSiUnits);
  const displayFlow2 = getDisplayFlow(cfm2, showSiUnits);

  const isElbowOrCR31 = fittingType.toLowerCase().includes('elbow') || ashraeCode === 'CR3-1';
  const isSD42 = ashraeCode === 'SD4-2';
  const isSR42 = ashraeCode === 'SR4-2';
  const isSR43 = ashraeCode === 'SR4-3';
  const isER42 = ashraeCode === 'ER4-2';
  const isER43 = ashraeCode === 'ER4-3';
  const isED42 = ashraeCode === 'ED4-2';
  const isSR513 = ashraeCode === 'SR5-13';
  const isER53 = ashraeCode === 'ER5-3';
  const isSR515 = ashraeCode === 'SR5-15';
  const isER55 = ashraeCode === 'ER5-5';
  const isCR111 = ashraeCode === 'CR11-1';

  const isTee = isSR513 || isER53 || isSR515 || isER55;
  const isBullhead = isSR515 || isER55;

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => (e.target as HTMLInputElement).blur();

  // --- Roughness Handling with Local State ---
  // We use local state to prevent cursor jumping/decimal eating issues during typing
  const [localRoughness, setLocalRoughness] = useState<string>('');

  // Sync local state when props change (unit switch or external clear)
  useEffect(() => {
    if (roughness === undefined) {
      setLocalRoughness('');
      return;
    }
    // Calculate what the display value *should* be based on current prop
    const propDisplayVal = showSiUnits ? (roughness * 304.8) : roughness;
    const currentParsed = parseFloat(localRoughness);

    // Only update local state if it differs significantly from prop or if state is empty/invalid
    // This allows external resets (like 'Clear') to work while preserving user typing
    if (isNaN(currentParsed) || Math.abs(currentParsed - propDisplayVal) > 0.000001) {
       // Avoid aggressive rounding that kills precision during unit switch, but keep clean for initial load
       setLocalRoughness(showSiUnits ? propDisplayVal.toFixed(4) : propDisplayVal.toString());
    }
  }, [roughness, showSiUnits]);

  const handleLocalRoughnessChange = (valStr: string) => {
      // Allow empty string to clear input
      if (valStr === '') {
          setLocalRoughness('');
          if (setRoughness) setRoughness(0);
          return;
      }

      // Regex to allow numbers, one decimal point
      if (!/^\d*\.?\d*$/.test(valStr)) return;

      // Limit to 4 decimal places
      if (valStr.includes('.')) {
          const parts = valStr.split('.');
          if (parts[1].length > 4) return;
      }

      setLocalRoughness(valStr);

      const val = parseFloat(valStr);
      if (!isNaN(val) && setRoughness) {
          // Convert back to Feet for internal state
          if (showSiUnits) {
              setRoughness(val / 304.8); // mm to ft
          } else {
              setRoughness(val); // ft to ft
          }
      }
  };

  // Validation Logic
  const isFormValid = useMemo(() => {
    const isPositive = (val: number | undefined) => val !== undefined && !isNaN(val) && val > 0;
    const isFlowValid = (val: string | undefined) => {
        if (!val) return false;
        const num = parseFloat(val);
        return !isNaN(num) && num > 0;
    };

    // 1. Base Dimensions
    if (shape === DuctShape.RECTANGULAR) {
        if (!isPositive(dimensions.width) || !isPositive(dimensions.height)) return false;
    } else {
        if (!isPositive(dimensions.diameter)) return false;
    }

    // 2. Airflow (Main)
    if (!isFlowValid(cfm)) return false;

    // 3. Fitting Specifics
    // Transitions Length & Outlets
    if (isSD42 || isER43) { 
        if (!isPositive(dimensions.diameter) || !isPositive(dimensions.length)) return false;
    }
    if (isSR43 || isED42) { 
        if (!isPositive(dimensions.width) || !isPositive(dimensions.height) || !isPositive(dimensions.length)) return false;
    }
    if (isSR42 || isER42) {
        if (!isPositive(dimensions.width2) || !isPositive(dimensions.height2) || !isPositive(dimensions.length)) return false;
    }
    // Straight Duct
    if (isCR111) {
        if (!isPositive(dimensions.length)) return false;
    }

    // Tees
    if (isTee) {
        // Branch Width (Always required)
        if (!isPositive(dimensions.width2)) return false;
        
        // Branch Flow (Always required for current tees)
        if (!isFlowValid(cfm2)) return false;

        // Branch Height (Most Rect Tees have Hb, except Bullhead uses H)
        if (!isBullhead) {
            if (!isPositive(dimensions.height2)) return false;
        }

        // Bullhead Branch 2 Width
        if (isBullhead) {
            if (!isPositive(dimensions.width3)) return false;
        }

        // Main Downstream/Upstream (SR5-13 only, ER5-3 is simplified to As=Ac)
        if (!isBullhead && !isER53) {
             if (!isPositive(dimensions.width3) || !isPositive(dimensions.height3)) return false;
        }
    }

    // Elbows
    if (isElbowOrCR31) {
        if (!isPositive(radiusRatio)) return false;
    }

    return true;
  }, [
      shape, dimensions, cfm, cfm2, radiusRatio, 
      isSD42, isER43, isSR43, isED42, isSR42, isER42, isTee, isBullhead, isElbowOrCR31, isCR111, isER53
  ]);

  return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-slate-50">
           <div className="flex items-center gap-3">
             <h2 className="font-bold text-slate-800 text-lg">Input</h2>
           </div>
           <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                <span className={`text-xs font-bold ${!showSiUnits ? 'text-blue-600' : 'text-slate-400'}`}>IP (in, cfm)</span>
                <button onClick={() => setShowSiUnits(!showSiUnits)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${showSiUnits ? 'bg-blue-600' : 'bg-slate-200'}`}>
                    <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${showSiUnits ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
                <span className={`text-xs font-bold ${showSiUnits ? 'text-blue-600' : 'text-slate-400'}`}>SI (mm, cmh)</span>
            </div>
        </div>

        <div className="p-5 md:p-6">
            {/* Split layout: Selector & Diagram on Left Panel, Parameters & Action on Right Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                
                {/* LEFT CONTEXT PANEL: Selection and Fitting Visualizer Diagram */}
                <div className="flex flex-col gap-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Fitting Type</label>
                                <div className="relative">
                                    <select value={fittingType} onChange={onFittingTypeChange} className="w-full appearance-none bg-white border border-slate-300 text-slate-900 text-xs rounded-lg focus:ring-2 focus:ring-blue-500/15 focus:border-blue-500 focus:outline-none block p-2 pr-8 shadow-sm font-medium">
                                        {CATEGORIES.map(cat => (
                                            <optgroup key={cat} label={cat}>
                                                {FITTING_DB.filter(f => f.category === cat)
                                                    .sort((a, b) => a.name.localeCompare(b.name)) 
                                                    .map(f => (
                                                    <option key={f.code} value={f.name}>{f.name}</option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                        <ChevronDown className="h-3.5 w-3.5" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 text-center">ASHRAE No.</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                                        <Hash className="h-3.5 w-3.5 text-slate-400" />
                                    </div>
                                    <input 
                                        type="text" 
                                        value={isCustom ? customAshraeNo : ashraeCode} 
                                        onChange={isCustom ? (e) => setCustomAshraeNo(e.target.value) : undefined}
                                        readOnly={!isCustom} 
                                        className={`border text-xs font-semibold rounded-lg block w-full pl-6 p-2 font-mono text-center shadow-inner ${
                                            isCustom ? 'bg-white border-blue-300 text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none' : 'bg-slate-100 border-slate-200 text-slate-600 cursor-not-allowed'
                                        }`} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fitting Diagram Visualizer */}
                    <div className="flex-grow min-h-[220px] lg:min-h-[260px] bg-slate-50 rounded-xl border border-slate-200 p-2 flex items-center justify-center transition-all">
                        <FittingDiagram type={fittingType} shape={shape} angle={angle} ashraeCode={ashraeCode} />
                    </div>
                </div>

                {/* RIGHT PARAMETERS PANEL: Numeric Inputs and Triggers */}
                <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 pt-5 lg:pt-0 lg:pl-6 space-y-5">
                    
                    {isCustom ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <div className="flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-blue-600" />
                                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                                        Custom Fitting Parameters
                                    </h3>
                                </div>
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                                    Direct Entry
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {/* 1. Ashrae No. */}
                                <div>
                                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 leading-tight">
                                        Ashrae No.
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={customAshraeNo}
                                            onChange={(e) => setCustomAshraeNo(e.target.value)}
                                            placeholder="e.g. Custom or CR-Custom"
                                            className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* 2. Fitting Type */}
                                <div>
                                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 leading-tight">
                                        Fitting Type
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={customFittingType}
                                            onChange={(e) => setCustomFittingType(e.target.value)}
                                            placeholder="e.g. Custom Fitting"
                                            className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-medium shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* 3. Airflow */}
                                <div>
                                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 leading-tight">
                                        Airflow ({showSiUnits ? 'CMH' : 'CFM'})
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={customAirflow}
                                            onChange={(e) => setCustomAirflow(e.target.value)}
                                            onWheel={handleWheel}
                                            placeholder="0"
                                            className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 pr-12 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all"
                                        />
                                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none uppercase">
                                            {getUnitLabel('flow')}
                                        </span>
                                    </div>
                                </div>

                                {/* 4. Size */}
                                <div>
                                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 leading-tight">
                                        Size ({showSiUnits ? 'mm' : 'in'})
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={customSize}
                                            onChange={(e) => setCustomSize(e.target.value)}
                                            placeholder={showSiUnits ? "e.g. 500x300 or D400" : "e.g. 20x12 or D16"}
                                            className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 pr-10 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all"
                                        />
                                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none uppercase">
                                            {getUnitLabel('len')}
                                        </span>
                                    </div>
                                </div>

                                {/* 5. Velocity */}
                                <div>
                                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 leading-tight">
                                        Velocity ({showSiUnits ? 'm/s' : 'FPM'})
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={customVelocity}
                                            onChange={(e) => setCustomVelocity(e.target.value)}
                                            onWheel={handleWheel}
                                            placeholder="0.00"
                                            className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 pr-12 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all"
                                        />
                                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">
                                            {showSiUnits ? 'm/s' : 'FPM'}
                                        </span>
                                    </div>
                                </div>

                                {/* 6. Vel. Presssure */}
                                <div>
                                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 leading-tight">
                                        Vel. Presssure ({showSiUnits ? 'Pa' : 'in. wg'})
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={customVelPressure}
                                            onChange={(e) => setCustomVelPressure(e.target.value)}
                                            onWheel={handleWheel}
                                            placeholder="0.00"
                                            className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 pr-12 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all"
                                        />
                                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">
                                            {showSiUnits ? 'Pa' : 'in. wg'}
                                        </span>
                                    </div>
                                </div>

                                {/* 7. Coefficient */}
                                <div>
                                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 leading-tight">
                                        Coefficient
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={customCoefficient}
                                            onChange={(e) => setCustomCoefficient(e.target.value)}
                                            onWheel={handleWheel}
                                            placeholder="0.00"
                                            className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* 8. Loss (Pa) */}
                                <div>
                                    <label className="block text-[11px] font-bold text-blue-700 mb-1 leading-tight flex items-center justify-between">
                                        <span>Loss ({showSiUnits ? 'Pa' : 'in. wg'})</span>
                                        {showSiUnits && <span className="text-[10px] font-semibold bg-blue-100 text-blue-700 px-1 rounded">Pa</span>}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={customLoss}
                                            onChange={(e) => setCustomLoss(e.target.value)}
                                            onWheel={handleWheel}
                                            placeholder="0.00"
                                            className="bg-blue-50/50 border border-blue-300 text-blue-950 font-bold text-sm rounded-lg block w-full p-2 pr-12 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:outline-none transition-all"
                                        />
                                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-600 pointer-events-none">
                                            {showSiUnits ? 'Pa' : 'in. wg'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {customSuccess && (
                                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                                    <Check className="w-4 h-4 text-emerald-600" />
                                    <span>Fitting successfully inserted into schedule!</span>
                                </div>
                            )}
                        </div>
                    ) : (
                    <div className="space-y-4">
                        
                        {/* Section 1: Dimensions */}
                        <div className="space-y-2.5">
                            <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-2">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
                                Dimensions
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {shape === DuctShape.RECTANGULAR && (
                                    <>
                                        <div>
                                            <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">
                                                {isTee 
                                                    ? (isER53 ? 'Main Width (W)' : isER55 ? 'Width (Wc) - Downstream' : 'Common Width (Wc)') 
                                                    : isSR42 
                                                        ? 'Inlet Width (W1)' 
                                                        : isSD42 
                                                            ? 'Inlet Width (W1)'
                                                            : isER42 || isER43 
                                                                ? 'Inlet Width (Wo)' 
                                                                : isSR43 || isED42 
                                                                    ? 'Outlet Width (Wo)' 
                                                                    : 'Width (W)'}
                                            </label>
                                            <div className="relative">
                                                <input type="number" value={displayWidth} onChange={(e) => handleDimChange('width', e.target.value)} onWheel={handleWheel} className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" placeholder="0" />
                                                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">{getUnitLabel('len')}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">
                                                {isTee 
                                                    ? (isER53 ? 'Main Height (H)' : isER55 || isSR515 ? 'Height (H)' : 'Common Height (Hc)') 
                                                    : isSR42
                                                        ? 'Inlet Height (H1)' 
                                                        : isSD42
                                                            ? 'Inlet Height (H1)'
                                                            : isER42 || isER43 
                                                                ? 'Inlet Height (Ho)' 
                                                                : isSR43 || isED42 
                                                                    ? 'Outlet Height (Ho)' 
                                                                    : 'Height (H)'}
                                            </label>
                                            <div className="relative">
                                                <input type="number" value={displayHeight} onChange={(e) => handleDimChange('height', e.target.value)} onWheel={handleWheel} className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" placeholder="0" />
                                                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">{getUnitLabel('len')}</span>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {shape === DuctShape.ROUND && (
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">
                                            {isED42 
                                                ? 'Inlet Diameter (Do)' 
                                                : isSD42 || isSR43 
                                                    ? 'Inlet Diameter (D1)' 
                                                    : isER43 
                                                        ? 'Outlet Diameter (D1)' 
                                                        : 'Duct Diameter (D)'}
                                        </label>
                                        <div className="relative">
                                            <input type="number" value={displayDiameter} onChange={(e) => handleDimChange('diameter', e.target.value)} onWheel={handleWheel} className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" placeholder="0" />
                                            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">{getUnitLabel('len')}</span>
                                        </div>
                                    </div>
                                )}

                                {(isSR43 || isED42) && (
                                    <>
                                        <div>
                                            <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">
                                                {isED42 ? 'Outlet Width (W1)' : 'Outlet Width (Wo)'}
                                            </label>
                                            <div className="relative">
                                                <input type="number" value={displayWidth} onChange={(e) => handleDimChange('width', e.target.value)} onWheel={handleWheel} className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" placeholder="0" />
                                                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">{getUnitLabel('len')}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">
                                                {isED42 ? 'Outlet Height (H1)' : 'Outlet Height (Ho)'}
                                            </label>
                                            <div className="relative">
                                                <input type="number" value={displayHeight} onChange={(e) => handleDimChange('height', e.target.value)} onWheel={handleWheel} className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" placeholder="0" />
                                                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">{getUnitLabel('len')}</span>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {(isSR42 || isER42) && (
                                    <>
                                        <div>
                                            <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">
                                                {isSR42 ? 'Outlet Width (Wo)' : 'Outlet Width (W1)'}
                                            </label>
                                            <div className="relative">
                                                <input type="number" value={displayWidth2} onChange={(e) => handleDimChange('width2', e.target.value)} onWheel={handleWheel} className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" placeholder="0" />
                                                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">{getUnitLabel('len')}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">
                                                {isSR42 ? 'Outlet Height (Ho)' : 'Outlet Height (H1)'}
                                            </label>
                                            <div className="relative">
                                                <input type="number" value={displayHeight2} onChange={(e) => handleDimChange('height2', e.target.value)} onWheel={handleWheel} className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" placeholder="0" />
                                                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">{getUnitLabel('len')}</span>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {isTee && (
                                    <>
                                        <div>
                                            <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">{isBullhead ? 'Branch 1 Width (Wb1)' : 'Branch Width (Wb)'}</label>
                                            <div className="relative">
                                                <input type="number" value={displayWidth2} onChange={(e) => handleDimChange('width2', e.target.value)} onWheel={handleWheel} className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" placeholder="0" />
                                                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">{getUnitLabel('len')}</span>
                                            </div>
                                        </div>
                                        {!isBullhead && (
                                            <div>
                                                <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">Branch Height (Hb)</label>
                                                <div className="relative">
                                                    <input type="number" value={displayHeight2} onChange={(e) => handleDimChange('height2', e.target.value)} onWheel={handleWheel} className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" placeholder="0" />
                                                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">{getUnitLabel('len')}</span>
                                                </div>
                                            </div>
                                        )}
                                        {isBullhead && (
                                            <div>
                                                <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">Branch 2 Width (Wb2)</label>
                                                <div className="relative">
                                                    <input type="number" value={displayWidth3} onChange={(e) => handleDimChange('width3', e.target.value)} onWheel={handleWheel} className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" placeholder="0" />
                                                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">{getUnitLabel('len')}</span>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {isTee && !isBullhead && !isER53 && (
                                    <>
                                        <div>
                                            <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">Downstream Width (Ws)</label>
                                            <div className="relative">
                                                <input type="number" value={displayWidth3} onChange={(e) => handleDimChange('width3', e.target.value)} onWheel={handleWheel} className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" placeholder="0" />
                                                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">{getUnitLabel('len')}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">Downstream Height (Hs)</label>
                                            <div className="relative">
                                                <input type="number" value={displayHeight3} onChange={(e) => handleDimChange('height3', e.target.value)} onWheel={handleWheel} className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" placeholder="0" />
                                                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">{getUnitLabel('len')}</span>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {(isSD42 || isER43) && (
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">Outlet Diameter</label>
                                        <div className="relative">
                                            <input type="number" value={displayDiameter} onChange={(e) => handleDimChange('diameter', e.target.value)} onWheel={handleWheel} className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" placeholder="0" />
                                            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">{getUnitLabel('len')}</span>
                                        </div>
                                    </div>
                                )}

                                {(isSD42 || isSR42 || isSR43 || isER42 || isER43 || isED42 || isCR111) && (
                                    <div className={isCR111 ? "col-span-1" : "col-span-2 sm:col-span-1"}>
                                        <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">Length (L)</label>
                                        <div className="relative">
                                            <input 
                                                type="number" 
                                                value={isCR111 && !showSiUnits && dimensions.length !== undefined && !isNaN(dimensions.length) 
                                                    ? parseFloat((dimensions.length / 12).toFixed(3)) // Display Feet for CR11-1 in IP mode
                                                    : displayLength
                                                } 
                                                onChange={(e) => {
                                                    if (isCR111 && !showSiUnits) {
                                                        const val = parseFloat(e.target.value);
                                                        if (!isNaN(val)) {
                                                            // Input is Feet, store as Inches (val * 12)
                                                            handleDimChange('length', (val * 12).toString());
                                                        } else {
                                                            handleDimChange('length', '');
                                                        }
                                                    } else {
                                                        handleDimChange('length', e.target.value);
                                                    }
                                                }}
                                                onWheel={handleWheel} 
                                                className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" 
                                                placeholder="0" 
                                            />
                                            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">
                                                {isCR111 && !showSiUnits ? 'ft' : getUnitLabel('len')}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {isCR111 && (
                                    <div className="col-span-1">
                                        <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">Abs. Roughness (e)</label>
                                        <div className="relative">
                                            <input 
                                                type="text" 
                                                inputMode="decimal"
                                                value={localRoughness} 
                                                onChange={(e) => handleLocalRoughnessChange(e.target.value)} 
                                                onWheel={handleWheel} 
                                                className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg block w-full p-2 font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" 
                                                placeholder="0.0003" 
                                            />
                                            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 pointer-events-none">{showSiUnits ? 'mm' : 'ft'}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section 2: Flow Rates & Airflow Parameters */}
                        <div className="space-y-2.5">
                            <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-2">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
                                Flow Rate & Configuration
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">
                                        {isTee ? (isER53 ? 'Upstream Flow (Qs)' : isER55 || isSR515 ? 'Common Flow (Qc)' : 'Common Flow (Qc)') : 'Flow Rate (Q)'}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none">
                                            <div className={`h-1.5 w-1.5 rounded-full ${cfm ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
                                        </div>
                                        <input type="number" value={displayFlow} onChange={(e) => handleFlowChange(e.target.value)} onWheel={handleWheel} className="bg-blue-50/40 border border-blue-200 text-blue-950 text-sm rounded-lg block w-full pl-6 p-2 font-bold font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" placeholder="0" />
                                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-500 pointer-events-none">{getUnitLabel('flow')}</span>
                                    </div>
                                </div>

                                {isTee && (
                                    <div>
                                        <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">
                                            {isBullhead ? 'Branch 1 Flow (Qb1)' : 'Branch Flow (Qb)'}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none">
                                                <div className={`h-1.5 w-1.5 rounded-full ${cfm2 ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
                                            </div>
                                            <input type="number" value={displayFlow2} onChange={(e) => handleFlow2Change && handleFlow2Change(e.target.value)} onWheel={handleWheel} className="bg-blue-50/40 border border-blue-200 text-blue-950 text-sm rounded-lg block w-full pl-6 p-2 font-bold font-mono shadow-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" placeholder="0" />
                                            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[11px] text-blue-500 pointer-events-none">{getUnitLabel('flow')}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section 3: Elbow or Tee Parameters */}
                        {isElbowOrCR31 && (
                            <div className="space-y-2.5">
                                <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-2">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    Geometry & Features
                                </h3>
                                <div className="grid grid-cols-2 gap-3.5">
                                    <div>
                                        <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">Angle (Θ)</label>
                                        <div className="relative bg-white border border-slate-300 rounded-lg shadow-sm">
                                            <select value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full appearance-none bg-transparent text-slate-900 text-xs font-semibold rounded-lg block p-2 pr-8 font-mono focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all">
                                                {ANGLE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}°</option>)}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500"><ChevronDown className="h-3.5 w-3.5" /></div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight">Radius Ratio (r/W)</label>
                                        {ashraeCode === 'CR3-1' ? (
                                            <div className="relative bg-white border border-slate-300 rounded-lg shadow-sm">
                                                <select 
                                                    value={isNaN(radiusRatio) ? "" : radiusRatio.toString()} 
                                                    onChange={(e) => setRadiusRatio(parseFloat(e.target.value))} 
                                                    className="w-full appearance-none bg-transparent text-slate-900 text-xs font-semibold rounded-lg block p-2 pr-8 font-mono focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all"
                                                >
                                                    {isNaN(radiusRatio) && <option value="" disabled hidden>Choose...</option>}
                                                    <option value="0.5">0.50</option>
                                                    <option value="0.75">0.75</option>
                                                    <option value="1">1.00</option>
                                                    <option value="1.5">1.50</option>
                                                    <option value="2">2.00</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                                                    <ChevronDown className="h-3.5 w-3.5" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative bg-white border border-slate-300 rounded-lg shadow-sm">
                                                <input type="number" list="radius-options" value={radiusRatio} onChange={(e) => setRadiusRatio(parseFloat(e.target.value))} onWheel={handleWheel} className="w-full bg-transparent text-slate-900 text-xs font-semibold rounded-lg block p-2 pr-8 font-mono focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all" />
                                                <datalist id="radius-options">{RADIUS_RATIO_OPTIONS.map(opt => <option key={opt} value={opt} />)}</datalist>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {isTee && setPressurePath && (
                            <div className="space-y-2.5">
                                <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-2">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    Calculation Path
                                </h3>
                                <div className="flex gap-6 py-1">
                                    <label className="flex items-center gap-2 cursor-pointer group select-none">
                                        <input type="radio" name="path" checked={pressurePath === 'main'} onChange={() => setPressurePath('main')} className="w-3.5 h-3.5 text-blue-600 border-slate-300 focus:ring-blue-500 focus:ring-offset-0/0" />
                                        <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{isBullhead ? 'Branch 1' : 'Main Path (Straight)'}</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group select-none">
                                        <input type="radio" name="path" checked={pressurePath === 'branch'} onChange={() => setPressurePath('branch')} className="w-3.5 h-3.5 text-blue-600 border-slate-300 focus:ring-blue-500 focus:ring-offset-0/0" />
                                        <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{isBullhead ? 'Branch 2' : 'Branch Path (Turn)'}</span>
                                    </label>
                                </div>
                            </div>
                        )}

                    </div>
                    )}

                    {/* Action Buttons docked at bottom */}
                    {isCustom ? (
                        <div className="flex gap-3 pt-4 border-t border-slate-100">
                            <button 
                                onClick={handleCustomInsert} 
                                className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-xs"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Insert into Schedule</span>
                            </button>
                            <button onClick={handleCustomClear} className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-5 rounded-lg text-xs transition-colors">Clear</button>
                        </div>
                    ) : (
                        <div className="flex gap-3 pt-4 border-t border-slate-100">
                            <button 
                                onClick={onCalculate} 
                                disabled={isLoading || !isFormValid} 
                                className="flex-grow bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none text-xs"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calculator className="w-4 h-4" />}
                                <span>Calculate Loss</span>
                            </button>
                            <button onClick={onClear} className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-5 rounded-lg text-xs transition-colors">Clear</button>
                        </div>
                    )}

                </div>

            </div>
        </div>
      </div>
  );
};
