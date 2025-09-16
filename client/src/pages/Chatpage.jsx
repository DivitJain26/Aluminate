import { useState } from "react";
import { Send } from "lucide-react";

export default function Chatpage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋", sender: "other" },
    { id: 2, text: "Hello! How are you?", sender: "me" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { id: Date.now(), text: input, sender: "me" }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 text-lg font-semibold shadow">
        Chat Room
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "me"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-800 shadow"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 border-t bg-white flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSend}
          className="ml-3 bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-lg shadow"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
