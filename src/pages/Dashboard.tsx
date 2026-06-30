import { Card, CardContent } from "@/components/ui/card";
import { Tooltip as UITooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { BarChart, Bar, Tooltip, ResponsiveContainer, XAxis, YAxis, AreaChart, Area, LineChart, Line } from "recharts";
import { Filter, FileText, Maximize2, ChevronDown, ChevronUp, Plus, Check, Key, Info, Terminal, Wallet, AlertCircle, CircleDollarSign, Clock, Activity, Settings, BarChart2, Calendar as CalendarIcon, X, ChevronRight, Search, ArrowLeft, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
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
  { time: "Jun 16", "GPT-4o-mini": 1.0, "Claude Opus 4.6": 2.0, "gpt-oss-120b": 0.5, "Others": 0.1 },
  { time: "Jun 17", "GPT-4o-mini": 2.0, "Claude Opus 4.6": 1.0, "gpt-oss-120b": 1.0, "Others": 0.2 },
  { time: "Jun 18", "GPT-4o-mini": 1.5, "Claude Opus 4.6": 3.0, "gpt-oss-120b": 0.8, "Others": 0.1 },
  { time: "Jun 19", "GPT-4o-mini": 4.0, "Claude Opus 4.6": 1.0, "gpt-oss-120b": 2.0, "Others": 0.3 },
  { time: "Jun 20", "GPT-4o-mini": 2.0, "Claude Opus 4.6": 2.0, "gpt-oss-120b": 1.0, "Others": 0.2 },
  { time: "Jun 21", "GPT-4o-mini": 3.0, "Claude Opus 4.6": 1.5, "gpt-oss-120b": 1.2, "Others": 0.3 },
  { time: "Jun 22", "GPT-4o-mini": 2.5, "Claude Opus 4.6": 2.5, "gpt-oss-120b": 1.5, "Others": 0.2 },
];

const legendItems = [
  { name: "GPT-4o-mini", color: "#ef4444", value: "4.93", usd: "$0.49", reqs: "11", successRate: "99.9%" },
  { name: "Claude Opus 4.6", color: "#3b82f6", value: "4.07", usd: "$0.41", reqs: "34", successRate: "99.5%" },
  { name: "gpt-oss-120b", color: "#f97316", value: "3.40", usd: "$0.34", reqs: "10", successRate: "98.2%" },
  { name: "Others", color: "#d4d4d8", value: "0.79", usd: "$0.08", reqs: "15", successRate: "99.1%" },
];

const apiKeyData = [
  { time: "Jun 16", "lover-demp": 2.0, "test-bookmarks": 1.6 },
  { time: "Jun 17", "lover-demp": 1.5, "test-bookmarks": 2.7 },
  { time: "Jun 18", "lover-demp": 3.0, "test-bookmarks": 2.4 },
  { time: "Jun 19", "lover-demp": 1.0, "test-bookmarks": 6.3 },
  { time: "Jun 20", "lover-demp": 0.76, "test-bookmarks": 2.2 },
  { time: "Jun 21", "lover-demp": 1.2, "test-bookmarks": 3.1 },
  { time: "Jun 22", "lover-demp": 2.5, "test-bookmarks": 1.8 },
];

const apiKeyLegendItems = [
  { name: "lover-demp", color: "#0ea5e9", value: "0.00826", usd: "$0.0008", reqs: "41", tasks: "15", successRate: "99.8%", keyString: "sk-or-v1-146...fdc" },
  { name: "test-bookmarks", color: "#10b981", value: "0.00493", usd: "$0.0005", reqs: "29", tasks: "2", successRate: "99.2%", keyString: "sk-or-v1-0d4...8bb" },
  { name: "openclaw", color: "#f59e0b", value: "0.00000", usd: "$0.0000", reqs: "0", tasks: "0", successRate: "0.0%", keyString: "sk-or-v1-6db...b0d" },
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
    reason: "QUOTA_EXHAUSTED", 
    count: 145, 
    percent: "45%",
    attributions: [
      { name: "sk-proj-a1B2...", count: 98, percent: "67.6%" },
      { name: "sk-ant-api03...", count: 35, percent: "24.1%" },
      { name: "sk-qwen-max9...", count: 12, percent: "8.3%" }
    ]
  },
  { 
    reason: "UPSTREAM_ERROR", 
    count: 120, 
    percent: "35%",
    attributions: [
      { name: "abab6.5-chat", count: 70, percent: "58.3%" },
      { name: "Doubao-pro-32k", count: 50, percent: "41.7%" }
    ]
  },
  { 
    reason: "RATE_LIMIT_OVERLOAD", 
    count: 30, 
    percent: "10%",
    attributions: [
      { name: "Claude 3.5 Sonnet", count: 20, percent: "66.7%" },
      { name: "qwen-max", count: 10, percent: "33.3%" }
    ]
  },
  { 
    reason: "PERMISSION_DENIED", 
    count: 25, 
    percent: "8%",
    attributions: [
      { name: "sk-test-x123...", count: 15, percent: "60%" },
      { name: "sk-dev-y890...", count: 10, percent: "40%" }
    ]
  },
  { 
    reason: "INTERNAL_ROUTING_ERROR", 
    count: 10, 
    percent: "2%",
    attributions: []
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
  const [activeFilters, setActiveFilters] = useState<{type: string, value: string}[]>([]);
  const [filterMenuState, setFilterMenuState] = useState<"root" | "model" | "apikey">("root");
  const [filterSearchQuery, setFilterSearchQuery] = useState("");
  const [filterPopoverOpen, setFilterPopoverOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [expandedErrors, setExpandedErrors] = useState<Record<number, boolean>>({});
  const [providerHealthType, setProviderHealthType] = useState<"sync" | "async">("sync");
  const [isEmptyState, setIsEmptyState] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [activeMetricTab, setActiveMetricTab] = useState<"spend" | "requests" | "success">("spend");

  const EmptyStatePlaceholder = ({ 
    title = t("No data"), 
    message = t("There is no data to display for the selected period."),
    icon: Icon = Inbox
  }: { 
    title?: string; 
    message?: string;
    icon?: React.ElementType;
  }) => (
    <div className="flex flex-col items-center justify-center p-8 text-center h-[calc(100%-2rem)] min-h-[160px] w-full bg-zinc-50/50 rounded-xl border border-dashed border-zinc-200/60 m-4 mx-auto max-w-[calc(100%-2rem)]">
      <div className="w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center mb-3 shadow-sm">
        <Icon className="w-5 h-5 text-zinc-400" />
      </div>
      <h3 className="text-sm font-semibold text-zinc-900 mb-1">{title}</h3>
      {message && <p className="text-xs text-zinc-500 max-w-[220px] mx-auto leading-relaxed">{message}</p>}
    </div>
  );

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

  const showTasks = modalityFilter === "All" || modalityFilter === "Video" || modalityFilter === "Image";

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Level 1: Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <h1 
            className="text-2xl font-bold text-zinc-900 cursor-pointer hover:text-zinc-700 transition-colors"
            onClick={() => setIsEmptyState(false)}
          >
            Dashboard
          </h1>
          <Popover>
            <PopoverTrigger className="px-2.5 py-1 text-xs font-semibold rounded-md border bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
              <Info className="w-3.5 h-3.5" />
              【2026616需求】
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-[800px] max-w-[90vw] max-h-[85vh] overflow-y-auto p-5 text-xs font-mono whitespace-pre-wrap leading-relaxed shadow-xl border-zinc-200 bg-white text-zinc-800 break-words z-50">
                <div className="space-y-4">
                  <div>
                    <div className="font-bold text-zinc-900 mb-1 text-sm border-b pb-1">Dashboard 划分为3个区域</div>
                    <div className="pl-2 space-y-3 mt-2 text-zinc-600">
                      <div>
                        <div className="font-bold text-zinc-800">第一个区域：引导区域（已有）</div>
                      </div>
                      <div>
                        <div className="font-bold text-zinc-800">第二个区域：全局24小时概率（新增）</div>
                        <div className="pl-4 mt-1 space-y-1">
                          <div>● 时间维度，近24小时内</div>
                          <div>● 一级字段：花费（美金/credts）、请求量/任务数量、成功率（同步/异步）、平均延时（同步/异步）</div>
                          <div>● 二级字段：任务数量鼠标悬停显示</div>
                          <div>● 排队（异步任务排队中的数量）、执行中（异步任务执行中的数量）、成功（异步任务成功的数量）、失败（异步任务失败的数量）</div>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-zinc-800">第三个区域：用量分析（已有+新增）</div>
                        <div className="pl-4 mt-1 space-y-2">
                          <div>● 此区域分为6个区域<br/>● 筛选条件：时间筛选框（默认近7天）</div>
                          <div><span className="font-semibold text-zinc-700">子区域一：细分指标图</span>（部分有，需要可以按照日期模型、key显示）</div>
                          <div>
                            <span className="font-semibold text-zinc-700">子区域二、单位时间按类型统计（新增）</span>
                            <div className="pl-2 mt-1 space-y-1 text-[11px]">
                              <div>● 按照模型的类型+任务类型维度,一共5条数据</div>
                              <div>● 字段：花费（美金/credts）、请求量/任务数量、成功率、平均延时（同步/异步）</div>
                              <div>● 按照花费倒序</div>
                            </div>
                          </div>
                          <div>
                            <span className="font-semibold text-zinc-700">子区域三、单位时间花费前5API key的分析（新增）</span>
                            <div className="pl-2 mt-1 space-y-1 text-[11px]">
                              <div>● 按照API key的维度</div>
                              <div>● 指标：花费（美金/credts）、请求量/任务数量、成功率</div>
                              <div>● 按照花费倒序,显示前5</div>
                              <div>● 按钮：Manage Keys 点击跳转到 API Keys页面</div>
                            </div>
                          </div>
                          <div>
                            <span className="font-semibold text-zinc-700">子区域四、单位时间花费前5的模型ID的分析（新增）</span>
                            <div className="pl-2 mt-1 space-y-1 text-[11px]">
                              <div>● 按照花费的维度</div>
                              <div>● 指标：模型ID</div>
                              <div>● 按照花费倒序,显示前5</div>
                            </div>
                          </div>
                          <div>
                            <span className="font-semibold text-zinc-700">子区五、单位时间供应商维度(新增)</span>
                            <div className="pl-2 mt-1 space-y-1 text-[11px]">
                              <div>● 按照供应商+任务类型(可以切换同步/异步)</div>
                              <div>● 指标：成功率\平均延时</div>
                              <div>● 按照成功率倒序</div>
                            </div>
                          </div>
                          <div>
                            <span className="font-semibold text-zinc-700">子区六、单位时间错误率前5(新增)</span>
                            <div className="pl-2 mt-1 space-y-1 text-[11px]">
                              <div>● 按照错误类型</div>
                              <div>● 按照错误率统计数量倒序</div>
                              <div>● 不同的错误率，可以展开显示不同的内容，参考下面的错误类</div>
                              <div>● 按钮： view realtime logs，点击跳转到logs页面</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="font-bold text-zinc-900 mb-1">维度：</div>
                    <div className="pl-2 space-y-1 text-zinc-600">
                      <div>1、类别维度：chat、image、video、audio</div>
                      <div>2、任务方式的维度：同步任务、移步任务</div>
                      <div>3、Key维度：按照key去统计花费、成功率和平均延时（区分任务方式）</div>
                      <div>4、供应商维度（后端已有）</div>
                      <div>5、模型维度（后端已有）</div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="font-bold text-zinc-900 mb-2">指标表：</div>
                    <div className="overflow-x-auto rounded-lg border border-zinc-200">
                      <table className="min-w-full divide-y divide-zinc-200 text-[11px] text-zinc-600">
                        <thead className="bg-zinc-50 font-bold text-zinc-800">
                          <tr>
                            <th className="px-3 py-2 text-left whitespace-nowrap">#</th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">指标</th>
                            <th className="px-3 py-2 text-left">公式 / 说明</th>
                            <th className="px-3 py-2 text-left whitespace-nowrap">类型</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 bg-white">
                          <tr><td className="px-3 py-2">1</td><td className="px-3 py-2">花费</td><td className="px-3 py-2">后端已有（USD + Credits 双币展示）</td><td className="px-3 py-2">累计值</td></tr>
                          <tr><td className="px-3 py-2">2A</td><td className="px-3 py-2">同步请求次数</td><td className="px-3 py-2">单位时间 requests 总数</td><td className="px-3 py-2">累计值</td></tr>
                          <tr><td className="px-3 py-2">2B</td><td className="px-3 py-2">异步任务次数</td><td className="px-3 py-2">单位时间 tasks 总数（含所有状态）</td><td className="px-3 py-2">累计值</td></tr>
                          <tr><td className="px-3 py-2">3A</td><td className="px-3 py-2">同步平均延时</td><td className="px-3 py-2">单位时间总响应耗时 ÷ 单位时间 requests 总数</td><td className="px-3 py-2">均值</td></tr>
                          <tr><td className="px-3 py-2">3C</td><td className="px-3 py-2">异步平均延时</td><td className="px-3 py-2">单位时间总响应耗时 ÷ 单位时间 task总数</td><td className="px-3 py-2">均值</td></tr>
                          <tr><td className="px-3 py-2">4A</td><td className="px-3 py-2">同步成功率</td><td className="px-3 py-2">单位时间成功数(同步) ÷ 单位时间 requests 总数 × 100%</td><td className="px-3 py-2">百分比</td></tr>
                          <tr><td className="px-3 py-2">4B</td><td className="px-3 py-2">异步成功率</td><td className="px-3 py-2">单位时间 completed 数 ÷ 单位时间 tasks 数(completed + failed) × 100%</td><td className="px-3 py-2">百分比（成功率不计算排队中和执行中的）</td></tr>
                          <tr><td className="px-3 py-2">5</td><td className="px-3 py-2">排队中</td><td className="px-3 py-2">当前 status = queued 的 tasks 数量</td><td className="px-3 py-2">异步</td></tr>
                          <tr><td className="px-3 py-2">6</td><td className="px-3 py-2">执行中</td><td className="px-3 py-2">当前 status = in_progress 的 tasks 数量</td><td className="px-3 py-2">异步</td></tr>
                          <tr><td className="px-3 py-2">7</td><td className="px-3 py-2">已完成</td><td className="px-3 py-2">单位时间 status = completed 的 tasks 数量</td><td className="px-3 py-2">异步</td></tr>
                          <tr><td className="px-3 py-2">8</td><td className="px-3 py-2">已失败</td><td className="px-3 py-2">单位时间 status = failed 的 tasks 数量</td><td className="px-3 py-2">异步</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="font-bold text-zinc-900 mb-1">指标说明：</div>
                    <div className="pl-2 space-y-1 text-zinc-600">
                      <div>1、花费（美金和credits）（后端已有）</div>
                      <div>
                        2、请求次数<br/>
                        &nbsp;&nbsp;A：单位时间requests总次数<br/>
                        &nbsp;&nbsp;B：单位时间tasks总次数（包含成功、失败、排队和执行中的）
                      </div>
                      <div>
                        3、平均延时（同步移步分别计算）<br/>
                        &nbsp;&nbsp;A：单位时间总延迟时间（同步）<br/>
                        &nbsp;&nbsp;B：单位时间总延迟时间（异步）
                      </div>
                      <div>
                        4、成功率（同步移步分别计算）<br/>
                        &nbsp;&nbsp;A：（单位时间的成功总数（同步）<br/>
                        &nbsp;&nbsp;B：（单位时间总延迟时间（异步）
                      </div>
                      <div>5、排队的数量（仅异步）</div>
                      <div>6、执行中的数量（仅异步）</div>
                      <div>7、完成的数量（仅异步）</div>
                      <div>8、失败的数量（仅异步）</div>
                      <div>
                        9、错误类型
                        <div className="pl-4 mt-1 space-y-1">
                          <div>AUTH_FAILED: 身份验证失败（展示Key）</div>
                          <div>INVALID_PARAMETER: 请求参数错误（展示模型ID）</div>
                          <div>INSUFFICIENT_BALANCE: 余额不足</div>
                          <div>PERMISSION_DENIED: 权限不足（展示key）</div>
                          <div>MODEL_NOT_FOUND: 指定模型不存在（展示模型ID）</div>
                          <div>RATE_LIMIT_REACHED: 触发限流（展示模型ID）</div>
                          <div>SERVER_ERROR: 厂商或中转内部服务器错误（展示模型ID/供应商）</div>
                          <div>SERVICE_UNAVAILABLE: 服务不可用或下线（展示模型ID/供应商）</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          <button 
            onClick={() => setIsEmptyState(!isEmptyState)}
            className={cn(
              "px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors hidden sm:block",
              isEmptyState 
                ? "bg-zinc-900 text-white border-zinc-900" 
                : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
            )}
          >
            {isEmptyState ? t("Filled Data") : t("Empty Data")}
          </button>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {!showGuide && (
            <Button variant="outline" className="h-9 px-3 text-sm font-medium rounded-lg border-zinc-200 text-zinc-600 hover:text-zinc-900 transition-colors bg-white hover:bg-zinc-50" onClick={() => setShowGuide(true)}>
              <Info className="w-4 h-4 mr-1.5" /> {t("Show Guide")}
            </Button>
          )}
          <Button className="h-9 px-4 text-sm font-medium rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors" onClick={() => navigate('/billing')}>
            <Plus className="w-4 h-4 mr-1.5" /> {t("Add Funds")}
          </Button>
        </div>
      </div>

      {/* Setup Guide */}
      {showGuide && (
        <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden mt-6 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 mb-1">{t("Get started with your API Gateway in minutes")}</h2>
                <p className="text-sm text-zinc-500">{t("Centralized view of keys, balances, routing, and service health.")}</p>
              </div>
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 h-8 font-medium"
                  onClick={() => setShowGuide(false)}
                >
                  <ChevronUp className="w-3.5 h-3.5 mr-1" /> {t("Hide guide")}
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-[50%] left-0 w-full h-px bg-zinc-200 z-0" />
              
              {/* Step 1 */}
              <div className="flex-1 border border-zinc-100 shadow-sm hover:border-zinc-300 transition-colors p-4 rounded-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative bg-white z-10">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-zinc-200 bg-white flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <Wallet className="w-4 h-4 text-zinc-700" />
                      <h3 className="font-semibold text-zinc-900 text-sm">{t("1. Add Credits")}</h3>
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-1">{t("Maintain sufficient balance before production")}</p>
                  </div>
                </div>
                <Button 
                  size="sm"
                  className="bg-zinc-900 text-white hover:bg-zinc-800 ml-12 lg:ml-0 shrink-0"
                  onClick={() => navigate('/billing')}
                >
                  {t("Top up")}
                </Button>
              </div>

              {/* Step 2 */}
              <div className="flex-1 border border-zinc-100 shadow-sm hover:border-zinc-300 transition-colors p-4 rounded-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative bg-white z-10">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-zinc-200 bg-white flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-zinc-300 bg-transparent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <Key className="w-4 h-4 text-zinc-700" />
                      <h3 className="font-semibold text-zinc-900 text-sm">{t("2. Create API Key")}</h3>
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-1">{t("Create a key for your application or service")}</p>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 border-zinc-200 ml-12 lg:ml-0 shrink-0"
                  onClick={() => navigate('/api-keys')}
                >
                  {t("Create Key")}
                </Button>
              </div>

              {/* Step 3 */}
              <div className="flex-1 border border-zinc-100 shadow-sm hover:border-zinc-300 transition-colors p-4 rounded-xl flex items-center gap-4 relative bg-white z-10">
                <div className="w-8 h-8 rounded-full border border-zinc-200 bg-white flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-zinc-300 bg-transparent" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Terminal className="w-4 h-4 text-zinc-700" />
                    <h3 className="font-semibold text-zinc-900 text-sm">{t("3. Send Requests")}</h3>
                  </div>
                  <p className="text-xs text-zinc-500 line-clamp-1">{t("Verify routing using Playground or client")}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-300 ml-auto shrink-0" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Level 2: 24h Global Overview */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-zinc-900">{t("Global Overview (Last 24h)")}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-2">
          {/* Card 1: Last 24h Cost */}
          <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden h-[160px] flex flex-col pt-2">
            <CardContent className="p-5 flex-grow flex flex-col justify-between">
              <div className="text-sm font-medium text-zinc-500">
                {t("Last 24h Cost")}
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-4xl font-bold tracking-tight ${isEmptyState ? "text-zinc-300" : "text-zinc-900"}`}>{isEmptyState ? "0" : "250"}</span>
                  <span className="text-sm font-medium text-zinc-500">{t("credits")}</span>
                </div>
                <span className="text-sm font-medium text-zinc-400">{isEmptyState ? "$0.00 USD" : "$25.00 USD"}</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Last 24h Requests */}
          <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden h-[160px] flex flex-col pt-2 relative">
            <CardContent className="p-5 flex-grow flex flex-col justify-between z-10 relative">
              <div className="text-sm font-medium text-zinc-500">
                {t("Last 24h Requests")}
              </div>
              <div className="flex flex-col justify-end mt-1">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold tracking-tight ${isEmptyState ? "text-zinc-300" : "text-zinc-900"}`}>{isEmptyState ? "0" : "290"}</span>
                </div>
                <div className="text-xs font-medium text-zinc-500 mt-2 flex gap-2">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600">
                    <span className="font-semibold">{isEmptyState ? "0" : "245"}</span> {t("requests")}
                  </div>
                  {showTasks && (
                    <TooltipProvider delay={100}>
                      <UITooltip>
                        <TooltipTrigger>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 cursor-default hover:bg-zinc-200 transition-colors">
                            <span className="font-semibold">{isEmptyState ? "0" : "45"}</span> {t("tasks")}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" align="center" className="bg-zinc-900 border-zinc-800 text-zinc-300 shadow-xl px-0 py-1">
                          <div className="text-sm">
                            <div className="px-3 py-1 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 border-b border-zinc-800/50 pb-2">{t("Tasks Status")}</div>
                            <div className="space-y-1 mt-1 px-3 py-1">
                              <div className="flex justify-between items-center gap-6"><span className="text-zinc-400">{t("Queued")}</span> <span className="font-medium text-amber-400">{isEmptyState ? "0" : "8"}</span></div>
                              <div className="flex justify-between items-center gap-6"><span className="text-zinc-400">{t("Processing")}</span> <span className="font-medium text-indigo-400">{isEmptyState ? "0" : "3"}</span></div>
                              <div className="flex justify-between items-center gap-6"><span className="text-zinc-400">{t("Success")}</span> <span className="font-medium text-emerald-400">{isEmptyState ? "0" : "32"}</span></div>
                              <div className="flex justify-between items-center gap-6"><span className="text-zinc-400">{t("Failed")}</span> <span className="font-medium text-rose-400">{isEmptyState ? "0" : "2"}</span></div>
                            </div>
                          </div>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Avg Latency */}
          <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden h-[160px] flex flex-col pt-2 relative">
            <CardContent className="p-5 flex-grow flex flex-col justify-between z-10 relative">
              <div className="text-sm font-medium text-zinc-500">
                {t("Avg Latency")}
              </div>
              <div className="flex flex-col justify-end mt-1">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold tracking-tight ${isEmptyState ? "text-zinc-300" : "text-zinc-900"}`}>{isEmptyState ? "0" : "20.2s"}</span>
                </div>
                <div className="text-xs font-medium text-zinc-500 mt-2 flex gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600">
                    <span className="font-semibold">{isEmptyState ? "0" : "120ms"}</span> ({t("reqs")})
                  </div>
                  {showTasks && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600">
                      <span className="font-semibold">{isEmptyState ? "0" : "~2m 10s"}</span> ({t("tasks")})
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Success Rate */}
          <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden h-[160px] flex flex-col pt-2 relative">
            <CardContent className="p-5 flex-grow flex flex-col justify-between z-10 relative">
              <div className="text-sm font-medium text-zinc-500">
                {t("Success Rate")}
              </div>
              <div className="flex flex-col justify-end mt-1 flex-grow">
                 <div className="flex items-baseline gap-1.5">
                  <span className={`text-4xl font-bold tracking-tight ${isEmptyState ? "text-zinc-300" : "text-zinc-900"}`}>{isEmptyState ? "0%" : "99.5%"}</span>
                </div>
                <div className="text-xs font-medium text-zinc-500 mt-2 flex gap-2">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600">
                    <span className="font-semibold text-emerald-600">{isEmptyState ? "0%" : "99.8%"}</span> ({t("reqs")})
                  </div>
                  {showTasks && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600">
                      <span className="font-semibold text-emerald-600">{isEmptyState ? "0%" : "95.2%"}</span> ({t("tasks")})
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      

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
          <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
               <h3 className="text-lg font-bold text-zinc-900">{t("Metrics Breakdown")}</h3>
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

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2 bg-zinc-50/50 p-2 rounded-xl border border-zinc-200 min-h-[48px]">
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
          </div>
          <CardContent className="p-6">
            <div className="flex flex-col gap-6">
              {/* Tabs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Spend Tab */}
                <div 
                  className={`cursor-pointer transition-all duration-200 border rounded-xl p-4 ${activeMetricTab === 'spend' ? 'bg-zinc-50 border-zinc-200 shadow-sm' : 'border-transparent hover:bg-zinc-50/50'}`}
                  onClick={() => setActiveMetricTab('spend')}
                >
                  <div className="text-sm font-medium text-zinc-500 mb-1">{t("Spend")}</div>
                  <div className="flex items-baseline gap-1">
                    <div className={`text-2xl font-bold ${isEmptyState ? "text-zinc-300" : "text-zinc-900"}`}>{isEmptyState ? "0" : "13.2"}</div>
                    <div className="text-xs text-zinc-500 font-medium">{t("credits")} <span className="text-zinc-400">({isEmptyState ? "$0.00" : "$1.32"})</span></div>
                  </div>
                </div>

                {/* Requests Tab */}
                <div 
                  className={`cursor-pointer transition-all duration-200 border rounded-xl p-4 ${activeMetricTab === 'requests' ? 'bg-zinc-50 border-zinc-200 shadow-sm' : 'border-transparent hover:bg-zinc-50/50'}`}
                  onClick={() => setActiveMetricTab('requests')}
                >
                  <div className="text-sm font-medium text-zinc-500 mb-1">{t("Requests / Tasks")}</div>
                  <div className={`text-2xl font-bold ${isEmptyState ? "text-zinc-300" : "text-zinc-900"}`}>{isEmptyState ? "0" : "70"}</div>
                </div>

                {/* Success Rate Tab */}
                <div 
                  className={`cursor-pointer transition-all duration-200 border rounded-xl p-4 ${activeMetricTab === 'success' ? 'bg-zinc-50 border-zinc-200 shadow-sm' : 'border-transparent hover:bg-zinc-50/50'}`}
                  onClick={() => setActiveMetricTab('success')}
                >
                  <div className="text-sm font-medium text-zinc-500 mb-1">{t("Success Rate")}</div>
                  <div className={`text-2xl font-bold ${isEmptyState ? "text-zinc-300" : "text-zinc-900"}`}>{isEmptyState ? "0.00%" : "99.8%"}</div>
                </div>
              </div>

              {/* Chart */}
              <div className="h-[280px] w-full mt-4 -ml-4">
                {isEmptyState ? (
                  <EmptyStatePlaceholder title="No chart data" message="" icon={BarChart2} />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{fontSize: 12, fill: '#71717a'}} dy={10} />
                      <YAxis tickLine={false} axisLine={false} tick={{fontSize: 12, fill: '#71717a'}} width={40} />
                      <Tooltip cursor={{stroke: '#e4e4e7', strokeWidth: 1, strokeDasharray: '4 4'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '12px' }} />
                      {currentLegendItems.filter(item => item.name !== 'Others').map((item) => (
                        <Line type="monotone" key={item.name} dataKey={item.name} stroke={item.color} strokeWidth={2} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full">
                {currentLegendItems.map((item) => (
                  <div key={item.name} className="flex flex-col justify-center items-start gap-1 p-4 bg-zinc-50 border border-zinc-100 rounded-xl">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
                       <span className={`truncate text-xs font-medium ${isEmptyState ? "text-zinc-400" : "text-zinc-600"}`}>{item.name}</span>
                    </div>
                    {activeMetricTab === 'spend' && (
                      <div className={`font-mono text-xl font-semibold mt-1 ${isEmptyState ? "text-zinc-300" : "text-zinc-900"}`}>{isEmptyState ? "0" : item.value} <span className="text-zinc-400 text-xs font-normal">({isEmptyState ? "$0.00" : item.usd})</span></div>
                    )}
                    {activeMetricTab === 'requests' && (
                      <div className={`font-mono text-xl font-semibold mt-1 ${isEmptyState ? "text-zinc-300" : "text-zinc-900"}`}>{isEmptyState ? "0" : item.reqs}</div>
                    )}
                    {activeMetricTab === 'success' && (
                      <div className={`font-mono text-xl font-semibold mt-1 ${isEmptyState ? "text-zinc-300" : "text-zinc-900"}`}>{isEmptyState ? "0.00%" : item.successRate}</div>
                    )}
                  </div>
                ))}
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
                  {isEmptyState ? (
                    <tr>
                      <td colSpan={5} className="py-12">
                        <EmptyStatePlaceholder title={t("No data")} message="" icon={Terminal} />
                      </td>
                    </tr>
                  ) : (
                    appConsumptionData.map((app, idx) => (
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
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {isEmptyState ? (
              <div className="p-5 mt-auto text-zinc-400 text-xs text-center border-t border-zinc-100/50 py-8">
                {t("No relevant data found")}
              </div>
            ) : (
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
            )}
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
              {isEmptyState ? (
                <EmptyStatePlaceholder title={t("No API keys used")} message="" icon={Key} />
              ) : (
                apiKeyLegendItems.map((key, idx) => (
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
                        <div className="text-sm font-bold text-zinc-900">{key.value} <span className="text-xs font-normal text-zinc-500">{t("credits")}</span> <span className="text-xs font-normal text-zinc-400">({key.usd})</span></div>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-indigo-500" style={{ width: `${Math.max(10, 100 - idx * 25)}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[11px] font-medium text-zinc-500">
                      <span>{key.reqs} {t("Calls")}{key.tasks && key.tasks !== "0" ? ` + ${key.tasks} ${t("Tasks")}` : ""}</span>
                      <span>{key.successRate} {t("Success")}</span>
                    </div>
                  </div>
                ))
              )}
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
              {isEmptyState ? (
                <EmptyStatePlaceholder title={t("No model consumption")} message="" icon={Activity} />
              ) : (
                topCostModels1Week.map((model, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-zinc-700">{model.name}</span>
                      <span className="font-mono text-zinc-500 text-xs">{model.value}</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: model.cost }}></div>
                    </div>
                  </div>
                ))
              )}
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
                {isEmptyState ? (
                  <EmptyStatePlaceholder title={t("No provider queries")} message="" icon={Activity} />
                ) : (
                  (providerHealthType === "sync" ? providerHealthDataSync : providerHealthDataAsync).map((provider, idx) => (
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
                  ))
                )}
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
                  <PopoverTrigger className="px-2.5 py-1 text-xs font-semibold rounded-md border bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
                    <Info className="w-3.5 h-3.5" />
                    【2026616需求】
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-[800px] max-w-[90vw] max-h-[85vh] overflow-y-auto p-5 text-xs font-mono whitespace-pre-wrap leading-relaxed shadow-xl border-zinc-200 bg-white text-zinc-800 break-words z-50">
                    <div className="space-y-6 text-sm">
                      {/* Top instruction section */}
                      <div className="space-y-2">
                        <p className="font-semibold text-zinc-900 border-b border-zinc-100 pb-2">TOP 5 ErrorRates 统计规则说明</p>
                        <p className="text-zinc-600 leading-relaxed text-xs">
                          TOP 5 ErrorRates 只显示 8 种大类，每种大类的统计数量由其下面的各个细分类别错误数量加总得出计算。占比则根据总的大类错误数进行计算。
                        </p>
                        <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-100 text-xs text-zinc-600 space-y-1.5 font-mono">
                          <p className="font-semibold text-zinc-800">举例说明：</p>
                          <p>单位时间内 <span className="font-semibold text-zinc-800">QUOTA_EXHAUSTED</span> 类别下面这三种错误的总数是 145，</p>
                          <p>当前用户总错误数量是 322.2，</p>
                          <p>那么当前错误类型的占比就是：145 / 322.2 = <span className="font-semibold text-zinc-800">45%</span></p>
                        </div>
                      </div>

                      {/* Section 1: 按 Key 归因 */}
                      <div>
                        <h4 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                          按照 Key 归因
                        </h4>
                        <div className="space-y-4 pl-4 border-l-2 border-zinc-100 ml-1">
                          
                          <div className="space-y-1.5">
                            <h5 className="font-semibold text-zinc-800 text-sm">1. 额度与资产耗尽 <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">QUOTA_EXHAUSTED</span></h5>
                            <p className="text-xs text-zinc-500">特征：用户的账号、订阅或具体令牌没钱/没额度了。</p>
                            <ul className="text-xs font-mono text-zinc-600 space-y-1 list-disc pl-4">
                              <li><span className="font-bold text-red-500">500</span> token_quota_exhausted (额度耗尽)</li>
                              <li><span className="font-bold text-orange-500">403</span> insufficient_user_quota (余额不足 / 订阅不足)</li>
                              <li><span className="font-bold text-orange-500">403</span> pre_consume_token_quota_failed (预扣失败)</li>
                            </ul>
                          </div>

                          <div className="space-y-1.5">
                            <h5 className="font-semibold text-zinc-800 text-sm">2. 凭证失效与封禁 <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">AUTH_INVALID</span></h5>
                            <p className="text-xs text-zinc-500">特征：Key 本身的状态发生变化，不能再使用了。</p>
                            <ul className="text-xs font-mono text-zinc-600 space-y-1 list-disc pl-4">
                              <li><span className="font-bold text-red-500">500</span> token_expired (令牌过期)</li>
                              <li><span className="font-bold text-red-500">500</span> token_disabled (令牌被禁用)</li>
                              <li><span className="font-bold text-orange-500">403</span> [空] (用户被封禁)</li>
                            </ul>
                          </div>

                          <div className="space-y-1.5">
                            <h5 className="font-semibold text-zinc-800 text-sm">3. 越权与策略拦截 <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">PERMISSION_DENIED</span></h5>
                            <p className="text-xs text-zinc-500">特征：Key 正常且有钱，但是在试图白嫖没有权限的模型/分组，或不在 IP 白名单内。</p>
                            <ul className="text-xs font-mono text-zinc-600 space-y-1 list-disc pl-4">
                              <li><span className="font-bold text-orange-500">403</span> ip_not_allowed (API Key IP 限制)</li>
                              <li><span className="font-bold text-orange-500">403</span> model_not_allowed (API Key 模型限制)</li>
                              <li><span className="font-bold text-orange-500">403</span> access_denied (网关系统级 IP 限制)</li>
                              <li><span className="font-bold text-orange-500">403</span> [空] (token 分组无权限 / playground 无权限)</li>
                              <li><span className="font-bold text-orange-500">403</span> [空] (token 模型权限为空 / 禁用某模型)</li>
                              <li><span className="font-bold text-orange-500">403</span> [空] (分组废弃 / 指定渠道被禁用 / 普通用户指定渠道)</li>
                            </ul>
                          </div>

                        </div>
                      </div>

                      {/* Section 2: 按模型 ID 归因 */}
                      <div>
                        <h4 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                          按模型 ID 归因
                        </h4>
                        <div className="space-y-4 pl-4 border-l-2 border-zinc-100 ml-1">
                          
                          <div className="space-y-1.5">
                            <h5 className="font-semibold text-zinc-800 text-sm">4. 安全合规与风控 <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">CONTENT_VIOLATION</span></h5>
                            <p className="text-xs text-zinc-500">特征：触发了黄暴恐或敏感词。</p>
                            <ul className="text-xs font-mono text-zinc-600 space-y-1 list-disc pl-4">
                              <li><span className="font-bold text-red-500">500</span> sensitive_words_detected (敏感词命中)</li>
                            </ul>
                          </div>

                          <div className="space-y-1.5">
                            <h5 className="font-semibold text-zinc-800 text-sm">5. 触碰限流与超负荷 <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">RATE_LIMIT_OVERLOAD</span></h5>
                            <p className="text-xs text-zinc-500">特征：当前并发太高，被系统策略或者上游挡住了。</p>
                            <ul className="text-xs font-mono text-zinc-600 space-y-1 list-disc pl-4">
                              <li><span className="font-bold text-orange-500">429</span> [无 body] (内存限流拦截)</li>
                              <li><span className="font-bold text-orange-500">429</span>/500 [空] / rate_limit_check_failed (模型请求数限流 / 限流检查失败)</li>
                              <li><span className="font-bold text-red-500">503</span> system_cpu_overloaded等 (全局性系统负载保护)</li>
                            </ul>
                          </div>

                          <div className="space-y-1.5">
                            <h5 className="font-semibold text-zinc-800 text-sm">6. 无效请求/客户端参数错误 <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">BAD_REQUEST</span></h5>
                            <p className="text-xs text-zinc-500">特征：用户发来的 JSON 格式不对、体积太大，或者少传了必填项。</p>
                            <ul className="text-xs font-mono text-zinc-600 space-y-1 list-disc pl-4">
                              <li><span className="font-bold text-amber-500">400</span> [空] (请求体解析失败 / 未指定模型 / 指定渠道无效)</li>
                              <li><span className="font-bold text-red-500">500</span> / <span className="font-bold text-amber-500">413</span> invalid_request / read_request_body_failed (JSON格式不对/Body过大)</li>
                              <li><span className="font-bold text-amber-500">400</span> invalid_request (参数覆盖拦截)</li>
                            </ul>
                          </div>

                          <div className="space-y-1.5">
                            <h5 className="font-semibold text-zinc-800 text-sm">7. 上游服务与网络异常 <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">UPSTREAM_ERROR</span></h5>
                            <p className="text-xs text-zinc-500">特征：我们系统没问题，但调上游接口时挂了或返回乱码。</p>
                            <ul className="text-xs font-mono text-zinc-600 space-y-1 list-disc pl-4">
                              <li><span className="font-bold text-red-500">500</span> do_request_failed (网络不通/请求上游超时)</li>
                              <li><span className="font-bold text-red-500">500</span> read_response_body_failed (读取上游响应流失败)</li>
                              <li><span className="font-bold text-red-500">500</span> bad_response_body / bad_response 等 (上游返回非预期结构)</li>
                              <li><span className="font-bold text-zinc-500">(透传)</span> bad_response_status_code (上游非 200 报错)</li>
                            </ul>
                          </div>

                        </div>
                      </div>

                      {/* Section 3: 不归因 */}
                      <div>
                        <h4 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-400"></div>
                          不归因
                        </h4>
                        <div className="space-y-4 pl-4 border-l-2 border-zinc-100 ml-1">
                          
                          <div className="space-y-1.5">
                            <h5 className="font-semibold text-zinc-800 text-sm">8. 系统内部调度与配置错误 <span className="text-xs font-mono bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded">INTERNAL_ROUTING_ERROR</span></h5>
                            <p className="text-xs text-zinc-500">特征：管理员配置失误或并发导致选不到渠道的纯内部底座错误。</p>
                            <ul className="text-xs font-mono text-zinc-600 space-y-1 list-disc pl-4">
                              <li><span className="font-bold text-red-500">503</span> model_not_found (无可用渠道 / 选渠失败)</li>
                              <li><span className="font-bold text-red-500">500</span> get_channel_failed (channel 为空 / retry 失败)</li>
                              <li><span className="font-bold text-red-500">500</span> channel:no_available_key (多key渠道没拿到可用key)</li>
                              <li><span className="font-bold text-red-500">500</span> channel:model_mapped_error (映射配置错误)</li>
                              <li><span className="font-bold text-red-500">500</span> model_price_error (没配置该模型倍率)</li>
                              <li><span className="font-bold text-red-500">500</span>/<span className="font-bold text-red-500">501</span> invalid_api_type / api_not_implemented (不支持 / 未实现)</li>
                              <li><span className="font-bold text-red-500">500</span> convert_request_failed / json_marshal_failed 等 (转换计数失败)</li>
                              <li><span className="font-bold text-red-500">500</span> query_data_error / update_data_error (计费 DB 故障)</li>
                            </ul>
                          </div>

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
              {isEmptyState ? (
                <EmptyStatePlaceholder title={t("No errors")} message={t("All systems are operating normally.")} icon={Check} />
              ) : (
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
                      </div>
                    )}
                  </div>
                )})}
              </div>
            )}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
