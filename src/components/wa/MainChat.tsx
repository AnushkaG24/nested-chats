import { Search, MoreVertical, Phone, Video } from "lucide-react";
import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import type { Message } from "@/lib/mock-data";

interface Props {
  messages: Message[];
  onSend: (text: string) => void;
  onReplyInThread: (m: Message) => void;
  onOpenThread: (m: Message) => void;
}

export function MainChat({ messages, onSend, onReplyInThread, onOpenThread }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  return (
    <section className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <div className="h-[60px] bg-wa-panel flex items-center justify-between px-4 shrink-0 border-l border-wa-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl">🏖️</div>
          <div>
            <div className="font-medium text-wa-text leading-tight">Summer Trip 2026 ✈️</div>
            <div className="text-[12.5px] text-wa-muted">click a message bubble to view or start a thread</div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-wa-muted">
          <button className="p-2 hover:bg-black/5 rounded-full"><Video size={20} /></button>
          <button className="p-2 hover:bg-black/5 rounded-full"><Phone size={20} /></button>
          <button className="p-2 hover:bg-black/5 rounded-full"><Search size={20} /></button>
          <button className="p-2 hover:bg-black/5 rounded-full"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto wa-scroll wa-wallpaper py-4">
        <div className="flex justify-center mb-3">
          <span className="text-[12px] text-wa-text bg-[#fdf4c5] px-3 py-1 rounded-md shadow-sm">TODAY</span>
        </div>
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} onReplyInThread={onReplyInThread} onOpenThread={onOpenThread} />
        ))}
      </div>

      <ChatInput onSend={onSend} placeholder="Type a message" />
    </section>
  );
}
