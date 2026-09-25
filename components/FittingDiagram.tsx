
import React from 'react';
import { DuctShape } from '../types';
import { 
  DiagramSR515, DiagramER55, DiagramSR513, DiagramER53 
} from './diagrams/TeeDiagrams';
import { 
  DiagramSD42, DiagramED42, DiagramSR42, DiagramER42, DiagramSR43, DiagramER43 
} from './diagrams/TransitionDiagrams';
import { 
  DiagramCD85, DiagramCR93, DiagramCR95, DiagramSR21, DiagramGenericElbow, DiagramCR111, DiagramCustom
} from './diagrams/CommonDiagrams';

interface FittingDiagramProps {
  type: string;
  shape: DuctShape;
  angle: number;
  ashraeCode: string;
}

export const FittingDiagram: React.FC<FittingDiagramProps> = ({ type, shape, angle, ashraeCode }) => {
  
  // Mapping of ASHRAE codes to their specific diagram components
  const DIAGRAM_MAP: Record<string, React.FC> = {
    'SR5-15': DiagramSR515,
    'ER5-5': DiagramER55,
    'SD4-2': DiagramSD42,
    'ED4-2': DiagramED42,
    'SR4-2': DiagramSR42,
    'ER4-2': DiagramER42,
    'SR4-3': DiagramSR43,
    'ER4-3': DiagramER43,
    'SR5-13': DiagramSR513,
    'ER5-3': DiagramER53,
    'CD8-5': DiagramCD85,
    'CR9-3': DiagramCR93,
    'CR9-5': DiagramCR95,
    'SR2-1': DiagramSR21,
    'CR11-1': DiagramCR111,
    'Custom': DiagramCustom,
  };

  const SpecificDiagram = DIAGRAM_MAP[ashraeCode];

  if (SpecificDiagram) {
    return <SpecificDiagram />;
  }

  if (type.toLowerCase() === 'custom' || ashraeCode.toLowerCase() === 'custom') {
    return <DiagramCustom />;
  }

  // Fallback logic for generic shapes (Elbows)
  if (type.toLowerCase().includes('elbow') && shape === DuctShape.RECTANGULAR) {
    return <DiagramGenericElbow />;
  }

  // Fallback for No Diagram
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-lg border border-slate-100 p-8 min-h-[300px]">
      <div className="p-4 bg-slate-100 rounded-full mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image-off">
            <line x1="2" x2="22" y1="2" y2="22"/>
            <path d="M10.41 6.22A2 2 0 1 1 14 4h6a2 2 0 0 1 2 2v10.34"/>
            <path d="M2 13.59V6a2 2 0 0 1 2-2h1.66"/>
            <path d="m22 22-2-2"/>
            <path d="M14.66 19H4a2 2 0 0 1-2-2v-2.34l2.67-2.66a2 2 0 0 1 2.82 0l3 3a2 2 0 0 0 2.82 0l.45-.44"/>
        </svg>
      </div>
      <p className="text-sm font-medium">No diagram available</p>
      <p className="text-xs mt-1 text-slate-400">Select a fitting type to view schematic</p>
    </div>
  );
};
