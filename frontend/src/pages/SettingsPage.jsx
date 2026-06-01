import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Check, Palette, Send } from "lucide-react";

const PREVIEW = [
  { id: 1, content: "Hey, how's the new design feeling?", isSent: false },
  { id: 2, content: "Honestly? Way calmer. I love the gradient.", isSent: true },
  { id: 3, content: "Right? Pick a theme and let's ship.", isSent: false },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8">
        <span className="chip mb-3"><Palette className="size-3.5" /> Appearance</span>
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--txt-2)" }}>
          Pick the theme that matches your mood. Preview lives on the right.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Theme grid */}
        <div className="card-glass p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Theme library</h2>
              <p className="text-sm" style={{ color: "var(--txt-3)" }}>{THEMES.length} themes available.</p>
            </div>
            <div className="card-flat px-3 py-2 text-xs">
              <span style={{ color: "var(--txt-3)" }}>Active: </span>
              <span className="font-semibold capitalize">{theme}</span>
            </div>
          </div>

          <div className="scroll-thin grid max-h-[60vh] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
            {THEMES.map((t) => (
              <button key={t} onClick={() => setTheme(t)} className={`theme-swatch relative ${theme === t ? "active" : ""}`}>
                {theme === t && (
                  <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full" style={{ background: "var(--accent-grad)" }}>
                    <Check className="size-3" style={{ color: "#0b0b14" }} />
                  </span>
                )}
                <div data-theme={t} className="relative h-10 w-full overflow-hidden rounded-md">
                  <div className="absolute inset-0 grid grid-cols-4 gap-0.5 p-1">
                    <div className="rounded-sm bg-primary"></div>
                    <div className="rounded-sm bg-secondary"></div>
                    <div className="rounded-sm bg-accent"></div>
                    <div className="rounded-sm bg-neutral"></div>
                  </div>
                </div>
                <span className="mt-2 block truncate text-sm font-medium capitalize">{t}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="card-glass overflow-hidden">
          <div className="border-b p-5" style={{ borderColor: "var(--line)" }}>
            <h3 className="text-lg font-semibold">Live preview</h3>
            <p className="text-sm" style={{ color: "var(--txt-3)" }}>How a chat will look with your selection.</p>
          </div>
          <div className="space-y-3 p-5">
            <div className="flex items-center gap-3 pb-2">
              <div className="flex size-10 items-center justify-center rounded-full font-semibold" style={{ background: "var(--accent-grad)", color: "#0b0b14" }}>J</div>
              <div>
                <p className="font-medium">Jordan Reyes</p>
                <p className="text-xs" style={{ color: "#86efac" }}>● Online</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {PREVIEW.map((m) => (
                <div key={m.id} className={`flex ${m.isSent ? "justify-end" : "justify-start"}`}>
                  <div className={m.isSent ? "bubble-me max-w-xs text-sm" : "bubble-them max-w-xs text-sm"}>{m.content}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-2xl border p-1.5" style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.03)" }}>
              <input className="flex-1 bg-transparent px-3 py-2 text-sm outline-none" placeholder="Type a message" />
              <button className="flex size-9 items-center justify-center rounded-xl" style={{ background: "var(--accent-grad)" }}>
                <Send className="size-4" style={{ color: "#0b0b14" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
