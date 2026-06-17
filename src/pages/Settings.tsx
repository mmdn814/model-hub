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
  const [showConflictDialog, setShowConflictDialog] = useState(false);
  const [conflictType, setConflictType] = useState<"Google" | "GitHub" | "">("");

  const handleConnect = (type: "Google" | "GitHub") => {
    // For demo purposes, we will trigger the conflict error for GitHub, and success for Google.
    if (type === "GitHub") {
      setConflictType(type);
      setShowConflictDialog(true);
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

      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
        <DevAnnotation
          customContent={
            <div className="space-y-3 text-sm">
              <div className="font-bold text-base border-b border-[#fbc02d] pb-1 mb-2">身份认证 (Auth) [邮箱+第三方]</div>
              <p><span className="font-semibold">认证方式：</span>支持 邮箱密码注册/登录，以及 Google 和 GitHub OAuth 2.0。</p>
              
              <div className="space-y-1">
                <div className="font-bold text-[#f57f17]">多账号关联 (Account Linking)</div>
                <div className="pl-2">
                  <span className="font-semibold">逻辑描述：</span>允许已登录用户在设置页面关联其他认证方式。<br/>
                  <span className="font-semibold">场景示例：</span>用户通过邮箱注册后，可以链接其 Google 账户。关联成功后，未来通过邮箱和 Google 登录均进入同一账户。
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-[#f57f17]">账户冲突处理与防冒领机制</div>
                <div className="pl-2">
                  <span className="font-semibold">同名邮箱隔离原则：</span>若用户使用 x@gmail.com 通过 Google 登录（账户 A），又尝试用 x@gmail.com 走邮箱注册流程（账户 B），系统视二者为两个互不关联的独立账户。<br/>
                  <span className="font-semibold">唯一性与防冒领：</span>一个社交账号在全系统只能关联唯一用户 ID。若尝试绑定一个已被其他账户绑定的社交账号，系统拦截并报错。<br/>
                  <span className="font-semibold">提示文案：</span>“该 [平台] 账号已被其他用户绑定，请先在原账户解绑或联系系统支持。”。
                </div>
              </div>
            </div>
          }
        >
          <div className="flex items-center gap-2 mb-8">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase">
              {t("LINKED ACCOUNTS")}
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
            autoLogic="此模拟中点击 CONNECT 将触发账户冲突报错"
            devNotes="演示冲突场景拦截"
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
                  <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-64 bg-slate-800 text-white text-xs leading-relaxed rounded-xl p-3 shadow-lg z-10 pointer-events-none">
                    <span className="text-red-300 font-semibold block mb-1">Demo Behavior:</span>
                    {t("Clicking this will simulate a conflict error, showing what happens when a credential is already bound to another account.")}
                    <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                  </div>
                </div>
              )}
            </div>
          </DevAnnotation>
        </div>
      </div>

      {/* Conflict Error Dialog */}
      <Dialog open={showConflictDialog} onOpenChange={setShowConflictDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <DialogTitle className="text-center text-xl">Account Linking Failed</DialogTitle>
            <DialogDescription className="text-center pt-2 text-base text-zinc-600">
              该 {conflictType} 账号已被其他用户绑定，请先在原账户解绑或联系系统支持。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button className="w-full" variant="outline" onClick={() => setShowConflictDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

