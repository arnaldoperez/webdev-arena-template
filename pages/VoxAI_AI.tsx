/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { Menu, X, Send, StopCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: "user" | "ai"; content: string; timestamp: Date }>
  >([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event);
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");

        setUserInput(transcript);
      };

      recognitionRef.current = recognition;
    } else {
      console.error("Speech recognition not supported");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === "") return;

    const newMessage = {
      role: "user" as const,
      content: userInput,
      timestamp: new Date(),
    };

    setChatMessages([...chatMessages, newMessage]);
    setUserInput("");
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = {
        role: "ai" as const,
        content: `You said: ${userInput}`,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      if (!isListening) {
        recognitionRef.current.start();
      } else {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleClearChat = () => {
    setChatMessages([]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderMessageContent = (message: {
    role: "user" | "ai";
    content: string;
    timestamp: Date;
  }) => {
    if (message.content.startsWith("http")) {
      return (
        <div className="mt-2">
          <img
            src={message.content}
            alt="AI generated content"
            className="rounded-lg max-w-full h-auto"
          />
          <div className="text-xs text-gray-500 mt-1">
            {formatTime(message.timestamp)}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        <span>{message.content}</span>
        <span className="text-xs text-gray-500 mt-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 overflow-hidden">
      <div className="flex flex-col w-full">
        <header className="px-4 py-4 flex justify-between items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-blue-100 dark:border-gray-700 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              AI Assistant
            </h1>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearChat}
              className="px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-200"
            >
              Clear Chat
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVoiceInput}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                isListening
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/30"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
              } transition-all duration-200`}
            >
              {isListening ? (
                <>
                  <StopCircle className="h-4 w-4" />
                  <span>Stop Listening</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Voice Input</span>
                </>
              )}
            </motion.button>
          </div>
        </header>

        <main className="flex flex-col flex-1 relative overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md p-4 rounded-lg shadow-lg ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-blue-100 dark:border-gray-700"
                  }`}
                >
                  {renderMessageContent(message)}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start"
              >
                <div className="max-w-md p-4 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-blue-100 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="sticky bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-blue-100 dark:border-gray-700 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                className="flex-1 p-3 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-blue-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Type your message..."
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-r border-blue-100 dark:border-gray-700 z-30"
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-blue-100 dark:border-gray-700">
                <h2 className="text-lg font-bold">Menu</h2>
              </div>
              <div className="flex-1 p-4 space-y-2">
                <button
                  onClick={handleClearChat}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-200"
                >
                  Clear Chat
                </button>
              </div>
              <div className="p-4 border-t border-blue-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  AI Assistant
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
// Zod Schema
export const Schema = {
    "commentary": "I will create a simple chatbot UI with a welcome page and a chat interface. The welcome page will have a fantasy-themed character illustration and a \"Get Started\" button to navigate to the chat page. The chat interface will support both text and voice input, and will display the conversation in a clean and interactive format.",
    "template": null,
    "title": "Chatbot UI",
    "description": "A simple chatbot UI with text and voice input.",
    "port": 3000,
    "file_path": "pages/index.tsx",
    "code": "<see code above>",
    "install_dependencies_command": "npm i motion lucide-react",
    "additional_dependencies": [
        "motion",
        "lucide-react"
    ],
    "has_additional_dependencies": true
}