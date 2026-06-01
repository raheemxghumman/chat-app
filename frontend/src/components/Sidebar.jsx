import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search, Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => { getUsers(); }, [getUsers]);

  const filteredUsers = users
    .filter((u) => (showOnlineOnly ? onlineUsers.includes(u._id) : true))
    .filter((u) => u.fullName?.toLowerCase().includes(query.toLowerCase()));

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="flex h-full w-20 flex-col border-r transition-all lg:w-80" style={{ borderColor: "var(--line)" }}>
      <div className="border-b p-4 lg:p-5" style={{ borderColor: "var(--line)" }}>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl" style={{ background: "rgba(167,139,250,0.12)" }}>
            <Users className="size-5" style={{ color: "var(--accent)" }} />
          </div>
          <div className="hidden lg:block">
            <p className="font-semibold">Conversations</p>
            <p className="text-xs" style={{ color: "var(--txt-3)" }}>{users.length} contacts</p>
          </div>
        </div>

        <div className="mt-4 hidden items-center gap-2 rounded-xl border px-3 py-2 lg:flex" style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.03)" }}>
          <Search className="size-4" style={{ color: "var(--txt-3)" }} />
          <input value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search people" className="w-full bg-transparent text-sm outline-none" style={{ color: "var(--txt-1)" }} />
        </div>

        <label className="mt-3 hidden cursor-pointer items-center gap-2 text-sm lg:flex" style={{ color: "var(--txt-2)" }}>
          <input type="checkbox" checked={showOnlineOnly} onChange={(e) => setShowOnlineOnly(e.target.checked)} className="accent-violet-400" />
          Online only
          <span className="ml-auto text-xs" style={{ color: "var(--txt-3)" }}>{Math.max(onlineUsers.length - 1, 0)} online</span>
        </label>
      </div>

      <div className="scroll-thin flex-1 overflow-y-auto p-2 lg:p-3">
        {filteredUsers.map((user) => {
          const isActive = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);
          return (
            <button key={user._id} onClick={() => setSelectedUser(user)}
              className="mb-1.5 flex w-full items-center gap-3 rounded-xl p-2.5 transition-all"
              style={{ background: isActive ? "rgba(167,139,250,0.12)" : "transparent",
                       border: `1px solid ${isActive ? "rgba(167,139,250,0.3)" : "transparent"}` }}>
              <div className="relative mx-auto lg:mx-0">
                <img src={user.profilePic || "/avatar.png"} alt={user.fullName}
                  className="size-11 rounded-full object-cover" style={{ border: "1px solid var(--line)" }} />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 size-3 rounded-full" style={{ background: "#22c55e", border: "2px solid #0b0b14" }} />
                )}
              </div>
              <div className="hidden min-w-0 flex-1 text-left lg:block">
                <p className="truncate font-medium" style={{ color: "var(--txt-1)" }}>{user.fullName}</p>
                <p className="truncate text-xs" style={{ color: isOnline ? "#86efac" : "var(--txt-3)" }}>
                  {isOnline ? "Online now" : "Offline"}
                </p>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="m-2 rounded-xl border border-dashed p-4 text-center text-sm" style={{ borderColor: "var(--line)", color: "var(--txt-3)" }}>
            No contacts found
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
