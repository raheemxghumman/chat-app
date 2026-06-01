import { MessageCircle, Radio, ShieldCheck, Sparkles } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex min-h-screen items-center justify-center p-10">
      <div className="mesh-surface relative w-full max-w-xl overflow-hidden rounded-lg border border-base-content/10 p-8 shadow-2xl">
        <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-base-content/10 bg-base-100/70 px-3 py-1.5 text-xs font-medium backdrop-blur">
          <Radio className="size-3.5 text-success" />
          Live conversations
        </div>

        <div className="mt-12 space-y-4">
          <div className="inline-flex size-12 items-center justify-center rounded-lg bg-primary text-primary-content shadow-lg shadow-primary/20">
            <Sparkles className="size-6" />
          </div>
          <h2 className="max-w-md text-4xl font-bold leading-tight">{title}</h2>
          <p className="max-w-sm text-sm leading-6 text-base-content/70">{subtitle}</p>
        </div>

        <div className="mt-10 space-y-4">
          <div className="ml-auto max-w-xs rounded-lg bg-primary p-4 text-primary-content shadow-xl">
            <div className="mb-2 flex items-center gap-2 text-xs opacity-80">
              <MessageCircle className="size-4" />
              Mira
            </div>
            <p className="text-sm">The design feels calm now. Send the invite when you are ready.</p>
          </div>
          <div className="max-w-xs rounded-lg border border-base-content/10 bg-base-100/85 p-4 shadow-xl backdrop-blur">
            <div className="mb-2 flex items-center gap-2 text-xs text-base-content/60">
              <ShieldCheck className="size-4 text-success" />
              You
            </div>
            <p className="text-sm">Done. Real-time chat, profiles, and themes are all in one place.</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3">
          {["Fast", "Private", "Friendly"].map((item) => (
            <div key={item} className="rounded-lg border border-base-content/10 bg-base-100/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
                {item}
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-primary/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
