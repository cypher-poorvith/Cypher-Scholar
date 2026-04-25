import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { AuditLog } from '../../types';
import { 
  Download, 
  Search, 
  Filter,
  RefreshCw
} from 'lucide-react';
import AuditLogRow from '../../components/features/AuditLogRow';
import Button from '../../components/ui/Button';
import GlassCard from '../../components/ui/GlassCard';
import Loader from '../../components/ui/Loader';
import { useToast } from '../../context/ToastContext';
import { exportToCSV } from '../../lib/exportUtils';

const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'auditLogs'), orderBy('timestamp', 'desc'), limit(50));
      const snapshot = await getDocs(q);
      const logData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as AuditLog));
      setLogs(logData);
    } catch (err) {
      console.error("Error fetching logs:", err);
      showToast("Error: History records inaccessible", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleExport = () => {
    exportToCSV(logs, 'cypher-audit-logs');
    showToast("Manifest exported successfully", "success");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-black text-white tracking-tight uppercase">Audit Manifest</h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-[0.3em]">Immutable system-wide event sequencing</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={fetchLogs}>
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            Sync
          </Button>
          <Button onClick={handleExport}>
            <Download size={18} />
            Export Raw
          </Button>
        </div>
      </header>

      {/* Filters */}
      <GlassCard className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/[0.03]">
        <div className="relative md:col-span-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by student ID, action or target..." 
            className="immersive-input w-full pl-12 h-12" 
          />
        </div>
        
        <select className="immersive-input h-12 pl-4">
          <option>All Operations</option>
          <option>Creation</option>
          <option>Modification</option>
          <option>Erasure</option>
          <option>Authorization</option>
        </select>

        <select className="immersive-input h-12 pl-4">
          <option>All Timeframes</option>
          <option>Last 24 Hours</option>
          <option>Current Epoch</option>
        </select>
      </GlassCard>

      {/* Logs Table */}
      <GlassCard className="overflow-hidden p-0" hover={false}>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Temporal Index</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Entity Identity</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Action Logic</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Target Vector</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                 Array(10).fill(0).map((_, i) => (
                   <tr key={i}>
                     <td colSpan={5} className="px-6 py-4">
                        <div className="h-6 w-full bg-white/5 animate-pulse rounded-lg"></div>
                     </td>
                   </tr>
                 ))
              ) : logs.length > 0 ? (
                logs.map((log) => (
                  <AuditLogRow key={log.id} log={log} onTrace={() => {}} />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-500 font-mono uppercase text-xs">
                    Null Manifest: No event data sequence recorded
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default AuditLogs;
