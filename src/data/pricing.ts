export interface PricingVersion {
  id: string; // The display name for this specific parameter combination
  unit: string;
  price: number; // in USD
  credits: number;
  // Specific properties for chat models:
  cachePrice?: number; // USD for cache hit
  cacheCredits?: number; // Credits for cache hit
}

export interface PricingData {
  id: string; // The base model family e.g. "wan 2.7 video" or exact model id
  modelIds?: string[]; // IDs mapping if needed
  category: "chat" | "image" | "video" | "audio";
  provider: string;
  versions: PricingVersion[];
}

export const pricingData: PricingData[] = [
  {
    id: "qwen3-max",
    modelIds: ["qwen3-max"],
    category: "chat",
    provider: "Alibaba Cloud",
    versions: [
      { id: "Input", unit: "per million tokens", price: 0.400, credits: 400, cachePrice: 0.100, cacheCredits: 100 },
      { id: "Output", unit: "per million tokens", price: 1.200, credits: 1200 }
    ]
  },
  {
    id: "wan2.7-image-pro",
    modelIds: ["wan2.7-image-pro"],
    category: "image",
    provider: "Wan",
    versions: [
      { id: "720p Std", unit: "per image", price: 0.050, credits: 50 },
      { id: "1080p Std", unit: "per image", price: 0.080, credits: 80 }
    ]
  },
  {
    id: "image-01",
    modelIds: ["image-01"],
    category: "image",
    provider: "ByteDance",
    versions: [
      { id: "standard", unit: "per image", price: 0.100, credits: 100 },
      { id: "hd", unit: "per image", price: 0.150, credits: 150 }
    ]
  },
  {
    id: "wan2.7-t2v",
    modelIds: ["wan2.7-t2v"],
    category: "video",
    provider: "Wan",
    versions: [
      { id: "480P 有音频 std 无视频", unit: "per second", price: 0.050, credits: 10 },
      { id: "720P 有音频 std 无视频", unit: "per second", price: 0.080, credits: 16 },
      { id: "1080P 有音频 std 无视频", unit: "per second", price: 0.120, credits: 24 }
    ]
  },
  {
    id: "wan2.7-i2v",
    modelIds: ["wan2.7-i2v"],
    category: "video",
    provider: "Wan",
    versions: [
      { id: "480P 有音频 std 无视频", unit: "per second", price: 0.060, credits: 12 },
      { id: "720P 有音频 std 无视频", unit: "per second", price: 0.090, credits: 18 },
      { id: "1080P 有音频 std 无视频", unit: "per second", price: 0.130, credits: 26 }
    ]
  },
  {
    id: "qwen3-tts-instruct-flash",
    modelIds: ["qwen3-tts-instruct-flash"],
    category: "audio",
    provider: "Alibaba Cloud",
    versions: [
      { id: "standard", unit: "per 1K chars", price: 0.015, credits: 15 },
      { id: "hd", unit: "per 1K chars", price: 0.030, credits: 30 }
    ]
  }
];
