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

interface ToggleFollowAction extends BaseAction {
  type: "TOGGLE_FOLLOW";
  payload: {
    uid: string;
  };
}

interface AddUserAction extends BaseAction {
  type: "ADD_USER";
  payload: {
    name: string;
    profile: string;
  };
}

type AppAction = SendMessageAction | ToggleFollowAction | AddUserAction;
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
    { from: "user2", to: "user1", message: "I have a question" },
    { from: "user1", to: "user2", message: "Yes?" },
    { from: "user2", to: "user1", message: "Can we meet tomorrow?" },
    { from: "user1", to: "user2", message: "Sure, what time?" },
    { from: "user2", to: "user1", message: "How about 2 PM?" },
    { from: "user1", to: "user2", message: "Sounds good!" },
    { from: "user3", to: "user1", message: "Are you available?" },
    { from: "user1", to: "user3", message: "Yes, I am" },
    { from: "user3", to: "user1", message: "I need your help" },
    { from: "user1", to: "user3", message: "Okay, tell me what you need" },

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
    {
      uid: "user4",
      name: "User 4",
      profile: "https://randomuser.me/api/portraits/women/71.jpg",
      following: false,
      loggedTime: 60,
    },
    {
      uid: "user5",
      name: "User 5",
      profile: "https://randomuser.me/api/portraits/men/70.jpg",
      following: true,
      loggedTime: 45,
    },
    {
      uid: "user6",
      name: "User 6",
      profile: "https://randomuser.me/api/portraits/men/69.jpg",
      following: false,
      loggedTime: 75,
    },
    {
      uid: "user7",
      name: "User 7",
      profile: "https://randomuser.me/api/portraits/men/68.jpg",
      following: true,
      loggedTime: 90,
    },
    {
      uid: "user8",
      name: "User 8",
      profile: "https://randomuser.me/api/portraits/women/67.jpg",
      following: false,
      loggedTime: 55,
    },
    {
      uid: "user9",
      name: "User 9",
      profile: "https://randomuser.me/api/portraits/women/66.jpg",
      following: true,
      loggedTime: 110,
    },
    {
      uid: "user10",
      name: "User 10",
      profile: "https://randomuser.me/api/portraits/men/65.jpg",
      following: false,
      loggedTime: 65,
    }

  ],
  openChat: null,
  currentUser: "user1",
});

// Create the context with a default value that matches the AppContextType
const Context = React.createContext<AppContextType>({
  state: initialState(),
  dispatch: () => null 
});
const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SEND_MESSAGE":
      return {
        ...state,
        // Add the new message to the existing messages array
        messages: [...state.messages, action.payload],
      };
    case "TOGGLE_FOLLOW":
      return {
        ...state,
        users: state.users.map(user => 
          user.uid === action.payload.uid 
            ? { ...user, following: !user.following }
            : user 
        )
      };
    case "ADD_USER":
      const newUser: User = {
        uid: `user${Date.now()}`, // Simple unique ID generation
        name: action.payload.name,
        profile: action.payload.profile,
        following: false,
        loggedTime: 0,
      };
      return {
        ...state,
        users: [...state.users, newUser],
      };
    default:
      return state; 
  }
};

const Navbar = () => {
  const { state } = useContext(Context);
  const currentUser = state.users.find(user => user.uid === state.currentUser);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Netic
          </div>
          {currentUser && (
            <div className="flex items-center space-x-2">
              <img
                src={currentUser.profile}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {currentUser.name}
              </span>
            </div>
          )}
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
  onAddNewChat: () => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTabId, onTabClick, onAddNewChat }) => {
  return (
    <div> 
      <nav className="-mb-px flex space-x-4" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.uid}
            onClick={() => onTabClick(tab.uid)}
            className={`whitespace-nowrap px-1 border-b-2 font-medium text-sm focus:outline-none ${
              activeTabId === tab.uid
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600"
            }`}
          >
            {tab.name}
          </button>
        ))}
        <button
          onClick={onAddNewChat}
          className="ml-2 p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 focus:outline-none"
          aria-label="Start new chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
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
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Chat with {userName}
        </h2>
      </div>

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

      <form
        onSubmit={handleSendMessage}
        className="px-4 py-2 border-t dark:border-gray-700 flex items-center"
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
  const { state } = useContext(Context); // Use shared context
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [showUserSelection, setShowUserSelection] = useState<boolean>(false);
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
  const availableUsersForNewChat = useMemo(() => {
    const activeChatUserIds = new Set(activeChatUsers.map(u => u.uid));
    return state.users.filter(
      user => user.uid !== state.currentUser && !activeChatUserIds.has(user.uid)
    ).sort((a,b) => a.name.localeCompare(b.name));
  }, [state.users, activeChatUsers, state.currentUser]);

  const activateChat=(uid:string)=>{
    setShowUserSelection(false)
    setActiveChat(uid)
  }

  const handleStartNewChat = (userId: string) => {
    setActiveChat(userId);
    setShowUserSelection(false);
  };
  return (
    <main className="container mx-auto px-4 w-sm">
      {activeChatUsers.length > 0 && (
        <Tabs
          tabs={activeChatUsers}
          activeTabId={activeChat}
          onTabClick={activateChat}
          onAddNewChat={() => setShowUserSelection(!showUserSelection)}
        />
      )}
      {showUserSelection && (
        <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 ">Start a new chat with:</h3>
          {availableUsersForNewChat.length > 0 ? (
            <ul className="max-h-40 overflow-y-auto space-y-1">
              {availableUsersForNewChat.map(user => (
                <li key={user.uid}>
                  <button onClick={() => handleStartNewChat(user.uid)} className="w-full text-left px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md focus:outline-none">
                    {user.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400">No new users to chat with.</p>
          )}
        </div>
      )}
      {activeChat && !showUserSelection ? (
        <Chat conversation={activeChat} />
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
          Select a user to start a chat.
        </div>
      )}
    </main>
  );
};

const UserCard = ({ user }: { user: User }) => {
  const { dispatch } = useContext(Context);
  const toggleFollow=(uid:string)=>{
    console.log(uid)
    dispatch({
      type: "TOGGLE_FOLLOW",
      payload: {
        uid,
      },
    });
  }
  return (
    <div>
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
              Logged time {Math.floor(user.loggedTime / 60)}:
              {(user.loggedTime % 60).toString().padStart(2, "0")}
            </p>
            <button 
              onClick={()=>toggleFollow(user.uid)}
              className={`mt-2 px-3 py-1 text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                user.following 
                  ? "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400" 
                  : "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400"
              }`}
            >
              {user.following ? "Unfollow" : "Follow"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AddUserFormProps {
  onClose: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onClose }) => {
  const { dispatch } = useContext(Context);
  const [name, setName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !profileUrl.trim()) {
      alert("Please enter both name and profile image URL.");
      return;
    }
    dispatch({
      type: "ADD_USER",
      payload: { name, profile: profileUrl },
    });
    setName("");
    setProfileUrl("");
    onClose(); // Close the form after submission
  };

  return (
    <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Add New User</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            id="userName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            placeholder="Enter user name"
          />
        </div>
        <div>
          <label htmlFor="profileUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Image URL</label>
          <input
            type="text"
            id="profileUrl"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            placeholder="Enter image URL"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Cancel</button>
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Add User</button>
        </div>
      </form>
    </div>
  );
};

const UsersBox = () => {
  const { state } = useContext(Context);
  const totalTime=useMemo(()=>state.users.reduce((acc,user)=>acc+user.loggedTime,0),[state.users])
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  if (!state.users || state.users.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        No users available.
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-lg max-h-[calc(100vh-6rem)] overflow-hidden">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center sm:text-left">
          All Users
        </h2>
        <h4 className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left mt-1">
          Total allocated time: {Math.floor(totalTime/60)}h {totalTime%60}m
        </h4>
        <button
          onClick={() => setShowAddUserForm(!showAddUserForm)}
          className="mt-3 w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-green-400"
        >
          {showAddUserForm ? 'Cancel Adding User' : 'Add New User'}
        </button>
      </div>
      {showAddUserForm && <AddUserForm onClose={() => setShowAddUserForm(false)} />}
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto ${showAddUserForm ? 'pt-2' : 'pt-4'} px-4 pb-4`}>
        {state.users.map((user) => ( user.uid==state.currentUser ? null :
          <UserCard key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState); // Pass initializer function as the third argument

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div>
        <Navbar />
        <div className="flex flex-col lg:flex-row justify-center gap-6 p-3">
          <div className="w-full lg:w-[384px] xl:w-[448px] lg:flex-shrink-0">
            <UsersBox />
          </div>
          <div className="w-full lg:flex-1 lg:max-w-3xl min-w-0">
            <ChatBox />
          </div>
        </div>
      </div>
    </Context.Provider>
  );
}

