import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, User, UserPlus } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'user' | 'editor'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return showToast("Passwords do not match", "danger");
    }
    if (formData.password.length < 8) {
      return showToast("Password must be at least 8 characters", "danger");
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          displayName: formData.fullName,
          role: formData.role
        })
      });

      const data = await response.json();

      if (response.ok) {
        showToast("Account created successfully", "success");
        navigate('/onboarding');
        window.location.reload();
      } else {
        showToast(data.error || "Failed to create account", "danger");
      }
    } catch (error: any) {
      showToast("Error connecting to server", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070512] relative overflow-hidden">
      <div className="absolute top-8 left-8 z-10">
        <Link to="/login" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Back to Login</span>
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center p-6 py-20 bg-radial-gradient">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600/10 rounded-[32px] text-indigo-500 mb-6 border border-indigo-500/20 shadow-2xl shadow-indigo-500/10">
              <span className="text-4xl">🎓</span>
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Cypher Scholar</h1>
            <p className="text-slate-400 text-sm font-medium">Create your account</p>
          </div>

          <div className="glass-panel p-10 border-white/5 space-y-8">
            <form onSubmit={handleSignup} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@example.com"
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Phone Number (Optional)</label>
                <div className="flex gap-2">
                  <div className="w-20 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 font-bold">+91</div>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="1234567890"
                    className="flex-1 h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password *</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="Min 8 chars"
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
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirm Password *</label>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Repeat password"
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">I am a: *</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, role: 'user'})}
                    className={`h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                      formData.role === 'user' ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
                    }`}
                  >
                    <User size={24} />
                    <span className="text-xs font-black uppercase tracking-widest">Student</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, role: 'editor'})}
                    className={`h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                      formData.role === 'editor' ? 'bg-indigo-600/10 border-indigo-500 text-indigo-400' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
                    }`}
                  >
                    <UserPlus size={24} />
                    <span className="text-xs font-black uppercase tracking-widest">Educator</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                 <input type="checkbox" id="terms" required className="w-5 h-5 rounded-md border-white/10 bg-white/5 accent-indigo-500" />
                 <label htmlFor="terms" className="text-xs text-slate-400 font-medium cursor-pointer">
                   I agree to <Link to="/terms" className="text-indigo-400 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</Link>
                 </label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-16 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account →'}
              </button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center"><span className="bg-[#070512] px-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">OR</span></div>
            </div>

            <button 
              disabled
              className="w-full h-14 bg-white/5 border border-white/10 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 relative overflow-hidden group cursor-not-allowed"
            >
              Continue with Cypher ID
              <span className="absolute top-0 right-0 py-0.5 px-2 bg-amber-500/20 text-amber-500 text-[6px] font-bold uppercase tracking-[0.2em] rounded-bl-lg">Coming Soon</span>
            </button>
          </div>

          <p className="text-center mt-10 text-xs font-medium text-slate-500">
            Already have an account? <Link to="/login" className="text-indigo-400 font-black hover:underline uppercase tracking-widest ml-1">Sign In</Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Signup;
