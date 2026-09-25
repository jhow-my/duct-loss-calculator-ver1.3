
import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  ReferenceDot
} from 'recharts';
import { FittingResult, CurvePoint } from '../types';

interface ResultsChartProps {
  result: FittingResult | null;
  showSiUnits: boolean;
}

export const ResultsChart: React.FC<ResultsChartProps> = ({ result, showSiUnits }) => {
  const data = useMemo<CurvePoint[]>(() => {
    if (!result) return [];

    const points: CurvePoint[] = [];
    // Generate points from 0 to 150% of design velocity (which is in FPM)
    const maxVelFpm = Math.max(result.velocity * 1.5, 4000); 
    const steps = 10;
    
    for (let i = 0; i <= steps; i++) {
      const vFpm = (maxVelFpm / steps) * i;
      // Calculation: VP = (V/4005)^2, Loss = C * VP
      const vp = Math.pow(vFpm / 4005, 2);
      const lossInWg = result.coefficient * vp;
      
      if (showSiUnits) {
        points.push({
          velocity: Number((vFpm * 0.00508).toFixed(2)), // FPM to m/s
          pressureLoss: Number((lossInWg * 249.089).toFixed(2)), // in. wg to Pa
        });
      } else {
        points.push({
          velocity: Math.round(vFpm),
          pressureLoss: Number(lossInWg.toFixed(4)),
        });
      }
    }
    return points;
  }, [result, showSiUnits]);

  const currentPoint = useMemo(() => {
    if (!result) return null;
    if (showSiUnits) {
      return {
        velocity: Number((result.velocity * 0.00508).toFixed(2)),
        pressureLoss: Number((result.totalPressureLoss * 249.089).toFixed(2))
      };
    } else {
      return {
        velocity: Math.round(result.velocity),
        pressureLoss: Number(result.totalPressureLoss.toFixed(4))
      };
    }
  }, [result, showSiUnits]);

  const unitLabels = useMemo(() => ({
    velocity: showSiUnits ? 'm/s' : 'FPM',
    pressure: showSiUnits ? 'Pa' : 'in. wg'
  }), [showSiUnits]);

  if (!result) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400 text-sm">
        No data
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-sm font-semibold text-slate-600 mb-2 px-2 pt-2">Pressure Loss Curve</h3>
      {/* 
          Fix for Recharts "width(-1) and height(-1)" warning:
          Use a relative container with a specific min-height, and place the 
          ResponsiveContainer inside an absolute inset-0 div. 
          This forces the chart to take the size of the parent explicitly.
      */}
      <div className="flex-grow relative min-h-[200px]">
        <div className="absolute inset-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, bottom: 25, left: 15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="velocity" 
                type="number"
                stroke="#64748b" 
                fontSize={11}
                tickFormatter={(value) => `${value}`}
              >
                 <Label value={`Velocity (${unitLabels.velocity})`} offset={-5} position="insideBottom" style={{ fill: '#64748b', fontSize: '11px' }} />
              </XAxis>
              <YAxis 
                stroke="#64748b" 
                fontSize={11}
                tickFormatter={(value) => value.toFixed(showSiUnits ? 0 : 2)}
              >
                <Label value={`Pressure Loss (${unitLabels.pressure})`} angle={-90} position="insideLeft" style={{ fill: '#64748b', fontSize: '11px', textAnchor: 'middle' }} offset={10} />
              </YAxis>
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                formatter={(value: number) => [`${value} ${unitLabels.pressure}`, 'Pressure Loss']}
                labelFormatter={(label) => `${label} ${unitLabels.velocity}`}
              />
              <Line 
                type="monotone" 
                dataKey="pressureLoss" 
                stroke="#2563eb" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
              />
              {currentPoint && (
                <ReferenceDot 
                  x={currentPoint.velocity} 
                  y={currentPoint.pressureLoss} 
                  r={6} 
                  fill="#2563eb" 
                  stroke="#fff"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
