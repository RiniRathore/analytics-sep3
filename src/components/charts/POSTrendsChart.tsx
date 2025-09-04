import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Eye, EyeOff } from 'lucide-react';

interface POSTrendsData {
  pos_trends: Record<string, Array<{ count: number; date: string }>>;
}

interface POSTrendsChartProps {
  data: POSTrendsData;
}

const COLORS = [
  '#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
];

const POSTrendsChart: React.FC<POSTrendsChartProps> = ({ data }) => {
  const [visibleLines, setVisibleLines] = useState<Set<string>>(new Set());

  // Get top 10 POS systems by total bookings
  const posSystemTotals = Object.entries(data.pos_trends).map(([pos, trends]) => ({
    pos,
    total: trends.reduce((sum, trend) => sum + trend.count, 0)
  })).sort((a, b) => b.total - a.total).slice(0, 10);

  // Initialize with top 5 visible
  React.useEffect(() => {
    setVisibleLines(new Set(posSystemTotals.slice(0, 5).map(item => item.pos)));
  }, [data]);

  // Transform data for chart
  const allDates = new Set<string>();
  Object.values(data.pos_trends).forEach(trends => {
    trends.forEach(trend => allDates.add(trend.date));
  });

  const chartData = Array.from(allDates).sort().map(date => {
    const dataPoint: any = { date };
    posSystemTotals.forEach(({ pos }) => {
      const trend = data.pos_trends[pos]?.find(t => t.date === date);
      dataPoint[pos] = trend ? trend.count : 0;
    });
    return dataPoint;
  });

  const toggleLine = (pos: string) => {
    const newVisible = new Set(visibleLines);
    if (newVisible.has(pos)) {
      newVisible.delete(pos);
    } else {
      newVisible.add(pos);
    }
    setVisibleLines(newVisible);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const visiblePayload = payload.filter((p: any) => visibleLines.has(p.dataKey));
      
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/60 shadow-xl">
          <p className="font-semibold text-slate-800 mb-3">{label}</p>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {visiblePayload
              .sort((a: any, b: any) => b.value - a.value)
              .map((entry: any, index: number) => (
                <div key={index} className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-slate-700 max-w-32 truncate">
                      {entry.dataKey}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {entry.value}
                  </span>
                </div>
              ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
            <XAxis 
              dataKey="date" 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            
            {posSystemTotals.map(({ pos }, index) => (
              <Line
                key={pos}
                type="monotone"
                dataKey={pos}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={visibleLines.has(pos) ? 3 : 0}
                dot={{ fill: COLORS[index % COLORS.length], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: COLORS[index % COLORS.length], strokeWidth: 2 }}
                connectNulls={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend with Toggle */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">POS Systems (Click to toggle)</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
          {posSystemTotals.map(({ pos, total }, index) => (
            <motion.button
              key={pos}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => toggleLine(pos)}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 text-left ${
                visibleLines.has(pos)
                  ? 'bg-white border-slate-300 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-60 hover:opacity-80'
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  {visibleLines.has(pos) ? (
                    <Eye className="w-3 h-3 text-slate-500" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-slate-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    {pos.length > 25 ? `${pos.substring(0, 25)}...` : pos}
                  </p>
                  <p className="text-xs text-slate-500">{total.toLocaleString()} bookings</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default POSTrendsChart;