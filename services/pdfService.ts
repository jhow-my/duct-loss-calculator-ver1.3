
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FittingResult, DuctShape } from '../types';

export const generateSchedulePDF = (
  projectRows: FittingResult[],
  totalProjectLoss: number,
  showSiUnits: boolean,
  systemNo: string
) => {
  // Switch to Portrait orientation
  const doc = new jsPDF({ orientation: 'portrait' });
  const unitLabel = showSiUnits ? "(SI)" : "(IP)";
  
  // Title
  doc.setFontSize(16);
  doc.text(`Total Pressure Loss Calculation ${unitLabel}`, 14, 15);
  
  // Helpers
  const formatVal = (val: number, type: 'len' | 'flow' | 'vel' | 'press', isSi: boolean) => {
    if (isSi) {
        switch(type) {
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

  const getCleanedDescription = (row: FittingResult) => {
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

    // 2. Remove Loss Coefficient info (Suffix)
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

    // Cleanup formatting
    text = text.replace(/^[,\s]+/, ''); 
    text = text.replace(/[.,\s]+$/, ''); 

    return text;
  };

  // Define Columns matching the UI Schedule
  // No. | ASHRAE No. | Fitting Type | Airflow | Size | Velocity | VP | Coeff. | Loss
  const headers = [
      "No.",
      "ASHRAE No.",
      "Fitting Type",
      `Airflow\n(${showSiUnits ? 'CMH' : 'CFM'})`,
      `Size\n(${showSiUnits ? 'mm' : 'in'})`,
      `Velocity\n(${showSiUnits ? 'm/s' : 'FPM'})`,
      `Vel. Press.\n(${showSiUnits ? 'Pa' : 'in. wg'})`,
      "Coeff.",
      `Loss\n(${showSiUnits ? 'Pa' : 'in. wg'})`
  ];

  const tableRows = projectRows.map((row, index) => {
     const secondary = getCleanedDescription(row);
     // Combine Primary Title and Cleaned Secondary Description
     const description = secondary 
        ? `${row.fittingType}\n${secondary}` 
        : row.fittingType;

     return [
       (index + 1).toString(),
       row.ashraeCode || '-',
       description,
       formatVal(row.airflow, 'flow', showSiUnits),
       formatDimensions(row, showSiUnits),
       formatVal(row.velocity, 'vel', showSiUnits),
       formatVal(row.velocityPressure, 'press', showSiUnits),
       row.coefficient.toFixed(2),
       formatVal(row.totalPressureLoss, 'press', showSiUnits)
     ];
  });

  // Footer Row for Total Loss
  const totalLossStr = formatVal(totalProjectLoss, 'press', showSiUnits);

  autoTable(doc, {
    head: [headers],
    body: tableRows,
    startY: 30,
    margin: { top: 30, bottom: 20 },
    styles: { fontSize: 8, valign: 'middle', cellPadding: 2, overflow: 'linebreak' }, // Reduced font size slightly for portrait
    headStyles: { fillColor: [241, 245, 249], textColor: [51, 65, 85], fontStyle: 'bold', halign: 'center', valign: 'middle' },
    foot: [[
        { 
            content: 'Total Pressure Loss', 
            colSpan: 8, 
            styles: { halign: 'right', fontStyle: 'bold', fillColor: [248, 250, 252], textColor: [15, 23, 42] } 
        },
        { 
            content: totalLossStr, 
            styles: { halign: 'center', fontStyle: 'bold', textColor: [37, 99, 235], fillColor: [248, 250, 252] } 
        }
    ]],
    // Optimized Column Widths for Portrait A4 (~180mm printable width)
    columnStyles: {
        0: { cellWidth: 8, halign: 'center' },  // No.
        1: { cellWidth: 18, halign: 'center' }, // ASHRAE
        2: { cellWidth: 'auto', halign: 'left' }, // Fitting Type (Takes remaining space)
        3: { cellWidth: 16, halign: 'center' }, // Airflow
        4: { cellWidth: 18, halign: 'center' }, // Size
        5: { cellWidth: 16, halign: 'center' }, // Velocity
        6: { cellWidth: 20, halign: 'center' }, // Vel. Press.
        7: { cellWidth: 12, halign: 'center' }, // Coeff
        8: { cellWidth: 16, halign: 'center', fontStyle: 'bold', textColor: [30, 41, 59] } // Loss
    },
    didDrawPage: (data) => {
        const pageSize = doc.internal.pageSize;
        const pageWidth = pageSize.width || pageSize.getWidth();

        // System Tag Header
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`System Tag: ${systemNo || 'N/A'}`, pageWidth - 14, 15, { align: 'right' });
    }
  });

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    const pageSize = doc.internal.pageSize;
    const pageHeight = pageSize.height || pageSize.getHeight();
    const pageWidth = pageSize.width || pageSize.getWidth();

    // Page Number Footer (Format: Page Number/pages)
    const str = `Page ${i}/${totalPages}`;
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(str, pageWidth - 14, pageHeight - 10, { align: 'right' });
  }

  doc.save(`duct-loss-schedule-${systemNo || 'draft'}.pdf`);
};
