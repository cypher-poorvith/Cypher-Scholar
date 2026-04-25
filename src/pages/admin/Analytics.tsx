import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet,
  ChevronDown
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';

const Analytics: React.FC = () => {
  const userGrowth = [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 800 },
    { name: 'Mar', users: 1500 },
    { name: 'Apr', users: 2400 },
    { name: 'May', users: 3800 },
    { name: 'Jun', users: 5200 },
  ];

  const deviceData = [
    { name: 'Desktop', value: 45, color: '#6366f1' },
    { name: 'Mobile', value: 40, color: '#a855f7' },
    { name: 'Tablet', value: 15, color: '#06b6d4' },
  ];

  const subjectPerformance = [
    { subject: 'Physics', score: 85 },
    { subject: 'Chemistry', score: 72 },
    { subject: 'Math', score: 91 },
    { subject: 'Biology', score: 68 },
    { subject: 'Computer', score: 95 },
  ];

  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-black text-white tracking-tight">Analytics Nexus</h1>
          <p className="text-slate-500 font-medium mt-1">Deep telemetric insights into platform engagement.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="immersive-card py-2 px-4 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-colors">
            <span className="text-xs font-bold text-slate-400">Timeframe: <span className="text-white">Last 30 Days</span></span>
            <ChevronDown size={14} className="text-slate-600" />
          </div>
        </div>
      </header>

      {/* Primary Analytics Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* User Registration Trend */}
        <div className="lg:col-span-2 immersive-card p-8 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-black text-white">Universal Registrations</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Growth trajectory over time</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-black">
              <TrendingUp size={16} />
              +124%
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowth}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 'bold' }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#16122D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#6366f1" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#userGrad)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Distribution */}
        <div className="immersive-card p-8 flex flex-col">
          <h3 className="text-lg font-black text-white mb-2">Device Proliferation</h3>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-10">Terminal access breakdown</p>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Globe size={24} className="text-slate-600 mb-1" />
                <span className="text-2xl font-black text-white">100%</span>
              </div>
            </div>

            <div className="w-full space-y-4 mt-8">
              {deviceData.map((device, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: device.color }}></div>
                      <span className="text-xs font-bold text-slate-400 capitalize">{device.name}</span>
                   </div>
                   <span className="text-xs font-black text-white">{device.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Subject Performance Radar */}
        <div className="immersive-card p-8 flex flex-col min-h-[400px]">
           <h3 className="text-lg font-black text-white mb-2">Knowledge Nexus Core</h3>
           <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-10">Subject-wise engagement index</p>
           
           <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectPerformance}>
                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 'bold' }} 
                  />
                  <Radar
                    name="Engagement"
                    dataKey="score"
                    stroke="#a855f7"
                    fill="#a855f7"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Global Node Activity */}
        <div className="immersive-card p-8 flex flex-col">
           <h3 className="text-lg font-black text-white mb-2">Node Efficiency</h3>
           <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-10">Daily peak performance metrics</p>
           
           <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformance}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
                  <XAxis 
                    dataKey="subject" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold' }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.02)'}}
                    contentStyle={{ backgroundColor: '#16122D', border: 'none', borderRadius: '12px' }}
                  />
                  <Bar dataKey="score" fill="#06b6d4" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
