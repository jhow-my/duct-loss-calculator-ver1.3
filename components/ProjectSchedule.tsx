import React, { useState } from 'react';
import { FittingResult, DuctShape } from '../types';
import { Download, Trash2, Copy, GripVertical } from 'lucide-react';
import { generateSchedulePDF } from '../services/pdfService';

interface ProjectScheduleProps {
  projectRows: FittingResult[];
  totalProjectLoss: number;
  showSiUnits: boolean;
  systemNo: string;
  setSystemNo: (val: string) => void;
  setProjectRows: React.Dispatch<React.SetStateAction<FittingResult[]>>;
}

export const ProjectSchedule: React.FC<ProjectScheduleProps> = ({ 
  projectRows, 
  totalProjectLoss, 
  showSiUnits, 
  systemNo, 
  setSystemNo, 
  setProjectRows 
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', index.toString());
    }
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updatedRows = [...projectRows];
    const [draggedItem] = updatedRows.splice(draggedIndex, 1);
    updatedRows.splice(targetIndex, 0, draggedItem);
    setProjectRows(updatedRows);

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };



  const handleDelete = (id: string) => {
    setProjectRows(prev => prev.filter(r => r.id !== id));
  };

  const duplicateRow = (row: FittingResult) => {
    const newRow = { ...row, id: crypto.randomUUID(), timestamp: Date.now() };
    const index = projectRows.findIndex(r => r.id === row.id);
    const newRows = [...projectRows];
    newRows.splice(index + 1, 0, newRow);
    setProjectRows(newRows);
  };

  const formatVal = (val: number, type: 'len' | 'flow' | 'vel' | 'press', isSi: boolean) => {
    if (isSi) {
      switch (type) {
        case 'len': return Math.round(val * 25.4).toString();
        case 'flow': return Math.round(val * 1.699).toLocaleString();
        case 'vel': return (val * 0.00508).toFixed(2);
        case 'press': return (val * 249.089).toFixed(2);
      }
    }
    if (type === 'flow') return Math.round(val).toLocaleString();
    if (type === 'len') return parseFloat(val.toFixed(2)).toString(); 
    return val.toFixed(2);
  };

  const formatDimensions = (res: FittingResult, isSi: boolean) => {
    if (res.customSize) return res.customSize;
    const f = (v: number | undefined) => formatVal(v || 0, 'len', isSi);
    if (res.shape === DuctShape.ROUND) return `D${f(res.dimensions.diameter)}`;
    return `${f(res.dimensions.width)}x${f(res.dimensions.height)}`;
  };

  const formatSecondaryDescription = (row: FittingResult) => {
    if (row.ashraeCode === 'Custom' || row.fittingType === 'Custom') {
      return '';
    }
    let text = row.aiReasoning || row.fittingDescription || "";
    
    // 1. Remove Fitting Type and ASHRAE No. (Prefix)
    if (row.ashraeCode) {
      const escapedCode = row.ashraeCode.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const prefixRegex = new RegExp(`^.*?${escapedCode}.*?:\\s*`, 'i');
      text = text.replace(prefixRegex, '');
    }
    
    if (text.startsWith(row.fittingType)) {
      text = text.substring(row.fittingType.length).replace(/^[:\s]+/, '');
    }

    // 2. Remove Loss Coefficient info (Suffix) and keep Inputs
    const separators = [
      " ->", 
      ". Base Cp=", 
      ". Re=", 
      ": Loss coefficient", 
      " Loss coefficient",
      " based on" 
    ];

    for (const sep of separators) {
      const idx = text.indexOf(sep);
      if (idx !== -1) {
        text = text.substring(0, idx);
      }
    }

    text = text.replace(/^[,\s]+/, ''); 
    text = text.replace(/[.,\s]+$/, ''); 

    return text;
  };

  const handleExportPDF = () => {
    generateSchedulePDF(projectRows, totalProjectLoss, showSiUnits, systemNo);
  };

  if (projectRows.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-8">
      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-slate-800">System Tag:</h3>
          <input 
            type="text" 
            placeholder="e.g. EAF-01" 
            value={systemNo}
            onChange={(e) => setSystemNo(e.target.value)}
            className="text-sm border border-slate-300 bg-white rounded-lg px-3 py-2 w-40 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 text-sm bg-white border border-red-200 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors"
          >
            <Download className="w-4 h-4 text-red-600" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-xs text-left text-slate-600 table-fixed">
          <colgroup>
            <col style={{ width: '30px' }} />
            <col style={{ width: '35px' }} />
            <col style={{ width: '75px' }} />
            <col />
            <col style={{ width: '85px' }} />
            <col style={{ width: '80px' }} />
            <col style={{ width: '75px' }} />
            <col style={{ width: '85px' }} />
            <col style={{ width: '55px' }} />
            <col style={{ width: '80px' }} />
            <col style={{ width: '65px' }} />
          </colgroup>
          <thead className="text-[10px] tracking-wider text-slate-700 uppercase bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="px-1 py-2 text-center"></th>
              <th className="px-1 py-2 text-center">No.</th>
              <th className="px-2 py-2 text-center">ASHRAE No.</th>
              <th className="px-2 py-2 text-left">Fitting Type</th>
              <th className="px-2 py-2 text-center">Airflow ({showSiUnits ? 'CMH' : 'CFM'})</th>
              <th className="px-2 py-2 text-center">Size ({showSiUnits ? 'mm' : 'in'})</th>
              <th className="px-2 py-2 text-center">Velocity ({showSiUnits ? 'm/s' : 'FPM'})</th>
              <th className="px-2 py-2 text-center">Vel. Press. ({showSiUnits ? 'Pa' : 'in. wg'})</th>
              <th className="px-2 py-2 text-center">Coeff.</th>
              <th className="px-2 py-2 text-center">Loss ({showSiUnits ? 'Pa' : 'in. wg'})</th>
              <th className="px-2 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {projectRows.map((row, index) => (
              <tr 
                key={row.id} 
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDragEnd={handleDragEnd}
                onDrop={(e) => handleDrop(e, index)}
                className={`border-b border-slate-100 transition-all duration-150 ${
                  draggedIndex === index ? 'opacity-30 bg-slate-100 border-dashed border-slate-300' : 'hover:bg-slate-50'
                } ${
                  dragOverIndex === index ? 'border-t-4 border-t-blue-500 bg-blue-50/20' : ''
                }`}
              >
                <td className="px-1 py-1.5 text-center align-middle">
                  <div className="flex justify-center items-center select-none">
                    <div 
                      className="text-slate-400 hover:text-blue-600 cursor-grab active:cursor-grabbing p-1 rounded hover:bg-slate-100 transition-colors"
                      title="Click and drag to reorder"
                    >
                      <GripVertical className="w-4 h-4" />
                    </div>
                  </div>
                </td>
                <td className="px-1 py-1.5 text-center font-bold text-slate-400 align-middle">
                  {index + 1}
                </td>
                <td className="px-2 py-1.5 text-center font-medium text-slate-900 bg-slate-50/50 rounded-lg align-middle">
                  {row.ashraeCode || '-'}
                </td>
                <td className="px-2 py-1.5 align-middle" title={row.fittingDescription}>
                  <div className="font-semibold text-slate-700 leading-snug truncate" style={{ fontSize: '11.5px' }}>{row.fittingType}</div>
                  <div className="text-[10px] text-slate-500 leading-tight truncate" title={row.aiReasoning}>
                    {formatSecondaryDescription(row)}
                  </div>
                </td>
                <td className="px-2 py-1.5 text-center align-middle">
                  {formatVal(row.airflow, 'flow', showSiUnits)}
                </td>
                <td className="px-2 py-1.5 text-center font-mono text-[11px] font-normal text-slate-700 align-middle">
                  {formatDimensions(row, showSiUnits)}
                </td>
                <td className="px-2 py-1.5 text-center align-middle">
                  {formatVal(row.velocity, 'vel', showSiUnits)}
                </td>
                <td className="px-2 py-1.5 text-center align-middle">
                  {formatVal(row.velocityPressure, 'press', showSiUnits)}
                </td>
                <td className="px-2 py-1.5 text-center align-middle">
                  {row.coefficient.toFixed(2)}
                </td>
                <td className="px-2 py-1.5 text-center font-bold text-slate-800 align-middle">
                  {formatVal(row.totalPressureLoss, 'press', showSiUnits)}
                </td>
                <td className="px-2 py-1.5 text-center align-middle">
                  <div className="flex flex-row justify-center items-center gap-1.5">
                    <button 
                      onClick={() => duplicateRow(row)}
                      className="text-slate-400 hover:text-blue-500 p-1 rounded hover:bg-slate-100 transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(row.id)}
                      className="text-slate-400 hover:text-red-500 p-1 rounded hover:bg-slate-100 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            <tr className="bg-slate-50 font-bold text-slate-900">
              <td colSpan={9} className="px-2 py-2 text-right uppercase text-[10px] tracking-wider text-slate-500">Total Pressure Loss</td>
              <td className="px-2 py-2 text-center text-sm text-blue-600 font-extrabold">
                {formatVal(totalProjectLoss, 'press', showSiUnits)}
              </td>
              <td className="px-2 py-2 text-center">
                {/* Clear button removed */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden p-4 space-y-4">
        {projectRows.map((row, index) => (
          <div 
            key={row.id} 
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
            onDrop={(e) => handleDrop(e, index)}
            className={`bg-white border rounded-lg p-4 shadow-sm relative transition-all duration-150 ${
              draggedIndex === index ? 'opacity-30 border-dashed border-slate-300 bg-slate-50/50' : 'border-slate-200'
            } ${
              dragOverIndex === index ? 'border-t-4 border-t-blue-500 bg-blue-50/20' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2 select-none">
                <div 
                  className="text-slate-400 p-1 cursor-grab active:cursor-grabbing hover:bg-slate-100 rounded transition-colors"
                  title="Drag card to reorder"
                >
                  <GripVertical className="w-4 h-4 inline" />
                </div>
                <span className="bg-slate-100 text-slate-600 text-xs font-mono px-2 py-1 rounded">
                  {row.ashraeCode || `#${index + 1}`}
                </span>
                <span className="font-bold text-slate-800 text-sm truncate max-w-[120px]" title={row.fittingType}>
                  {row.fittingType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-600">
                  {formatVal(row.totalPressureLoss, 'press', showSiUnits)} {showSiUnits ? 'Pa' : 'in.wg'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-3 bg-slate-50 p-2 rounded">
              <div>Dim: {formatDimensions(row, showSiUnits)}</div>
              <div>Flow: {formatVal(row.airflow, 'flow', showSiUnits)}</div>
              <div>Vel: {formatVal(row.velocity, 'vel', showSiUnits)} {showSiUnits ? 'm/s' : 'FPM'}</div>
              <div>VP: {formatVal(row.velocityPressure, 'press', showSiUnits)} {showSiUnits ? 'Pa' : 'in. wg'}</div>
              <div className="col-span-2">Coeff: {row.coefficient.toFixed(2)}</div>
            </div>
            {formatSecondaryDescription(row) && (
              <div className="text-xs text-slate-500 mb-3 px-1 italic">
                {formatSecondaryDescription(row)}
              </div>
            )}

            <div className="flex justify-end items-center border-t border-slate-100 pt-2 bg-white gap-3">
                <button 
                  onClick={() => duplicateRow(row)} 
                  className="text-slate-400 hover:text-blue-500 p-1.5 rounded hover:bg-slate-100 transition-colors"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(row.id)} 
                  className="text-slate-400 hover:text-red-500 p-1.5 rounded hover:bg-slate-100 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
            </div>
          </div>
        ))}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex justify-between items-center">
          <span className="font-bold text-slate-700 uppercase text-xs">Total Loss</span>
          <span className="font-bold text-blue-700 text-lg">
            {formatVal(totalProjectLoss, 'press', showSiUnits)} {showSiUnits ? 'Pa' : 'in.wg'}
          </span>
        </div>
      </div>
    </div>
  );
};
