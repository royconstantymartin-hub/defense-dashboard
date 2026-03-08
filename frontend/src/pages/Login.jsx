import { useState } from "react";
import { useAuth, API } from "@/App";
import { useNavigate, Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shield, Mail, Lock, User, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegister) {
        await register(formData.email, formData.password, formData.name);
        toast.success("Account created successfully!");
      } else {
        await login(formData.email, formData.password);
        toast.success("Welcome back!");
      }
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.detail || "Authentication failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-4"
      data-testid="login-page"
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-sm flex items-center justify-center">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-xl text-white tracking-tight">DEFENSE</h1>
            <p className="text-[10px] font-mono text-zinc-500 tracking-widest">INTELLIGENCE HUB</p>
          </div>
        </div>

        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader className="text-center pb-2">
            <CardTitle className="font-heading text-xl text-white">
              {isRegister ? "Create Account" : "Welcome Back"}
            </CardTitle>
            <p className="text-sm text-zinc-500 mt-1">
              {isRegister 
                ? "Register to access admin features" 
                : "Sign in to your account"
              }
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-400">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
                      required={isRegister}
                      data-testid="name-input"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-400">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
                    required
                    data-testid="email-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-400">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
                    required
                    data-testid="password-input"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-sm p-3">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-sm"
                disabled={loading}
                data-testid="submit-button"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isRegister ? "Creating Account..." : "Signing In..."}
                  </span>
                ) : (
                  isRegister ? "Create Account" : "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError("");
                }}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
                data-testid="toggle-auth-mode"
              >
                {isRegister 
                  ? "Already have an account? Sign in" 
                  : "Don't have an account? Register"
                }
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-zinc-600 mt-6">
          Defense Intelligence Hub • Secure Access
        </p>
      </div>
    </div>
  );
}
