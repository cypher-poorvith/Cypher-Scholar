import { UserRole } from '../types';

export const setUserRole = async (userId: string, role: UserRole, permissions: any) => {
  const response = await fetch(`/api/admin/users/${userId}/role`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role, permissions })
  });
  return response.json();
};

export const createTeamMember = async (email: string, name: string, role: UserRole) => {
  // Mocking team invitation since it usually involves emails
  console.log(`Inviting team member: ${name} (${email}) as ${role}`);
};

export const disableUserAuth = async (userId: string, blocked: boolean) => {
  const response = await fetch(`/api/admin/users/${userId}/block`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blocked })
  });
  return response.json();
};

export const deleteUserAccount = async (userId: string) => {
  const response = await fetch(`/api/admin/users/${userId}`, {
    method: 'DELETE'
  });
  return response.json();
};

export const sendAnnouncement = async (announcementData: any) => {
  // Announcements also need a collection in JSON DB
  console.log("Sending announcement:", announcementData);
};

