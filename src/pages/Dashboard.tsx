import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, Tooltip, ResponsiveContainer, XAxis, AreaChart, Area } from "recharts";
import { Filter, FileText, Maximize2, ChevronDown, Plus, Check, Key, Info, Terminal, Wallet, AlertCircle, CircleDollarSign, Clock, Activity, Settings, BarChart2, Calendar as CalendarIcon, X, ChevronRight, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Tooltip as UITooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DevAnnotation } from "@/components/DevAnnotation";

const data = [
  { time: "1", "GPT-4o-mini": 1.0, "Claude Opus 4.6": 2.0, "gpt-oss-120b": 0.5, "Others": 0.1 },
  { time: "2", "GPT-4o-mini": 2.0, "Claude Opus 4.6": 1.0, "gpt-oss-120b": 1.0, "Others": 0.2 },
  { time: "3", "GPT-4o-mini": 1.5, "Claude Opus 4.6": 3.0, "gpt-oss-120b": 0.8, "Others": 0.1 },
  { time: "4", "GPT-4o-mini": 4.0, "Claude Opus 4.6": 1.0, "gpt-oss-120b": 2.0, "Others": 0.3 },
  { time: "5", "GPT-4o-mini": 2.0, "Claude Opus 4.6": 2.0, "gpt-oss-120b": 1.0, "Others": 0.2 },
];

const legendItems = [
  { name: "GPT-4o-mini", color: "#ef4444", value: "4.93", usd: "$0.49", reqs: "11", successRate: "99.9%" },
  { name: "Claude Opus 4.6", color: "#3b82f6", value: "4.07", usd: "$0.41", reqs: "34", successRate: "99.5%" },
  { name: "gpt-oss-120b", color: "#f97316", value: "3.40", usd: "$0.34", reqs: "10", successRate: "98.2%" },
  { name: "Others", color: "#d4d4d8", value: "0.79", usd: "$0.08", reqs: "15", successRate: "99.1%" },
];

const apiKeyData = [
  { time: "1", "lover-demp": 2.0, "test-bookmarks": 1.6 },
  { time: "2", "lover-demp": 1.5, "test-bookmarks": 2.7 },
  { time: "3", "lover-demp": 3.0, "test-bookmarks": 2.4 },
  { time: "4", "lover-demp": 1.0, "test-bookmarks": 6.3 },
  { time: "5", "lover-demp": 0.76, "test-bookmarks": 2.2 },
];

const apiKeyLegendItems = [
  { name: "lover-demp", color: "#0ea5e9", value: "0.00826", usd: "$0.0008", reqs: "41", successRate: "99.8%", keyString: "sk-or-v1-146...fdc" },
  { name: "test-bookmarks", color: "#10b981", value: "0.00493", usd: "$0.0005", reqs: "29", successRate: "99.2%", keyString: "sk-or-v1-0d4...8bb" },
  { name: "openclaw", color: "#f59e0b", value: "0.00000", usd: "$0.0000", reqs: "0", successRate: "0.0%", keyString: "sk-or-v1-6db...b0d" },
];

const trendData = [
  { date: "Day 1", calls: 120 },
  { date: "Day 2", calls: 132 },
  { date: "Day 3", calls: 101 },
  { date: "Day 4", calls: 145 },
  { date: "Day 5", calls: 160 },
  { date: "Day 6", calls: 110 },
  { date: "Day 7", calls: 245 },
];

const appConsumptionData = [
  { name: "Chat", credits: "4.2", usd: "$0.42", reqs: "120 calls", success: "99.8%", latency: "380ms", progress: 40, color: "bg-blue-500" },
  { name: "Video (task)", credits: "3.5", usd: "$0.35", reqs: "45 tasks", success: "95.2%", latency: "~3m 28s", progress: 30, color: "bg-emerald-500" },
  { name: "Image", credits: "1.1", usd: "$0.11", reqs: "40 calls", success: "99.9%", latency: "~12s", progress: 10, color: "bg-purple-500" },
  { name: "Image (task)", credits: "1.0", usd: "$0.10", reqs: "40 tasks", success: "99.5%", latency: "~45s", progress: 10, color: "bg-pink-500" },
  { name: "Audio", credits: "1.2", usd: "$0.12", reqs: "60 calls", success: "98.5%", latency: "150ms", progress: 10, color: "bg-amber-500" },
];

const topErrors = [
  { 
    reason: "Rate Limit Exceeded", 
    count: 145, 
    percent: "45%",
    attributions: [
      { name: "abab6.5-chat", count: 98, percent: "67.6%" },
      { name: "Doubao-pro-32k", count: 35, percent: "24.1%" },
      { name: "qwen-max", count: 12, percent: "8.3%" }
    ]
  },
  { 
    reason: "Model Overloaded", 
    count: 120, 
    percent: "35%",
    attributions: [
      { name: "Claude 3.5 Sonnet", count: 70, percent: "58.3%" },
      { name: "qwen-max", count: 50, percent: "41.7%" }
    ]
  },
  { 
    reason: "Invalid API Key", 
    count: 30, 
    percent: "10%",
    attributions: [
      { name: "sk-proj-a1B2...", count: 20, percent: "66.7%" },
      { name: "sk-ant-api03...", count: 10, percent: "33.3%" }
    ]
  },
  { 
    reason: "Context Length Exceeded", 
    count: 25, 
    percent: "8%",
    attributions: [
      { name: "Claude Opus 4.6", count: 15, percent: "60%" },
      { name: "GPT-4o-mini", count: 7, percent: "28%" },
      { name: "gpt-oss-120b", count: 3, percent: "12%" }
    ]
  },
  { 
    reason: "Network Error", 
    count: 10, 
    percent: "2%",
    attributions: [
      { name: "Claude 3.5 Sonnet", count: 6, percent: "60.0%" },
      { name: "abab6.5-chat", count: 4, percent: "40.0%" }
    ]
  },
];

const topCostModels1Week = [
  { name: "Claude 3.5 Sonnet", cost: "45%", value: "$520.50" },
  { name: "GPT-4o", cost: "30%", value: "$345.20" },
  { name: "Gemini 1.5 Pro", cost: "12%", value: "$138.00" },
  { name: "Mistral-Large", cost: "8%", value: "$92.10" },
  { name: "Others", cost: "5%", value: "$57.80" },
];

const providerHealthDataSync = [
  { name: "BytePlus", successRate: "99.9%", latency: "320ms", successColor: "text-emerald-500", dot: "bg-blue-500" },
  { name: "MiniMax", successRate: "99.5%", latency: "480ms", successColor: "text-emerald-500", dot: "bg-orange-500" },
  { name: "Alibaba", successRate: "97.2%", latency: "650ms", successColor: "text-amber-500", dot: "bg-emerald-500" },
  { name: "Anthropic", successRate: "99.8%", latency: "390ms", successColor: "text-emerald-500", dot: "bg-pink-500" },
  { name: "Zhipu", successRate: "99.1%", latency: "410ms", successColor: "text-emerald-500", dot: "bg-purple-500" },
];

const providerHealthDataAsync = [
  { name: "BytePlus", successRate: "99.8%", latency: "2.1s", successColor: "text-emerald-500", dot: "bg-blue-500" },
  { name: "MiniMax", successRate: "98.5%", latency: "4.8s", successColor: "text-emerald-500", dot: "bg-orange-500" },
  { name: "Alibaba", successRate: "95.2%", latency: "6.5s", successColor: "text-amber-500", dot: "bg-emerald-500" },
  { name: "Anthropic", successRate: "99.0%", latency: "1.2s", successColor: "text-emerald-500", dot: "bg-pink-500" },
  { name: "Zhipu", successRate: "98.1%", latency: "3.1s", successColor: "text-emerald-500", dot: "bg-purple-500" },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [modalityFilter, setModalityFilter] = useState("All");
  const [groupFilter, setGroupFilter] = useState("By Model");
  const [activeFilters, setActiveFilters] = useState<{type: string, value: string}[]>([
    { type: 'Model', value: 'GPT-4o-mini' }
  ]);
  const [filterMenuState, setFilterMenuState] = useState<"root" | "model" | "apikey">("root");
  const [filterSearchQuery, setFilterSearchQuery] = useState("");
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [expandedErrors, setExpandedErrors] = useState<Record<number, boolean>>({});
  const [providerHealthType, setProviderHealthType] = useState<"sync" | "async">("sync");
  const [imageTopTaskMode, setImageTopTaskMode] = useState<"sync" | "async">("sync");

  const toggleExpandedError = (idx: number) => {
    setExpandedErrors(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const currentData: any[] = groupFilter === "By API Key" ? apiKeyData : data;
  const allLegendItems = groupFilter === "By API Key" ? apiKeyLegendItems : legendItems;
  
  const activeModelFilters = activeFilters.filter(f => f.type === 'Model').map(f => f.value);
  const activeApiKeyFilters = activeFilters.filter(f => f.type === 'API Key').map(f => f.value);

  const selectedFilters = groupFilter === "By API Key" 
    ? (activeApiKeyFilters.length > 0 ? activeApiKeyFilters : apiKeyLegendItems.map(i => i.name))
    : (activeModelFilters.length > 0 ? activeModelFilters : legendItems.map(i => i.name));
  
  const currentLegendItems = allLegendItems.filter(item => selectedFilters.includes(item.name));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Level 1: Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button className="h-9 px-4 text-sm font-medium rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors" onClick={() => navigate('/billing')}>
            <Plus className="w-4 h-4 mr-1.5" /> {t("Add Funds")}
          </Button>
        </div>
      </div>

      {/* Modality Tabs */}
      <div className="flex bg-transparent border-b border-zinc-200 w-full mb-6">
        {["All", "Chat", "Video", "Image", "Audio"].map((modality) => (
          <button
            key={modality}
            onClick={() => setModalityFilter(modality)}
            className={`px-6 py-3 text-sm font-semibold transition-colors relative ${
              modalityFilter === modality
                ? "text-zinc-900"
                : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            {t(modality)}
            {modalityFilter === modality && (
               <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />
            )}
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 bg-zinc-50/50 p-2 rounded-xl border border-zinc-200 min-h-[48px]">
        {['Model', 'API Key'].map((type) => {
          const filtersOfType = activeFilters.filter(f => f.type === type);
          if (filtersOfType.length === 0) return null;
          
          const firstValue = filtersOfType[0].value;
          const remainingCount = filtersOfType.length - 1;
          
          return (
            <div key={type} className="flex items-center text-sm bg-white border border-zinc-200 rounded-md shadow-sm overflow-hidden h-8">
              <div className="px-2.5 py-1 bg-zinc-50 text-zinc-500 border-r border-zinc-200 font-medium whitespace-nowrap">
                {type}
              </div>
              <div className="px-2.5 py-1 text-zinc-400 font-medium text-xs whitespace-nowrap">
                 is {filtersOfType.length > 1 ? "any of" : ""}
              </div>
              <div className="px-2.5 py-1 font-medium text-zinc-900 bg-zinc-50/50 whitespace-nowrap">
                {firstValue} {remainingCount > 0 ? `, +${remainingCount} more` : ""}
              </div>
              <button 
                onClick={() => setActiveFilters(prev => prev.filter(f => f.type !== type))}
                className="px-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 h-full flex items-center justify-center transition-colors border-l border-zinc-100"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}

        <Popover open={filterPopoverOpen} onOpenChange={(open) => { setFilterPopoverOpen(open); if (!open) setTimeout(() => {setFilterMenuState("root"); setFilterSearchQuery("");}, 200); }}>
          <PopoverTrigger className="flex items-center justify-center h-8 w-8 rounded-md bg-white text-zinc-400 hover:text-zinc-700 transition-colors border border-zinc-200 hover:shadow-sm" onClick={() => setFilterPopoverOpen(true)}>
            <Plus className="w-4 h-4" />
          </PopoverTrigger>
          <PopoverContent align="start" className={`${filterMenuState === "root" ? "w-48" : "w-64"} p-0 rounded-xl shadow-lg border-zinc-200 overflow-hidden transition-all duration-200`}>
            {filterMenuState === "root" && (
              <div className="p-2">
                <div className="text-[11px] font-semibold text-zinc-400 mb-2 px-2 uppercase tracking-wider">{t("Jump to...")}</div>
                <div className="space-y-1">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setFilterMenuState("model");
                      setFilterSearchQuery("");
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-lg group transition-colors"
                  >
                    <span>{t("Model")}</span>
                    <div className="flex items-center gap-2">
                       {activeFilters.filter(f => f.type === 'Model').length > 0 && (
                         <div className="px-1.5 py-0.5 rounded-md bg-zinc-200/60 text-zinc-500 text-[10px] font-semibold">
                           {activeFilters.filter(f => f.type === 'Model').length}
                         </div>
                       )}
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600" />
                    </div>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setFilterMenuState("apikey");
                      setFilterSearchQuery("");
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 rounded-lg group transition-colors"
                  >
                    <span>{t("API Key")}</span>
                    <div className="flex items-center gap-2">
                       {activeFilters.filter(f => f.type === 'API Key').length > 0 && (
                         <div className="px-1.5 py-0.5 rounded-md bg-zinc-200/60 text-zinc-500 text-[10px] font-semibold">
                           {activeFilters.filter(f => f.type === 'API Key').length}
                         </div>
                       )}
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600" />
                    </div>
                  </button>
                </div>
              </div>
            )}
            
            {(filterMenuState === "model" || filterMenuState === "apikey") && (
              <div className="flex flex-col max-h-[300px]">
                <div className="flex items-center px-3 py-2 border-b border-zinc-100 gap-2">
                  <button onClick={(e) => { e.preventDefault(); setFilterMenuState("root"); }} className="text-zinc-400 hover:text-zinc-700">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                  <input 
                    type="text" 
                    placeholder={`Search ${filterMenuState === 'model' ? 'models' : 'API keys'}`}
                    value={filterSearchQuery}
                    onChange={(e) => setFilterSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm text-zinc-800 placeholder:text-zinc-400 min-w-0"
                    autoFocus
                  />
                </div>
                <div className="overflow-y-auto p-1 py-1.5">
                  {(filterMenuState === 'model' ? legendItems : apiKeyLegendItems)
                    .filter(item => item.name.toLowerCase().includes(filterSearchQuery.toLowerCase()))
                    .map((item, i) => {
                      const isSelected = activeFilters.some(f => f.type === (filterMenuState === 'model' ? 'Model' : 'API Key') && f.value === item.name);
                      return (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const type = filterMenuState === 'model' ? 'Model' : 'API Key';
                            if (isSelected) {
                              setActiveFilters(prev => prev.filter(f => !(f.type === type && f.value === item.name)));
                            } else {
                              setActiveFilters(prev => [...prev, { type, value: item.name }]);
                            }
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-zinc-50 rounded-lg group transition-colors"
                        >
                          <span className={`${isSelected ? 'text-zinc-900 font-medium' : 'text-zinc-600 group-hover:text-zinc-900'} truncate mr-3`}>{item.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-zinc-900 shrink-0" />}
                        </button>
                      );
                    })
                  }
                  {(filterMenuState === 'model' ? legendItems : apiKeyLegendItems).filter(item => item.name.toLowerCase().includes(filterSearchQuery.toLowerCase())).length === 0 && (
                    <div className="px-3 py-4 text-sm text-center text-zinc-500">No results found</div>
                  )}
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {activeFilters.length > 0 && (
          <button 
            onClick={() => setActiveFilters([])}
            className="ml-auto text-sm text-zinc-500 hover:text-zinc-800 px-3 font-medium transition-colors"
          >
            {t("Clear")}
          </button>
        )}
      </div>

      {modalityFilter === "Image" && (
        <div className="flex justify-start mb-4">
          <div className="flex bg-zinc-100/80 p-0.5 rounded-lg border border-zinc-200/50 h-[34px]">
            <button
              onClick={() => setImageTopTaskMode("sync")}
              className={cn(
                "px-3 py-1 text-xs font-semibold rounded-md transition-all",
                imageTopTaskMode === "sync"
                  ? "bg-white text-zinc-800 shadow-sm border border-zinc-200/50"
                  : "text-zinc-500 hover:text-zinc-700"
              )}
            >
              {t("Sync")}
            </button>
            <button
              onClick={() => setImageTopTaskMode("async")}
              className={cn(
                "px-3 py-1 text-xs font-semibold rounded-md transition-all",
                imageTopTaskMode === "async"
                  ? "bg-white text-zinc-800 shadow-sm border border-zinc-200/50"
                  : "text-zinc-500 hover:text-zinc-700"
              )}
            >
              {t("Async (Task)")}
            </button>
          </div>
        </div>
      )}

      {modalityFilter === "Video" || (modalityFilter === "Image" && imageTopTaskMode === "async") ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mt-2">
          {/* Card 1: Today's Cost */}
          <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden h-[160px] flex flex-col pt-2">
            <CardContent className="p-5 flex-grow flex flex-col justify-between">
              <div className="text-sm font-medium text-zinc-500">
                {t("Today's Cost")}
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold tracking-tight text-zinc-900">125</span>
                  <span className="text-sm font-medium text-zinc-500">{t("credits")}</span>
                </div>
                <span className="text-sm font-medium text-zinc-400">$12.50 USD</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-zinc-200 shadow-sm flex flex-col items-center justify-center h-[160px] gap-2 pt-4">
            <div className="text-[40px] leading-tight font-bold text-amber-500">8</div>
            <div className="flex flex-col items-center">
              <div className="text-sm font-medium text-zinc-700">{t("Queued")}</div>
              <div className="text-xs text-zinc-400">{t("right now")}</div>
            </div>
          </Card>

          <Card className="bg-white border-zinc-200 shadow-sm flex flex-col items-center justify-center h-[160px] gap-2 pt-4">
            <div className="text-[40px] leading-tight font-bold text-indigo-500">3</div>
            <div className="flex flex-col items-center">
              <div className="text-sm font-medium text-zinc-700">{t("Processing")}</div>
              <div className="text-xs text-zinc-400">{t("right now")}</div>
            </div>
          </Card>

          <Card className="bg-white border-zinc-200 shadow-sm flex flex-col items-center justify-center h-[160px] gap-2 pt-4">
            <div className="text-[40px] leading-tight font-bold text-emerald-500">142</div>
            <div className="flex flex-col items-center">
              <div className="text-sm font-medium text-zinc-700">{t("Completed")}</div>
              <div className="text-xs text-zinc-400">{t("today")}</div>
            </div>
          </Card>

          <Card className="bg-white border-zinc-200 shadow-sm flex flex-col items-center justify-center h-[160px] gap-2 pt-4">
            <div className="text-[40px] leading-tight font-bold text-rose-500">2</div>
            <div className="flex flex-col items-center">
              <div className="text-sm font-medium text-zinc-700">{t("Failed")}</div>
              <div className="text-xs text-zinc-400">{t("today")}</div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-2">
          {/* Card 1: Today's Cost */}
          <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden h-[160px] flex flex-col pt-2">
            <CardContent className="p-5 flex-grow flex flex-col justify-between">
              <div className="text-sm font-medium text-zinc-500">
                {t("Today's Cost")}
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold tracking-tight text-zinc-900">125</span>
                  <span className="text-sm font-medium text-zinc-500">{t("credits")}</span>
                </div>
                <span className="text-sm font-medium text-zinc-400">$12.50 USD</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Today's Requests */}
          <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden h-[160px] flex flex-col pt-2">
            <CardContent className="p-0 flex-grow flex flex-col justify-between">
              <div className="px-5 pt-5 text-sm font-medium text-zinc-500">
                {t("Today's Requests")}
              </div>
              <div className="px-5 mt-1">
                <div className="text-4xl font-bold tracking-tight text-zinc-900">245</div>
              </div>
              
              <div className="mt-2 h-[45px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorCallsMetric" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="calls" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorCallsMetric)" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Avg Latency */}
          <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden h-[160px] flex flex-col pt-2">
            <CardContent className="p-5 flex-grow flex flex-col justify-between">
              <div className="text-sm font-medium text-zinc-500">
                {modalityFilter === "Image" ? t("Avg Gen Time") : t("Avg Latency")}
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-bold tracking-tight text-zinc-900">420</span>
                <span className="text-sm font-medium text-zinc-400">ms</span>
              </div>

              <div className="mt-4 flex flex-col justify-end">
                <div className="w-full flex h-1.5 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-emerald-500" style={{ width: '45%' }}></div>
                  <div className="h-full bg-amber-400" style={{ width: '40%' }}></div>
                  <div className="h-full bg-rose-500" style={{ width: '15%' }}></div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-medium text-zinc-400">
                  <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>{t("Fast")}</div>
                  <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>{t("Normal")}</div>
                  <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>{t("Slow")}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Success Rate */}
          <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden h-[160px] flex flex-col pt-2">
            <CardContent className="p-5 flex-grow flex flex-col justify-between">
              <div className="text-sm font-medium text-zinc-500">
                {t("Success Rate")}
              </div>
              <div className="flex flex-col gap-1 mt-1 flex-grow">
                <span className="text-4xl font-bold tracking-tight text-emerald-500">99.8%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Level 3: Usage Charts */}
      <div>
        <div className="flex justify-between items-center mb-4 mt-8">
          <h2 className="text-xl font-bold text-zinc-900">{t("Usage Analytics")}</h2>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger className={`flex justify-between items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-sm transition-colors shadow-sm ${date ? 'text-zinc-900 font-medium' : 'text-zinc-700'} hover:bg-zinc-50 min-w-[160px]`}>
                <div className="flex items-center gap-2 truncate">
                   <CalendarIcon className="w-4 h-4 text-zinc-400 shrink-0" />
                   <span className="truncate">{date ? format(date, "MMM d, yyyy") : t("Last 7 days")}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d !== undefined ? d : undefined);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b border-zinc-100 flex justify-end items-center bg-zinc-50/50">
            <div className="flex bg-zinc-100/80 p-1 rounded-lg border border-zinc-200/50 shadow-inner">
               <button 
                 onClick={() => setGroupFilter("By Model")}
                 className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${groupFilter === 'By Model' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-700'}`}
               >
                 {t("By Model")}
               </button>
               <button 
                 onClick={() => setGroupFilter("By API Key")}
                 className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${groupFilter === 'By API Key' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-700'}`}
               >
                 {t("By API Key")}
               </button>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x divide-zinc-100">
          {/* Spend Card */}
          <div className="md:pr-8 md:first:pl-0 pl-0 pt-6 md:pt-0 first:pt-0">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-sm font-medium text-zinc-500 mb-1">{t("Spend")}</div>
                  <div className="flex items-baseline gap-1">
                    <div className="text-2xl font-bold text-zinc-900">13.2</div>
                    <div className="text-xs text-zinc-500 font-medium">{t("credits")} <span className="text-zinc-400">($1.32)</span></div>
                  </div>
                </div>
              </div>
              
              <div className="h-[140px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentData} barSize={12}>
                    <XAxis dataKey="time" hide />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '12px' }} />
                    {currentLegendItems.map((item, index) => (
                      <Bar key={item.name} dataKey={item.name} stackId="a" fill={item.color} radius={index === currentLegendItems.length - 1 ? [2, 2, 0, 0] : [0, 0, 0, 0]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {currentLegendItems.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                       <span className="text-zinc-700 truncate max-w-[120px]">{item.name}</span>
                    </div>
                    <span className="text-zinc-500 font-mono text-xs">{item.value} <span className="text-zinc-400">({item.usd})</span></span>
                  </div>
                ))}
              </div>
          </div>

          {/* Requests Card */}
          <div className="md:px-8 pl-0 pt-6 md:pt-0">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-sm font-medium text-zinc-500 mb-1">{t("Requests / Tasks")}</div>
                  <div className="text-2xl font-bold text-zinc-900">70</div>
                </div>
              </div>
              
              <div className="h-[140px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentData} barSize={12}>
                    <XAxis dataKey="time" hide />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '12px' }} />
                    {currentLegendItems.map((item, index) => (
                      <Bar key={item.name} dataKey={item.name} stackId="a" fill={item.color} radius={index === currentLegendItems.length - 1 ? [2, 2, 0, 0] : [0, 0, 0, 0]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {currentLegendItems.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-zinc-700 truncate max-w-[120px]">{item.name}</span>
                    </div>
                    <span className="text-zinc-500 font-mono text-xs">{item.reqs}</span>
                  </div>
                ))}
              </div>
          </div>

          {/* Success Rate Card */}
          <div className="md:pl-8 pl-0 pt-6 md:pt-0">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-sm font-medium text-zinc-500 mb-1">{t("Success Rate")}</div>
                  <div className="text-2xl font-bold text-zinc-900">99.8%</div>
                </div>
              </div>
              
              <div className="h-[140px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentData} barSize={12}>
                    <XAxis dataKey="time" hide />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '12px' }} />
                    {currentLegendItems.map((item, index) => (
                      <Bar key={item.name} dataKey={item.name} stackId="a" fill={item.color} radius={index === currentLegendItems.length - 1 ? [2, 2, 0, 0] : [0, 0, 0, 0]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {currentLegendItems.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                       <span className="text-zinc-700 truncate max-w-[120px]">{item.name}</span>
                    </div>
                    <span className="text-zinc-500 font-mono text-xs">{item.successRate}</span>
                  </div>
                ))}
              </div>
          </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Level 4: App Consumption & API Key Consumption */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* App Consumption Pivot Table */}
        <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden flex flex-col">
          <CardContent className="p-0 flex-grow">
            <div className="p-5 border-b border-zinc-100">
              <h3 className="font-bold text-zinc-900 text-base">{t("Model Type Consumption")}</h3>
              <p className="text-xs text-zinc-500 mt-1">{t("Cost and usage across your model types")}</p>
            </div>
            
            <div className="w-full overflow-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-zinc-50/50 text-zinc-500 border-b border-zinc-100">
                  <tr>
                    <th className="px-5 py-3 font-medium">{t("Model Type")}</th>
                    <th className="px-5 py-3 font-medium">{t("Credits / USD")}</th>
                    <th className="px-5 py-3 font-medium">{t("Calls / Tasks")}</th>
                    <th className="px-5 py-3 font-medium">{t("Success")}</th>
                    <th className="px-5 py-3 font-medium">{t("Performance")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {appConsumptionData.map((app, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-zinc-800">
                        {t(app.name)}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-zinc-600">
                        {app.credits} <span className="text-zinc-400 text-[10px]">({app.usd})</span>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-zinc-600">{app.reqs}</td>
                      <td className="px-5 py-3.5 font-mono text-zinc-600">{app.success}</td>
                      <td className="px-5 py-3.5 font-mono text-zinc-600">{app.latency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-5 mt-auto">
              <div className="w-full flex h-2 rounded-full overflow-hidden mb-3 bg-zinc-100">
                {appConsumptionData.map((app, idx) => (
                  <div key={idx} className={`h-full ${app.color}`} style={{ width: `${app.progress}%` }}></div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                {appConsumptionData.map((app, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                    <div className={`w-2 h-2 rounded-full ${app.color}`}></div>
                    {t(app.name)}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Key Consumption Rank */}
        <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden flex flex-col">
          <CardContent className="p-0 flex-grow">
            <div className="p-5 border-b border-zinc-100 flex justify-between items-center">
              <h3 className="font-bold text-zinc-900 text-base">{t("API Key Consumption")}</h3>
              <Link to="/keys" className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline">{t("Manage Keys")}</Link>
            </div>
            
            <div className="p-5 space-y-5">
              {apiKeyLegendItems.map((key, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-zinc-100 text-zinc-600 flex items-center justify-center text-xs font-bold font-mono">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-zinc-800">{key.name}</div>
                        <div className="text-xs text-zinc-400 font-mono mt-0.5">{key.keyString}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-zinc-900">{key.value} <span className="text-xs font-normal text-zinc-500">credits</span> <span className="text-xs font-normal text-zinc-400">({key.usd})</span></div>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-indigo-500" style={{ width: `${Math.max(10, 100 - idx * 25)}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[11px] font-medium text-zinc-500">
                    <span>{key.reqs} {t("Calls")}</span>
                    <span>{key.successRate} {t("Success")}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Level 5: Top 5 Models by Cost, Provider Health & Fault Diagnosis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Top 5 Models by Cost */}
        <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden flex flex-col">
          <CardContent className="p-0 flex-grow">
            <div className="p-5 border-b border-zinc-100">
              <h3 className="font-bold text-zinc-900 text-base">{t("Top 5 Models by Cost")}</h3>
            </div>
            <div className="p-5 space-y-4">
              {topCostModels1Week.map((model, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-zinc-700">{model.name}</span>
                    <span className="font-mono text-zinc-500 text-xs">{model.value}</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: model.cost }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Provider Health */}
        <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden flex flex-col">
          <CardContent className="p-0 flex-grow flex flex-col">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="font-bold text-zinc-900 text-base">{t("Provider Health")}</h3>
              <div className="flex bg-zinc-100/80 p-0.5 rounded-lg border border-zinc-200/50">
                <button
                  onClick={() => setProviderHealthType("sync")}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-md transition-all",
                    providerHealthType === "sync"
                      ? "bg-white text-zinc-800 shadow-sm border-zinc-200/50"
                      : "text-zinc-500 hover:text-zinc-700"
                  )}
                >
                  {t("Sync")}
                </button>
                <button
                  onClick={() => setProviderHealthType("async")}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-md transition-all",
                    providerHealthType === "async"
                      ? "bg-white text-zinc-800 shadow-sm border-zinc-200/50"
                      : "text-zinc-500 hover:text-zinc-700"
                  )}
                >
                  {t("Async")}
                </button>
              </div>
            </div>
            <div className="p-5 flex-grow flex flex-col">
              <div className="flex justify-between items-center text-[13px] font-semibold text-zinc-900 mb-4 pb-2 border-b border-zinc-100/50">
                <span>{t("Provider")}</span>
                <div className="flex items-center justify-between w-[40%]">
                  <span>{t("Success Rate")}</span>
                  <span>{t("Avg Latency")}</span>
                </div>
              </div>
              <div className="space-y-4 flex-grow">
                {(providerHealthType === "sync" ? providerHealthDataSync : providerHealthDataAsync).map((provider, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm pb-4 border-b border-zinc-50 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${provider.dot}`}></div>
                      <span className="font-medium text-zinc-900">{provider.name}</span>
                    </div>
                    <div className="flex items-center justify-between w-[40%] text-right font-mono text-xs">
                      <span className={provider.successColor}>{provider.successRate}</span>
                      <span className="text-zinc-900">{provider.latency}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-500 mt-6 pt-5 border-t border-zinc-100">
                {t("Success rate + Avg Latency, spot provider issues at a glance")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Fault Diagnosis Center */}
        <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden flex flex-col">
          <CardContent className="p-0 flex-grow">
            <div className="p-5 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-zinc-900 text-base">{t("Top 5 Error Rates")}</h3>
                <Popover>
                  <PopoverTrigger className="focus:outline-none flex items-center justify-center p-1 -m-1 rounded-full hover:bg-zinc-100 transition-colors">
                    <Info className="w-4 h-4 text-zinc-500 cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-[420px] bg-zinc-900 border border-zinc-800 rounded-lg p-5 shadow-xl max-h-[85vh] max-w-[90vw] overflow-y-auto z-50 text-left">
                    <div className="space-y-5 text-sm text-zinc-300">
                      
                      {/* Model Attribution */}
                      <div>
                        <div className="text-zinc-100 font-bold mb-1">需要归因（按模型等） — 适用于以下错误类型：</div>
                        <div className="pl-2 space-y-0.5 text-zinc-400 mb-2">
                          <div>Rate Limit Exceeded</div>
                          <div>Model Overloaded</div>
                          <div>Network Error</div>
                          <div>Timeout</div>
                          <div>502 Bad Gateway</div>
                          <div>503 Service Unavailable</div>
                          <div>Context Length Exceeded</div>
                          <div>Invalid Parameters</div>
                          <div>Content Filtered</div>
                          <div>Unsupported Feature</div>
                        </div>
                        <div className="font-bold text-zinc-300 mb-1">展开后显示格式示例：</div>
                        <div className="bg-zinc-800/50 rounded-md p-2 font-mono text-xs border border-zinc-700/50">
                          <div className="flex justify-between text-zinc-200 font-medium">
                            <span>Rate Limit Exceeded</span>
                            <span>145 &nbsp;&nbsp;45%</span>
                          </div>
                          <div className="mt-1 flex justify-between text-zinc-400">
                            <span>&nbsp;&nbsp;├── Claude Opus 4.6</span>
                            <span>98 &nbsp;&nbsp;(67.6%)</span>
                          </div>
                          <div className="flex justify-between text-zinc-400">
                            <span>&nbsp;&nbsp;├── GPT-4o-mini</span>
                            <span>35 &nbsp;&nbsp;(24.1%)</span>
                          </div>
                          <div className="flex justify-between text-zinc-400">
                            <span>&nbsp;&nbsp;└── gpt-oss-120b</span>
                            <span>12 &nbsp;&nbsp;&nbsp;(8.3%)</span>
                          </div>
                        </div>
                      </div>

                      {/* API Key Attribution */}
                      <div>
                        <div className="text-zinc-100 font-bold mb-1">需要归因（按 API Key） — 适用于以下错误类型：</div>
                        <div className="pl-2 space-y-0.5 text-zinc-400 mb-2">
                          <div>Invalid API Key</div>
                        </div>
                        <div className="font-bold text-zinc-300 mb-1">展开后显示格式示例 (Invalid API Key)：</div>
                        <div className="bg-zinc-800/50 rounded-md p-2 font-mono text-xs border border-zinc-700/50">
                          <div className="flex justify-between text-zinc-200 font-medium">
                            <span>Invalid API Key</span>
                            <span>30 &nbsp;&nbsp;&nbsp;10%</span>
                          </div>
                          <div className="mt-1 flex justify-between text-zinc-400">
                            <span>&nbsp;&nbsp;├── sk-proj-a1B2...</span>
                            <span>20 &nbsp;&nbsp;(66.7%)</span>
                          </div>
                          <div className="flex justify-between text-zinc-400">
                            <span>&nbsp;&nbsp;└── sk-ant-api03...</span>
                            <span>10 &nbsp;&nbsp;(33.3%)</span>
                          </div>
                        </div>
                      </div>

                      {/* No Attribution */}
                      <div>
                        <div className="text-zinc-100 font-bold mb-1">不需要归因（用户侧问题） — 适用于以下错误类型：</div>
                        <div className="pl-2 space-y-0.5 text-zinc-400">
                          <div>Insufficient Balance</div>
                          <div>Permission Denied</div>
                          <div>Authentication Failed</div>
                        </div>
                      </div>

                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-zinc-100 p-0.5 rounded-lg border border-zinc-200 shrink-0">
                <button
                  onClick={() => navigate('/logs')}
                  className="px-3 py-1.5 text-[11px] font-medium rounded-md hover:bg-white text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1.5"
                >
                  <Terminal className="w-3 h-3" />
                  {t("View Realtime Logs")}
                </button>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex flex-col gap-2">
                {topErrors.map((error, idx) => {
                  const isExpanded = expandedErrors[idx];
                  const hasAttributions = error.attributions && error.attributions.length > 0;
                  return (
                  <div key={idx} className="flex flex-col bg-zinc-50 border border-zinc-100 rounded-xl overflow-hidden transition-all duration-200">
                    <button 
                      className={`flex items-center justify-between p-3 ${hasAttributions ? 'cursor-pointer hover:bg-zinc-100/50' : 'cursor-default'} transition-colors w-full`}
                      onClick={() => hasAttributions && toggleExpandedError(idx)}
                    >
                      <div className="flex items-center gap-3">
                         <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0">
                          {idx + 1}
                        </div>
                        <span className="text-sm font-semibold text-zinc-900">{error.reason}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4 text-right">
                          <span className="text-sm font-bold text-zinc-900">{error.count}</span>
                          <span className="text-[11px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-100 min-w-[3rem] text-center">
                            {error.percent}
                          </span>
                        </div>
                        {hasAttributions ? (
                          <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                    
                    {isExpanded && hasAttributions && (
                      <div className="px-3 pb-3 pt-1 bg-zinc-50 border-t border-zinc-100/50">
                        <div className="flex flex-col text-xs text-zinc-600 font-mono">
                          {error.attributions?.map((attr, attrIdx) => {
                            const isLast = attrIdx === error.attributions!.length - 1;
                            return (
                              <div key={attrIdx} className="flex items-center py-1.5 px-2 hover:bg-zinc-100/50 rounded transition-colors group">
                                <div className="w-8 flex justify-center shrink-0 text-zinc-300 group-hover:text-zinc-400">
                                  {isLast ? "└──" : "├──"}
                                </div>
                                <div className="flex-1 font-medium text-zinc-700">{attr.name}</div>
                                <div className="flex items-center gap-4 text-right pl-4">
                                  <span className="w-8 text-zinc-700">{attr.count}</span>
                                  <span className="w-16 text-zinc-500">({attr.percent})</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {error.reason === "Invalid API Key" && (
                          <div className="mt-3 ml-10 pl-2">
                             <button
                               onClick={(e) => {
                                 e.stopPropagation();
                                 navigate('/api-keys');
                               }}
                               className="text-xs font-semibold text-zinc-700 bg-white border border-zinc-200 shadow-sm hover:bg-zinc-50 px-3 py-1.5 rounded-md transition-colors"
                             >
                               {t("Manage API Keys")}
                             </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )})}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
