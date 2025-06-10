/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState, useEffect, useMemo } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import {
  FaBell,
  FaCircle,
  FaCircleNotch,
  FaCreditCard,
  FaHome,
  FaMoneyBill,
  FaReceipt,
  FaRegCalendarCheck,
  FaSearch,
} from "react-icons/fa";
import { BsPerson, BsThreeDots } from "react-icons/bs";
import { TbPigMoney, TbBrandBing } from "react-icons/tb";
import { FaAmazon, FaApple, FaSpotify } from "react-icons/fa";
import { SiStarbucks } from "react-icons/si";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LabelList,
} from "recharts";
import { IconType } from "react-icons/lib";
import { ChevronRight } from "lucide-react";

interface Transaction {
  title: string;
  amount: number;
  date: string;
  Icon: IconType;
}

interface MonthIncome {
  month: string;
  income: number;
  max?: boolean;
}
const barMaxColor = "oklch(70.5% 0.213 47.604)";
const transactions: Transaction[] = [
  {
    title: "Rent",
    amount: 1500,
    date: "2023-10-26",
    Icon: TbPigMoney,
  },
  {
    title: "Groceries",
    amount: 85.32,
    date: "2023-10-25",
    Icon: FaAmazon,
  },
  {
    title: "Dinner",
    amount: 42.75,
    date: "2023-10-23",
    Icon: FaApple,
  },
  {
    title: "Spotify Subscription",
    amount: 9.99,
    date: "2023-10-22",
    Icon: FaSpotify,
  },
  {
    title: "Starbucks",
    amount: 5.27,
    date: "2023-10-21",
    Icon: SiStarbucks,
  },
  {
    title: "Paycheck",
    amount: 2500,
    date: "2023-10-20",
    Icon: TbPigMoney,
  },
  {
    title: "Savings",
    amount: 120.5,
    date: "2023-10-19",
    Icon: TbPigMoney,
  }
];

const yearIncome: MonthIncome[] = [
  { month: "Jan", income: 4500 },
  { month: "Feb", income: 4800 },
  { month: "Mar", income: 5200 },
  { month: "Apr", income: 4900 },
  { month: "May", income: 7100 },
  { month: "Jun", income: 5300 },
  { month: "Jul", income: 5000 },
  { month: "Aug", income: 5400 },
  { month: "Sep", income: 5600 },
  { month: "Oct", income: 5500 },
  { month: "Nov", income: 5700 },
  { month: "Dec", income: 6000 },
];

const DarkModeContext = React.createContext(false);

const CardContainer = (
  props: React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement>
) => {
  const { children, className, ...rest } = props;
  return (
    <div className={`outline outline-slate-800 outline-2 dark:outline-none rounded-3xl  h-full p-12 ${className}`} {...rest}>
      {children}
    </div>
  );
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  amount?: number;
  buttonText?: string;
  buttonStyle?: string;
  image?: string;
  text: string;
}
const Card = (props: CardProps) => {
  const { className, ...rest } = props;
  return (
    <div
      className={`${className || ""} h-full flex flex-col justify-between`}
      {...rest}
    >
      <h2 className="text-2xl font-bold pb-4">{props.title}</h2>
      <div className="flex gap-4 h-full items-start">
        {props.image && (
          <img
            className="max-w-1/2 aspect-square object-scale-down"
            src={props.image}
            style={{ maxWidth: "50%" }}
            alt="Image"
          />
        )}
        <div
          className={`${
            props.image ? "h-auto" : "h-full w-full"
          }  flex flex-col justify-between`}
        >
          <div>
            {props.amount && (
              <p className="text-2xl font-bold pb-4">
                ${props.amount.toFixed(2)}
              </p>
            )}
            <p>{props.text}</p>
          </div>
          {props.buttonText && (
            <div
              className={`w-full p-2 rounded-full text-center ${props.buttonStyle}`}
            >
              {props.buttonText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const icons: { active: boolean; title: string; icon: IconType }[] =
    [
      { active: true, title: "Home", icon: FaHome},
      { active: false, title: "Transactions", icon: FaReceipt},
      { active: false, title: "Card", icon: FaCreditCard},
      { active: false, title: "Settings", icon: BsPerson},
      { active: false, title: "Notifications", icon: FaBell},
    ];
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4 relative ">
      <div className="flex items-center">
        <FaCircleNotch size={24} className="mr-2 text-yellow-300"/>
        <h1 className="text-3xl font-normal">MYFIN</h1>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {icons.map(({ title, icon, active }, key) => (
          <a
            href="#"
            key={key}
            className={`${
              active
                ? "dark:text-red-500 text-red-800"
                : "dark:text-zinc-200  text-zinc-900 "+
                "   dark:hover:text-white hover:text-black "
            } flex gap-2 items-center cursor-pointer transition-colors text-medium`}
          >
            {icon({ size: 20 })}
            <span>{title}</span>
          </a>
        ))}
      </div>
      {/* Spacer for desktop to help center the icons if needed with justify-between */}
      <div className="hidden md:flex gap-2 items-center">
        <FaSearch className="bg-zinc-100 text-zinc-400 rounded-lg p-2 size-8" />
        <div className="p-2 bg-yellow-300 text-slate-900 rounded-full">
          Download the app
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-slate-900 dark:text-slate-200 p-2 rounded-md hover:bg-slate-200 bg-white dark:bg-black dark:hover:bg-slate-200 dark:bg-slate-700"
        >
          {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 shadow-lg z-20 border-t border-slate-200 dark:border-slate-700">
          <ul
            onMouseLeave={() => setIsMobileMenuOpen(false)}
            className="flex flex-col"
          >
            {icons.map(({ title, icon }, key) => (
              <li
                key={key}
                className="border-b border-slate-200 dark:border-slate-700 last:border-b-0"
              >
                <a
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-white dark:bg-black flex gap-3 items-center py-3 px-4 hover:bg-slate-200 dark:hover:bg-slate-200 dark:hover:text-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                >
                  {icon({
                    size: 20,
                    className: "text-slate-500 dark:text-slate-800",
                  })}
                  <span>{title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

// --- Custom Bar Shape for Recharts ---
interface PersonalizedBarShapeProps {
  // Props passed by Recharts
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string; // Default fill from <Bar /> or <Cell />
  payload: MonthIncome; // Data for this bar
  datakey?: keyof MonthIncome;
  // Add other Recharts props if needed: stroke, index, etc.

  // Customization props
  radius?: number;
}

const PersonalizedBarShape: React.FC<PersonalizedBarShapeProps> = (props) => {
  const { x, y, width, height, payload, radius } = props;

  // Prevent rendering if dimensions are invalid or no data
  if (width <= 0 || height <= 0 || !payload) {
    return null;
  }

  return (
    <g>
      {payload.max && (
        <g>
          <rect
            x={x - width / 2}
            y={0}
            width={width * 2}
            height={30}
            rx={radius}
            ry={radius ? radius / 2 : 0}
            fill={barMaxColor}
          />
          <text
            x={x + width / 2}
            y={15}
            width={width * 2}
            height={30}
            color="black"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={12}
          >
            {`$ ${payload.income.toFixed(1)}k`}
          </text>
        </g>
      )}
      <rect
        x={x}
        y={y}
        width={width}
        fill={payload.max ? barMaxColor : "oklch(70.4% 0.04 256.788)"}
        height={height}
        rx={radius}
        ry={radius}
      />
    </g>
  );
};

interface IncomeGraphProps extends React.HTMLAttributes<HTMLDivElement> {
  data: MonthIncome[];
}
const IncomeGraph = (props: IncomeGraphProps) => {
  const { className, data } = props;
  const dataReady = useMemo(() => {
    let maxIndex = -1;
    let maxValue = 0;
    data.forEach((entry) => {
      if (entry.income > maxValue) {
        maxValue = entry.income;
        maxIndex = data.indexOf(entry);
      }
    });
    const output = [...data];
    output[maxIndex].max = true;
    return output;
  }, [data]);
  return (
    <div className={`${className}`}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataReady}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" stroke="oklch(70.4% 0.04 256.788)" />
          <YAxis dataKey="income" stroke="oklch(70.4% 0.04 256.788)" />
          <Tooltip
            cursor={{ fill: "rgba(200,200,200,0.1)" }}
            contentStyle={{
              backgroundColor: barMaxColor,
              border: "none",
              borderRadius: "8px",
              color: "#fff"
              
            }}
            formatter={(value: number) => `$ ${(value / 1000).toFixed(1)}k`}
          />
          <Bar dataKey="income" radius={10} shape={(props)=><PersonalizedBarShape {...props} />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const Transactions = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold pb-4 text-black border-b border-black/50 mb-4">
        Transactions
      </h2>
      <div>
        {transactions.map((transaction, key) => (
          <div className="text-black grid grid-cols-6 items-center" key={key}>
            <div >
            {transaction.Icon({ size: 36, className:"bg-slate-200 dark:bg-slate-300 rounded-lg p-1" })}
            </div>
            <div className="col-span-3">
              <p className="text-lg font-semibold">{transaction.title}</p>
              <p>{transaction.date}</p>
            </div>
            <div className="flex w-full col-span-2 justify-end text-lg font-semibold">
              ${transaction.amount.toFixed(2)}
              <span className="ml-2">
                <ChevronRight />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    const systemDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(systemDarkMode);
  }, []);

  useEffect(() => {
    console.log({ isDarkMode });
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      //document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      //document.body.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <DarkModeContext.Provider value={isDarkMode}>
      <div className="bg-white dark:bg-black min-h-screen text-slate-900 dark:text-slate-100 font-sans transition-colors">
        <div className="w-full p-1">
          <NavBar />
          <main className="grid sm:grid-cols-1 md:grid-cols-3 grid-flow-rows gap-3 p-3 w-full h-full">
            <CardContainer className="sm:col-span-2 row-span-2 bg-slate-200 dark:bg-slate-500/80 flex flex-col justify-between">
              <div className="flex mb-4">
                <div>
                  <h1 className="text-6xl font-bold">Saha, income</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                    cumque reprehenderit a obcaecati aut quibusdam incidunt
                    exercitationem optio error ...
                  </p>
                </div>
                <img
                  className="rounded-full w-24 h-24"
                  src="https://randomuser.me/api/portraits/men/10.jpg"
                  alt=""
                />
              </div>
              <IncomeGraph data={yearIncome} />
            </CardContainer>
            <CardContainer className="sm:col-span-2 md:col-span-1 row-span-2 bg-white">
              <Transactions />
            </CardContainer>
            <CardContainer className="sm:col-span-2 md:col-span-1 bg-orange-500">
              <Card
                title="Most spent on"
                amount={25568.56}
                buttonText="Details"
                buttonStyle=" border border-white"
                image={`https://picsum.photos/seed/${Math.random().toString()}/300/300`}
                text="Restaurants, cafes, pizza and fast food outlets"
              />
            </CardContainer>
            <CardContainer className="sm:col-span-2 md:col-span-1 bg-white text-black">
              <Card
                title="Money left over"
                amount={5059.73}
                buttonText="Money management"
                buttonStyle=" border border-black"
                text="Restaurants, cafes, pizza and fast food outlets"
              />
            </CardContainer>
            <CardContainer className="sm:col-span-2 md:col-span-1 bg-yellow-300 text-black">
              <Card
                title="Download the app"
                image="https://storage2.me-qr.com/qr/211965440.png"
                text="Scan the code, and download the app to yout platform Android or iOS"
              />
            </CardContainer>
          </main>
        </div>
      </div>
    </DarkModeContext.Provider>
  );
}
