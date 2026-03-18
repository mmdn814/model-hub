import { useState, useRef, useEffect } from "react";
import { Info, MoreVertical, Activity, Edit, XCircle, Trash2, X, Check, Copy, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DevAnnotation } from "@/components/DevAnnotation";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useNavigate } from "react-router-dom";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  expires: string | null;
  firstUsed: string | null;
  lastUsed: string | null;
  usage: number;
  limit: number;
  reset: string;
  status: "active" | "disabled";
}

export default function ApiKeys() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [keys, setKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "test-bookmarks",
      key: "sk-or-v1-0d4...8bb",
      expires: null,
      firstUsed: "2024-03-01T10:00:00Z",
      lastUsed: "2024-03-15T14:30:00Z",
      usage: 0.005,
      limit: 1,
      reset: "N/A",
      status: "active"
    },
    {
      id: "2",
      name: "lover-demp",
      key: "sk-or-v1-146...fdc",
      expires: "2024-12-31T23:59:59Z",
      firstUsed: "2024-03-05T08:15:00Z",
      lastUsed: "2024-03-14T09:20:00Z",
      usage: 0.008,
      limit: 2,
      reset: "Monthly",
      status: "active"
    },
    {
      id: "3",
      name: "openclaw",
      key: "sk-or-v1-6db...b0d",
      expires: null,
      firstUsed: "2024-02-15T11:45:00Z",
      lastUsed: "2024-02-28T16:10:00Z",
      usage: 0.346,
      limit: 2,
      reset: "N/A",
      status: "active"
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isKeyCreatedModalOpen, setIsKeyCreatedModalOpen] = useState(false);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
  
  const [isOverviewModalOpen, setIsOverviewModalOpen] = useState(false);
  const [overviewKey, setOverviewKey] = useState<ApiKey | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editKey, setEditKey] = useState<ApiKey | null>(null);
  const [editForm, setEditForm] = useState({ name: "", limit: "", reset: "N/A", expiration: "No expiration" });
  
  const [createForm, setCreateForm] = useState({
    name: "",
    limit: "",
    reset: "N/A",
    expiration: "No expiration"
  });

  const formatLocalTime = (dateString: string | null) => {
    if (!dateString || dateString === "Never") return t("Never");
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  const formatUTCTime = (dateString: string | null) => {
    if (!dateString || dateString === "Never") return t("Never");
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC',
      timeZoneName: 'short'
    }).format(date);
  };

  const handleCreateSubmit = () => {
    // Mock creation
    const newKeyString = "sk-ch-v1-" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setNewlyCreatedKey(newKeyString);
    
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: createForm.name || "Untitled Key",
      key: newKeyString.substring(0, 13) + "..." + newKeyString.substring(newKeyString.length - 3),
      expires: createForm.expiration === "No expiration" ? null : createForm.expiration,
      firstUsed: null,
      lastUsed: null,
      usage: 0,
      limit: createForm.limit ? parseFloat(createForm.limit) : 0, // 0 means unlimited here for display
      reset: createForm.reset,
      status: "active"
    };
    
    setKeys([newKey, ...keys]);
    setIsCreateModalOpen(false);
    setIsKeyCreatedModalOpen(true);
    setCreateForm({ name: "", limit: "", reset: "N/A", expiration: "No expiration" });
  };

  const handleDeleteConfirm = () => {
    if (keyToDelete) {
      setKeys(keys.filter(k => k.id !== keyToDelete));
      setIsDeleteModalOpen(false);
      setKeyToDelete(null);
    }
  };

  const handleEditSubmit = () => {
    if (editKey) {
      setKeys(keys.map(k => k.id === editKey.id ? { 
        ...k, 
        name: editForm.name || k.name, 
        limit: editForm.limit ? parseFloat(editForm.limit) : k.limit,
        reset: editForm.reset,
        expires: editForm.expiration === "No expiration" ? null : editForm.expiration
      } : k));
      setIsEditModalOpen(false);
      setEditKey(null);
    }
  };

  const handleToggleDisable = (id: string) => {
    setKeys(keys.map(k => k.id === id ? { ...k, status: k.status === "active" ? "disabled" : "active" } : k));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 mb-6">
          {t("API Keys")}
        </h1>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            {t("Manage your keys to access all models")}
            <Info className="w-4 h-4" />
          </div>
          <DevAnnotation
            elementName="Create 按钮"
            componentType="Button"
            functionDesc="创建新的 API Key"
            interactionRule="点击弹出创建表单"
            autoLogic="创建成功后仅展示一次完整的 Key，之后只显示 Hash 值"
          >
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              {t("Create")}
            </button>
          </DevAnnotation>
        </div>

        <DevAnnotation
          elementName="API Key 列表"
          componentType="Table"
          functionDesc="展示用户所有的 API Key 及其使用情况"
          interactionRule="支持查看、编辑、禁用、删除等操作"
          dataSource="后端 API: GET /v1/api-keys"
          autoLogic="列表按创建时间倒序排列，禁用状态的 Key 会置灰显示"
        >
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-sm">
                <th className="py-4 px-6 font-medium w-12">
                  <div className="w-4 h-4 rounded border border-slate-300"></div>
                </th>
                <th className="py-4 px-4 font-medium">{t("Key")}</th>
                <th className="py-4 px-4 font-medium">{t("Expires")}</th>
                <th className="py-4 px-4 font-medium">{t("Last Used")}</th>
                <th className="py-4 px-4 font-medium">{t("Usage")}</th>
                <th className="py-4 px-4 font-medium">{t("Limit")}</th>
                <th className="py-4 px-6 font-medium w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {keys.map((k) => (
                <tr key={k.id} className={`hover:bg-slate-50/50 transition-colors group ${k.status === 'disabled' ? 'opacity-50 grayscale' : ''}`}>
                  <td className="py-4 px-6">
                    <div className="w-4 h-4 rounded border border-slate-300"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-slate-900 flex items-center gap-2">
                      {k.name}
                      {k.status === 'disabled' && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-500 tracking-wider">DISABLED</span>
                      )}
                    </div>
                    <div className="text-slate-400 text-sm font-mono mt-0.5">{k.key}</div>
                  </td>
                  <td className="py-4 px-4 text-slate-500 text-sm">{formatUTCTime(k.expires)}</td>
                  <td className="py-4 px-4 text-slate-500 text-sm">{formatLocalTime(k.lastUsed)}</td>
                  <td className="py-4 px-4 text-slate-500 text-sm">{k.usage.toFixed(3)} credits</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1.5 w-32">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-700">{k.limit} credits</span>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded tracking-wider">TOTAL</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${k.usage / k.limit > 0.9 ? 'bg-red-500' : 'bg-slate-400'}`}
                          style={{ width: `${Math.min((k.usage / k.limit) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 relative">
                    <DropdownMenu.Root open={activeDropdown === k.id} onOpenChange={(open) => setActiveDropdown(open ? k.id : null)}>
                      <DropdownMenu.Trigger asChild>
                        <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 outline-none">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </DropdownMenu.Trigger>
                      
                      <DropdownMenu.Portal>
                        <DropdownMenu.Content 
                          align="end" 
                          sideOffset={5}
                          className="w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-[100]"
                        >
                          <div className="flex flex-col">
                            <DevAnnotation
                              elementName="Overview 选项"
                              componentType="Menu Item"
                              functionDesc="查看密钥的详细信息"
                              interactionRule="点击弹出 Overview 详情弹窗"
                            >
                              <DropdownMenu.Item 
                                onClick={() => {
                                  setOverviewKey(k);
                                  setIsOverviewModalOpen(true);
                                  setActiveDropdown(null);
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3 outline-none cursor-pointer"
                              >
                                <Info className="w-4 h-4 text-slate-400" /> {t("Overview")}
                              </DropdownMenu.Item>
                            </DevAnnotation>

                            <DevAnnotation
                              elementName="Activity 选项"
                              componentType="Menu Item"
                              functionDesc="查看该密钥的调用活跃度"
                              interactionRule="点击跳转至 Logs 页面，并携带该 Key 的 ID 作为过滤条件"
                            >
                              <DropdownMenu.Item 
                                onClick={() => {
                                  navigate(`/logs?apiKeyId=${k.id}`);
                                  setActiveDropdown(null);
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3 outline-none cursor-pointer"
                              >
                                <Activity className="w-4 h-4 text-slate-400" /> {t("Activity")}
                              </DropdownMenu.Item>
                            </DevAnnotation>

                            <DevAnnotation
                              elementName="Edit 选项"
                              componentType="Menu Item"
                              functionDesc="编辑密钥名称、限额和过期时间"
                              interactionRule="点击弹出编辑弹窗，新限额不能低于已产生消耗"
                            >
                              <DropdownMenu.Item 
                                onClick={() => {
                                  setEditKey(k);
                                  setEditForm({ 
                                    name: k.name, 
                                    limit: k.limit.toString(),
                                    reset: k.reset || "N/A",
                                    expiration: k.expires ? k.expires : "No expiration"
                                  });
                                  setIsEditModalOpen(true);
                                  setActiveDropdown(null);
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3 outline-none cursor-pointer"
                              >
                                <Edit className="w-4 h-4 text-slate-400" /> {t("Edit")}
                              </DropdownMenu.Item>
                            </DevAnnotation>

                            <DevAnnotation
                              elementName="Disable/Enable 选项"
                              componentType="Menu Item"
                              functionDesc="切换密钥的启用/禁用状态"
                              interactionRule="点击立即切换状态，禁用后该密钥无法调用 API"
                            >
                              <DropdownMenu.Item 
                                onClick={() => {
                                  handleToggleDisable(k.id);
                                  setActiveDropdown(null);
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3 outline-none cursor-pointer"
                              >
                                <XCircle className="w-4 h-4 text-slate-400" /> {k.status === "active" ? t("Disable") : t("Enable")}
                              </DropdownMenu.Item>
                            </DevAnnotation>

                            <DevAnnotation
                              elementName="Delete 选项"
                              componentType="Menu Item"
                              functionDesc="删除该密钥"
                              interactionRule="点击弹出二次确认框，确认后删除"
                            >
                              <DropdownMenu.Item 
                                onClick={() => {
                                  setKeyToDelete(k.id);
                                  setIsDeleteModalOpen(true);
                                  setActiveDropdown(null);
                                }}
                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 outline-none cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4 text-red-400" /> {t("Delete")}
                              </DropdownMenu.Item>
                            </DevAnnotation>
                          </div>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </DevAnnotation>
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative">
            <button 
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
            
            <h2 className="text-xl font-semibold mb-6">{t("Create new secret key")}</h2>
            
            <div className="space-y-5">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                  {t("Name")} <Info className="w-3.5 h-3.5 text-slate-400" />
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. &quot;Chatbot Key&quot;"
                  className="w-full bg-[#f8fafc] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({...createForm, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                  {t("Credit limit (optional)")} <Info className="w-3.5 h-3.5 text-slate-400" />
                </label>
                <input 
                  type="number" 
                  placeholder="Leave blank for unlimited"
                  className="w-full bg-[#f8fafc] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={createForm.limit}
                  onChange={(e) => setCreateForm({...createForm, limit: e.target.value})}
                />
              </div>
              
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                  {t("Reset limit every...")} <Info className="w-3.5 h-3.5 text-slate-400" />
                </label>
                <div className="relative">
                  <select 
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
                    value={createForm.reset}
                    onChange={(e) => setCreateForm({...createForm, reset: e.target.value})}
                  >
                    <option>N/A</option>
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Daily</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                  {t("Expiration")} <Info className="w-3.5 h-3.5 text-slate-400" />
                </label>
                <div className="relative">
                  <select 
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
                    value={createForm.expiration}
                    onChange={(e) => setCreateForm({...createForm, expiration: e.target.value})}
                  >
                    <option>No expiration</option>
                    <option value={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()}>7 days</option>
                    <option value={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()}>30 days</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-xs text-slate-400 mt-1.5">{t("Expiration time is based on UTC-0 server time.")}</p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end gap-3">
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
              >
                {t("Cancel")}
              </button>
              <button 
                onClick={handleCreateSubmit}
                disabled={!createForm.name}
                className="px-5 py-2.5 text-sm font-medium bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
              >
                {t("Create secret key")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Key Created Success Modal */}
      {isKeyCreatedModalOpen && (
        <DevAnnotation
          elementName="密钥创建成功提示"
          componentType="Modal"
          functionDesc="一次性展示完整的 API Key"
          interactionRule="用户关闭后无法再次查看完整 Key"
          autoLogic="强制提示用户保存。后端仅存储 Key 的 Hash 值用于校验，不保存明文。"
          devNotes="安全策略：一次性可见性"
        >
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-xl">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <Check className="w-6 h-6" />
              </div>
              
              <h2 className="text-2xl font-semibold mb-2">{t("Save your key")}</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {t("请立即复制并妥善保存此 Key，为了您的安全，系统不会再次完整显示它。若丢失，您只能删除并创建新 Key。")}
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between mb-8">
                <code className="text-sm font-mono text-slate-800 break-all pr-4">
                  {newlyCreatedKey}
                </code>
                <button 
                  onClick={() => copyToClipboard(newlyCreatedKey)}
                  className="shrink-0 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              
              <button 
                onClick={() => setIsKeyCreatedModalOpen(false)}
                className="w-full py-3 text-sm font-medium bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-xl transition-colors"
              >
                {t("I've saved it")}
              </button>
            </div>
          </div>
        </DevAnnotation>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DevAnnotation
          elementName="删除确认弹窗"
          componentType="Modal"
          functionDesc="防止用户误删 API Key"
          interactionRule="点击确认后执行删除操作"
          autoLogic="提示“此操作无法撤销。该密钥关联的所有服务将立即停止访问。”用户点击确认后，数据物理删除或逻辑标记删除。"
          devNotes="风险管控"
        >
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-2 text-slate-900">{t("Delete API Key")}</h2>
              <p className="text-slate-600 mb-6">
                {t("此操作无法撤销。该密钥关联的所有服务将立即停止访问。")}
              </p>
              
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  {t("Cancel")}
                </button>
                <button 
                  onClick={handleDeleteConfirm}
                  className="px-5 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
                >
                  {t("Delete")}
                </button>
              </div>
            </div>
          </div>
        </DevAnnotation>
      )}

      {/* Overview Modal */}
      {isOverviewModalOpen && overviewKey && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative">
            <button 
              onClick={() => setIsOverviewModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold mb-6">{t("Key Overview")}</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">{t("Name")}</span>
                <span className="font-medium">{overviewKey.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">{t("Key")}</span>
                <span className="font-mono">{overviewKey.key}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">{t("Status")}</span>
                <span className={`font-medium ${overviewKey.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                  {overviewKey.status.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">{t("Usage")}</span>
                <span className="font-medium">{overviewKey.usage.toFixed(3)} credits</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">{t("Limit")}</span>
                <span className="font-medium">{overviewKey.limit} credits</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">{t("Reset limit every")}</span>
                <span className="font-medium">{overviewKey.reset}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">{t("First Used")}</span>
                <span className="font-medium">{formatLocalTime(overviewKey.firstUsed)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">{t("Last Used")}</span>
                <span className="font-medium">{formatLocalTime(overviewKey.lastUsed)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">{t("Expires")}</span>
                <span className="font-medium">{formatUTCTime(overviewKey.expires)}</span>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setIsOverviewModalOpen(false)}
                className="px-5 py-2.5 text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              >
                {t("Close")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editKey && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative">
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
            
            <h2 className="text-xl font-semibold mb-6">{t("Edit API Key")}</h2>
            
            <div className="space-y-5">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                  {t("Name")}
                </label>
                <input 
                  type="text" 
                  className="w-full bg-[#f8fafc] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                  {t("Limit (credits)")}
                </label>
                <input 
                  type="number" 
                  step="0.01"
                  className="w-full bg-[#f8fafc] border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={editForm.limit}
                  onChange={(e) => setEditForm({...editForm, limit: e.target.value})}
                />
                {parseFloat(editForm.limit) < editKey.usage && (
                  <p className="text-red-500 text-xs mt-2">Limit cannot be lower than current usage ({editKey.usage.toFixed(3)} credits).</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                  {t("Reset limit every...")} <Info className="w-3.5 h-3.5 text-slate-400" />
                </label>
                <div className="relative">
                  <select 
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
                    value={editForm.reset}
                    onChange={(e) => setEditForm({...editForm, reset: e.target.value})}
                  >
                    <option>N/A</option>
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Daily</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                  {t("Expiration")} <Info className="w-3.5 h-3.5 text-slate-400" />
                </label>
                <div className="relative">
                  <select 
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
                    value={editForm.expiration}
                    onChange={(e) => setEditForm({...editForm, expiration: e.target.value})}
                  >
                    <option>No expiration</option>
                    <option value={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()}>7 days</option>
                    <option value={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()}>30 days</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-xs text-slate-400 mt-1.5">{t("Expiration time is based on UTC-0 server time.")}</p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end gap-3">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
              >
                {t("Cancel")}
              </button>
              <button 
                onClick={handleEditSubmit}
                disabled={!editForm.name || (parseFloat(editForm.limit) < editKey.usage)}
                className="px-5 py-2.5 text-sm font-medium bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
              >
                {t("Save Changes")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
