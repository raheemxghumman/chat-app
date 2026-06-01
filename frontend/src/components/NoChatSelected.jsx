import { MessageCircle, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex flex-1 items-center justify-center p-10">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-3xl" style={{ background: "var(--accent-grad)" }}>
          <MessageCircle className="size-10" style={{ color: "#0b0b14" }} strokeWidth={2} />
        </div>
        <span className="chip mb-3"><Sparkles className="size-3.5" /> Pulse Chat</span>
        <h2 className="text-3xl font-bold tracking-tight">Pick someone to talk to</h2>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--txt-2)" }}>
          Select a contact from the sidebar to start a conversation. Your messages stay snappy, your view stays calm.
        </p>
      </div>
    </div>
  );
};
export default NoChatSelected;
