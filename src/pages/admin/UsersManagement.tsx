import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Download, 
  UserPlus,
  TrendingUp,
  RefreshCw,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  History,
  Ban,
  Trash,
  Verified,
  ShieldAlert,
  GraduationCap,
  Bolt
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserProfile, UserRole, UserStatus } from '../../types';
import { exportToCSV } from '../../lib/exportUtils';
import { useToast } from '../../context/ToastContext';

const UsersManagement: React.FC = () => {
  const { profile } = useAuth();
  const { showToast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/users');
      if (!response.ok) throw new Error('Failed to fetch');
      const userData = await response.json();
      setUsers(userData);
      showToast("Student list updated", "success");
    } catch (err) {
      console.error("Error fetching users:", err);
      showToast("Sync failure: Network interference detected", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.displayName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleExport = () => {
    const exportData = filteredUsers.map(u => ({
      ID: u.id,
      Name: u.displayName,
      Email: u.email,
      Role: u.role,
      Status: u.status,
      LastLogin: new Date(u.lastLogin || 0).toLocaleString()
    }));
    exportToCSV(exportData, `cypher-users-${Date.now()}`);
    showToast("Data stream exported successfully", "success");
  };

  return (
    <main className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
            <span className="text-indigo-400">Dashboard</span>
            <ChevronRight size={10} />
            <span>Users Management</span>
          </div>
          <h1 className="text-4xl font-display font-black text-white uppercase tracking-tight">All Registered Users</h1>
        </div>
        <button className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/30 hover:scale-105 transition-all flex items-center gap-2 group">
            <UserPlus size={18} className="group-hover:rotate-12 transition-transform" />
            Add User Manually
        </button>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: users.length, icon: <Users className="text-indigo-400" />, shadow: "bg-indigo-500/10" },
          { label: "Students", value: users.filter(u => u.role === UserRole.USER).length, icon: <GraduationCap className="text-cyan-400" />, shadow: "bg-cyan-500/10" },
          { label: "Team Members", value: users.filter(u => u.role !== UserRole.USER).length, icon: <ShieldAlert className="text-purple-400" />, shadow: "bg-purple-500/10" },
          { label: "Active Today", value: users.filter(u => u.isActive).length, icon: <Bolt className="text-emerald-400" />, shadow: "bg-emerald-500/10" },
        ].map((stat, i) => (
          <div key={i} className="glass-panel rounded-xl p-6 relative overflow-hidden group border border-white/5 shadow-lg">
            <div className={`absolute -right-4 -top-4 w-24 h-24 ${stat.shadow} rounded-full blur-2xl group-hover:scale-125 transition-transform`}></div>
            <div className="text-slate-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 mb-4 relative z-10">
              {stat.icon}
              {stat.label}
            </div>
            <div className="text-4xl font-black text-white relative z-10">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-3">
        <div className="flex flex-1 w-full lg:w-auto items-center gap-3">
          <div className="relative flex-1 lg:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2.5 text-sm font-medium focus:border-indigo-500 focus:bg-white/10 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-widest focus:border-indigo-500 outline-none cursor-pointer"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value={UserRole.USER}>Student</option>
            <option value={UserRole.EDITOR}>Editor</option>
            <option value={UserRole.SUPERADMIN}>Superadmin</option>
          </select>
          <select 
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-widest focus:border-indigo-500 outline-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value={UserStatus.ACTIVE}>Active</option>
            <option value={UserStatus.INACTIVE}>Blocked</option>
          </select>
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
          <button 
            onClick={fetchUsers}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Sync
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/5">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">User Details</th>
                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Role</th>
                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Activity</th>
                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="p-6 opacity-30">
                      <div className="h-10 bg-white/10 rounded-xl w-full"></div>
                    </td>
                  </tr>
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-800 flex items-center justify-center text-white font-black text-sm shadow-lg overflow-hidden border border-white/10">
                            {user.photoURL ? <img src={user.photoURL} alt="" /> : user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                          </div>
                          {user.role === UserRole.SUPERADMIN && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-background rounded-full border border-white/10 flex items-center justify-center text-[8px] animate-bounce">👑</div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white text-sm">{user.displayName || 'Unnamed User'}</span>
                            {user.isVerified && <Verified size={14} className="text-indigo-400" />}
                          </div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                        user.role === UserRole.SUPERADMIN ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                        user.role === UserRole.EDITOR ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        'bg-white/5 text-slate-400 border-white/10'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-white font-medium">Joined {new Date(user.createdAt).toLocaleDateString()}</div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                          <div className={`w-1.5 h-1.5 rounded-full ${user.isActive ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
                          {user.isActive ? 'Online Now' : 'Offline'}
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                        user.status === UserStatus.ACTIVE ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        'bg-rose-500/10 text-rose-500 border-rose-500/20'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all" title="View Profile"><Eye size={16} /></button>
                        <button className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/5 rounded-lg transition-all" title="Edit Permissions"><Edit size={16} /></button>
                        <button className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-400/5 rounded-lg transition-all" title="Suspend Account"><Ban size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Users size={48} className="text-slate-800" />
                      <p className="text-sm font-black text-slate-600 uppercase tracking-widest">No matching records found in directory.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination/Footer */}
        <div className="p-6 border-t border-white/5 bg-white/[0.01] flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Showing 1-10 of {filteredUsers.length} Nodes</div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors disabled:opacity-30" disabled><ChevronLeft size={16} /></button>
            <button className="px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-xs font-black">1</button>
            <button className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs font-black hover:bg-white/10 hover:text-white transition-all">2</button>
            <button className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs font-black hover:bg-white/10 hover:text-white transition-all">3</button>
            <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UsersManagement;
