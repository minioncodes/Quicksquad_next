"use client";

import { useState, useRef, useEffect } from "react";
import { FaRobot } from "react-icons/fa";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true); // ✅ control quick prompts
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Open a bank account online",
    "Fix Wi-Fi that keeps dropping",
    "Reset my email password",
    "Find the nearest DMV",
    "Explain Roth IRA vs 401(k)",
  ];

  const toggleWidget = () => setOpen(!open);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (msg?: string) => {
    const messageToSend = msg ?? input;
    if (!messageToSend.trim()) return;

    setShowPrompts(false); // ✅ hide prompts after first send

    const userMessage = { role: "user", content: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await res.json();
      const botMessage = { role: "bot", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div>
      {/* Floating Chat Icon */}
      <button
        onClick={toggleWidget}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center
                   rounded-full bg-blue-700 text-white shadow-2xl hover:bg-blue-800
                   transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        aria-label="Open chat"
      >
        <FaRobot size={24} />
      </button>

      {open && (
        <div
          className="fixed bottom-20 right-6 z-[9999] w-80 max-h-[560px] rounded-xl
                     bg-white/95 shadow-2xl ring-1 ring-black/10
                     flex flex-col overflow-hidden"
          role="dialog"
          aria-label="AI Assistant"
        >
          {/* Header */}
          <div className="p-4 font-semibold text-white bg-blue-700 flex justify-between items-center">
            <span>Chat with AI</span>
            <button
              onClick={toggleWidget}
              className="px-2 py-1 rounded hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="Close chat"
            >
              ✖
            </button>
          </div>

          {/* Quick Prompts (only show before search) */}
          {showPrompts && (
            <div className="p-2 border-b border-gray-200 bg-white/95 flex flex-wrap gap-2">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(prompt)}
                  className="text-xs px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 active:bg-gray-400
                             shadow-sm font-medium text-gray-800"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="p-4 flex-1 overflow-y-auto space-y-2 bg-gradient-to-b from-white/98 to-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg max-w-[80%] text-[0.95rem] leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && <div className="text-gray-600">AI is typing…</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t border-gray-200 bg-white/95 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message…"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-[0.95rem]
                         bg-white text-gray-900 shadow-inner
                         placeholder:text-gray-700 placeholder:opacity-100 placeholder:font-medium
                         focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              aria-label="Type your message"
            />
            <button
              onClick={() => sendMessage()}
              className="bg-blue-700 text-white px-4 py-2 rounded-md font-medium
                         shadow hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
