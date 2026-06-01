import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image as ImageIcon, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) { console.error("Failed to send", err); }
  };

  return (
    <div className="border-t p-3 sm:p-4" style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.02)" }}>
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img src={imagePreview} alt="Preview" className="size-20 rounded-lg object-cover" style={{ border: "1px solid var(--line)" }} />
            <button onClick={removeImage} type="button"
              className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full"
              style={{ background: "#161526", border: "1px solid var(--line)" }}>
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2 rounded-2xl border p-1.5"
        style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.03)" }}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-transparent px-3 py-2 text-sm outline-none" placeholder="Type a message"
          style={{ color: "var(--txt-1)" }} />
        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
        <button type="button" onClick={() => fileInputRef.current?.click()}
          className="flex size-9 items-center justify-center rounded-xl transition-colors"
          style={{ color: imagePreview ? "#34d399" : "var(--txt-3)", background: "rgba(255,255,255,0.04)" }}>
          <ImageIcon className="size-4" />
        </button>
        <button type="submit" disabled={!text.trim() && !imagePreview}
          className="flex size-9 items-center justify-center rounded-xl disabled:opacity-50"
          style={{ background: "var(--accent-grad)" }}>
          <Send className="size-4" style={{ color: "#0b0b14" }} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
