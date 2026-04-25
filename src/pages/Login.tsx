import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, ShieldAlert, Key, Mail, RefreshCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { signIn, resetPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        let message = "Invalid credentials";
        if (error.message.includes('Invalid login credentials')) {
          // Since we can't easily distinguish with basic Supabase Auth for security reasons,
          // we use the official message but we can try to be more helpful.
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
      <div className="min-h-screen flex flex-col bg-slate-50 relative overflow-hidden">
        <div className="absolute top-8 left-8 z-10">
          <button onClick={() => setShowForgot(false)} className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Login</span>
          </button>
        </div>

        <main className="flex-1 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-[32px] text-primary mb-6 border border-primary/20">
                <Key size={32} />
              </div>
              <h1 className="text-3xl font-display font-black text-slate-900 tracking-tight mb-2 uppercase">Recover Access</h1>
              <p className="text-slate-500 text-sm font-medium">We'll send you a secure link to reset your credentials</p>
            </div>

            <div className="vibrant-card p-10 space-y-8">
              {forgotSent ? (
                <div className="space-y-6 text-center">
                   <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <p className="text-sm font-bold text-emerald-600">Verification Link Sent</p>
                      <p className="text-xs text-emerald-500 mt-2">Please check <span className="font-bold">{email}</span> for the recovery link. It may take a few minutes to arrive.</p>
                   </div>
                   <button 
                    onClick={() => setForgotSent(false)}
                    className="w-full btn-secondary h-14"
                   >
                     TRY ANOTHER EMAIL
                   </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Account Email</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="vibrant-input pl-14 h-16"
                      />
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="w-full btn-primary h-16 shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                    {loading ? <RefreshCw size={20} className="animate-spin" /> : <>SEND RECOVERY LINK <Key size={18} /></>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative overflow-hidden">
      <div className="absolute top-8 left-8 z-10">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Home</span>
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-[32px] text-primary mb-6 border border-primary/20 shadow-xl shadow-primary/10">
              <span className="text-4xl font-display font-black">CS</span>
            </div>
            <h1 className="text-3xl font-display font-black text-slate-900 tracking-tight mb-2 uppercase">Secure Access</h1>
            <p className="text-slate-500 text-sm font-medium">Continue to your learning portal</p>
          </div>

          <div className="vibrant-card p-10 space-y-8">
            <form onSubmit={handleEmailSignIn} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="vibrant-input px-6 h-14"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                  <button 
                    type="button" 
                    onClick={() => setShowForgot(true)}
                    className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
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

              <div className="flex items-center gap-2 px-2">
                 <input type="checkbox" id="remember" className="w-5 h-5 rounded-md border-slate-200 bg-white accent-primary" />
                 <label htmlFor="remember" className="text-xs text-slate-500 font-medium cursor-pointer">Stay signed in on this device</label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary h-16 shadow-xl shadow-primary/20"
              >
                {loading ? <RefreshCw className="animate-spin mx-auto" /> : 'SIGN IN →'}
              </button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center"><span className="bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secured Node</span></div>
            </div>

            <p className="text-center text-xs font-medium text-slate-500">
              New to Cypher? <Link to="/signup" className="text-primary font-black hover:underline uppercase tracking-widest ml-1">Join Now</Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;
