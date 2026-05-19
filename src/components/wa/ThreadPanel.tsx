import { X, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import type { Message, ThreadReply } from "@/lib/mock-data";

interface Props {
  parent: Message;
  onClose: () => void;
  onSendReply: (text: string, crossPost: boolean) => void;
}

const authorColors: Record<string, string> = {
  Alex: "#e542a3", Sarah: "#ff8c2a", John: "#3b8bff", Mia: "#7e57c2",
  Leo: "#00897b", Jordan: "#d32f2f", Priya: "#8e24aa",
};

export function ThreadPanel({ parent, onClose, onSendReply }: Props) {
  const [crossPost, setCrossPost] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [parent.thread?.length]);

  return (
    <aside className="w-[25%] min-w-[320px] bg-wa-sidebar border-l border-wa-border flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="h-[60px] bg-wa-panel flex items-center gap-3 px-4 shrink-0">
        <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full text-wa-muted">
          <X size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-wa-text leading-tight">Thread</div>
          <div className="text-[12.5px] text-wa-muted truncate">
            {parent.author}: {parent.text}
          </div>
        </div>
      </div>

      {/* Parent + Replies */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto wa-scroll wa-wallpaper">
        {/* Parent message rendered at top */}
        <div className="px-3 pt-4 pb-3 border-b border-wa-border bg-wa-chat-bg/60">
          <div className="bg-white rounded-lg px-3 py-2 shadow-sm max-w-full">
            <div className="text-[13px] font-medium" style={{ color: authorColors[parent.author] || "#1e88e5" }}>
              {parent.author}
            </div>
            <div className="text-[14px] text-wa-text whitespace-pre-wrap">{parent.text}</div>
            <div className="text-[11px] text-wa-muted text-right mt-0.5">{parent.time}</div>
          </div>
          <div className="flex items-center gap-2 mt-3 text-[12px] text-wa-muted">
            <div className="flex-1 h-px bg-wa-border" />
            <span>{parent.thread?.length ?? 0} replies</span>
            <div className="flex-1 h-px bg-wa-border" />
          </div>
        </div>

        <div className="py-3">
          {parent.thread?.map((r: ThreadReply) => (
            <div key={r.id} className={`flex ${r.outgoing ? "justify-end" : "justify-start"} mb-1 px-2`}>
              <div
                className={`max-w-[80%] rounded-lg px-2.5 py-1.5 shadow-sm ${
                  r.outgoing ? "bg-wa-out rounded-tr-none" : "bg-white rounded-tl-none"
                }`}
              >
                {!r.outgoing && (
                  <div className="text-[12.5px] font-medium leading-tight" style={{ color: authorColors[r.author] || "#1e88e5" }}>
                    {r.author}
                  </div>
                )}
                <div className="text-[14px] text-wa-text whitespace-pre-wrap break-words">{r.text}</div>
                <div className="text-[11px] text-wa-muted text-right">{r.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ChatInput
        onSend={(t) => onSendReply(t, crossPost)}
        placeholder="Reply in thread"
        extra={
          <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-wa-text pb-1">
            <span
              onClick={() => setCrossPost((v) => !v)}
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                crossPost ? "bg-wa-accent border-wa-accent" : "bg-white border-wa-muted"
              }`}
            >
              {crossPost && <Check size={12} className="text-white" />}
            </span>
            <span onClick={() => setCrossPost((v) => !v)}>Also send to main chat</span>
          </label>
        }
      />
    </aside>
  );
}
