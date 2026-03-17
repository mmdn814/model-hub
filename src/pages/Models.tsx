import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Zap, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Models() {
  const { t } = useTranslation();

  const models = [
    {
      id: "gpt-4o",
      name: "GPT-4o",
      provider: "OpenAI",
      price: `5,000 ${t("credits")} / 1M tokens`,
      latency: "0.8s",
      status: "Healthy",
      tags: ["Chat", "Vision", "Fast"],
    },
    {
      id: "claude-3-5-sonnet",
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      price: `3,000 ${t("credits")} / 1M tokens`,
      latency: "0.6s",
      status: "Healthy",
      tags: ["Chat", "Coding", "Vision"],
    },
    {
      id: "gemini-1.5-pro",
      name: "Gemini 1.5 Pro",
      provider: "Google",
      price: `3,500 ${t("credits")} / 1M tokens`,
      latency: "1.1s",
      status: "Healthy",
      tags: ["Chat", "Long Context"],
    },
    {
      id: "midjourney-v6",
      name: "Midjourney v6",
      provider: "Midjourney",
      price: `50 ${t("credits")} / task`,
      latency: "15s",
      status: "Healthy",
      tags: ["Image Generation"],
    },
    {
      id: "llama-3-70b",
      name: "Llama 3 70B",
      provider: "Meta",
      price: `700 ${t("credits")} / 1M tokens`,
      latency: "0.4s",
      status: "Healthy",
      tags: ["Chat", "Open Source"],
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t("Model Marketplace")}</h2>
          <p className="text-zinc-500">{t("Explore and integrate top-tier AI models via a single API.")}</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input placeholder={t("Search models...")} className="pl-9" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map((model) => (
          <Link key={model.id} to={`/models/${model.id}`}>
            <Card className="hover:border-zinc-300 hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{model.name}</h3>
                    <p className="text-sm text-zinc-500">{model.provider}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    {t(model.status)}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {model.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="font-normal">{t(tag)}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="px-5 py-3 border-t border-zinc-100 bg-zinc-50/50 flex justify-between items-center text-sm rounded-b-xl">
                <div className="font-medium text-zinc-900">{model.price}</div>
                <div className="flex items-center gap-1 text-zinc-500">
                  <Zap className="w-3 h-3" />
                  {model.latency}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
