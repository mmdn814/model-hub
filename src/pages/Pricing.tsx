import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Search, Info, PlayCircle, Image as ImageIcon, Music, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
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

import { pricingData } from "@/data/pricing";


export default function Pricing() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeProvider, setActiveProvider] = useState<string>("");
  const [activeTask, setActiveTask] = useState<string>("");

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
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-5 h-5 text-zinc-400 cursor-help ml-1 mt-1 hover:text-zinc-600 transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm text-sm p-3 bg-white text-zinc-800 border-zinc-200 shadow-lg">
                <p>{t("定价来自后端的定价，非chat模型的下显示的名称，来自后端【适用场景组合】字段，单位来自【计价单位字段】")}</p>
              </TooltipContent>
            </Tooltip>
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
              className="h-10 px-3 py-2 text-sm bg-zinc-50 border border-transparent rounded-md focus:bg-white focus:border-zinc-300 transition-colors w-full sm:w-[160px] cursor-pointer"
              value={activeProvider}
              onChange={(e) => setActiveProvider(e.target.value)}
            >
              <option value="">{t("All Providers")}</option>
              {uniqueProviders.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <select 
              className="h-10 px-3 py-2 text-sm bg-zinc-50 border border-transparent rounded-md focus:bg-white focus:border-zinc-300 transition-colors w-full sm:w-[160px] cursor-pointer"
              value={activeTask}
              onChange={(e) => setActiveTask(e.target.value)}
            >
              <option value="">{t("All Tasks")}</option>
              {uniqueTasks.map(tOption => (
                <option key={tOption} value={tOption}>{tOption}</option>
              ))}
            </select>
          </div>
        </div>
      </DevAnnotation>

      {/* Category Tabs */}
      <DevAnnotation
        elementName="Category Tabs"
        componentType="Navigation"
        functionDesc="Filters models by primary visual category (Video, Image, Audio, Chat)"
        interactionRule="Clicking a tab filters the list below. Clicking the active tab clears the filter."
        defaultValue="None (All models shown)"
        dataSource="Static text (i18n)"
        autoLogic="Categories with 0 models should be disabled or hidden (currently all shown for UI demo)"
        validationRule="None"
        errorHandler="None"
        devNotes="Supports multi-language"
      >
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(isActive ? null : category.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  isActive 
                    ? "bg-zinc-900 text-white shadow-sm" 
                    : "bg-white text-zinc-600 hover:bg-zinc-50 border border-zinc-200"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-zinc-500")} />
                {t(category.name)}
              </button>
            );
          })}
        </div>
      </DevAnnotation>

      {/* Models List as Cards */}
      <DevAnnotation
        elementName="Model Pricing Cards"
        componentType="List"
        functionDesc="Display model pricing data in separate cards with flattened versions"
        interactionRule="None"
        defaultValue="List of models"
        dataSource="API Data / Pricing Config"
        autoLogic="None"
        validationRule="None"
        errorHandler="None"
        devNotes="Refactored to match provided screenshot layout"
      >
        <div className="space-y-6">
          {filteredModels.length > 0 ? (
            filteredModels.map((model) => {
              const fullModel = models.find(m => m.id === model.id || m.id.startsWith(model.id));
              const providerLogo = fullModel?.providerLogo || model.provider[0];
              
              return (
                <div key={model.id} className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 p-5 bg-zinc-50/80 border-b border-zinc-100">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      {providerLogo}
                    </div>
                    <div>
                      <Link to={`/models/${model.id}`} className="hover:underline text-xl font-bold text-zinc-900 leading-tight block w-fit">
                        {fullModel?.name || model.id}
                      </Link>
                      <p className="text-sm text-zinc-500 mt-0.5 font-medium">{fullModel?.description || "High-performance AI model"}</p>
                    </div>
                  </div>

                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="border-b border-zinc-100 bg-zinc-50/50">
                          <th className="py-3 px-6 text-sm font-semibold text-zinc-500 w-[25%]">
                            {t("Model & Modality")}
                          </th>
                          <th className="py-3 px-6 text-sm font-semibold text-zinc-500 w-[25%]">
                            <div className="flex items-center gap-1">
                              {t("Credits / Gen")}
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="w-3.5 h-3.5 text-zinc-400 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{t("1 USD = 1000 Credits")}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </th>
                          {model.versions.some(v => v.cachePrice !== undefined) && (
                            <th className="py-3 px-6 text-sm font-semibold text-zinc-500 w-[25%] text-right">
                              {t("Cache Hit (Credits / USD)")}
                            </th>
                          )}
                          <th className="py-3 px-6 text-sm font-semibold text-zinc-500 w-[25%] text-right">
                            {t("Our Price (USD)")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {model.versions.map((version, idx) => (
                          <tr key={idx} className="border-b border-zinc-100 last:border-none hover:bg-zinc-50/50 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex flex-col gap-1.5">
                                <span className="font-medium text-[15px] text-zinc-800">
                                  {version.id}
                                </span>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className={cn(
                                    "text-[10px] uppercase tracking-wider border-transparent px-2 py-0.5 font-semibold",
                                    model.category === "video" && "bg-blue-100 text-[#0055FF] hover:bg-blue-100",
                                    model.category === "chat" && "bg-blue-100 text-[#0055FF] hover:bg-blue-100",
                                    model.category === "image" && "bg-blue-100 text-[#0055FF] hover:bg-blue-100"
                                  )}>
                                    {t(model.category.toLowerCase())}
                                  </Badge>
                                  <span className="text-sm text-zinc-500 font-medium">
                                    {model.provider}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 align-top">
                              <div className="flex flex-col">
                                <span className="font-bold text-[17px] text-zinc-900">
                                  {version.credits}
                                </span>
                                <span className="text-[13px] text-zinc-400 font-medium mt-0.5">
                                  {t(version.unit)}
                                </span>
                              </div>
                            </td>
                            {model.versions.some(v => v.cachePrice !== undefined) && (
                              <td className="py-4 px-6 align-top text-right">
                                {version.cachePrice !== undefined ? (
                                  <div className="flex flex-col items-end">
                                    <span className="font-bold text-[17px] text-emerald-600">
                                      ${version.cachePrice.toFixed(3)}
                                    </span>
                                    <span className="text-[13px] text-zinc-400 font-medium mt-0.5">
                                      {version.cacheCredits} {t("credits")}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-zinc-300">-</span>
                                )}
                              </td>
                            )}
                            <td className="py-4 px-6 align-top text-right">
                              <span className="font-bold text-[17px] text-[#0055FF]">
                                ${version.price.toFixed(3)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center text-zinc-500">
              {t("No models found matching your search.")}
            </div>
          )}
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
