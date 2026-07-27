import { useState, useRef, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Box, CreditCard, Key, LogOut, Globe, FileText, Settings as SettingsIcon, User, Tag, Image as ImageIcon, MessageSquare, ClipboardList, Building2, Users, ChevronDown, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useTranslation } from "react-i18next";
import { DevAnnotation } from "@/components/DevAnnotation";

const MOCK_WORKSPACES = [
  { id: 'personal', name: 'Personal Space', isEnterprise: false, role: 'Administrator' },
  { id: 'ent-1', name: 'Acme Corp (Admin)', isEnterprise: true, role: 'Administrator' },
  { id: 'ent-2', name: 'Global Tech (Finance)', isEnterprise: true, role: 'Finance' },
  { id: 'ent-3', name: 'Stark Industries (Dev)', isEnterprise: true, role: 'Developer' },
];

const commonNavItems = [
  { icon: LayoutDashboard, labelKey: "Dashboard", path: "/" },
  { icon: Building2, labelKey: "Providers", path: "/providers" },
  { icon: Box, labelKey: "Models", path: "/models" },
  { icon: Tag, labelKey: "Pricing", path: "/pricing" },
];

const assetLibraryNavItem = { icon: ImageIcon, labelKey: "Asset Library", path: "/assets" };
const billingNavItem = { icon: CreditCard, labelKey: "Billing", path: "/billing" };
const keysNavItem = { icon: Key, labelKey: "API Keys", path: "/keys" };
const logsNavItem = { icon: FileText, labelKey: "Logs", path: "/logs" };
const teamNavItem = { icon: Users, labelKey: "Team Members", path: "/team" };
const auditLogsNavItem = { icon: ClipboardList, labelKey: "Audit Logs", path: "/audit-logs" };
const settingsNavItem = { icon: SettingsIcon, labelKey: "Settings", path: "/settings" };

const getNavItemsForRole = (role: string, isEnterprise: boolean) => {
  const items = [...commonNavItems];
  if (role === 'Administrator') {
    items.push(assetLibraryNavItem, billingNavItem, keysNavItem, logsNavItem);
    if (isEnterprise) {
      items.push(teamNavItem, auditLogsNavItem);
    }
    items.push(settingsNavItem);
  } else if (role === 'Finance') {
    items.push(billingNavItem);
  } else if (role === 'Developer') {
    items.push(keysNavItem, logsNavItem);
  }
  return items;
};

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(MOCK_WORKSPACES[1]);
  const profileRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);

  const isEnterprise = selectedWorkspace.isEnterprise;
  const userRole = selectedWorkspace.role || 'Administrator';

  const navItems = getNavItemsForRole(userRole, isEnterprise);

  const allRoutes = [...commonNavItems, assetLibraryNavItem, billingNavItem, keysNavItem, logsNavItem, teamNavItem, auditLogsNavItem, settingsNavItem];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (workspaceRef.current && !workspaceRef.current.contains(event.target as Node)) {
        setIsWorkspaceOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    // 1. Clear local Token/Session
    // localStorage.removeItem("token");
    // 2. Call backend logout API (optional)
    // 3. Redirect to login page for demo purposes
    navigate("/login");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="flex h-screen w-full bg-zinc-50 text-zinc-950 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 bg-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 shrink-0">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="w-8 h-8 bg-zinc-900 rounded-md flex items-center justify-center">
              <span className="text-white text-sm">PT</span>
            </div>
            Powertokens
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 flex flex-col overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
            return (
              <div key={item.path} className={cn("flex items-center w-full group relative rounded-md", isActive ? "bg-zinc-100" : "hover:bg-zinc-50")}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors flex-1",
                    isActive 
                      ? "text-zinc-900" 
                      : "text-zinc-500 hover:text-zinc-900"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {t(item.labelKey)}
                </Link>
                {item.path === "/pricing" && (
                  <Popover>
                    <PopoverTrigger 
                      className="absolute right-2 cursor-pointer text-[10px] font-semibold text-zinc-900 bg-amber-200/60 px-1.5 py-0.5 rounded border border-amber-300/50 hover:bg-amber-300/80 transition-colors" 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} 
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      【202668需求】
                    </PopoverTrigger>
                    <PopoverContent side="right" align="start" className="w-[350px] p-4 text-sm bg-white text-zinc-800 shadow-2xl border border-zinc-200/80 rounded-xl z-[100000]" onClick={(e) => e.stopPropagation()}>
                      <p className="font-semibold text-zinc-900 mb-2 whitespace-nowrap">需求说明 (Pricing 定价逻辑兼容)</p>
                      <ul className="list-decimal space-y-1.5 text-zinc-600 ml-4">
                        <li>B端修改了定价逻辑，一个模型可以对应多个分类，每个分类可以有一个定价逻辑，需要在prcing页面兼容</li>
                        <li>例如vidu支持chat和image，那么分别搜索这两个tag时候需要出现对应的价格</li>
                        <li>在All，里面显示两个定价区域</li>
                        <li>对应模型的read me的价格里面也需要适配</li>
                        <li>在模型详情页中，也需要增加对应的价格，取第一条</li>
                      </ul>
                    </PopoverContent>
                  </Popover>
                )}
                {item.path === "/models" && (
                  <Popover>
                    <PopoverTrigger 
                      className="absolute right-2 cursor-pointer text-[10px] font-semibold text-zinc-900 bg-indigo-200/60 px-1.5 py-0.5 rounded border border-indigo-300/50 hover:bg-indigo-300/80 transition-colors" 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} 
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      【2026616需求】
                    </PopoverTrigger>
                    <PopoverContent side="right" align="start" className="w-[900px] max-w-[90vw] p-0 text-sm bg-white text-zinc-800 shadow-2xl border border-zinc-200/80 rounded-xl overflow-hidden z-[100000]" onClick={(e) => e.stopPropagation()}>
                      <div className="max-h-[85vh] overflow-y-auto p-6 space-y-8 font-sans">
                        
                        {/* Section 1 */}
                        <div>
                          <h3 className="text-lg font-bold text-zinc-900 mb-2 border-b pb-2">多模态理解模型 — Playground 文件上传支持</h3>
                          <p className="text-zinc-600 mb-4">这类模型用于理解和分析用户上传的文件（非生成类），支持在输入框上传文件</p>
                          <div className="overflow-x-auto rounded-lg border border-zinc-200">
                            <table className="min-w-full divide-y divide-zinc-200 text-xs">
                              <thead className="bg-zinc-50">
                                <tr>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">模型 ID</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">厂商</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">支持的输入类型</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">说明</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-zinc-200 bg-white">
                                <tr><td className="px-3 py-2">minimax-M3</td><td className="px-3 py-2">MiniMax</td><td className="px-3 py-2">文本 + 图片 + 视频</td><td className="px-3 py-2">原生多模态，1M 上下文，支持图片和视频理解</td></tr>
                                <tr><td className="px-3 py-2">Qwen3.6-plus</td><td className="px-3 py-2">阿里</td><td className="px-3 py-2">文本 + 图片 + 视频</td><td className="px-3 py-2">原生多模态推理，1M 上下文，支持图像与视频分析</td></tr>
                                <tr><td className="px-3 py-2">Qwen3.5-omni-flash</td><td className="px-3 py-2">阿里</td><td className="px-3 py-2">文本 + 图片 + 音频 + 视频</td><td className="px-3 py-2">全模态，支持 10h+ 音频 / 400s+ 视频输入，113 种语言语音识别</td></tr>
                                <tr><td className="px-3 py-2">Seed-1.6-250915</td><td className="px-3 py-2">字节</td><td className="px-3 py-2">文本 + 图片 + 视频</td><td className="px-3 py-2">支持 256K 上下文，图片/视频理解 + 深度思考</td></tr>
                                <tr><td className="px-3 py-2">Seed-1.6-flash-250915</td><td className="px-3 py-2">字节</td><td className="px-3 py-2">文本 + 图片 + 视频</td><td className="px-3 py-2">Seed 1.6 轻量版，同样支持图片/视频输入</td></tr>
                                <tr><td className="px-3 py-2">Seed-1.8-251228</td><td className="px-3 py-2">字节</td><td className="px-3 py-2">文本 + 图片 + 视频</td><td className="px-3 py-2">通用 Agent 模型，支持 1280 帧超长视频理解，256K 上下文</td></tr>
                                <tr><td className="px-3 py-2">Seed-2.0-mini-260215</td><td className="px-3 py-2">字节</td><td className="px-3 py-2">文本 + 图片 + 音频 + 视频</td><td className="px-3 py-2">全模态理解，低时延/高并发/低成本版</td></tr>
                                <tr><td className="px-3 py-2">Seed-2.0-lite-260215</td><td className="px-3 py-2">字节</td><td className="px-3 py-2">文本 + 图片 + 音频 + 视频</td><td className="px-3 py-2">全模态理解，首款豆包全模态理解模型，性价比版</td></tr>
                                <tr><td className="px-3 py-2">Seed-2.0-pro-260328</td><td className="px-3 py-2">字节</td><td className="px-3 py-2">文本 + 图片 + 音频 + 视频</td><td className="px-3 py-2">全模态理解旗舰版，视觉/空间/视频理解 + 实时视频流分析</td></tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Section 2 */}
                        <div>
                          <h3 className="text-lg font-bold text-zinc-900 mb-2 border-b pb-2">支持引用素材（image_mode: "references"）</h3>
                          <p className="text-zinc-600 mb-4">这类模型在 Playground 的 prompt 区域支持 @ 引用已上传的图片/视频/音频，作为风格参考、角色参考、原图编辑等，不区分槽位顺序。</p>
                          
                          <h4 className="font-bold text-zinc-800 mt-4 mb-2">图像模型</h4>
                          <div className="overflow-x-auto rounded-lg border border-zinc-200">
                            <table className="min-w-full divide-y divide-zinc-200 text-xs">
                              <thead className="bg-zinc-50">
                                <tr>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">模型 ID</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">厂商</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">模态</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">引用类型</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">说明</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-zinc-200 bg-white">
                                <tr><td className="px-3 py-2">image-01</td><td className="px-3 py-2">MiniMax</td><td className="px-3 py-2">图像</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">图生图，subject_reference 支持角色/物体一致性</td></tr>
                                <tr><td className="px-3 py-2">qwen-image-2.0-pro</td><td className="px-3 py-2">阿里</td><td className="px-3 py-2">图像</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Qwen 图像编辑，基于参考图修改（/v1/images/edits）</td></tr>
                                <tr><td className="px-3 py-2">wan2.7-image-pro</td><td className="px-3 py-2">阿里</td><td className="px-3 py-2">图像</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Wan 图像编辑，参考原图做修改（/v1/images/edits）</td></tr>
                                <tr><td className="px-3 py-2">viduq2</td><td className="px-3 py-2">Vidu</td><td className="px-3 py-2">图像</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Q2 图片生成，支持 1~7 张参考图（reference2image），1080P~4K</td></tr>
                                <tr><td className="px-3 py-2">seedream-4-0-250828</td><td className="px-3 py-2">BytePlus</td><td className="px-3 py-2">图像</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Seedream 4.0 图生图，支持多图参考 + 组图生成</td></tr>
                                <tr><td className="px-3 py-2">seedream-4-5-251128</td><td className="px-3 py-2">BytePlus</td><td className="px-3 py-2">图像</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Seedream 4.5 图生图，支持多图参考 + 组图生成</td></tr>
                                <tr><td className="px-3 py-2">seedream-5-0-260128</td><td className="px-3 py-2">BytePlus</td><td className="px-3 py-2">图像</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Seedream 5.0 图生图，支持多图参考 + 组图生成</td></tr>
                                <tr><td className="px-3 py-2">kling-v3-omni</td><td className="px-3 py-2">Kling</td><td className="px-3 py-2">图像</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">V3 全能，image2image + series_image + element_control，最高 2K</td></tr>
                                <tr><td className="px-3 py-2">kling-v3</td><td className="px-3 py-2">Kling</td><td className="px-3 py-2">图像</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">V3 旗舰，image2image + element_control，1K/2K</td></tr>
                                <tr><td className="px-3 py-2">kling-image-o1</td><td className="px-3 py-2">Kling</td><td className="px-3 py-2">图像</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">最新旗舰图片模型，image2image + element_control(multi-image) + restyle，最高 2K</td></tr>
                                <tr><td className="px-3 py-2">kling-v2</td><td className="px-3 py-2">Kling</td><td className="px-3 py-2">图像</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">V2 标准，image2image(multi-image) + restyle</td></tr>
                                <tr><td className="px-3 py-2">kling-v2-new</td><td className="px-3 py-2">Kling</td><td className="px-3 py-2">图像</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">V2 新版，仅支持风格迁移 restyle（输出分辨率与输入一致）</td></tr>
                              </tbody>
                            </table>
                          </div>

                          <h4 className="font-bold text-zinc-800 mt-6 mb-2">视频模型 — 图生视频（单图引用）</h4>
                          <div className="overflow-x-auto rounded-lg border border-zinc-200">
                            <table className="min-w-full divide-y divide-zinc-200 text-xs">
                              <thead className="bg-zinc-50">
                                <tr>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">模型 ID</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">厂商</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">模态</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">引用类型</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">说明</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-zinc-200 bg-white">
                                <tr><td className="px-3 py-2">wan2.7-i2v</td><td className="px-3 py-2">阿里</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Wan 图生视频，@ 参考图驱动生成</td></tr>
                                <tr><td className="px-3 py-2">wan2.7-r2v</td><td className="px-3 py-2">阿里</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Wan 参考生视频（reference-to-video）</td></tr>
                                <tr><td className="px-3 py-2">vidu-q3-pro</td><td className="px-3 py-2">Vidu</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Q3 旗舰，img2video，画质最优，540P1080P，116S</td></tr>
                                <tr><td className="px-3 py-2">vidu-q3-turbo</td><td className="px-3 py-2">Vidu</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Q3 快速，img2video + reference2video，速度与性价比兼顾，540P~1080P</td></tr>
                                <tr><td className="px-3 py-2">vidu-q3-pro-fast</td><td className="px-3 py-2">Vidu</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Q3 极速，img2video，生成速度最快，720P1080P，116S</td></tr>
                                <tr><td className="px-3 py-2">vidu-q3</td><td className="px-3 py-2">Vidu</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Q3 参考，reference2video，性价比最高，540P1080P，316S</td></tr>
                                <tr><td className="px-3 py-2">kling-v3-omni</td><td className="px-3 py-2">Kling</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">V3 全能，img2video + multi-shot + element_control + 参考视频</td></tr>
                                <tr><td className="px-3 py-2">kling-v3</td><td className="px-3 py-2">Kling</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">V3 旗舰，img2video + multi-shot + element_control，1K/2K</td></tr>
                                <tr><td className="px-3 py-2">kling-video-o1</td><td className="px-3 py-2">Kling</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">最新旗舰视频模型，img2video（首帧/首尾帧）+ element_control</td></tr>
                                <tr><td className="px-3 py-2">kling-v2-5-turbo</td><td className="px-3 py-2">Kling</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">V2.5 加速版，img2video，std(720P) / pro(1080P)</td></tr>
                                <tr><td className="px-3 py-2">kling-v2-1-master</td><td className="px-3 py-2">Kling</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">V2.1 大师级，img2video，1080P 24fps，5S/10S</td></tr>
                                <tr><td className="px-3 py-2">dreamina-seedance-2-0-260128</td><td className="px-3 py-2">BytePlus</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Seedance 2.0 图生视频</td></tr>
                                <tr><td className="px-3 py-2">dreamina-seedance-2-0-fast-260128</td><td className="px-3 py-2">BytePlus</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Seedance 2.0 Fast 图生视频</td></tr>
                                <tr><td className="px-3 py-2">seedance-1-5-pro-251215</td><td className="px-3 py-2">BytePlus</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Seedance 1.5 Pro 图生视频</td></tr>
                                <tr><td className="px-3 py-2">seedance-1-0-pro-250528</td><td className="px-3 py-2">BytePlus</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Seedance 1.0 Pro 图生视频</td></tr>
                                <tr><td className="px-3 py-2">seedance-1-0-pro-fast-251015</td><td className="px-3 py-2">BytePlus</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">Seedance 1.0 Pro Fast 图生视频</td></tr>
                                <tr><td className="px-3 py-2">MiniMax-Hailuo-2.3</td><td className="px-3 py-2">MiniMax</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">海螺 2.3 图生视频</td></tr>
                                <tr><td className="px-3 py-2">MiniMax-Hailuo-2.3-Fast</td><td className="px-3 py-2">MiniMax</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">海螺 2.3 Fast 图生视频</td></tr>
                                <tr><td className="px-3 py-2">MiniMax-Hailuo-02</td><td className="px-3 py-2">MiniMax</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片</td><td className="px-3 py-2">海螺 02 图生视频</td></tr>
                              </tbody>
                            </table>
                          </div>

                          <h4 className="font-bold text-zinc-800 mt-6 mb-2">视频模型 — 多模态参考（图片+视频+音频）</h4>
                          <div className="overflow-x-auto rounded-lg border border-zinc-200">
                            <table className="min-w-full divide-y divide-zinc-200 text-xs">
                              <thead className="bg-zinc-50">
                                <tr>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">模型 ID</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">厂商</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">模态</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">引用类型</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">说明</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-zinc-200 bg-white">
                                <tr><td className="px-3 py-2">dreamina-seedance-2-0-260128</td><td className="px-3 py-2">BytePlus</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片+视频+音频</td><td className="px-3 py-2">Seedance 2.0 多模态参考生视频，支持 reference_image / reference_video / reference_audio</td></tr>
                                <tr><td className="px-3 py-2">dreamina-seedance-2-0-fast-260128</td><td className="px-3 py-2">BytePlus</td><td className="px-3 py-2">视频</td><td className="px-3 py-2">图片+视频+音频</td><td className="px-3 py-2">Seedance 2.0 Fast 多模态参考生视频</td></tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Section 3 */}
                        <div>
                          <h3 className="text-lg font-bold text-zinc-900 mb-2 border-b pb-2">支持首尾帧（image_mode: "keyframes"）</h3>
                          <p className="text-zinc-600 mb-4">这类模型在 Playground 渲染两个固定槽位（起始帧 / 结束帧），用户 @ 选图后填入对应位置，images[0] = 首帧，images[1] = 尾帧。</p>
                          <div className="overflow-x-auto rounded-lg border border-zinc-200">
                            <table className="min-w-full divide-y divide-zinc-200 text-xs">
                              <thead className="bg-zinc-50">
                                <tr>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">模型 ID</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">厂商</th>
                                  <th className="px-3 py-2 text-left font-bold text-zinc-800">说明</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-zinc-200 bg-white">
                                <tr><td className="px-3 py-2">wan2.2-kf2v-flash</td><td className="px-3 py-2">阿里</td><td className="px-3 py-2">Wan 2.2 首尾帧生视频（Flash 版）</td></tr>
                                <tr><td className="px-3 py-2">wan2.1-kf2v-plus</td><td className="px-3 py-2">阿里</td><td className="px-3 py-2">Wan 2.1 首尾帧生视频（Plus 版）</td></tr>
                                <tr><td className="px-3 py-2">vidu-q3-pro</td><td className="px-3 py-2">Vidu</td><td className="px-3 py-2">Q3 旗舰，start-end2video，540P1080P，116S</td></tr>
                                <tr><td className="px-3 py-2">vidu-q3-turbo</td><td className="px-3 py-2">Vidu</td><td className="px-3 py-2">Q3 快速，start-end2video，540P~1080P</td></tr>
                                <tr><td className="px-3 py-2">kling-v3-omni</td><td className="px-3 py-2">Kling</td><td className="px-3 py-2">V3 全能，start-end2video</td></tr>
                                <tr><td className="px-3 py-2">kling-v3</td><td className="px-3 py-2">Kling</td><td className="px-3 py-2">V3 旗舰，start-end2video，1K/2K</td></tr>
                                <tr><td className="px-3 py-2">kling-video-o1</td><td className="px-3 py-2">Kling</td><td className="px-3 py-2">最新旗舰，start-end2video</td></tr>
                                <tr><td className="px-3 py-2">kling-v2-5-turbo</td><td className="px-3 py-2">Kling</td><td className="px-3 py-2">V2.5 加速版，start-end2video（仅 1080P 模式支持）</td></tr>
                                <tr><td className="px-3 py-2">dreamina-seedance-2-0-260128</td><td className="px-3 py-2">BytePlus</td><td className="px-3 py-2">Seedance 2.0 首尾帧生视频</td></tr>
                                <tr><td className="px-3 py-2">dreamina-seedance-2-0-fast-260128</td><td className="px-3 py-2">BytePlus</td><td className="px-3 py-2">Seedance 2.0 Fast 首尾帧生视频</td></tr>
                                <tr><td className="px-3 py-2">seedance-1-5-pro-251215</td><td className="px-3 py-2">BytePlus</td><td className="px-3 py-2">Seedance 1.5 Pro 首尾帧生视频</td></tr>
                                <tr><td className="px-3 py-2">seedance-1-0-pro-250528</td><td className="px-3 py-2">BytePlus</td><td className="px-3 py-2">Seedance 1.0 Pro 首尾帧生视频</td></tr>
                                <tr><td className="px-3 py-2">MiniMax-Hailuo-02</td><td className="px-3 py-2">MiniMax</td><td className="px-3 py-2">海螺 02 首尾帧生视频（start-end-to-video）</td></tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Section 4 */}
                        <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                          <ol className="list-decimal list-inside text-sm text-zinc-700 space-y-2">
                            <li>同一模型可能出现在多个分类中：例如 <code className="bg-white px-1 py-0.5 rounded border border-zinc-200">dreamina-seedance-2-0-260128</code> 同时支持图生视频（references）、首尾帧（keyframes）、多模态参考和文生视频</li>
                            <li><code className="bg-white px-1 py-0.5 rounded border border-zinc-200">Kling V3 Omni</code> 是全能型：同时覆盖图像和视频的几乎所有生成模式（文生图/图生图/文生视频/图生视频/首尾帧/multi-shot/element_control）</li>
                            <li><code className="bg-white px-1 py-0.5 rounded border border-zinc-200">kling-v2-5-turbo</code> 的首尾帧仅 <code className="bg-white px-1 py-0.5 rounded border border-zinc-200">pro</code> （仅1080P）模式支持：std 模式下不可用，需在 Playground 中根据所选分辨率模式动态显隐首尾帧入口。</li>
                          </ol>
                        </div>
                        
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            );
          })}
          </div>
          
          <div className="mt-auto pt-4 space-y-1 border-t border-zinc-100">
            <div className="flex items-center w-full px-3 py-2 rounded-md transition-colors hover:bg-indigo-50 group">
              <a
              href="https://discord.com/invite/W33EWChT9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center gap-3 text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              {t("Discord Community")}
            </a>
            
            <Popover>
              <PopoverTrigger 
                className="cursor-pointer text-[10px] font-semibold text-zinc-900 bg-amber-200/60 px-1.5 py-0.5 rounded border border-amber-300/50 hover:bg-amber-300/80 transition-colors ml-2" 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} 
                onPointerDown={(e) => e.stopPropagation()}
              >
                【202668 需求】
              </PopoverTrigger>
              <PopoverContent side="right" align="start" className="w-[300px] p-4 text-sm bg-white text-zinc-800 shadow-2xl border border-zinc-200/80 rounded-xl" onClick={(e) => e.stopPropagation()}>
                <p className="font-semibold text-zinc-900 mb-2">需求说明</p>
                <p className="text-zinc-600">用户点击discord地址, 跳转到:<br/><a href="https://discord.com/invite/W33EWChT9" className="text-indigo-600 hover:underline break-all" target="_blank" rel="noopener noreferrer">https://discord.com/invite/W33EWChT9</a></p>
              </PopoverContent>
            </Popover>
          </div>
          
          <Link to="/requirements" className="flex items-center gap-3 px-3 py-2 mt-4 mx-3 rounded-md text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors">
            <ClipboardList className="w-4 h-4 shrink-0" />
            <div className="flex flex-col">
              <span>需求详情</span>
              <span className="text-[10px] text-indigo-400 font-normal leading-tight">原型专用，上线后不显示</span>
            </div>
          </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-zinc-200 flex flex-col gap-3">
          <div className="bg-zinc-100/80 rounded-xl p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500">{t("Balance")}</span>
              <span className="text-sm font-bold text-zinc-900">124,500</span>
            </div>
            <button className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-white border border-zinc-200 shadow-sm rounded-lg text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-300 transition-all">
              <CreditCard className="w-3.5 h-3.5" />
              {t("Add Funds")}
            </button>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {t("Sign Out")}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-zinc-200 bg-white flex items-center px-8 justify-between shrink-0">
          <h1 className="text-lg font-semibold">
            {t(allRoutes.find(item => location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path)))?.labelKey || "Dashboard")}
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative w-48" ref={workspaceRef}>
              <button 
                onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
                className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-zinc-100 rounded-md transition-colors"
              >
                <div className="flex items-center gap-2 font-bold tracking-tight text-zinc-900 overflow-hidden">
                  <div className="w-6 h-6 bg-zinc-900 rounded-md flex items-center justify-center shrink-0">
                    <span className="text-white text-[10px]">{selectedWorkspace.name.substring(0, 2).toUpperCase()}</span>
                  </div>
                  <span className="truncate text-sm">{selectedWorkspace.name}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
              </button>
              
              {isWorkspaceOpen && (
                <div className="absolute top-full right-0 mt-1 w-full min-w-[200px] bg-white rounded-xl shadow-lg border border-zinc-200 py-1 z-50 overflow-hidden">
                  <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    {t("Workspaces")}
                  </div>
                  <div className="max-h-[240px] overflow-y-auto">
                    {MOCK_WORKSPACES.map(ws => (
                      <button
                        key={ws.id}
                        onClick={() => { 
                          setSelectedWorkspace(ws); 
                          setIsWorkspaceOpen(false); 
                          
                          const newRole = ws.role || 'Administrator';
                          const newNavItems = getNavItemsForRole(newRole, ws.isEnterprise);
                          
                          const allowed = newNavItems.some(item => 
                            item.path === '/' 
                              ? location.pathname === '/' 
                              : location.pathname.startsWith(item.path)
                          );
                          
                          if (!allowed) {
                            if (newRole === 'Finance') {
                              navigate("/billing");
                            } else if (newRole === 'Developer') {
                              navigate("/keys");
                            } else {
                              navigate("/");
                            }
                          }
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                      >
                        <div className="w-6 h-6 bg-zinc-200 rounded-md flex items-center justify-center shrink-0">
                          <span className="text-zinc-600 text-[10px] font-bold">{ws.name.substring(0, 2).toUpperCase()}</span>
                        </div>
                        <span className="truncate flex-1 font-medium">{ws.name}</span>
                        {selectedWorkspace.id === ws.id && <Check className="w-4 h-4 text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DevAnnotation
              elementName="顶部用户头像与下拉菜单"
              componentType="Dropdown"
              functionDesc="提供用户快捷操作入口，如退出登录"
              interactionRule="点击头像展开下拉菜单，点击外部区域关闭"
              autoLogic="退出登录流程：1. 清除本地 Token/Session 2. 调用后端登出接口(可选) 3. 重定向至官网"
              devNotes="头像图片可从用户信息接口获取，此处为占位符"
            >
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-8 h-8 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center hover:ring-2 hover:ring-zinc-400 transition-all focus:outline-none"
                >
                  <User className="w-4 h-4 text-zinc-500" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-zinc-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-zinc-100">
                      <p className="text-sm font-medium text-zinc-900">James Developer</p>
                      <p className="text-xs text-zinc-500 truncate">james_dev@global.io</p>
                      <p className="text-[10px] text-zinc-400 mt-1.5 flex items-center gap-1 font-mono tracking-wide">
                        ID: usr_c93b8f1a2e4d
                      </p>
                    </div>
                    <div className="py-1 border-b border-zinc-100">
                      <div className="relative group">
                        <button 
                          className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            {{
                              'en': 'English',
                              'zh': '中文',
                              'es': 'Español',
                              'fr': 'Français',
                              'du': 'Deutsch'
                            }[i18n.language as string] || 'Language'}
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-400" />
                        </button>
                        
                        <div className="absolute top-0 right-full mr-1 hidden group-hover:block w-32 bg-white rounded-xl shadow-lg border border-zinc-200 py-1 z-50">
                          {[
                            { code: 'en', label: 'English' },
                            { code: 'zh', label: '中文' },
                            { code: 'es', label: 'Español' },
                            { code: 'fr', label: 'Français' },
                            { code: 'du', label: 'Deutsch' }
                          ].map(lang => (
                            <button
                              key={lang.code}
                              onClick={() => { i18n.changeLanguage(lang.code); setIsProfileOpen(false); }}
                              className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 flex items-center justify-between"
                            >
                              {lang.label}
                              {i18n.language === lang.code && <Check className="w-4 h-4 text-indigo-600" />}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button 
                        onClick={() => { setIsProfileOpen(false); navigate('/settings'); }}
                        className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                      >
                        <SettingsIcon className="w-4 h-4" />
                        {t("Settings")}
                      </button>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      {t("Sign Out")}
                    </button>
                  </div>
                )}
              </div>
            </DevAnnotation>
          </div>
        </header>
        <div className={cn("flex-1 overflow-auto", !location.pathname.includes('/playground') && "p-8")}>
          <Outlet context={{ userRole, isEnterprise, selectedWorkspace }} />
        </div>
      </main>
    </div>
  );
}
