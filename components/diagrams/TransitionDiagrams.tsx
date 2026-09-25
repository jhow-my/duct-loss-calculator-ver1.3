
import React from 'react';

const SvgDefs = () => (
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#334155" />
    </marker>
    <marker id="arrow-start" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M9,0 L9,6 L0,3 z" fill="#334155" />
    </marker>
  </defs>
);

export const DiagramSD42: React.FC = () => (
  <div className="w-full h-auto bg-white rounded-lg overflow-hidden select-none flex items-center justify-center p-4">
    <svg viewBox="0 0 400 320" className="w-full max-w-[500px]">
      <SvgDefs />
      {/* --- TOP VIEW (Elevation) --- */}
      <g transform="translate(0, 20)">
        <line x1="20" y1="70" x2="360" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" />
        <line x1="50" y1="50" x2="130" y2="50" stroke="#334155" strokeWidth="1.5" />
        <line x1="50" y1="90" x2="130" y2="90" stroke="#334155" strokeWidth="1.5" />
        <path d="M50,45 L50,62 L42,66 L58,74 L50,78 L50,95" stroke="#334155" strokeWidth="1" fill="none" />
        <line x1="130" y1="50" x2="230" y2="30" stroke="#334155" strokeWidth="1.5" />
        <line x1="130" y1="90" x2="230" y2="110" stroke="#334155" strokeWidth="1.5" />
        <line x1="130" y1="50" x2="130" y2="90" stroke="#334155" strokeWidth="1" />
        <line x1="230" y1="30" x2="290" y2="30" stroke="#334155" strokeWidth="1.5" />
        <line x1="230" y1="110" x2="290" y2="110" stroke="#334155" strokeWidth="1.5" />
        <line x1="230" y1="30" x2="230" y2="110" stroke="#334155" strokeWidth="1" />
        <path d="M290,30 C315,50 265,90 290,110" stroke="#334155" strokeWidth="1.5" fill="none" />
        <line x1="100" y1="50" x2="100" y2="90" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="115" y="74" className="text-xs font-serif italic fill-slate-700">H<tspan dy="2" fontSize="9">1</tspan></text>
        <line x1="260" y1="30" x2="260" y2="110" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="245" y="74" className="text-xs font-serif italic fill-slate-700">D<tspan dy="2" fontSize="9">o</tspan></text>
        <line x1="130" y1="125" x2="230" y2="125" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <line x1="130" y1="95" x2="130" y2="130" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="230" y1="115" x2="230" y2="130" stroke="#cbd5e1" strokeWidth="1" />
        <text x="180" y="120" textAnchor="middle" className="text-xs font-serif italic fill-slate-700">L</text>
        <path d="M160,44 A 60,60 0 0 1 160,96" stroke="#334155" strokeWidth="1" fill="none" strokeDasharray="2,2" />
        <text x="165" y="74" className="text-xs font-serif fill-slate-700">Θ<tspan dy="2" fontSize="9">1</tspan></text>
        <line x1="20" y1="40" x2="60" y2="40" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="40" y="35" textAnchor="middle" className="text-[10px] font-sans fill-slate-600 tracking-wider">FROM FAN</text>
        <text x="70" y="35" className="text-xs font-serif italic fill-slate-700">Q</text>
      </g>
      {/* --- BOTTOM VIEW (Plan) --- */}
      <g transform="translate(0, 180)">
        <line x1="20" y1="70" x2="360" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" />
        <line x1="130" y1="-50" x2="130" y2="40" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="230" y1="-50" x2="230" y2="20" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="290" y1="-60" x2="290" y2="20" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="50" y1="55" x2="130" y2="55" stroke="#334155" strokeWidth="1.5" />
        <line x1="50" y1="85" x2="130" y2="85" stroke="#334155" strokeWidth="1.5" />
        <path d="M50,50 L50,62 L42,66 L58,74 L50,78 L50,90" stroke="#334155" strokeWidth="1" fill="none" />
        <line x1="130" y1="55" x2="230" y2="30" stroke="#334155" strokeWidth="1.5" />
        <line x1="130" y1="85" x2="230" y2="110" stroke="#334155" strokeWidth="1.5" />
        <line x1="130" y1="55" x2="130" y2="85" stroke="#334155" strokeWidth="1" />
        <line x1="230" y1="30" x2="290" y2="30" stroke="#334155" strokeWidth="1.5" />
        <line x1="230" y1="110" x2="290" y2="110" stroke="#334155" strokeWidth="1.5" />
        <line x1="230" y1="30" x2="230" y2="110" stroke="#334155" strokeWidth="1" />
        <path d="M290,30 C315,50 265,90 290,110" stroke="#334155" strokeWidth="1.5" fill="none" />
        <line x1="100" y1="55" x2="100" y2="85" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="115" y="74" className="text-xs font-serif italic fill-slate-700">W<tspan dy="2" fontSize="9">1</tspan></text>
        <line x1="260" y1="30" x2="260" y2="110" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="245" y="74" className="text-xs font-serif italic fill-slate-700">D<tspan dy="2" fontSize="9">o</tspan></text>
        <path d="M165,47 A 60,60 0 0 1 165,93" stroke="#334155" strokeWidth="1" fill="none" strokeDasharray="2,2" />
        <text x="170" y="74" className="text-xs font-serif fill-slate-700">Θ<tspan dy="2" fontSize="9">2</tspan></text>
        <line x1="20" y1="40" x2="60" y2="40" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="40" y="35" textAnchor="middle" className="text-[10px] font-sans fill-slate-600 tracking-wider">FROM FAN</text>
        <text x="70" y="35" className="text-xs font-serif italic fill-slate-700">Q</text>
        <text x="20" y="130" className="text-xs font-sans fill-slate-500">Ao/A1 &lt; or &gt; 1</text>
      </g>
    </svg>
  </div>
);

export const DiagramED42: React.FC = () => (
  <div className="w-full h-auto bg-white rounded-lg overflow-hidden select-none flex items-center justify-center p-4">
    <svg viewBox="0 0 400 320" className="w-full max-w-[500px]">
      <SvgDefs />
      {/* --- TOP VIEW (Elevation) --- */}
      <g transform="translate(0, 20)">
        <line x1="20" y1="70" x2="360" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" />
        <line x1="50" y1="45" x2="130" y2="45" stroke="#334155" strokeWidth="1.5" />
        <line x1="50" y1="95" x2="130" y2="95" stroke="#334155" strokeWidth="1.5" />
        <ellipse cx="50" cy="70" rx="8" ry="25" stroke="#334155" strokeWidth="1" fill="none" />
        <line x1="130" y1="45" x2="230" y2="30" stroke="#334155" strokeWidth="1.5" />
        <line x1="130" y1="95" x2="230" y2="110" stroke="#334155" strokeWidth="1.5" />
        <line x1="130" y1="45" x2="130" y2="95" stroke="#334155" strokeWidth="1" />
        <line x1="230" y1="30" x2="310" y2="30" stroke="#334155" strokeWidth="1.5" />
        <line x1="230" y1="110" x2="310" y2="110" stroke="#334155" strokeWidth="1.5" />
        <line x1="230" y1="30" x2="230" y2="110" stroke="#334155" strokeWidth="1" />
        <path d="M310,30 L310,55 L302,62 L318,78 L310,85 L310,110" stroke="#334155" strokeWidth="1" fill="none" />
        <line x1="100" y1="45" x2="100" y2="95" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="115" y="74" className="text-xs font-serif italic fill-slate-700">D<tspan dy="2" fontSize="9">o</tspan></text>
        <line x1="260" y1="30" x2="260" y2="110" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="245" y="74" className="text-xs font-serif italic fill-slate-700">H<tspan dy="2" fontSize="9">1</tspan></text>
        <line x1="130" y1="125" x2="230" y2="125" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <line x1="130" y1="95" x2="130" y2="130" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="230" y1="115" x2="230" y2="130" stroke="#cbd5e1" strokeWidth="1" />
        <text x="180" y="120" textAnchor="middle" className="text-xs font-serif italic fill-slate-700">L</text>
        <path d="M165,40 A 70,70 0 0 1 165,100" stroke="#334155" strokeWidth="1" fill="none" strokeDasharray="2,2" />
        <text x="170" y="65" className="text-xs font-serif fill-slate-700">Θ<tspan dy="2" fontSize="9">1</tspan></text>
        <line x1="290" y1="70" x2="330" y2="70" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="310" y="60" textAnchor="middle" className="text-[10px] font-sans fill-slate-600 tracking-wider">TO FAN</text>
        <text x="310" y="85" className="text-xs font-serif italic fill-slate-700">Q</text>
        <line x1="60" y1="70" x2="90" y2="70" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="75" y="65" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">Q</text>
      </g>
      {/* --- BOTTOM VIEW (Plan) --- */}
      <g transform="translate(0, 180)">
        <line x1="20" y1="70" x2="360" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" />
        <line x1="130" y1="-50" x2="130" y2="40" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="230" y1="-50" x2="230" y2="20" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="50" y1="45" x2="130" y2="45" stroke="#334155" strokeWidth="1.5" />
        <line x1="50" y1="95" x2="130" y2="95" stroke="#334155" strokeWidth="1.5" />
        <ellipse cx="50" cy="70" rx="8" ry="25" stroke="#334155" strokeWidth="1" fill="none" />
        <line x1="130" y1="45" x2="230" y2="20" stroke="#334155" strokeWidth="1.5" />
        <line x1="130" y1="95" x2="230" y2="120" stroke="#334155" strokeWidth="1.5" />
        <line x1="130" y1="45" x2="130" y2="95" stroke="#334155" strokeWidth="1" />
        <line x1="230" y1="20" x2="310" y2="20" stroke="#334155" strokeWidth="1.5" />
        <line x1="230" y1="120" x2="310" y2="120" stroke="#334155" strokeWidth="1.5" />
        <line x1="230" y1="20" x2="230" y2="120" stroke="#334155" strokeWidth="1" />
        <path d="M310,20 L310,45 L302,52 L318,68 L310,75 L310,120" stroke="#334155" strokeWidth="1" fill="none" />
        <line x1="100" y1="45" x2="100" y2="95" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="115" y="74" className="text-xs font-serif italic fill-slate-700">D<tspan dy="2" fontSize="9">o</tspan></text>
        <line x1="260" y1="20" x2="260" y2="120" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="245" y="74" className="text-xs font-serif italic fill-slate-700">W<tspan dy="2" fontSize="9">1</tspan></text>
        <path d="M170,38 A 80,80 0 0 1 170,102" stroke="#334155" strokeWidth="1" fill="none" strokeDasharray="2,2" />
        <text x="175" y="75" className="text-xs font-serif fill-slate-700">Θ<tspan dy="2" fontSize="9">2</tspan></text>
        <text x="20" y="130" className="text-xs font-sans fill-slate-500">Ao/A1 &lt; or &gt; 1</text>
      </g>
    </svg>
  </div>
);

export const DiagramSR42: React.FC = () => (
  <div className="w-full h-auto bg-white rounded-lg overflow-hidden select-none flex items-center justify-center p-4">
    <svg viewBox="0 0 450 300" className="w-full max-w-[500px]">
      <SvgDefs />
      <g transform="translate(20, 40)">
        {/* Left Face (Upstream - o) */}
        <path d="M50,100 L100,85 L100,135 L50,150 Z" stroke="#334155" strokeWidth="1.5" fill="none" />
        {/* Right Face (Downstream - 1) */}
        <path d="M220,30 L320,0 L320,180 L220,210 Z" stroke="#334155" strokeWidth="1.5" fill="none" />
        <line x1="50" y1="100" x2="220" y2="30" stroke="#334155" strokeWidth="1.5" />
        <line x1="100" y1="85" x2="320" y2="0" stroke="#334155" strokeWidth="1.5" />
        <line x1="100" y1="135" x2="320" y2="180" stroke="#334155" strokeWidth="1.5" />
        <line x1="50" y1="150" x2="220" y2="210" stroke="#334155" strokeWidth="1.5" />
        {/* Left Labels (Upstream o) */}
        <line x1="50" y1="90" x2="100" y2="75" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
        <text x="70" y="75" className="text-xs font-serif italic fill-slate-700">W<tspan dy="2" fontSize="9">o</tspan></text>
        <line x1="40" y1="105" x2="40" y2="155" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
        <text x="20" y="135" className="text-xs font-serif italic fill-slate-700">H<tspan dy="2" fontSize="9">o</tspan></text>
        {/* Right Labels (Downstream 1) */}
        <line x1="220" y1="20" x2="320" y2="-10" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
        <text x="270" y="0" className="text-xs font-serif italic fill-slate-700">W<tspan dy="2" fontSize="9">1</tspan></text>
        <line x1="330" y1="0" x2="330" y2="180" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
        <text x="340" y="100" className="text-xs font-serif italic fill-slate-700">H<tspan dy="2" fontSize="9">1</tspan></text>
        
        <line x1="50" y1="170" x2="220" y2="230" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
        <line x1="50" y1="150" x2="50" y2="175" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="220" y1="210" x2="220" y2="235" stroke="#cbd5e1" strokeWidth="1" />
        <text x="135" y="215" className="text-xs font-serif italic fill-slate-700">L</text>
        <text x="160" y="70" className="text-xs font-serif fill-slate-700">Θ<tspan dy="2" fontSize="9">2</tspan></text>
        <text x="140" y="150" className="text-xs font-serif fill-slate-700">Θ<tspan dy="2" fontSize="9">1</tspan></text>
        <line x1="-20" y1="130" x2="30" y2="115" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="0" y="125" className="text-xs font-serif italic fill-slate-700">Q</text>
        <text x="-20" y="150" className="text-[10px] font-sans fill-slate-500">FROM FAN</text>
      </g>
      <text x="20" y="280" className="text-xs font-sans fill-slate-500">Ao/A1 &lt; or &gt; 1</text>
    </svg>
  </div>
);

export const DiagramER42: React.FC = () => (
  <div className="w-full h-auto bg-white rounded-lg overflow-hidden select-none flex items-center justify-center p-4">
    <svg viewBox="0 0 450 300" className="w-full max-w-[500px]">
      <SvgDefs />
      <g transform="translate(20, 40)">
        <path d="M50,100 L100,85 L100,135 L50,150 Z" stroke="#334155" strokeWidth="1.5" fill="none" />
        <path d="M220,30 L320,0 L320,180 L220,210 Z" stroke="#334155" strokeWidth="1.5" fill="none" />
        <line x1="50" y1="100" x2="220" y2="30" stroke="#334155" strokeWidth="1.5" />
        <line x1="100" y1="85" x2="320" y2="0" stroke="#334155" strokeWidth="1.5" />
        <line x1="100" y1="135" x2="320" y2="180" stroke="#334155" strokeWidth="1.5" />
        <line x1="50" y1="150" x2="220" y2="210" stroke="#334155" strokeWidth="1.5" />
        <line x1="50" y1="90" x2="100" y2="75" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
        <text x="70" y="75" className="text-xs font-serif italic fill-slate-700">W<tspan dy="2" fontSize="9">1</tspan></text>
        <line x1="40" y1="105" x2="40" y2="155" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
        <text x="20" y="135" className="text-xs font-serif italic fill-slate-700">H<tspan dy="2" fontSize="9">1</tspan></text>
        <line x1="220" y1="20" x2="320" y2="-10" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
        <text x="270" y="0" className="text-xs font-serif italic fill-slate-700">W<tspan dy="2" fontSize="9">o</tspan></text>
        <line x1="330" y1="0" x2="330" y2="180" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
        <text x="340" y="100" className="text-xs font-serif italic fill-slate-700">H<tspan dy="2" fontSize="9">o</tspan></text>
        <line x1="50" y1="170" x2="220" y2="230" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
        <line x1="50" y1="150" x2="50" y2="175" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="220" y1="210" x2="220" y2="235" stroke="#cbd5e1" strokeWidth="1" />
        <text x="135" y="215" className="text-xs font-serif italic fill-slate-700">L</text>
        <text x="160" y="70" className="text-xs font-serif fill-slate-700">Θ<tspan dy="2" fontSize="9">2</tspan></text>
        <text x="140" y="150" className="text-xs font-serif fill-slate-700">Θ<tspan dy="2" fontSize="9">1</tspan></text>
        <line x1="30" y1="115" x2="-20" y2="130" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="0" y="125" className="text-xs font-serif italic fill-slate-700">Q</text>
        <text x="-10" y="110" className="text-[10px] font-sans fill-slate-500">TO FAN</text>
      </g>
      <text x="20" y="280" className="text-xs font-sans fill-slate-500">Ao/A1 &lt; or &gt; 1</text>
    </svg>
  </div>
);

export const DiagramSR43: React.FC = () => (
  <div className="w-full h-auto bg-white rounded-lg overflow-hidden select-none flex items-center justify-center p-4">
    <svg viewBox="0 0 400 320" className="w-full max-w-[500px]">
      <SvgDefs />
      {/* --- TOP VIEW (Elevation) --- */}
      <g transform="translate(0, 20)">
        <line x1="20" y1="70" x2="360" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" />
        <line x1="50" y1="45" x2="130" y2="45" stroke="#334155" strokeWidth="1.5" />
        <line x1="50" y1="95" x2="130" y2="95" stroke="#334155" strokeWidth="1.5" />
        <ellipse cx="50" cy="70" rx="8" ry="25" stroke="#334155" strokeWidth="1" fill="none" />
        <line x1="130" y1="45" x2="230" y2="30" stroke="#334155" strokeWidth="1.5" />
        <line x1="130" y1="95" x2="230" y2="110" stroke="#334155" strokeWidth="1.5" />
        <line x1="130" y1="45" x2="130" y2="95" stroke="#334155" strokeWidth="1" />
        <line x1="230" y1="30" x2="310" y2="30" stroke="#334155" strokeWidth="1.5" />
        <line x1="230" y1="110" x2="310" y2="110" stroke="#334155" strokeWidth="1.5" />
        <line x1="230" y1="30" x2="230" y2="110" stroke="#334155" strokeWidth="1" />
        <path d="M310,30 L310,55 L302,62 L318,78 L310,85 L310,110" stroke="#334155" strokeWidth="1" fill="none" />
        <line x1="100" y1="45" x2="100" y2="95" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="115" y="74" className="text-xs font-serif italic fill-slate-700">D<tspan dy="2" fontSize="9">1</tspan></text>
        <line x1="260" y1="30" x2="260" y2="110" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="245" y="74" className="text-xs font-serif italic fill-slate-700">H<tspan dy="2" fontSize="9">o</tspan></text>
        <line x1="130" y1="125" x2="230" y2="125" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <line x1="130" y1="95" x2="130" y2="130" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="230" y1="115" x2="230" y2="130" stroke="#cbd5e1" strokeWidth="1" />
        <text x="180" y="120" textAnchor="middle" className="text-xs font-serif italic fill-slate-700">L</text>
        <path d="M165,40 A 70,70 0 0 1 165,100" stroke="#334155" strokeWidth="1" fill="none" strokeDasharray="2,2" />
        <text x="170" y="65" className="text-xs font-serif fill-slate-700">Θ<tspan dy="2" fontSize="9">1</tspan></text>
        <line x1="10" y1="70" x2="40" y2="70" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="25" y="60" textAnchor="middle" className="text-[10px] font-sans fill-slate-600 tracking-wider">FROM FAN</text>
        <text x="30" y="85" className="text-xs font-serif italic fill-slate-700">Q</text>
      </g>
      {/* --- BOTTOM VIEW (Plan) --- */}
      <g transform="translate(0, 180)">
        <line x1="20" y1="70" x2="360" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" />
        <line x1="130" y1="-50" x2="130" y2="40" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="230" y1="-50" x2="230" y2="20" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="50" y1="45" x2="130" y2="45" stroke="#334155" strokeWidth="1.5" />
        <line x1="50" y1="95" x2="130" y2="95" stroke="#334155" strokeWidth="1.5" />
        <ellipse cx="50" cy="70" rx="8" ry="25" stroke="#334155" strokeWidth="1" fill="none" />
        <line x1="130" y1="45" x2="230" y2="20" stroke="#334155" strokeWidth="1.5" />
        <line x1="130" y1="95" x2="230" y2="120" stroke="#334155" strokeWidth="1.5" />
        <line x1="130" y1="45" x2="130" y2="95" stroke="#334155" strokeWidth="1" />
        <line x1="230" y1="20" x2="310" y2="20" stroke="#334155" strokeWidth="1.5" />
        <line x1="230" y1="120" x2="310" y2="120" stroke="#334155" strokeWidth="1.5" />
        <line x1="230" y1="20" x2="230" y2="120" stroke="#334155" strokeWidth="1" />
        <path d="M310,20 L310,45 L302,52 L318,68 L310,75 L310,120" stroke="#334155" strokeWidth="1" fill="none" />
        <line x1="100" y1="45" x2="100" y2="95" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="115" y="74" className="text-xs font-serif italic fill-slate-700">D<tspan dy="2" fontSize="9">1</tspan></text>
        <line x1="260" y1="20" x2="260" y2="120" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="245" y="74" className="text-xs font-serif italic fill-slate-700">W<tspan dy="2" fontSize="9">o</tspan></text>
        <path d="M170,38 A 80,80 0 0 1 170,102" stroke="#334155" strokeWidth="1" fill="none" strokeDasharray="2,2" />
        <text x="175" y="75" className="text-xs font-serif fill-slate-700">Θ<tspan dy="2" fontSize="9">2</tspan></text>
        <line x1="10" y1="70" x2="40" y2="70" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="25" y="60" textAnchor="middle" className="text-[10px] font-sans fill-slate-600 tracking-wider">FROM FAN</text>
        <text x="30" y="85" className="text-xs font-serif italic fill-slate-700">Q</text>
      </g>
    </svg>
  </div>
);

export const DiagramER43: React.FC = () => (
  <div className="w-full h-auto bg-white rounded-lg overflow-hidden select-none flex items-center justify-center p-4">
    <svg viewBox="0 0 400 320" className="w-full max-w-[500px]">
      <SvgDefs />
      {/* --- TOP VIEW (Elevation) --- */}
      <g transform="translate(0, 20)">
        <line x1="20" y1="70" x2="360" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" />
        {/* Rectangular Left */}
        <line x1="50" y1="50" x2="130" y2="50" stroke="#334155" strokeWidth="1.5" />
        <line x1="50" y1="90" x2="130" y2="90" stroke="#334155" strokeWidth="1.5" />
        <path d="M50,45 L50,62 L42,66 L58,74 L50,78 L50,95" stroke="#334155" strokeWidth="1" fill="none" />
        {/* Transition */}
        <line x1="130" y1="50" x2="230" y2="30" stroke="#334155" strokeWidth="1.5" />
        <line x1="130" y1="90" x2="230" y2="110" stroke="#334155" strokeWidth="1.5" />
        <line x1="130" y1="50" x2="130" y2="90" stroke="#334155" strokeWidth="1" />
        {/* Round Right */}
        <line x1="230" y1="30" x2="290" y2="30" stroke="#334155" strokeWidth="1.5" />
        <line x1="230" y1="110" x2="290" y2="110" stroke="#334155" strokeWidth="1.5" />
        <line x1="230" y1="30" x2="230" y2="110" stroke="#334155" strokeWidth="1" />
        <path d="M290,30 C315,50 265,90 290,110" stroke="#334155" strokeWidth="1.5" fill="none" />
        {/* Labels */}
        <line x1="100" y1="50" x2="100" y2="90" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="115" y="74" className="text-xs font-serif italic fill-slate-700">H<tspan dy="2" fontSize="9">1</tspan></text>
        <line x1="260" y1="30" x2="260" y2="110" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="245" y="74" className="text-xs font-serif italic fill-slate-700">D<tspan dy="2" fontSize="9">o</tspan></text>
        <line x1="130" y1="125" x2="230" y2="125" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <line x1="130" y1="95" x2="130" y2="130" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="230" y1="115" x2="230" y2="130" stroke="#cbd5e1" strokeWidth="1" />
        <text x="180" y="120" textAnchor="middle" className="text-xs font-serif italic fill-slate-700">L</text>
        <path d="M160,44 A 60,60 0 0 1 160,96" stroke="#334155" strokeWidth="1" fill="none" strokeDasharray="2,2" />
        <text x="165" y="74" className="text-xs font-serif fill-slate-700">Θ<tspan dy="2" fontSize="9">1</tspan></text>
        {/* Arrows TO FAN */}
        <line x1="300" y1="70" x2="330" y2="70" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="315" y="60" textAnchor="middle" className="text-[10px] font-sans fill-slate-600 tracking-wider">TO FAN</text>
        <text x="315" y="85" className="text-xs font-serif italic fill-slate-700">Q</text>
        {/* Q arrow left */}
        <line x1="20" y1="70" x2="45" y2="70" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="30" y="65" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">Q</text>
      </g>
      {/* --- BOTTOM VIEW (Plan) --- */}
      <g transform="translate(0, 180)">
        <line x1="20" y1="70" x2="360" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" />
        <line x1="130" y1="-50" x2="130" y2="40" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" />
        <line x1="230" y1="-50" x2="230" y2="20" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" />
        {/* Rect Left */}
        <line x1="50" y1="55" x2="130" y2="55" stroke="#334155" strokeWidth="1.5" />
        <line x1="50" y1="85" x2="130" y2="85" stroke="#334155" strokeWidth="1.5" />
        <path d="M50,50 L50,62 L42,66 L58,74 L50,78 L50,90" stroke="#334155" strokeWidth="1" fill="none" />
        {/* Transition */}
        <line x1="130" y1="55" x2="230" y2="30" stroke="#334155" strokeWidth="1.5" />
        <line x1="130" y1="85" x2="230" y2="110" stroke="#334155" strokeWidth="1.5" />
        <line x1="130" y1="55" x2="130" y2="85" stroke="#334155" strokeWidth="1" />
        {/* Round Right */}
        <line x1="230" y1="30" x2="290" y2="30" stroke="#334155" strokeWidth="1.5" />
        <line x1="230" y1="110" x2="290" y2="110" stroke="#334155" strokeWidth="1.5" />
        <line x1="230" y1="30" x2="230" y2="110" stroke="#334155" strokeWidth="1" />
        <path d="M290,30 C315,50 265,90 290,110" stroke="#334155" strokeWidth="1.5" fill="none" />
        {/* Labels */}
        <line x1="100" y1="55" x2="100" y2="85" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="115" y="74" className="text-xs font-serif italic fill-slate-700">W<tspan dy="2" fontSize="9">1</tspan></text>
        <line x1="260" y1="30" x2="260" y2="110" stroke="#334155" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
        <text x="245" y="74" className="text-xs font-serif italic fill-slate-700">D<tspan dy="2" fontSize="9">o</tspan></text>
        <path d="M165,47 A 60,60 0 0 1 165,93" stroke="#334155" strokeWidth="1" fill="none" strokeDasharray="2,2" />
        <text x="170" y="74" className="text-xs font-serif fill-slate-700">Θ<tspan dy="2" fontSize="9">2</tspan></text>
        <line x1="10" y1="70" x2="40" y2="70" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="25" y="60" textAnchor="middle" className="text-[10px] font-sans fill-slate-600 tracking-wider">FROM FAN</text>
        <text x="30" y="85" className="text-xs font-serif italic fill-slate-700">Q</text>
      </g>
    </svg>
  </div>
);
