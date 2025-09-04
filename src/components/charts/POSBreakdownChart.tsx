import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface POSData {
  pos_breakdown: Record<string, number>;
  total_bookings: number;
}

interface POSBreakdownChartProps {
  data: POSData;
}

const COLORS = [
  '#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1',
  '#14B8A6', '#F43F5E', '#8B5A2B', '#7C3AED', '#DC2626'
];

const POSBreakdownChart: React.FC<POSBreakdownChartProps> = ({ data }) => {
  // Get top 15 POS systems for better visualization
  const sortedPOS = Object.entries(data.pos_breakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15);

  const chartData = sortedPOS.map(([name, count], index) => ({
    name: name.length > 20 ? `${name.substring(0, 20)}...` : name,
    fullName: name,
    value: count,
    percentage: ((count / data.total_bookings) * 100).toFixed(1),
    color: COLORS[index % COLORS.length]
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/60 shadow-xl">
          <p className="font-semibold text-slate-800 mb-2">{data.fullName}</p>
          <div className="space-y-1">
            <p className="text-sm text-slate-600">
              <span className="font-medium">Bookings:</span> {data.value.toLocaleString()}
            </p>
            <p className="text-sm text-slate-600">
              <span className="font-medium">Share:</span> {data.percentage}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => (
    <div className="grid grid-cols-2 gap-2 mt-6 max-h-40 overflow-y-auto">
      {payload?.slice(0, 10).map((entry: any, index: number) => (
        <div key={index} className="flex items-center space-x-2 text-xs">
          <div 
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-600 truncate">{entry.value}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            outerRadius={120}
            innerRadius={60}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default POSBreakdownChart;