import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

const Simulation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [angle, setAngle] = useState(45);
  const [speed, setSpeed] = useState(30);
  const [range, setRange] = useState('0');
  const [height, setHeight] = useState('0');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const g = 9.8;
    const rad = (angle * Math.PI) / 180;
    const vx = speed * Math.cos(rad);
    const vy = speed * Math.sin(rad);
    const T = (2 * vy) / g;
    const R = vx * T;
    const maxH = (vy * vy) / (2 * g);

    setRange(R.toFixed(1));
    setHeight(maxH.toFixed(1));

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(241, 245, 249, 1)';
    ctx.fillRect(0, 0, W, H);

    const mg = 30;
    const scX = (W - 2 * mg) / Math.max(R, 1);
    const scY = (H - 2 * mg) / Math.max(maxH * 1.3, 1);
    const sc = Math.min(scX, scY);
    const ox = mg;
    const oy = H - mg;

    // Grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y <= H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    // Ground
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(W, oy); ctx.stroke();

    // Trajectory
    ctx.strokeStyle = '#e1306c';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let first = true;
    for (let t = 0; t <= T; t += T / 100) {
      const x = vx * t;
      const y = vy * t - 0.5 * g * t * t;
      const cx = ox + x * sc;
      const cy = oy - y * sc;
      first ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
      first = false;
    }
    ctx.stroke();

    // Apex dot
    const tMax = vy / g;
    const xApex = vx * tMax;
    const yApex = vy * tMax - 0.5 * g * tMax * tMax;
    ctx.fillStyle = '#f77737';
    ctx.beginPath();
    ctx.arc(ox + xApex * sc, oy - yApex * sc, 5, 0, Math.PI * 2);
    ctx.fill();

    // Arrow
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + Math.cos(rad) * 32, oy - Math.sin(rad) * 32); ctx.stroke();

    // Angle label
    ctx.fillStyle = '#f97316';
    ctx.font = '10px Inter';
    ctx.fillText(`${angle}°`, ox + 18, oy - 18);
  }, [angle, speed]);

  return (
    <div className="glass-panel nh">
      <canvas ref={canvasRef} width={400} height={200} className="w-full bg-surface-subtle rounded-lg" />
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex items-center gap-2.5">
          <span className="label-sm min-w-[38px]">Angle</span>
          <input type="range" min="10" max="80" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="flex-1 accent-pr" />
          <span className="font-display font-black text-[0.95rem] text-pr min-w-[34px]">{angle}°</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="label-sm min-w-[38px]">Speed</span>
          <input type="range" min="10" max="50" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="flex-1 accent-sec" />
          <span className="font-display font-black text-[0.95rem] text-sec min-w-[34px]">{speed}</span>
        </div>
        <div className="flex gap-3 mt-1">
          <div className="glass-panel nh flex-1 p-3">
             <span className="label-sm">Range</span>
             <div className="font-display text-base font-black text-pr">{range}m</div>
          </div>
          <div className="glass-panel nh flex-1 p-3">
             <span className="label-sm">Max Height</span>
             <div className="font-display text-base font-black text-sec">{height}m</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Landing: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-surface font-body-md text-on-surface overflow-x-hidden min-h-screen"
    >
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 md:px-gutter pt-32 pb-20">
          {/* Background Decorative Elements */}
          <div className="absolute top-20 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] -z-10 animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-secondary/10 rounded-full blur-[70px] md:blur-[100px] -z-10 animate-pulse" />
          
          <div className="container-max mx-auto text-center z-10 px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel mb-8 border-white/20 inner-glow"
            >
              <div className="w-2 h-2 rounded-full bg-pr shadow-[0_0_8px_rgba(84,0,195,0.8)] animate-pulse" />
              <span className="font-label-caps text-[0.65rem] md:text-label-caps text-primary uppercase tracking-widest font-black">The Future of Digital Learning</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, type: 'spring' }}
              className="font-display text-[52px] md:text-[100px] lg:text-[120px] leading-[0.95] font-black tracking-tight mb-8 text-3d"
            >
              Elevate Your <span className="brand-text-gradient text-glow">Intelligence</span>.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 text-[1rem] md:text-[1.125rem] leading-relaxed font-medium"
            >
              A premium digital sanctuary where academic rigor meets cutting-edge technology. Experience learning that transcends the ordinary.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/signup"
                className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-pr to-sec text-white font-black text-[0.9rem] uppercase tracking-widest shadow-xl shadow-pr/20 hover:scale-105 transition-all duration-300"
              >
                Begin Journey
              </Link>
              <Link
                to="/simulations"
                className="w-full sm:w-auto px-10 py-5 rounded-full border-2 border-primary/20 bg-white/30 dark:bg-slate-800/30 backdrop-blur-md text-primary dark:text-pr-light font-black text-[0.9rem] uppercase tracking-widest hover:bg-white/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Curriculum <span className="text-[1.2rem]">→</span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Simulation Preview Section */}
        <section className="px-4 md:px-gutter py-24 bg-white/50 dark:bg-slate-900/50">
          <div className="container-max mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-2 mb-6">
                   <div className="w-10 h-1 bg-pr rounded-full" />
                   <span className="text-[0.65rem] font-black uppercase tracking-widest text-pr">Laboratory Engine v2</span>
                </div>
                <h2 className="font-h2 text-[2.5rem] md:text-[3rem] leading-tight mb-6 font-black tracking-tighter">Immersive Laboratory simulations</h2>
                <p className="text-[1.1rem] text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium">
                  Interact with complex concepts through our proprietary 3D engine. Visualize data patterns and academic theories in a space designed for total focus and zero distractions.
                </p>
                <div className="space-y-5">
                  {[
                    "Real-time data visualization",
                    "Collaborative sandbox environments",
                    "Adaptive difficulty scaling"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-6 h-6 rounded-full bg-pr/10 flex items-center justify-center text-pr">
                        <div className="w-2 h-2 rounded-full bg-pr" />
                      </div>
                      <span className="font-black text-[0.85rem] uppercase tracking-wide group-hover:text-pr transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative glass-panel p-4 md:p-6 rounded-[32px] shadow-2xl bg-white/80 dark:bg-slate-900/80">
                  <div className="rounded-[24px] overflow-hidden relative aspect-video bg-slate-950 shadow-inner group">
                    <img 
                      alt="Simulation Preview" 
                      className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" 
                      src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <div className="w-16 md:w-20 h-16 md:h-20 rounded-full glass-panel flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                         <div className="w-0 h-0 border-t-[10px] md:border-t-[12px] border-t-transparent border-l-[18px] md:border-l-[22px] border-l-white border-b-[10px] md:border-b-[12px] border-b-transparent ml-2" />
                      </div>
                    </div>
                  </div>
                  {/* Floating Card Elements */}
                  <div className="absolute -bottom-4 md:-bottom-10 -left-4 md:-left-10 glass-panel p-4 md:p-6 rounded-[24px] shadow-2xl w-40 md:w-56 bg-white dark:bg-slate-900 border-pr/10">
                    <p className="text-[0.6rem] font-black tracking-widest text-pr uppercase mb-2">Active Users</p>
                    <p className="text-[1.5rem] md:text-[2rem] font-black tabular-nums">12.4k <span className="text-[0.8rem] font-black text-emerald-500 ml-2">+12%</span></p>
                  </div>
                  <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full glass-panel flex items-center justify-center shadow-xl border-sec/20 text-sec">
                     <span className="text-[1.5rem]">⚡</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-4 md:px-gutter py-32 bg-surface-container-low/50">
          <div className="container-max mx-auto text-center mb-20">
            <h2 className="font-h2 text-[2.5rem] md:text-[3.5rem] font-black tracking-tight mb-4">The Scholar Path</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-medium">Three phases of intellectual mastery designed to accelerate your growth.</p>
          </div>
          <div className="container-max mx-auto grid md:grid-cols-3 gap-8">
            {[
              { title: 'Ingest', icon: '📖', desc: 'Absorb curated knowledge from the world\'s leading academic institutions through our ethereal interface.', color: 'from-pr/20' },
              { title: 'Synthesize', icon: '🔬', desc: 'Apply theories in high-stakes simulations that bridge the gap between theory and practical mastery.', color: 'from-sec/20' },
              { title: 'Transcend', icon: '✨', desc: 'Join an elite community of scholars and contribute original research to the global knowledge base.', color: 'from-pr/20' }
            ].map((step, i) => (
              <div key={i} className="glass-panel p-10 rounded-[40px] text-center hover:-translate-y-4 transition-all duration-500 bg-white dark:bg-slate-900 border-white/40 group overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="w-20 h-20 rounded-[28px] bg-surface-subtle dark:bg-slate-800 flex items-center justify-center mx-auto mb-8 text-4xl shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 relative z-10">{step.title}</h3>
                <p className="text-[0.95rem] text-slate-600 dark:text-slate-400 relative z-10 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Masterclasses Bento */}
        <section className="px-4 md:px-gutter py-32">
          <div className="container-max mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="font-h2 text-[2.5rem] md:text-[3.5rem] font-black tracking-tight leading-none mb-4">Featured Masterclasses</h2>
                <p className="text-slate-600 dark:text-slate-400 font-medium">Curated modules for the modern polymath.</p>
              </div>
              <button className="text-pr font-black uppercase tracking-widest text-[0.8rem] flex items-center gap-3 group">
                View All Catalog <span className="group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[800px]">
              <div className="md:col-span-2 md:row-span-2 relative rounded-[40px] overflow-hidden group shadow-2xl">
                <img 
                  alt="Quantum" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-10 flex flex-col justify-end">
                  <div className="px-4 py-1.5 rounded-full bg-pr text-white text-[0.65rem] font-black uppercase tracking-widest w-fit mb-6">Advanced Track</div>
                  <h3 className="text-white font-display text-[2.5rem] font-black leading-tight mb-4">Quantum Mechanics for Modern Systems</h3>
                  <p className="text-white/70 max-w-md font-medium text-[1.1rem]">Explore the foundation of 21st-century computation with Nobel-prize winning mentors.</p>
                </div>
              </div>
              
              <div className="md:col-span-2 relative rounded-[40px] overflow-hidden group shadow-xl">
                <img 
                  alt="AI Ethics" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4638ef808?q=80&w=2070&auto=format&fit=crop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent p-8 flex flex-col justify-end">
                  <h3 className="text-white font-display text-2xl font-black mb-2">The Ethics of Neural Networks</h3>
                  <p className="text-white/70 font-medium">Philosophical foundations of intelligence.</p>
                </div>
              </div>
              
              <div className="relative rounded-[40px] overflow-hidden group shadow-xl h-[300px] md:h-auto">
                <img 
                  alt="Cryptography" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=2091&auto=format&fit=crop"
                />
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all flex items-end p-6">
                  <h4 className="text-white font-black uppercase tracking-widest text-[0.8rem]">Cryptography III</h4>
                </div>
              </div>
              
              <div className="relative rounded-[40px] overflow-hidden group shadow-xl h-[300px] md:h-auto">
                <img 
                  alt="Data" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  src="https://images.unsplash.com/photo-1551288049-bbbda5366391?q=80&w=2070&auto=format&fit=crop"
                />
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all flex items-end p-6">
                  <h4 className="text-white font-black uppercase tracking-widest text-[0.8rem]">Data Architecture</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </motion.div>
  );
};

export default Landing;
