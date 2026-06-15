import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, Mail, Lock, Eye, EyeOff, Shield, UserCircle } from "lucide-react";
import { useAuth, type Role } from "@/hooks/use-auth";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("user");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/dashboard" : "/user/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(role, email, role === "admin" ? "Admin User" : "Citizen User");
      navigate(role === "admin" ? "/dashboard" : "/user/dashboard");
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="h-screen relative flex items-center justify-center p-4 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

      <div className="relative w-full max-w-4xl glass-card grid md:grid-cols-5 overflow-hidden animate-slide-up">
        {/* Left - Branding Panel */}
        <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center p-10 gradient-primary relative">
          <div className="absolute inset-0 bg-foreground/10" />
          <div className="relative z-10 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm">
              <Building2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-primary-foreground">CityOS</h1>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Smart City Management Platform for modern urban governance
            </p>
          </div>
        </div>

        {/* Right - Form Panel */}
        <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
          <div className="text-center mb-6 md:hidden">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-primary mb-3 glow-primary">
              <Building2 className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary">CityOS</h1>
          </div>

          <h2 className="text-xl font-bold text-foreground mb-1 hidden md:block">Welcome back</h2>
          <p className="text-muted-foreground text-sm mb-6 hidden md:block">Sign in to your account</p>

          <div className="flex gap-2 mb-5 p-1 rounded-xl bg-muted/50 border border-border">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                role === "user"
                  ? "bg-card shadow-sm text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <UserCircle className="w-4 h-4" />
              Citizen
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                role === "admin"
                  ? "bg-card shadow-sm text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Shield className="w-4 h-4" />
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === "admin" ? "admin@cityos.gov" : "citizen@email.com"}
                  className="w-full input-glass pl-11 py-2.5 text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-muted-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full input-glass pl-11 pr-11 py-2.5 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline text-xs">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 py-2.5 text-sm"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                `Sign In as ${role === "admin" ? "Admin" : "Citizen"}`
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-5">
            Don't have an account? {" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

