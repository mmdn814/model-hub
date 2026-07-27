import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Filter, Calendar } from "lucide-react";

interface AuditLog {
  id: string;
  time: string;
  user: string;
  ip: string;
  actionType: string;
  details: string;
}

const MOCK_LOGS: AuditLog[] = [
  { id: "log_6", time: "2026-07-27T08:05:12Z", user: "dev1@company.com", ip: "10.0.0.50", actionType: "User Login", details: "Logged into the workspace." },
  { id: "log_7", time: "2026-07-26T14:22:10Z", user: "finance@company.com", ip: "172.16.0.22", actionType: "Enable Auto-Recharge", details: "Enabled auto-recharge for $100 when balance falls below $20." },
  { id: "log_8", time: "2026-07-26T14:20:05Z", user: "finance@company.com", ip: "172.16.0.22", actionType: "Enable Alert", details: "Enabled balance alert threshold at $10." },
  { id: "log_9", time: "2026-07-25T10:15:30Z", user: "finance@company.com", ip: "172.16.0.22", actionType: "Disable Auto-Recharge", details: "Disabled auto-recharge." },
  { id: "log_10", time: "2026-07-25T10:15:25Z", user: "finance@company.com", ip: "172.16.0.22", actionType: "Disable Alert", details: "Disabled balance alert." },
  { id: "log_1", time: "2026-07-24T08:12:45Z", user: "admin@company.com", ip: "192.168.1.100", actionType: "Invite Member", details: "Invited dev2@company.com with Developer role." },
  { id: "log_2", time: "2026-07-23T14:30:12Z", user: "dev1@company.com", ip: "10.0.0.50", actionType: "Create API Key", details: "Created key 'Production Key v2'." },
  { id: "log_3", time: "2026-07-22T09:15:00Z", user: "finance@company.com", ip: "172.16.0.22", actionType: "Recharge", details: "Recharged $500.00 via Stripe." },
  { id: "log_4", time: "2026-07-20T11:05:30Z", user: "admin@company.com", ip: "192.168.1.100", actionType: "Change Role", details: "Changed role of finance@company.com to Finance." },
  { id: "log_5", time: "2026-07-15T16:45:10Z", user: "admin@company.com", ip: "192.168.1.100", actionType: "Enable Enterprise", details: "Enabled Enterprise Workspace." },
];

export default function AuditLogs() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = MOCK_LOGS.filter(log => 
    log.user.includes(searchTerm) || 
    log.actionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Audit Logs</h1>
        <p className="text-sm text-zinc-500 mt-1">Track actions and changes within your workspace.</p>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search user, action or details..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-600 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-600 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50">
              <Calendar className="w-4 h-4" />
              Last 30 Days
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600 whitespace-nowrap">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-900">
              <tr>
                <th className="px-6 py-3 font-medium">Time (UTC)</th>
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">IP Address</th>
                <th className="px-6 py-3 font-medium">Action</th>
                <th className="px-6 py-3 font-medium w-full">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{log.time.replace('T', ' ').replace('Z', '')}</td>
                  <td className="px-6 py-4 font-medium text-zinc-900">{log.user}</td>
                  <td className="px-6 py-4 font-mono text-xs text-zinc-500">{log.ip}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-zinc-100 text-zinc-800 text-xs font-medium">
                      {log.actionType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500 truncate max-w-xs" title={log.details}>
                    {log.details}
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                    No logs found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
