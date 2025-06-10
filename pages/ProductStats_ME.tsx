/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
//https://drive.google.com/file/d/1xgeyrAPaeQyz0BPGL3noFde2UYR33Tl4/view
import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  Ellipsis,
  Filter,
  Heart,
  Menu,
  Plus,
  Search,
  Settings,
  Triangle,
  Gem,
  LucideIcon,
  CuboidIcon,
  BarChartIcon,
  MessageSquareMore,
  Circle,
  LucideToggleLeft,
  LucideToggleRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const lineChartData = [
  { name: "Jan", rate: 50, rate2: 30 },
  { name: "Feb", rate: 45, rate2: 80 },
  { name: "Mar", rate: 30, rate2: 28 },
  { name: "Apr", rate: 25, rate2: 57 },
  { name: "May", rate: 62, rate2: 25 },
  { name: "Jun", rate: 78, rate2: 92 },
  { name: "Jul", rate: 90, rate2: 78 },
  { name: "Aug", rate: 62, rate2: 10 },
  { name: "Sep", rate: 45, rate2: 35 },
  { name: "Oct", rate: 27, rate2: 52 },
  { name: "Nov", rate: 98, rate2: 60 },
  { name: "Dec", rate: 100, rate2: 85 },
];

interface ProductTimelineEntry {
  name: string;
  range: [number, number];
  progress: number;
  status: "Customer" | "Product" | "Web";
  icons: string[];
}

const productTimeline: ProductTimelineEntry[] = [
  {
    name: "30.09",
    range: [0, 5],
    progress: 75,
    status: "Customer",
    icons: [
      "https://randomuser.me/api/portraits/men/80.jpg",
      "https://randomuser.me/api/portraits/men/76.jpg",
    ],
  },
  {
    name: "29.09",
    range: [10, 15],
    progress: 60,
    status: "Customer",
    icons: [
      "https://randomuser.me/api/portraits/men/82.jpg",
      "https://randomuser.me/api/portraits/men/45.jpg",
    ],
  },
  {
    name: "28.09",
    range: [5, 20],
    progress: 100,
    status: "Web",
    icons: ["https://randomuser.me/api/portraits/men/10.jpg"],
  },
  {
    name: "27.09",
    range: [12, 25],
    progress: 40,
    status: "Product",
    icons: ["https://randomuser.me/api/portraits/men/53.jpg"],
  },
  {
    name: "26.09",
    range: [7, 23],
    progress: 25,
    status: "Customer",
    icons: ["https://randomuser.me/api/portraits/men/89.jpg"],
  },
  {
    name: "25.09",
    range: [13, 30],
    progress: 25,
    status: "Web",
    icons: [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/men/43.jpg",
    ],
  },
  {
    name: "24.09",
    range: [17, 27],
    progress: 25,
    status: "Product",
    icons: [
      "https://randomuser.me/api/portraits/men/12.jpg",
      "https://randomuser.me/api/portraits/men/23.jpg",
      "https://randomuser.me/api/portraits/men/76.jpg",
    ],
  },
];

type StatusCategory = "Customer" | "Product" | "Web";

interface IProduct {
  name: string;
  top: number;
  middle: number;
  bottom: number;
  topColor: StatusCategory;
  bottomColor: StatusCategory;
  middleColor: StatusCategory;
}

const productData: IProduct[] = [
  {
    name: "01",
    top: 12,
    middle: 13,
    bottom: 19,
    topColor: "Web",
    bottomColor: "Product",
    middleColor: "Customer",
  },
  {
    name: "02",
    top: 17,
    middle: 19,
    bottom: 24,
    topColor: "Web",
    bottomColor: "Customer",
    middleColor: "Product",
  },
  {
    name: "03",
    top: 13,
    middle: 14,
    bottom: 22,
    topColor: "Customer",
    bottomColor: "Product",
    middleColor: "Web",
  },
  {
    name: "04",
    top: 16,
    middle: 17,
    bottom: 22,
    topColor: "Web",
    bottomColor: "Customer",
    middleColor: "Product",
  },
  {
    name: "05",
    top: 18,
    middle: 19,
    bottom: 25,
    topColor: "Customer",
    bottomColor: "Product",
    middleColor: "Web",
  },
  {
    name: "06",
    top: 17,
    middle: 18,
    bottom: 26,
    topColor: "Web",
    bottomColor: "Customer",
    middleColor: "Product",
  },
  {
    name: "07",
    top: 15,
    middle: 16,
    bottom: 21,
    topColor: "Customer",
    bottomColor: "Product",
    middleColor: "Web",
  },
  {
    name: "08",
    top: 10,
    middle: 11,
    bottom: 18,
    topColor: "Web",
    bottomColor: "Customer",
    middleColor: "Product",
  },
];

type StatusColorMap = {
  [K in StatusCategory]: string;
};

const statusColors: StatusColorMap = {
  Customer: "white",
  Product: "oklch(76.9% 0.188 70.08)",
  Web: "oklch(89.7% 0.196 126.665)",
};
const statusColorsLigth: StatusColorMap = {
  Customer: "oklch(37% 0.013 285.805)", //zinc-800
  Product: "oklch(55.5% 0.163 48.998)", //amber-800
  Web: "oklch(39.3% 0.095 152.535)", //green-800
};

enum FilterType {
  Date = 1,
  Product = 2,
  Status = 3,
}

type MyFilter = {
  type: FilterType;
  value: string;
  options: string[];
  title: string;
};

interface FilterStore {
  dateFilter: MyFilter;
  productFilter: MyFilter;
  statusFilter: MyFilter;
}

const filterInitialState = (): FilterStore => {
  return {
    dateFilter: {
      type: FilterType.Date,
      title: "Date",
      value: "none",
      options: ["none", "01", "02", "03", "04", "05", "06", "07", "08"],
    },
    statusFilter: {
      type: FilterType.Status,
      title: "Category",
      value: "none",
      options: ["none", "Customer", "Product", "Web"],
    },
    productFilter: {
      type: FilterType.Product,
      title: "Product",
      value: "none",
      options: ["none", "30", "29", "28", "27", "26", "25", "24"],
    },
  };
};

type SetFilterAction = {
  type: "SET_PRODUCTS_FILTER" | "SET_STATUS_FILTER" | "SET_DATE_FILTER";
  payload: string;
};

type ResetFilterAction = {
  type: "RESET_FILTERS";
};

type FilterAction = SetFilterAction | ResetFilterAction;

const FilterReducer = (state: FilterStore, action: FilterAction) => {
  switch (action.type) {
    case "RESET_FILTERS":
      return filterInitialState();
    case "SET_DATE_FILTER":
      return {
        ...state,
        dateFilter: {
          ...state.dateFilter,
          value: action.payload,
        },
      };
    case "SET_PRODUCTS_FILTER":
      return {
        ...state,
        productFilter: {
          ...state.productFilter,
          value: action.payload,
        },
      };
    case "SET_STATUS_FILTER":
      return {
        ...state,
        statusFilter: {
          ...state.statusFilter,
          value: action.payload,
        },
      };
  }
  return state;
};

const FilterContext = React.createContext<{
  filterStore: FilterStore;
  filterDispatch: React.Dispatch<FilterAction>;
}>({
  filterStore: filterInitialState(),
  filterDispatch: () => null,
});
const DarkModeContext = React.createContext(false);

const navLinksConfig = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "#",
    icon: Heart,
  },
  {
    id: "products",
    label: "Products",
    href: "#",
    icon: Calendar,
  },
  {
    id: "customers",
    label: "Customers",
    href: "#",
    icon: Gem,
  },
  {
    id: "reports",
    label: "Reports",
    href: "#",
    icon: Settings,
  },
];

// Simplified DateRangePicker component
interface FilterPickerProps {
  type: MyFilter;
  extraWidth?: boolean;
}

const FilterPicker = ({ type, extraWidth }: FilterPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { filterDispatch } = useContext(FilterContext);

  const handleSelect = (type: FilterType, selection: string) => {
    switch (type) {
      case FilterType.Date:
        filterDispatch({ type: "SET_DATE_FILTER", payload: selection });
        break;
      case FilterType.Product:
        filterDispatch({ type: "SET_PRODUCTS_FILTER", payload: selection });
        break;
      case FilterType.Status:
        filterDispatch({ type: "SET_STATUS_FILTER", payload: selection });
        break;
      default:
        break;
    }
    setIsOpen(false);
  };

  const formatOption = (option: string) => {
    const firsLetter = option.slice(0, 1).toUpperCase();
    return (firsLetter + option.slice(1)).replaceAll("-", " ");
  };

  return (
    <div
      className={`${
        extraWidth ? "min-w-40" : "min-w-32"
      } h-18 w-auto font-semibold px-1 py-1 relative bg-white dark:bg-neutral-800 rounded-full p-1 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700`}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between gap-2 px-3 py-2 rounded-lg text-neutral-700 dark:text-neutral-300 transition-colors text-sm"
      >
        {type.value == "none" ? (
          type.title
        ) : (
          <span>
            {type.title + ": "}
            <span className="text-black dark:text-white font-bold">
              {formatOption(type.value)}
            </span>
          </span>
        )}
        <ChevronDown />
      </button>

      {isOpen && (
        <div className="absolute z-40 right-0 w-64 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-lg dark:border-neutral-700">
          <div className="grid grid-cols-2 gap-2">
            {type.options.map((option, index) => (
              <button
                onClick={() => handleSelect(type.type, option)}
                className="p-1 rounded hover:bg-neutral-300 dark:hover:bg-neutral-700 text-xs"
                key={index}
              >
                {formatOption(option)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface CardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
}

const CardContainer: React.FC<CardContainerProps> = ({
  children,
  title,
  className,
  ...rest
}) => {
  return (
    <div
      className={`bg-neutral-200 dark:bg-neutral-800 rounded-3xl shadow-sm p-7 ${
        className || ""
      }`}
      {...rest}
    >
      <h2 className="flex justify-between text-lg font-semibold text-neutral-800 dark:text-neutral-100">
        {title}
        <Ellipsis className="w-4 h-4" />
      </h2>
      {children}
    </div>
  );
};

const FilterBar = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { filterStore, filterDispatch } = useContext(FilterContext);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { className } = props;

  return (
    <div
      onMouseLeave={() => setIsMobileFilterOpen(false)}
      className={`w-full flex flex-col md:flex-row mb-2 gap-4 justify-end items-center ${className}`}
    >
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden w-full flex justify-end">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="p-4 gap-2 flex bg-white dark:bg-neutral-800 rounded-full shadow-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700"
          aria-label="Toggle filters"
        >
          <span>Filters</span><Filter size={20} />
        </button>
      </div>

      <div
        className={`
          ${isMobileFilterOpen ? "block" : "hidden"} md:flex 
          w-full md:w-100
          flex-col md:flex-row md:items-center justify-center
          gap-2 py-4 md:p-0 
          bg-white dark:bg-neutral-800 md:bg-transparent dark:md:bg-transparent 
          rounded-lg md:rounded-none shadow-lg md:shadow-none
          absolute md:static top-16 right-4 left-4 z-20 md:z-auto 
        `}
      >
        {Object.values(filterStore).map((filter, index) => (
          <FilterPicker
            key={index + filter.type}
            type={filter}
            extraWidth={filter.title === "Category"}
          />
        ))}

        <div className="h-18 w-auto font-semibold px-1 py-1 relative bg-white dark:bg-neutral-800 rounded-full p-1 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700">
          <button
            onClick={() => filterDispatch({ type: "RESET_FILTERS" })}
            className="flex w-full justify-between items-center gap-2 px-3 py-1 rounded-lg text-neutral-700 dark:text-neutral-300 transition-colors text-sm"
          >
            <span className="md:hidden">Clear Filters</span>
            <span className="flex flex-col mb-1">
              <LucideToggleLeft
                spacing={0}
                viewBox="0 10 24 1"
                width={24}
                height={16}
              />
              <LucideToggleRight
                spacing={0}
                viewBox="0 7 24 7"
                width={24}
                height={16}
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomBarShape = (props: any) => {
  //const CustomBarShape = (props: ActiveShape<BarProps, SVGPathElement> ) => {
  const {
    x,
    y,
    width,
    height,
    payload,
    dataKey,
    value,
  }: {
    payload: IProduct;
    dataKey: "top" | "middle" | "bottom";
    value: number;
    x: number;
    y: number;
    width: number;
    height: number;
  } = props;
  const isDarkMode = useContext(DarkModeContext);
  const color = useMemo(() => {
    switch (dataKey) {
      case "top":
        return isDarkMode
          ? statusColors[payload.topColor]
          : statusColorsLigth[payload.topColor];
      case "middle":
        return isDarkMode
          ? statusColors[payload.middleColor]
          : statusColorsLigth[payload.middleColor];
      default:
        return isDarkMode
          ? statusColors[payload.bottomColor]
          : statusColorsLigth[payload.bottomColor];
    }
  }, [
    dataKey,
    isDarkMode,
    payload.topColor,
    payload.middleColor,
    payload.bottomColor,
  ]);

  // Don't render if width or height is zero or negative,
  // which can happen with empty data or certain scales.
  if (width <= 0 || height <= 0) {
    return null;
  }

  const cornerRadius = width / 2;

  return (
    <g>
      <rect
        x={x}
        y={y - (dataKey === "top" ? width : 0)}
        width={width}
        height={height}
        fill={color}
        rx={cornerRadius}
        ry={cornerRadius}
      />
      {dataKey === "top" && (
        <circle
          cx={x + width / 2}
          cy={height + y - width / 2}
          r={width / 4}
          fill={
            isDarkMode
              ? statusColors[payload.middleColor]
              : statusColorsLigth[payload.middleColor]
          }
        />
      )}
      {/* Add text label if height is sufficient */}
      {height > 15 && width > 10 && value !== undefined && (
        <text
          x={x + width / 2}
          y={y + height / 2 - (dataKey === "top" ? width : 0)}
          fill={isDarkMode ? "black" : "white"}
          fontWeight="12"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
        >
          {payload[dataKey]}
        </text>
      )}
    </g>
  );
};

const Products = () => {
  const { filterStore } = useContext(FilterContext);
  const isDarkMode = useContext(DarkModeContext);
  const filteredProducts = useMemo(() => {
    let output = productData;
    if (filterStore.dateFilter.value !== "none")
      output = productData.filter((product) => {
        return product.name === filterStore.dateFilter.value;
      });
    return output;
  }, [filterStore]);
  return (
    <div className="flex flex-col justify-between h-full py-12">
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          width={730}
          height={250}
          data={filteredProducts}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <Tooltip 
            labelStyle={{color:"black"}}
            contentStyle={{ background: "rgba(255,255,255,0.75)", color:"black" }} />
          <CartesianGrid horizontal={false} opacity={0.5} />
          <Bar
            stackId="a"
            shape={<CustomBarShape />}
            barSize={40}
            dataKey="bottom"
            label="bottom"
          />
          <Bar
            stackId="a"
            shape={<CustomBarShape />}
            barSize={40}
            dataKey="top"
            label="top"
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="sm:flex gap-5 sm:flex-row grid grid-cols-3">
        {Object.keys(statusColors).map((status) => {
          return (
            <div className="flex gap-2" key={status}>
              <Circle
                size={20}
                fill="transparent"
                strokeWidth={5}
                stroke={
                  (isDarkMode ? statusColors : statusColorsLigth)[
                    status as keyof typeof statusColors
                  ]
                }
              />
              {status == "Customer"
                ? "Resources"
                : status == "Product"
                ? "Valid"
                : "Invalid"}
            </div>
          );
        })}
        <div className="text-neutral-800/50 dark:text-neutral-100/50 w-full flex justify-end col-span-3">
          Total:{" "}
          <span className="text-neutral-800 dark:text-neutral-100">
            1.232,1
          </span>
        </div>
      </div>
    </div>
  );
};

// Custom shape for the project timeline bars with icons
const CustomBarWithIcons = (props: any) => {
  const isDarkMode = useContext(DarkModeContext);
  const { x, y, width, height, payload, radius } = props;

  const iconSize = Math.min(height || 10 * 0.8, 22); // 80% of bar height, max 22px for a barSize of 30
  const iconPadding = 3; // Padding from the left edge and between icons
  // Recharts passes radius as a single number if specified that way on <Bar>
  const barRadius =
    typeof radius === "number" ? radius : Array.isArray(radius) ? radius[0] : 0;

  if (
    !width ||
    !height ||
    width <= 0 ||
    height <= 0 ||
    !payload ||
    !payload.icons ||
    payload.icons.length === 0
  ) {
    return null;
  }

  return (
    <g>
      {/* Define clipPath for circular icons - unique ID per bar instance and icon */}
      <defs>
        {payload.icons.map((_iconUrl: string, index: number) => (
          <clipPath
            id={`barIconClip-${payload.name}-${index}`}
            key={`clip-${payload.name}-${index}`}
          >
            <circle
              cx={
                parseInt(x ? x.toString() : "1") +
                iconPadding +
                index * (iconSize + iconPadding) +
                iconSize / 2
              }
              cy={
                parseInt(y ? y.toString() : "1") +
                (height - iconSize) / 2 +
                iconSize / 2
              }
              r={iconSize / 2}
            />
          </clipPath>
        ))}
      </defs>

      {/* Main bar rectangle */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={
          (isDarkMode ? statusColors : statusColorsLigth)[
            payload.status as keyof typeof statusColors
          ] || "#8884d8"
        }
        rx={barRadius}
        ry={barRadius}
      />

      {/* Icons overlaying the start of the bar */}
      {payload.icons.map((iconUrl: string, index: number) => (
        <image
          key={`icon-${payload.name}-${index}`}
          href={iconUrl}
          x={
            parseInt(x ? x.toString() : "1") +
            iconPadding +
            index * (iconSize + iconPadding)
          } // Position icons from the left, stacking horizontally
          y={parseInt(y ? y.toString() : "1") + (height - iconSize) / 2} // Vertically center icons
          width={iconSize}
          height={iconSize}
          clipPath={`url(#barIconClip-${payload.name}-${index})`} // Apply unique circular clip
        />
      ))}
    </g>
  );
};

const ProjectTimeline = () => {
  const { filterStore } = useContext(FilterContext);
  const isDarkMode = useContext(DarkModeContext);
  const filteredProducts = useMemo(() => {
    let output = productTimeline;
    if (filterStore.productFilter.value !== "none")
      output = productTimeline.filter((product) => {
        return product.name.split(".")[0] === filterStore.productFilter.value;
      });
    if (filterStore.statusFilter.value !== "none")
      output = productTimeline.filter((product) => {
        return product.status === filterStore.statusFilter.value;
      });
    return output;
  }, [filterStore]);
  return (
    <div className="flex flex-col justify-between h-full py-12">
      <ResponsiveContainer
        width="100%"
        height={550}
        style={{ marginLeft: "-2rem" }}
      >
        <BarChart layout="vertical" data={filteredProducts}>
          <CartesianGrid
            horizontal={false}
            color={isDarkMode ? "white" : "black"}
            strokeDasharray="3 3"
          />
          <Tooltip 
            labelStyle={{color:"black"}}
            contentStyle={{ background: "rgba(255,255,255,0.75)", color:"black" }} />
          <XAxis
            type="number"
            stroke={isDarkMode ? "white" : "zinc-800"}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey="name"
            stroke={isDarkMode ? "white" : "zinc-800"}
            axisLine={false}
            tickLine={false}
            type="category"
            width={100}
            interval={0}
          />
          <Bar
            dataKey="range"
            barSize={30}
            radius={15}
            shape={<CustomBarWithIcons />}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="sm:flex gap-5 sm:flex-row grid grid-cols-3">
        {Object.keys(statusColors).map((status) => {
          return (
            <div className="flex gap-2" key={status}>
              <Circle
                size={20}
                fill="transparent"
                strokeWidth={5}
                stroke={
                  (isDarkMode ? statusColors : statusColorsLigth)[
                    status as keyof typeof statusColors
                  ]
                }
              />
              {status}
            </div>
          );
        })}
        {/* <div className="w-full"></div> */}
        <div className="text-neutral-800/50 dark:text-neutral-100/50 flex w-full justify-end col-span-3">
          Total:{" "}
          <span className="text-neutral-800 dark:text-neutral-100">284</span>
        </div>
      </div>
    </div>
  );
};

interface NavButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  title?: string;
  icon?: LucideIcon;
}

const NavButton = (props: NavButtonProps) => {
  const ButtonIcon = props.icon;

  return (
    <div className="flex items-center md:gap-2 bg-white dark:bg-neutral-700 h-12 rounded-full m-1 md:m-2 p-4">
      {ButtonIcon && <ButtonIcon className="mr-1" size={16} />}
      {props.title && <span>{props.title}</span>}
    </div>
  );
};

const DarkModeWrapper = ({ children }: { children: React.ReactNode }) => {
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
      {children}
    </DarkModeContext.Provider>
  );
};

const StatsCards = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const isDarkMode = useContext(DarkModeContext);
  const { className } = props;

  return (
    <div className={`grid grid-cols-2 gap-6 ${className}`}>
      <CardContainer className="max-md:col-span-2" title="Total Customers">
        <div className="flex md:justify-between items-start items-start">
          <div>
            <Triangle
              stroke="oklch(72.3% 0.219 149.579)"
              size={16}
              fill="oklch(72.3% 0.219 149.579)"
            />
            <p className="text-4xl font-bold mt-2 text-neutral-800 dark:text-neutral-100">
              2,4%
            </p>
            <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-400">
              <span>Web Surfing</span>
            </p>
          </div>
          <div className="ml-6">
            <Triangle
              className="rotate-180"
              size={16}
              fill="oklch(76.9% 0.188 70.08)"
              stroke="oklch(76.9% 0.188 70.08)"
            />
            <p className="text-4xl font-bold mt-2 text-neutral-800 dark:text-neutral-100">
              1,1%
            </p>
            <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-400">
              <span>Web Surfing</span>
            </p>
          </div>
        </div>
        <div style={{marginLeft:"-28px", marginRight:"-28px"}} className="mt-4 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
              <Line
                type="monotone"
                dataKey="rate"
                stroke={(isDarkMode ? statusColors : statusColorsLigth)["Web"]}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="rate2"
                stroke={
                  (isDarkMode ? statusColors : statusColorsLigth)["Product"]
                }
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContainer>

      <CardContainer className="max-md:col-span-2" title="Products Active">
        <div className="flex md:justify-between items-start items-start">
          <div>
            <Triangle
              stroke="oklch(72.3% 0.219 149.579)"
              size={16}
              fill="oklch(72.3% 0.219 149.579)"
            />
            <p className="text-4xl font-bold mt-2 text-neutral-800 dark:text-neutral-100">
              2,8%
            </p>
            <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-400">
              <span>Parthners</span>
            </p>
          </div>
          <div className="ml-6">
            <Triangle
              className="rotate-180"
              size={16}
              fill="oklch(76.9% 0.188 70.08)"
              stroke="oklch(76.9% 0.188 70.08)"
            />
            <p className="text-4xl font-bold mt-2 text-neutral-800 dark:text-neutral-100">
              3,2%
            </p>
            <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-400">
              <span>Owners</span>
            </p>
          </div>
        </div>
        <div
          style={{ margin: "1.5rem -1.5rem -1.5rem -1.5rem" }}
          className="overflow-hidden"
        >
          <div className="grid grid-rows-2 grid-flow-col gap-1 justify-center items-center top-0 left-0 ">
            {new Array(70).fill(0).map((_, index) => {
              let color;
              const random = Math.floor(Math.random() * 10);
              switch (true) {
                case random < 7:
                  color = "transparent";
                  break;
                case random < 8:
                  color = (isDarkMode ? statusColors : statusColorsLigth)[
                    "Web"
                  ];
                  break;
                case random < 9:
                  color = (isDarkMode ? statusColors : statusColorsLigth)[
                    "Customer"
                  ];
                  break;
                default:
                  color = (isDarkMode ? statusColors : statusColorsLigth)[
                    "Product"
                  ];
              }
              return (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className={`w-2 h-2 m-1 text-transparent rounded-full`}
                >
                  x
                </div>
              );
            })}
          </div>
          <div className="grid grid-rows-4 grid-flow-col gap-1 justify-center items-center">
            {new Array(140).fill(0).map((_, index) => {
              let color;
              switch (Math.floor(Math.random() * 3)) {
                case 0:
                  color = (isDarkMode ? statusColors : statusColorsLigth)[
                    "Web"
                  ];
                  break;
                case 1:
                  color = (isDarkMode ? statusColors : statusColorsLigth)[
                    "Customer"
                  ];
                  break;
                default:
                  color = (isDarkMode ? statusColors : statusColorsLigth)[
                    "Product"
                  ];
              }
              return (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className={`w-2 h-2 m-1 text-transparent rounded-full bg-${color}`}
                >
                  x
                </div>
              );
            })}
          </div>
        </div>
      </CardContainer>
    </div>
  );
};

// Main Dashboard Component
export default function Dashboard() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [filterStore, filterDispatch] = useReducer(
    FilterReducer,
    filterInitialState()
  );
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] =
    useState(true);
  const [isDesktopSidebarHovered, setIsDesktopSidebarHovered] = useState(false);
  // Example state for active nav item, replace with router logic in a real app
  const [activeNavItem, setActiveNavItem] = useState("dashboard");

  const showTextInSidebar =
    !isDesktopSidebarCollapsed || isDesktopSidebarHovered;
  const sidebarWidthClass =
    isDesktopSidebarCollapsed && !isDesktopSidebarHovered ? "w-20" : "w-64";

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navButtons = [
    { title: "Check Box", icon: CuboidIcon },
    { title: "Monitoring", icon: BarChartIcon },
    { title: "Support", icon: MessageSquareMore },
    { icon: Search },
  ];

  return (
    <DarkModeWrapper>
      <FilterContext.Provider value={{ filterStore, filterDispatch }}>
        <div
          className={`flex min-h-screen bg-neutral-100 dark:bg-black text-neutral-900 dark:text-neutral-100`}
        >
          {/* Sidebar */}
          <div
            className={`hidden md:flex z-40 ${sidebarWidthClass}  flex-col fixed left-0 top-0 bottom-0 transition-all duration-300 ease-in-out`}
            onMouseEnter={() => {
              if (isDesktopSidebarCollapsed) {
                setIsDesktopSidebarHovered(true);
              }
            }}
            onMouseLeave={() => {
              setIsDesktopSidebarHovered(false);
            }}
          >
            <div
              className={`p-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center ${
                showTextInSidebar ? "justify-between" : "justify-center"
              }`}
            >
              {showTextInSidebar && (
                <h1 className="text-xl font-bold text-neutral-600 dark:text-neutral-400 whitespace-nowrap overflow-hidden">
                  Medsync
                </h1>
              )}
              <button
                onClick={() =>
                  setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)
                }
                className="p-1.5 rounded-full text-neutral-500 dark:text-neutral-400"
                aria-label={
                  isDesktopSidebarCollapsed
                    ? "Expand sidebar"
                    : "Collapse sidebar"
                }
              >
                {isDesktopSidebarCollapsed ? (
                  <Menu size={20} />
                ) : (
                  <ChevronLeft size={20} />
                )}
              </button>
            </div>

            <nav
              className={`flex-1 overflow-y-auto overflow-x-hidden ${
                showTextInSidebar ? "p-6" : "p-4 py-6"
              }`}
            >
              <ul className="space-y-2">
                {navLinksConfig.map((item) => {
                  const isActive = item.id === activeNavItem;
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        title={item.label} // For accessibility when collapsed
                        onClick={() => setActiveNavItem(item.id)}
                        className={`flex items-center rounded-lg transition-colors
                        ${
                          isActive
                            ? "text-neutral-700 dark:text-neutral-300 font-medium"
                            : "text-neutral-600 dark:text-neutral-400 "
                        }
                        ${
                          showTextInSidebar
                            ? "px-4 py-3 gap-3"
                            : "p-3 justify-center"
                        }`}
                      >
                        {<Icon />}
                        {showTextInSidebar && (
                          <span className="whitespace-nowrap overflow-hidden">
                            {item.label}
                          </span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div
              className={`p-4 border-t border-neutral-200 dark:border-neutral-700 ${
                !showTextInSidebar ? "flex justify-center" : ""
              }`}
            >
              <div
                className={`flex items-center gap-3 ${
                  showTextInSidebar ? "p-3 rounded-lg " : "p-1"
                }`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-400 shrink-0">
                  JS
                </div>
                {showTextInSidebar && (
                  <div className="overflow-hidden whitespace-nowrap">
                    <div className="text-sm font-medium">Jane Smith</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      Administrator
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 md:ml-18">
            {/* Top Navigation */}
            <header className="bg-neutral-100 dark:bg-black shadow-sm sticky top-0 z-10 py-3">
              <div className="w-full px-8 flex justify-between items-center">
                <button
                  className="md:hidden mr-4 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div className="max-md:hidden md:pl-16 flex items-start">
                  {navButtons.map((button) => (
                    <NavButton
                      key={button.title?.replaceAll(" ", "-")}
                      title={button.title}
                      icon={button.icon}
                      
                    />
                  ))}
                </div>

                <div className="relative">
                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    onMouseEnter={() =>
                      setIsProfileDropdownOpen(true)
                    }

                    className="flex items-center gap-2 text-left focus:outline-none p-1 rounded-md max-md:hover:bg-neutral-100 dark:max-md:hover:bg-neutral-700/50"
                    id="user-menu-button"
                    aria-expanded={isProfileDropdownOpen}
                    aria-haspopup="true"
                  >
                    <div className="hidden sm:flex sm:flex-col">
                      <p className="text-sm font-medium">Jane Smith</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Administrator
                      </p>
                    </div>
                    <img
                      src="https://randomuser.me/api/portraits/women/80.jpg"
                      alt="Jane Smith"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <ChevronDown
                      className={`md:hidden w-5 h-5 text-neutral-500 dark:text-neutral-400 transition-transform duration-200 ${
                        isProfileDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isProfileDropdownOpen && (
                    <div
                      className="md:hidden absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-neutral-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 top-full"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <ul className="py-1" role="none" onMouseLeave={() =>
                      setIsProfileDropdownOpen(false)
                    }>
                        {navButtons.map((buttonItem) => {
                          //if (!buttonItem.title) return null; // Only show items with titles in dropdown
                          const ButtonIcon = buttonItem.icon;
                          return (
                            <li key={buttonItem.title?.replaceAll(" ", "-")}>
                              <a
                                href="#" // Replace with actual href or onClick handler
                                className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors w-full text-left"
                                role="menuitem"
                                onClick={() => setIsProfileDropdownOpen(false)} // Close dropdown on item click
                              >
                                {ButtonIcon && (
                                  <ButtonIcon className="w-5 h-5" />
                                )}
                                <span>{buttonItem.title || "Search"}</span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile menu */}
              {isMobileMenuOpen && (
                <div className="md:hidden absolute w-full left-0 top-full bg-white dark:bg-neutral-800 shadow-lg z-20">
                  <div className="px-4 py-3">
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-700 dark:text-neutral-300 font-medium"
                          onClick={()=>setIsMobileMenuOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                              />
                            </svg>
                          </div>
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                          onClick={()=>setIsMobileMenuOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                              />
                            </svg>
                          </div>
                          Products
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                          onClick={()=>setIsMobileMenuOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          Customers
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                          onClick={()=>setIsMobileMenuOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-300 dark:bg-700 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          Reports
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                          onClick={()=>setIsMobileMenuOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          Analytics
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </header>

            <div className="flex w-full md:pl-24">
              {/* Sidebar */}
              <div
                className={`hidden md:flex z-40 ${sidebarWidthClass} bg-neutral-100 dark:bg-black flex-col fixed left-0 top-0 bottom-0 transition-all duration-300 ease-in-out`}
                onMouseEnter={() => {
                  if (isDesktopSidebarCollapsed) {
                    setIsDesktopSidebarHovered(true);
                  }
                }}
                onMouseLeave={() => {
                  setIsDesktopSidebarHovered(false);
                }}
              >
                <div
                  className={`p-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center ${
                    showTextInSidebar ? "justify-between" : "justify-center"
                  }`}
                >
                  {showTextInSidebar && (
                    <h1 className="text-xl font-bold text-neutral-600 dark:text-neutral-400 whitespace-nowrap overflow-hidden">
                      Medsync
                    </h1>
                  )}
                  <button
                    onClick={() =>
                      setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)
                    }
                    className="p-1.5 rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400"
                    aria-label={
                      isDesktopSidebarCollapsed
                        ? "Expand sidebar"
                        : "Collapse sidebar"
                    }
                  >
                    {isDesktopSidebarCollapsed ? (
                      <Menu size={20} />
                    ) : (
                      <ChevronLeft size={20} />
                    )}
                  </button>
                </div>

                <nav
                  className={`flex-1 overflow-y-auto overflow-x-hidden ${
                    showTextInSidebar ? "p-6" : "p-4 py-6"
                  }`}
                >
                  <ul className="space-y-2">
                    {navLinksConfig.map((item) => {
                      const isActive = item.id === activeNavItem;
                      const Icon = item.icon;
                      return (
                        <li key={item.id}>
                          <a
                            href={item.href}
                            title={item.label} // For accessibility when collapsed
                            onClick={() => setActiveNavItem(item.id)}
                            className={`flex items-center rounded-full transition-colors
                          ${
                            isActive
                              ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium"
                              : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                          }
                          ${
                            showTextInSidebar
                              ? "px-4 py-3 gap-3"
                              : "p-3 justify-center"
                          }`}
                          >
                            {<Icon />}
                            {showTextInSidebar && (
                              <span className="whitespace-nowrap overflow-hidden">
                                {item.label}
                              </span>
                            )}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div
                  className={`p-4 border-t border-neutral-200 dark:border-neutral-700 ${
                    !showTextInSidebar ? "flex justify-center" : ""
                  }`}
                >
                  <div
                    className={`flex items-center gap-3 ${
                      showTextInSidebar
                        ? "p-3 rounded-lg bg-neutral-300 dark:bg-neutral-700"
                        : "p-1"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-400 shrink-0">
                      <Plus className="h-5 w-5" />
                    </div>
                    {showTextInSidebar && (
                      <div className="overflow-hidden whitespace-nowrap">
                        <div className="text-sm font-medium">John Smith</div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          Administrator
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Dashboard Content */}
              <main className="grid grid-cols-4 grid-flow-row gap-12 w-full h-full px-4 sm:px-6 lg:px-8 lg:pl-18 py-6">
                <h1 className="lg:col-span-2 col-span-4 text-4xl font-bold uppercase">
                  Check Box
                </h1>

                <FilterBar className="lg:col-span-2 col-span-4 " />

                {/* Cards */}
                <StatsCards className="max-lg:col-span-4 col-span-2" />

                {/* Main Chart */}
                <CardContainer
                  className="max-lg:col-span-4 col-span-2 row-span-2"
                  title="Projects timeline"
                >
                  <ProjectTimeline />
                </CardContainer>

                {/* Products Timeline */}
                <CardContainer
                  className="max-lg:col-span-4 col-span-2"
                  title="Products"
                >
                  <Products />
                </CardContainer>
              </main>
            </div>
          </div>
        </div>
      </FilterContext.Provider>
    </DarkModeWrapper>
  );
}
