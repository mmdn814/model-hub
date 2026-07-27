import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Users, Mail, Plus, X, ChevronDown, Check, Shield, Search, MoreHorizontal } from "lucide-react";

interface Member {
  id: string;
  email: string;
  role: "Administrator" | "Finance" | "Developer";
  status: "Active" | "Pending";
  joinedAt: string;
}

const MOCK_MEMBERS: Member[] = [
  { id: "usr_1", email: "admin@company.com", role: "Administrator", status: "Active", joinedAt: "2026-01-15" },
  { id: "usr_2", email: "finance@company.com", role: "Finance", status: "Active", joinedAt: "2026-02-20" },
  { id: "usr_3", email: "dev1@company.com", role: "Developer", status: "Active", joinedAt: "2026-03-10" },
  { id: "usr_4", email: "dev2@company.com", role: "Developer", status: "Pending", joinedAt: "2026-07-20" },
];

export default function TeamMembers() {
  const { t } = useTranslation();
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Member["role"]>("Developer");
  const [memberToRemove, setMemberToRemove] = useState<Member | null>(null);
  const [memberToCancel, setMemberToCancel] = useState<Member | null>(null);
  const [memberToChangeRole, setMemberToChangeRole] = useState<{member: Member, newRole: Member["role"]} | null>(null);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    
    const newMember: Member = {
      id: `usr_${Date.now()}`,
      email: inviteEmail,
      role: inviteRole,
      status: "Pending",
      joinedAt: new Date().toISOString().split('T')[0],
    };
    
    setMembers([...members, newMember]);
    setIsInviteOpen(false);
    setInviteEmail("");
    setInviteRole("Developer");
  };

  const handleCancelInviteClick = (member: Member) => {
    setMemberToCancel(member);
  };

  const handleConfirmCancelInvite = () => {
    if (memberToCancel) {
      setMembers(members.filter(m => m.id !== memberToCancel.id));
      setMemberToCancel(null);
    }
  };

  const handleRemoveMemberClick = (member: Member) => {
    if (member.role === "Administrator" && members.filter(m => m.role === "Administrator").length === 1) {
      alert("Cannot remove the last administrator.");
      return;
    }
    setMemberToRemove(member);
  };

  const handleConfirmRemoveMember = () => {
    if (memberToRemove) {
      setMembers(members.filter(m => m.id !== memberToRemove.id));
      setMemberToRemove(null);
    }
  };

  const handleRoleChangeClick = (id: string, newRole: Member["role"]) => {
    const member = members.find(m => m.id === id);
    if (!member || member.role === newRole) return;
    if (member.role === "Administrator" && members.filter(m => m.role === "Administrator").length === 1 && newRole !== "Administrator") {
      alert("Cannot change the role of the last administrator.");
      return;
    }
    setMemberToChangeRole({ member, newRole });
  };

  const handleConfirmRoleChange = () => {
    if (memberToChangeRole) {
      const { member, newRole } = memberToChangeRole;
      setMembers(members.map(m => m.id === member.id ? { ...m, role: newRole } : m));
      setMemberToChangeRole(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Team Members</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage workspace members and roles.</p>
        </div>
        <button 
          onClick={() => setIsInviteOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 flex justify-between items-center">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search members..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        
        <table className="w-full text-left text-sm text-zinc-600">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-900">
            <tr>
              <th className="px-6 py-3 font-medium">User</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Joined Date</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {members.map(member => (
              <tr key={member.id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
                      {member.email[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-zinc-900">{member.email}</div>
                      <div className="text-xs text-zinc-500 font-mono">{member.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select 
                    value={member.role}
                    onChange={(e) => handleRoleChangeClick(member.id, e.target.value as Member["role"])}
                    className="text-sm border-zinc-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="Administrator">Administrator</option>
                    <option value="Finance">Finance</option>
                    <option value="Developer">Developer</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  {member.status === "Active" ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">{member.joinedAt}</td>
                <td className="px-6 py-4 text-right">
                  {member.status === "Pending" ? (
                    <button 
                      onClick={() => handleCancelInviteClick(member)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm"
                    >
                      Cancel Invite
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleRemoveMemberClick(member)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isInviteOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-zinc-900">Invite Member</h2>
              <button onClick={() => setIsInviteOpen(false)} className="text-zinc-500 hover:text-zinc-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input 
                    type="email" 
                    required
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="colleague@company.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Role</label>
                <select 
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value as Member["role"])}
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Administrator">Administrator (Full Access)</option>
                  <option value="Finance">Finance (Billing Only)</option>
                  <option value="Developer">Developer (Keys & Logs Only)</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Remove Member Modal */}
      {memberToRemove && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-zinc-900 mb-2">Remove Member</h2>
            <p className="text-sm text-zinc-600 mb-6">
              Are you sure you want to remove <span className="font-semibold text-zinc-900">{memberToRemove.email}</span> from this workspace? Their API keys will remain active unless manually disabled.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setMemberToRemove(null)}
                className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmRemoveMember}
                className="px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
              >
                Remove Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Invite Modal */}
      {memberToCancel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-zinc-900 mb-2">Cancel Invitation</h2>
            <p className="text-sm text-zinc-600 mb-6">
              Are you sure you want to cancel the invitation sent to <span className="font-semibold text-zinc-900">{memberToCancel.email}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setMemberToCancel(null)}
                className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                Keep
              </button>
              <button 
                onClick={handleConfirmCancelInvite}
                className="px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
              >
                Cancel Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Role Modal */}
      {memberToChangeRole && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-zinc-900 mb-2">Change Role</h2>
            <p className="text-sm text-zinc-600 mb-6">
              Are you sure you want to change <span className="font-semibold text-zinc-900">{memberToChangeRole.member.email}</span>'s role from <span className="font-semibold">{memberToChangeRole.member.role}</span> to <span className="font-semibold text-indigo-600">{memberToChangeRole.newRole}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setMemberToChangeRole(null)}
                className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmRoleChange}
                className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
