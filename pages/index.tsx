import React, {
  useReducer,
  useState,
  useMemo,
  useContext,
  Dispatch,
} from "react";

interface Message {
  from: string;
  to: string;
  message: string;
}

interface User {
  uid: string;
  name: string;
  profile: string;
  following: boolean;
  loggedTime: number; // Representing minutes
}

interface BaseAction {
  type: string;
}

interface SendMessageAction extends BaseAction {
  type: "SEND_MESSAGE";
  payload: {
    from: string;
    to: string;
    message: string;
  };
}

type AppAction = SendMessageAction;
type AppState = {
  messages: Message[];
  users: User[];
  openChat: string | null;
  currentUser: string;
};

// Define the shape of the context value
interface AppContextType {
  state: AppState;
  dispatch: Dispatch<AppAction>; // Correct type for dispatch
}
const initialState = (): AppState => ({
  messages: [
    { from: "user1", to: "user2", message: "Hello user2" },
    { from: "user2", to: "user1", message: "Hello user1" },
    { from: "user1", to: "user3", message: "Hello user3" },
    { from: "user3", to: "user1", message: "Hello user1" },
    { from: "user2", to: "user3", message: "Hello user3" },
    { from: "user3", to: "user2", message: "Hello user2" },
    { from: "user1", to: "user2", message: "How are you?" },
    { from: "user2", to: "user1", message: "I am fine, thank you" },
    { from: "user3", to: "user1", message: "Nice to meet you" },
    { from: "user1", to: "user3", message: "Nice to meet you too" },
  ],
  users: [
    {
      uid: "user1",
      name: "User 1",
      profile: "https://randomuser.me/api/portraits/women/74.jpg",
      following: true,
      loggedTime: 80,
    },
    {
      uid: "user2",
      name: "User 2",
      profile: "https://randomuser.me/api/portraits/women/73.jpg",
      following: false,
      loggedTime: 30,
    },
    {
      uid: "user3",
      name: "User 3",
      profile: "https://randomuser.me/api/portraits/women/72.jpg",
      following: true,
      loggedTime: 100,
    },
  ],
  openChat: null,
  currentUser: "user1",
});

// Create the context with a default value that matches the AppContextType
const Context = React.createContext<AppContextType>({
  state: initialState(),
  dispatch: () => null /* No-op for default dispatch */,
});
const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return {
        ...state,
        // Add the new message to the existing messages array
        messages: [...state.messages, action.payload],
      };
    default:
      return state; // Return the state directly
  }
};

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            Netic
          </div>
          <div>{/* Add navigation links or other elements here */}</div>
        </div>
      </div>
    </nav>
  );
};

// Tabs Component
interface TabItem {
  uid: string;
  name: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTabId: string | null;
  onTabClick: (uid: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTabId, onTabClick }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
      <nav className="-mb-px flex space-x-4" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.uid}
            onClick={() => onTabClick(tab.uid)}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none ${
              activeTabId === tab.uid
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  );
};
interface ChatProps {
  conversation: string;
}

const Chat = ({ conversation }: ChatProps) => {
  const { state, dispatch } = useContext(Context);
  const [newMessage, setNewMessage] = useState("");
  const userName = useMemo(
    () => state.users.find((user) => user.uid === conversation)?.name,
    [state.users, conversation]
  );

  const messages = useMemo(() => {
    return state.messages.filter(
      (message) =>
        (message.to === conversation && message.from === state.currentUser) ||
        (message.from === conversation && message.to === state.currentUser)
    );
  }, [state.messages, conversation, state.currentUser]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    dispatch({
      type: "SEND_MESSAGE",
      payload: {
        from: state.currentUser,
        to: conversation,
        message: newMessage.trim(),
      },
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]  bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      {/* Chat Header */}
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Chat with {userName}
        </h2>
      </div>

      {/* Messages Area */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.from === state.currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.from === state.currentUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t dark:border-gray-700 flex items-center"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 border rounded-l-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

const ChatBox = () => {
  const [state] = useReducer(reducer, undefined, initialState); // Pass initializer function as the third argument
  const [activeChat, setActiveChat] = useState<string>("");
  const activeChatUsers = useMemo(() => {
    const activeChats = state.messages
      .filter((message) => message.from === state.currentUser)
      .map((message) => message.to)
      .reduce<string[]>((output, current) => {
        if (!output.includes(current)) output.push(current);
        return output;
      }, []);
    return state.users.filter((user) => activeChats.includes(user.uid));
  }, [state.messages, state.users, state.currentUser]);
  return (
    <main className="container mx-auto px-4 py-4 w-sm">
      {activeChatUsers.length > 0 && (
        <Tabs
          tabs={activeChatUsers}
          activeTabId={activeChat}
          onTabClick={setActiveChat}
        />
      )}
      {activeChat ? <Chat conversation={activeChat} /> : 
        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
          Select a user to start a chat.
        </div>
      }
    </main>
  );
};

const UserCard = ({ user }: { user: User }) => {
  const { state, dispatch } = useContext(Context);
  return <div>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
      <div className="flex items-center space-x-4">
        <img
          src={user.profile}
          alt={user.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {user.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Logged time {Math.floor(user.loggedTime/60)}:{user.loggedTime%60}
          </p>
        </div>
      </div>
    </div>

  </div>
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState); // Pass initializer function as the third argument

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div>
        <Navbar />
        <div class="flex justify-content-center flex-row flex-wrap">
          <div class="max-w-2xl">
            {state.users.map((user,key)=><UserCard key={key} user={user} />)}
          </div>
          <ChatBox />
        </div>
      </div>
    </Context.Provider>
  );
}
