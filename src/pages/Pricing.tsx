import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface PricingModel {
  id: string;
  name: string;
  provider: string;
  contextWindow: string;
  inputPrice: number;
  outputPrice: number;
}

const pricingData: PricingModel[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    contextWindow: "128K",
    inputPrice: 5.00,
    outputPrice: 15.00,
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    contextWindow: "128K",
    inputPrice: 10.00,
    outputPrice: 30.00,
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    contextWindow: "16K",
    inputPrice: 0.50,
    outputPrice: 1.50,
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    contextWindow: "200K",
    inputPrice: 15.00,
    outputPrice: 75.00,
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    contextWindow: "200K",
    inputPrice: 3.00,
    outputPrice: 15.00,
  },
  {
    id: "claude-3-haiku",
    name: "Claude 3 Haiku",
    provider: "Anthropic",
    contextWindow: "200K",
    inputPrice: 0.25,
    outputPrice: 1.25,
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    contextWindow: "2M",
    inputPrice: 3.50,
    outputPrice: 10.50,
  },
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    provider: "Google",
    contextWindow: "1M",
    inputPrice: 0.35,
    outputPrice: 1.05,
  },
  {
    id: "llama-3-70b",
    name: "Llama 3 70B",
    provider: "Meta",
    contextWindow: "8K",
    inputPrice: 0.70,
    outputPrice: 0.90,
  },
  {
    id: "llama-3-8b",
    name: "Llama 3 8B",
    provider: "Meta",
    contextWindow: "8K",
    inputPrice: 0.15,
    outputPrice: 0.15,
  }
];

export default function Pricing() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModels = pricingData.filter(model => 
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">
          {t("Model Pricing")}
        </h1>
        <p className="text-zinc-500">
          {t("Transparent, pay-as-you-go pricing for all supported models. Prices are per 1M tokens.")}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input 
            placeholder={t("Search by model name or provider...")} 
            className="pl-9 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 border-b border-zinc-200 text-zinc-500 text-sm">
                <th className="py-4 px-6 font-medium">{t("Model")}</th>
                <th className="py-4 px-6 font-medium">{t("Provider")}</th>
                <th className="py-4 px-6 font-medium">{t("Context Window")}</th>
                <th className="py-4 px-6 font-medium text-right">{t("Input Price")} (1M tokens)</th>
                <th className="py-4 px-6 font-medium text-right">{t("Output Price")} (1M tokens)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredModels.length > 0 ? (
                filteredModels.map((model) => (
                  <tr key={model.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-medium text-zinc-900">{model.name}</div>
                      <div className="text-xs text-zinc-400 font-mono mt-0.5">{model.id}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800">
                        {model.provider}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-zinc-600 text-sm">
                      {model.contextWindow}
                    </td>
                    <td className="py-4 px-6 text-right font-medium text-zinc-900">
                      ${model.inputPrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-right font-medium text-zinc-900">
                      ${model.outputPrice.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-500">
                    {t("No models found matching your search.")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-sm text-blue-800">
        <h4 className="font-semibold mb-2">{t("Pricing Notes")}</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("Prices are calculated based on the number of tokens processed.")}</li>
          <li>{t("1 token is approximately 4 characters or 0.75 words in English.")}</li>
          <li>{t("Image generation and other non-text models may be priced per request/image.")}</li>
          <li>{t("Volume discounts are available for Scale tier customers. Contact sales for details.")}</li>
        </ul>
      </div>
    </div>
  );
}
