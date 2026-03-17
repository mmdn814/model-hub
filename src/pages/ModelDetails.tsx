import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Copy, Terminal, Check, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ModelDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"showcase" | "readme" | "api">("api");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link to="/models" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Models
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center border border-zinc-200 shrink-0">
              <span className="text-2xl font-bold text-zinc-400">O</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold tracking-tight">GPT-4o</h1>
                <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 gap-1">
                  <ShieldCheck className="w-3 h-3" /> Commercial License
                </Badge>
              </div>
              <p className="text-zinc-500 text-lg">OpenAI</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button variant="outline" className="w-full md:w-auto gap-2">
              <Copy className="w-4 h-4" /> Copy as Markdown
            </Button>
            <Button className="w-full md:w-auto gap-2">
              <Terminal className="w-4 h-4" /> Run with API
            </Button>
          </div>
        </div>

        {/* Pricing Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Card className="p-4 bg-zinc-50/50 border-zinc-100 shadow-none">
            <div className="text-sm text-zinc-500 mb-1">Input Price</div>
            <div className="font-semibold text-lg">5,000 <span className="text-sm font-normal text-zinc-500">credits / 1M tokens</span></div>
          </Card>
          <Card className="p-4 bg-zinc-50/50 border-zinc-100 shadow-none">
            <div className="text-sm text-zinc-500 mb-1">Output Price</div>
            <div className="font-semibold text-lg">15,000 <span className="text-sm font-normal text-zinc-500">credits / 1M tokens</span></div>
          </Card>
          <Card className="p-4 bg-zinc-50/50 border-zinc-100 shadow-none">
            <div className="text-sm text-zinc-500 mb-1">Context Window</div>
            <div className="font-semibold text-lg">128k <span className="text-sm font-normal text-zinc-500">tokens</span></div>
          </Card>
          <Card className="p-4 bg-zinc-50/50 border-zinc-100 shadow-none">
            <div className="text-sm text-zinc-500 mb-1">Max Output</div>
            <div className="font-semibold text-lg">4,096 <span className="text-sm font-normal text-zinc-500">tokens</span></div>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex border-b border-zinc-200">
          <button
            onClick={() => setActiveTab("showcase")}
            className={cn("px-6 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === "showcase" ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-500 hover:text-zinc-900 hover:border-zinc-300")}
          >
            Showcase
          </button>
          <button
            onClick={() => setActiveTab("readme")}
            className={cn("px-6 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === "readme" ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-500 hover:text-zinc-900 hover:border-zinc-300")}
          >
            README
          </button>
          <button
            onClick={() => setActiveTab("api")}
            className={cn("px-6 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === "api" ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-500 hover:text-zinc-900 hover:border-zinc-300")}
          >
            API Reference
          </button>
        </div>

        <div className="py-8">
          {activeTab === "showcase" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-zinc-100 flex items-center justify-center p-6">
                    <p className="text-zinc-400 text-center">"A futuristic city skyline at sunset, cyberpunk style, highly detailed."</p>
                  </div>
                  <div className="p-4 bg-zinc-50 border-t border-zinc-100">
                    <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Prompt</div>
                    <p className="text-sm text-zinc-700">A futuristic city skyline at sunset, cyberpunk style, highly detailed.</p>
                  </div>
                </Card>
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-zinc-100 flex items-center justify-center p-6">
                    <p className="text-zinc-400 text-center">"Write a Python script to scrape a website."</p>
                  </div>
                  <div className="p-4 bg-zinc-50 border-t border-zinc-100">
                    <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Prompt</div>
                    <p className="text-sm text-zinc-700">Write a Python script to scrape a website.</p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "readme" && (
            <div className="prose prose-zinc max-w-none">
              <h3>About GPT-4o</h3>
              <p>GPT-4o ("o" for "omni") is a step towards much more natural human-computer interaction—it accepts as input any combination of text, audio, image, and video and generates any combination of text, audio, and image outputs.</p>
              
              <h4>Use Cases</h4>
              <ul>
                <li>Complex reasoning and coding tasks</li>
                <li>Vision analysis and image understanding</li>
                <li>Multilingual translation and content generation</li>
              </ul>

              <h4>Prompting Tips</h4>
              <p>For best results, be specific about the format you want the output in. Use system prompts to set the behavior and persona of the assistant.</p>
            </div>
          )}

          {activeTab === "api" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Endpoint</h3>
                <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy URL"}
                </Button>
              </div>
              
              <div className="bg-zinc-950 text-zinc-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                POST https://api.aiplatform.com/v1/chat/completions
              </div>

              <h3 className="text-lg font-semibold mt-8">Example Request</h3>
              <div className="bg-zinc-950 text-zinc-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
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
