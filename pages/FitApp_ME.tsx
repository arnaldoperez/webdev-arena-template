/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState, useEffect, useMemo, useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import {
  Droplets,
  Footprints,
  Heart,
  Flame,
  Battery,
  Info,
  FootprintsIcon,
  Clock,
  ChevronLeft,
  Menu,
  ChevronRightCircle,
  Home,
  Dumbbell,
  HeartPulse,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const DarkModeContext = React.createContext(false);

const onboardingSlides = [
  {
    icon: Droplets,
    title: "Track Your Hydration",
    description:
      "Monitor your water intake and stay hydrated throughout the day with personalized reminders.",
  },
  {
    icon: Footprints,
    title: "Activity Tracking",
    description:
      "Record your steps, distance covered, and active time with our advanced motion sensors.",
  },
  {
    icon: Heart,
    title: "Heart Health",
    description:
      "Keep tabs on your heart rate and rhythm with our built-in ECG monitoring system.",
  },
];

interface ChartEntry {
  day: string;
  steps: number;
}
const chartData: ChartEntry[] = [
  { day: "Mon", steps: 12000 },
  { day: "Tue", steps: 15000 },
  { day: "Wed", steps: 8000 },
  { day: "Thu", steps: 10000 },
  { day: "Fri", steps: 13000 },
  { day: "Sat", steps: 7000 },
  { day: "Sun", steps: 9000 },
];

const chartConfig = {
  steps: {
    label: "Steps",
    color: "#84cc16",
  },
};

const instructionsData = [
  {
    icon: Droplets,
    title: "Hydration Tracking",
    description:
      "Monitor your water intake throughout the day with smart reminders.",
  },
  {
    icon: Footprints,
    title: "Advanced Step Tracking",
    description:
      "Accurate step count with distance traveled and calories burned.",
  },
  {
    icon: Heart,
    title: "Continuous Heart Monitoring",
    description: "Keep tabs on your heart rate and rhythm with built-in ECG.",
  },
  {
    icon: Battery,
    title: "Long Battery Life",
    description: "Up to 5 days on a single charge with power-saving features.",
  },
];

const instructions = [
  { title: "Power Indicators", category: "Guide" },
  { title: "Wheather Forecast", category: "Tutorial" },
  { title: "High Performance", category: "Support" },
];

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
  icon: LucideIcon;
  unit: string;
  fullHeight?: boolean;
}

const StatCard = ({
  title,
  value,
  unit,
  icon: Icon,
  fullHeight = false,
}: StatCardProps) => (
  <motion.div
    className={`${
      fullHeight ? "h-full mb-2" : ""
    } bg-zinc-200 dark:bg-zinc-800 backdrop-blur-lg rounded-2xl overflow-hidden flex items-start justify-between transition-all duration-300 hover:shadow-lg`}
    whileHover={{ y: -2 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex-1 p-5">
      <p className="text-sm font-medium text-zinc-800 dark:text-white tracking-wider">
        {title}
      </p>
      <p className="text-4xl text-zinc-800 dark:text-white font-bold transition-all duration-300 group-hover:scale-105">
        {value}
        <span className="ml-1 text-sm font-medium text-zinc-800 dark:text-white">
          {unit}
        </span>
      </p>
    </div>

    <div className="p-3 rounded-lg">
      <Icon className="w-8 h-8 lucide-gradient-stroke" />
    </div>
  </motion.div>
);

const ActivityChart = ({
  data,
  selectedRange,
}: {
  data: ChartEntry[];
  selectedRange: string;
  onRangeChange: (range: string) => void;
}) => {
  const filteredData = data.slice(0, selectedRange === "week" ? 7 : 30);
  const isDarkMode = React.useContext(DarkModeContext);
  return (
    <motion.div
      className="bg-zinc-200 dark:bg-zinc-800 backdrop-blur-lg rounded-2xl p-5 transition-all duration-300 hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient  id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a6f8d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#c7e941" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <Line
              type="natural"
              dataKey="steps"
              stroke={isDarkMode ? "#111827" : "#374151"} // Tailwind gray-900 for dark, gray-700 for light
              strokeWidth={6}
              dot={false}
              activeDot={false}
            />
            <Line
              type="natural"
              dataKey="steps"
              dot={false}
              stroke="url(#colorSteps)"/* {isDarkMode ? "url(#colorSteps)":"#000" } */
              strokeWidth={3}
              name="Steps"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-zinc-800 dark:text-white tracking-wider">
          Heat Rate
        </p>
        <p className="text-4xl text-zinc-800 dark:text-white font-bold transition-all duration-300 group-hover:scale-105">
          74
          <span className="ml-1 text-xs font-medium text-zinc-800 dark:text-white tracking-wider">
            bpm
          </span>
        </p>
      </div>
    </motion.div>
  );
};

const DistanceCounter = ({}) => {
  return (
    <motion.div
      className="bg-zinc-200 dark:bg-zinc-800 backdrop-blur-lg rounded-2xl p-5 transition-all duration-300 hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-32">
        <ResponsiveContainer className="p-6" width="100%" height="100%">
          <Footprints className="rotate-90 lucide-gradient-stroke" />
        </ResponsiveContainer>
      </div>
      <div className="flex-grow">
        <div className="text-5xl text-zinc-800 dark:text-white font-bold transition-all duration-300 group-hover:scale-105">
          2.9k
          <span className="ml-1 text-sm font-medium text-zinc-800 dark:text-white tracking-wider">
            steps
          </span>
          <p className="text-xs font-medium text-zinc-800 dark:text-white tracking-wider">
            Distance: 2.2 mi
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const OnboardingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    /* const timer= setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    }; */
  }, [])

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-white dark:bg-zinc-900 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      {showSplash ? (
        <motion.div className="flex flex-col h-full w-full p-4">
          <div className="flex justify-between w-full">
            <h2 className="text-zinc-400 text-2xl">Meet</h2>
            <ChevronRightCircle
              size={40}
              strokeWidth={1}
              onClick={() => setShowSplash(false)}
              className="cursor-pointer text-zinc-800 dark:text-white hover:text-lime-500 transition-colors"
            />
          </div>
          <p className="text-zinc-200 w-24 text-wrap mt-4" style={{ fontSize: "3rem" }}>Your Daily Fitness Companion</p>
          <div className="flex-grow flex flex-col items-center justify-end">
            <div className="w-1/2 h-auto">
            <img src="https://github.com/arnaldoperez/webdev-arena-template/blob/main/assets/e9a17d3f37ca094dd1a11d280f5ec0b6.png?raw=true" className="max-w-md w-full h-auto" alt="Fitness Ring Splash"/>
            </div>
          </div>
        </motion.div>
      ) : (
      <motion.div
        className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20, transition: { duration: 0.3 } }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: 0.1,
        }}
      >
        <div className="h-64 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-lime-500 to-lime-600" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    {React.createElement(onboardingSlides[currentSlide].icon, {
                      className: "w-12 h-12 text-white",
                    })}
                  </motion.div>
                </div>
              </div>
              <div className="absolute inset-0 opacity-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                >
                  <path
                    d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="p-6">
          <div className="mb-6 text-center">
            <motion.h2
              className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {onboardingSlides[currentSlide].title}
            </motion.h2>
            <motion.p
              className="text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {onboardingSlides[currentSlide].description}
            </motion.p>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              {onboardingSlides.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    index === currentSlide
                      ? "bg-lime-500 w-4"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.8 }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <motion.button
              className="px-4 py-2 bg-lime-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
              onClick={nextSlide}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(132, 204, 2, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {currentSlide < onboardingSlides.length - 1
                ? "Next"
                : "Get Started"}
            </motion.button>
          </div>
          <div className="flex justify-between">
            <motion.button
              className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 transition-all duration-200 ${
                currentSlide === 0
                  ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                  : "text-lime-500 hover:bg-lime-50 dark:hover:bg-lime-900/20"
              }`}
              onClick={prevSlide}
              disabled={currentSlide === 0}
              whileHover={currentSlide !== 0 ? { scale: 1.05 } : {}}
              whileTap={currentSlide !== 0 ? { scale: 0.95 } : {}}
            >
              Back
            </motion.button>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {currentSlide + 1} of {onboardingSlides.length}
            </div>
          </div>
        </div>
      </motion.div>
      )}
    </motion.div>
  );
};

const BatteryIndicator = ({ value }: { value: number }) => {
  return (
    <motion.div
      className="h-full flex flex-col justify-between items-center bg-zinc-200 dark:bg-zinc-800 rounded-lg p-3 text-center group transition-all duration-200 hover:shadow-lg"
      whileHover={{ y: -2 }}
    >
      <div className="text-zinc-800 dark:text-gray-100 drop-shadow-sm">
        <p className="text-lg font-semibold text-zinc-800 dark:text-gray-100 ">
        {value}%
      </p>
      <p className="text-xs text-zinc-800 dark:text-gray-200">
        Battery
      </p>
      </div>

      <motion.div
        className="w-full h-32 bg-gray-400 dark:bg-gray-700 rounded-lg flex items-end relative overflow-hidden group transition-all duration-300 hover:shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute left-0 w-full bg-gray-600 dark:bg-gray-500 rounded-lg"
          initial={{ height: 0 }}
          animate={{ height: `${value}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

const NavBar = ({
  menuClickHandler,
  currentView,
}: {
  menuClickHandler: () => void;
  currentView: number;
}) => {
  return (
    <div className="flex justify-between items-start sm:items-center mb-8">
      <motion.button
        className="p-2 sm:px-4 sm:py-2 rounded-full hover:outline-none hover:ring-2 border-2 transition-all duration-200 bg-transparent dark:text-zinc-400 dark:border-zinc-400 dark:hover:ring-lime-400 text-zinc-700 border-zinc-800 hover:ring-lime-700"
        onClick={menuClickHandler}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {currentView == 0 ? <Menu /> : <ChevronLeft />}
      </motion.button>
      <div className={`flex space-x-2 dark:text-zinc-400 text-zinc-800`}>
        <div className="flex flex-col ml-12">
          <p className="text-xs font-medium">Good morning</p>
          <p className="font-bold">Jhon Doe</p>
        </div>
        <img
          className="w-10 h-10 ml-4 rounded-full"
          src="https://randomuser.me/api/portraits/men/61.jpg"
          alt="profile"
        />
      </div>
    </div>
  );
};

interface InstructionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  category: string;
  bgPicture: string;
}

const Instruction = ({ title, category, bgPicture }: InstructionProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgPicture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative overflow-hidden rounded-xl shadow-lg h-48 w-40 group transition-all duration-300 hover:scale-105 flex-shrink-0"
    >
      <div className="absolute bottom-0 left-0 right-0 px-3 pt-8 pb-3 bg-gradient-to-t from-zinc-900 dark:via-zinc-900/80 dark:to-transparent">
        <h3 className="text-xs font-bold tracking-wider">{title}</h3>
        <p className="text-xs text-zinc-100 mt-1 truncate">{category}</p>
      </div>
    </div>
  );
};

const ActivityResume = () => {
  const [selectedRange, setSelectedRange] = useState("week");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="grid gap-4 grid-cols-2 grid-flow-row">
        <h2
          style={{ fontSize: "1.5rem" }}
          className="t2 font-bold text-zinc-900 dark:text-zinc-300 col-span-2"
        >
          Your Metrics
        </h2>
        <StatCard
          icon={Droplets}
          title="Water"
          value="1.5"
          unit="litres"
        ></StatCard>
        <div className="row-span-2">
          <DistanceCounter />
        </div>
        <div className="row-span-2">
          <ActivityChart
            data={chartData}
            selectedRange={selectedRange}
            onRangeChange={setSelectedRange}
          />
        </div>
        <StatCard
          icon={Flame}
          title="Calories"
          value="3.2K"
          unit="cal"
        ></StatCard>
      </div>
      <div className="backdrop-blur-lg rounded-2xl transition-all duration-300 hover:shadow-lg">
        <h2
          style={{ fontSize: "1.5rem" }}
          className="font-bold dark:text-white text-zinc-900 mb-4"
        >
          How it works
        </h2>
        <div
          style={{
            scrollbarWidth: "thin",
            scrollbarColor:
              "oklch(53.2% 0.157 131.589) rgba(0,0,0,0)",
          }}
          className="snap-x flex overflow-x-auto space-x-4 pb-2 scrollbar-thin"
        >
          {instructions.map((instruction, index) => (
            <Instruction
              className="snap-center"
              key={index}
              title={instruction.title}
              category={instruction.category}
              bgPicture={`https://picsum.photos/seed/${(
                index + 1
              ).toString()}/300/200`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Instructions = () => {
  return (
    <div className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-lg rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
      <h2
        style={{ fontSize: "1.5rem" }}
        className="font-bold text-gray-900 dark:text-white mb-4"
      >
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {instructionsData.map((feature, index) => (
          <motion.div
            key={index}
            className="flex flex-col p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-lime-500 dark:text-lime-400">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const StepsBarChart = ({ data }: { data: ChartEntry[] }) => {
  const isDarkMode=useContext(DarkModeContext)
  const totalSteps = useMemo(() => {
    return data.reduce((current, day) => day.steps + current, 0);
  }, [data]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2
            style={{ fontSize: "1.5rem" }}
            className="mb-2 font-bold text-zinc-900 dark:text-white"
          >
            My Activity
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Total Steps
          </p>
          <h2
            style={{ fontSize: "1.4rem" }}
            className="mb-2 font-bold text-zinc-900 dark:text-white"
          >
            {totalSteps}
          </h2>
        </div>
        <motion.select className="h-10 p-2 rounded-full border-2 text-zinc-800 border-zinc-100 border-zinc-800 dark:text-zinc-200 dark:border-zinc-500 bg-transparent">
          <option value="week">This week</option>
          <option value="month">This month</option>
        </motion.select>
      </div>
      <motion.div
        className="h-96 bg-zinc-200 dark:bg-zinc-800 backdrop-blur-lg rounded-2xl p-6 transition-all duration-300 hover:shadow-lg border-2 border-zinc-100 dark:border-zinc-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="stepsBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#bef264" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#67e8f9" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              strokeOpacity={0.2}
              stroke={chartConfig.steps.color}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDarkMode?"#9CA3AF":"000", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDarkMode?"#9CA3AF":"000", fontSize: 12 }}
              dx={-10}
              tickFormatter={(value) =>
                value >= 1000 ? `${value / 1000}k` : value.toString()
              }
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <motion.div
                      className="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-lg p-3 shadow-lg backdrop-blur-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p
                        className="font-bold text-zinc-900 dark:text-white"
                        style={{ color: chartConfig.steps.color }}
                      >
                        {label}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Steps:
                        {payload[0].value
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </p>
                    </motion.div>
                  );
                }
                return null;
              }}
              cursor={{ fill: "rgba(132, 204, 2, 0.1)" }}
              wrapperStyle={{ outline: "none" }}
            />
            <Bar
              dataKey="steps"
              fill="url(#stepsBarGradient)"
              background={{ fill: "rgba(0, 0, 0, 0.2)", radius: 17.5 }}
              radius={17.5}
              barSize={35}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
      <div className="flex py-4 gap-4">
        <div className="grow flex gap-4 flex-col">
          <StatCard
            icon={FootprintsIcon}
            title="Distance"
            value="5.2"
            unit="km"
          />
          <StatCard icon={Clock} title="time" value="19.2" unit="hours" />
        </div>
        <div className="w-md">
          <BatteryIndicator value={65} />
        </div>
      </div>
    </div>
  );
};

const views = [
  {
    name: "Home",
    component: ActivityResume,
    id: "activity",
    icon: Home,
  },
  {
    name: "Activity",
    component: () => <StepsBarChart data={chartData} />,
    id: "stepsbarchart",
    icon: Dumbbell,
  },
  {
    name: "Tracking",
    component: Instructions,
    id: "tracking",
    icon: HeartPulse,
  },
  {
    name: "How It Works",
    component: Instructions,
    id: "howitworks",
    icon: Info,
  },
];


const SvgDefs = () => (
  <svg width="0" height="0" style={{ position: "absolute" }}>
    <defs>
      <linearGradient
        id="iconStrokeGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" style={{ stopColor: "#a6f8d8", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#c7e941", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
  </svg>
);



const App = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
    const systemDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(systemDarkMode);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleOnboardingComplete = () => {
    setHasSeenOnboarding(true);
  };

  const handleMenuClick = () => {
    if (currentViewIndex != 0) setCurrentViewIndex(0);
  };
  const setViewIndex = (index: number) => {
    setCurrentViewIndex(index);
  };

  return (
    <DarkModeContext.Provider value={isDarkMode}>
      <div
      className={`${inter.className} min-h-screen transition-colors duration-300 dark:bg-zinc-900 bg-white flex flex-col`}
    >
      <SvgDefs />
      <style>
        {`.lucide-gradient-stroke path,
.lucide-gradient-stroke line,
.lucide-gradient-stroke polyline,
.lucide-gradient-stroke circle,
.lucide-gradient-stroke rect {
  stroke: oklch(27.4% 0.006 286.033);
  fill: url(#iconStrokeGradient);
  .scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
}
.scrollbar-thin::-webkit-scrollbar {
  height: 8px; /* Height of horizontal scrollbar */
  width: 8px;  /* Width of vertical scrollbar */
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb);
  border-radius: 10px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background-color: var(--scrollbar-track);
  border-radius: 10px;

}
`}
      </style>
      {!hasSeenOnboarding && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
      {hasSeenOnboarding && (
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col flex-grow w-full">
          <NavBar
            menuClickHandler={handleMenuClick}
            currentView={currentViewIndex}
          />
          <div className="flex-grow flex flex-col mt-4 pb-8">
            <div className="relative flex-grow w-full overflow-y-auto rounded-2xl p-4 sm:p-6">
              {React.createElement(views[currentViewIndex].component)}
            </div>
          </div>
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 
                     w-auto 
                     bg-white dark:bg-zinc-800/90 backdrop-blur-md 
                     rounded-full 
                     shadow-xl dark:shadow-2xl dark:shadow-black/30 
                     p-1.5 sm:p-2 
                     z-40
                     border dark:border-white border-zinc-800

                     "
        >
          <div className="flex justify-around items-center space-x-1 sm:space-x-2">
            {views.map((view, index) => (
              <motion.button
                key={view.id}
                onClick={() => setViewIndex(index)}
                className={`
                    flex items-center justify-center 
                    transition-all duration-300 focus:outline-none
                    ${
                      currentViewIndex === index
                        ? "flex-row bg-gradient-to-t from-sky-500 to-lime-600 text-white rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-md h-10 sm:h-12"
                        : "text-white dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-500 rounded-lg w-10 h-10 sm:w-12 sm:h-12"
                    }
                  `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {React.createElement(view.icon, {
                  size: currentViewIndex === index ? 18 : 20,
                  stroke:isDarkMode?"white":"black"
                })}
                {currentViewIndex === index && (
                  <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm font-medium">
                    {view.name}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
        </div>
      )}
      
    </div>
    </DarkModeContext.Provider>
  );
};

export default App;
// Zod Schema
export const Schema = {
  commentary: "",
  template: "nextjs-developer",
  title: "Fitness Ring App",
  description:
    "A responsive app for a wearable fitness ring that surfaces key daily health metrics, activity trends, and quick-access guides.",
  additional_dependencies: ["lucide-react", "motion", "recharts"],
  has_additional_dependencies: true,
  install_dependencies_command: "npm install motion lucide-react recharts",
  port: 3000,
  file_path: "app/page.tsx",
  code: "<see code above>",
};
