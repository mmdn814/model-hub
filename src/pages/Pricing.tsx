import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Search, ChevronDown, ChevronUp, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { models } from "@/data/models";
import { cn } from "@/lib/utils";
import { DevAnnotation } from "@/components/DevAnnotation";

const pricingData = [
  {
    id: "wan2.5-video",
    category: "video",
    provider: "Alibaba",
    unit: "second",
    price: 0.050,
  },
  {
    id: "kling-2.5-turbo-pro",
    category: "video",
    provider: "Kuaishou",
    unit: "second",
    price: 0.070,
    originalPrice: 0.100,
  },
  {
    id: "qwen2.5-72b-instruct",
    category: "chat",
    provider: "Alibaba",
    unit: "1M tokens",
    inputPrice: 0.200,
    outputPrice: 0.600,
    versions: [
      {
        id: "qwen2.5-72b-instruct-0301 (Snapshot)",
        unit: "per million tokens",
        inputPrice: 0.150,
        originalInputPrice: 0.200,
        outputPrice: 0.400,
        originalOutputPrice: 0.600,
      }
    ]
  },
  {
    id: "seedream-5-0",
    category: "image",
    provider: "ByteDance",
    unit: "image",
    price: 0.030,
    versions: [
      {
        id: "seedream-5-0-0301 (Snapshot)",
        unit: "image",
        price: 0.030
      },
      {
        id: "seedream-5-0-0201 (Snapshot)",
        unit: "image",
        price: 0.030
      }
    ]
  }
];

export default function Pricing() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
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

  const counts = useMemo(() => {
    const all = groupedModels.length;
    const chat = groupedModels.filter(m => m.category === "chat").length;
    const video = groupedModels.filter(m => m.category === "video").length;
    const image = groupedModels.filter(m => m.category === "image").length;
    const audio = groupedModels.filter(m => m.category === "audio").length;
    return { all, chat, video, image, audio };
  }, [groupedModels]);

  const filters = [
    { id: "All", label: "All", count: counts.all },
    { id: "chat", label: "Chat", count: counts.chat },
    { id: "video", label: "Video", count: counts.video },
    { id: "image", label: "Image", count: counts.image },
    { id: "audio", label: "Audio", count: counts.audio },
  ];

  // Filter models
  const filteredModels = useMemo(() => {
    return groupedModels.filter(model => {
      const matchesSearch = model.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            model.provider.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeFilter === "All") return matchesSearch;
      return matchesSearch && model.category === activeFilter.toLowerCase();
    });
  }, [groupedModels, searchQuery, activeFilter]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div>
        <DevAnnotation
          elementName="Pricing 页面标题"
          componentType="Page Module"
          functionDesc="展示 Pricing 页面主标题"
          interactionRule="无"
          defaultValue="Pricing"
          dataSource="静态文案 (i18n)"
          autoLogic="无"
          validationRule="无"
          errorHandler="无"
          devNotes="支持多语言切换"
        >
          <h1 className="text-4xl font-extrabold text-[#0B1120] mb-3 tracking-tight flex items-center gap-2 w-fit">
            {t("Pricing")}
          </h1>
        </DevAnnotation>
        <p className="text-lg text-zinc-500 font-medium">
          {t("World-class AI models, incredibly affordable prices.")}
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <DevAnnotation
          elementName="分类过滤器"
          componentType="Button Group"
          functionDesc="按模态筛选模型列表"
          interactionRule="点击切换激活状态，表格内容随之过滤"
          defaultValue="All"
          dataSource="静态配置 + 动态计算 count"
          autoLogic="切换时重置或重新应用搜索词"
          validationRule="无"
          errorHandler="无"
          devNotes="注意 count 的计算需基于全量数据而非过滤后数据"
        >
          <div className="flex flex-wrap items-center gap-2">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all",
                  activeFilter === f.id
                    ? "bg-[#0055FF] text-white shadow-md"
                    : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
                )}
              >
                {t(f.label)}
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  activeFilter === f.id ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500"
                )}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>
        </DevAnnotation>

        <DevAnnotation
          elementName="全局搜索框"
          componentType="Input"
          functionDesc="用于过滤模型列表"
          interactionRule="输入文本实时过滤表格内容"
          defaultValue="空字符串"
          dataSource="用户输入"
          autoLogic="忽略大小写，隐式匹配 model.id 和 model.provider"
          validationRule="无"
          errorHandler="无匹配时表格显示 'No models found'"
          devNotes="目前是本地实时过滤，若数据量大需考虑防抖"
        >
          <div className="relative w-full md:w-96 flex items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <Input 
                placeholder={t("Search by model, modality, or provider...")} 
                className="pl-9 bg-white border-zinc-200 rounded-xl h-11"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </DevAnnotation>
      </div>

      <DevAnnotation
        elementName="模型定价数据表格"
        componentType="Data Table"
        functionDesc="展示模型列表、模态、供应商、计费单位及价格"
        interactionRule="支持按行展开查看子计费项（如存在）"
        defaultValue="展示所有过滤后的模型"
        dataSource="本地 models 数据源"
        autoLogic="根据搜索词和分类过滤器动态渲染"
        validationRule="无"
        errorHandler="数据为空时展示空状态提示"
        devNotes="子计费项使用嵌套表格渲染，注意响应式布局"
      >
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-400 text-xs font-bold tracking-wider uppercase">
                  <th className="py-5 px-6 w-[40%]">
                    <div className="flex items-center gap-1">
                      <DevAnnotation
                        elementName="表头：模型与模态"
                        componentType="Table Header"
                        functionDesc="标识模型名称及模态列"
                        interactionRule="无"
                        defaultValue="Model & Modality"
                        dataSource="静态文案 (i18n)"
                        autoLogic="无"
                        validationRule="无"
                        errorHandler="无"
                        devNotes="支持多语言"
                      >
                        {t("Model & Modality")}
                      </DevAnnotation>
                    </div>
                  </th>
                  <th className="py-5 px-6 w-[30%]">
                    <div className="flex items-center gap-1">
                      <DevAnnotation
                        elementName="表头：计费单位"
                        componentType="Table Header"
                        functionDesc="标识计费单位列"
                        interactionRule="无"
                        defaultValue="Unit"
                        dataSource="静态文案 (i18n)"
                        autoLogic="无"
                        validationRule="无"
                        errorHandler="无"
                        devNotes="支持多语言"
                      >
                        {t("Unit")} 
                      </DevAnnotation>
                      <Info className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                  </th>
                  <th className="py-5 px-6 w-[30%] text-right">
                    <div className="flex items-center justify-end gap-1">
                      <DevAnnotation
                        elementName="表头：价格"
                        componentType="Table Header"
                        functionDesc="标识价格列"
                        interactionRule="无"
                        defaultValue="Price (USD)"
                        dataSource="静态文案 (i18n)"
                        autoLogic="无"
                        validationRule="无"
                        errorHandler="无"
                        devNotes="支持多语言"
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
                                  {model.originalPrice && (
                                    <span className="text-sm text-zinc-400 line-through">
                                      ${model.originalPrice.toFixed(3)}
                                    </span>
                                  )}
                                  <span className={cn("font-bold text-lg", model.originalPrice ? "text-zinc-900" : "text-[#0055FF]")}>
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
                          <td colSpan={3} className="p-0 bg-zinc-50/50 border-t border-zinc-100">
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
                                      <td className="py-4 px-6 w-[30%]">
                                        <div className="flex items-center gap-1">
                                          <span className="text-sm font-medium text-zinc-500">
                                            {t(version.unit)}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="py-4 px-6 w-[30%] text-right">
                                        <div className="flex flex-col items-end gap-1">
                                          {version.inputPrice !== undefined && version.outputPrice !== undefined ? (
                                            <>
                                              <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#F1F5F9] text-[#475569]">
                                                  INPUT
                                                </span>
                                                {version.originalInputPrice && (
                                                  <span className="text-sm text-zinc-400 line-through">
                                                    ${version.originalInputPrice.toFixed(3)}
                                                  </span>
                                                )}
                                                <span className={cn("font-bold text-base", version.originalInputPrice ? "text-zinc-900" : "text-[#0055FF]")}>
                                                  ${version.inputPrice.toFixed(3)}
                                                </span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#F1F5F9] text-[#475569]">
                                                  OUTPUT
                                                </span>
                                                {version.originalOutputPrice && (
                                                  <span className="text-sm text-zinc-400 line-through">
                                                    ${version.originalOutputPrice.toFixed(3)}
                                                  </span>
                                                )}
                                                <span className={cn("font-bold text-base", version.originalOutputPrice ? "text-zinc-900" : "text-[#0055FF]")}>
                                                  ${version.outputPrice.toFixed(3)}
                                                </span>
                                              </div>
                                            </>
                                          ) : (
                                            <div className="flex items-center gap-2">
                                              {version.originalPrice && (
                                                <span className="text-sm text-zinc-400 line-through">
                                                  ${version.originalPrice.toFixed(3)}
                                                </span>
                                              )}
                                              <span className={cn("font-bold text-base", version.originalPrice ? "text-zinc-900" : "text-[#0055FF]")}>
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
                  <td colSpan={3} className="py-12 text-center text-zinc-500">
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
        elementName="定价说明备注"
        componentType="Text"
        functionDesc="展示关于多模态模型计费的预估说明"
        interactionRule="无"
        defaultValue="Based on an estimated average..."
        dataSource="静态文案 (i18n)"
        autoLogic="无"
        validationRule="无"
        errorHandler="无"
        devNotes="支持多语言"
      >
        <div className="text-xs text-zinc-400 px-4">
          * {t("Based on an estimated average video = 5 seconds at 720p or image at 1024x1024. Actual output cost may vary based on specific model parameters, resolution multipliers, and prompt complexity.")}
        </div>
      </DevAnnotation>
    </div>
  );
}
