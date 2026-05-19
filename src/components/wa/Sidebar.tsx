import { MessageCircle, MoreVertical, Search, Filter, Users } from "lucide-react";
import { chats } from "@/lib/mock-data";

export function Sidebar() {
  return (
    <aside className="w-[30%] min-w-[320px] bg-wa-sidebar border-r border-wa-border flex flex-col">
      {/* Header */}
      <div className="h-[60px] bg-wa-panel flex items-center justify-between px-4 shrink-0">
        <div className="w-10 h-10 rounded-full bg-wa-accent text-white flex items-center justify-center font-semibold">
          U
        </div>
        <div className="flex items-center gap-2 text-wa-muted">
          <button className="p-2 hover:bg-black/5 rounded-full" title="Communities"><Users size={20} /></button>
          <button className="p-2 hover:bg-black/5 rounded-full" title="Status"><div className="w-5 h-5 rounded-full border-2 border-current" /></button>
          <button className="p-2 hover:bg-black/5 rounded-full" title="New chat"><MessageCircle size={20} /></button>
          <button className="p-2 hover:bg-black/5 rounded-full" title="Menu"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2 bg-wa-sidebar shrink-0">
        <div className="flex items-center gap-3 bg-wa-panel rounded-lg px-4 h-9">
          <Search size={16} className="text-wa-muted" />
          <input
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-wa-muted"
            placeholder="Search or start a new chat"
          />
          <Filter size={16} className="text-wa-muted" />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto wa-scroll">
        {chats.map((c) => (
          <div
            key={c.id}
            className={`flex items-center gap-3 px-3 py-3 cursor-pointer border-b border-wa-border/60 hover:bg-wa-hover ${
              c.active ? "bg-wa-active" : ""
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-wa-panel flex items-center justify-center text-2xl shrink-0">
              {c.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-medium text-wa-text truncate">{c.name}</span>
                <span className={`text-xs shrink-0 ml-2 ${c.unread ? "text-wa-accent" : "text-wa-muted"}`}>{c.time}</span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-sm text-wa-muted truncate">{c.lastMessage}</span>
                <div className="flex items-center gap-1 ml-2">
                  {c.hasThread && (
                    <span title="Has active thread" className="text-wa-accent">
                      <MessageCircle size={14} fill="currentColor" />
                    </span>
                  )}
                  {c.unread && (
                    <span className="bg-wa-accent text-white text-[11px] font-semibold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
