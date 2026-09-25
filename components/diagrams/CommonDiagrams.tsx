
import React from 'react';

const SvgDefs = () => (
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#334155" />
    </marker>
    <marker id="arrow-start" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M9,0 L9,6 L0,3 z" fill="#334155" />
    </marker>
    <marker id="arrow-end" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" fill="#334155" />
    </marker>
    <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
      <line x1="0" y="0" x2="0" y2="8" stroke="#cbd5e1" strokeWidth="1" />
    </pattern>
    <pattern id="hatch-wall" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#cbd5e1" strokeWidth="1" />
    </pattern>
  </defs>
);

export const DiagramCD85: React.FC = () => (
  <div className="w-full h-auto bg-white rounded-lg overflow-hidden select-none flex items-center justify-center p-4">
    <svg viewBox="0 0 400 200" className="w-full max-w-[500px]">
      <SvgDefs />
      <line x1="10" y1="100" x2="390" y2="100" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" />
      <line x1="50" y1="50" x2="350" y2="50" stroke="#334155" strokeWidth="1.5" />
      <line x1="50" y1="150" x2="350" y2="150" stroke="#334155" strokeWidth="1.5" />
      <ellipse cx="50" cy="100" rx="10" ry="50" stroke="#334155" strokeWidth="1.5" fill="none" />
      <ellipse cx="350" cy="100" rx="10" ry="50" stroke="#334155" strokeWidth="1.5" fill="none" />
      <line x1="100" y1="50" x2="100" y2="150" stroke="#334155" strokeWidth="1" />
      <line x1="300" y1="50" x2="300" y2="150" stroke="#334155" strokeWidth="1" />
      <path d="M120,85 L280,85 L280,115 L120,115 C105,115 105,85 120,85 Z" fill="url(#hatch)" stroke="#334155" strokeWidth="1" />
      <line x1="220" y1="30" x2="200" y2="85" stroke="#64748b" strokeWidth="1" />
      <text x="225" y="30" className="text-xs font-sans text-slate-600 fill-slate-600">SOUND ABSORBING MATERIAL</text>
      <line x1="370" y1="50" x2="370" y2="150" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
      <line x1="350" y1="50" x2="380" y2="50" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="350" y1="150" x2="380" y2="150" stroke="#cbd5e1" strokeWidth="1" />
      <text x="380" y="105" className="text-xs font-serif italic fill-slate-700">D</text>
      <line x1="10" y1="100" x2="40" y2="100" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="25" y="90" className="text-xs font-serif italic fill-slate-700">Q</text>
      <text x="25" y="125" className="text-xs font-serif italic fill-slate-700">A<tspan dy="2" fontSize="9">o</tspan></text>
    </svg>
  </div>
);

export const DiagramCR93: React.FC = () => (
  <div className="w-full h-auto bg-white rounded-lg overflow-hidden select-none flex items-center justify-center p-4">
    <svg viewBox="0 0 500 280" className="w-full max-w-[600px]">
      <SvgDefs />
      {/* Duct wall lines */}
      <line x1="40" y1="60" x2="460" y2="60" stroke="#334155" strokeWidth="1.5" />
      <line x1="40" y1="220" x2="460" y2="220" stroke="#334155" strokeWidth="1.5" />
      
      {/* Side break lines */}
      <path d="M 40,60 L 40,115 L 34,120 L 46,130 L 34,140 L 46,150 L 40,155 L 40,220" stroke="#334155" strokeWidth="1.2" fill="none" />
      <path d="M 460,60 L 460,115 L 454,120 L 466,130 L 454,140 L 466,150 L 460,155 L 460,220" stroke="#334155" strokeWidth="1.2" fill="none" />
      
      {/* Slip-in frame boxes */}
      <rect x="225" y="54" width="10" height="6" fill="white" stroke="#334155" strokeWidth="1" />
      <rect x="225" y="220" width="10" height="6" fill="white" stroke="#334155" strokeWidth="1" />
      
      {/* Center axis line */}
      <line x1="230" y1="60" x2="230" y2="220" stroke="#334155" strokeWidth="1" strokeDasharray="5,3" />
      
      {/* Blade 1 (Top, Y=95) */}
      <path d="M 213,109 Q 212,104 218,107 L 242,83 Q 248,86 247,81" stroke="#334155" strokeWidth="1.5" fill="none" />
      <circle cx="230" cy="95" r="2.5" fill="#334155" stroke="#334155" strokeWidth="0.5" />
      
      {/* Blade 2 (Middle, Y=140) */}
      <path d="M 213,154 Q 212,149 218,152 L 242,128 Q 248,131 247,126" stroke="#334155" strokeWidth="1.5" fill="none" />
      <circle cx="230" cy="140" r="2.5" fill="#334155" stroke="#334155" strokeWidth="0.5" />
      
      {/* Blade 3 (Bottom, Y=185) */}
      <path d="M 213,199 Q 212,194 218,197 L 242,173 Q 248,176 247,171" stroke="#334155" strokeWidth="1.5" fill="none" />
      <circle cx="230" cy="185" r="2.5" fill="#334155" stroke="#334155" strokeWidth="0.5" />
      
      {/* SLIP IN FRAME label and leader line */}
      <path d="M 226,56 L 210,25 L 225,25" stroke="#64748b" strokeWidth="1" fill="none" />
      <text x="230" y="29" className="text-[11px] font-sans text-slate-600 fill-slate-600">SLIP IN FRAME OR FLANGE MOUNTED</text>
      
      {/* CRIMPED LEAF EDGE label and indicator */}
      <circle cx="242" cy="173" r="14" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" fill="none" />
      <path d="M 252,181 L 285,215 L 300,215" stroke="#64748b" strokeWidth="1" fill="none" />
      <text x="305" y="213" className="text-[11px] font-sans text-slate-600 fill-slate-600 font-medium">CRIMPED</text>
      <text x="305" y="226" className="text-[11px] font-sans text-slate-600 fill-slate-600 font-medium">LEAF EDGE</text>
      
      {/* Angle reference line of bottom blade */}
      <line x1="218" y1="197" x2="194" y2="221" stroke="#334155" strokeWidth="1" />
      {/* Horizontal line left of bottom hinge */}
      <line x1="180" y1="185" x2="230" y2="185" stroke="#334155" strokeWidth="1" />
      {/* Angle arc and text */}
      <path d="M 195,185 A 35,35 0 0,0 205.3,209.7" stroke="#334155" strokeWidth="1" fill="none" />
      <text x="187" y="206" className="text-xs font-serif italic fill-slate-700">θ</text>
      
      {/* Size label */}
      <text x="110" y="145" className="text-sm font-serif fill-slate-700 font-medium">H x W</text>
      
      {/* Airflow Q and Ao */}
      <line x1="310" y1="140" x2="380" y2="140" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="345" y="130" className="text-sm font-serif italic fill-slate-700" textAnchor="middle">Q</text>
      <text x="345" y="160" className="text-sm font-serif italic fill-slate-700" textAnchor="middle">A<tspan dy="2" fontSize="9">o</tspan></text>
    </svg>
  </div>
);

export const DiagramCR95: React.FC = () => (
  <div className="w-full h-auto bg-white rounded-lg overflow-hidden select-none flex items-center justify-center p-4">
    <svg viewBox="0 0 400 300" className="w-full max-w-[500px]">
      <SvgDefs />
      <line x1="50" y1="100" x2="350" y2="100" stroke="#334155" strokeWidth="1.5" />
      <line x1="50" y1="200" x2="350" y2="200" stroke="#334155" strokeWidth="1.5" />
      <path d="M50,95 L50,112 L42,116 L58,124 L50,128 L50,205" stroke="#334155" strokeWidth="1" fill="none" />
      <path d="M350,95 L350,112 L342,116 L358,124 L350,128 L350,205" stroke="#334155" strokeWidth="1" fill="none" />
      <rect x="175" y="20" width="50" height="75" fill="url(#hatch-wall)" stroke="#334155" strokeWidth="1" />
      <line x1="175" y1="95" x2="225" y2="95" stroke="#334155" strokeWidth="1" />
      <rect x="175" y="205" width="50" height="75" fill="url(#hatch-wall)" stroke="#334155" strokeWidth="1" />
      <line x1="175" y1="205" x2="225" y2="205" stroke="#334155" strokeWidth="1" />
      <line x1="140" y1="98" x2="260" y2="98" stroke="#334155" strokeWidth="1" />
      <line x1="140" y1="202" x2="260" y2="202" stroke="#334155" strokeWidth="1" />
      <polyline points="165,98 175,98 175,88" fill="none" stroke="#334155" strokeWidth="1.5" />
      <circle cx="170" cy="98" r="1.5" fill="#334155" />
      <polyline points="235,98 225,98 225,88" fill="none" stroke="#334155" strokeWidth="1.5" />
      <circle cx="230" cy="98" r="1.5" fill="#334155" />
      <polyline points="165,202 175,202 175,212" fill="none" stroke="#334155" strokeWidth="1.5" />
      <circle cx="170" cy="202" r="1.5" fill="#334155" />
      <polyline points="235,202 225,202 225,212" fill="none" stroke="#334155" strokeWidth="1.5" />
      <circle cx="230" cy="202" r="1.5" fill="#334155" />
      <line x1="190" y1="100" x2="190" y2="200" stroke="#334155" strokeWidth="1" />
      <line x1="210" y1="100" x2="210" y2="200" stroke="#334155" strokeWidth="1" />
      <path d="M192,100 L208,100 L208,120 L192,120 Z" fill="#fff" stroke="#334155" strokeWidth="1" />
      <path d="M192,105 L208,105" stroke="#334155" strokeWidth="0.5" />
      <path d="M192,110 L208,110" stroke="#334155" strokeWidth="0.5" />
      <path d="M192,115 L208,115" stroke="#334155" strokeWidth="0.5" />
      <line x1="140" y1="95" x2="150" y2="95" stroke="#334155" strokeWidth="1" />
      <line x1="145" y1="95" x2="130" y2="70" stroke="#64748b" strokeWidth="1" />
      <text x="130" y="65" textAnchor="end" className="text-xs font-sans text-slate-600">"S" SLIP</text>
      <line x1="160" y1="105" x2="150" y2="120" stroke="#64748b" strokeWidth="1" />
      <text x="145" y="130" textAnchor="end" className="text-xs font-sans text-slate-600">SLEEVE</text>
      <line x1="225" y1="88" x2="240" y2="70" stroke="#64748b" strokeWidth="1" />
      <text x="245" y="65" className="text-xs font-sans text-slate-600">MOUNTING ANGLE (TYP.)</text>
      <line x1="175" y1="240" x2="140" y2="240" stroke="#64748b" strokeWidth="1" />
      <text x="135" y="244" textAnchor="end" className="text-xs font-sans text-slate-600">FIRE BARRIER</text>
      <line x1="210" y1="150" x2="240" y2="160" stroke="#64748b" strokeWidth="1" />
      <text x="245" y="165" className="text-xs font-sans text-slate-600">TYPE "A" FIRE</text>
      <text x="245" y="177" className="text-xs font-sans text-slate-600">DAMPER (VERT.</text>
      <text x="245" y="189" className="text-xs font-sans text-slate-600">OR HORIZ.)</text>
      <text x="300" y="230" className="text-xs font-serif text-slate-700">DUCT (W x H)</text>
      <line x1="280" y1="225" x2="300" y2="200" stroke="#64748b" strokeWidth="1" />
      <line x1="60" y1="150" x2="100" y2="150" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="80" y="140" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">Q</text>
      <text x="80" y="165" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">A<tspan dy="2" fontSize="9">o</tspan></text>
    </svg>
  </div>
);

export const DiagramSR21: React.FC = () => (
  <div className="w-full h-64 bg-white rounded-lg overflow-hidden select-none flex items-center justify-center p-4">
    <svg viewBox="0 0 350 150" className="w-full max-w-[400px]">
      <SvgDefs />
      <path d="M50,40 L50,65 L42,72 L58,88 L50,95 L50,120" stroke="#334155" strokeWidth="1" fill="none" />
      <line x1="50" y1="40" x2="200" y2="40" stroke="#334155" strokeWidth="1.5" />
      <line x1="50" y1="120" x2="200" y2="120" stroke="#334155" strokeWidth="1.5" />
      <text x="125" y="85" textAnchor="middle" className="text-xs font-serif fill-slate-700">H x W</text>
      <line x1="150" y1="75" x2="210" y2="75" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="170" y="65" className="text-xs font-serif italic fill-slate-700">Q</text>
      <text x="180" y="98" className="text-xs font-serif italic fill-slate-700">A<tspan dy="3" fontSize="10">o</tspan></text>
      <text x="230" y="80" className="text-xs font-sans fill-slate-600 tracking-wide">FREE DISCHARGE</text>
    </svg>
  </div>
);

export const DiagramCR111: React.FC = () => (
    <div className="w-full h-64 bg-white rounded-lg overflow-hidden select-none flex items-center justify-center p-4">
      <svg viewBox="0 0 400 150" className="w-full max-w-[400px]">
        <SvgDefs />
        {/* Left Break Line */}
        <polyline points="50,40 55,50 45,60 55,70 45,80 55,90 45,100 50,110" stroke="#334155" strokeWidth="1" fill="none" />
        {/* Right Break Line */}
        <polyline points="350,40 355,50 345,60 355,70 345,80 355,90 345,100 350,110" stroke="#334155" strokeWidth="1" fill="none" />
        
        {/* Duct Body */}
        <line x1="50" y1="40" x2="350" y2="40" stroke="#334155" strokeWidth="1.5" />
        <line x1="50" y1="110" x2="350" y2="110" stroke="#334155" strokeWidth="1.5" />
        
        {/* Center Text */}
        <text x="200" y="80" textAnchor="middle" className="text-sm font-serif fill-slate-700">H x W</text>
        
        {/* Airflow Arrow Left */}
        <line x1="0" y1="75" x2="40" y2="75" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="20" y="65" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">Q</text>
        
        {/* Airflow Arrow Right */}
        <line x1="360" y1="75" x2="400" y2="75" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
        
        {/* Dimension Line L */}
        <line x1="100" y1="130" x2="300" y2="130" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
        <rect x="190" y="125" width="20" height="10" fill="white" stroke="none" />
        <text x="200" y="134" textAnchor="middle" className="text-xs font-serif italic fill-slate-700">L</text>
      </svg>
    </div>
);

export const DiagramGenericElbow: React.FC = () => (
  <div className="w-full h-64 bg-white rounded-lg overflow-hidden select-none flex items-center justify-center">
    <svg viewBox="20 90 260 210" className="w-full h-full max-w-[350px]">
      <SvgDefs />
      <path d="M50,100 L50,125 L42,132 L58,148 L50,155 L50,180" stroke="#334155" strokeWidth="1" fill="none" />
      <line x1="50" y1="100" x2="150" y2="100" stroke="#334155" strokeWidth="2" />
      <line x1="50" y1="180" x2="150" y2="180" stroke="#334155" strokeWidth="2" />
      <path d="M150,100 A100,100 0 0 1 250,200" stroke="#334155" strokeWidth="2" fill="none" />
      <path d="M150,180 A20,20 0 0 1 170,200" stroke="#334155" strokeWidth="2" fill="none" />
      <line x1="250" y1="200" x2="250" y2="250" stroke="#334155" strokeWidth="2" />
      <line x1="170" y1="200" x2="170" y2="250" stroke="#334155" strokeWidth="2" />
      <path d="M170,250 L195,250 L202,258 L218,242 L225,250 L250,250" stroke="#334155" strokeWidth="1" fill="none" />
      <path d="M50,140 L150,140 A60,60 0 0 1 210,200 L210,250" stroke="#94a3b8" strokeWidth="1" strokeDasharray="8 4" fill="none" />
      <line x1="260" y1="200" x2="260" y2="250" stroke="#64748b" strokeWidth="1" markerStart="url(#arrow-end)" markerEnd="url(#arrow-end)" />
      <text x="270" y="230" className="text-xs font-medium fill-slate-500">L</text>
      <line x1="40" y1="100" x2="40" y2="180" stroke="#64748b" strokeWidth="1" markerStart="url(#arrow-end)" markerEnd="url(#arrow-end)" />
      <text x="25" y="145" className="text-xs font-medium fill-slate-500">H</text>
      <line x1="150" y1="180" x2="150" y2="200" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
      <line x1="170" y1="200" x2="150" y2="200" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
      <text x="140" y="195" className="text-xs font-serif italic fill-slate-400">r</text>
    </svg>
  </div>
);

export const DiagramCustom: React.FC = () => (
  <div className="w-full h-auto min-h-[220px] bg-white rounded-lg overflow-hidden select-none flex items-center justify-center p-4">
    <svg viewBox="0 0 400 200" className="w-full max-w-[420px]">
      <SvgDefs />
      {/* Center line */}
      <line x1="20" y1="100" x2="380" y2="100" stroke="#94a3b8" strokeWidth="1" strokeDasharray="8,4" />
      
      {/* Left Break Line */}
      <polyline points="60,45 66,56 54,67 66,78 54,89 66,100 54,111 66,122 54,133 60,145" stroke="#334155" strokeWidth="1.2" fill="none" />
      
      {/* Right Break Line */}
      <polyline points="340,45 346,56 334,67 346,78 334,89 346,100 334,111 346,122 334,133 340,145" stroke="#334155" strokeWidth="1.2" fill="none" />
      
      {/* Duct Top & Bottom Walls */}
      <line x1="60" y1="45" x2="340" y2="45" stroke="#334155" strokeWidth="1.8" />
      <line x1="60" y1="145" x2="340" y2="145" stroke="#334155" strokeWidth="1.8" />
      
      {/* Center Custom Fitting Representation */}
      <rect x="135" y="55" width="130" height="90" rx="6" fill="#f8fafc" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5,3" />
      
      <text x="200" y="90" textAnchor="middle" className="text-xs font-bold fill-blue-700 tracking-wider">CUSTOM FITTING</text>
      <text x="200" y="108" textAnchor="middle" className="text-[10px] font-sans fill-slate-500">Direct Entry • User Defined</text>
      <text x="200" y="125" textAnchor="middle" className="text-[10px] font-mono fill-slate-400">ΔP, C, P<tspan dy="2" fontSize="8">v</tspan></text>
      
      {/* Airflow Inflow (Q, V) */}
      <line x1="15" y1="100" x2="55" y2="100" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="35" y="90" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">Q, V</text>
      
      {/* Airflow Outflow (Q) */}
      <line x1="345" y1="100" x2="385" y2="100" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="365" y="90" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">Q</text>
      
      {/* Size dimension line */}
      <line x1="45" y1="45" x2="45" y2="145" stroke="#64748b" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
      <rect x="36" y="90" width="18" height="18" fill="white" stroke="none" />
      <text x="45" y="102" textAnchor="middle" className="text-[9px] font-sans fill-slate-600 font-semibold">Size</text>
      
      {/* Pressure Loss indicator below */}
      <line x1="135" y1="162" x2="265" y2="162" stroke="#2563eb" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
      <rect x="175" y="156" width="50" height="12" fill="white" stroke="none" />
      <text x="200" y="165" textAnchor="middle" className="text-[10px] font-bold fill-blue-600">Loss (ΔP)</text>
    </svg>
  </div>
);

