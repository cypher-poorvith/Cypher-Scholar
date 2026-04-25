import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Search, 
  RefreshCw,
  LayoutGrid,
  List,
  Users
} from 'lucide-react';
import { UserProfile, UserRole } from '../../types';
import { useAuth } from '../../context/AuthContext';
import TeamMemberCard from '../../components/features/TeamMemberCard';
import Button from '../../components/ui/Button';
import GlassCard from '../../components/ui/GlassCard';
import Loader from '../../components/ui/Loader';
import Modal from '../../components/ui/Modal';
import PermissionSelector from '../../components/features/PermissionSelector';
import StatCard from '../../components/ui/StatCard';
import { useToast } from '../../context/ToastContext';
import { createTeamMember } from '../../services/adminService';

const TeamManagement: React.FC = () => {
  const { profile } = useAuth();
  const { showToast } = useToast();
  const [members, setMembers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: '',
    name: '',
    role: UserRole.EDITOR as UserRole,
    permissions: {
      uploadContent: true,
      manageUsers: false,
      viewAnalytics: true,
      deleteContent: false,
      createAnnouncements: true,
      editAppStructure: false
    }
  });

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/users');
      if (!response.ok) throw new Error('Failed to fetch');
      const allUsers: UserProfile[] = await response.json();
      const teamData = allUsers.filter(u => 
        [UserRole.SUPERADMIN, UserRole.EDITOR, UserRole.VIEWER].includes(u.role)
      );
      setMembers(teamData);
    } catch (err) {
      console.error("Error fetching team:", err);
      showToast("Error: Could not load user list", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTeamMember(inviteData.email, inviteData.name, inviteData.role);
      showToast("Invitation sent successfully", "success");
      setIsInviteModalOpen(false);
    } catch (err) {
      showToast("Invite failed to send", "danger");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-black text-white tracking-tight uppercase">User Management</h1>
          <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-[0.3em]">Manage staff, teachers, and student access</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 mr-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-primary text-white" : "text-slate-500 hover:text-white")}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-primary text-white" : "text-slate-500 hover:text-white")}
            >
              <List size={18} />
            </button>
          </div>
          <Button variant="outline" onClick={fetchTeam}>
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
          <Button onClick={() => setIsInviteModalOpen(true)}>
            <UserPlus size={18} />
            Add User
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Staff" value={members.length} icon={<UsersIcon size={20} />} variant="primary" />
        <StatCard label="Admins" value={members.filter(m => m.role === UserRole.SUPERADMIN).length} icon={<ShieldIcon size={20} />} variant="danger" />
        <StatCard label="Editors" value={members.filter(m => m.role === UserRole.EDITOR).length} icon={<EditIcon size={20} />} variant="primary" />
        <StatCard label="Active Now" value={members.filter(m => m.isActive).length} icon={<PulseIcon size={20} />} variant="success" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-64 bg-white/5 border border-white/5 rounded-3xl animate-pulse"></div>
          ))
        ) : members.map((member) => (
          <TeamMemberCard 
            key={member.id}
            member={member}
            isCurrentUser={member.id === profile?.id}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>

      <Modal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite Team Member"
      >
        <form onSubmit={handleInvite} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <input 
                type="text" 
                required
                className="immersive-input w-full" 
                placeholder="e.g. Alex Cipher"
                value={inviteData.name}
                onChange={(e) => setInviteData({...inviteData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                required
                className="immersive-input w-full" 
                placeholder="alex@cypher.tech"
                value={inviteData.email}
                onChange={(e) => setInviteData({...inviteData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Role</label>
            <div className="grid grid-cols-3 gap-3">
               {[UserRole.EDITOR, UserRole.VIEWER, UserRole.SUPERADMIN].map((role) => (
                 <button
                   key={role}
                   type="button"
                   onClick={() => setInviteData({...inviteData, role})}
                   className={cn(
                    "h-12 rounded-xl text-xs font-bold uppercase transition-all border",
                    inviteData.role === role ? "bg-primary/10 border-primary text-white shadow-lg" : "bg-white/5 border-white/5 text-slate-500 hover:bg-white/10"
                   )}
                 >
                   {role}
                 </button>
               ))}
            </div>
          </div>

          <div className="space-y-4">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Permissions</label>
             <PermissionSelector 
                permissions={inviteData.permissions}
                onChange={(key, val) => setInviteData({
                  ...inviteData, 
                  permissions: {...inviteData.permissions, [key]: val}
                })}
             />
          </div>

          <div className="pt-4 flex justify-end gap-3">
             <Button variant="ghost" type="button" onClick={() => setIsInviteModalOpen(false)}>Cancel</Button>
             <Button type="submit" className="px-10">Send Invitation</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
const UsersIcon = ({size}: {size: number}) => <Users size={size} />;
const ShieldIcon = ({size}: {size: number}) => <Shield size={size} />;
const Shield = ({size}: {size: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const EditIcon = ({size}: {size: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const PulseIcon = ({size}: {size: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;

export default TeamManagement;
