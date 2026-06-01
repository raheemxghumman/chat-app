import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.02)" }}>
      <div className="flex items-center gap-3">
        <div className="relative">
          <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName}
            className="size-10 rounded-full object-cover" style={{ border: "1px solid var(--line)" }} />
          {isOnline && <span className="absolute bottom-0 right-0 size-2.5 rounded-full" style={{ background: "#22c55e", border: "2px solid #0b0b14" }} />}
        </div>
        <div>
          <p className="font-semibold leading-tight">{selectedUser.fullName}</p>
          <p className="text-xs" style={{ color: isOnline ? "#86efac" : "var(--txt-3)" }}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)} className="btn-ghost-2 !p-2">
        <X className="size-4" />
      </button>
    </div>
  );
};
export default ChatHeader;
