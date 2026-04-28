import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Users } from 'lucide-react';

const EXAMS = [
  { 
    id: 'jeemain', 
    name: 'JEE Main', 
    fullName: 'Joint Entrance Examination Main',
    description: 'NTA-conducted national level exam for NITs, IIITs & CFTIs. 90 questions across PCM.', 
    tag: 'Popular', 
    color: '#e1306c', 
    bg: 'bg-pr/5',
    qs: '1200+',
    mocks: 10,
    students: '45k+'
  },
  { 
    id: 'jeeadv', 
    name: 'JEE Advanced', 
    fullName: 'Indian Institute of Technology Entrance',
    description: 'IIT-conducted exam. 2 papers, 3 hours each. Highest difficulty in India\'s engineering exams.', 
    tag: 'IIT Entry', 
    color: '#833ab4', 
    bg: 'bg-indigo-500/5',
    qs: '800+',
    mocks: 6,
    students: '12k+'
  },
  { 
    id: 'bitsat', 
    name: 'BITSAT', 
    fullName: 'BITS Pilani Admission Test',
    description: 'Online exam for BITS Pilani, Goa, Hyderabad. 130 questions with English & Logical Reasoning.', 
    tag: 'Private', 
    color: '#f77737', 
    bg: 'bg-orange-500/5',
    qs: '600+',
    mocks: 5,
    students: '8k+'
  },
  { 
    id: 'viteee', 
    name: 'VITEEE', 
    fullName: 'VIT University Entrance Exam',
    description: 'VIT University online entrance. PCM + English + Aptitude. 125 questions in 2.5 hours.', 
    tag: 'Popular', 
    color: '#06b6d4', 
    bg: 'bg-cyan-500/5',
    qs: '500+',
    mocks: 4,
    students: '15k+'
  },
  { 
    id: 'mhtcet', 
    name: 'MHT CET', 
    fullName: 'Maharashtra Common Entrance Test',
    description: 'Maharashtra state CET for engineering & pharmacy. 200 questions in 3 hours. PCM-based.', 
    tag: 'State', 
    color: '#f97316', 
    bg: 'bg-orange-600/5',
    qs: '700+',
    mocks: 5,
    students: '10k+'
  },
  { 
    id: 'comedk', 
    name: 'COMEDK', 
    fullName: 'Consortium of Medical & Engg. Colleges',
    description: 'Consortium of colleges in Karnataka. 180 PCM questions. Direct entry to top private colleges.', 
    tag: 'Private', 
    color: '#8b5cf6', 
    bg: 'bg-purple-500/5',
    qs: '500+',
    mocks: 4,
    students: '6k+'
  },
  { 
    id: 'kcet', 
    name: 'KCET', 
    fullName: 'Karnataka Common Entrance Test',
    description: 'Karnataka CET for state engineering colleges. PCM + Biology. 60 questions per subject.', 
    tag: 'State', 
    color: '#e1306c', 
    bg: 'bg-pink-600/5',
    qs: '600+',
    mocks: 4,
    students: '20k+'
  },
  { 
    id: 'neet', 
    name: 'NEET', 
    fullName: 'National Eligibility cum Entrance Test',
    description: 'National medical entrance for MBBS/BDS. 720 marks, Physics + Chemistry + Biology.', 
    tag: 'Medical', 
    color: '#10b981', 
    bg: 'bg-emerald-500/5',
    qs: '1000+',
    mocks: 8,
    students: '25k+'
  },
  { 
    id: 'aiims', 
    name: 'AIIMS', 
    fullName: 'All India Institute of Medical Sciences',
    description: 'Premier medical institutes entry under NEET umbrella with specific pattern focus.', 
    tag: 'Medical', 
    color: '#3b82f6', 
    bg: 'bg-blue-600/5',
    qs: '600+',
    mocks: 5,
    students: '5k+'
  },
  { 
    id: 'jipmer', 
    name: 'JIPMER', 
    fullName: 'JIPMER Medical Entrance',
    description: 'Jawaharlal Institute entrance for Puducherry and Karaikal campuses.', 
    tag: 'Medical', 
    color: '#ef4444', 
    bg: 'bg-red-500/5',
    qs: '500+',
    mocks: 4,
    students: '4k+'
  }
];

const Exams: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-12 max-w-[1400px] mx-auto space-y-12 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="badge badge-primary">All Competitive Exams</div>
          <h1 className="text-[3rem] font-black tracking-tighter leading-none">Exams <span className="gradient-text">Offered</span></h1>
          <p className="text-tx-muted text-[1rem] max-w-[600px]">Exhaustive question banks and mock tests for every major entrance exam in India. Precision-built for serious results.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary">Filter Engineering</button>
          <button className="btn-secondary">Filter Medical</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {EXAMS.map((ex, idx) => (
          <motion.div 
            key={ex.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => navigate('/tests/config')}
            className={`glass-panel p-8 flex flex-col group cursor-pointer relative overflow-hidden h-full`}
          >
            <div className="h-[4px] absolute top-0 left-0 right-0" style={{ background: ex.color }} />
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-black tracking-tight leading-tight group-hover:text-pr transition-colors" style={{ color: ex.color }}>{ex.name}</h3>
                <p className="text-[0.65rem] font-bold text-tx-dim uppercase tracking-widest mt-1">{ex.fullName}</p>
              </div>
              <span className={`badge border-transparent`} style={{ background: `${ex.color}15`, color: ex.color }}>{ex.tag}</span>
            </div>
            
            <p className="text-[0.85rem] text-tx-muted leading-relaxed mb-8 flex-1">
              {ex.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="space-y-1">
                <p className="label-sm text-[0.55rem]">Questions</p>
                <div className="font-display font-black text-sm" style={{ color: ex.color }}>{ex.qs}</div>
              </div>
              <div className="space-y-1">
                <p className="label-sm text-[0.55rem]">Mocks</p>
                <div className="font-display font-black text-sm" style={{ color: ex.color }}>{ex.mocks}</div>
              </div>
              <div className="space-y-1">
                <p className="label-sm text-[0.55rem]">Students</p>
                <div className="font-display font-black text-sm" style={{ color: ex.color }}>{ex.students}</div>
              </div>
            </div>

            <button className="flex items-center gap-2 text-[0.75rem] font-black uppercase tracking-widest text-tx-muted group-hover:text-pr transition-all">
              Launch Prep <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="glass-panel nh border-dashed border-pr/30 text-center py-12 space-y-4">
        <h3 className="text-xl font-black">Missing an exam?</h3>
        <p className="text-tx-muted text-[0.9rem]">Our content team is constantly mapping new entrance exams. Request a specific board or exam pattern.</p>
        <button className="btn-secondary">Request Exam Data →</button>
      </div>
    </div>
  );
};

export default Exams;
