import { useState } from "react";
import { Github, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

type AuthView = 'login-password' | 'login-code' | 'code-sent';

export default function Login() {
  const navigate = useNavigate();
  const [view, setView] = useState<AuthView>('login-password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mx-auto mb-4 cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-white font-bold text-xl">AI</span>
          </div>
          
          {view === 'login-password' && (
            <>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>Sign in to your account with password</CardDescription>
            </>
          )}

          {view === 'login-code' && (
            <>
              <CardTitle className="text-2xl">Welcome</CardTitle>
              <CardDescription>Sign in or create an account with email</CardDescription>
            </>
          )}

          {view === 'code-sent' && (
            <>
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Mail className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl">Check your email</CardTitle>
              <CardDescription>
                We've sent a login link to <span className="font-medium text-zinc-900">{email || "your email"}</span>. 
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {view === 'login-password' && (
            <>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-3">
                  <Input 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button className="w-full" type="submit">
                  Sign in
                </Button>
              </form>

              <div className="text-center text-sm">
                <button type="button" className="font-medium hover:underline text-zinc-900" onClick={() => setView('login-code')}>
                  Sign in with verification code
                </button>
              </div>

              <div className="relative pt-2">
                <div className="absolute inset-0 flex items-center pt-2">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase pt-2">
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
            </>
          )}

          {view === 'login-code' && (
            <form onSubmit={(e) => { e.preventDefault(); setView('code-sent'); }} className="space-y-4">
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
                <button type="button" className="font-medium hover:underline text-zinc-900" onClick={() => setView('login-password')}>
                  Sign in with password
                </button>
              </div>
            </form>
          )}

          {view === 'code-sent' && (
            <div className="space-y-6 pt-2">
              <div className="rounded-lg bg-zinc-50 p-4 border border-zinc-200 text-sm text-zinc-600 text-center">
                <p className="mb-3">Didn't receive the email? Check your spam folder or try again.</p>
                <button type="button" className="text-zinc-900 font-medium hover:underline">Click to resend</button>
              </div>
              
              {/* DEV Mock Button */}
              <div className="border-t border-dashed border-red-200 pt-4 text-center">
                <p className="text-[10px] uppercase font-bold text-red-500 mb-2">Dev Tools</p>
                <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50" onClick={() => navigate("/")}>
                  [Mock] User clicks link in email
                </Button>
              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
