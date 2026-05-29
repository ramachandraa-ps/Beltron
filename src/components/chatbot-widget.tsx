import { useState, useRef, useEffect } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { useLang } from "@/lib/language-context.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const WELCOME_MESSAGE = {
  en: "Hello! I'm BELTRON Assistant. How can I help you today? I can answer questions about our services, projects, tenders, or help you navigate the site.",
  hi: "नमस्ते! मैं बेल्ट्रॉन सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ? मैं हमारी सेवाओं, परियोजनाओं, टेंडरों के बारे में सवालों का जवाब दे सकता हूँ या साइट नेविगेट करने में मदद कर सकता हूँ।",
  bho: "नमस्ते! हम बेल्ट्रॉन सहायक हईं। आज हम रउआ के कइसे मदद कर सकीलें? हम सेवा, परियोजना, टेंडर के बारे में सवाल के जवाब दे सकीलें या साइट में रास्ता बता सकीलें।",
};

export default function ChatbotWidget() {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE[lang] },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatAction = useAction(api.chatbot.chat);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset welcome message when language changes
  useEffect(() => {
    setMessages([{ role: "assistant", content: WELCOME_MESSAGE[lang] }]);
  }, [lang]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatAction({ messages: updatedMessages });
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            lang === "en"
              ? "I'm sorry, something went wrong. Please try again."
              : lang === "hi"
                ? "क्षमा करें, कुछ गलत हो गया। कृपया पुनः प्रयास करें।"
                : "माफ करीं, कुछ गड़बड़ हो गइल। फेर से कोशिश करीं।",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors cursor-pointer"
            aria-label="Open chat assistant"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-4rem)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold">BELTRON Assistant</h3>
                <p className="text-xs opacity-80">
                  {lang === "en"
                    ? "AI-powered help"
                    : lang === "hi"
                      ? "AI संचालित सहायता"
                      : "AI संचालित मदद"}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-primary-foreground/20 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-foreground px-3 py-2 rounded-xl rounded-bl-sm">
                    <Spinner />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border px-3 py-3 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    lang === "en"
                      ? "Type your question..."
                      : lang === "hi"
                        ? "अपना सवाल टाइप करें..."
                        : "अपना सवाल टाइप करीं..."
                  }
                  className="flex-1 px-3 py-2 text-sm rounded-lg bg-secondary border-0 focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
