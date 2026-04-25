import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import GlassCard from './GlassCard';

interface ChartProps {
  title?: string;
  type: 'area' | 'bar' | 'pie';
  data: any[];
  config?: any;
  height?: number;
}

const Chart: React.FC<ChartProps> = ({ 
  title, 
  type, 
  data, 
  config,
  height = 300 
}) => {
  const formatValue = (value: any) => {
    if (typeof value === 'number') {
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
      return value.toString();
    }
    return value;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border-white/10 shadow-2xl backdrop-blur-2xl">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-sm font-bold text-white">{formatValue(entry.value)}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <GlassCard className="p-6">
      {title && <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">{title}</h3>}
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                tickFormatter={formatValue}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#6366f1" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
                animationDuration={2000}
              />
            </AreaChart>
          ) : type === 'bar' ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                tickFormatter={formatValue}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} animationDuration={2000} />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                animationDuration={2000}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={config?.colors?.[index] || '#6366f1'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};

export default Chart;
