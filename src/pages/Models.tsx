import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, PlayCircle, Image as ImageIcon, Music, MessageSquare, CheckCircle2, Settings2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DevAnnotation } from "@/components/DevAnnotation";
import { cn } from "@/lib/utils";

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

const models = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    description: "High-performance multimodal model for text, vision, and audio tasks.",
    price: "$5.00 / 1M tokens",
    status: "Active",
    tags: ["Chat", "Vision"],
    category: "chat",
    previewUrl: "https://picsum.photos/seed/gpt4o/400/225",
    providerLogo: "O"
  },
  {
    id: "sora",
    name: "Sora",
    provider: "OpenAI",
    description: "Creates realistic and imaginative video from text instructions.",
    price: "$0.05 / second",
    status: "Active",
    tags: ["Text to Video"],
    category: "video",
    previewUrl: "https://picsum.photos/seed/sora/400/225",
    providerLogo: "O"
  },
  {
    id: "midjourney-v6",
    name: "Midjourney v6",
    provider: "Midjourney",
    description: "State-of-the-art image generation with photorealistic details.",
    price: "$0.03 / image",
    status: "Active",
    tags: ["Text to Image"],
    category: "image",
    previewUrl: "https://picsum.photos/seed/mj/400/225",
    providerLogo: "M"
  },
  {
    id: "elevenlabs-tts",
    name: "ElevenLabs TTS",
    provider: "ElevenLabs",
    description: "Lifelike speech synthesis in multiple languages and voices.",
    price: "$0.30 / 1K chars",
    status: "Active",
    tags: ["Text to Speech"],
    category: "audio",
    previewUrl: "https://picsum.photos/seed/audio/400/225",
    providerLogo: "E"
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    description: "Fast, highly capable model for coding and complex reasoning.",
    price: "$3.00 / 1M tokens",
    status: "Active",
    tags: ["Chat", "Coding"],
    category: "chat",
    previewUrl: "https://picsum.photos/seed/claude/400/225",
    providerLogo: "A"
  },
  {
    id: "runway-gen3",
    name: "Gen-3 Alpha",
    provider: "Runway",
    description: "High-fidelity video generation with precise temporal control.",
    price: "$0.10 / second",
    status: "Active",
    tags: ["Text to Video", "Image to Video"],
    category: "video",
    previewUrl: "https://picsum.photos/seed/runway/400/225",
    providerLogo: "R"
  }
];

export default function Models() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModels = models.filter(model => {
    const matchesCategory = activeCategory ? model.category === activeCategory : true;
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          model.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">{t("Model Marketplace")}</h1>
        <p className="text-zinc-500 mt-1">{t("Explore and integrate top-tier AI models via a single API.")}</p>
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
              <li><span className="font-semibold">关键字搜索 (Search):</span> 实时匹配模型的<span className="text-blue-600">名称 (Name)</span>或<span className="text-blue-600">提供商 (Provider)</span>。</li>
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
            <select className="bg-zinc-50 border border-zinc-200 text-zinc-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
              <option value="">{t("All Providers")}</option>
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic</option>
              <option value="google">Google</option>
            </select>
            <select className="bg-zinc-50 border border-zinc-200 text-zinc-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
              <option value="">{t("All Tasks")}</option>
              <option value="text-to-video">Text to Video</option>
              <option value="text-to-image">Text to Image</option>
              <option value="chat">Chat</option>
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
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 transition-colors whitespace-nowrap"
                >
                  {t(tag)}
                </button>
              ))}
            </div>
          )}
        </div>
      </DevAnnotation>

      {/* Main Content Grid */}
      <DevAnnotation
        elementName="模型网格列表"
        componentType="Grid"
        functionDesc="展示符合条件的模型卡片"
        autoLogic="根据后端配置的排序权重 (Sorting Weight) 决定先后顺序。只有状态为“上架 (Active)”的模型才会在此展示。"
        devNotes="后端维护逻辑：上下架状态管理 (Listing Status)、排序权重 (Sorting Weight)。"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredModels.map((model) => (
            <Link key={model.id} to={`/models/${model.id}`} className="group block h-full">
              <DevAnnotation
                elementName="模型卡片 (Model Card)"
                componentType="Card"
                functionDesc="展示单个模型的核心信息与入口"
                customContent={
                  <div className="space-y-3 text-sm">
                    <div className="font-bold text-base border-b border-[#fbc02d] pb-1 mb-2">卡片字段及数据来源</div>
                    <ul className="space-y-2">
                      <li><span className="font-semibold">封面素材 (Preview):</span> 来源于后端 Display Metadata (图片/视频 URL)。</li>
                      <li><span className="font-semibold">价格 (Price):</span> 来源于后端 Pricing Details (如按 token 或按次计费)。</li>
                      <li><span className="font-semibold">提供商 Logo (Logo):</span> 来源于后端 Display Metadata (品牌资产)。</li>
                      <li><span className="font-semibold">模型名称 (Name):</span> 来源于后端模型基础信息。</li>
                      <li><span className="font-semibold">提供商 (Provider):</span> 来源于后端模型基础信息。</li>
                      <li><span className="font-semibold">简介 (Description):</span> 来源于后端 CMS 维护的简短描述。</li>
                      <li><span className="font-semibold">功能标签 (Tags):</span> 来源于后端 Taxonomy 维护的二级任务标签。</li>
                    </ul>
                  </div>
                }
              >
                <Card className="overflow-hidden border-zinc-200 hover:border-zinc-300 hover:shadow-md transition-all h-full flex flex-col bg-white rounded-2xl">
                  {/* Preview Asset */}
                  <div className="aspect-[16/9] w-full bg-zinc-100 relative overflow-hidden">
                    <img 
                      src={model.previewUrl} 
                      alt={model.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-zinc-900 border-none shadow-sm font-medium">
                        {model.price}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start gap-3 mb-3">
                      {/* Provider Logo */}
                      <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 font-bold text-zinc-600">
                        {model.providerLogo}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-zinc-900 truncate">{model.name}</h3>
                        <p className="text-sm text-zinc-500 truncate">{model.provider}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-zinc-600 mb-4 line-clamp-2 flex-1">
                      {model.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {model.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium bg-zinc-100 text-zinc-600">
                          {t(tag)}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </DevAnnotation>
            </Link>
          ))}
        </div>
      </DevAnnotation>
    </div>
  );
}
