import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, ShieldAlert, Key, Mail, RefreshCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { signInWithGoogle, signIn, resetPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        let message = "Invalid credentials";
        if (error.message.includes('Invalid login credentials')) {
          message = "No account found or incorrect password";
        } else if (error.message.includes('Email not confirmed')) {
          message = "Please verify your email address first";
        }
        showToast(message, "danger");
      } else {
        showToast("Welcome back!", "success");
        navigate('/dashboard');
      }
    } catch (error: any) {
      showToast("Error connecting to auth service", "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await resetPassword(email);
      if (error) {
        showToast(error.message, "danger");
      } else {
        setForgotSent(true);
        showToast("Reset link sent if account exists", "success");
      }
    } catch (err) {
      showToast("Failed to send reset link", "danger");
    } finally {
      setLoading(false);
    }
  };

  if (showForgot) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex flex-col bg-surface-bg relative overflow-hidden"
      >
        <div className="absolute top-8 left-8 z-10">
          <button onClick={() => setShowForgot(false)} className="flex items-center gap-2 text-tx-dim hover:text-pr transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Back to Login</span>
          </button>
        </div>

        <main className="flex-1 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-pr/10 rounded-[32px] text-pr mb-6 border border-pr/20 shadow-xl shadow-pr/10">
                <Key size={32} />
              </div>
              <h1 className="text-3xl font-display font-black text-tx-main tracking-tight mb-2 uppercase italic">Recover Access</h1>
              <p className="text-tx-muted text-xs font-bold uppercase tracking-widest opacity-80">We'll send you a secure link</p>
            </div>

            <div className="glass-panel nh p-10 space-y-8">
              {forgotSent ? (
                <div className="space-y-6 text-center">
                   <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
                      <p className="text-sm font-black text-emerald-600 uppercase tracking-widest">Verification Sent</p>
                      <p className="text-xs text-emerald-500/80 mt-2 font-medium">Please check <span className="font-bold">{email}</span> for the recovery link.</p>
                   </div>
                   <button 
                    onClick={() => setForgotSent(false)}
                    className="w-full btn-secondary h-12"
                   >
                     TRY ANOTHER EMAIL
                   </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label className="label-sm ml-1">Account Email</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-tx-dim" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="input-field pl-13 h-14"
                      />
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="w-full btn-primary h-14 shadow-xl shadow-pr/20">
                    {loading ? <RefreshCw size={20} className="animate-spin mx-auto" /> : 'SEND RECOVERY LINK →'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </main>
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
        <Link to="/" className="flex items-center gap-2 text-tx-dim hover:text-pr transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Home</span>
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-pr/10 rounded-[32px] text-pr mb-6 border border-pr/20 shadow-xl shadow-pr/10">
              <span className="text-4xl font-display font-black italic">CS</span>
            </div>
            <h1 className="text-3xl font-display font-black text-tx-main tracking-tight mb-2 uppercase italic">Secure Access</h1>
            <p className="text-tx-muted text-xs font-bold uppercase tracking-widest opacity-80">Continue to your learning portal</p>
          </div>

          <div className="glass-panel nh p-10 space-y-8">
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
              <span className="text-[0.75rem] font-black uppercase tracking-widest text-tx-main">Continue with Google</span>
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-subtle"></div></div>
              <div className="relative flex justify-center"><span className="bg-surface-card px-4 text-[10px] font-black text-tx-dim uppercase tracking-widest">or secure gate</span></div>
            </div>

            <form onSubmit={handleEmailSignIn} className="space-y-6">
              <div className="space-y-3">
                <label className="label-sm ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="input-field h-14"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center ml-1">
                  <label className="label-sm">Password</label>
                  <button 
                    type="button" 
                    onClick={() => setShowForgot(true)}
                    className="text-[10px] font-black text-pr uppercase tracking-widest hover:underline"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
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

              <div className="flex items-center gap-2.5 px-2">
                 <input type="checkbox" id="remember" className="w-5 h-5 rounded-md border-border-subtle bg-white accent-pr" />
                 <label htmlFor="remember" className="text-[0.65rem] text-tx-muted font-bold uppercase tracking-widest cursor-pointer opacity-70">Stay signed in</label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary h-14 shadow-xl shadow-pr/20"
              >
                {loading ? <RefreshCw className="animate-spin mx-auto" /> : 'SIGN IN →'}
              </button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-subtle"></div></div>
              <div className="relative flex justify-center"><span className="bg-surface-card px-4 text-[10px] font-black text-tx-dim uppercase tracking-widest">Digital Hub</span></div>
            </div>

            <p className="text-center text-[0.7rem] font-bold text-tx-muted uppercase tracking-widest">
              New to Cypher? <Link to="/signup" className="text-pr font-black hover:underline ml-1">Join Now</Link>
            </p>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Login;
