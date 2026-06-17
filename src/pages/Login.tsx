import { useState } from "react";
import { Github, Mail, ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

type AuthView = 'login' | 'signup' | 'forgot-password' | 'link-sent-signup' | 'link-sent-reset' | 'set-password' | 'reset-password';

export default function Login() {
  const navigate = useNavigate();
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    navigate("/");
  };

  const handleAction = (e: React.FormEvent, nextView: AuthView) => {
    e.preventDefault();
    // Clear errors and fields when changing views
    setPasswordError('');
    if (nextView !== 'set-password' && nextView !== 'reset-password') {
      setPassword('');
      setConfirmPassword('');
    }
    setView(nextView);
  };

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) return "Must be at least 8 characters.";
    if (!/[A-Z]/.test(pwd)) return "Must contain at least one uppercase letter.";
    if (!/[a-zA-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return "Must contain letters and numbers.";
    return "";
  };

  const handleSetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError('');
    
    // Switch to login view after password is set
    setView('login');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mx-auto mb-4 cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-white font-bold text-xl">AI</span>
          </div>
          
          {view === 'login' && (
            <>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>Sign in to your account to continue</CardDescription>
            </>
          )}
          {view === 'signup' && (
            <>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <Popover>
                  <PopoverTrigger className="cursor-pointer text-[10px] font-semibold text-zinc-900 bg-amber-200/60 px-1.5 py-0.5 rounded border border-amber-300/50 hover:bg-amber-300/80 transition-colors">
                    【需求详情2026617】
                  </PopoverTrigger>
                  <PopoverContent side="right" align="start" className="w-[450px] p-4 text-sm bg-white text-zinc-800 shadow-2xl border border-zinc-200/80 rounded-xl z-[100000]">
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                      <div>
                        <h4 className="font-bold text-zinc-900 mb-1">一、 新增邮箱密码认证体系</h4>
                        <ol className="list-decimal space-y-1 text-zinc-600 ml-4">
                          <li><strong>邮箱注册流程：</strong>用户输入邮箱 -&gt; 系统发送专属注册/验证链接 -&gt; 用户点击链接跳转至设置密码页面 -&gt; 完成密码设置并通过后，注册成功。</li>
                          <li><strong>邮箱登录流程：</strong>用户使用已注册的邮箱和密码进行常规登录。</li>
                          <li><strong>找回密码功能：</strong>登录页提供“忘记密码”入口 -&gt; 输入绑定的邮箱即可发送重置密码的邮件链接。</li>
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 mb-1">二、 第三方登录兼容与账号关联 (Account Linking)</h4>
                        <ol className="list-decimal space-y-1 text-zinc-600 ml-4">
                          <li><strong>支持的第三方：</strong>继续兼容现有的 Google 和 GitHub OAuth 2.0 登录。</li>
                          <li><strong>Settings 页面绑定入口：</strong>已登录的用户可以在设置页内看到关联管理模块，显示当前绑定的状态（邮箱、Google、GitHub），并提供“关联” 按钮（暂不提供解绑功能）。</li>
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 mb-1">三、 账号绑定逻辑与边界条件</h4>
                        <ol className="list-decimal space-y-2 text-zinc-600 ml-4">
                          <li>
                            <strong>唯一性原则：</strong>
                            <ul className="list-disc ml-4 space-y-1">
                              <li>一个社交账号凭据（如特定的 Google 账号 ID 或 GitHub 账号 ID）在全系统中只能关联唯一的一个用户 ID (User ID)。</li>
                              <li>共享数据：一旦账号成功绑定在同一个 User ID 下，无论用户后续通过密码、Google 还是 GitHub 登录，进入的都是同一个账户，共享余额、密钥配置及日志。</li>
                            </ul>
                          </li>
                          <li>
                            <strong>同名邮箱隔离原则（不支持默认静默合并）：</strong>
                            <ul className="list-disc ml-4 space-y-1">
                              <li>行为描述：如果用户通过 x@gmail.com 使用 Google 快捷登录创建了账户 A。之后他又主动选择“邮箱注册”，使用 x@gmail.com 走了发链接设密码的流程，这将创建全新的账户 B。</li>
                              <li>系统界定：对于系统而言，账户 A 和账户 B 是两个互不关联的独立账户。</li>
                            </ul>
                          </li>
                          <li>
                            <strong>绑定操作的冲突处理：</strong>
                            <ul className="list-disc ml-4 space-y-1">
                              <li>自主注册账户的绑定：通过邮箱/密码注册的账户，可以去 Settings 里绑定未被其他账户记录过的 Google 或 GitHub。</li>
                              <li>第三方账户的绑定：仅通过 Google 登录建立的账户，可以绑定未记录过的 GitHub（反之亦然）。</li>
                              <li>冲突拦截：如果用户 B 尝试去绑定已经被用户 A 绑定过的 Google 或 GitHub 账号，系统将拦截并返回错误提示弹窗：“该 Google/GitHub 账号已被其他用户绑定，请先在原账户解绑或联系系统支持。”</li>
                            </ul>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <CardDescription>Enter your email to get started</CardDescription>
            </>
          )}
          {view === 'forgot-password' && (
            <>
              <CardTitle className="text-2xl">Reset password</CardTitle>
              <CardDescription>We'll send you a link to reset your password</CardDescription>
            </>
          )}
          {(view === 'link-sent-signup' || view === 'link-sent-reset') && (
            <>
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Mail className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl">Check your email</CardTitle>
              <CardDescription>
                We've sent a link to <span className="font-medium text-zinc-900">{email || "your email"}</span>. 
                Click it to continue.
              </CardDescription>
            </>
          )}
          {view === 'set-password' && (
            <>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Set your password</CardTitle>
                <Popover>
                  <PopoverTrigger className="cursor-pointer text-[10px] font-semibold text-zinc-900 bg-amber-200/60 px-1.5 py-0.5 rounded border border-amber-300/50 hover:bg-amber-300/80 transition-colors">
                    【需求详情2026617】
                  </PopoverTrigger>
                  <PopoverContent side="right" align="start" className="w-[350px] p-4 text-sm bg-white text-zinc-800 shadow-2xl border border-zinc-200/80 rounded-xl z-[100000]">
                    <ul className="list-decimal space-y-1.5 text-zinc-600 ml-4">
                      <li><strong className="text-zinc-900">密码规则校验：</strong>要求密码至少包含8个字符，并且必须包含至少一个大写字母、小写字母和数字。</li>
                      <li><strong className="text-zinc-900">双重密码确认：</strong>新增了“确认密码”的输入框，并且有即时的错误提示（包括密码不匹配以及不满足规则的提示）。</li>
                      <li><strong className="text-zinc-900">注册后的流程：</strong>密码一旦成功设立或重置后，页面不会直接跳转进入主页，而是会自动跳回系统的常规 Login（登录）视图。接下来，用户需要输入他们的邮箱和刚刚设置的新密码进行登录，验证成功后才会进入到系统的主体 Dashboard。</li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
              <CardDescription>Secure your new account with a password</CardDescription>
            </>
          )}
          {view === 'reset-password' && (
            <>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">New password</CardTitle>
                <Popover>
                  <PopoverTrigger className="cursor-pointer text-[10px] font-semibold text-zinc-900 bg-amber-200/60 px-1.5 py-0.5 rounded border border-amber-300/50 hover:bg-amber-300/80 transition-colors">
                    【需求详情2026617】
                  </PopoverTrigger>
                  <PopoverContent side="right" align="start" className="w-[350px] p-4 text-sm bg-white text-zinc-800 shadow-2xl border border-zinc-200/80 rounded-xl z-[100000]">
                    <ul className="list-decimal space-y-1.5 text-zinc-600 ml-4">
                      <li><strong className="text-zinc-900">密码规则校验：</strong>要求密码至少包含8个字符，并且必须包含至少一个大写字母、小写字母和数字。</li>
                      <li><strong className="text-zinc-900">双重密码确认：</strong>新增了“确认密码”的输入框，并且有即时的错误提示（包括密码不匹配以及不满足规则的提示）。</li>
                      <li><strong className="text-zinc-900">注册后的流程：</strong>密码一旦成功设立或重置后，页面不会直接跳转进入主页，而是会自动跳回系统的常规 Login（登录）视图。接下来，用户需要输入他们的邮箱和刚刚设置的新密码进行登录，验证成功后才会进入到系统的主体 Dashboard。</li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
              <CardDescription>Enter your new password below</CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {view === 'login' && (
            <>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Input 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="relative">
                    <Input 
                      type="password" 
                      placeholder="Password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button 
                    type="button" 
                    className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
                    onClick={() => setView('forgot-password')}
                  >
                    Forgot password?
                  </button>
                </div>
                <Button className="w-full" type="submit">
                  Sign in
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-zinc-500">Or continue with</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full flex items-center gap-2 h-11" onClick={() => handleLogin()}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2 h-11" onClick={() => handleLogin()}>
                  <Github className="w-5 h-5" />
                  GitHub
                </Button>
              </div>

              <div className="text-center text-sm">
                <span className="text-zinc-500">Don't have an account? </span>
                <button type="button" className="font-medium hover:underline text-zinc-900" onClick={() => setView('signup')}>
                  Sign up
                </button>
              </div>
            </>
          )}

          {view === 'signup' && (
            <form onSubmit={(e) => handleAction(e, 'link-sent-signup')} className="space-y-4">
              <Input 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button className="w-full" type="submit">
                Continue with Email <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <div className="text-center text-sm mt-4">
                <span className="text-zinc-500">Already have an account? </span>
                <button type="button" className="font-medium hover:underline text-zinc-900" onClick={() => setView('login')}>
                  Sign in
                </button>
              </div>
            </form>
          )}

          {view === 'forgot-password' && (
            <form onSubmit={(e) => handleAction(e, 'link-sent-reset')} className="space-y-4">
              <Input 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button className="w-full" type="submit">
                Send Reset Link
              </Button>
              <div className="text-center mt-4">
                <button 
                  type="button" 
                  className="inline-flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-900" 
                  onClick={() => setView('login')}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to login
                </button>
              </div>
            </form>
          )}

          {view === 'link-sent-signup' && (
            <div className="space-y-6 pt-2">
              <div className="rounded-lg bg-zinc-50 p-4 border border-zinc-200 text-sm text-zinc-600 text-center">
                <p className="mb-3">Didn't receive the email? Check your spam folder or try again.</p>
                <button type="button" className="text-zinc-900 font-medium hover:underline">Click to resend</button>
              </div>
              
              {/* DEV Mock Button */}
              <div className="border-t border-dashed border-red-200 pt-4 text-center">
                <p className="text-[10px] uppercase font-bold text-red-500 mb-2">Dev Tools</p>
                <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50" onClick={() => setView('set-password')}>
                  [Mock] User clicks link in email
                </Button>
              </div>
            </div>
          )}

          {view === 'link-sent-reset' && (
            <div className="space-y-6 pt-2">
              <div className="rounded-lg bg-zinc-50 p-4 border border-zinc-200 text-sm text-zinc-600 text-center">
                <p className="mb-3">Didn't receive the email? Check your spam folder or try again.</p>
                <button type="button" className="text-zinc-900 font-medium hover:underline">Click to resend</button>
              </div>
              
              {/* DEV Mock Button */}
              <div className="border-t border-dashed border-red-200 pt-4 text-center">
                <p className="text-[10px] uppercase font-bold text-red-500 mb-2">Dev Tools</p>
                <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50" onClick={() => setView('reset-password')}>
                  [Mock] User clicks link in email
                </Button>
              </div>
            </div>
          )}

          {view === 'set-password' && (
            <form onSubmit={handleSetPassword} className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <Input 
                    type="password" 
                    placeholder="Create a password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Input 
                    type="password" 
                    placeholder="Confirm password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {passwordError && (
                  <p className="text-xs text-red-500 font-medium">{passwordError}</p>
                )}
                {!passwordError && (
                  <p className="text-xs text-zinc-500">Must be at least 8 characters, contain letters, numbers, and an uppercase letter.</p>
                )}
              </div>
              <Button className="w-full" type="submit">
                Complete Registration
              </Button>
            </form>
          )}

          {view === 'reset-password' && (
            <form onSubmit={handleSetPassword} className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <Input 
                    type="password" 
                    placeholder="New password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Input 
                    type="password" 
                    placeholder="Confirm new password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {passwordError && (
                  <p className="text-xs text-red-500 font-medium">{passwordError}</p>
                )}
                {!passwordError && (
                  <p className="text-xs text-zinc-500">Must be at least 8 characters, contain letters, numbers, and an uppercase letter.</p>
                )}
              </div>
              <Button className="w-full" type="submit">
                Update Password
              </Button>
            </form>
          )}

        </CardContent>
      </Card>
    </div>
  );
}

