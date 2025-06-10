/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/*
I need a web interface that displays a prominent news introduction with an image, 
a large heading, and a short description.

he main page should have user profile access, clear tabs to filter news by categories
(such as All, Sports, Science), and a featured article section with images, dates, 
and brief headlines. 

There should be quick action icons for bookmarking articles and navigation at the bottom for home, 
search, and bookmarks. 

Another section highlights the best articles with thumbnail images and headlines. 

Include an authors list with profile images, names, and concise subtitles, as well 
as an option to add or follow each author. Make sure all elements are visually clear and easy 
to navigate.
*/

import type React from "react";
import {
  useState,
  useEffect,
  useRef,
  createContext,
  useReducer,
  ElementType,
  useContext,
  useMemo,
  useCallback,
} from "react";
import {
  Search,
  Bookmark,
  Home,
  Video,
  Bell,
  Settings,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  author: string;
  authorPhoto: string;
  subtitle: string;
}

interface Author {
  id: number;
  name: string;
  photo: string;
  subtitle: string;
}

const featuredArticles: Article[] = [
  {
    id: 1,
    title: "Revolutionary Science Breakthrough Changes Everything",
    description:
      "A groundbreaking discovery is set to revolutionize multiple industries and scientific fields. Researchers have developed a new method that...",
    category: "Science",
    image:
      "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=2787&auto=format&fit=crop",
    date: "May 12",
    author: "Alex Johnson",
    authorPhoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    subtitle: "Science Editor",
  },
  {
    id: 2,
    title: "Sports World Reacts to Historic Championship",
    description:
      "The city erupts in celebration as local team secures first-ever championship title. Fans from all over the world...",
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=2070&auto=format&fit=crop",
    date: "May 10",
    author: "Michael Chen",
    authorPhoto:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1976&auto=format&fit=crop",
    subtitle: "Sports Correspondent",
  },
  {
    id: 3,
    title: "Tech Giants Announce Game-Changing Partnership",
    description:
      "Two industry leaders join forces to develop revolutionary new technology that promises to change how we interact with...",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1976&auto=format&fit=crop",
    date: "May 8",
    author: "Sarah Williams",
    authorPhoto:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Tech Journalist",
  },
  {
    id: 4,
    title: "Health Experts Warn About New Global Trend",
    description:
      "A concerning pattern has emerged in recent health data that researchers are calling 'unprecedented' and 'potentially dangerous.'...",
    category: "Health",
    image:
      "https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=1971&auto=format&fit=crop",
    date: "May 5",
    author: "Emily Rodriguez",
    authorPhoto:
      "https://images.unsplash.com/photo-1494565076045-adf03162665c?q=80&w=1470&auto=format&fit=crop",
    subtitle: "Health Reporter",
  },
  {
    id: 5,
    title: "Economic Forecast Sparks Debate Among Experts",
    description:
      "Contradictory economic indicators have led to heated discussions about what the future holds for global markets. Some predict...",
    category: "Business",
    image:
      "https://images.unsplash.com/photo-1543966888-7c1dc482a810?q=80&w=2069&auto=format&fit=crop",
    date: "May 3",
    author: "David Thompson",
    authorPhoto:
      "https://images.unsplash.com/photo-1513764648501-e1deb69126b1?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Economic Analyst",
  },
];

const bestArticles: Article[] = [
  {
    id: 6,
    title: "The Future of Artificial Intelligence",
    description:
      "AI is changing the way we live and work. In this article, we explore the potential of AI and its impact on society.",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1678186409889-56c5e2c13d4a?q=80&w=1972&auto=format&fit=crop",
    date: "Apr 30",
    author: "Emma Wilson",
    authorPhoto:
      "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?q=80&w=1974&auto=format&fit=crop",
    subtitle: "AI Researcher",
  },
  {
    id: 7,
    title: "The Benefits of a Plant-Based Diet",
    description:
      "A plant-based diet has been shown to have numerous health benefits. In this article, we explore the science behind it.",
    category: "Health",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?q=80&w=1976&auto=format&fit=crop",
    date: "Apr 25",
    author: "Dr. Maria Rodriguez",
    authorPhoto:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Nutritionist",
  },
  {
    id: 8,
    title: "The Impact of Climate Change on Our Planet",
    description:
      "Climate change is one of the most pressing issues of our time. In this article, we explore its effects on our planet.",
    category: "Environment",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    date: "Apr 20",
    author: "John Taylor",
    authorPhoto:
      "https://images.unsplash.com/photo-1546453667-8a8d2d07bc20?q=80&w=1976&auto=format&fit=crop",
    subtitle: "Environmental Scientist",
  },
];

const authors: Author[] = [
  {
    id: 1,
    name: "Alex Johnson",
    photo:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop",
    subtitle: "Science Editor",
  },
  {
    id: 2,
    name: "Michael Chen",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1971&auto=format&fit=crop",
    subtitle: "Sports Correspondent",
  },
  {
    id: 3,
    name: "Sarah Williams",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop",
    subtitle: "Tech Journalist",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    photo:
      "https://images.unsplash.com/photo-1513764648501-e1deb69126b1?q=80&w=2070&auto=format&fit=crop",
    subtitle: "Health Reporter",
  },
];

type AppState = {
  categories: string[];
  activeCategory: string;
  activeSection: string;
  bookmarkedArticles: number[];
  searchQuery: string;
};

type CategoryAction = {
  type: "ACTIVATE_CATEGORY";
  payload: string;
};

type BookmarkAction = {
  type: "TOGGLE_BOOKMARK";
  payload: number;
};

type SectionAction = {
  type: "ACTIVATE_SECTION";
  payload: string;
};

type QueryAction = {
  type: "SEARCH_QUERY";
  payload: string;
};

type AppAction = CategoryAction | BookmarkAction | SectionAction | QueryAction;

const AppContext = createContext<{
  store: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  store: {
    categories: [],
    activeCategory: "",
    bookmarkedArticles: [],
    activeSection: "home",
    searchQuery: "",
  },
  dispatch: () => {},
});

const initStore = () => {
  const categories = [...bestArticles, ...featuredArticles]
    .map((article) => article.category)
    .reduce(
      (output, category) =>
        output.includes(category) ? output : [...output, category],
      ["All"]
    );
  return {
    categories,
    activeCategory: "All",
    bookmarkedArticles: [],
    activeSection: "home",
    searchQuery: "",
  };
};

const appReducer = (store: AppState, actions: AppAction) => {
  switch (actions.type) {
    case "ACTIVATE_CATEGORY":
      if (["", "All"].includes(actions.payload))
        return { ...store, activeCategory: "All" };
      return { ...store, activeCategory: actions.payload };
    case "TOGGLE_BOOKMARK":
      const foundIndex = store.bookmarkedArticles.findIndex(
        (id) => id === actions.payload
      );
      if (foundIndex >= 0) {
        return {
          ...store,
          bookmarkedArticles: [
            ...store.bookmarkedArticles.splice(0, foundIndex),
            ...store.bookmarkedArticles.slice(foundIndex + 1),
          ],
        };
      } else {
        return {
          ...store,
          bookmarkedArticles: [...store.bookmarkedArticles, actions.payload],
        };
      }
    case "ACTIVATE_SECTION":
      return { ...store, activeSection: actions.payload };
    case "SEARCH_QUERY":
      return { ...store, searchQuery: actions.payload };
  }
  return store;
};

interface NavOption {
  id: string;
  name: string;
  Icon: ElementType;
}

const sections: Array<NavOption> = [
  { id: "home", name: "Latest News", Icon: Home },
  { id: "search", name: "Discover", Icon: Search },
  { id: "bookmarks", name: "Bookmarks", Icon: Bookmark },
  { id: "videos", name: "Videos", Icon: Video },
];

const Article: React.FC<{
  showIntro: boolean;
  showAuthor: boolean;
  isSquare?: boolean;
  article: Article;
}> = ({ article, showIntro, showAuthor, isSquare }) => {
  const { store, dispatch } = useContext(AppContext)
  const bookmarked=useMemo(()=>store.bookmarkedArticles.includes(article.id),[store.bookmarkedArticles,article.id])
  return (
    <div className={`relative max-sm:w-full overflow-hidden rounded-3xl ${isSquare?"aspect-square h-auto":"h-[60vh]"}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-stone-500 to-gray-300 opacity-90"></div>
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay"
        style={{
          backgroundImage: `url(${article.image || "/placeholder.svg"})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      <div className="relative h-full flex flex-col justify-end pb-4 px-6 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <div className={`absolute top-5 right-5 hover:cursor-pointer hover:text-blue-500 rounded-full p-2
            ${bookmarked?"bg-blue-400/80":"bg-neutral-400/80"}
            `} onClick={()=>dispatch({type:"TOGGLE_BOOKMARK",payload:article.id})}>
            <Bookmark size={22}/>
          </div>
          <span>{article.date}</span>
          <h1 className="text-lg md:text-2xl font-bold text-white leading-tight">
            {article.title}
          </h1>
          {showIntro && (
            <p className="text-white/80 mt-4 line-clamp-2 text-lg">
              {article.description}
            </p>
          )}
          {showAuthor && (
            <div className="flex items-center  text-white/80 text-sm">
              <div className="flex items-center">
                <img
                  src={article.authorPhoto || "/placeholder.svg"}
                  alt={article.author}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>{article.author}</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const { store, dispatch } = useContext(AppContext);

  return (
    <aside className="hidden md:flex flex-col w-64 dark:text-white dark:bg-gray-800 bg-white border-r border-gray-200 fixed top-0 left-0 h-full z-30">
      <div className="p-4 py-3 border-b border-gray-200 h-[60px] flex items-center">

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
            N
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
            News
          </h1>
        </motion.div>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() =>
              dispatch({ type: "ACTIVATE_SECTION", payload: section.id })
            }
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
              ${
                store.activeSection === section.id
                  ? "bg-violet-100 text-violet-600 font-semibold"
                  : "dark:text-white text-gray-700 hover:bg-gray-100 hover:text-gray-800"
              }`}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            <section.Icon
              size={20}
              className={`${
                store.activeSection === section.id
                  ? "text-violet-600"
                  : "text-gray-500"
              }`}
            />
            <span>{section.name}</span>
          </motion.button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1976&auto=format&fit=crop" // Placeholder, same as header
            alt="User Profile"
            className="w-10 h-10 rounded-full border border-gray-200 shadow-sm"
          />
          <div>
            <p className="text-sm font-medium dark:text-white text-gray-800">John Doe</p>
            <p className="text-xs dark:text-white text-gray-500 hover:text-violet-500">
              View Profile
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const BottomBar: React.FC = () => {
  const { store, dispatch } = useContext(AppContext);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 py-2 z-20">
      <div className="container mx-auto gap-1 px-4 flex justify-center items-center">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() =>
              dispatch({ type: "ACTIVATE_SECTION", payload: section.id })
            }
            className={`p-6 rounded-full border-t border-gray-200 ${
              store.activeSection === section.id
                ? "bg-blue-500"
                : "bg-white text-gray-500"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <section.Icon
              size={24}
              className={`mx-auto ${
                store.activeSection === section.id ? "fill-blue-500" : ""
              }`}
            />
          </motion.button>
        ))}
      </div>
    </nav>
  );
};

const SearchInput: React.FC = () => {
  const { store, dispatch } = useContext(AppContext);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  return store.activeSection === "home" ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center max-w-xs gap-4"
      onMouseLeave={() => setIsCollapsed(true)}
      onMouseEnter={() => setIsCollapsed(false)}
      onClick={() => setIsCollapsed(false)}
    >
      <Search size={22} className="text-gray-500" />
      {(!isCollapsed || store.searchQuery.trim() !== "") && (
        <motion.div
          className={`flex items-center bg-gray-100 rounded-full ${
            isSearchFocused ? "ring-2 ring-violet-300" : ""
          }`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <input
            type="text"
            placeholder="Search articles..."
            value={store.searchQuery}
            onChange={(e) =>
              dispatch({ type: "SEARCH_QUERY", payload: e.target.value })
            }
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className=" bg-transparent outline-none flex-1 text-sm placeholder-gray-400"
          />
          <motion.button
            onClick={() => dispatch({ type: "SEARCH_QUERY", payload: "" })}
            className="text-gray-400 hover:text-gray-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-sm">×</span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  ) : (
    ""
  );
};

const HeaderBar: React.FC = () => {
  const { store } = useContext(AppContext);

  const Buttons = () => (
    <div className="flex items-center gap-10 mr-6">
      <SearchInput />
      <Bell size={22} className="text-gray-500" />
      <Settings size={22} className="text-gray-500" />
    </div>
  );

  return (
    <header className="dark:bg-gray-800 bg-white shadow-sm sticky top-0 z-20 md:pl-64">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between h-[60px]">
        <h2 className="dark:text-white text-gray-800 text-lg font-bold">
          {sections.find((section) => section.id === store.activeSection)?.name}
        </h2>
        <div className="flex items-center">
          <Buttons />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative "
          >
            <img
              src="https://randomuser.me/api/portraits/med/men/11.jpg"
              alt="User Profile"
              className="w-8 h-8 rounded-full border border-gray-200 shadow-sm cursor-pointer"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

const MobileNewsApp: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const [store, dispatch] = useReducer(appReducer, initStore());

  const handleFollowAuthor = (authorName: string) => {
    setToastMessage(`You're now following ${authorName}`);
    setShowToast(true);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const filterArticles = useCallback((articles: Article[]) => {
    return articles.filter((article) => {
    const matchesCategory =
      store.activeCategory === "All" ||
      article.category === store.activeCategory;
    const matchesSearch =
      store.searchQuery.trim() === "" ||
      article.title.toLowerCase().includes(store.searchQuery.toLowerCase()) ||
      article.description
        .toLowerCase()
        .includes(store.searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(store.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  }, [store.activeCategory, store.searchQuery])

  const displayedArticles =useMemo(()=>{
    switch (store.activeSection) {
      case "home":
        return filterArticles(featuredArticles)
      case "search":    
        return filterArticles(bestArticles)
      case "bookmarks":
        return filterArticles([...bestArticles, ...featuredArticles]).filter((article) =>
          store.bookmarkedArticles.includes(article.id)
        );
      default:
        return []
    }

  },[store.activeSection,filterArticles,store.bookmarkedArticles])

  return (
    <AppContext.Provider value={{ store, dispatch }}>
      <div className="min-h-screen dark:bg-gray-800 bg-gray-50 font-sans flex flex-col">
        <Sidebar />
        <HeaderBar />

        <main className="flex-1 overflow-y-auto md:pl-64 pb-16 md:pb-0">
          <div className="container mx-auto px-4 py-6">
            <div className="flex overflow-x-auto pb-3 mb-6 -mx-4 px-4 space-x-3 scrollbar-hide">
              {store.categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() =>
                    dispatch({ type: "ACTIVATE_CATEGORY", payload: category })
                  }
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    store.activeCategory === category
                      ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
            {store.activeSection === "home" &&<Article
              showIntro={true}
              showAuthor={false}
              article={featuredArticles[0]}
            />}
            <section className="mb-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-5 mt-5"
              >
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {store.activeSection === "home"
                    ? "Featured Articles"
                    : "Best Articles"}
                </h2>
              </motion.div>
              <div className="flex flex-col items-center gap-2 overflow-x-auto scrollbar-hide pb-4 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {displayedArticles.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center lg:col-span-3 sm:col-span-2 py-12"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <Search size={24} className="text-gray-400" />
                    </div>
                    <h3 className="dark:text-white text-lg font-medium text-gray-900 mb-1">
                      No articles found
                    </h3>
                    <p className="dark:text-white text-gray-500">
                      Try changing your search or category
                    </p>
                  </motion.div>
                ):displayedArticles.map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full md:w-72 flex-shrink-0 sm:w-auto"
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <Article
                      showIntro={false}
                      showAuthor={false}
                      article={article}
                      isSquare={true}
                    />
                  </motion.div>
                ))}
              </div>
            </section>

            <section>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-5"
              >
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Authors</h2>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                {authors.map((author) => (
                  <motion.div
                    key={author.id}
                    className="dark:bg-gray-800 bg-white rounded-lg p-4 flex shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center">
                      <img
                        src={author.photo || "https://placehold.co/400"}
                        alt={author.name}
                        className="w-16 h-16 rounded-full object-cover mb-3 mr-2 border-2 border-violet-500"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-medium">{author.name}</h3>
                        <p className="text-xs text-gray-500 mb-3">
                          {author.subtitle}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => handleFollowAuthor(author.name)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus size={22} className="text-neutral-600" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </main>

        <BottomBar />

        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-16 left-4 right-4 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center"
            >
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-3">
                <span className="text-lg">✓</span>
              </div>
              <span className="flex-1">{toastMessage}</span>
              <motion.button
                onClick={() => setShowToast(false)}
                className="text-gray-400 hover:text-white ml-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
          body {
            font-family: "Poppins", sans-serif;
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </AppContext.Provider>
  );
};

export default MobileNewsApp;
