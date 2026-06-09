import { useState, useRef, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Box, CreditCard, Key, LogOut, Globe, FileText, Settings as SettingsIcon, User, Tag, Image as ImageIcon, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useTranslation } from "react-i18next";
import { DevAnnotation } from "@/components/DevAnnotation";

const navItems = [
  { icon: LayoutDashboard, labelKey: "Dashboard", path: "/" },
  { icon: Box, labelKey: "Models", path: "/models" },
  { icon: ImageIcon, labelKey: "Asset Library", path: "/assets" },
  { icon: Tag, labelKey: "Pricing", path: "/pricing" },
  { icon: CreditCard, labelKey: "Billing", path: "/billing" },
  { icon: Key, labelKey: "API Keys", path: "/keys" },
  { icon: FileText, labelKey: "Logs", path: "/logs" },
  { icon: SettingsIcon, labelKey: "Settings", path: "/settings" },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    // 1. Clear local Token/Session
    // localStorage.removeItem("token");
    // 2. Call backend logout API (optional)
    // 3. Redirect to official website
    window.location.href = "https://www.example.com"; // Placeholder for official website
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="flex h-screen w-full bg-zinc-50 text-zinc-950 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 bg-white flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="w-8 h-8 bg-zinc-900 rounded-md flex items-center justify-center">
              <span className="text-white text-sm">PT</span>
            </div>
            Powertokens
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
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
                      【202668 需求】
                    </PopoverTrigger>
                    <PopoverContent side="right" align="start" className="w-[350px] p-4 text-sm bg-white text-zinc-800 shadow-2xl border border-zinc-200/80 rounded-xl" onClick={(e) => e.stopPropagation()}>
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
              </div>
            );
          })}
          
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
        </nav>

        <div className="p-4 border-t border-zinc-200 space-y-1">
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
            {t(navItems.find(item => location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path)))?.labelKey || "Dashboard")}
          </h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors px-2 py-1 rounded-md hover:bg-zinc-100"
            >
              <Globe className="w-4 h-4" />
              {i18n.language === 'en' ? 'EN' : '中'}
            </button>
            <div className="text-sm text-zinc-500">{t("Balance")}: <span className="font-semibold text-zinc-900">124,500 {t("credits")}</span></div>
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
          <Outlet />
        </div>
      </main>
    </div>
  );
}
