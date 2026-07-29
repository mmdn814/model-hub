const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

const newImports = `
import { ShieldCheck, KeyRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DevAnnotation } from "@/components/DevAnnotation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
`;

code = code.replace(/import \{ ShieldCheck \} from "lucide-react";\nimport \{ useTranslation \} from "react-i18next";\nimport \{ DevAnnotation \} from "@\/components\/DevAnnotation";\nimport \{ Button \} from "@\/components\/ui\/button";/, newImports.trim());

// Update the Security section
const targetSecurity = `
      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <ShieldCheck className="w-5 h-5 text-blue-500" />
          <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase">
            {t("Security")}
          </h3>
        </div>

        <div className="max-w-md space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{t("New Password")}</label>
            <input 
              type="password" 
              placeholder={t("Enter new password")}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{t("Confirm Password")}</label>
            <input 
              type="password" 
              placeholder={t("Confirm new password")}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button className="w-full bg-[#0f172a] hover:bg-slate-800 text-white rounded-xl h-11 mt-2">
            {t("Update Password")}
          </Button>
        </div>
      </div>
`;

const replacementSecurity = `
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
            <Switch 
              checked={passwordLoginEnabled} 
              onCheckedChange={(checked) => {
                if (checked) {
                  setShowPasswordDialog(true);
                } else {
                  setPasswordLoginEnabled(false);
                }
              }} 
            />
          </div>
        </div>
      </div>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6" />
            </div>
            <DialogTitle className="text-xl">{t("Set Password")}</DialogTitle>
            <DialogDescription>
              {t("Create a password to enable password login. It must be at least 8 characters long and contain both uppercase and lowercase letters.")}
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
              {t("Enable Password Login")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
`;

code = code.replace(targetSecurity, replacementSecurity);

// Inject state variables
const stateVars = `
  const [passwordLoginEnabled, setPasswordLoginEnabled] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
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
`;

code = code.replace(/const \{ t \} = useTranslation\(\);\n/, `const { t } = useTranslation();\n${stateVars}`);

fs.writeFileSync('src/pages/Settings.tsx', code);
console.log('Updated Settings.tsx successfully');
