import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages, getMessages, isMessagesLoading, selectedUser,
    subscribeToMessages, unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <ChatHeader />
      <div className="scroll-thin flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
        {messages.length === 0 && (
          <div className="mx-auto mt-12 max-w-sm rounded-2xl border border-dashed p-6 text-center"
            style={{ borderColor: "var(--line)", color: "var(--txt-3)" }}>
            <p className="font-semibold" style={{ color: "var(--txt-1)" }}>No messages yet</p>
            <p className="mt-1 text-sm">Send the first note and start the conversation.</p>
          </div>
        )}
        {messages.map((message) => {
          const mine = message.senderId === authUser._id;
          return (
            <div key={message._id} ref={messageEndRef} className={`flex items-end gap-2 ${mine ? "justify-end" : "justify-start"}`}>
              {!mine && (
                <img src={selectedUser.profilePic || "/avatar.png"} alt="" className="size-8 rounded-full object-cover" />
              )}
              <div className="max-w-[78%] sm:max-w-md">
                <div className={mine ? "bubble-me" : "bubble-them"}>
                  {message.image && <img src={message.image} alt="" className="mb-2 max-w-[240px] rounded-lg" />}
                  {message.text && <p className="text-sm leading-relaxed">{message.text}</p>}
                </div>
                <p className={`mt-1 text-[11px] ${mine ? "text-right" : "text-left"}`} style={{ color: "var(--txt-3)" }}>
                  {formatMessageTime(message.createdAt)}
                </p>
              </div>
              {mine && (
                <img src={authUser.profilePic || "/avatar.png"} alt="" className="size-8 rounded-full object-cover" />
              )}
            </div>
          );
        })}
      </div>
      <MessageInput />
    </div>
  );
};
export default ChatContainer;
