export interface ThreadReply {
  id: string;
  author: string;
  text: string;
  time: string;
  outgoing?: boolean;
}

export interface Message {
  id: string;
  author: string;
  text: string;
  time: string;
  outgoing?: boolean;
  thread?: ThreadReply[];
  // optional: if this message was cross-posted from a thread, quote info
  quotedFrom?: { parentId: string; parentAuthor: string; parentSnippet: string };
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  active?: boolean;
  hasThread?: boolean;
  participants?: number;
}

export const chats: Chat[] = [
  { id: "1", name: "Summer Trip 2026 ✈️", avatar: "🏖️", lastMessage: "Sarah: Yes, 5 min walk", time: "12:42", active: true, hasThread: true, participants: 12 },
  { id: "2", name: "Mom ❤️", avatar: "👩", lastMessage: "Call me when you're free", time: "11:30", unread: 2 },
  { id: "3", name: "Design Team", avatar: "🎨", lastMessage: "Figma file is updated", time: "10:15" },
  { id: "4", name: "Dani Rojas", avatar: "⚽", lastMessage: "Football is life!", time: "Yesterday" },
  { id: "5", name: "Book Club 📚", avatar: "📖", lastMessage: "Chapter 7 was wild", time: "Yesterday", unread: 5 },
  { id: "6", name: "Marcus", avatar: "🧑", lastMessage: "Sent a photo", time: "Tue" },
  { id: "7", name: "Gym Buddies 💪", avatar: "🏋️", lastMessage: "7am tomorrow?", time: "Mon" },
  { id: "8", name: "Priya", avatar: "👩‍💼", lastMessage: "Thanks!", time: "Mon" },
];

export const initialMessages: Message[] = [
  { id: "m1", author: "Alex", text: "Hey guys, let's lock down the Airbnb options!", time: "10:02",
    thread: [
      { id: "t1", author: "Sarah", text: "Option 1 looks amazing 😍", time: "10:05" },
      { id: "t2", author: "John", text: "Is it near the beach?", time: "10:07" },
      { id: "t3", author: "Sarah", text: "Yes, 5 min walk", time: "10:09" },
    ],
  },
  { id: "m2", author: "Mia", text: "I'm so excited!! 🎉", time: "10:12" },
  { id: "m3", author: "You", text: "Same here, can't wait", time: "10:13", outgoing: true },
  { id: "m4", author: "Leo", text: "Let's do a road trip video 🎥", time: "10:20" },
  { id: "m5", author: "Jordan", text: "Did everyone book their flights yet?", time: "10:34" },
  { id: "m6", author: "Priya", text: "Haha nice", time: "10:36" },
  { id: "m7", author: "You", text: "Booking mine tonight ✈️", time: "10:40", outgoing: true },
];
