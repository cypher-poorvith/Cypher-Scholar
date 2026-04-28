import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Subject, SubjectCategory } from '../types';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Book, ChevronRight, Search, GraduationCap, School, Database, ArrowLeft, Bookmark } from 'lucide-react';
import { cn } from '../lib/utils';

const SubjectPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const { isAdmin } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'JEE Main', 'JEE Advanced', 'Boards', 'Scholar Series'];

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        // Since we are in a dev environment without a real backend for /api/subjects
        // we'll mock the data if needed or use the API
        const response = await fetch(`/api/subjects?category=${category}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects", error);
        // Fallback mock data
        const mockSubjects: Subject[] = [
          { id: '1', name: 'Physics - JEE Main', category: SubjectCategory.COMPETITIVE, type: 'JEE Main' },
          { id: '2', name: 'Chemistry - JEE Main', category: SubjectCategory.COMPETITIVE, type: 'JEE Main' },
          { id: '3', name: 'Mathematics - JEE Main', category: SubjectCategory.COMPETITIVE, type: 'JEE Main' },
          { id: '4', name: 'Physics - Boards', category: SubjectCategory.GRADES, type: 'Boards' },
          { id: '5', name: 'Chemistry - Boards', category: SubjectCategory.GRADES, type: 'Boards' },
          { id: '6', name: 'Mathematics - Boards', category: SubjectCategory.GRADES, type: 'Boards' },
          { id: '7', name: 'Physics - JEE Advanced', category: SubjectCategory.COMPETITIVE, type: 'JEE Advanced' },
          { id: '8', name: 'Chemistry - JEE Advanced', category: SubjectCategory.COMPETITIVE, type: 'JEE Advanced' },
          { id: '9', name: 'Maths - JEE Advanced', category: SubjectCategory.COMPETITIVE, type: 'JEE Advanced' },
        ] as any;
        setSubjects(mockSubjects);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [category]);

  const filteredSubjects = subjects.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || (s as any).type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-4 text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tighter italic">
            Knowledge <span className="text-primary">Hub</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium mt-2">
            Browse through our exhaustive library of study materials.
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search subjects or topics..."
            className="vibrant-input pl-12 h-14"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
              activeCategory === cat 
                ? "bg-primary text-white shadow-lg shadow-primary/30" 
                : "bg-white border border-slate-100 text-slate-400 hover:text-slate-600 shadow-sm"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="h-64 bg-slate-200/50 border border-slate-100 rounded-lg animate-pulse"></div>
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
                className="vibrant-card group cursor-pointer flex flex-col min-h-[220px] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                    <Book size={24} />
                  </div>
                  <button className="text-slate-300 hover:text-primary transition-colors">
                    <Bookmark size={18} />
                  </button>
                </div>
                
                <div className="relative z-10">
                   <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2 leading-tight pr-4">{subject.name}</h3>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Mastery Course</p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                   <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">32 Modules</span>
                   <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-md group-hover:shadow-primary/30">
                      <ChevronRight size={20} />
                   </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="vibrant-card p-24 text-center flex flex-col items-center border-dashed border-slate-200">
           <div className="w-20 h-20 rounded-[30px] bg-slate-50 flex items-center justify-center text-slate-300 mb-8">
             <Search size={40} />
           </div>
           <h3 className="text-2xl font-bold text-slate-400 italic tracking-widest uppercase">No Resources Found</h3>
           <p className="text-xs text-slate-400 mt-4 uppercase font-bold tracking-[0.3em]">Try searching with a different keyword</p>
           {isAdmin && (
             <button className="mt-12 btn-primary h-14 px-12">
               Create New Subject
             </button>
           )}
        </div>
      )}
    </div>
  );
};

export default SubjectPage;
