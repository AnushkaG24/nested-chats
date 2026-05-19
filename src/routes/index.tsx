import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sidebar } from "@/components/wa/Sidebar";
import { MainChat } from "@/components/wa/MainChat";
import { ThreadPanel } from "@/components/wa/ThreadPanel";
import { initialMessages, type Message } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "WhatsApp Threads" },
      { name: "description", content: "WhatsApp Web with threaded conversations" },
    ],
  }),
});

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function Index() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  const activeThread = useMemo(
    () => messages.find((m) => m.id === activeThreadId) ?? null,
    [messages, activeThreadId],
  );

  const handleSendMain = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `m${Date.now()}`, author: "You", text, time: nowTime(), outgoing: true },
    ]);
  };

  const openOrCreateThread = (m: Message) => {
    setMessages((prev) =>
      prev.map((x) => (x.id === m.id && !x.thread ? { ...x, thread: [] } : x)),
    );
    setActiveThreadId(m.id);
  };

  const handleSendThreadReply = (text: string, crossPost: boolean) => {
    if (!activeThread) return;
    const reply = { id: `t${Date.now()}`, author: "You", text, time: nowTime(), outgoing: true };

    setMessages((prev) => {
      const updated = prev.map((m) =>
        m.id === activeThread.id ? { ...m, thread: [...(m.thread ?? []), reply] } : m,
      );
      if (crossPost) {
        updated.push({
          id: `m${Date.now()}`,
          author: "You",
          text,
          time: nowTime(),
          outgoing: true,
          quotedFrom: {
            parentId: activeThread.id,
            parentAuthor: activeThread.author,
            parentSnippet: activeThread.text,
          },
        });
      }
      return updated;
    });
  };

  return (
    <div className="h-screen w-screen flex bg-[#d1d7db] p-0 lg:p-4">
      <div className="flex-1 flex overflow-hidden lg:rounded-md lg:shadow-2xl bg-white">
        <Sidebar />
        <MainChat
          messages={messages}
          onSend={handleSendMain}
          onReplyInThread={openOrCreateThread}
          onOpenThread={openOrCreateThread}
        />
        {activeThread && (
          <ThreadPanel
            parent={activeThread}
            onClose={() => setActiveThreadId(null)}
            onSendReply={handleSendThreadReply}
          />
        )}
      </div>
    </div>
  );
}
