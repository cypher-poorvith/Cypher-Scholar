import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showToast("Welcome back!", "success");
        navigate('/dashboard');
        // Trigger a reload or context update if needed
        window.location.reload(); 
      } else {
        showToast(data.error || "Invalid credentials", "danger");
      }
    } catch (error: any) {
      showToast("Error connecting to server", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070512] relative overflow-hidden">
      {/* Back button */}
      <div className="absolute top-8 left-8 z-10">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Back to Home</span>
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center p-6 bg-radial-gradient">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600/10 rounded-[32px] text-indigo-500 mb-6 border border-indigo-500/20 shadow-2xl shadow-indigo-500/10">
              <span className="text-4xl">🎓</span>
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Cypher Scholar</h1>
            <p className="text-slate-400 text-sm font-medium">Sign in to continue</p>
          </div>

          <div className="glass-panel p-8 border-white/5 space-y-6">
            <form onSubmit={handleEmailSignIn} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all pr-14"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                 <input type="checkbox" id="remember" className="w-4 h-4 rounded-md border-white/10 bg-white/5 accent-indigo-500" />
                 <label htmlFor="remember" className="text-xs text-slate-400 font-medium cursor-pointer">Remember me</label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In →'}
              </button>
            </form>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center"><span className="bg-[#070512] px-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">OR</span></div>
            </div>

            <div className="space-y-3">
              <button 
                disabled
                className="w-full h-14 bg-white/5 border border-white/10 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 relative overflow-hidden group cursor-not-allowed"
              >
                Continue with Cypher ID
                <span className="absolute top-0 right-0 py-0.5 px-2 bg-amber-500/20 text-amber-500 text-[6px] font-bold uppercase tracking-[0.2em] rounded-bl-lg">Coming Soon</span>
              </button>
            </div>
          </div>

          <p className="text-center mt-10 text-xs font-medium text-slate-500">
            Don't have an account? <Link to="/signup" className="text-indigo-400 font-black hover:underline uppercase tracking-widest ml-1">Sign Up</Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;
