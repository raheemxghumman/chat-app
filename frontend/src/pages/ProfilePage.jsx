import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { BadgeCheck, CalendarDays, Camera, Mail, Shield, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  if (!authUser) return null;

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="chip mb-3"><User className="size-3.5" /> Profile</span>
          <h1 className="text-4xl font-bold tracking-tight">Your account</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--txt-2)" }}>Manage how you appear in conversations.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Avatar card */}
        <div className="card-glass p-6 text-center">
          <div className="relative mx-auto w-fit">
            <img src={selectedImg || authUser.profilePic || "/avatar.png"} alt="Profile"
              className="size-36 rounded-full object-cover" style={{ border: "3px solid rgba(255,255,255,0.08)" }} />
            <label htmlFor="avatar-upload"
              className={`absolute bottom-1 right-1 flex size-10 cursor-pointer items-center justify-center rounded-full ${isUpdatingProfile ? "pointer-events-none animate-pulse" : ""}`}
              style={{ background: "var(--accent-grad)" }}>
              <Camera className="size-4" style={{ color: "#0b0b14" }} />
              <input type="file" id="avatar-upload" className="hidden" accept="image/*"
                onChange={handleImageUpload} disabled={isUpdatingProfile} />
            </label>
          </div>
          <h2 className="mt-5 text-xl font-semibold">{authUser.fullName}</h2>
          <p className="text-sm" style={{ color: "var(--txt-2)" }}>{authUser.email}</p>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
            style={{ color: "#86efac", background: "rgba(34,197,94,0.1)", borderColor: "rgba(34,197,94,0.25)" }}>
            <BadgeCheck className="size-3.5" /> Active account
          </div>
          <p className="mt-4 text-xs" style={{ color: "var(--txt-3)" }}>
            {isUpdatingProfile ? "Uploading new photo..." : "Click the camera icon to change your photo"}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div className="card-glass p-6">
            <h3 className="text-lg font-semibold">Personal details</h3>
            <p className="text-sm" style={{ color: "var(--txt-3)" }}>Visible to people you chat with.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Field icon={<User className="size-4" />} label="Full name" value={authUser.fullName} />
              <Field icon={<Mail className="size-4" />} label="Email" value={authUser.email} />
            </div>
          </div>

          <div className="card-glass p-6">
            <h3 className="text-lg font-semibold">Account</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="card-flat p-4">
                <CalendarDays className="mb-2 size-5" style={{ color: "var(--accent)" }} />
                <p className="text-xs uppercase tracking-wider" style={{ color: "var(--txt-3)" }}>Member since</p>
                <p className="mt-1 font-semibold">{authUser.createdAt?.split("T")[0] || "—"}</p>
              </div>
              <div className="card-flat p-4">
                <Shield className="mb-2 size-5" style={{ color: "var(--accent-2)" }} />
                <p className="text-xs uppercase tracking-wider" style={{ color: "var(--txt-3)" }}>Status</p>
                <p className="mt-1 font-semibold" style={{ color: "#86efac" }}>Active & verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ icon, label, value }) => (
  <div className="card-flat p-4">
    <div className="mb-1.5 flex items-center gap-2 text-xs uppercase tracking-wider" style={{ color: "var(--txt-3)" }}>
      {icon}{label}
    </div>
    <p className="font-medium">{value}</p>
  </div>
);

export default ProfilePage;
