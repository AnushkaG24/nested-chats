import { Smile, Paperclip, Mic, Send } from "lucide-react";
import { useState, type ReactNode } from "react";

interface Props {
  onSend: (text: string) => void;
  placeholder?: string;
  extra?: ReactNode;
}

export function ChatInput({ onSend, placeholder = "Type a message", extra }: Props) {
  const [text, setText] = useState("");
  const submit = () => {
    const v = text.trim();
    if (!v) return;
    onSend(v);
    setText("");
  };
  return (
    <div className="bg-wa-panel shrink-0">
      {extra && <div className="px-4 pt-2">{extra}</div>}
      <div className="flex items-end gap-2 px-3 py-2.5">
        <button className="p-2 text-wa-muted hover:text-wa-text rounded-full"><Smile size={24} /></button>
        <button className="p-2 text-wa-muted hover:text-wa-text rounded-full"><Paperclip size={22} /></button>
        <div className="flex-1 bg-white rounded-lg px-4 py-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-[15px] placeholder:text-wa-muted"
          />
        </div>
        {text.trim() ? (
          <button onClick={submit} className="p-2 text-wa-accent hover:bg-black/5 rounded-full"><Send size={22} /></button>
        ) : (
          <button className="p-2 text-wa-muted hover:text-wa-text rounded-full"><Mic size={24} /></button>
        )}
      </div>
    </div>
  );
}
