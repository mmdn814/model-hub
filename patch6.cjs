const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

const targetBlock = `          <div className="flex items-center justify-between p-5 bg-zinc-50 border border-zinc-100 rounded-2xl">
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
          </div>`;

const replaceBlock = `          <div className="flex items-center justify-between p-5 bg-zinc-50 border border-zinc-100 rounded-2xl">
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
          </div>`;

code = code.replace(targetBlock, replaceBlock);

// Inject isChangingPassword state
const oldStateVars = `  const [passwordLoginEnabled, setPasswordLoginEnabled] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);`;

const newStateVars = `  const [passwordLoginEnabled, setPasswordLoginEnabled] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);`;

code = code.replace(oldStateVars, newStateVars);

// Update dialog text
const oldDialogTitle = `{t("Set Password")}`;
const newDialogTitle = `{isChangingPassword ? t("Change Password") : t("Set Password")}`;
code = code.replace(oldDialogTitle, newDialogTitle);

const oldDialogDesc = `{t("Create a password to enable password login. It must be at least 8 characters long and contain both uppercase and lowercase letters.")}`;
const newDialogDesc = `{isChangingPassword ? t("Enter a new password for your account. It must be at least 8 characters long and contain both uppercase and lowercase letters.") : t("Create a password to enable password login. It must be at least 8 characters long and contain both uppercase and lowercase letters.")}`;
code = code.replace(oldDialogDesc, newDialogDesc);

const oldEnableBtn = `{t("Enable Password Login")}`;
const newEnableBtn = `{isChangingPassword ? t("Update Password") : t("Enable Password Login")}`;
code = code.replace(oldEnableBtn, newEnableBtn);

fs.writeFileSync('src/pages/Settings.tsx', code);
console.log('Settings.tsx patched successfully');
