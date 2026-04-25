import React, { useState, useMemo } from 'react';
import { 
  Trophy, CheckCircle2, XCircle, Clock, TrendingUp, Download, Share2, 
  RotateCcw, ChevronDown, ChevronUp, Zap, Target, Brain, ArrowLeft, 
  Search, Filter, Star, Info, Flag, HelpCircle, LayoutDashboard,
  BarChart3, PieChart as PieIcon, LineChart as LineIcon, List, Eye,
  School, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip as ReTooltip, Legend, LineChart, Line, 
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, Scatter, ZAxis
} from 'recharts';

const TestResult: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);

  // Mock Data for the Test Result
  const testData = {
    testName: "JEE Main Mock Test 5",
    totalScore: 234,
    maxScore: 300,
    rank: 45,
    percentile: 98.1,
    timeTaken: "2h 45m",
    totalTime: "3h 00m",
    accuracy: 81.2,
    stats: {
      correct: 65,
      incorrect: 15,
      skipped: 10,
    },
    subjects: [
      { name: "Physics", score: 85, max: 100, correct: 22, incorrect: 5, skipped: 3, time: 55, accuracy: 81.5, trend: 'up' },
      { name: "Chemistry", score: 72, max: 100, correct: 20, incorrect: 6, skipped: 4, time: 52, accuracy: 76.9, trend: 'stable' },
      { name: "Mathematics", score: 77, max: 100, correct: 23, incorrect: 4, skipped: 3, time: 58, accuracy: 85.2, trend: 'up' },
    ],
    strengths: [
      { topic: "Thermodynamics", accuracy: 95 },
      { topic: "Calculus", accuracy: 92 },
      { topic: "Organic Chemistry", accuracy: 88 },
      { topic: "Kinematics", accuracy: 85 },
      { topic: "Algebra", accuracy: 83 },
    ],
    weaknesses: [
      { topic: "Electromagnetic Induction", accuracy: 45 },
      { topic: "Trigonometry", accuracy: 52 },
      { topic: "Chemical Bonding", accuracy: 58 },
      { topic: "Optics", accuracy: 62 },
      { topic: "Coordination Compounds", accuracy: 65 },
    ],
    questions: [
      { id: 1, subject: "Physics", topic: "Kinematics", difficulty: "Easy", status: "correct", time: "45s", text: "A car accelerates uniformly from rest to a speed of 20 m/s in 10s. The distance covered is?", options: ["50m", "100m", "150m", "200m"], correctAnswer: "100m", userAnswer: "100m", solution: "Using s = ut + 1/2 at^2. Given u=0, v=20, t=10. a = (v-u)/t = 2. s = 0 + 1/2 * 2 * 100 = 100m." },
      { id: 2, subject: "Physics", topic: "EM Induction", difficulty: "Hard", status: "incorrect", time: "4m 12s", text: "In a coil of resistance 100 Ω, a current is induced by changing the magnetic flux through it as shown in the figure...", options: ["10 units", "20 units", "30 units", "40 units"], correctAnswer: "20 units", userAnswer: "10 units", solution: "The change in flux is given by Δφ. Induced charge Q = Δφ/R..." },
      { id: 3, subject: "Chemistry", topic: "Atomic Structure", difficulty: "Medium", status: "skipped", time: "0s", text: "The wavelength of the first line of Lyman series for H-atom is equal to that of the second line of Balmer series for a hydrogen-like ion X. The atomic number Z of X is?", options: ["2", "3", "4", "5"], correctAnswer: "2", userAnswer: null, solution: "Equating wavelengths using Rydberg formula..." },
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={18} /> },
    { id: 'section', label: 'Section Analysis', icon: <Eye size={18} /> },
    { id: 'question', label: 'Question Analysis', icon: <List size={18} /> },
    { id: 'time', label: 'Time Analysis', icon: <Clock size={18} /> },
    { id: 'comparison', label: 'Comparison', icon: <LineIcon size={18} /> },
    { id: 'solutions', label: 'Solutions', icon: <Brain size={18} /> },
  ];

  const timeData = [
    { name: 'Physics', time: 55, accuracy: 81.5 },
    { name: 'Chemistry', time: 52, accuracy: 76.9 },
    { name: 'Math', time: 58, accuracy: 85.2 },
  ];

  const toggleQuestion = (id: number) => {
    setExpandedQuestions(prev => 
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  // Components for Tabs
  const OverviewTab = () => (
    <div className="space-y-12">
      {/* Subject Breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        {testData.subjects.map((sub, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-8 group border-white/5 hover:border-indigo-500/30 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-black text-white uppercase italic tracking-tight">{sub.name}</h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">
                  Time: {sub.time}m | Acc: {sub.accuracy}%
                </p>
              </div>
              <div className={`p-2 rounded-lg bg-white/5 ${sub.trend === 'up' ? 'text-emerald-400' : 'text-slate-400'}`}>
                <TrendingUp size={20} className={sub.trend === 'stable' ? 'rotate-90' : ''} />
              </div>
            </div>
            
            <div className="text-3xl font-black text-white mb-6">
              {sub.score}<span className="text-slate-600 text-lg">/{sub.max}</span>
            </div>

            <div className="space-y-4">
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                  style={{ width: `${sub.score}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span className="text-emerald-400">C: {sub.correct}</span>
                <span className="text-rose-400">I: {sub.incorrect}</span>
                <span className="text-amber-400">S: {sub.skipped}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 border-emerald-500/10 bg-emerald-500/[0.02]">
          <div className="flex items-center gap-3 mb-8 border-b border-emerald-500/10 pb-4">
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Strong Topics</h3>
          </div>
          <div className="space-y-4">
            {testData.strengths.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <span className="text-sm font-bold text-slate-300">{item.topic}</span>
                <span className="text-sm font-black text-emerald-400">{item.accuracy}% ✓</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-8 border-rose-500/10 bg-rose-500/[0.02]">
          <div className="flex items-center gap-3 mb-8 border-b border-rose-500/10 pb-4">
            <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400">
              <TrendingUp size={24} className="rotate-180" />
            </div>
            <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Needs Work</h3>
          </div>
          <div className="space-y-4">
            {testData.weaknesses.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <span className="text-sm font-bold text-slate-300">{item.topic}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-rose-400">{item.accuracy}%</span>
                  <button className="text-[10px] bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full text-indigo-400 font-black uppercase tracking-widest border border-white/10 transition-all">Practice</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SectionAnalysisTab = () => (
    <div className="space-y-8">
      {testData.subjects.map((sub, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-panel overflow-hidden border-white/5"
        >
          <div className="p-6 bg-white/5 flex justify-between items-center border-b border-white/10">
            <h3 className="text-lg font-black text-white uppercase tracking-tight italic">{sub.name} - Performance</h3>
            <span className="text-2xl font-black text-indigo-400">{sub.score}/100</span>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Attempted</p>
                <p className="text-2xl font-black text-white">{sub.correct + sub.incorrect}</p>
              </div>
              <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-center">
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Correct</p>
                <p className="text-2xl font-black text-white">{sub.correct}</p>
              </div>
              <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-center">
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Incorrect</p>
                <p className="text-2xl font-black text-white">{sub.incorrect}</p>
              </div>
              <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-center">
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Skipped</p>
                <p className="text-2xl font-black text-white">{sub.skipped}</p>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Difficulty Breakdown</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <th className="pb-4 px-4">Difficulty</th>
                      <th className="pb-4 px-4">Qs</th>
                      <th className="pb-4 px-4">Correct</th>
                      <th className="pb-4 px-4">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { type: 'Easy', qs: 10, c: 9, acc: 90, color: 'text-emerald-400' },
                      { type: 'Medium', qs: 15, c: 11, acc: 73.3, color: 'text-amber-400' },
                      { type: 'Hard', qs: 5, c: 2, acc: 40, color: 'text-rose-400' }
                    ].map((row, idx) => (
                      <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                        <td className={`py-4 px-4 text-xs font-black uppercase ${row.color}`}>{row.type}</td>
                        <td className="py-4 px-4 text-xs font-bold text-white">{row.qs}</td>
                        <td className="py-4 px-4 text-xs font-bold text-white">{row.c}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full ${row.color.replace('text-', 'bg-')}`} style={{ width: `${row.acc}%` }} />
                            </div>
                            <span className="text-[10px] font-black text-white">{row.acc}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const QuestionAnalysisTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass-panel p-4 border-white/5 mb-8">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by topic or keyword..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="h-12 px-6 bg-white/5 text-slate-400 rounded-xl border border-white/10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">
            <Filter size={16} /> Filters
          </button>
          <button className="h-12 px-6 bg-white/5 text-slate-400 rounded-xl border border-white/10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">
            Sort <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {testData.questions.map((q, i) => (
          <div key={i} className="glass-panel overflow-hidden border-white/5">
            <button 
              onClick={() => toggleQuestion(q.id)}
              className="w-full flex flex-col md:flex-row items-start md:items-center justify-between p-6 hover:bg-white/[0.02] transition-colors text-left gap-4"
            >
              <div className="flex items-center gap-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${
                  q.status === 'correct' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  q.status === 'incorrect' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                  'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {q.id}
                </div>
                <div>
                  <div className="flex gap-2 mb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">{q.subject}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest bg-white/5 text-slate-400 px-2 py-0.5 rounded border border-white/10">{q.difficulty}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest bg-white/5 text-slate-500 px-2 py-0.5 rounded italic text-white/50">{q.topic}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-200 line-clamp-1">{q.text}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 pr-4">
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Time Spent</p>
                  <p className="text-sm font-black text-white">{q.time}</p>
                </div>
                <div className={expandedQuestions.includes(q.id) ? 'rotate-180' : ''}>
                  <ChevronDown size={20} className="text-slate-500" />
                </div>
              </div>
            </button>

            <AnimatePresence>
              {expandedQuestions.includes(q.id) && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-8 border-t border-white/5 bg-white/[0.01]"
                >
                  <div className="space-y-8">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <p className="text-lg font-bold text-white leading-relaxed mb-8">{q.text}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {q.options.map((opt, idx) => (
                          <div 
                            key={idx} 
                            className={`p-4 rounded-xl border text-sm font-bold flex items-center justify-between ${
                              opt === q.correctAnswer ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' :
                              opt === q.userAnswer ? 'bg-rose-500/10 border-rose-500/50 text-rose-400' :
                              'bg-white/5 border-white/10 text-slate-400'
                            }`}
                          >
                            <span>{String.fromCharCode(65 + idx)}) {opt}</span>
                            {opt === q.correctAnswer && <CheckCircle2 size={16} />}
                            {opt === q.userAnswer && opt !== q.correctAnswer && <XCircle size={16} />}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Solution Detail</h5>
                      <div className="p-6 bg-[#0D0A1F] rounded-2xl border border-white/5 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {q.solution}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-white/5">
                      <button className="px-6 h-10 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:scale-105 transition-all">Practice Similar Qs</button>
                      <button className="px-6 h-10 bg-white/5 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10 hover:text-white transition-all">Bookmark</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );

  const TimeAnalysisTab = () => (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 min-h-[400px] flex flex-col">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Time Distribution per Subject</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Physics', value: 33, color: '#6366F1' },
                    { name: 'Chemistry', value: 31, color: '#22D3EE' },
                    { name: 'Math', value: 36, color: '#A855F7' },
                  ]}
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {[0, 1, 2].map((_, i) => (
                    <Cell key={i} fill={['#6366F1', '#22D3EE', '#A855F7'][i]} />
                  ))}
                </Pie>
                <ReTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-8 min-h-[400px]">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Accuracy vs Time Taken</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis type="number" dataKey="time" name="Time" unit="m" stroke="#334155" />
              <YAxis type="number" dataKey="accuracy" name="Accuracy" unit="%" stroke="#334155" />
              <ReTooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Subjects" data={timeData} fill="#6366F1" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel p-8">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Efficiency Metrics</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                <th className="pb-6 px-4">Subject</th>
                <th className="pb-6 px-4">Total Time</th>
                <th className="pb-6 px-4">Avg Per Q</th>
                <th className="pb-6 px-4">Fastest</th>
                <th className="pb-6 px-4">Slowest</th>
                <th className="pb-6 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: 'Physics', total: '55m', avg: '1m 50s', fast: '23s', slow: '4m 32s', status: 'Good ✓', color: 'text-emerald-400' },
                { name: 'Chemistry', total: '52m', avg: '1m 44s', fast: '18s', slow: '3m 54s', status: 'Excellent ✓', color: 'text-indigo-400' },
                { name: 'Mathematics', total: '58m', avg: '1m 56s', fast: '35s', slow: '5m 12s', status: 'Needs Work ⚠️', color: 'text-amber-400' },
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="py-6 px-4 text-xs font-black uppercase text-white italic">{row.name}</td>
                  <td className="py-6 px-4 text-xs font-bold text-slate-300">{row.total}</td>
                  <td className="py-6 px-4 text-xs font-bold text-slate-300">{row.avg}</td>
                  <td className="py-6 px-4 text-xs font-bold text-slate-400">{row.fast}</td>
                  <td className="py-6 px-4 text-xs font-bold text-slate-400">{row.slow}</td>
                  <td className={`py-6 px-4 text-xs font-black uppercase tracking-tight ${row.color}`}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ComparisonTab = () => (
    <div className="space-y-12">
      <div className="glass-panel p-10 min-h-[500px]">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Score Distribution (All India)</h3>
        <ResponsiveContainer width="100%" height={350}>
           <AreaChart data={[
             { x: 0, y: 5 }, { x: 50, y: 20 }, { x: 100, y: 60 }, { x: 150, y: 120 }, 
             { x: 195, y: 200 }, { x: 234, y: 150 }, { x: 270, y: 50 }, { x: 300, y: 10 }
           ]}>
             <defs>
               <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                 <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
               </linearGradient>
             </defs>
             <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
             <XAxis dataKey="x" stroke="#334155" axisLine={false} tickLine={false} />
             <YAxis stroke="#334155" hide />
             <ReTooltip content={({ active, payload }) => {
                if (active && payload && payload.length) {
                   return (
                      <div className="bg-[#16122D] border border-white/10 p-3 rounded-lg shadow-2xl">
                         <p className="text-[10px] font-black text-indigo-400 uppercase mb-1">Score: {payload[0].payload.x}</p>
                         <p className="text-xs font-bold text-white">{payload[0].payload.y} Students</p>
                      </div>
                   );
                }
                return null;
             }} />
             <Area type="monotone" dataKey="y" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorY)" />
           </AreaChart>
        </ResponsiveContainer>
        <div className="mt-8 flex justify-between px-10">
           <div className="text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Average</p>
              <p className="text-lg font-black text-white">195</p>
           </div>
           <div className="text-center">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-1">Your Score</p>
              <p className="text-4xl font-black text-white leading-none">234</p>
           </div>
           <div className="text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Topper</p>
              <p className="text-lg font-black text-white">285</p>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-panel p-8">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Subject Performance Radar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
              { subject: 'Physics', you: 85, avg: 68 },
              { subject: 'Chemistry', you: 72, avg: 65 },
              { subject: 'Mathematics', you: 77, avg: 62 },
            ]}>
              <PolarGrid stroke="#ffffff05" />
              <PolarAngleAxis dataKey="subject" stroke="#334155" tick={{ fontSize: 10, fontWeight: 900 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
              <Radar name="Your Percentile" dataKey="you" stroke="#6366F1" fill="#6366F1" fillOpacity={0.4} />
              <Radar name="Average Percentile" dataKey="avg" stroke="#A855F7" fill="#A855F7" fillOpacity={0.2} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel p-8 flex flex-col justify-center">
          <div className="space-y-8 text-center">
             <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-500/10 text-indigo-400 mb-4">
                <Star size={40} className="fill-indigo-400" />
             </div>
             <div>
                <h4 className="text-4xl font-black text-white italic tracking-tighter leading-none mb-4">PERCENTILE: 98.1</h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm mx-auto">
                   You performed better than 98.1% of the total test takers in this session. A 10-mark improvement can boost you to rank #25.
                </p>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Rank</p>
                   <p className="text-2xl font-black text-white">#45</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Takers</p>
                   <p className="text-2xl font-black text-white">2,345</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0817] flex flex-col relative overflow-hidden">
      {/* Fixed Sticky Header */}
      <header className="h-20 flex items-center justify-between px-8 bg-white/[0.02] backdrop-blur-xl border-b border-white/5 sticky top-0 z-[100] w-full">
         <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/practice')}
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all group"
            >
               <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
               <h2 className="text-lg font-black text-white uppercase italic tracking-tighter leading-tight">Mock Test Result</h2>
               <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">{testData.testName}</p>
            </div>
         </div>

         <div className="flex gap-4">
            <button className="h-10 px-6 bg-white/5 text-white border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-white/10 transition-all">
               <Download size={16} /> Report
            </button>
            <button className="h-10 px-6 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:scale-105 shadow-lg shadow-indigo-600/20 transition-all">
               <Share2 size={16} /> Share
            </button>
         </div>
      </header>

      {/* Main Analysis Hub */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto p-12 lg:px-24 space-y-16">
        
        {/* Score Overview Cards (Top Hero) */}
        <section className="grid lg:grid-cols-12 gap-10">
           {/* Left Hero: Overall Score */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="lg:col-span-5 glass-panel p-12 relative overflow-hidden flex flex-col items-center justify-center border-indigo-500/10 min-h-[400px]"
           >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[100px] -mr-32 -mt-32" />
              <div className="relative z-10 flex flex-col items-center">
                 <div className="relative w-48 h-48 mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                          <Pie
                            data={[{ value: testData.totalScore }, { value: testData.maxScore - testData.totalScore }]}
                            innerRadius={75}
                            outerRadius={90}
                            paddingAngle={0}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            stroke="none"
                          >
                             <Cell fill="#6366F1" />
                             <Cell fill="#ffffff05" />
                          </Pie>
                       </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <p className="text-5xl font-black text-white leading-none">{testData.totalScore}</p>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">/{testData.maxScore}</p>
                       <p className="text-xl font-black text-indigo-400 uppercase italic tracking-tighter mt-4">{testData.accuracy}%</p>
                    </div>
                 </div>
                 
                 <div className="flex gap-10 w-full justify-center">
                    <div className="text-center group cursor-default">
                       <div className="flex items-center gap-2 text-indigo-400 mb-1 justify-center">
                          <Trophy size={16} />
                          <p className="text-lg font-black text-white">#45</p>
                       </div>
                       <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Rank</p>
                    </div>
                    <div className="text-center group cursor-default">
                       <div className="flex items-center gap-2 text-emerald-400 mb-1 justify-center">
                          <TrendingUp size={16} />
                          <p className="text-lg font-black text-white">98.1</p>
                       </div>
                       <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Percentile</p>
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* Right Hero: Stats Grid */}
           <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              <div className="grid md:grid-cols-3 gap-6">
                 {[
                   { label: 'Correct', val: testData.stats.correct, color: 'text-emerald-400', icon: <CheckCircle2 size={20} /> },
                   { label: 'Incorrect', val: testData.stats.incorrect, color: 'text-rose-400', icon: <XCircle size={20} /> },
                   { label: 'Skipped', val: testData.stats.skipped, color: 'text-amber-400', icon: <Info size={20} /> },
                   { label: 'Time Spent', val: '2h 45m', color: 'text-indigo-400', icon: <Clock size={20} /> },
                   { label: 'Avg Marks', val: '+260 -15', color: 'text-slate-400', icon: <Target size={20} /> },
                   { label: 'Efficiency', val: 'High', color: 'text-cyan-400', icon: <Zap size={20} /> },
                 ].map((stat, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.05 }}
                     className="glass-panel p-6 border-white/5 flex flex-col gap-4 group hover:bg-white/5 transition-all"
                   >
                     <div className={`w-10 h-10 rounded-xl bg-white/5 ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        {stat.icon}
                     </div>
                     <div>
                        <p className={`text-2xl font-black ${stat.color} leading-none`}>{stat.val}</p>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2">{stat.label}</p>
                     </div>
                   </motion.div>
                 ))}
              </div>

              <div className="glass-panel p-6 border-white/5 bg-white/[0.01]">
                 <div className="flex justify-between items-center mb-6">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">How You Compare</h4>
                    <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Percentile Focus</span>
                 </div>
                 <div className="relative h-12 flex items-center px-4">
                    <div className="absolute inset-x-4 h-2 bg-white/5 rounded-full" />
                    <div className="absolute inset-x-4 h-2 bg-gradient-to-r from-indigo-500/20 via-indigo-500/60 to-purple-500/80 rounded-full" style={{ width: '78%' }} />
                    <div className="absolute left-[30%] -translate-x-1/2 flex flex-col items-center gap-1">
                       <div className="w-1 h-3 bg-slate-600 rounded-full" />
                       <span className="text-[8px] font-black text-slate-600 uppercase tracking-tighter">Avg (195)</span>
                    </div>
                    <div className="absolute left-[78%] -translate-x-1/2 flex flex-col items-center gap-1">
                       <div className="w-3 h-3 bg-white rounded-full ring-4 ring-indigo-500/30" />
                       <span className="text-[9px] font-black text-white uppercase tracking-tighter mt-1">You (234)</span>
                    </div>
                    <div className="absolute left-[95%] -translate-x-1/2 flex flex-col items-center gap-1">
                       <div className="w-1 h-3 bg-amber-500 rounded-full" />
                       <span className="text-[8px] font-black text-amber-500 uppercase tracking-tighter">Top (285)</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Tabbed Navigation */}
        <section className="space-y-12">
          <div className="flex items-center gap-1 bg-white/[0.02] border border-white/5 p-1 rounded-2xl self-start w-fit sticky top-[104px] z-50 backdrop-blur-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="min-h-[600px] animate-in fade-in duration-500">
             {activeTab === 'overview' && <OverviewTab />}
             {activeTab === 'section' && <SectionAnalysisTab />}
             {activeTab === 'question' && <QuestionAnalysisTab />}
             {activeTab === 'time' && <TimeAnalysisTab />}
             {activeTab === 'comparison' && <ComparisonTab />}
             {activeTab === 'solutions' && <QuestionAnalysisTab />}
          </div>
        </section>

        {/* Insights Section */}
        <section className="glass-panel p-12 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 border-indigo-500/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 text-indigo-500/20 opacity-10"><Brain size={120} /></div>
           <div className="relative z-10 space-y-10">
              <div>
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><Zap size={24} /></div>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Personalized Insights</h3>
                 </div>
                 <p className="text-slate-400 font-medium text-lg max-w-3xl">
                    Great work on this test! Your consistency in Mathematics is exceptional. However, we've identified some core logic gaps in Electromagnetism that need urgent attention.
                 </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                 <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-1.5 h-12 bg-indigo-500 rounded-full mt-1" />
                    <div>
                       <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Time Management</p>
                       <p className="text-sm font-bold text-slate-200">You finished 15m early. Consider re-checking marked questions in Physics Section B next time.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-1.5 h-12 bg-rose-500 rounded-full mt-1" />
                    <div>
                       <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2">Concept Focus</p>
                       <p className="text-sm font-bold text-slate-200">Electromagnetic Induction accuracy is 33%. Review Faraday's Law before the next mock.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-1.5 h-12 bg-emerald-500 rounded-full mt-1" />
                    <div>
                       <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Growth Target</p>
                       <p className="text-sm font-bold text-slate-200">Gain +15 marks in Chemistry to unlock the top 1% percentile bracket.</p>
                    </div>
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                 <button className="h-14 px-10 bg-white text-[#0A0817] rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-2xl">
                    <RotateCcw size={18} /> Retake Test Session
                 </button>
                 <button className="h-14 px-10 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                    Practice Predicted Weak Areas
                 </button>
              </div>
           </div>
        </section>

        {/* Footer Navigation */}
        <footer className="pt-20 pb-32 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="text-center md:text-left">
              <p className="text-white font-display font-black text-2xl tracking-tighter uppercase italic">Cypher Scholar</p>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mt-2">Personalized Logic Verification Platform</p>
           </div>
           <div className="flex gap-12">
              <Link to="/practice" className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-all">Practice Zone</Link>
              <Link to="/dashboard" className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-all">Student Hub</Link>
              <Link to="/exams" className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-all">Exam Finder</Link>
           </div>
        </footer>
      </main>

      {/* Floating Scroll Top */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-10 right-10 w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-600/40 z-[1000] border border-white/10"
      >
         <ChevronUp size={24} />
      </motion.button>
    </div>
  );
};

export default TestResult;
