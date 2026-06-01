import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageCircle, Settings, User, Home } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b" style={{ borderColor: "var(--line)", background: "rgba(11,11,20,0.7)", backdropFilter: "blur(16px)" }}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl" style={{ background: "var(--accent-grad)" }}>
            <MessageCircle className="size-5" style={{ color: "#0b0b14" }} strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-bold tracking-tight" style={{ color: "var(--txt-1)" }}>Pulse</h1>
            <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--txt-3)" }}>chat</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <Home className="size-4" /> Chats
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <User className="size-4" /> Profile
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <Settings className="size-4" /> Settings
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {authUser && (
            <Link to="/profile" className="hidden items-center gap-2 rounded-full border px-2 py-1 sm:flex" style={{ borderColor: "var(--line)" }}>
              <img src={authUser.profilePic || "/avatar.png"} alt="" className="size-7 rounded-full object-cover" />
              <span className="pr-2 text-sm" style={{ color: "var(--txt-2)" }}>{authUser.fullName?.split(" ")[0]}</span>
            </Link>
          )}
          <button onClick={handleLogout} className="btn-ghost-2 flex items-center gap-2 text-sm">
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* mobile nav */}
      <nav className="flex items-center justify-around border-t px-4 py-2 md:hidden" style={{ borderColor: "var(--line)" }}>
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <Home className="size-4" /> Chats
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <User className="size-4" /> Profile
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <Settings className="size-4" /> Settings
        </NavLink>
      </nav>
    </header>
  );
};
export default Navbar;
