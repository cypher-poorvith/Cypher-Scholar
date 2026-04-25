import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, User, UserPlus, Mail, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { signUp } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'editor'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Validation States
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    const password = formData.password;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    setValidations(checks);
    
    const strength = Object.values(checks).filter(Boolean).length;
    setPasswordStrength(strength);
  }, [formData.password]);

  useEffect(() => {
    let timer: any;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return showToast("Passwords do not match", "danger");
    }
    
    if (passwordStrength < 4) {
      return showToast("Please meet all password requirements", "danger");
    }

    setLoading(true);
    try {
      const { error, data } = await signUp(formData.email, formData.password, formData.fullName);

      if (error) {
        showToast(error.message || "Failed to create account", "danger");
      } else {
        showToast("Verification email sent", "success");
        setIsVerifying(true);
        setResendCooldown(60);
      }
    } catch (error: any) {
      showToast("An unexpected error occurred", "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (resendCooldown > 0) return;
    
    setLoading(true);
    try {
      const { error } = await signUp(formData.email, formData.password, formData.fullName);
      if (error) {
        showToast(error.message, "danger");
      } else {
        showToast("Resent successfully", "success");
        setResendCooldown(60);
      }
    } catch (err) {
      showToast("Failed to resend", "danger");
    } finally {
      setLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="vibrant-card p-12 space-y-8 flex flex-col items-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-pulse">
              <Mail size={48} />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-display font-black text-slate-900 leading-none uppercase tracking-tight">Check Your Inbox</h2>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                We've sent a verification link to <span className="text-slate-900 font-bold">{formData.email}</span>. Click it to activate your account.
              </p>
            </div>

            <div className="w-full pt-6 space-y-4">
              <button 
                onClick={handleResendEmail}
                disabled={resendCooldown > 0 || loading}
                className="w-full h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all disabled:opacity-50"
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Email'}
              </button>
              
              <Link 
                to="/login"
                className="block text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors"
              >
                Go to Login Page
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative overflow-hidden">
      <div className="absolute top-8 left-8 z-10">
        <Link to="/login" className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Login</span>
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center p-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-[32px] text-primary mb-6 border border-primary/20 shadow-xl shadow-primary/10">
              <span className="text-4xl font-display font-black">CS</span>
            </div>
            <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight mb-2 uppercase">Join Cypher Scholar</h1>
            <p className="text-slate-500 text-sm font-medium">Create your high-performance learning account</p>
          </div>

          <div className="vibrant-card p-10 space-y-10">
            <form onSubmit={handleSignup} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="Enter your name"
                    className="vibrant-input px-6 h-14"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@example.com"
                    className="vibrant-input px-6 h-14"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Password *</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        placeholder="Create password"
                        className="vibrant-input px-6 h-14 pr-14"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Password Strength Meter */}
                  <div className="space-y-3">
                    <div className="flex gap-2 h-1.5 w-full">
                       {[1, 2, 3, 4].map((step) => (
                         <div 
                           key={step}
                           className={`h-full flex-1 rounded-full transition-all duration-500 ${
                             passwordStrength >= step 
                             ? (passwordStrength <= 2 ? 'bg-amber-400' : 'bg-emerald-500') 
                             : 'bg-slate-100'
                           }`}
                         />
                       ))}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                       <ValidationRule met={validations.length} label="8+ Chars" />
                       <ValidationRule met={validations.uppercase} label="Uppercase" />
                       <ValidationRule met={validations.number} label="Number" />
                       <ValidationRule met={validations.special} label="Special" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Confirm Password *</label>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Repeat password"
                    className="vibrant-input px-6 h-14"
                  />
                  <p className="text-[9px] text-slate-400 italic">Ensure both passwords match exactly</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 text-center block">Access Role</label>
                <div className="grid grid-cols-2 gap-6">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, role: 'student'})}
                    className={`h-32 rounded-[32px] border-2 flex flex-col items-center justify-center gap-3 transition-all relative overflow-hidden group ${
                      formData.role === 'student' ? 'bg-primary/5 border-primary text-primary shadow-lg shadow-primary/5' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-primary/20'
                    }`}
                  >
                    <div className={`p-3 rounded-2xl ${formData.role === 'student' ? 'bg-primary text-white' : 'bg-white text-slate-400 shadow-sm border border-slate-100'} transition-all`}>
                      <User size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Student Portal</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, role: 'editor'})}
                    className={`h-32 rounded-[32px] border-2 flex flex-col items-center justify-center gap-3 transition-all relative overflow-hidden group ${
                      formData.role === 'editor' ? 'bg-secondary/5 border-secondary text-secondary shadow-lg shadow-secondary/5' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-secondary/20'
                    }`}
                  >
                    <div className={`p-3 rounded-2xl ${formData.role === 'editor' ? 'bg-secondary text-white' : 'bg-white text-slate-400 shadow-sm border border-slate-100'} transition-all`}>
                      <UserPlus size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Educator Hub</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                 <input type="checkbox" id="terms" required className="w-5 h-5 rounded-md border-slate-200 bg-white accent-primary" />
                 <label htmlFor="terms" className="text-xs text-slate-500 font-medium cursor-pointer">
                   Acceptance: <Link to="/terms" className="text-primary font-bold hover:underline">Terms of Service</Link> & <Link to="/privacy" className="text-primary font-bold hover:underline">Privacy</Link>
                 </label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary h-16 shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <RefreshCw size={24} className="animate-spin" />
                ) : (
                  <>CREATE ACCOUNT <ShieldCheck size={20} /></>
                )}
              </button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center"><span className="bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digital Auth</span></div>
            </div>

            <p className="text-center text-xs font-medium text-slate-500">
              Returning user? <Link to="/login" className="text-primary font-black hover:underline uppercase tracking-widest ml-1">Sign In Instead</Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

const ValidationRule: React.FC<{ met: boolean; label: string }> = ({ met, label }) => (
  <div className={`flex items-center gap-1.5 ${met ? 'text-emerald-600' : 'text-slate-400'} transition-colors`}>
    {met ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
    <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
  </div>
);

export default Signup;
