import { ShieldCheck, Globe, Github, Mail, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DevAnnotation } from "@/components/DevAnnotation";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const { t } = useTranslation();
  
  // Mock states for account linking
  const [emailConnected, setEmailConnected] = useState(true);
  const [googleConnected, setGoogleConnected] = useState(false);
  const [githubConnected, setGithubConnected] = useState(false);

  // Scenario 2 (One other login method detected)
  const [showScenario2, setShowScenario2] = useState(false);

  // Scenario 3 (Two other login methods detected)
  const [showScenario3, setShowScenario3] = useState(false);
  const [s3GoogleVerified, setS3GoogleVerified] = useState(false);
  const [s3GithubVerified, setS3GithubVerified] = useState(false);

  const handleConnect = (type: "Google" | "GitHub") => {
    if (type === "GitHub") {
      setGithubConnected(true);
    } else {
      setGoogleConnected(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-[#0f172a] tracking-tight mb-2">
          {t("Settings")}
        </h1>
        <p className="text-lg text-slate-500">
          {t("Manage your account preferences, security, and billing configurations.")}
        </p>
      </div>

      <DevAnnotation
        elementName="个人资料卡片"
        componentType="Card"
        functionDesc="展示当前登录用户的基本信息和用户等级标识"
        dataSource="当前登录用户的会话信息 (User Session) / 订阅服务API"
        autoLogic="Tier 0(Free): 仅注册或Pro余额耗尽。Tier 1(Pro): 余额>0且曾购买；余额=0且无自动充值1小时内降级Free。Tier 2(Scale): 绑卡且激活自动充值；关闭自动充值降级Pro，扣款失败且余额耗尽降级Free。"
        devNotes="标签仅显示 FREE、PRO 或 SCALE。不同等级对应不同的 API 速率限制 (Rate Limits) 和服务保障。"
      >
        <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 bg-[#e0f2fe] text-[#0284c7] rounded-3xl flex items-center justify-center text-4xl font-black shadow-inner">
              JD
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#0f172a] mb-1">
                {t("James Developer")}
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-xl text-slate-500">{t("james_dev@global.io")}</span>
                <span className="text-sm text-slate-400 font-mono ml-2 border-l border-slate-200 pl-3">ID: usr_c93b8f1a2e4d</span>
                <DevAnnotation
                  customContent={
                    <div className="space-y-3 text-sm">
                      <div className="font-bold text-base border-b border-[#fbc02d] pb-1 mb-2">用户等级体系 (User Tiers)</div>
                      <p>系统根据用户的付费行为和余额状态动态划分等级，对应不同的速率限制：</p>
                      
                      <div className="space-y-1">
                        <div className="font-bold text-[#f57f17]">Tier 0: Free (基础用户)</div>
                        <div className="pl-2">
                          <span className="font-semibold">准入：</span>仅完成注册，或 Pro 用户余额耗尽。<br/>
                          <span className="font-semibold">权益：</span>例如较低的并发数 (如 5 RPM)，仅限免费基础模型测试。
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="font-bold text-[#f57f17]">Tier 1: Pro (专业用户)</div>
                        <div className="pl-2">
                          <span className="font-semibold">准入：</span>账户余额 &gt; 0<br/>
                          <span className="font-semibold">权益：</span>例如标准并发数 (如 50 RPM)，解锁所有商业化模型，支持导出 PDF 发票。<br/>
                          <span className="font-semibold">退回准则：</span>当账户余额耗尽 (Credits = 0) 且未开启自动充值时，系统自动将等级退回至 Free。
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="font-bold text-[#f57f17]">Tier 2: Scale (规模化用户)</div>
                        <div className="pl-2">
                          <span className="font-semibold">准入：</span>成功绑定支付方式并激活“自动充值”功能。<br/>
                          <span className="font-semibold">权益：</span>例如最高并发限制 (如 200 RPM)，任务优先排队，后端可以设置例如：自动充值可获额外 1%-5% 的 Credits 赠送。<br/>
                          <span className="font-semibold">退回准则：</span>若手动关闭“自动充值”，等级退回至 Pro；若扣款失败且余额耗尽，退回至 Free。
                        </div>
                      </div>
                    </div>
                  }
                >
                  <span className="bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold px-2.5 py-1 rounded-md tracking-wide uppercase">
                    {t("PRO")}
                  </span>
                </DevAnnotation>
              </div>
            </div>
          </div>
        </div>
      </DevAnnotation>

      <DevAnnotation
        elementName="账户统一测试工具 (合并流程 Demo)"
        componentType="Card"
        functionDesc="模拟多登录方式下的账户统一强制绑定流程"
        devNotes="点击按钮演示场景二和场景三弹窗。实际流程中，由于弹窗处于登录成功后的必经路径，且不可关闭，这里主要展示 UI 和交互逻辑。废弃了原来的不同邮箱绑定报错，改为相同邮箱强制合并。"
      >
        <div className="bg-indigo-50 border border-indigo-100 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-bold text-indigo-900 tracking-tight">
              {t("Account Merging Demo (v2.0)")}
            </h3>
          </div>
          <p className="text-sm text-indigo-700 mb-6 max-w-2xl">
            {t("Simulate logging in with an email that has historical accounts associated with other login methods. The user must verify them before entering the product.")}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
              onClick={() => setShowScenario2(true)}
            >
              {t("Simulate Scenario 2 (1 Other Method)")}
            </Button>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
              onClick={() => {
                setS3GoogleVerified(false);
                setS3GithubVerified(false);
                setShowScenario3(true);
              }}
            >
              {t("Simulate Scenario 3 (2 Other Methods)")}
            </Button>
          </div>
        </div>
      </DevAnnotation>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
        <DevAnnotation
          customContent={
            <div className="space-y-3 text-sm">
              <div className="font-bold text-base border-b border-[#fbc02d] pb-1 mb-2">身份认证与账号统一 (Account Merging v2.0)</div>
              <p><span className="font-semibold">核心原则：</span>同一个邮箱只对应一个 PowerTokens 用户，一个用户可以绑定多种登录方式。</p>
              
              <div className="space-y-1">
                <div className="font-bold text-[#f57f17]">相同邮箱的多历史账号合并</div>
                <div className="pl-2">
                  <span className="font-semibold">逻辑描述：</span>当用户通过某种方式（如邮箱）登录，系统检测到该邮箱曾通过其他方式（如 Google 或 GitHub）注册过历史账户时，会进入强制合并流程。<br/>
                  <span className="font-semibold">数据统一：</span>验证并绑定后，充值记录、调用日志、API Key 和素材库将全部合并到当前唯一用户。
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-[#f57f17]">废弃跨邮箱绑定</div>
                <div className="pl-2">
                  不再允许新增将 A 邮箱的 Google 登录绑定到 B 邮箱的 GitHub 登录。
                </div>
              </div>
            </div>
          }
        >
          <div className="flex items-center gap-2 mb-8">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase">
              {t("LINKED LOGIN METHODS")}
            </h3>
          </div>
        </DevAnnotation>

        <div className="space-y-4">
          
          {/* Email Password Account */}
          <DevAnnotation
            elementName="邮箱/密码 认证"
            componentType="List Item"
            functionDesc="展示邮箱注册/登录的关联状态"
            interactionRule="不可解绑"
            dataSource="当前用户会话"
            devNotes="默认为Connected表示通过邮箱注册的用户"
          >
            <div className="flex items-center justify-between bg-[#f8fafc] rounded-3xl p-4 px-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                  <Mail className="w-6 h-6 text-slate-800" />
                </div>
                <div>
                  <span className="text-xl font-bold text-[#0f172a] block">
                    {t("Email & Password")}
                  </span>
                  <span className="text-xs text-slate-500">james_dev@global.io</span>
                </div>
              </div>
              <span className="text-sm font-bold text-[#16a34a] tracking-wide uppercase">
                {t("CONNECTED")}
              </span>
            </div>
          </DevAnnotation>

          {/* Google Account */}
          <DevAnnotation
            elementName="Google 账号"
            componentType="List Item / Button"
            functionDesc="展示已关联或未关联的状态"
            interactionRule="点击可关联"
            devNotes="此模拟中点击 CONNECT 将直接变绿 (模拟成功绑定)"
          >
            <div className="flex items-center justify-between bg-[#f8fafc] rounded-3xl p-4 px-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm ${!googleConnected ? 'opacity-50' : ''}`}>
                  <Globe className="w-6 h-6 text-slate-800" />
                </div>
                <span className={`text-xl font-bold ${googleConnected ? 'text-[#0f172a]' : 'text-slate-300'}`}>
                  {t("Google Account")}
                </span>
              </div>
              {googleConnected ? (
                <span className="text-sm font-bold text-[#16a34a] tracking-wide uppercase">
                  {t("CONNECTED")}
                </span>
              ) : (
                <div className="relative group flex items-center">
                  <button 
                    onClick={() => handleConnect("Google")}
                    className="text-sm font-bold text-blue-500 tracking-wide uppercase hover:underline"
                  >
                    {t("CONNECT")}
                  </button>
                  <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-64 bg-slate-800 text-white text-xs leading-relaxed rounded-xl p-3 shadow-lg z-10 pointer-events-none">
                    {t("Once connected, logging in with either account will access this same profile on the platform.")}
                    <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                  </div>
                </div>
              )}
            </div>
          </DevAnnotation>

          {/* GitHub Account */}
          <DevAnnotation
            elementName="GitHub 账号"
            componentType="List Item / Button"
            functionDesc="提供绑定其他第三方账号的入口"
            interactionRule="点击 CONNECT 触发 OAuth 绑定流程"
          >
            <div className="flex items-center justify-between bg-[#f8fafc] rounded-3xl p-4 px-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm ${!githubConnected ? 'opacity-50' : ''}`}>
                  <Github className="w-6 h-6 text-slate-800" />
                </div>
                <span className={`text-xl font-bold ${githubConnected ? 'text-[#0f172a]' : 'text-slate-300'}`}>
                  {t("GitHub Account")}
                </span>
              </div>
              {githubConnected ? (
                <span className="text-sm font-bold text-[#16a34a] tracking-wide uppercase">
                  {t("CONNECTED")}
                </span>
              ) : (
                <div className="relative group flex items-center">
                  <button 
                    onClick={() => handleConnect("GitHub")}
                    className="text-sm font-bold text-blue-500 tracking-wide uppercase hover:underline"
                  >
                    {t("CONNECT")}
                  </button>
                </div>
              )}
            </div>
          </DevAnnotation>
        </div>
      </div>

      {/* Scenario 2 Dialog (1 Other Login Method) */}
      <Dialog open={showScenario2} onOpenChange={setShowScenario2}>
        <DialogContent className="sm:max-w-[480px] [&>button]:hidden outline-none">
          <DialogHeader className="mb-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 mb-4">
              <ShieldCheck className="h-7 w-7 text-indigo-600" aria-hidden="true" />
            </div>
            <DialogTitle className="text-center text-xl font-bold text-zinc-900">
              {t("检测到相同邮箱的其他登录方式")}
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm text-zinc-600 space-y-4">
            <p>
              我们检测到邮箱 <strong className="text-zinc-900 font-mono">james_dev@global.io</strong> 曾通过 <strong className="text-zinc-900">GitHub</strong> 登录 PowerTokens。
            </p>
            <p>
              请验证并绑定该 GitHub 登录方式。完成后，相关充值记录、调用日志、API Key 和素材库将统一到当前用户。
            </p>
            <p className="text-zinc-500">
              下次您可以使用不同的登录方式进入同一个 PowerTokens 用户。
            </p>
          </div>
          <DialogFooter className="mt-6 flex-col sm:flex-col gap-3">
            <Button 
              className="w-full bg-zinc-900 text-white hover:bg-zinc-800 h-11" 
              onClick={() => {
                setGithubConnected(true);
                setShowScenario2(false);
              }}
            >
              {t("验证并绑定 GitHub")}
            </Button>
            <Button 
              variant="ghost" 
              className="w-full text-zinc-400 hover:text-zinc-600 text-xs" 
              onClick={() => setShowScenario2(false)}
            >
              {t("（演示专用：退出模拟）")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Scenario 3 Dialog (2 Other Login Methods) */}
      <Dialog open={showScenario3} onOpenChange={setShowScenario3}>
        <DialogContent className="sm:max-w-[500px] [&>button]:hidden outline-none">
          <DialogHeader className="mb-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 mb-4">
              <ShieldCheck className="h-7 w-7 text-indigo-600" aria-hidden="true" />
            </div>
            <DialogTitle className="text-center text-xl font-bold text-zinc-900">
              {t("检测到相同邮箱的其他登录方式")}
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-sm text-zinc-600 space-y-4">
            <p>
              我们检测到邮箱 <strong className="text-zinc-900 font-mono">james_dev@global.io</strong> 曾通过以下方式登录 PowerTokens：
            </p>
            <ol className="list-decimal pl-5 space-y-1 font-medium text-zinc-800">
              <li>Google 登录</li>
              <li>GitHub 登录</li>
            </ol>
            <p>
              请依次完成验证并绑定以上登录方式。完成后，相关充值记录、调用日志、API Key 和素材库将全部统一到当前用户。
            </p>
            
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 font-mono text-sm space-y-3 mt-4">
              <div className="flex justify-between items-center text-zinc-900">
                <span>邮箱验证码</span>
                <span className="text-emerald-600 font-semibold text-xs px-2 py-1 bg-emerald-50 rounded-md">已验证</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={s3GoogleVerified ? "text-zinc-900" : "text-zinc-500"}>Google</span>
                {s3GoogleVerified ? (
                  <span className="text-emerald-600 font-semibold text-xs px-2 py-1 bg-emerald-50 rounded-md">已验证</span>
                ) : (
                  <Button 
                    size="sm" 
                    className="h-7 text-xs bg-zinc-900 hover:bg-zinc-800 text-white"
                    onClick={() => setS3GoogleVerified(true)}
                  >
                    去验证
                  </Button>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className={s3GithubVerified ? "text-zinc-900" : "text-zinc-500"}>GitHub</span>
                {s3GithubVerified ? (
                  <span className="text-emerald-600 font-semibold text-xs px-2 py-1 bg-emerald-50 rounded-md">已验证</span>
                ) : (
                  <Button 
                    size="sm" 
                    className="h-7 text-xs bg-zinc-900 hover:bg-zinc-800 text-white"
                    onClick={() => setS3GithubVerified(true)}
                  >
                    去验证
                  </Button>
                )}
              </div>
            </div>

            <p className="text-zinc-500 text-xs">
              下次您可以使用任意已绑定方式进入同一个 PowerTokens 用户。
            </p>
          </div>

          <DialogFooter className="mt-6 flex-col sm:flex-col gap-3">
            <Button 
              className="w-full h-11 bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:opacity-100" 
              disabled={!s3GoogleVerified || !s3GithubVerified}
              onClick={() => {
                setGoogleConnected(true);
                setGithubConnected(true);
                setShowScenario3(false);
              }}
            >
              {(!s3GoogleVerified || !s3GithubVerified) ? t("请先完成上方验证") : t("完成并进入产品")}
            </Button>
            <Button 
              variant="ghost" 
              className="w-full text-zinc-400 hover:text-zinc-600 text-xs" 
              onClick={() => setShowScenario3(false)}
            >
              {t("（演示专用：退出模拟）")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

