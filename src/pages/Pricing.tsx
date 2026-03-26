import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Search, ChevronDown, ChevronUp, Info, Filter, PlayCircle, Image as ImageIcon, Music, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { models } from "@/data/models";
import { cn } from "@/lib/utils";
import { DevAnnotation } from "@/components/DevAnnotation";

const categories = [
  {
    id: "video",
    name: "Video Generation",
    icon: PlayCircle,
    tags: ["Text to Video", "Image to Video", "Video to Video", "Video Editing"]
  },
  {
    id: "image",
    name: "Image Generation",
    icon: ImageIcon,
    tags: ["Text to Image", "Image to Image", "Image Editing"]
  },
  {
    id: "audio",
    name: "Music/Audio",
    icon: Music,
    tags: ["Text to Music", "Text to Speech", "Lip Sync"]
  },
  {
    id: "chat",
    name: "Chat",
    icon: MessageSquare,
    tags: ["Chat"]
  }
];

const pricingData = [
  {
    id: "wan2.5-video",
    category: "video",
    provider: "Alibaba",
    unit: "second",
    price: 0.050,
    credits: 50,
  },
  {
    id: "kling-2.5-turbo-pro",
    category: "video",
    provider: "Kuaishou",
    unit: "second",
    price: 0.100,
    credits: 100,
  },
  {
    id: "qwen2.5-72b-instruct",
    category: "chat",
    provider: "Alibaba",
    unit: "1M tokens",
    inputPrice: 0.200,
    outputPrice: 0.600,
    inputCredits: 200,
    outputCredits: 600,
    versions: [
      {
        id: "qwen2.5-72b-instruct-0301 (Fixed)",
        unit: "per million tokens",
        inputPrice: 0.200,
        outputPrice: 0.600,
        inputCredits: 200,
        outputCredits: 600,
      }
    ]
  },
  {
    id: "seedream-5-0",
    category: "image",
    provider: "ByteDance",
    unit: "image",
    price: 0.030,
    credits: 30,
    versions: [
      {
        id: "seedream-5-0-0301 (Fixed)",
        unit: "image",
        price: 0.030,
        credits: 30,
      },
      {
        id: "seedream-5-0-0201 (Fixed)",
        unit: "image",
        price: 0.030,
        credits: 30,
      }
    ]
  }
];

export default function Pricing() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeProvider, setActiveProvider] = useState<string>("");
  const [activeTask, setActiveTask] = useState<string>("");
  const [expandedModels, setExpandedModels] = useState<Set<string>>(new Set(["qwen2.5-72b-instruct"]));

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedModels);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedModels(newExpanded);
  };

  const groupedModels = pricingData;

  const uniqueProviders = Array.from(new Set(groupedModels.map(m => m.provider))).sort();
  const uniqueTasks = Array.from(new Set(groupedModels.flatMap(m => {
    const fullModel = models.find(fm => fm.id === m.id || fm.id.startsWith(m.id));
    return fullModel?.tags || [];
  }))).sort();

  // Filter models
  const filteredModels = useMemo(() => {
    return groupedModels.filter(model => {
      const searchLower = searchQuery.toLowerCase();
      const fullModel = models.find(m => m.id === model.id || m.id.startsWith(model.id));
      
      const matchesSearch = 
        model.id.toLowerCase().includes(searchLower) ||
        model.provider.toLowerCase().includes(searchLower) ||
        (fullModel?.name?.toLowerCase().includes(searchLower) ?? false) ||
        (fullModel?.description?.toLowerCase().includes(searchLower) ?? false) ||
        (model.versions?.some(v => v.id.toLowerCase().includes(searchLower)) ?? false);
      
      const matchesCategory = activeCategory ? model.category === activeCategory : true;
      const matchesProvider = activeProvider ? model.provider === activeProvider : true;
      const matchesTask = activeTask ? (fullModel?.tags?.includes(activeTask) ?? false) : true;
      
      return matchesSearch && matchesCategory && matchesProvider && matchesTask;
    });
  }, [groupedModels, searchQuery, activeCategory, activeProvider, activeTask]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div>
        <DevAnnotation
          elementName="Pricing Page Title"
          componentType="Page Module"
          functionDesc="Displays the main title of the Pricing page"
          interactionRule="None"
          defaultValue="Pricing"
          dataSource="Static text (i18n)"
          autoLogic="None"
          validationRule="None"
          errorHandler="None"
          devNotes="Supports multi-language switching"
        >
          <h1 className="text-4xl font-extrabold text-[#0B1120] mb-3 tracking-tight flex items-center gap-2 w-fit">
            {t("Pricing")}
          </h1>
        </DevAnnotation>
        <p className="text-lg text-zinc-500 font-medium">
          {t("World-class AI models, incredibly affordable prices.")}
        </p>
      </div>

      {/* Search & Filters */}
      <DevAnnotation
        elementName="顶部搜索与过滤"
        componentType="Header"
        functionDesc="支持关键字搜索，以及提供商、任务类型维度的切换"
        customContent={
          <div className="space-y-3 text-sm">
            <div className="font-bold text-base border-b border-[#fbc02d] pb-1 mb-2">搜索与过滤逻辑说明</div>
            <ul className="space-y-2">
              <li><span className="font-semibold">关键字搜索 (Search):</span> 实时匹配模型的<span className="text-blue-600">ID (ID)</span>、<span className="text-blue-600">名称 (Name)</span>或<span className="text-blue-600">提供商 (Provider)</span>。</li>
              <li><span className="font-semibold">提供商过滤 (Provider Filter):</span> 下拉列表数据来源于后端当前已上架模型包含的所有提供商集合。</li>
              <li><span className="font-semibold">任务类型过滤 (Task Filter):</span> 下拉列表数据来源于后端 Taxonomy 维护的二级任务标签 (Task Tags)。</li>
              <li><span className="font-semibold">组合过滤逻辑:</span> 搜索框、提供商下拉框、任务类型下拉框以及下方的分类导航之间为 <span className="font-bold text-emerald-600">AND (交集)</span> 关系，共同决定最终展示的模型列表。</li>
            </ul>
          </div>
        }
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <Input 
                placeholder={t("Search models or providers...")} 
                className="pl-9 bg-zinc-50 border-transparent focus:bg-white focus:border-zinc-300 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select 
              className="bg-zinc-50 border border-zinc-200 text-zinc-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
              value={activeProvider}
              onChange={(e) => setActiveProvider(e.target.value)}
            >
              <option value="">{t("All Providers")}</option>
              {uniqueProviders.map(provider => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>
            <select 
              className="bg-zinc-50 border border-zinc-200 text-zinc-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
              value={activeTask}
              onChange={(e) => setActiveTask(e.target.value)}
            >
              <option value="">{t("All Tasks")}</option>
              {uniqueTasks.map(task => (
                <option key={task} value={task}>{t(task)}</option>
              ))}
            </select>
          </div>
        </div>
      </DevAnnotation>

      {/* Category Navigation */}
      <DevAnnotation
        elementName="分类导航 (Taxonomy)"
        componentType="Tabs"
        functionDesc="按一级分类 (Modality) 和二级任务标签 (Task Tags) 筛选模型"
        autoLogic="点击分类可过滤下方模型列表。标签数据由后端维护。"
        devNotes="后端维护逻辑：一级分类如 Video, Image, Audio, Chat；二级标签如 Text to Video, Lip Sync 等。"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                activeCategory === null 
                  ? "bg-zinc-900 text-white shadow-sm" 
                  : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900"
              )}
            >
              <Filter className="w-4 h-4" />
              {t("All Models")}
            </button>
            
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                  activeCategory === category.id 
                    ? "bg-zinc-900 text-white shadow-sm" 
                    : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                <category.icon className="w-4 h-4" />
                {t(category.name)}
              </button>
            ))}
          </div>

          {/* Secondary Task Tags */}
          {activeCategory && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.find(c => c.id === activeCategory)?.tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTask(activeTask === tag ? "" : tag)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
                    activeTask === tag
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                  )}
                >
                  {t(tag)}
                </button>
              ))}
            </div>
          )}
        </div>
      </DevAnnotation>

      <DevAnnotation
        elementName="Model Pricing Data Table"
        componentType="Data Table"
        functionDesc="Displays model list, modality, provider, billing unit, and price"
        interactionRule="Supports expanding rows to view sub-billing items (if any)"
        defaultValue="Displays all filtered models"
        dataSource="Local models data source"
        autoLogic="Dynamically renders based on search term and category filter"
        validationRule="None"
        errorHandler="Displays empty state prompt when data is empty"
        devNotes="Sub-billing items use nested table rendering, pay attention to responsive layout"
        customContent={
          <div className="space-y-3 text-sm">
            <div className="font-bold text-base border-b border-[#fbc02d] pb-1 mb-2">全局定价页展示逻辑</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-500">
                    <th className="py-2 pr-4 font-medium whitespace-nowrap">前端 UI 字段</th>
                    <th className="py-2 pr-4 font-medium whitespace-nowrap">后端 JSON 字段来源</th>
                    <th className="py-2 font-medium">计算公式与展示逻辑</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  <tr>
                    <td className="py-2 pr-4 font-semibold whitespace-nowrap">Model ID</td>
                    <td className="py-2 pr-4 font-mono text-xs text-blue-600 whitespace-nowrap">id</td>
                    <td className="py-2 text-zinc-600">等宽字体高亮展示（如 qwen2.5-72b-instruct）。</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold whitespace-nowrap">Modality 标签</td>
                    <td className="py-2 pr-4 font-mono text-xs text-blue-600 whitespace-nowrap">modality</td>
                    <td className="py-2 text-zinc-600">渲染带颜色背景的分类胶囊。</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold whitespace-nowrap">Provider 文本</td>
                    <td className="py-2 pr-4 font-mono text-xs text-blue-600 whitespace-nowrap">provider</td>
                    <td className="py-2 text-zinc-600">直接显示（如 Alibaba），同时作为隐式搜索条件。</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold whitespace-nowrap">Unit (计费单位)</td>
                    <td className="py-2 pr-4 font-mono text-xs text-blue-600 whitespace-nowrap">pricing.unit_name</td>
                    <td className="py-2 text-zinc-600">前端做文本清洗，如将 1M_tokens 渲染为 1M tokens。</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold whitespace-nowrap">折叠多版本按钮</td>
                    <td className="py-2 pr-4 font-mono text-xs text-blue-600 whitespace-nowrap">sub_models (数组)</td>
                    <td className="py-2 text-zinc-600">if (sub_models.length &gt; 0) 渲染按钮：&#123;length&#125; versions</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold whitespace-nowrap">单价/现价（美金）</td>
                    <td className="py-2 pr-4 font-mono text-xs text-blue-600 whitespace-nowrap">pricing.***_fee_config.active_price</td>
                    <td className="py-2 text-zinc-600">公式： 基础价格+平台加价 (直接渲染计算后的美金绝对值)（显示平台加价后的价格，严禁暴露原始价格）</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold whitespace-nowrap">单价/现价（credit）</td>
                    <td className="py-2 pr-4 font-mono text-xs text-blue-600 whitespace-nowrap">pricing.***_fee_config.active_price</td>
                    <td className="py-2 text-zinc-600">同上取基础价格+平台加价*平台汇率</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold whitespace-nowrap">Chat 模型 Input 价</td>
                    <td className="py-2 pr-4 font-mono text-xs text-blue-600 whitespace-nowrap">pricing.input_fee_config.active_price</td>
                    <td className="py-2 text-zinc-600">逻辑同上，渲染时前置添加灰色 INPUT 徽章。（显示平台加价后的价格，严禁暴露原始价格）</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold whitespace-nowrap">Chat 模型 Output 价</td>
                    <td className="py-2 pr-4 font-mono text-xs text-blue-600 whitespace-nowrap">pricing.output_fee_config.active_price</td>
                    <td className="py-2 text-zinc-600">逻辑同上，渲染时前置添加灰色 OUTPUT 徽章。（显示平台加价后的价格，严禁暴露原始价格）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        }
      >
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-400 text-xs font-bold tracking-wider uppercase">
                  <th className="py-5 px-6 w-[40%]">
                    <div className="flex items-center gap-1">
                      <DevAnnotation
                        elementName="Header: Model & Modality"
                        componentType="Table Header"
                        functionDesc="Identifies model name and modality column"
                        interactionRule="None"
                        defaultValue="Model & Modality"
                        dataSource="Static text (i18n)"
                        autoLogic="None"
                        validationRule="None"
                        errorHandler="None"
                        devNotes="Supports multi-language"
                      >
                        {t("Model & Modality")}
                      </DevAnnotation>
                    </div>
                  </th>
                  <th className="py-5 px-6 w-[20%]">
                    <div className="flex items-center gap-1">
                      <DevAnnotation
                        elementName="Header: Unit"
                        componentType="Table Header"
                        functionDesc="Identifies billing unit column"
                        interactionRule="None"
                        defaultValue="Unit"
                        dataSource="Static text (i18n)"
                        autoLogic="None"
                        validationRule="None"
                        errorHandler="None"
                        devNotes="Supports multi-language"
                      >
                        {t("Unit")} 
                      </DevAnnotation>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3.5 h-3.5 text-zinc-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t("Billing unit for the model (e.g., per 1M tokens, per image, per second).")}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </th>
                  <th className="py-5 px-6 w-[20%] text-right">
                    <div className="flex items-center justify-end gap-1">
                      <DevAnnotation
                        elementName="Header: Credits"
                        componentType="Table Header"
                        functionDesc="Identifies Credits column"
                        interactionRule="None"
                        defaultValue="Credits"
                        dataSource="Static text (i18n)"
                        autoLogic="None"
                        validationRule="None"
                        errorHandler="None"
                        devNotes="Supports multi-language"
                      >
                        {t("Credits")}
                      </DevAnnotation>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3.5 h-3.5 text-zinc-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t("1 USD = 1000 Credits")}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </th>
                  <th className="py-5 px-6 w-[20%] text-right">
                    <div className="flex items-center justify-end gap-1">
                      <DevAnnotation
                        elementName="Header: Price"
                        componentType="Table Header"
                        functionDesc="Identifies price column"
                        interactionRule="None"
                        defaultValue="Price (USD)"
                        dataSource="Static text (i18n)"
                        autoLogic="None"
                        validationRule="None"
                        errorHandler="None"
                        devNotes="Supports multi-language"
                      >
                        {t("Price (USD)")}
                      </DevAnnotation>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredModels.length > 0 ? (
                  filteredModels.map((model) => {
                    const hasVersions = model.versions && model.versions.length > 0;
                    const isExpanded = expandedModels.has(model.id);

                    return (
                      <React.Fragment key={model.id}>
                        <tr className="hover:bg-zinc-50/50 transition-colors group">
                          <td className="py-5 px-6">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <div className="font-bold text-lg text-zinc-900 font-mono">{model.id}</div>
                              </div>
                              {hasVersions && (
                                <div className="flex items-center gap-1">
                                  <button 
                                    onClick={() => toggleExpand(model.id)}
                                    className="flex items-center gap-1 text-sm font-semibold text-[#0055FF] bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md transition-colors"
                                  >
                                    {model.versions.length} {t("versions")} {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1.5">
                              <div className="flex items-center gap-1">
                                <Badge variant="secondary" className={cn(
                                  "text-[10px] uppercase font-bold tracking-wider border-transparent px-1.5 py-0",
                                  model.category === "video" && "bg-purple-100 text-purple-700 hover:bg-purple-100",
                                  model.category === "chat" && "bg-blue-100 text-blue-700 hover:bg-blue-100",
                                  model.category === "image" && "bg-green-100 text-green-700 hover:bg-green-100"
                                )}>
                                  {t(model.category.toUpperCase())}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-zinc-400 font-medium">{model.provider}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex items-center gap-1">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium bg-[#F1F5F9] text-[#475569]">
                                {t(model.unit)}
                              </span>
                            </div>
                          </td>
                          <td className="py-5 px-6 text-right">
                            <div className="flex flex-col items-end gap-1">
                              {model.inputCredits !== undefined && model.outputCredits !== undefined ? (
                                <>
                                  <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#F1F5F9] text-[#475569]">
                                      INPUT
                                    </span>
                                    <span className="font-bold text-lg text-zinc-800">
                                      {model.inputCredits}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#F1F5F9] text-[#475569]">
                                      OUTPUT
                                    </span>
                                    <span className="font-bold text-lg text-zinc-800">
                                      {model.outputCredits}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-lg text-zinc-800">
                                    {model.credits}
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-5 px-6 text-right">
                            <div className="flex flex-col items-end gap-1">
                              {model.inputPrice !== undefined && model.outputPrice !== undefined ? (
                                <>
                                  <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#F1F5F9] text-[#475569]">
                                      INPUT
                                    </span>
                                    <span className="font-bold text-lg text-[#0055FF]">
                                      ${model.inputPrice.toFixed(3)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#F1F5F9] text-[#475569]">
                                      OUTPUT
                                    </span>
                                    <span className="font-bold text-lg text-[#0055FF]">
                                      ${model.outputPrice.toFixed(3)}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-lg text-[#0055FF]">
                                    ${model.price?.toFixed(3)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      
                      {/* Expanded Versions */}
                      {isExpanded && hasVersions && (
                        <tr>
                          <td colSpan={4} className="p-0 bg-zinc-50/50 border-t border-zinc-100">
                            <div className="w-full">
                              <table className="w-full text-left">
                                <tbody>
                                  {model.versions.map((version: any, idx: number) => (
                                    <tr key={idx} className="hover:bg-zinc-100/50 transition-colors border-b border-zinc-100 last:border-0">
                                      <td className="py-4 px-6 w-[40%] pl-12">
                                        <div className="flex items-center gap-2">
                                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300"></div>
                                          <div className="flex items-center gap-1">
                                            <span className="font-medium text-sm text-zinc-700 font-mono">{version.id}</span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="py-4 px-6 w-[20%]">
                                        <div className="flex items-center gap-1">
                                          <span className="text-sm font-medium text-zinc-500">
                                            {t(version.unit)}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="py-4 px-6 w-[20%] text-right">
                                        <div className="flex flex-col items-end gap-1">
                                          {version.inputCredits !== undefined && version.outputCredits !== undefined ? (
                                            <>
                                              <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#F1F5F9] text-[#475569]">
                                                  INPUT
                                                </span>
                                                <span className="font-bold text-base text-zinc-800">
                                                  {version.inputCredits}
                                                </span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#F1F5F9] text-[#475569]">
                                                  OUTPUT
                                                </span>
                                                <span className="font-bold text-base text-zinc-800">
                                                  {version.outputCredits}
                                                </span>
                                              </div>
                                            </>
                                          ) : (
                                            <div className="flex items-center gap-2">
                                              <span className="font-bold text-base text-zinc-800">
                                                {version.credits}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </td>
                                      <td className="py-4 px-6 w-[20%] text-right">
                                        <div className="flex flex-col items-end gap-1">
                                          {version.inputPrice !== undefined && version.outputPrice !== undefined ? (
                                            <>
                                              <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#F1F5F9] text-[#475569]">
                                                  INPUT
                                                </span>
                                                <span className="font-bold text-base text-[#0055FF]">
                                                  ${version.inputPrice.toFixed(3)}
                                                </span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#F1F5F9] text-[#475569]">
                                                  OUTPUT
                                                </span>
                                                <span className="font-bold text-base text-[#0055FF]">
                                                  ${version.outputPrice.toFixed(3)}
                                                </span>
                                              </div>
                                            </>
                                          ) : (
                                            <div className="flex items-center gap-2">
                                              <span className="font-bold text-base text-[#0055FF]">
                                                ${version.price?.toFixed(3)}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-zinc-500">
                    {t("No models found matching your search.")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </DevAnnotation>

      <DevAnnotation
        elementName="Pricing Note"
        componentType="Text"
        functionDesc="Displays estimation note for multimodal model billing"
        interactionRule="None"
        defaultValue="Based on an estimated average..."
        dataSource="Static text (i18n)"
        autoLogic="None"
        validationRule="None"
        errorHandler="None"
        devNotes="Supports multi-language"
      >
        <div className="text-xs text-zinc-400 px-4">
          * {t("Based on an estimated average video = 5 seconds at 720p or image at 1024x1024. Actual output cost may vary based on specific model parameters, resolution multipliers, and prompt complexity.")}
        </div>
      </DevAnnotation>
    </div>
  );
}
