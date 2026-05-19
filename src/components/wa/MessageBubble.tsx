import { ChevronDown, MessageCircle, Check, CheckCheck } from "lucide-react";
import { useState } from "react";
import type { Message } from "@/lib/mock-data";

interface Props {
  message: Message;
  onReplyInThread: (m: Message) => void;
  onOpenThread: (m: Message) => void;
}

const authorColors: Record<string, string> = {
  Alex: "#e542a3", Sarah: "#ff8c2a", John: "#3b8bff", Mia: "#7e57c2",
  Leo: "#00897b", Jordan: "#d32f2f", Priya: "#8e24aa",
};

export function MessageBubble({ message, onReplyInThread, onOpenThread }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const out = message.outgoing;
  const replyCount = message.thread?.length ?? 0;
  const lastReply = message.thread?.[message.thread.length - 1];

  return (
    <div className={`group flex ${out ? "justify-end" : "justify-start"} mb-1 px-2`}>
      <div className="max-w-[65%] flex flex-col items-stretch">
        <div
          className={`relative rounded-lg px-2.5 pt-1.5 pb-1 shadow-sm ${
            out ? "bg-wa-out rounded-tr-none" : "bg-wa-in rounded-tl-none"
          }`}
        >
          {/* Little tail */}
          <span
            className={`absolute top-0 w-2 h-3 ${out ? "-right-1.5" : "-left-1.5"}`}
            style={{
              background: out ? "#d9fdd3" : "#ffffff",
              clipPath: out ? "polygon(0 0, 100% 0, 0 100%)" : "polygon(100% 0, 100% 100%, 0 0)",
            }}
          />
          {!out && (
            <div
              className="text-[13px] font-medium leading-tight mb-0.5"
              style={{ color: authorColors[message.author] || "#1e88e5" }}
            >
              {message.author}
            </div>
          )}

          {message.quotedFrom && (
            <button
              onClick={() => onOpenThread({ id: message.quotedFrom!.parentId } as Message)}
              className="block w-full text-left mb-1 rounded-md overflow-hidden bg-black/5 border-l-4 border-wa-accent px-2 py-1"
            >
              <div className="text-[12px] font-medium text-wa-accent">
                {message.quotedFrom.parentAuthor} · in thread
              </div>
              <div className="text-[12px] text-wa-muted truncate">{message.quotedFrom.parentSnippet}</div>
            </button>
          )}

          <div className="text-[14.2px] text-wa-text whitespace-pre-wrap break-words leading-snug pr-12">
            {message.text}
          </div>
          <div className="flex items-center justify-end gap-1 mt-0.5 -mb-0.5">
            <span className="text-[11px] text-wa-muted">{message.time}</span>
            {out && <CheckCheck size={14} className="text-wa-accent" />}
          </div>

          {/* Hover menu */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-0.5 ${
              out ? "bg-wa-out" : "bg-wa-in"
            } hover:bg-black/5`}
          >
            <ChevronDown size={18} className="text-wa-muted" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className={`absolute z-20 top-7 ${out ? "right-0" : "right-0"} bg-white rounded-md shadow-lg border border-wa-border py-1 w-52`}>
                <button
                  onClick={() => { setMenuOpen(false); onReplyInThread(message); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-wa-hover flex items-center gap-3"
                >
                  <MessageCircle size={16} className="text-wa-muted" />
                  Reply in Thread
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-wa-hover">Reply</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-wa-hover">React</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-wa-hover">Forward</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-wa-hover">Star</button>
              </div>
            </>
          )}
        </div>

        {/* Thread badge */}
        {replyCount > 0 && (
          <button
            onClick={() => onOpenThread(message)}
            className={`self-start mt-1 mb-1 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-wa-border hover:border-wa-accent hover:bg-wa-accent/5 transition-all shadow-sm ${
              out ? "ml-auto" : ""
            }`}
          >
            <MessageCircle size={14} className="text-wa-accent" />
            <span className="text-[12.5px] font-medium text-wa-text">
              {replyCount} {replyCount === 1 ? "reply" : "replies"}
            </span>
            {lastReply && (
              <span className="text-[12px] text-wa-muted">· Last reply {lastReply.time}</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
