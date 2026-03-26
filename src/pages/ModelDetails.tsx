import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Copy, Terminal, Check, ShieldCheck, Play, History, Sparkles, ChevronDown, FileText, Code, Info, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { DevAnnotation } from "@/components/DevAnnotation";
import { models } from "@/data/models";

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
  const [activeTab, setActiveTab] = useState<"playground" | "readme" | "api">("readme");
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
                Alibaba Cloud's Qwen-Image-2.0 unifies image generation and editing. It provides realistic texture generation, structured text rendering, native 2K high-resolution output, and flexible image editing capabilities, fully empowering creative and visual design workflows.
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
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-transparent px-3 py-1.5 font-mono text-sm rounded-lg">
                  <span className="text-emerald-500 mr-1">$</span> $0.030 <span className="text-emerald-500/70 text-xs ml-1">/ IMAGE</span>
                </Badge>
                <Badge variant="outline" className="bg-slate-50 text-slate-800 border-slate-200 px-3 py-1.5 font-mono text-sm rounded-lg font-bold">
                  30 <span className="text-slate-500 text-xs ml-1 font-semibold">CREDITS / IMAGE</span>
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
            <button
              onClick={() => setActiveTab("playground")}
              className={cn("pb-3 text-sm font-bold transition-colors flex items-center gap-2 border-b-2", activeTab === "playground" ? "border-blue-600 text-blue-600" : "border-transparent text-zinc-500 hover:text-zinc-900")}
            >
              <Play className="w-4 h-4" /> Playground
            </button>
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
            <button
              onClick={() => setActiveTab("api")}
              className={cn("pb-3 text-sm font-bold transition-colors flex items-center gap-2 border-b-2", activeTab === "api" ? "border-blue-600 text-blue-600" : "border-transparent text-zinc-500 hover:text-zinc-900")}
            >
              <Code className="w-4 h-4" /> API
            </button>
          </DevAnnotation>
        </div>

        <div className="p-8">
          {activeTab === "playground" && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Play className="w-8 h-8 ml-1" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Interactive Playground</h3>
              <p className="text-zinc-500 max-w-md">
                Test and interact with the model directly from your browser. This feature is planned for Phase 2.
              </p>
            </div>
          )}

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
                        <th className="px-6 py-4 font-semibold text-zinc-900">Model ID (API Call)</th>
                        <th className="px-6 py-4 font-semibold text-zinc-900">Type</th>
                        <th className="px-6 py-4 font-semibold text-zinc-900">API Docs</th>
                        <th className="px-6 py-4 font-semibold text-zinc-900">Credits <Info className="w-3 h-3 inline-block text-zinc-400" /></th>
                        <th className="px-6 py-4 font-semibold text-zinc-900">Price (USD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      <tr className="bg-white">
                        <td className="px-6 py-4 font-mono text-blue-600 font-medium">
                          <div className="flex items-center gap-2">
                            qwen-image-2.0-pro
                            <ModelIdCopyButton id="qwen-image-2.0-pro" />
                          </div>
                        </td>
                        <td className="px-6 py-4"><Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-transparent font-bold">LATEST</Badge></td>
                        <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer flex items-center gap-1">Official Docs <ExternalLink className="w-3 h-3" /></td>
                        <td className="px-6 py-4 font-bold text-zinc-800">30</td>
                        <td className="px-6 py-4 font-bold text-blue-600">$0.030</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 font-mono text-zinc-600">
                          <div className="flex items-center gap-2">
                            qwen-image-2.0-pro-2026-03-03
                            <ModelIdCopyButton id="qwen-image-2.0-pro-2026-03-03" />
                          </div>
                        </td>
                        <td className="px-6 py-4"><Badge variant="secondary" className="bg-zinc-100 text-zinc-500 hover:bg-zinc-100 border-transparent font-bold">FIXED</Badge></td>
                        <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer flex items-center gap-1">Official Docs <ExternalLink className="w-3 h-3" /></td>
                        <td className="px-6 py-4 font-bold text-zinc-800">30</td>
                        <td className="px-6 py-4 font-bold text-blue-600">$0.030</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 6. Pricing Details */}
              <section id="pricing">
                <h2 className="text-2xl font-bold text-[#0B1120] mb-4 flex items-center gap-2">
                  <span className="text-yellow-600">💰</span> 6. Pricing Details
                </h2>
                
                <DevAnnotation
                  elementName="Pricing Details Description"
                  componentType="Section"
                  functionDesc="Displays the model's pricing rules and parameter multipliers"
                  devNotes="🚨 Internal Pricing Note: All prices displayed on the frontend are already marked up by the platform on the backend. Do not expose the original upstream prices."
                >
                  <p className="text-zinc-600 mb-6">
                    The actual billing for this model is dynamically calculated based on the specific parameters passed in your API request. The 'Starts at $0.030' shown in the header card is the starting price for the base model/baseline parameters of this series. The complete tiered rules and parameter multiplier table are as follows:
                  </p>
                </DevAnnotation>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-bold text-[#0B1120] mb-4 text-base">A. Image/Video Parameter Multipliers</h3>
                    <div className="border border-zinc-200 rounded-xl overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-50 border-b border-zinc-200">
                          <tr>
                            <th className="px-6 py-4 font-semibold text-zinc-900">Parameter</th>
                            <th className="px-6 py-4 font-semibold text-zinc-900">Value</th>
                            <th className="px-6 py-4 font-semibold text-zinc-900 text-right">Multiplier</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                          <tr className="bg-white">
                            <td className="px-6 py-4 font-mono text-zinc-600" rowSpan={2}>resolution / size</td>
                            <td className="px-6 py-4 text-zinc-600">720p / 1024x1024 and below</td>
                            <td className="px-6 py-4 text-zinc-900 font-bold text-right">1.0x (Base Price)</td>
                          </tr>
                          <tr className="bg-white">
                            <td className="px-6 py-4 text-zinc-600">1080p / 2048x2048 and above</td>
                            <td className="px-6 py-4 text-blue-600 font-bold text-right flex items-center justify-end gap-1">1.5x <Info className="w-4 h-4 text-zinc-400" /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#0B1120] mb-4 text-base">B. Context-based Tiered Pricing</h3>
                    <div className="border border-zinc-200 rounded-xl overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-50 border-b border-zinc-200">
                          <tr>
                            <th className="px-6 py-4 font-semibold text-zinc-900">Context Length</th>
                            <th className="px-6 py-4 font-semibold text-zinc-900">Input Credits / 1M tokens</th>
                            <th className="px-6 py-4 font-semibold text-zinc-900">Input Price / 1M tokens</th>
                            <th className="px-6 py-4 font-semibold text-zinc-900">Output Credits / 1M tokens</th>
                            <th className="px-6 py-4 font-semibold text-zinc-900">Output Price / 1M tokens</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                          <tr className="bg-white">
                            <td className="px-6 py-4 font-mono text-zinc-600">&lt;= 32K tokens</td>
                            <td className="px-6 py-4 text-zinc-600">20</td>
                            <td className="px-6 py-4 text-zinc-600">$0.020</td>
                            <td className="px-6 py-4 text-zinc-600">60</td>
                            <td className="px-6 py-4 text-zinc-600">$0.060</td>
                          </tr>
                          <tr className="bg-white">
                            <td className="px-6 py-4 font-mono text-blue-600 font-bold">&gt; 32K tokens (Long Context)</td>
                            <td className="px-6 py-4 text-blue-600 font-bold">45</td>
                            <td className="px-6 py-4 text-blue-600 font-bold">$0.045</td>
                            <td className="px-6 py-4 text-blue-600 font-bold">135</td>
                            <td className="px-6 py-4 text-blue-600 font-bold">$0.135</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            </DevAnnotation>
          )}

          {activeTab === "api" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-900">{t("Endpoint")}</h3>
                <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 bg-white hover:bg-zinc-50">
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copied ? t("Copied") : t("Copy URL")}
                </Button>
              </div>
              
              <div className="bg-zinc-900 text-zinc-50 p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-inner">
                POST https://api.aiplatform.com/v1/{model.category === "image" ? "images/generations" : model.category === "video" ? "videos/generations" : "chat/completions"}
              </div>

              <h3 className="text-lg font-semibold text-zinc-900 mt-8">{t("Example Request")}</h3>
              <div className="bg-zinc-900 text-zinc-50 p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-inner">
<pre>{`curl https://api.aiplatform.com/v1/${model.category === "image" ? "images/generations" : model.category === "video" ? "videos/generations" : "chat/completions"} \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $API_KEY" \\
  -d '{
    "model": "${model.id}",
    ${model.category === "image" ? `"prompt": "A beautiful sunset over the mountains",
    "n": 1,
    "size": "1024x1024"` : model.category === "video" ? `"prompt": "A cat driving a car",
    "duration": 5` : `"messages": [
      {
        "role": "user",
        "content": "What is the meaning of life?"
      }
    ]`}
  }'`}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
