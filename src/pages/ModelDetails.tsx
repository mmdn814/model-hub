import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Copy, Terminal, Check, ShieldCheck, Play, History, Sparkles, ChevronDown, FileText, Code, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { DevAnnotation } from "@/components/DevAnnotation";
import { models } from "@/data/models";

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
              elementName="模型 Logo"
              componentType="Image"
              functionDesc="展示模型提供商的 Logo"
              devNotes="由后端 Display Metadata 配置。"
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
                  elementName="商业授权标识"
                  componentType="Badge"
                  functionDesc="标识该模型是否允许商业用途"
                  devNotes="后端维护逻辑：Commercial Status (Yes/No)。"
                >
                  <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-transparent px-3 py-1 font-medium text-sm rounded-full">
                    Commercial use
                  </Badge>
                </DevAnnotation>
              </div>

              <p className="text-zinc-600 text-base leading-relaxed max-w-3xl">
                阿里通义千问图像生成模型 2.0 (Qwen-Image-2.0) 实现了图像生成与编辑的统一。它提供逼真的质感生成、结构化文字渲染、原生 2K 高分辨率输出及灵活的图像编辑能力，全面赋能创意与视觉设计工作流。
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
                  <span className="text-emerald-500 mr-1">$</span> $0.03 <span className="text-emerald-500/70 text-xs ml-1">/ IMAGE</span>
                </Badge>
                <span className="text-sm text-zinc-400">
                  Starts at. <a href="#pricing" className="underline hover:text-zinc-600 transition-colors" onClick={(e) => { e.preventDefault(); setActiveTab("readme"); }}>See full pricing in README</a>
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
            <DevAnnotation
              elementName="Run with API 按钮"
              componentType="Button"
              functionDesc="快捷跳转或打开 API 调用示例"
            >
              <Button className="w-full md:w-48 gap-2 bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-xl font-semibold text-base">
                <Play className="w-4 h-4 fill-current" /> Run with API
              </Button>
            </DevAnnotation>
            <DevAnnotation
              elementName="Copy Page 按钮"
              componentType="Button"
              functionDesc="将当前页面内容以 Markdown 格式复制到剪贴板"
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
            functionDesc="交互测试区 (二期规划)"
            devNotes="Phase 2 功能，目前可作为占位或展示简单 UI。"
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
            functionDesc="图文展示最佳实践、参数说明、官方建议"
            devNotes="Phase 1 功能，后端维护逻辑：Content Management (README editor)。"
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
            functionDesc="展示该模型的具体调用示例"
            devNotes="Phase 1 功能，后端维护逻辑：API mapping。"
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
            <div className="space-y-12 py-4">
              {/* 1. 简介与核心亮点 */}
              <section>
                <h2 className="text-2xl font-bold text-[#0B1120] mb-4 flex items-center gap-2">
                  <span className="text-blue-600">1.</span> 简介与核心亮点
                </h2>
                <p className="text-zinc-600 leading-relaxed">
                  阿里通义千问图像生成模型 2.0 (Qwen-Image-2.0) 实现了图像生成与编辑的统一。其独特优势在于逼真的质感生成、结构化文字渲染（如招牌、海报文字）以及原生 2K 高分辨率输出。最佳适用场景包括：高质量商业摄影生成、创意海报设计、以及精准的局部图像编辑。
                </p>
              </section>

              {/* 2. 可用模型版本 */}
              <section>
                <h2 className="text-2xl font-bold text-[#0B1120] mb-4 flex items-center gap-2">
                  <span className="text-red-500">📌</span> 2. 可用模型版本 (Available Model IDs)
                </h2>
                <p className="text-zinc-600 mb-4">
                  为了保证生产环境的稳定性，我们提供始终指向最新的主干模型，以及锁定特定日期的快照模型：
                </p>
                <div className="border border-zinc-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 border-b border-zinc-200">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-zinc-900">Model ID (API 调用)</th>
                        <th className="px-6 py-4 font-semibold text-zinc-900">类别</th>
                        <th className="px-6 py-4 font-semibold text-zinc-900">版本说明</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      <tr className="bg-white">
                        <td className="px-6 py-4 font-mono text-blue-600 font-medium">qwen-image-2.0-pro</td>
                        <td className="px-6 py-4"><Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-50">主干</Badge></td>
                        <td className="px-6 py-4 text-zinc-600">推荐。始终指向最新的 2.0 Pro 稳定版。</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-6 py-4 font-mono text-zinc-600">qwen-image-max</td>
                        <td className="px-6 py-4"><Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-50">主干</Badge></td>
                        <td className="px-6 py-4 text-zinc-600">指向最新一代 Max 旗舰版模型。</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 3. 精彩案例 */}
              <section>
                <h2 className="text-2xl font-bold text-[#0B1120] mb-4 flex items-center gap-2">
                  <span className="text-yellow-400">✨</span> 3. 精彩案例 (Showcase)
                </h2>
                <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                  <h3 className="text-sm font-bold text-zinc-500 mb-4">中文文字海报渲染</h3>
                  <div className="rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-indigo-900 to-purple-900 aspect-[2/1] flex items-center justify-center relative">
                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                      未来已来
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-zinc-200 text-sm text-zinc-700">
                    <span className="font-bold text-blue-600">Prompt:</span> 赛博朋克风格的下雨街头，画面中心有一个巨大的霓虹灯招牌，上面用发光的中文写着“未来已来”，电影级打光，虚幻引擎5渲染。
                  </div>
                </div>
              </section>

              {/* 4. 提示词编写技巧 */}
              <section>
                <h2 className="text-2xl font-bold text-[#0B1120] mb-4 flex items-center gap-2">
                  <span className="text-yellow-500">💡</span> 4. 提示词 (Prompt) 编写技巧
                </h2>
                <ul className="space-y-3 text-zinc-700 list-disc list-inside marker:text-blue-500">
                  <li><strong>主体描述 (Subject):</strong> 明确画面中心是谁/什么（如：一只穿着宇航服的金毛犬）。</li>
                  <li><strong>环境与背景 (Environment):</strong> 定义主体所处的环境（如：站在霓虹灯闪烁的火星基地）。</li>
                  <li><strong>风格与材质 (Style & Texture):</strong> 增加质感描述（如：赛博朋克，体积光，8k 极致细节）。</li>
                </ul>
              </section>

              {/* 5. 最佳实践与安全建议 */}
              <section>
                <h2 className="text-2xl font-bold text-[#0B1120] mb-4 flex items-center gap-2">
                  <span className="text-zinc-600">🛠️</span> 5. 最佳实践与安全建议
                </h2>
                <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-blue-100 space-y-6">
                  <div>
                    <h3 className="font-bold text-[#0B1120] mb-2 text-base">分辨率支持 (Resolution)</h3>
                    <p className="text-zinc-600 text-sm">Qwen 原生支持多种画幅。电商主图建议使用 1024x1024，手机海报建议使用 768x1152。</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0B1120] mb-2 text-base">安全拦截说明 (Safety)</h3>
                    <p className="text-zinc-600 text-sm">模型内置了严格的敏感词过滤。请避免在 Prompt 中使用敏感词汇，否则可能导致 API 返回 <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-800 font-mono">400 Bad Request</code>。</p>
                  </div>
                </div>
              </section>

              {/* 6. 计费细则与进阶定价 */}
              <section id="pricing">
                <h2 className="text-2xl font-bold text-[#0B1120] mb-4 flex items-center gap-2">
                  <span className="text-yellow-600">💰</span> 6. 计费细则与进阶定价 (Pricing Details)
                </h2>
                
                <DevAnnotation
                  elementName="计费细则说明"
                  componentType="Section"
                  functionDesc="展示模型的计费规则和参数加权"
                  devNotes="🚨 内部定价说明：前端所有显示的价格都是在后端已经经过平台加价的价格，不准暴露上游原始价格。"
                >
                  <p className="text-zinc-600 mb-6">
                    该模型的实际计费会根据您在 API 请求中传递的具体参数动态计算。头部卡片展示的 Starts at $0.03 为该系列的基础模型/基准参数的起步价。完整的梯度规则及参数加权表如下：
                  </p>
                </DevAnnotation>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-bold text-[#0B1120] mb-4 text-base">A. 图像/视频参数加权 (Parameter Multipliers)</h3>
                    <div className="border border-zinc-200 rounded-xl overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-50 border-b border-zinc-200">
                          <tr>
                            <th className="px-6 py-4 font-semibold text-zinc-900">参数名称 (Parameter)</th>
                            <th className="px-6 py-4 font-semibold text-zinc-900">参数值 (Value)</th>
                            <th className="px-6 py-4 font-semibold text-zinc-900 text-right">计费倍率 (Multiplier)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                          <tr className="bg-white">
                            <td className="px-6 py-4 font-mono text-zinc-600" rowSpan={2}>resolution / size</td>
                            <td className="px-6 py-4 text-zinc-600">720p / 1024x1024及以下</td>
                            <td className="px-6 py-4 text-zinc-900 font-bold text-right">1.0x (基准价)</td>
                          </tr>
                          <tr className="bg-white">
                            <td className="px-6 py-4 text-zinc-600">1080p / 2048x2048及以上</td>
                            <td className="px-6 py-4 text-blue-600 font-bold text-right flex items-center justify-end gap-1">1.5x <Info className="w-4 h-4 text-zinc-400" /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#0B1120] mb-4 text-base">B. 文本大模型梯度定价 (Context-based Tiered Pricing)</h3>
                    <div className="border border-zinc-200 rounded-xl overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-50 border-b border-zinc-200">
                          <tr>
                            <th className="px-6 py-4 font-semibold text-zinc-900">上下文区间 (Context Length)</th>
                            <th className="px-6 py-4 font-semibold text-zinc-900">Input Price / 1M tokens</th>
                            <th className="px-6 py-4 font-semibold text-zinc-900">Output Price / 1M tokens</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                          <tr className="bg-white">
                            <td className="px-6 py-4 font-mono text-zinc-600">&lt;= 32K tokens</td>
                            <td className="px-6 py-4 text-zinc-600">$0.020</td>
                            <td className="px-6 py-4 text-zinc-600">$0.060</td>
                          </tr>
                          <tr className="bg-white">
                            <td className="px-6 py-4 font-mono text-blue-600 font-bold">&gt; 32K tokens (Long Context)</td>
                            <td className="px-6 py-4 text-blue-600 font-bold">$0.045</td>
                            <td className="px-6 py-4 text-blue-600 font-bold">$0.135</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
            </div>
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
