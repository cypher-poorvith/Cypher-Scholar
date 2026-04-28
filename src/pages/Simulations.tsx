import React, { useState } from 'react';
import { 
  Play, Info, ChevronRight, Atom, Beaker, 
  Pi, HelpCircle, Activity, Move, Waves,
  Maximize2, RefreshCcw, Settings2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Common Simulation Shell
const SimulationFrame: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="glass-panel nh overflow-hidden border-2 border-border-subtle hover:border-pr/20 transition-all flex flex-col h-[600px]">
    <div className="p-6 border-b border-border-subtle bg-surface-subtle dark:bg-slate-800/50 flex justify-between items-center">
        <div className="flex items-center gap-3">
           <Activity size={18} className="text-pr" />
           <h3 className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-tx-main dark:text-white">{title}</h3>
        </div>
        <div className="flex gap-2">
           <button className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center text-tx-dim hover:text-pr"><RefreshCcw size={14} /></button>
           <button className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center text-tx-dim hover:text-pr"><Settings2 size={14} /></button>
           <button className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center text-tx-dim hover:text-pr"><Maximize2 size={14} /></button>
        </div>
    </div>
    <div className="flex-1 relative bg-slate-50 dark:bg-slate-900/50">
       {children}
    </div>
  </div>
);

const ProjectileSim = () => (
  <SimulationFrame title="Kinematics: 2D Projectile Lab">
    <div className="absolute inset-0 p-8 flex flex-col items-center justify-center">
       <div className="w-full max-w-md h-40 border-2 border-dashed border-pr/20 rounded-3xl flex flex-col items-center justify-center gap-4 text-center">
          <Play className="text-pr animate-pulse" size={48} />
          <p className="text-[0.7rem] font-black uppercase tracking-widest text-tx-dim">Initializing Newtonian Engine...</p>
       </div>
    </div>
  </SimulationFrame>
);

const SHMSim = () => (
  <SimulationFrame title="Waves: Simple Harmonic Oscillator">
     <div className="absolute inset-0 p-8 flex flex-col items-center justify-center">
       <div className="w-full max-w-md h-40 border-2 border-dashed border-sec/20 rounded-3xl flex flex-col items-center justify-center gap-4 text-center">
          <Waves className="text-sec animate-bounce" size={48} />
          <p className="text-[0.7rem] font-black uppercase tracking-widest text-tx-dim">Ready for wavefront analysis</p>
       </div>
    </div>
  </SimulationFrame>
);

const Simulations: React.FC = () => {
  const [activeSubject, setActiveSubject] = useState('physics');
  const [selectedSim, setSelectedSim] = useState('projectile');

  const subjects = [
    { id: 'physics', label: 'Physics', icon: <Atom size={20} />, color: 'text-pr', bg: 'bg-pr/10' },
    { id: 'chemistry', label: 'Chemistry', icon: <Beaker size={20} />, color: 'text-sec', bg: 'bg-sec/10' },
    { id: 'mathematics', label: 'Mathematics', icon: <Pi size={20} />, color: 'text-ig-purple', bg: 'bg-ig-purple/10' }
  ];

  const simulationsBySubject: any = {
    physics: [
      { id: 'projectile', name: 'Projectile Motion', icon: <Move size={16} />, desc: 'Analysis of motion in two dimensions under gravity.' },
      { id: 'shm', name: 'Wave Mechanics', icon: <Waves size={16} />, desc: 'Harmonic oscillation and longitudinal wave patterns.' },
      { id: 'optics', name: 'Ray Optics', icon: < Play size={16} />, desc: 'Reflection and refraction in complex lens systems.', locked: true }
    ],
    chemistry: [
      { id: 'titration', name: 'Titration Lab', icon: <Beaker size={16} />, desc: 'Acid-base volumetric analysis with real-time pH.', locked: true },
    ],
    mathematics: [
      { id: 'calculus', name: 'Integral Visualizer', icon: <Pi size={16} />, desc: 'Riemann sums and area under complex curves.', locked: true },
    ]
  };

  return (
    <div className="max-w-[1440px] mx-auto p-6 md:p-12 space-y-12 animate-fade-up">
      {/* Subject Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
           <div className="flex items-center gap-3 mb-4">
              <Play size={18} className="text-pr" />
              <span className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-pr leading-none">Simulation Environment</span>
           </div>
           <h2 className="text-[3.5rem] md:text-[6rem] lg:text-[7.5rem] font-black text-tx-main dark:text-white leading-[0.85] uppercase tracking-tighter mb-6 text-3d">Interactive <span className="brand-text-gradient text-glow">Labs</span></h2>
           <p className="text-[1rem] font-medium text-tx-dim max-w-lg">Advanced computational models for conceptual mastery. Select a subject to begin exploration.</p>
        </div>

        <div className="flex gap-4 p-2 glass-panel nh rounded-3xl bg-white dark:bg-slate-900 border-border-subtle">
           {subjects.map(s => (
             <button 
               key={s.id}
               onClick={() => { setActiveSubject(s.id); setSelectedSim(simulationsBySubject[s.id][0]?.id); }}
               className={`flex items-center gap-3 px-6 h-14 rounded-2xl text-[0.8rem] font-black uppercase tracking-wider transition-all ${
                 activeSubject === s.id ? 'bg-pr text-white shadow-lg shadow-pr/20' : 'text-tx-dim hover:bg-surface-subtle dark:hover:bg-slate-800'
               }`}
             >
                {s.icon}
                {s.label}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Simulation Sidebar */}
         <div className="lg:col-span-4 space-y-6">
            <h3 className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-tx-dim px-2">Experimental Modules</h3>
            <div className="space-y-4">
               {simulationsBySubject[activeSubject].map((sim: any) => (
                 <button 
                    key={sim.id}
                    onClick={() => !sim.locked && setSelectedSim(sim.id)}
                    className={`w-full text-left glass-panel nh p-6 transition-all border-2 relative overflow-hidden group ${
                      selectedSim === sim.id 
                      ? 'border-pr bg-pr/[0.02]' 
                      : 'border-border-subtle hover:border-pr/20'
                    } ${sim.locked ? 'opacity-40 cursor-not-allowed' : ''}`}
                 >
                    <div className="flex justify-between items-start mb-4">
                       <div className={`w-10 h-10 rounded-xl bg-surface-subtle dark:bg-slate-800 flex items-center justify-center ${selectedSim === sim.id ? 'text-pr' : 'text-tx-dim'}`}>
                          {sim.icon}
                       </div>
                       {sim.locked ? (
                          <div className="text-[0.55rem] font-black uppercase tracking-widest text-tx-dim bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Dev Calibration</div>
                       ) : (
                          <ChevronRight size={16} className={`transition-transform group-hover:translate-x-1 ${selectedSim === sim.id ? 'text-pr' : 'text-tx-dim'}`} />
                       )}
                    </div>
                    <h4 className={`text-[1.1rem] font-black uppercase tracking-tight mb-2 ${selectedSim === sim.id ? 'text-tx-main dark:text-white' : 'text-tx-muted'}`}>{sim.name}</h4>
                    <p className="text-[0.75rem] text-tx-dim leading-relaxed font-medium">{sim.desc}</p>
                 </button>
               ))}
            </div>
         </div>

         {/* Main Simulation Stage */}
         <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
               <motion.div
                 key={selectedSim}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 className="h-full"
               >
                 {selectedSim === 'projectile' && <ProjectileSim />}
                 {selectedSim === 'shm' && <SHMSim />}
                 {simulationsBySubject[activeSubject].find((s:any) => s.id === selectedSim)?.locked && (
                    <div className="glass-panel nh h-full min-h-[600px] flex flex-col items-center justify-center p-12 border-dashed border-2 text-center bg-surface-subtle dark:bg-slate-900/50">
                       <HelpCircle size={64} className="text-pr opacity-20 mb-8" />
                       <h3 className="text-[2rem] font-black uppercase text-tx-main dark:text-white mb-4">Module Restricted</h3>
                       <p className="text-tx-dim max-w-sm">This experiment is currently undergoing data calibration and will be available to verified scholars in the next update.</p>
                       <button className="btn-primary mt-10 h-14 px-10">Request Access</button>
                    </div>
                 )}
               </motion.div>
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
};

export default Simulations;

