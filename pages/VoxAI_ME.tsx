import { useState, useEffect, useRef, ChangeEventHandler } from "react";
import {
  X,
  Send,
  ImagePlus,
  Mic,
  Pause,
  XCircle,
  Stars,
  AlignLeft,
  EllipsisVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ImageContent {
  url: string;
  name: string;
}

interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  image?: ImageContent | null;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
  // readonly interpretation: unknown; // Deprecated
  // readonly emma: Document | null; // Deprecated
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string; // DOMException code, e.g., 'not-allowed', 'no-speech'
  readonly message: string;
}

interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
}

interface SpeechRecognition extends EventTarget {
  grammars: unknown; // In a full definition, this would be SpeechGrammarList
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  // serviceURI?: string; // Deprecated

  start(): void;
  stop(): void;
  abort(): void;

  onaudiostart: ((this: SpeechRecognition, ev: Event) => unknown) | null;
  onaudioend: ((this: SpeechRecognition, ev: Event) => unknown) | null;
  onend: ((this: SpeechRecognition, ev: Event) => unknown) | null;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => unknown)
    | null;
  onnomatch:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => unknown)
    | null;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => unknown)
    | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => unknown) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => unknown) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => unknown) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => unknown) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => unknown) | null;

  addEventListener<K extends keyof SpeechRecognitionEventMap>(
    type: K,
    listener: (
      this: SpeechRecognition,
      ev: SpeechRecognitionEventMap[K]
    ) => unknown,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof SpeechRecognitionEventMap>(
    type: K,
    listener: (
      this: SpeechRecognition,
      ev: SpeechRecognitionEventMap[K]
    ) => unknown,
    options?: boolean | EventListenerOptions
  ): void;
}

// Map event types to their event object types
interface SpeechRecognitionEventMap {
  audiostart: Event;
  audioend: Event;
  end: Event;
  error: SpeechRecognitionErrorEvent;
  nomatch: SpeechRecognitionEvent;
  result: SpeechRecognitionEvent;
  soundstart: Event;
  soundend: Event;
  speechstart: Event;
  speechend: Event;
  start: Event;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionStatic;
    webkitSpeechRecognition?: SpeechRecognitionStatic; // For browsers like Safari, older Chrome/Edge
  }
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const NavBar = ({
  handleClearChat,
  toggleSidebar,
  isSidebarOpen,
  isTalking,
}: {
  handleClearChat: () => void;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  isTalking: boolean;
}) => {
  return (
    <header className="px-4 py-4 flex justify-between items-center bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border-b border-blue-100 dark:border-gray-700 z-10">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-full bg-gradient-to-r from-zinc-500 to-zinc-600 text-white shadow-lg shadow-zinc-500/20 hover:shadow-zinc-500/30 transition-all duration-200"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <AlignLeft className="h-5 w-5" />
        )}
      </button>
      <h1 className="text-xl flex font-bold text-white  bg-clip-text text-transparent">
        <Stars className="h-5 w-5 mr-4" />
        {isTalking ? "Talk with Vox AI" : "Vox AI"}
      </h1>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClearChat}
        className="p-2 rounded-full bg-gradient-to-r from-zinc-500 to-zinc-600 text-white shadow-lg shadow-zinc-500/20 hover:shadow-zinc-500/30 transition-all duration-200"
      >
        <EllipsisVertical className="h-5 w-5" />
      </motion.button>
    </header>
  );
};

const UserInput = ({
  newMessageHandler,
  recognition,
  onListeningChange,
}: {
  newMessageHandler: (message: Message) => void;
  recognition: SpeechRecognition | undefined;
  onListeningChange: (isListening: boolean) => void;
}) => {
  const [userInput, setUserInput] = useState("");
  const [speechInput, setSpeechInput] = useState<string>("");
  const [image, setImage] = useState<ImageContent | null>();
  const [isListening, setIsListening] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!recognition) return;

    console.log("Initializing SpeechRecognition event listeners in UserInput");
    console.log(recognition);
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
      console.log("Speech recognition result", event);
      const transcript = Array.from(event.results)
        .map((result) => {
          console.log(result[0].transcript);
          return result[0].transcript;
        })
        .join("");
      setSpeechInput(transcript);
    };
    // Depend on recognition.current so if it changes, listeners are re-attached.
    // Note: SpeechRecognition instance itself might not be stable if re-created in parent.
  }, [recognition]); // Added recognition.current for robustness

  useEffect(
    () => onListeningChange(isListening),
    [isListening, onListeningChange]
  );

  const toggleSpeechListening = () => {
    if (recognition) {
      setIsPaused(false);
      if (!isListening) {
        console.log("Starting listening");
        recognition.start();
        setIsListening(true);
      } else {
        recognition.stop();
        setIsListening(false);
        setUserInput(speechInput || "");
      }
    }
  };

  const cancelSPeechListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const toggleSpeechPause = () => {
    if (!recognition) return;
    if (isPaused) {
      recognition.start();
      setIsPaused(false);
    } else {
      recognition.stop();
      setIsPaused(true);
    }
  };

  const fileDialog = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    const newMessage = {
      role: "user" as const,
      content: userInput,
      timestamp: new Date(),
      image,
    };
    if (userInput.trim() === "") return;
    newMessageHandler(newMessage);
    setUserInput("");
    setImage(null);
  };
  const handleFileSelect: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (!files || files.length == 0) return;
    console.log({ files: files.length });
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!file) continue;
      const image = {
        url: URL.createObjectURL(file),
        name: file.name,
      };
      setImage(image);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm p-1">
      {image && (
        <div className="absolute right-4 bottom-full mb-2 flex gap-2 p-2 bg-white/70 dark:bg-zinc-700/70 backdrop-blur-sm rounded-lg shadow-md max-w-xs sm:max-w-md md:max-w-lg ">
          <div className="relative group flex-shrink-0">
            <img
              src={image.url}
              alt={image.name}
              className="w-32 h-32 object-cover rounded-md border border-gray-300 dark:border-gray-600"
            />
            <button
              onClick={() => removeImage()}
              className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              aria-label="Remove image"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <div className="flex gap-1 items-center justify-between">
        {!isListening && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileDialog.current?.click()}
            className="p-3 rounded-lg hover:bg-gradient-to-r from-violet-500 to-cyan-600 text-white transition-all duration-200"
            aria-label="Send message"
          >
            <input
              type="file"
              name="image"
              id=""
              className="hidden"
              ref={fileDialog}
              onChange={handleFileSelect}
              accept="image/*"
            />
            <ImagePlus className="h-5 w-5" />
          </motion.button>
        )}
        {!isListening && (
          <div className="flex flex-1 items-center rounded-full bg-white/50 dark:bg-zinc-700/50 backdrop-blur-sm border border-blue-100 dark:border-gray-600 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1 bg-transparent px-4 py-3 outline-none placeholder-gray-500 dark:placeholder-gray-400"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  // Prevent newline on Enter, allow Shift+Enter
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your message..."
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              className="p-3 rounded-full hover:bg-gradient-to-r from-violet-500 to-cyan-600 text-white transition-all duration-200 mr-1" // Added mr-1 for slight spacing from edge
              aria-label="Send message"
            >
              <Send className="h-5 w-5 text-blue-500" />
            </motion.button>
          </div>
        )}
        {isListening && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSpeechPause}
            className={`p-3 rounded-lg hover:bg-gradient-to-r from-violet-500 to-cyan-600 text-white transition-all duration-200`}
            aria-label="Send message"
          >
            <Pause className="h-5 w-5" />
          </motion.button>
        )}
        {isListening && (
          <motion.button
            style={{ scale: 2 }}
            onClick={toggleSpeechListening}
            className="p-3 mb-5 relative bg-gradient-to-r from-violet-500 to-cyan-600 text-white rounded-full transition-all duration-500"
            aria-label="Send message"
          >
            <Mic className="h-5 w-5" />
          </motion.button>
        )}

        {recognition && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              isListening ? cancelSPeechListening() : toggleSpeechListening()
            }
            className={`p-3 rounded-lg hover:bg-gradient-to-r from-violet-500 to-cyan-600 text-white transition-all duration-200`}
            aria-label="Send message"
          >
            {isListening ? (
              <XCircle className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
};

const MessageContent = ({ message }: { message: Message }) => {
  return (
    <div className="flex flex-col">
      {message.image && (
        <img
          src={message.image.url}
          alt="AI generated content"
          className="rounded-lg max-w-full h-auto"
        />
      )}
      <span>{message.content}</span>
      <span className="text-xs text-zinc-500 mt-1">
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
};

interface SplashScreenProps {
  imageUrl: string;
  title: string;
  text: string;
  onComplete?: () => void; // Optional: Callback for when splash is done (e.g., after a button click or timeout)
  buttonText?: string; // Optional: Text for a continue button
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  imageUrl,
  title,
  text,
  onComplete,
  buttonText = "Get Started",
}) => {
  return (
    <motion.div
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-end z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt="Splash screen background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-gradient-to-t from-black via-black/80 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 p-8 md:p-12 text-center text-white mb-8 md:mb-16 max-w-2xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-lg md:text-xl mb-8 leading-relaxed drop-shadow-md">
          {text}
        </p>
        {onComplete && (
          <motion.button
            onClick={onComplete}
            className="px-8 py-3 bg-gradient-to-r from-violet-500 to-cyan-600 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300 text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

function App() {
  const [chatMessages, setChatMessages] = useState<Array<Message>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] =
    useState<SpeechRecognition>();
  const [hideSplash, setHideSplash] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech recognition not supported");
      return;
    }
    const newSpeechRecognition = new SpeechRecognition();
    newSpeechRecognition.continuous = true;
    newSpeechRecognition.interimResults = true;
    newSpeechRecognition.lang = "en-US";
    setSpeechRecognition(newSpeechRecognition);

    //recognition.current = recognition;
    //return true;
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = (newMessage: Message) => {
    setIsLoading(true);

    setChatMessages([...chatMessages, newMessage]);

    setTimeout(() => {
      const aiResponse: Message = {
        role: "ai" as const,
        content: `You said: ${newMessage.content}`,
        timestamp: new Date(),
      };

      if (newMessage.image) {
        aiResponse.image = newMessage.image;
        aiResponse.content =
          aiResponse.content + " And also sent this image 👆";
      }

      setChatMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleClearChat = () => {
    setChatMessages([]);
  };

  if (!hideSplash)
    return (
      <SplashScreen
        imageUrl="https://images2.alphacoders.com/107/thumb-1920-1077531.jpg"
        title="Vox AI"
        text="The most epic AI ever created"
        buttonText="Get Started"
        onComplete={() => setHideSplash(true)}
      />
    );
  else
    return (
      <div className="flex h-screen bg-gradient-to-br from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 overflow-hidden">
        <div className="flex flex-col w-full">
          <NavBar
            handleClearChat={handleClearChat}
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            isTalking={isListening}
          />
          <main className="flex flex-col bg-zinc-800 flex-1 relative overflow-hidden">
            {!isListening ? (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "ai" && <Stars />}
                    <div
                      className={`max-w-md p-4 rounded-lg shadow-lg ${
                        message.role === "user"
                          ? "bg-gray-700 text-white"
                          : "bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm dark:border-gray-700"
                      }`}
                    >
                      <MessageContent message={message} />
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
                    <div className="max-w-md p-4 rounded-lg bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border border-blue-100 dark:border-gray-700">
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
            ) : (
              <div className="flex-1 overflow-y-auto p-4 flex justify-center items-center">
                <div className="relative w-32 h-32">
                  <div className=" bg-blue-500 shadow-xl shadow-blue-500/50 absolute inset-0 w-32 h-32 bg-gradient-to-r from-cyan-500/50 to-purple-600/50 rounded-full animate-spin flex items-center justify-center"></div>
                  <div
                    className="rotate-180 bg-blue-500 shadow-xl shadow-purple-500/50 absolute inset-0 w-32 h-32 bg-gradient-to-r from-indigo-500/50 to-pink-600/50 rounded-full animate-spin flex items-center justify-center"
                    style={{ animationDelay: "-0.5s" }}
                  ></div>{" "}
                  {/* Optional: offset spin for better visual effect */}
                  <div className="rotate-90 bg-blue-500 shadow-xl shadow-blue-500/50 absolute inset-0 w-32 h-32 bg-gradient-to-r from-cyan-500/50 to-purple-600/50 rounded-full animate-spin flex items-center justify-center"></div>
                  <div
                    className="rotate-270 bg-blue-500 shadow-xl shadow-purple-500/50 absolute inset-0 w-32 h-32 bg-gradient-to-r from-indigo-500/50 to-pink-600/50 rounded-full animate-spin flex items-center justify-center"
                    style={{ animationDelay: "-0.5s" }}
                  ></div>{" "}
                  {/* Optional: offset spin for better visual effect */}
                </div>
              </div>
            )}
            <UserInput
              newMessageHandler={handleSendMessage}
              recognition={speechRecognition}
              onListeningChange={setIsListening}
            />
          </main>
        </div>

        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 w-64 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border-r border-blue-100 dark:border-gray-700 z-30"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-blue-100 dark:border-gray-700">
                  <h2 className="text-lg font-bold flex items-center justify-between">
                    Menu
                    <span>
                      {" "}
                      <button
                        className="p-2 rounded-full bg-gradient-to-r from-zinc-500 to-zinc-600 text-white shadow-lg shadow-zinc-500/20 hover:shadow-zinc-500/30 transition-all duration-200"
                        aria-label="Toggle sidebar"
                      >
                        <X
                          className="h-5 w-5"
                          onClick={() => setIsSidebarOpen(false)}
                        />
                      </button>
                    </span>
                  </h2>
                </div>
                <div className="flex-1 p-4 space-y-2"></div>
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
  commentary:
    'I will create a simple chatbot UI with a welcome page and a chat interface. The welcome page will have a fantasy-themed character illustration and a "Get Started" button to navigate to the chat page. The chat interface will support both text and voice input, and will display the conversation in a clean and interactive format.',
  template: null,
  title: "Chatbot UI",
  description: "A simple chatbot UI with text and voice input.",
  port: 3000,
  file_path: "pages/index.tsx",
  code: "<see code above>",
  install_dependencies_command: "npm i motion lucide-react",
  additional_dependencies: ["motion", "lucide-react"],
  has_additional_dependencies: true,
};
