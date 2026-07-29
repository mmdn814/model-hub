import { ShieldCheck, KeyRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DevAnnotation } from "@/components/DevAnnotation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

export default function Settings() {
  const { t } = useTranslation();

  const [passwordLoginEnabled, setPasswordLoginEnabled] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSetPassword = () => {
    setPasswordError('');
    if (newPassword.length < 8) {
      setPasswordError(t('Password must be at least 8 characters long.'));
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      setPasswordError(t('Password must contain at least one uppercase letter.'));
      return;
    }
    if (!/[a-z]/.test(newPassword)) {
      setPasswordError(t('Password must contain at least one lowercase letter.'));
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      setPasswordError(t('Password must contain at least one number.'));
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError(t('Passwords do not match.'));
      return;
    }
    
    setPasswordLoginEnabled(true);
    setShowPasswordDialog(false);
    setNewPassword('');
    setConfirmPassword('');
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

      
      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <ShieldCheck className="w-5 h-5 text-blue-500" />
          <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase">
            {t("Security")}
          </h3>
        </div>

        <div className="max-w-xl space-y-6">
          <div className="flex items-center justify-between p-5 bg-zinc-50 border border-zinc-100 rounded-2xl">
            <div className="space-y-1">
              <h4 className="font-semibold text-zinc-900">{t("Password Login")}</h4>
              <p className="text-sm text-zinc-500">{t("Allow logging in with an email and password.")}</p>
            </div>
            <div className="flex items-center gap-4">
              {passwordLoginEnabled && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setNewPassword('');
                    setConfirmPassword('');
                    setPasswordError('');
                    setIsChangingPassword(true);
                    setShowPasswordDialog(true);
                  }}
                >
                  {t("Change Password")}
                </Button>
              )}
              <Switch 
                checked={passwordLoginEnabled} 
                onCheckedChange={(checked) => {
                  if (checked) {
                    setNewPassword('');
                    setConfirmPassword('');
                    setPasswordError('');
                    setIsChangingPassword(false);
                    setShowPasswordDialog(true);
                  } else {
                    setPasswordLoginEnabled(false);
                  }
                }} 
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6" />
            </div>
            <DialogTitle className="text-xl">{isChangingPassword ? t("Change Password") : t("Set Password")}</DialogTitle>
            <DialogDescription>
              {isChangingPassword ? t("Enter a new password for your account. It must be at least 8 characters long and contain both uppercase and lowercase letters.") : t("Create a password to enable password login. It must be at least 8 characters long and contain both uppercase and lowercase letters.")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">{t("New Password")}</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t("Enter new password")}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">{t("Confirm Password")}</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t("Confirm new password")}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {passwordError && (
              <p className="text-sm text-red-500 font-medium">{passwordError}</p>
            )}
            {!passwordError && (
              <ul className="text-xs text-zinc-500 space-y-1 list-disc pl-4">
                <li>{t("At least 8 characters")}</li>
                <li>{t("Contains uppercase letter")}</li>
                <li>{t("Contains lowercase letter")}</li>
                <li>{t("Contains number")}</li>
              </ul>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              {t("Cancel")}
            </Button>
            <Button onClick={handleSetPassword} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isChangingPassword ? t("Update Password") : t("Enable Password Login")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
