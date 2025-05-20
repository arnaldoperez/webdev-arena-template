import React, { useState, useEffect, useMemo } from "react";
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
  TrendingUp,
  Activity,
  BarChart as BarCharIcon,
  Info,
  Moon,
  Sun,
  FootprintsIcon,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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

const tutorialSlides = [
  // These are now the instructions slides
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

const instructions=[
  {title:"Power Indicators", category:"Guide"},
  {title:"Wheatehr Forecast", category:"Tutorial"},
  {title:"High Performance", category:"Support"},
]

const StatCard = ({
  title,
  value,
  unit,
  icon: Icon,
  fullHeight=false
}: {
  title: string;
  value: string;
  icon: LucideIcon;
  unit: string;
  fullHeight?: boolean;
}) => (
  <motion.div
    className={`${fullHeight?"h-full mb-2":""} bg-white/90 dark:bg-zinc-800/90 backdrop-blur-lg rounded-2xl m-2 p-3 flex items-start space-x-4 flex justify-between overflow-hidden group transition-all duration-300 hover:shadow-lg`}
    whileHover={{ y: -2 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex-grow">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {title}
      </p>
      <p className="text-4xl  text-gray-700 dark:text-gray-200 font-bold transition-all duration-300 group-hover:scale-105">
        {value}
        <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {unit}
        </span>
      </p>
    </div>

    <div className="p-3 rounded-lg bg-gray-100 dark:bg-zinc-700">
      <Icon className="w-8 h-8 lucide-gradient-stroke" />
    </div>
  </motion.div>
);

const MiniChart = ({
  data,
  color,
}: {
  data: Array<{ value: number }>;
  color: string;
}) => (
  <div className="w-24 h-12">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
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

  return (
    <motion.div
      className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-lg rounded-2xl p-4 transition-all duration-300 hover:shadow-lg"
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
              <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#bef264" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#67e8f9" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="steps"
              stroke={chartConfig.steps.color}
              fill="url(#colorSteps)"
              strokeWidth={3}
              name="Steps"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-grow">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Heat Rate
      </p>
      <p className="text-4xl  text-gray-700 dark:text-gray-200 font-bold transition-all duration-300 group-hover:scale-105">
        74
        <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          bpm
        </span>
      </p>
    </div>
    </motion.div>
  );
};

const DistanceCounter = ({
}) => {
  return (
    <motion.div
      className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-lg rounded-2xl p-4 transition-all duration-300 hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <Footprints />
        </ResponsiveContainer>
      </div>
      <div className="flex-grow">
      <p className="text-4xl  text-gray-700 dark:text-gray-200 font-bold transition-all duration-300 group-hover:scale-105">
        2.9k
        <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          steps
        </span>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Distance: 2.2 mi
      </p>
      </p>
    </div>
    </motion.div>
  );
};

const OnboardingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
              className="px-4 py-2 bg-lime-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
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
    </motion.div>
  );
};

const TutorialScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < tutorialSlides.length - 1) {
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
                    {React.createElement(tutorialSlides[currentSlide].icon, {
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
              {tutorialSlides[currentSlide].title}
            </motion.h2>
            <motion.p
              className="text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {tutorialSlides[currentSlide].description}
            </motion.p>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              {tutorialSlides.map((_, index) => (
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
              className="px-4 py-2 bg-lime-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
              onClick={nextSlide}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(132, 204, 2, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {currentSlide < tutorialSlides.length - 1 ? "Next" : "Finish"}
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
              {currentSlide + 1} of {tutorialSlides.length}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BatteryIndicator = ({ value }: { value: number }) => {
  return (
    <motion.div
      className="flex flex-col w-24 m-1 items-center bg-white/90 dark:bg-zinc-800/90 rounded-lg p-2 text-center group transition-all duration-200 hover:shadow-lg"
      whileHover={{ y: -2 }}
    >
      <p className="text-lg text-gray-500 font-semibold dark:text-gray-100 drop-shadow-sm">
        {value}%
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-200 drop-shadow-sm">
        Battery
      </p>

      <motion.div
        className="w-10 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-end relative overflow-hidden group transition-all duration-300 hover:shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute left-0 w-full bg-zinc-500 rounded-lg" // Green progress
          initial={{ height: 0 }}
          animate={{ height: `${value}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

const NavBar = ({
  showTutorial,
  toggleDarkMode,
  isDarkMode,
}: {
  showTutorial: () => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>
      <div className="flex">
        <motion.button
          className={`px-4 py-2 mx-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 shadow-lg ${
            isDarkMode
              ? "bg-lime-600 text-white focus:ring-lime-500 hover:bg-lime-500"
              : "bg-white text-lime-500 focus:ring-lime-500 hover:bg-lime-50"
          }`}
          onClick={showTutorial}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Tutorial
        </motion.button>
        <motion.button
          className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 shadow-lg ${
            isDarkMode
              ? "bg-lime-600 text-white focus:ring-lime-500 hover:bg-lime-500"
              : "bg-white text-lime-500 focus:ring-lime-500 hover:bg-lime-50"
          }`}
          onClick={toggleDarkMode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isDarkMode ? <Sun /> : <Moon />}
        </motion.button>
      </div>
    </div>
  );
};

const Instruction=({title, category, picture}:{title:string,category:string, picture:string})=>{
  return (<div style={{backgroundImage:picture}} className="flex flex-col p-4 bg-zinc-50 dark:bg-zinc-900/20 rounded-xl transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-900/30 hover:scale-105">
            <h3 className="text-sm font-medium text-lime-500 dark:text-lime-400 uppercase tracking-wider">
              {title}
            </h3>
            <p className="text-3xl font-bold text-zinc-900 dark:text-white mt-2">
              {category}
            </p>
          </div>)
}

const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Water Intake"
        value="1.5"
        unit="litres"
        icon={Droplets}
        fullHeight={true}
      />
      <StatCard
        title="Step Count"
        value="8,945"
        unit="steps"
        icon={Footprints}
      />
      <StatCard title="Heart Rate" value="72" unit="/min" icon={Heart} />
      <StatCard title="Calories Burned" value="420" unit="kcal" icon={Flame} />
    </div>
  );
};

const ActivityResume = () => {
  const [selectedRange, setSelectedRange] = useState("week");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="grid grid-cols-2 grid-rows-3">
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
      <div className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-lg rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
          How it works
        </h2>
        <div className="grid grid-rows-1 grid-cols-2 overflow-x-auto md:grid-cols-3 gap-6">
        {instructions.map((instruction, index )=>(<Instruction key={index} title={instruction.title} category={instruction.category} picture={`https://picsum.photos/seed/${index.toString()}/300/200`}  />))}          
        </div>
      </div>
    </div>
  );
};

const Instructions = () => {
  return (
    <div className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-lg rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
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
  const totalSteps = useMemo(() => {
    return data.reduce((current, day) => day.steps + current, 0);
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="mb-2 text-7x1 font-bold text-zinc-900 dark:text-white">
            My Activity
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Total Steps
          </p>
          <h2 className="mb-2 text-7x1 font-bold text-zinc-900 dark:text-white">
            {totalSteps}
          </h2>
        </div>
        <motion.select className="h-10 p-2 rounded-full border-2 text-zinc-500 border-zinc-100 border-zinc-800 bg-zinc-200 dark:text-zinc-200 dark:border-zinc-500 dark:bg-zinc-900 dark:bg-zinc-800">
          <option value="week">This week</option>
          <option value="month">This month</option>
        </motion.select>
      </div>
      <motion.div
        className="bg-white/90 h-96 dark:bg-zinc-800/90 backdrop-blur-lg rounded-2xl p-6 transition-all duration-300 hover:shadow-lg border-2 border-zinc-100 dark:border-zinc-700" // Removed h-full, flex, flex-col
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
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
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
                        Steps:{" "}
                        {payload[0].value
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </p>
                    </motion.div>
                  );
                }
                return null;
              }}
              cursor={{ fill: "rgba(132, 204, 2, 0.1)" }} // Light lime for cursor
              wrapperStyle={{ outline: "none" }}
            />
            <Bar
              dataKey="steps"
              fill="url(#stepsBarGradient)"
              background={{ fill: "rgba(132, 204, 2, 0.2)", radius: 17.5 }}
              radius={17.5}
              barSize={35}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
      <div className="flex">
        <div className="grow">
          <StatCard
            icon={FootprintsIcon}
            title="Distance"
            value="5.2"
            unit="km"
          />
          <StatCard icon={Clock} title="time" value="19.2" unit="hours" />
        </div>
        <BatteryIndicator value={65} />
      </div>
    </div>
  );
};

const views = [
  {
    name: "Activity",
    component: ActivityResume,
    id: "activity",
    icon: Activity,
  },
  {
    name: "Steps Chart",
    component: () => <StepsBarChart data={chartData} />,
    id: "stepsbarchart",
    icon: BarCharIcon,
  },
  /* { name: "Stats", component: Stats, id: "stats", icon: BarChart2 }, */
  {
    name: "How It Works",
    component: Instructions,
    id: "howitworks",
    icon: Info,
  },
];

const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  }),
};

// Component to define SVG gradients
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
        <stop offset="0%" style={{ stopColor: "#84cc16", stopOpacity: 1 }} />{" "}
        {/* lime-500 */}
        <stop
          offset="100%"
          style={{ stopColor: "#22d3ee", stopOpacity: 1 }}
        />{" "}
        {/* cyan-400 */}
      </linearGradient>
    </defs>
  </svg>
);

const swipeThreshold = 75; // Min drag distance to trigger swipe

const App = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Carousel state: [index, direction]
  const [[currentViewIndex, direction], setCurrentView] = useState([0, 0]);

  useEffect(() => {
    setIsClient(true);

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
    setHasSeenOnboarding(localStorage.getItem("hasSeenOnboarding") == "true");
    setHasSeenTutorial(localStorage.getItem("hasSeenTutorial") == "true");
  }, []);

  const handleOnboardingComplete = () => {
    setHasSeenOnboarding(true);
    localStorage.setItem("hasSeenOnboarding", "true");
  };

  const handleTutorialComplete = () => {
    setHasSeenTutorial(true);
    localStorage.setItem("hasSeenTutorial", "true");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const paginate = (newDirection: number) => {
    let nextIndex = currentViewIndex + newDirection;
    if (nextIndex < 0) {
      nextIndex = views.length - 1;
    } else if (nextIndex >= views.length) {
      nextIndex = 0;
    }
    setCurrentView([nextIndex, newDirection]);
  };

  const setViewIndex = (index: number) => {
    const newDirection =
      index > currentViewIndex ? 1 : index < currentViewIndex ? -1 : 0;
    setCurrentView([index, newDirection]);
  };

  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-100 dark:bg-zinc-900">
        <div className="flex space-x-3">
          <div className="w-3 h-3 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-3 h-3 bg-zinc-500 rounded-full animate-bounce [animation-delay:0s]" />
          <div className="w-3 h-3 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.3s]" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        inter.className
      } min-h-screen transition-colors duration-300 ${
        isDarkMode ? "dark bg-zinc-900" : "bg-zinc-100"
      } flex flex-col`}
    >
      <SvgDefs />
      <style>
        {`.lucide-gradient-stroke path,
.lucide-gradient-stroke line,
.lucide-gradient-stroke polyline,
.lucide-gradient-stroke circle,
.lucide-gradient-stroke rect {
  stroke: oklch(37% 0.013 285.805);
  fill: url(#iconStrokeGradient);
}`}
      </style>
      {!hasSeenOnboarding && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
      {hasSeenOnboarding && !hasSeenTutorial && (
        <TutorialScreen onComplete={handleTutorialComplete} />
      )}
      {hasSeenOnboarding && hasSeenTutorial && (
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col flex-grow w-full">
          <NavBar
            showTutorial={() => setHasSeenTutorial(false)}
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
          />

          <div className="flex justify-center items-center mb-4 space-x-6">
            {views.map((view, index) => (
              <motion.button
                key={view.id}
                onClick={() => setViewIndex(index)}
                className={`p-2 flex rounded-lg transition-all duration-300 focus:outline-none ${
                  currentViewIndex === index
                    ? "bg-lime-500 text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {React.createElement(view.icon, { size: 24 })}
                <span className="ml-2 text-sm font-semibold">
                  {currentViewIndex === index ? view.name : ""}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="flex-grow flex flex-col mt-4 mb-4">
            <div className="relative flex-grow w-full overflow-hidden rounded-lg shadow-lg bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm">
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <motion.div
                  key={views[currentViewIndex].id}
                  custom={direction}
                  variants={carouselVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(event, { offset }) => {
                    if (offset.x < -swipeThreshold) {
                      paginate(1); // Swiped left, go to next
                    } else if (offset.x > swipeThreshold) {
                      paginate(-1); // Swiped right, go to prev
                    }
                  }}
                  className="w-full h-full p-3 md:p-5" // Padding for content within slide
                >
                  {React.createElement(views[currentViewIndex].component)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </div>
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
