import React, { useState } from 'react';
import { 
  ChevronRight, ChevronLeft, GraduationCap, Target, School, 
  MapPin, User, Check, Sparkles, Building, Briefcase 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserStatus } from '../types';

const Onboarding: React.FC = () => {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    displayName: profile?.displayName || '',
    phone: '',
    grade: '',
    stream: '',
    year: '',
    branch: '',
    targets: [] as string[],
    institution: '',
    city: ''
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleTargetToggle = (target: string) => {
    setFormData(prev => {
      if (prev.targets.includes(target)) {
        return { ...prev, targets: prev.targets.filter(t => t !== target) };
      }
      return { ...prev, targets: [...prev.targets, target] };
    });
  };

  const handleComplete = async () => {
    if (!user || !profile) return;
    setLoading(true);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: formData.displayName,
          phone: formData.phone,
          status: UserStatus.ACTIVE,
          onboardingComplete: true,
          academicDetails: {
            grade: formData.grade,
            stream: formData.stream || undefined,
            year: formData.year || undefined,
            branch: formData.branch || undefined,
            targets: formData.targets,
            institution: formData.institution || undefined,
            city: formData.city || undefined
          }
        })
      });

      if (!response.ok) throw new Error('Failed to update profile');
      
      // Force profile refresh by navigating
      window.location.href = '/dashboard';
    } catch (e) {
      console.error("Error updating profile:", e);
      alert("Failed to complete onboarding. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- RENDERING SCREENS ---

  const renderWelcome = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-8"
    >
      <div className="w-24 h-24 bg-primary/10 rounded-[40px] flex items-center justify-center mx-auto text-primary">
        <Sparkles size={48} />
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">Welcome to Cypher Scholar! 🎓</h1>
        <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md mx-auto">
          Let's personalize your learning experience in just 2 minutes. We'll set up your dashboard based on your goals.
        </p>
      </div>
      <button 
        onClick={nextStep}
        className="w-full btn-primary h-16 group"
      >
        Let's Get Started <ChevronRight size={18} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );

  const renderBasicInfo = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Tell us about yourself</h2>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Step 2 of 5</p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name *</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="vibrant-input pl-12 h-14"
              placeholder="Your Name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number (Optional)</label>
          <div className="relative">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">+91</span>
             <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="vibrant-input pl-16 h-14"
              placeholder="88888 88888"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={prevStep} className="flex-1 btn-secondary h-16">Back</button>
        <button 
          onClick={nextStep} 
          disabled={!formData.displayName}
          className="flex-3 btn-primary h-16 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );

  const renderAcademicDetails = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Your Academic Information</h2>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Step 3 of 5</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Current Grade/Level *</label>
          <select 
            value={formData.grade}
            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            className="vibrant-input h-14"
          >
            <option value="">Select Grade</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
            <option value="Engineering">Engineering (B.Tech)</option>
            <option value="Competitive">Competitive Exam Prep</option>
          </select>
        </div>

        {(formData.grade === '11' || formData.grade === '12') && (
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Stream *</label>
            <div className="grid grid-cols-2 gap-3">
              {['PCM', 'PCB', 'PCMB', 'Commerce', 'Arts'].map(s => (
                <button 
                  key={s}
                  onClick={() => setFormData({ ...formData, stream: s })}
                  className={`h-12 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                    formData.stream === s ? 'bg-primary border-primary text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-primary/20'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {formData.grade === 'Engineering' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Year *</label>
              <select 
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="vibrant-input h-12"
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Branch *</label>
              <input 
                type="text" 
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="vibrant-input h-12"
                placeholder="e.g. CSE"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={prevStep} className="flex-1 btn-secondary h-16">Back</button>
        <button 
          onClick={nextStep} 
          disabled={!formData.grade}
          className="flex-3 btn-primary h-16 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );

  const renderTargetExams = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">What's your target exam? *</h2>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Step 4 of 5</p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {[
          { id: 'JEE Main', cat: 'Engineering' },
          { id: 'JEE Advanced', cat: 'Engineering' },
          { id: 'BITSAT', cat: 'Engineering' },
          { id: 'NEET UG', cat: 'Medical' },
          { id: 'AIIMS', cat: 'Medical' },
          { id: 'UPSC', cat: 'Govt' },
          { id: 'SSC', cat: 'Govt' },
          { id: 'IBPS', cat: 'Banking' },
          { id: 'Olympiad', cat: 'Other' },
          { id: 'Board Exams', cat: 'School' },
          { id: 'None', cat: 'Misc' }
        ].map(ex => (
          <button 
            key={ex.id}
            onClick={() => handleTargetToggle(ex.id)}
            className={`p-4 rounded-xl border text-left flex items-start gap-4 transition-all ${
              formData.targets.includes(ex.id) 
              ? 'bg-primary border-primary text-white shadow-xl translate-y-[-2px]' 
              : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-primary/20'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${formData.targets.includes(ex.id) ? 'bg-white/20' : 'bg-slate-200'}`}>
              {formData.targets.includes(ex.id) ? <Check size={16} /> : <Target size={16} />}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-tight leading-none mb-1">{ex.id}</p>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{ex.cat}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={prevStep} className="flex-1 btn-secondary h-16">Back</button>
        <button 
          onClick={nextStep} 
          disabled={formData.targets.length === 0}
          className="flex-3 btn-primary h-16 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );

  const renderInstitution = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Your Institution (Optional)</h2>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Step 5 of 5</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">School/College/Coaching</label>
          <div className="relative">
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="vibrant-input pl-12 h-14"
              placeholder="Institution Name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">City</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="vibrant-input pl-12 h-14"
              placeholder="e.g. Mumbai"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={prevStep} className="flex-1 btn-secondary h-16">Back</button>
        <button 
          onClick={handleComplete} 
          disabled={loading}
          className="flex-3 btn-primary h-16 disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {loading ? 'Finalizing...' : 'Complete Setup'} <Check size={18} />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -ml-64 -mb-64" />
      </div>

      <div className="w-full max-w-xl relative">
        <div className="vibrant-card p-12 lg:p-16">
          <AnimatePresence mode="wait">
            {step === 1 && renderWelcome()}
            {step === 2 && renderBasicInfo()}
            {step === 3 && renderAcademicDetails()}
            {step === 4 && renderTargetExams()}
            {step === 5 && renderInstitution()}
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 flex items-center justify-center gap-3">
          {[1, 2, 3, 4, 5].map(s => (
            <div 
              key={s} 
              className={`h-2 rounded-full transition-all duration-500 ${step >= s ? 'w-10 bg-primary' : 'w-2 bg-slate-200'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
