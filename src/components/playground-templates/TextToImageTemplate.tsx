import React, { useState, useEffect } from 'react';
import { Settings2, Image as ImageIcon, Sparkles, Download, Maximize2, Zap, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const RATIOS = [
  { id: '1:1', w: 24, h: 24 },
  { id: '16:9', w: 32, h: 18 },
  { id: '9:16', w: 18, h: 32 },
  { id: '4:3', w: 28, h: 21 },
  { id: '3:4', w: 21, h: 28 },
];

export function TextToImageTemplate({ model, restoredParams, onValidate, onAddHistory }: { model: any, restoredParams?: any, onValidate?: (cb: () => void) => void, onAddHistory?: (item: any) => void }) {
  const [prompt, setPrompt] = useState('A futuristic cyberpunk city at night, neon lights...');
  const [ratio, setRatio] = useState('16:9');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [n, setN] = useState(1);
  const [seed, setSeed] = useState('');
  const [watermark, setWatermark] = useState(false);
  const [promptExtend, setPromptExtend] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (restoredParams) {
      if (restoredParams.prompt) setPrompt(restoredParams.prompt);
      if (restoredParams.aspect_ratio) setRatio(restoredParams.aspect_ratio);
      if (restoredParams.negative_prompt) setNegativePrompt(restoredParams.negative_prompt);
      if (restoredParams.n) setN(restoredParams.n);
      if (restoredParams.seed) setSeed(String(restoredParams.seed));
      if (restoredParams.watermark !== undefined) setWatermark(restoredParams.watermark);
      if (restoredParams.prompt_extend !== undefined) setPromptExtend(restoredParams.prompt_extend);
    }
  }, [restoredParams]);

  const getPayload = () => ({
    model: model?.id,
    prompt,
    aspect_ratio: ratio,
    negative_prompt: negativePrompt || undefined,
    n,
    seed: seed ? Number(seed) : undefined,
    watermark,
    prompt_extend: promptExtend
  });

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(getPayload(), null, 2));
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    if (onValidate) {
      onValidate(doGenerate);
    } else {
      doGenerate();
    }
  };

  const doGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const respUrls = Array.from({ length: n }).map((_, i) => 'https://picsum.photos/seed/' + Math.random() + '/800/450?i=' + i);
      setResults(respUrls);
      setIsGenerating(false);
      
      if (onAddHistory) {
        onAddHistory({
          id: Date.now().toString(),
          modelId: model?.id,
          modality: 'image',
          prompt: prompt,
          result: respUrls,
          cost: 10 * n,
          timestamp: Date.now(),
          params: getPayload()
        });
      }
    }, 2000);
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-zinc-50 relative">
      {/* Left Input Area */}
      <div className="w-[400px] bg-white border-r border-zinc-200 flex flex-col shrink-0 overflow-y-auto">
        <div className="p-5 space-y-6 flex-1">
          {/* Prompt */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-zinc-800">Prompt <span className="text-red-500">*</span></label>
              <Button variant="ghost" size="sm" className="h-6 text-[10px] text-blue-600 px-2" onClick={() => setPromptExtend(!promptExtend)}>
                <Sparkles className="w-3 h-3 mr-1" />
                Auto-Enhance {promptExtend ? 'On' : 'Off'}
              </Button>
            </div>
            <Textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              className="h-[160px] resize-none"
            />
          </div>

          {/* Ratio */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-zinc-800">Aspect Ratio</label>
            <div className="grid grid-cols-5 gap-2">
              {RATIOS.map(r => (
                <button
                  key={r.id}
                  onClick={() => setRatio(r.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-xl border transition-all h-[72px] bg-zinc-50",
                    ratio === r.id 
                      ? "border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm" 
                      : "border-zinc-200 text-zinc-500 hover:bg-zinc-100 hover:border-zinc-300"
                  )}
                >
                  <div className="h-8 flex items-center justify-center mb-1">
                    <div 
                      className={cn("border-2 rounded-sm", ratio === r.id ? "border-blue-500" : "border-zinc-400")} 
                      style={{ width: r.w, height: r.h }} 
                    />
                  </div>
                  <span className="text-[10px] font-semibold tracking-tight">{r.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Advanced */}
          <div className="border border-zinc-200 rounded-xl overflow-hidden">
            <button 
              className="w-full px-4 py-3 bg-zinc-50 flex items-center justify-between text-sm font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <div className="flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-zinc-500" /> Advanced Options
              </div>
            </button>
            
            {showAdvanced && (
              <div className="p-4 space-y-4 bg-white border-t border-zinc-200">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-700">Negative Prompt</label>
                  <Textarea value={negativePrompt} onChange={e => setNegativePrompt(e.target.value)} className="h-20 text-sm" placeholder="e.g. low quality, blurry..." />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-zinc-700">Number of Images</label>
                  <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden h-8">
                    <button className="px-3 hover:bg-zinc-100 text-zinc-500" onClick={() => setN(Math.max(1, n-1))}>-</button>
                    <div className="px-3 text-sm font-medium border-x border-zinc-200">{n}</div>
                    <button className="px-3 hover:bg-zinc-100 text-zinc-500" onClick={() => setN(Math.min(4, n+1))}>+</button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-700">Seed</label>
                  <Input type="number" value={seed} onChange={e => setSeed(e.target.value)} placeholder="Random" className="h-8 text-sm" />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-zinc-700">Watermark</label>
                  <Switch checked={watermark} onCheckedChange={setWatermark} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-zinc-100 bg-white flex gap-2">
          <Button
            variant="outline"
            className="h-12 w-12 shrink-0 rounded-xl"
            title="Copy API Parameters as JSON"
            onClick={handleCopyJSON}
          >
            <Copy className="w-5 h-5 text-zinc-600" />
          </Button>
          <Button 
            className="flex-1 h-12 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl shadow-lg shadow-zinc-900/10 font-bold text-base"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? <Zap className="w-5 h-5 mr-2 animate-pulse fill-amber-400 text-amber-400" /> : <Sparkles className="w-5 h-5 mr-2" />}
            {isGenerating ? 'Generating...' : 'Generate Image'}
          </Button>
        </div>
      </div>

      {/* Right Results Area */}
      <div className="flex-1 p-8 overflow-y-auto bg-zinc-50/50 flex flex-col">
        {results.length === 0 && !isGenerating ? (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-400">
            <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-sm font-medium">Image generation gallery</p>
            <p className="text-xs opacity-60">Generated images will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 auto-rows-max">
            {isGenerating && Array(n).fill(0).map((_, i) => (
              <div key={i} className="aspect-video bg-zinc-200 animate-pulse rounded-2xl" />
            ))}
            {!isGenerating && results.map((url, i) => (
              <div key={i} className="relative group rounded-2xl overflow-hidden border border-zinc-200 shadow-sm aspect-video bg-zinc-100">
                <img src={url} alt={`Gen ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Button size="icon" variant="secondary" className="rounded-full w-10 h-10 bg-white/90 hover:bg-white text-zinc-900 shadow-xl">
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full w-10 h-10 bg-white/90 hover:bg-white text-zinc-900 shadow-xl">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
