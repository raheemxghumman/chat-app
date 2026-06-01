import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, MessageCircle, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const validate = () => {
    if (!formData.fullName.trim()) { toast.error("Full name is required"); return false; }
    if (!formData.email.trim()) { toast.error("Email is required"); return false; }
    if (!/\S+@\S+\.\S+/.test(formData.email)) { toast.error("Invalid email format"); return false; }
    if (!formData.password) { toast.error("Password is required"); return false; }
    if (formData.password.length < 6) { toast.error("Password must be at least 6 characters"); return false; }
    return true;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (validate()) signup(formData); };

  return (
    <div className="app-shell flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to="/login" className="mb-8 flex items-center justify-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl" style={{ background: "var(--accent-grad)" }}>
            <MessageCircle className="size-5" style={{ color: "#0b0b14" }} strokeWidth={2.5} />
          </div>
          <h1 className="text-lg font-bold">Pulse</h1>
        </Link>

        <div className="card-glass p-8">
          <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--txt-2)" }}>Set up your profile and start chatting in seconds.</p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--txt-3)" }}>Full Name</span>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" style={{ color: "var(--txt-3)" }} />
                <input type="text" className="input-base" placeholder="Jane Doe"
                  value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--txt-3)" }}>Email</span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" style={{ color: "var(--txt-3)" }} />
                <input type="email" className="input-base" placeholder="you@example.com"
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--txt-3)" }}>Password</span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" style={{ color: "var(--txt-3)" }} />
                <input type={showPassword ? "text" : "password"} className="input-base pr-10" placeholder="At least 6 characters"
                  value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--txt-3)" }}>
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </label>

            <button type="submit" disabled={isSigningUp} className="btn-gradient mt-2 flex w-full items-center justify-center gap-2">
              {isSigningUp ? <><Loader2 className="size-4 animate-spin" /> Creating...</> : <>Create account <ArrowRight className="size-4" /></>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm" style={{ color: "var(--txt-2)" }}>
            Already have an account?{" "}
            <Link to="/login" className="font-semibold" style={{ color: "var(--accent)" }}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
