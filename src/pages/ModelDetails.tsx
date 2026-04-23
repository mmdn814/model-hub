import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, Copy, Terminal, Check, ShieldCheck, Play, History, Sparkles, ChevronDown, FileText, Code, Info, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { DevAnnotation } from "@/components/DevAnnotation";
import { models } from "@/data/models";
import { pricingData } from "@/data/pricing";

const ModelIdCopyButton = ({ id }: { id: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className="text-zinc-400 hover:text-zinc-600 transition-colors" title="Copy Model ID">
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
};

export default function ModelDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"playground" | "readme">("readme");
  const [copied, setCopied] = useState(false);

  const model = models.find(m => m.id === id);
  const snapshotRegex = new RegExp(`^${id}-(?:\\d{4}-\\d{2}-\\d{2}|\\d{6})$`);
  const snapshotModels = models.filter(m => snapshotRegex.test(m.id) && m.visibility === "Hidden");
  
  const isSnapshot = model?.visibility === "Hidden";
  const mainModelId = isSnapshot ? model.id.replace(/-(?:\d{4}-\d{2}-\d{2}|\d{6})$/, '') : null;
  const mainModel = mainModelId ? models.find(m => m.id === mainModelId) : null;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!model) {
    return (
      <div className="max-w-5xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">Model not found</h2>
        <Link to="/models">
          <Button variant="outline">Back to Models</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <Link to="/models" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("Back to Models")}
          </Link>
          {isSnapshot && mainModel && (
            <>
              <span className="text-zinc-300">|</span>
              <Link to={`/models/${mainModel.id}`} className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium">
                {t("Back to Main Version")}
              </Link>
            </>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex items-start gap-6 w-full">
            <DevAnnotation
              elementName="Model Logo"
              componentType="Image"
              functionDesc="Displays the model provider's logo"
              devNotes="Configured by backend Display Metadata."
            >
              <div className="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center shrink-0 shadow-sm overflow-hidden text-white">
                {model.previewUrl ? (
                  <img src={model.previewUrl} alt={model.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <Sparkles className="w-12 h-12" />
                )}
              </div>
            </DevAnnotation>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900">{model.id}</h1>
                <button onClick={handleCopy} className="text-zinc-400 hover:text-zinc-600 transition-colors">
                  {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              
              <div>
                <DevAnnotation
                  elementName="Commercial License Badge"
                  componentType="Badge"
                  functionDesc="Indicates if the model allows commercial use"
                  devNotes="Backend logic: Commercial Status (Yes/No)."
                >
                  <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-transparent px-3 py-1 font-medium text-sm rounded-full">
                    Commercial use
                  </Badge>
                </DevAnnotation>
              </div>

              <p className="text-zinc-600 text-base leading-relaxed max-w-3xl">
                {model.description}
              </p>

              <div className="flex flex-col gap-2 mt-1">
                {model.tags && model.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {model.tags.map((tag, index) => {
                      const colors = [
                        "bg-blue-50 border-blue-200 text-blue-700",
                        "bg-purple-50 border-purple-200 text-purple-700",
                        "bg-emerald-50 border-emerald-200 text-emerald-700",
                        "bg-amber-50 border-amber-200 text-amber-700",
                        "bg-rose-50 border-rose-200 text-rose-700",
                        "bg-indigo-50 border-indigo-200 text-indigo-700"
                      ];
                      const colorClass = colors[index % colors.length];
                      return (
                        <Badge key={index} variant="outline" className={`font-normal rounded-md px-2.5 py-0.5 text-xs ${colorClass}`}>
                          {tag}
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-transparent px-3 py-1.5 font-mono text-sm rounded-lg flex items-center gap-1.5">
                  <span>{(() => {
        const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
        const priceStr = pData && pData.versions.length > 0 ? pData.versions[0].price.toFixed(3) : "0.000";
        const unitStr = pData && pData.versions.length > 0 ? pData.versions[0].unit.replace("per ", "").toUpperCase() : "REQ";
        return <><span className="text-emerald-500 mr-1">$</span> ${priceStr} <span className="text-emerald-500/70 text-xs ml-1">/ {unitStr}</span></>;
      })()}</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#FF7A00] text-white text-[10px] font-bold cursor-help leading-none pt-[1px]">?</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>基础价格+平台加价</p>
                    </TooltipContent>
                  </Tooltip>
                </Badge>
                
                <Badge variant="outline" className="bg-slate-50 text-slate-800 border-slate-200 px-3 py-1.5 font-mono text-sm rounded-lg font-bold flex items-center gap-1.5">
                  <span>{(() => {
        const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
        const creditsStr = pData && pData.versions.length > 0 ? pData.versions[0].credits : "0";
        const unitStr = pData && pData.versions.length > 0 ? pData.versions[0].unit.replace("per ", "").toUpperCase() : "REQ";
        return <>{creditsStr} <span className="text-slate-500 text-xs ml-1 font-semibold">CREDITS / {unitStr}</span></>;
      })()}</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#FF7A00] text-white text-[10px] font-bold cursor-help leading-none pt-[1px]">?</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>(基础价格+平台加价)*平台汇率</p>
                    </TooltipContent>
                  </Tooltip>
                </Badge>
                <span className="text-sm text-zinc-400">
                  Starts at. <a href="#pricing" className="underline hover:text-zinc-600 transition-colors" onClick={(e) => { e.preventDefault(); setActiveTab("readme"); }}>See full pricing in README</a>
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
            <DevAnnotation
              elementName="Run with API Button"
              componentType="Button"
              functionDesc="Quickly jump to or open API call examples"
            >
              <Button className="w-full md:w-48 gap-2 bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-xl font-semibold text-base">
                <Play className="w-4 h-4 fill-current" /> Run with API
              </Button>
            </DevAnnotation>
            <DevAnnotation
              elementName="Copy Page Button"
              componentType="Button"
              functionDesc="Copy the current page content to clipboard in Markdown format"
            >
              <div className="flex">
                <Button variant="outline" className="w-full md:w-auto gap-2 bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200 h-11 rounded-l-xl rounded-r-none border-r-0 font-semibold text-base flex-1">
                  <FileText className="w-4 h-4" /> Copy page
                </Button>
                <Button variant="outline" className="bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200 h-11 rounded-l-none rounded-r-xl px-3">
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </DevAnnotation>
          </div>
        </div>

        {/* Pricing Info (Removed per request to not show prices) */}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-zinc-200 px-4 pt-4 gap-6">
          <DevAnnotation
            elementName="Playground Tab"
            componentType="Tab"
            functionDesc="Interactive testing area (Phase 2 planning)"
            devNotes="Phase 2 feature, currently can be used as a placeholder or to display simple UI."
          >
            <Link
              to={`/models/${id}/playground`}
              className={cn("pb-3 text-sm font-bold transition-colors flex items-center gap-2 border-b-2", activeTab === "playground" ? "border-blue-600 text-blue-600" : "border-transparent text-zinc-500 hover:text-zinc-900")}
            >
              <Play className="w-4 h-4" /> Playground
            </Link>
          </DevAnnotation>
          <DevAnnotation
            elementName="README Tab"
            componentType="Tab"
            functionDesc="Graphic display of best practices, parameter descriptions, official suggestions"
            devNotes="Phase 1 feature, backend logic: Content Management (README editor)."
          >
            <button
              onClick={() => setActiveTab("readme")}
              className={cn("pb-3 text-sm font-bold transition-colors flex items-center gap-2 border-b-2", activeTab === "readme" ? "border-blue-600 text-blue-600" : "border-transparent text-zinc-500 hover:text-zinc-900")}
            >
              <FileText className="w-4 h-4" /> README
            </button>
          </DevAnnotation>
          <DevAnnotation
            elementName="API Tab"
            componentType="Tab"
            functionDesc="Display specific call examples for this model"
            devNotes="Phase 1 feature, backend logic: API mapping."
          >
            <a
              href="https://www.newapi.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="pb-3 text-sm font-bold transition-colors flex items-center gap-2 border-b-2 border-transparent text-zinc-500 hover:text-zinc-900"
            >
              <Code className="w-4 h-4" /> API
            </a>
          </DevAnnotation>
        </div>

        <div className="p-8">
          {activeTab === "readme" && (
            <DevAnnotation
              elementName="README 模块动态组件"
              componentType="Markdown/UI"
              functionDesc="渲染模型详情与动态计费信息"
              customContent={
                <div className="space-y-4 text-sm">
                  <div className="border-[#fbc02d] pb-2 mb-2">
                    <h4 className="font-bold text-base text-zinc-900">(README) 模块 2: 可用模型版本表</h4>
                    <p className="text-zinc-600 mt-1">模型id、类别、API链接、价格</p>
                    <div className="mt-2 bg-zinc-50 p-2 rounded border border-zinc-100">
                      <span className="font-mono text-xs text-blue-600">sub_models(数组)</span>
                      <p className="text-zinc-600 mt-1">动态 UI 组件插入：提取 <code className="bg-zinc-100 px-1 rounded">id</code>, <code className="bg-zinc-100 px-1 rounded">alias_type</code> (渲染 Latest/Fixed 标签), <code className="bg-zinc-100 px-1 rounded">version_description</code>渲染包含一键复制按钮的数据表。</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-zinc-900">(README) 模块 6: 计费细则与加权表</h4>
                    <div className="mt-2 bg-zinc-50 p-2 rounded border border-zinc-100">
                      <span className="font-mono text-xs text-blue-600">pricing (JSON 对象)</span>
                      <p className="text-zinc-600 mt-1">动态 UI 组件插入：遍历 <code className="bg-zinc-100 px-1 rounded">pricing.multipliers</code> 渲染参数倍率表；针对 Chat 模型提取 <code className="bg-zinc-100 px-1 rounded">input_fee_config</code> / <code className="bg-zinc-100 px-1 rounded">output_fee_config</code> 计算展示文本梯度价。所有的加权价格都需要+对应的平台加价（都需要显示美金和credit两种）。</p>
                    </div>
                  </div>
                </div>
              }
            >
              <div className="space-y-12 py-4">
              {/* 2. Available Model Versions */}
              <section>
                <h2 className="text-2xl font-bold text-[#0B1120] mb-4 flex items-center gap-2">
                  <span className="text-red-500">📌</span> Available Model Versions
                </h2>
                <p className="text-zinc-600 mb-4">
                  To ensure stability in production environments, we provide both trunk models that always point to the latest version, and snapshot models locked to specific dates:
                </p>
                <div className="border border-zinc-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 border-b border-zinc-200">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-zinc-900">{t("Model ID (API Call)")}</th>
                        <th className="px-6 py-4 font-semibold text-zinc-900">{t("Type")}</th>
                        <th className="px-6 py-4 font-semibold text-zinc-900">{t("API Docs")}</th>
                        <th className="px-6 py-4 font-semibold text-zinc-900">{t("Credits")} <Info className="w-3 h-3 inline-block text-zinc-400" /></th>
                        <th className="px-6 py-4 font-semibold text-zinc-900">{t("Price (USD)")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      <tr className="bg-white">
                        <td className="px-6 py-4 font-mono text-blue-600 font-medium">
                          <div className="flex items-center gap-2">
                            {model.id}
                            <ModelIdCopyButton id={model.id} />
                          </div>
                        </td>
                        <td className="px-6 py-4"><Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-transparent font-bold">LATEST</Badge></td>
                        <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer flex items-center gap-1">Official Docs <ExternalLink className="w-3 h-3" /></td>
                        <td className="px-6 py-4 font-bold text-zinc-800">
                          {(() => {
                            const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
                            return pData && pData.versions.length > 0 ? pData.versions[0].credits : "-";
                          })()}
                        </td>
                        <td className="px-6 py-4 font-bold text-blue-600">
                          {(() => {
                            const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
                            return pData && pData.versions.length > 0 ? "$" + pData.versions[0].price.toFixed(3) : "-";
                          })()}
                        </td>
                      </tr>
                      {snapshotModels.map(sm => (
                      <tr key={sm.id} className="bg-white">
                        <td className="px-6 py-4 font-mono text-zinc-600">
                          <div className="flex items-center gap-2">
                            {sm.id}
                            <ModelIdCopyButton id={sm.id} />
                          </div>
                        </td>
                        <td className="px-6 py-4"><Badge variant="secondary" className="bg-zinc-100 text-zinc-500 hover:bg-zinc-100 border-transparent font-bold">FIXED</Badge></td>
                        <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer flex items-center gap-1">Official Docs <ExternalLink className="w-3 h-3" /></td>
                        <td className="px-6 py-4 font-bold text-zinc-800">
                          {(() => {
                            const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
                            return pData && pData.versions.length > 0 ? pData.versions[0].credits : "-";
                          })()}
                        </td>
                        <td className="px-6 py-4 font-bold text-blue-600">
                          {(() => {
                            const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
                            return pData && pData.versions.length > 0 ? "$" + pData.versions[0].price.toFixed(3) : "-";
                          })()}
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 6. Pricing Details */}
              <section id="pricing">
                <h2 className="text-2xl font-bold text-[#0B1120] mb-4 flex items-center gap-2">
                  <span className="text-yellow-600">💰</span> 6. Pricing Details
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-5 h-5 text-zinc-400 cursor-help ml-1 mt-1 hover:text-zinc-600 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm text-sm p-3 bg-white text-zinc-800 border-zinc-200 shadow-lg">
                      <p>{t("定价来自后端的定价，非chat模型的下显示的名称，来自后端【适用场景组合】字段，单位来自【计价单位字段】")}</p>
                    </TooltipContent>
                  </Tooltip>
                </h2>
                
                <DevAnnotation
                  elementName="Pricing Details Description"
                  componentType="Section"
                  functionDesc="Displays the model's pricing rules and combinations"
                  devNotes="🚨 Internal Pricing Note: All prices displayed on the frontend are already marked up by the platform on the backend."
                >
                  <p className="text-zinc-600 mb-6">
                    The actual billing for this model is dynamically calculated based on the specific parameters passed in your API request. Below are the specific combinations and their corresponding pricing:
                  </p>

                  <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
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
                            {(() => {
                              const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
                              return pData && pData.versions.some(v => v.cachePrice !== undefined) ? (
                                <th className="py-3 px-6 text-sm font-semibold text-zinc-500 w-[25%] text-right">
                                  {t("Cache Hit (Credits / USD)")}
                                </th>
                              ) : null;
                            })()}
                            <th className="py-3 px-6 text-sm font-semibold text-zinc-500 w-[25%] text-right">
                              {t("Our Price (USD)")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
                            if (!pData) {
                              return (
                                <tr>
                                  <td colSpan={4} className="py-4 px-6 text-center text-zinc-500">
                                    {t("Pricing information not available.")}
                                  </td>
                                </tr>
                              );
                            }
                            const hasCache = pData.versions.some(v => v.cachePrice !== undefined);
                            return pData.versions.map((version, idx) => (
                              <tr key={idx} className="border-b border-zinc-100 last:border-none hover:bg-zinc-50/50 transition-colors">
                                <td className="py-4 px-6">
                                  <div className="flex flex-col gap-1.5">
                                    <span className="font-medium text-[15px] text-zinc-800">
                                      {version.id}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="secondary" className={cn(
                                        "text-[10px] uppercase tracking-wider border-transparent px-2 py-0.5 font-semibold",
                                        pData.category === "video" && "bg-blue-100 text-[#0055FF] hover:bg-blue-100",
                                        pData.category === "chat" && "bg-blue-100 text-[#0055FF] hover:bg-blue-100",
                                        pData.category === "image" && "bg-blue-100 text-[#0055FF] hover:bg-blue-100"
                                      )}>
                                        {t(pData.category.toLowerCase())}
                                      </Badge>
                                      <span className="text-sm text-zinc-500 font-medium">
                                        {pData.provider}
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
                                {hasCache && (
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
                            ));
                          })()}
                        </tbody></table>
                    </div>
                  </div>
                </DevAnnotation>
              </section>
            </div>
            </DevAnnotation>
          )}
        </div>
      </div>
    </div>
  );
}
