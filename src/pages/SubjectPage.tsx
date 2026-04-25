import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';
import { Subject, SubjectCategory } from '../types';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Book, ChevronRight, Search, GraduationCap, School, Database, ArrowLeft, Bookmark } from 'lucide-react';

const SubjectPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const { isAdmin } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const examType = searchParams.get('exam');
  const gradeLevel = searchParams.get('grade');

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const q = category === 'all' 
          ? query(collection(db, 'subjects'), orderBy('order', 'asc'))
          : query(
              collection(db, 'subjects'),
              where('category', '==', category),
              orderBy('order', 'asc')
            );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Subject));
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects", error);
        handleFirestoreError(error, 'list', 'subjects');
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [category]);

  const filteredSubjects = subjects.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-4 text-xs font-black uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter italic">
            {category === 'all' ? 'Knowledge Hub' : category === SubjectCategory.COMPETITIVE ? 'Comp. Exams' : 'Academic Hub'}
          </h1>
          <p className="text-lg text-slate-400 font-medium mt-2">
            Browse through our exhaustive library of study materials.
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            type="text" 
            placeholder="Search resources..."
            className="w-full pl-12 h-14 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:border-indigo-500/50 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="h-64 bg-white/5 border border-white/5 rounded-3xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSubjects.map((subject, idx) => (
            <Link to={`/subject/${subject.id}`} key={subject.id}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-panel p-8 group cursor-pointer flex flex-col min-h-[220px] hover:border-indigo-500/50 hover-lift relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors">
                    <Book size={24} />
                  </div>
                  <button className="text-slate-600 hover:text-white transition-colors">
                    <Bookmark size={18} />
                  </button>
                </div>
                
                <div className="relative z-10">
                   <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2 leading-tight pr-4">{subject.name}</h3>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Mastery Course</p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                   <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">32 Modules</span>
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg group-hover:shadow-indigo-600/30">
                      <ChevronRight size={20} />
                   </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-24 text-center flex flex-col items-center border-dashed border-white/10">
           <div className="w-20 h-20 rounded-[30px] bg-white/5 flex items-center justify-center text-slate-700 mb-8">
             <Search size={40} />
           </div>
           <h3 className="text-2xl font-black text-slate-500 uppercase italic tracking-widest">No Resources Found</h3>
           <p className="text-xs text-slate-600 mt-4 uppercase font-bold tracking-[0.3em]">Try searching with a different keyword</p>
           {isAdmin && (
             <button className="mt-12 h-14 px-12 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest">
               Create New Subject
             </button>
           )}
        </div>
      )}
    </div>
  );
};

export default SubjectPage;
