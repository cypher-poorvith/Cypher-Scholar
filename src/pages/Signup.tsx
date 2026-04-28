import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, User, UserPlus, Mail, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { signInWithGoogle, signUp } = useAuth();
  
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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
  };

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
      const { error } = await signUp(formData.email, formData.password, formData.fullName);

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
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center bg-surface-bg p-6"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="glass-panel nh p-12 space-y-8 flex flex-col items-center">
            <div className="w-24 h-24 bg-pr/10 rounded-full flex items-center justify-center text-pr animate-pulse shadow-xl shadow-pr/10">
              <Mail size={48} />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-display font-black text-tx-main leading-none uppercase tracking-tight italic">Check Your Inbox</h2>
              <p className="text-tx-muted font-bold text-[0.7rem] uppercase tracking-widest leading-relaxed">
                We've sent a verification link to <span className="text-pr">{formData.email}</span>. Click it to activate your account.
              </p>
            </div>

            <div className="w-full pt-6 space-y-4">
              <button 
                onClick={handleResendEmail}
                disabled={resendCooldown > 0 || loading}
                className="w-full btn-secondary h-14"
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Email'}
              </button>
              
              <Link 
                to="/login"
                className="block label-sm hover:text-pr transition-colors"
              >
                Go to Login Page
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-surface-bg relative overflow-hidden"
    >
      <div className="absolute top-8 left-8 z-10">
        <Link to="/login" className="flex items-center gap-2 text-tx-dim hover:text-pr transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Login</span>
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center p-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-pr/10 rounded-[32px] text-pr mb-6 border border-pr/20 shadow-xl shadow-pr/10">
              <span className="text-4xl font-display font-black italic">CS</span>
            </div>
            <h1 className="text-4xl font-display font-black text-tx-main tracking-tight mb-2 uppercase italic">Join Cypher Scholar</h1>
            <p className="text-tx-muted text-xs font-bold uppercase tracking-widest opacity-80">Create your high-performance account</p>
          </div>

          <div className="glass-panel nh p-10 space-y-10">
            <button 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 h-16 bg-white dark:bg-slate-800 border-2 border-border-subtle rounded-2xl group hover:border-pr/50 hover:bg-pr/5 transition-all shadow-md active:scale-[0.98]"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-[0.75rem] font-black uppercase tracking-widest text-tx-main">Register with Google</span>
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-subtle"></div></div>
              <div className="relative flex justify-center"><span className="bg-surface-card px-4 text-[10px] font-black text-tx-dim uppercase tracking-widest">or high-performance registration</span></div>
            </div>

            <form onSubmit={handleSignup} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="label-sm ml-1">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="Enter your name"
                    className="input-field h-14"
                  />
                </div>
                <div className="space-y-3">
                  <label className="label-sm ml-1">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@example.com"
                    className="input-field h-14"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div className="space-y-3">
                    <label className="label-sm ml-1">Password *</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        placeholder="Create password"
                        className="input-field h-14 pr-14"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-tx-dim hover:text-pr transition-colors"
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
                             : 'bg-border-subtle'
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

                <div className="space-y-3">
                  <label className="label-sm ml-1">Confirm Password *</label>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Repeat password"
                    className="input-field h-14"
                  />
                  <p className="text-[9px] text-tx-dim font-bold uppercase tracking-wider italic">Ensure both match exactly</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="label-sm text-center block">Access Role</label>
                <div className="grid grid-cols-2 gap-6">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, role: 'student'})}
                    className={`h-32 rounded-[32px] border-2 flex flex-col items-center justify-center gap-3 transition-all relative overflow-hidden group ${
                      formData.role === 'student' ? 'bg-pr/5 border-pr text-pr shadow-lg shadow-pr/5' : 'bg-surface-subtle border-border-subtle text-tx-dim hover:border-pr/20'
                    }`}
                  >
                    <div className={`p-3 rounded-2xl ${formData.role === 'student' ? 'bg-pr text-white shadow-xl' : 'bg-surface-card text-tx-dim border border-border-subtle'} transition-all`}>
                      <User size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Student</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, role: 'editor'})}
                    className={`h-32 rounded-[32px] border-2 flex flex-col items-center justify-center gap-3 transition-all relative overflow-hidden group ${
                      formData.role === 'editor' ? 'bg-sec/5 border-sec text-sec shadow-lg shadow-sec/5' : 'bg-surface-subtle border-border-subtle text-tx-dim hover:border-sec/20'
                    }`}
                  >
                    <div className={`p-3 rounded-2xl ${formData.role === 'editor' ? 'bg-sec text-white shadow-xl' : 'bg-surface-card text-tx-dim border border-border-subtle'} transition-all`}>
                      <UserPlus size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Educator</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-surface-subtle rounded-2xl border border-border-subtle">
                 <input type="checkbox" id="terms" required className="w-5 h-5 rounded-md border-border-subtle bg-white accent-pr" />
                 <label htmlFor="terms" className="text-[0.65rem] text-tx-muted font-bold uppercase tracking-widest cursor-pointer opacity-80">
                   I Accept <Link to="/terms" className="text-pr font-black hover:underline">Terms</Link> & <Link to="/privacy" className="text-pr font-black hover:underline">Privacy</Link>
                 </label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary h-14 shadow-xl shadow-pr/20"
              >
                {loading ? (
                  <RefreshCw size={24} className="animate-spin mx-auto" />
                ) : (
                  'CREATE ACCOUNT →'
                )}
              </button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-subtle"></div></div>
              <div className="relative flex justify-center"><span className="bg-surface-card px-4 text-[10px] font-black text-tx-dim uppercase tracking-widest">Digital Auth</span></div>
            </div>

            <p className="text-center text-[0.7rem] font-bold text-tx-muted uppercase tracking-widest">
              Returning user? <Link to="/login" className="text-pr font-black hover:underline ml-1">Sign In Instead</Link>
            </p>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
};

const ValidationRule: React.FC<{ met: boolean; label: string }> = ({ met, label }) => (
  <div className={`flex items-center gap-1.5 ${met ? 'text-emerald-600' : 'text-slate-400'} transition-colors`}>
    {met ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
    <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
  </div>
);

export default Signup;
