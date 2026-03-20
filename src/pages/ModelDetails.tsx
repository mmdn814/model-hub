import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Copy, Terminal, Check, ShieldCheck, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { DevAnnotation } from "@/components/DevAnnotation";

export default function ModelDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"playground" | "readme" | "api">("readme");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link to="/models" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Models
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-start gap-4">
            <DevAnnotation
              elementName="模型 Logo"
              componentType="Image"
              functionDesc="展示模型提供商的 Logo"
              devNotes="由后端 Display Metadata 配置。"
            >
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center border border-zinc-200 shrink-0 shadow-sm">
                <span className="text-2xl font-bold text-zinc-400">O</span>
              </div>
            </DevAnnotation>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900">GPT-4o</h1>
                <DevAnnotation
                  elementName="商业授权标识"
                  componentType="Badge"
                  functionDesc="标识该模型是否允许商业用途"
                  devNotes="后端维护逻辑：Commercial Status (Yes/No)。"
                >
                  <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 gap-1 font-medium">
                    <ShieldCheck className="w-3 h-3" /> Commercial License
                  </Badge>
                </DevAnnotation>
              </div>
              <p className="text-zinc-500 text-lg">OpenAI</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <DevAnnotation
              elementName="Copy Page 按钮"
              componentType="Button"
              functionDesc="将当前页面内容以 Markdown 格式复制到剪贴板"
            >
              <Button variant="outline" className="w-full md:w-auto gap-2 bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200">
                <Copy className="w-4 h-4" /> Copy Page
              </Button>
            </DevAnnotation>
            <DevAnnotation
              elementName="Run with API 按钮"
              componentType="Button"
              functionDesc="快捷跳转或打开 API 调用示例"
            >
              <Button className="w-full md:w-auto gap-2 bg-zinc-900 hover:bg-zinc-800 text-white">
                <Terminal className="w-4 h-4" /> Run with API
              </Button>
            </DevAnnotation>
          </div>
        </div>

        {/* Pricing Info */}
        <DevAnnotation
          elementName="定价说明"
          componentType="Section"
          functionDesc="显著展示模型的调用单价"
          devNotes="后端维护逻辑：Pricing Details。不同模型计费单位不同 (如 /image, /second, /1M tokens)。"
        >
          <div className="mt-8 p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-zinc-500 mb-1 uppercase tracking-wider">Pricing</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-zinc-900">$5.00</span>
                <span className="text-lg text-zinc-500">/ 1M tokens</span>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-sm text-zinc-500 mb-1">Context Window</div>
              <div className="font-medium text-zinc-900">128k tokens</div>
            </div>
          </div>
        </DevAnnotation>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-zinc-200 bg-zinc-50/50 px-2 pt-2">
          <DevAnnotation
            elementName="Playground Tab"
            componentType="Tab"
            functionDesc="交互测试区 (二期规划)"
            devNotes="Phase 2 功能，目前可作为占位或展示简单 UI。"
          >
            <button
              onClick={() => setActiveTab("playground")}
              className={cn("px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 rounded-t-lg", activeTab === "playground" ? "border-blue-600 text-blue-600 bg-white" : "border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100")}
            >
              <Play className="w-4 h-4" /> Playground (Phase 2)
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
              className={cn("px-6 py-3 text-sm font-medium border-b-2 transition-colors rounded-t-lg", activeTab === "readme" ? "border-blue-600 text-blue-600 bg-white" : "border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100")}
            >
              README
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
              className={cn("px-6 py-3 text-sm font-medium border-b-2 transition-colors rounded-t-lg", activeTab === "api" ? "border-blue-600 text-blue-600 bg-white" : "border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100")}
            >
              API Reference
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
            <div className="prose prose-zinc max-w-none">
              <h3>About GPT-4o</h3>
              <p>GPT-4o ("o" for "omni") is a step towards much more natural human-computer interaction—it accepts as input any combination of text, audio, image, and video and generates any combination of text, audio, and image outputs.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
                <Card className="p-5 bg-zinc-50 border-zinc-200 shadow-sm">
                  <h4 className="font-semibold text-zinc-900 mb-2">Best Practices</h4>
                  <ul className="space-y-2 text-sm text-zinc-600 list-disc list-inside">
                    <li>Be specific about the desired output format.</li>
                    <li>Use system prompts to set persona.</li>
                    <li>Provide examples for complex tasks.</li>
                  </ul>
                </Card>
                <Card className="p-5 bg-zinc-50 border-zinc-200 shadow-sm">
                  <h4 className="font-semibold text-zinc-900 mb-2">Parameters</h4>
                  <ul className="space-y-2 text-sm text-zinc-600 list-disc list-inside">
                    <li><strong>Temperature:</strong> Controls randomness (0.0 to 2.0).</li>
                    <li><strong>Max Tokens:</strong> Limit the output length.</li>
                    <li><strong>Top P:</strong> Nucleus sampling parameter.</li>
                  </ul>
                </Card>
              </div>

              <h4>Official Recommendations</h4>
              <p>For optimal performance, we recommend using the latest API version and handling rate limits gracefully with exponential backoff.</p>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-900">Endpoint</h3>
                <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 bg-white hover:bg-zinc-50">
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy URL"}
                </Button>
              </div>
              
              <div className="bg-zinc-900 text-zinc-50 p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-inner">
                POST https://api.aiplatform.com/v1/chat/completions
              </div>

              <h3 className="text-lg font-semibold text-zinc-900 mt-8">Example Request</h3>
              <div className="bg-zinc-900 text-zinc-50 p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-inner">
<pre>{`curl https://api.aiplatform.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $API_KEY" \\
  -d '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": "What is the meaning of life?"
      }
    ]
  }'`}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
