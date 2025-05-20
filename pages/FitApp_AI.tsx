/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,  ResponsiveContainer } from "recharts";
import { Droplets, Footprints, Heart, Flame, Battery,  MapPin, Clock, TrendingUp, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const onboardingSlides = [
  {
    icon: Droplets,
    title: "Track Your Hydration",
    description: "Monitor your water intake and stay hydrated throughout the day with personalized reminders."
  },
  {
    icon: Footprints,
    title: "Activity Tracking",
    description: "Record your steps, distance covered, and active time with our advanced motion sensors."
  },
  {
    icon: Heart,
    title: "Heart Health",
    description: "Keep tabs on your heart rate and rhythm with our built-in ECG monitoring system."
  }
];

const tutorialSlides = [
  {
    icon: MapPin,
    title: "GPS Tracking",
    description: "Our ring uses advanced GPS to track your outdoor activities with precision."
  },
  {
    icon: Clock,
    title: "Smart Notifications",
    description: "Receive important alerts directly on your ring with subtle vibrations."
  },
  {
    icon: TrendingUp,
    title: "Performance Insights",
    description: "Get detailed analytics about your workouts and progress over time."
  },
  {
    icon: Check,
    title: "Goal Setting",
    description: "Set and track personalized fitness goals to stay motivated."
  }
];

const chartData = [
  { day: "Mon", steps: 12000 },
  { day: "Tue", steps: 15000 },
  { day: "Wed", steps: 8000 },
  { day: "Thu", steps: 10000 },
  { day: "Fri", steps: 13000 },
  { day: "Sat", steps: 7000 },
  { day: "Sun", steps: 9000 }
];

const chartConfig = {
  steps: {
    label: "Steps",
    color: "#3B82F6",
  },
};

const StatCard = ({ title, value, icon: Icon, color, trendUp }) => (
  <motion.div
    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-4 flex items-start space-x-4 relative overflow-hidden group transition-all duration-300 hover:shadow-lg"
    whileHover={{ y: -2 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div
      className="p-3 rounded-lg transition-all duration-300 group-hover:scale-110"
      style={{ backgroundColor: `${color}20`, color }}
    >
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-bold transition-all duration-300 group-hover:scale-105">{value}</p>
    </div>
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <TrendingUp className={`w-5 h-5 ${trendUp ? "text-emerald-500" : "text-red-500 rotate-180"}`} />
    </div>
    <motion.div
      className="absolute bottom-0 left-0 h-1 w-full bg-gray-100 dark:bg-gray-700"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div
        className="h-full"
        style={{
          background: `linear-gradient(90deg, ${color}, ${color}80)`,
          width: `${Math.min(100, Math.max(20, value.replace(/[^0-9]/g, '')))}%`,
        }}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </motion.div>
  </motion.div>
);

const MiniChart = ({ data, color }) => (
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

const ActivityChart = ({ data, selectedRange, onRangeChange }) => {
  const [activeDay, setActiveDay] = useState(null);

  const handleMouseOver = (e) => {
    if (e && e.activeLabel) {
      setActiveDay(e.activeLabel);
    }
  };

  const handleMouseLeave = () => {
    setActiveDay(null);
  };

  const filteredData = data.slice(0, selectedRange === "week" ? 7 : 30);

  return (
    <motion.div
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 transition-all duration-300 hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Activity Trends</h2>
        <div className="flex space-x-2">
          <motion.button
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${selectedRange === "week" ? "bg-blue-500 text-white shadow-lg" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            onClick={() => onRangeChange("week")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            This Week
          </motion.button>
          <motion.button
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${selectedRange === "month" ? "bg-blue-500 text-white shadow-lg" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            onClick={() => onRangeChange("month")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            This Month
          </motion.button>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            onMouseMove={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F0F0F0"
              strokeOpacity={0.6}
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
                `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
              }
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <motion.div
                      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4 shadow-lg backdrop-blur-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                    >
                      <p className="font-bold text-gray-900 dark:text-white" style={{ color: chartConfig.steps.color }}>
                        {data.day} Activity
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {data.steps.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Steps
                      </p>
                    </motion.div>
                  );
                }
                return null;
              }}
              cursor={{ stroke: "#E0E0E0", strokeDasharray: "3 3" }}
              wrapperStyle={{ outline: "none" }}
            />
            <Line
              type="monotone"
              dataKey="steps"
              stroke={chartConfig.steps.color}
              strokeWidth={3}
              dot={{ stroke: chartConfig.steps.color, strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                stroke: chartConfig.steps.color,
                strokeWidth: 2,
                fill: "#fff",
              }}
              name="Steps"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex space-x-2">
          {filteredData.map((entry, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none ${activeDay === entry.day
                ? "bg-blue-500 scale-150 ring-2 ring-blue-200"
                : "bg-gray-200 dark:bg-gray-700"
                }`}
              onClick={() => setActiveDay(entry.day)}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.8 }}
              aria-label={`View ${entry.day} activity`}
            />
          ))}
        </div>
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
      className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20, transition: { duration: 0.3 } }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: 0.1
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
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600" />
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
                      damping: 20
                    }}
                  >
                    {React.createElement(onboardingSlides[currentSlide].icon, {
                      className: "w-12 h-12 text-white"
                    })}
                  </motion.div>
                </div>
              </div>
              <div className="absolute inset-0 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                  <path d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="currentColor" />
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
                  className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none ${index === currentSlide ? "bg-blue-500 w-4" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  onClick={() => setCurrentSlide(index)}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.8 }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <motion.button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
              onClick={nextSlide}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              {currentSlide < onboardingSlides.length - 1 ? "Next" : "Get Started"}
            </motion.button>
          </div>
          <div className="flex justify-between">
            <motion.button
              className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${currentSlide === 0
                ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                : "text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
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

const TutorialScreen = ({ onComplete }) => {
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
      className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20, transition: { duration: 0.3 } }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: 0.1
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
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600" />
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
                      damping: 20
                    }}
                  >
                    {React.createElement(tutorialSlides[currentSlide].icon, {
                      className: "w-12 h-12 text-white"
                    })}
                  </motion.div>
                </div>
              </div>
              <div className="absolute inset-0 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                  <path d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="currentColor" />
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
                  className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none ${index === currentSlide ? "bg-blue-500 w-4" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  onClick={() => setCurrentSlide(index)}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.8 }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <motion.button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
              onClick={nextSlide}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              {currentSlide < tutorialSlides.length - 1 ? "Next" : "Finish"}
            </motion.button>
          </div>
          <div className="flex justify-between">
            <motion.button
              className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${currentSlide === 0
                ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                : "text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
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



const App = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);
  const [selectedRange, setSelectedRange] = useState("week");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark);

    const onboardingSeen = localStorage.getItem("hasSeenOnboarding");
    const tutorialSeen = localStorage.getItem("hasSeenTutorial");

    if (!onboardingSeen) {
      setHasSeenOnboarding(false);
    } else {
      setHasSeenOnboarding(true);
    }

    if (!tutorialSeen) {
      setHasSeenTutorial(false);
    } else {
      setHasSeenTutorial(true);
    }
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
  };

  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex space-x-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0s]" />
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.3s]" />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-gray-900" : "bg-gray-100"}`}>
      {!hasSeenOnboarding && <OnboardingScreen onComplete={handleOnboardingComplete} />}
      {hasSeenOnboarding && !hasSeenTutorial && <TutorialScreen onComplete={handleTutorialComplete} />}
      {hasSeenOnboarding && hasSeenTutorial && (
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <motion.button
              className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 shadow-lg ${isDarkMode
                ? "bg-blue-600 text-white focus:ring-blue-500 hover:bg-blue-500"
                : "bg-white text-blue-500 focus:ring-blue-500 hover:bg-blue-50"
                }`}
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Water Intake"
              value="1.5L"
              icon={Droplets}
              color="#3B82F6"
              trend="+12%"
              trendUp={true}
            />
            <StatCard
              title="Step Count"
              value="8,945"
              icon={Footprints}
              color="#10B981"
              trend="+18%"
              trendUp={true}
            />
            <StatCard
              title="Heart Rate"
              value="72 bpm"
              icon={Heart}
              color="#F59E0B"
              trend="-5%"
              trendUp={false}
            />
            <StatCard
              title="Calories Burned"
              value="420 kcal"
              icon={Flame}
              color="#EF4444"
              trend="+10%"
              trendUp={true}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <ActivityChart data={chartData} selectedRange={selectedRange} onRangeChange={setSelectedRange} />
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 transition-all duration-300 hover:shadow-lg lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Weekly Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:scale-105">
                  <h3 className="text-sm font-medium text-blue-500 dark:text-blue-400 uppercase tracking-wider">Distance Covered</h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">5.2 <span className="text-xl">km</span></p>
                  <div className="mt-2 text-sm text-blue-500 dark:text-blue-400 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" /> +8% from last week
                  </div>
                  <div className="mt-3">
                    <MiniChart
                      data={[
                        { value: 4.2 },
                        { value: 5.5 },
                        { value: 4.8 },
                        { value: 5.2 },
                      ]}
                      color="#3B82F6"
                    />
                  </div>
                </div>
                <div className="flex flex-col p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl transition-all duration-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:scale-105">
                  <h3 className="text-sm font-medium text-emerald-500 dark:text-emerald-400 uppercase tracking-wider">Active Time</h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">2h 45m</p>
                  <div className="mt-2 text-sm text-emerald-500 dark:text-emerald-400 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" /> +15% from last week
                  </div>
                  <div className="mt-3">
                    <MiniChart
                      data={[
                        { value: 120 },
                        { value: 165 },
                        { value: 135 },
                        { value: 150 },
                      ]}
                      color="#10B981"
                    />
                  </div>
                </div>
                <div className="flex flex-col p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl transition-all duration-300 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:scale-105">
                  <h3 className="text-sm font-medium text-amber-500 dark:text-amber-400 uppercase tracking-wider">Battery Life</h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">85%</p>
                  <div className="mt-2 text-sm text-amber-500 dark:text-amber-400 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" /> +5% from last charge
                  </div>
                  <div className="mt-3">
                    <MiniChart
                      data={[
                        { value: 75 },
                        { value: 80 },
                        { value: 78 },
                        { value: 85 },
                      ]}
                      color="#F59E0B"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: Droplets,
                  title: "Hydration Tracking",
                  description: "Monitor your water intake throughout the day with smart reminders."
                },
                {
                  icon: Footprints,
                  title: "Advanced Step Tracking",
                  description: "Accurate step count with distance traveled and calories burned."
                },
                {
                  icon: Heart,
                  title: "Continuous Heart Monitoring",
                  description: "Keep tabs on your heart rate and rhythm with built-in ECG."
                },
                {
                  icon: Battery,
                  title: "Long Battery Life",
                  description: "Up to 5 days on a single charge with power-saving features."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col p-4 bg-gray-50 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-blue-500 dark:text-blue-400">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
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
    "commentary": "",
    "template": "nextjs-developer",
    "title": "Fitness Ring App",
    "description": "A responsive app for a wearable fitness ring that surfaces key daily health metrics, activity trends, and quick-access guides.",
    "additional_dependencies": [
        "lucide-react",
        "motion",
        "recharts"
    ],
    "has_additional_dependencies": true,
    "install_dependencies_command": "npm install motion lucide-react recharts",
    "port": 3000,
    "file_path": "app/page.tsx",
    "code": "<see code above>"
}
