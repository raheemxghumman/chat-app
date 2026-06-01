import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Loader2 } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => { checkAuth(); }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="app-shell flex h-screen items-center justify-center">
        <Loader2 className="size-10 animate-spin" style={{ color: "var(--accent)" }} />
      </div>
    );

  const hideNav = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="app-shell">
      {!hideNav && authUser && <Navbar />}
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#161526", color: "#f4f5fa", border: "1px solid rgba(255,255,255,0.1)" },
        }}
      />
    </div>
  );
};
export default App;
