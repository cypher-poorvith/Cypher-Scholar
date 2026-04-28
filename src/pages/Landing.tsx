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
      className="relative overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-ig-pink/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-ig-purple/20 blur-[120px] pointer-events-none" />
      
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-58px)] flex flex-col items-center justify-center text-center p-6 sm:p-12 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[820px] mx-auto z-10"
        >
          <div className="badge badge-primary mb-6 animate-pulse">JEE Main & Advanced 2026</div>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.85] tracking-tighter mb-6 uppercase">
            Master Every<br />Subject, Ace<br /><span className="gradient-text">Every Exam</span>
          </h1>
          <p className="text-tx-muted text-[1.1rem] max-w-[560px] mx-auto mb-10 leading-[1.6] font-bold uppercase tracking-wider opacity-80">
            Chapter-wise question banks, real exam questions, live simulations & analytics.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Link to="/dashboard" className="btn-primary h-[52px] px-10 text-[0.9rem]">Go to Dashboard →</Link>
            <Link to="/practice" className="btn-secondary h-[52px] px-8 text-[0.9rem]">Browse Questions</Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            <div className="text-center group">
              <div className="font-display text-[2.2rem] font-black pointer-events-none group-hover:scale-110 transition-transform text-pr">3200+</div>
              <div className="label-sm opacity-60">Questions</div>
            </div>
            <div className="w-[1px] h-14 bg-border-subtle hidden sm:block" />
            <div className="text-center group">
              <div className="font-display text-[2.2rem] font-black pointer-events-none group-hover:scale-110 transition-transform text-sec">82</div>
              <div className="label-sm opacity-60">Chapters</div>
            </div>
            <div className="w-[1px] h-14 bg-border-subtle hidden sm:block" />
            <div className="text-center group">
              <div className="font-display text-[2.2rem] font-black pointer-events-none group-hover:scale-110 transition-transform text-ig-orange">3</div>
              <div className="label-sm opacity-60">Subjects</div>
            </div>
            <div className="w-[1px] h-14 bg-border-subtle hidden sm:block" />
            <div className="text-center group">
              <div className="font-display text-[2.2rem] font-black pointer-events-none group-hover:scale-110 transition-transform text-pr">50k+</div>
              <div className="label-sm opacity-60">Students</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Simulation Section */}
      <section className="py-20 px-6 sm:px-12 bg-surface-card border-t border-border-subtle relative">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <div className="badge badge-primary mb-3">Interactive Lab</div>
            <h2 className="text-3xl sm:text-[2.5rem] font-black tracking-tighter">Visualize <span className="gradient-text">Physics</span></h2>
            <p className="text-tx-muted mt-2 text-[0.9rem] font-bold uppercase tracking-widest opacity-70">Projectile Motion Lab</p>
          </div>
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center max-w-[1000px] mx-auto">
            <div className="animate-fade-up">
              <Simulation />
            </div>
            <div className="flex flex-col gap-6">
              <div className="glass-panel nh border-l-4 border-l-pr p-8">
                <p className="font-display text-[1rem] font-black mb-3 uppercase tracking-tight">💡 Scholarly Insight</p>
                <p className="text-tx-muted text-[0.85rem] leading-[1.7] font-medium">
                  Max range is achieved at <strong className="text-pr">45°</strong>. 
                  Complementary angles like 30° and 60° yield identical ranges. 
                  <span className="block mt-2 font-bold text-tx-dim">R = u²sin(2θ)/g</span>
                </p>
              </div>
              <div className="glass-panel nh border-l-4 border-l-sec p-8">
                <p className="font-display text-[1rem] font-black mb-3 uppercase tracking-tight">📐 Essential Principles</p>
                <div className="space-y-2 text-tx-muted font-mono text-[0.8rem] font-bold">
                  <p className="flex justify-between"><span>Range:</span> <span className="text-sec">u²sin2θ/g</span></p>
                  <p className="flex justify-between"><span>Max Height:</span> <span className="text-sec">u²sin²θ/2g</span></p>
                  <p className="flex justify-between"><span>Time of Flight:</span> <span className="text-sec">2u sinθ/g</span></p>
                </div>
              </div>
              <Link to="/simulations" className="btn-primary w-full h-[48px] justify-center">Explore All Sims →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Path Section */}
      <section className="py-24 px-6 sm:px-12 bg-surface-bg relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-[2.5rem] font-black tracking-tight uppercase">Your Learning <span className="gradient-text">Path</span></h2>
            <div className="h-1.5 w-24 bg-pr/20 mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎓', step: '1. Select Class', desc: 'Class 9–12 or Dropper track, each with tailored exam options.', bg: 'bg-pr/10', color: 'text-pr' },
              { icon: '📋', step: '2. Pick Exam', desc: 'CBSE, JEE Main, JEE Advanced — choose your target.', bg: 'bg-sec/10', color: 'text-sec' },
              { icon: '📚', step: '3. Choose Subject', desc: 'Physics, Chemistry, or Maths with full chapter lists.', bg: 'bg-emerald-500/10', color: 'text-emerald-500' },
              { icon: '🏆', step: '4. Solve & Score', desc: 'MCQs with detailed solutions and real-time scoring.', bg: 'bg-acc/10', color: 'text-acc' }
            ].map((path, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="glass-panel text-center p-8 flex flex-col items-center"
              >
                <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center text-3xl mb-6 shadow-lg shadow-black/5 ${path.bg}`}>{path.icon}</div>
                <h3 className={`font-display text-[1.1rem] font-black mb-3 ${path.color}`}>{path.step}</h3>
                <p className="text-tx-muted text-[0.8rem] leading-[1.6] font-medium">{path.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer border-t border-border-subtle py-12 text-center bg-surface-card">
         <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center gap-4">
            <p className="label-sm opacity-60">Cypher Scholar AI © 2026 — Helping JEE Aspirants Across India</p>
            <div className="flex gap-6 mt-2">
              <Link to="/about" className="text-[0.7rem] font-black uppercase tracking-widest text-tx-dim hover:text-pr">About</Link>
              <Link to="/pricing" className="text-[0.7rem] font-black uppercase tracking-widest text-tx-dim hover:text-pr">Pricing</Link>
              <Link to="/feedback" className="text-[0.7rem] font-black uppercase tracking-widest text-tx-dim hover:text-pr">Feedback</Link>
            </div>
         </div>
      </footer>
    </motion.div>
  );
};

export default Landing;
