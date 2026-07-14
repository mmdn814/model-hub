import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { models } from "@/data/models";
import { Card } from "@/components/ui/card";
import { 
  Building2, 
  BarChart3, 
  Activity, 
  Clock, 
  Box, 
  ChevronRight,
  Video,
  Image as ImageIcon,
  Music,
  MessageSquare,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock performance data for providers
const generateMockPerformance = (providerName: string, hasAsync: boolean) => {
  const seed = providerName.length;
  return {
    requests: Math.floor(100000 + (seed * 150000) + Math.random() * 500000),
    successRate: (95 + Math.random() * 4.9).toFixed(1),
    syncLatency: Math.floor(150 + Math.random() * 800),
    asyncLatency: hasAsync ? Math.floor(2000 + Math.random() * 5000) : undefined
  };
};

const categoryIcons: Record<string, any> = {
  video: Video,
  image: ImageIcon,
  audio: Music,
  chat: MessageSquare,
};

const categoryLabels: Record<string, string> = {
  video: "Video Generation",
  image: "Image Generation",
  audio: "Audio/Music",
  chat: "Chat",
};

export default function Providers() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const providerStats = useMemo(() => {
    const stats = new Map<string, any>();
    
    models.forEach(model => {
      // Only include active models as requested
      if (model.visibility !== "Visible") return;

      if (!stats.has(model.provider)) {
        stats.set(model.provider, {
          name: model.provider,
          logo: model.providerLogo,
          models: [],
          modelsByCategory: new Map<string, any[]>(),
          categories: new Map<string, number>(),
          hasAsync: false,
          performance: null
        });
      }
      
      const providerData = stats.get(model.provider);
      providerData.models.push(model);
      
      const count = providerData.categories.get(model.category) || 0;
      providerData.categories.set(model.category, count + 1);

      if (!providerData.modelsByCategory.has(model.category)) {
        providerData.modelsByCategory.set(model.category, []);
      }
      providerData.modelsByCategory.get(model.category).push(model);

      if (model.category === "video" || model.category === "image") {
        providerData.hasAsync = true;
      }
    });

    for (const providerData of stats.values()) {
      providerData.performance = generateMockPerformance(providerData.name, providerData.hasAsync);
    }

    return Array.from(stats.values()).sort((a, b) => b.models.length - a.models.length);
  }, []);

  const filteredProviders = providerStats.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">{t("Providers")}</h1>
        <p className="text-zinc-500 mt-1">{t("Overview of model providers, categories, and performance metrics.")}</p>
      </div>

      {/* Provider List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProviders.map((provider) => (
          <Card key={provider.name} className="overflow-hidden border-zinc-200 hover:border-zinc-300 hover:shadow-md transition-all flex flex-col bg-white rounded-2xl">
            <div className="p-6">
              {/* Header: Logo and Name */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-xl text-indigo-600">
                    {provider.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900">{provider.name}</h3>
                    <p className="text-sm text-zinc-500">{provider.models.length} {t("Models")}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProvider(selectedProvider === provider.name ? null : provider.name)}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                >
                  {selectedProvider === provider.name ? t("Hide Models") : t("View Models")}
                  <ChevronRight className={cn("w-4 h-4 transition-transform", selectedProvider === provider.name ? "rotate-90" : "")} />
                </button>
              </div>

              {/* Performance Metrics */}
              <div className="flex flex-wrap gap-x-8 gap-y-4 mb-6 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className="min-w-[80px]">
                  <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5" />
                    {t("Requests")}
                  </div>
                  <div className="font-semibold text-zinc-900">
                    {(provider.performance.requests / 1000).toFixed(1)}k
                  </div>
                </div>
                <div className="min-w-[80px]">
                  <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1">
                    <BarChart3 className="w-3.5 h-3.5" />
                    {t("Success")}
                  </div>
                  <div className="font-semibold text-emerald-600">
                    {provider.performance.successRate}%
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {t("Latency")}
                  </div>
                  {provider.hasAsync ? (
                    <div className="flex gap-4">
                      <div>
                        <span className="text-[10px] text-zinc-400 mr-1.5 uppercase tracking-wider">{t("Sync")}</span>
                        <span className="font-semibold text-zinc-900">{provider.performance.syncLatency}ms</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-400 mr-1.5 uppercase tracking-wider">{t("Async")}</span>
                        <span className="font-semibold text-zinc-900">{provider.performance.asyncLatency}ms</span>
                      </div>
                    </div>
                  ) : (
                    <div className="font-semibold text-zinc-900">
                      {provider.performance.syncLatency}ms
                    </div>
                  )}
                </div>
              </div>

              {/* Categories Breakdown */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 mb-3">{t("Model Categories")}</h4>
                <div className="flex flex-wrap gap-2">
                  {Array.from(provider.categories.entries()).map(([cat, count]) => {
                    const Icon = categoryIcons[cat] || Box;
                    return (
                      <div key={cat} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-sm text-zinc-700">
                        <Icon className="w-4 h-4 text-zinc-500" />
                        <span>{t(categoryLabels[cat] || cat)}</span>
                        <span className="font-medium text-zinc-900 ml-1">{count as number}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Expandable Model List */}
            {selectedProvider === provider.name && (
              <div className="border-t border-zinc-200 bg-zinc-50 p-6 space-y-6">
                {Array.from(provider.modelsByCategory.entries()).map(([category, catModels]: [string, any[]]) => (
                  <div key={category}>
                    <h4 className="text-sm font-semibold text-zinc-900 mb-3 flex items-center gap-2">
                      {(() => {
                        const Icon = categoryIcons[category] || Box;
                        return <Icon className="w-4 h-4 text-zinc-500" />;
                      })()}
                      {t(categoryLabels[category] || category)}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {catModels.map((model: any) => (
                        <Link 
                          key={model.id} 
                          to={`/models/${model.id}`}
                          className="flex flex-col p-3 bg-white border border-zinc-200 rounded-lg shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                        >
                          <div className="font-mono text-sm font-bold text-zinc-900 truncate" title={model.id}>
                            {model.id}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
