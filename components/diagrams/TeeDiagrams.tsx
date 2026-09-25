
import React from 'react';

// Shared markers defs to avoid repetition
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

export const DiagramSR515: React.FC = () => (
  <div className="w-full h-auto bg-white rounded-lg overflow-hidden select-none flex items-center justify-center p-4">
    <svg viewBox="0 0 500 350" className="w-full max-w-[500px]">
      <SvgDefs />
      {/* Common Duct (Bottom) */}
      <line x1="200" y1="300" x2="200" y2="200" stroke="#334155" strokeWidth="1.5" />
      <line x1="300" y1="300" x2="300" y2="200" stroke="#334155" strokeWidth="1.5" />
      <path d="M200,300 L220,308 L240,292 L260,308 L280,292 L300,300" stroke="#334155" strokeWidth="1" fill="none" />
      {/* Branch 1 (Left) */}
      <line x1="200" y1="200" x2="50" y2="200" stroke="#334155" strokeWidth="1.5" />
      <line x1="200" y1="120" x2="50" y2="120" stroke="#334155" strokeWidth="1.5" />
      <path d="M50,120 L50,200" stroke="#334155" strokeWidth="1" strokeDasharray="4,2" />
      {/* Branch 2 (Right) */}
      <line x1="300" y1="200" x2="450" y2="200" stroke="#334155" strokeWidth="1.5" />
      <line x1="300" y1="120" x2="450" y2="120" stroke="#334155" strokeWidth="1.5" />
      <path d="M450,120 L450,200" stroke="#334155" strokeWidth="1" strokeDasharray="4,2" />
      {/* Top Close */}
      <line x1="200" y1="120" x2="300" y2="120" stroke="#334155" strokeWidth="1.5" />
      {/* Centerlines */}
      <line x1="250" y1="300" x2="250" y2="160" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" />
      <line x1="50" y1="160" x2="450" y2="160" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" />
      {/* Labels */}
      <line x1="250" y1="280" x2="250" y2="240" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="260" y="260" className="text-xs font-serif italic fill-slate-700">Q<tspan dy="2" fontSize="9">c</tspan></text>
      <text x="260" y="275" className="text-xs font-serif italic fill-slate-700">A<tspan dy="2" fontSize="9">c</tspan></text>
      <line x1="200" y1="320" x2="300" y2="320" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
      <line x1="200" y1="300" x2="200" y2="325" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="300" y1="300" x2="300" y2="325" stroke="#cbd5e1" strokeWidth="1" />
      <text x="250" y="335" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">W<tspan dy="2" fontSize="9">c</tspan></text>
      <line x1="150" y1="160" x2="110" y2="160" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="130" y="150" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">Q<tspan dy="2" fontSize="9">b1</tspan></text>
      <line x1="40" y1="120" x2="40" y2="200" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
      <text x="30" y="165" className="text-xs font-serif italic fill-slate-700" textAnchor="end">W<tspan dy="2" fontSize="9">b1</tspan></text>
      <line x1="350" y1="160" x2="390" y2="160" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="370" y="150" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">Q<tspan dy="2" fontSize="9">b2</tspan></text>
      <line x1="460" y1="120" x2="460" y2="200" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
      <text x="470" y="165" className="text-xs font-serif italic fill-slate-700">W<tspan dy="2" fontSize="9">b2</tspan></text>
      <text x="20" y="30" className="text-xs font-sans fill-slate-500">BULLHEAD TEE</text>
      <text x="20" y="45" className="text-xs font-sans fill-slate-500">DIVERGING</text>
      <text x="20" y="60" className="text-xs font-sans fill-slate-500">Branch 1 (Left) / Branch 2 (Right)</text>
    </svg>
  </div>
);

export const DiagramER55: React.FC = () => (
  <div className="w-full h-auto bg-white rounded-lg overflow-hidden select-none flex items-center justify-center p-4">
    <svg viewBox="0 0 500 350" className="w-full max-w-[500px]">
      <SvgDefs />
      {/* Geometry is same as SR5-15, just arrows differ */}
      <line x1="200" y1="300" x2="200" y2="200" stroke="#334155" strokeWidth="1.5" />
      <line x1="300" y1="300" x2="300" y2="200" stroke="#334155" strokeWidth="1.5" />
      <path d="M200,300 L220,308 L240,292 L260,308 L280,292 L300,300" stroke="#334155" strokeWidth="1" fill="none" />
      <line x1="200" y1="200" x2="50" y2="200" stroke="#334155" strokeWidth="1.5" />
      <line x1="200" y1="120" x2="50" y2="120" stroke="#334155" strokeWidth="1.5" />
      <path d="M50,120 L50,200" stroke="#334155" strokeWidth="1" strokeDasharray="4,2" />
      <line x1="300" y1="200" x2="450" y2="200" stroke="#334155" strokeWidth="1.5" />
      <line x1="300" y1="120" x2="450" y2="120" stroke="#334155" strokeWidth="1.5" />
      <path d="M450,120 L450,200" stroke="#334155" strokeWidth="1" strokeDasharray="4,2" />
      <line x1="200" y1="120" x2="300" y2="120" stroke="#334155" strokeWidth="1.5" />
      <line x1="250" y1="300" x2="250" y2="160" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" />
      <line x1="50" y1="160" x2="450" y2="160" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" />
      {/* Arrows (Converging) */}
      <line x1="250" y1="240" x2="250" y2="280" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="260" y="260" className="text-xs font-serif italic fill-slate-700">Q<tspan dy="2" fontSize="9">c</tspan></text>
      <line x1="200" y1="320" x2="300" y2="320" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
      <line x1="200" y1="300" x2="200" y2="325" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="300" y1="300" x2="300" y2="325" stroke="#cbd5e1" strokeWidth="1" />
      <text x="250" y="335" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">W<tspan dy="2" fontSize="9">c</tspan></text>
      <line x1="110" y1="160" x2="150" y2="160" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="130" y="150" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">Q<tspan dy="2" fontSize="9">b1</tspan></text>
      <line x1="40" y1="120" x2="40" y2="200" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
      <text x="30" y="165" className="text-xs font-serif italic fill-slate-700" textAnchor="end">W<tspan dy="2" fontSize="9">b1</tspan></text>
      <line x1="390" y1="160" x2="350" y2="160" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="370" y="150" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">Q<tspan dy="2" fontSize="9">b2</tspan></text>
      <line x1="460" y1="120" x2="460" y2="200" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
      <text x="470" y="165" className="text-xs font-serif italic fill-slate-700">W<tspan dy="2" fontSize="9">b2</tspan></text>
      <text x="20" y="30" className="text-xs font-sans fill-slate-500">BULLHEAD TEE</text>
      <text x="20" y="45" className="text-xs font-sans fill-slate-500">CONVERGING</text>
      <text x="20" y="60" className="text-xs font-sans fill-slate-500">Branch 1 (Left) / Branch 2 (Right)</text>
    </svg>
  </div>
);

export const DiagramSR513: React.FC = () => (
  <div className="w-full h-auto bg-white rounded-lg overflow-hidden select-none flex items-center justify-center p-4">
    <svg viewBox="0 0 500 350" className="w-full max-w-[600px]">
      <SvgDefs />
      <line x1="50" y1="80" x2="300" y2="80" stroke="#334155" strokeWidth="1.5" />
      <line x1="50" y1="160" x2="180" y2="160" stroke="#334155" strokeWidth="1.5" />
      <path d="M50,80 L50,160" stroke="#334155" strokeWidth="1" strokeDasharray="4,2" />
      <path d="M45,80 L50,90 L40,100 L60,110 L50,120 L50,160" stroke="#334155" strokeWidth="1" fill="none" />
      <rect x="40" y="75" width="20" height="90" fill="white" stroke="none" />
      <path d="M50,80 L50,100 L42,105 L58,115 L50,120 L50,160" stroke="#334155" strokeWidth="1" fill="none" />
      <line x1="180" y1="160" x2="210" y2="190" stroke="#334155" strokeWidth="1.5" />
      <line x1="210" y1="190" x2="210" y2="280" stroke="#334155" strokeWidth="1.5" />
      <line x1="290" y1="280" x2="290" y2="160" stroke="#334155" strokeWidth="1.5" />
      <path d="M210,280 L230,288 L250,272 L270,288 L290,280" stroke="#334155" strokeWidth="1" fill="none" />
      <line x1="290" y1="160" x2="300" y2="160" stroke="#334155" strokeWidth="1.5" />
      <line x1="300" y1="80" x2="350" y2="90" stroke="#334155" strokeWidth="1.5" />
      <line x1="300" y1="160" x2="350" y2="150" stroke="#334155" strokeWidth="1.5" />
      <line x1="300" y1="80" x2="300" y2="160" stroke="#334155" strokeWidth="1" />
      <line x1="350" y1="90" x2="450" y2="90" stroke="#334155" strokeWidth="1.5" />
      <line x1="350" y1="150" x2="450" y2="150" stroke="#334155" strokeWidth="1.5" />
      <line x1="350" y1="90" x2="350" y2="150" stroke="#334155" strokeWidth="1" />
      <path d="M450,90 L450,110 L458,115 L442,125 L450,130 L450,150" stroke="#334155" strokeWidth="1" fill="none" />
      <line x1="20" y1="120" x2="325" y2="120" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" />
      <line x1="325" y1="120" x2="480" y2="120" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" />
      <line x1="250" y1="120" x2="250" y2="300" stroke="#94a3b8" strokeWidth="1" strokeDasharray="10,5" />
      <text x="115" y="110" className="text-xs font-serif fill-slate-700">W x H</text>
      <text x="380" y="110" className="text-xs font-serif fill-slate-700">W<tspan dy="2" fontSize="9">s</tspan><tspan dy="-2"> x H</tspan><tspan dy="2" fontSize="9">s</tspan></text>
      <text x="240" y="240" className="text-xs font-serif fill-slate-700" transform="rotate(-90, 240, 240)">W<tspan dy="2" fontSize="9">b</tspan><tspan dy="-2"> x H</tspan><tspan dy="2" fontSize="9">b</tspan></text>
      <line x1="165" y1="160" x2="135" y2="160" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="195" y1="190" x2="135" y2="190" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="145" y1="160" x2="145" y2="190" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
      <text x="135" y="180" className="text-xs font-serif italic fill-slate-700" textAnchor="end">L</text>
      <line x1="10" y1="100" x2="40" y2="100" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="25" y="90" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">Q<tspan dy="2" fontSize="9">c</tspan></text>
      <text x="25" y="135" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">A<tspan dy="2" fontSize="9">c</tspan></text>
      <line x1="460" y1="100" x2="490" y2="100" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="475" y="90" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">Q<tspan dy="2" fontSize="9">s</tspan></text>
      <text x="475" y="135" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">A<tspan dy="2" fontSize="9">s</tspan></text>
      <line x1="250" y1="300" x2="250" y2="330" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="260" y="320" className="text-xs font-serif italic fill-slate-700">Q<tspan dy="2" fontSize="9">b</tspan></text>
      <text x="235" y="320" className="text-xs font-serif italic fill-slate-700">A<tspan dy="2" fontSize="9">b</tspan></text>
      <text x="20" y="330" className="text-xs font-sans fill-slate-500">L = 0.25W<tspan dy="2" fontSize="9">b</tspan><tspan dy="-2">, 3 in. (75mm) min.</tspan></text>
    </svg>
  </div>
);

export const DiagramER53: React.FC = () => (
  <div className="w-full h-auto bg-white rounded-lg overflow-hidden select-none flex items-center justify-center p-4">
    <svg id="diagram-er5-3" viewBox="0 0 500 350" className="w-full max-w-[600px]">
      <SvgDefs />
      {/* ER5-3: Converging Tee with 45 degree entry conforming to ASHRAE details */}
      
      {/* Main Duct Body (Left - Upstream, Right - Downstream) */}
      {/* Top line */}
      <line x1="50" y1="80" x2="450" y2="80" stroke="#334155" strokeWidth="1.5" />
      {/* Bottom line left */}
      <line x1="50" y1="180" x2="200" y2="180" stroke="#334155" strokeWidth="1.5" />
      {/* Bottom line right */}
      <line x1="330" y1="180" x2="450" y2="180" stroke="#334155" strokeWidth="1.5" />
      
      {/* Transition & Branch Body */}
      {/* Left transition (straight down from 200,180 to 200,230) */}
      <line x1="200" y1="180" x2="200" y2="230" stroke="#334155" strokeWidth="1.5" />
      {/* Angled transition (45 degrees up and right from 280,230 to 330,180) */}
      <line x1="280" y1="230" x2="330" y2="180" stroke="#334155" strokeWidth="1.5" />
      {/* Horizontal divider line at top of branch duct (Wb x Hb) */}
      <line x1="200" y1="230" x2="280" y2="230" stroke="#334155" strokeWidth="1" />
      
      {/* Branch vertical walls down to break line */}
      <line x1="200" y1="230" x2="200" y2="290" stroke="#334155" strokeWidth="1.5" />
      <line x1="280" y1="230" x2="280" y2="290" stroke="#334155" strokeWidth="1.5" />

      {/* Break lines */}
      <path d="M50,80 L50,95 L45,100 L55,110 L45,120 L55,130 L45,140 L55,150 L45,160 L50,165 L50,180" stroke="#334155" strokeWidth="1" fill="none" />
      <path d="M450,80 L450,95 L445,100 L455,110 L445,120 L455,130 L445,140 L455,150 L445,160 L450,165 L450,180" stroke="#334155" strokeWidth="1" fill="none" />
      <path d="M200,290 L210,292 L220,286 L230,294 L240,288 L250,294 L260,286 L270,292 L280,290" stroke="#334155" strokeWidth="1" fill="none" />

      {/* Main Flow arrow Qs / As (Left - Upstream) */}
      <line x1="10" y1="130" x2="40" y2="130" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="25" y="120" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">Q<tspan dy="2" fontSize="9">s</tspan></text>
      <text x="25" y="145" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">A<tspan dy="2" fontSize="9">s</tspan></text>

      {/* Branch Flow arrow Qb | Ab (Bottom - pointing Up) */}
      <line x1="240" y1="340" x2="240" y2="305" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="225" y="325" className="text-xs font-serif italic fill-slate-700" textAnchor="end">Q<tspan dy="2" fontSize="9">b</tspan></text>
      <text x="255" y="325" className="text-xs font-serif italic fill-slate-700" textAnchor="start">A<tspan dy="2" fontSize="9">b</tspan></text>

      {/* Common Flow arrow Qc / Ac (Right - Downstream) */}
      <line x1="460" y1="130" x2="490" y2="130" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <text x="475" y="120" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">Q<tspan dy="2" fontSize="9">c</tspan></text>
      <text x="475" y="145" className="text-xs font-serif italic fill-slate-700" textAnchor="middle">A<tspan dy="2" fontSize="9">c</tspan></text>

      {/* Labels inside ducts */}
      <text x="250" y="135" className="text-sm font-serif fill-slate-700 font-medium" textAnchor="middle">W x H</text>
      <text x="240" y="265" className="text-xs font-serif fill-slate-700" textAnchor="middle">W<tspan dy="2" fontSize="9">b</tspan><tspan dy="-2"> x H</tspan><tspan dy="2" fontSize="9">b</tspan></text>
      
      {/* Dimension L indicators */}
      <line x1="330" y1="180" x2="355" y2="180" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="280" y1="230" x2="355" y2="230" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="345" y1="180" x2="345" y2="230" stroke="#334155" strokeWidth="1" markerStart="url(#arrow-start)" markerEnd="url(#arrow)" />
      <text x="355" y="210" className="text-xs font-serif italic fill-slate-700">L</text>

      {/* Notes Text on the bottom left corner directly matching the screenshot reference */}
      <text x="20" y="270" className="text-[11px] font-mono fill-slate-500">L = 0.25 W, 3 in. (75 mm) min.</text>
      <text x="20" y="290" className="text-[11px] font-mono fill-slate-500">A<tspan dy="1.5" fontSize="8">s</tspan><tspan dy="-1.5"> = A</tspan><tspan dy="1.5" fontSize="8">c</tspan></text>
      <text x="20" y="310" className="text-[11px] font-mono fill-slate-500">A<tspan dy="1.5" fontSize="8">b</tspan><tspan dy="-1.5">/A</tspan><tspan dy="1.5" fontSize="8">c</tspan><tspan dy="-1.5"> = 0.5</tspan></text>
    </svg>
  </div>
);
