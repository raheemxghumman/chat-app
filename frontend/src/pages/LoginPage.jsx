import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, MessageCircle, Sparkles, Users, Zap } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => { e.preventDefault(); login(formData); };

  return (
    <div className="app-shell grid min-h-screen lg:grid-cols-2">
      {/* Left: brand */}
      <div className="relative hidden flex-col justify-between p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl" style={{ background: "var(--accent-grad)" }}>
            <MessageCircle className="size-6" style={{ color: "#0b0b14" }} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Pulse</h1>
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--txt-3)" }}>chat workspace</p>
          </div>
        </div>

        <div className="space-y-8">
          <span className="chip"><Sparkles className="size-3.5" /> A calmer way to chat</span>
          <h2 className="max-w-lg text-6xl font-bold leading-[1.05] tracking-tight">
            Conversations that <span style={{ background: "var(--accent-grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>flow</span>, not interrupt.
          </h2>
          <p className="max-w-md text-base leading-relaxed" style={{ color: "var(--txt-2)" }}>
            Pulse is a focused chat space for small teams and tight circles. Real-time, end-to-end thoughtful.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="card-flat p-4"><Zap className="mb-2 size-5" style={{ color: "var(--accent)" }} /><p className="text-sm font-medium">Realtime presence</p><p className="text-xs" style={{ color: "var(--txt-3)" }}>See who's around, instantly.</p></div>
            <div className="card-flat p-4"><Users className="mb-2 size-5" style={{ color: "var(--accent-2)" }} /><p className="text-sm font-medium">Friends only</p><p className="text-xs" style={{ color: "var(--txt-3)" }}>Curated DMs, zero noise.</p></div>
          </div>
        </div>

        <p className="text-xs" style={{ color: "var(--txt-3)" }}>© {new Date().getFullYear()} Pulse Chat</p>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex size-10 items-center justify-center rounded-xl" style={{ background: "var(--accent-grad)" }}>
              <MessageCircle className="size-5" style={{ color: "#0b0b14" }} strokeWidth={2.5} />
            </div>
            <h1 className="text-lg font-bold">Pulse</h1>
          </div>

          <div className="card-glass p-8">
            <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--txt-2)" }}>Sign in to pick up where you left off.</p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
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
                  <input type={showPassword ? "text" : "password"} className="input-base pr-10" placeholder="••••••••"
                    value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--txt-3)" }}>
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </label>

              <button type="submit" disabled={isLoggingIn} className="btn-gradient mt-2 flex w-full items-center justify-center gap-2">
                {isLoggingIn ? <><Loader2 className="size-4 animate-spin" /> Signing in...</> : <>Sign in <ArrowRight className="size-4" /></>}
              </button>
            </form>

            <div className="mt-6 text-center text-sm" style={{ color: "var(--txt-2)" }}>
              New here?{" "}
              <Link to="/signup" className="font-semibold" style={{ color: "var(--accent)" }}>Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
