import React, {  useState , useEffect } from 'react';
import { Settings2, Image as ImageIcon, Sparkles, Wand2, Upload, GripVertical , Copy} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function ImageToImageTemplate({ model, restoredParams, onValidate, onAddHistory }: { model: any, restoredParams?: any, onValidate?: (cb: () => void) => void, onAddHistory?: (item: any) => void }) {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [seed, setSeed] = useState('');
  const [watermark, setWatermark] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);

  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  useEffect(() => {
    if (restoredParams) {
      if (restoredParams.prompt) setPrompt(restoredParams.prompt);
      if (restoredParams.negative_prompt) setNegativePrompt(restoredParams.negative_prompt);
      if (restoredParams.seed) setSeed(String(restoredParams.seed));
      if (restoredParams.watermark !== undefined) setWatermark(restoredParams.watermark);
    }
  }, [restoredParams]);

  const getPayload = () => ({
    model: model?.id,
    prompt,
    negative_prompt: negativePrompt || undefined,
    seed: seed ? Number(seed) : undefined,
    watermark
  });

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(getPayload(), null, 2));
  };

  const isWan = model?.id?.includes('wan');
  const isImage01 = model?.id?.includes('image-01');

  const handleGenerate = () => {
    if (onValidate) {
      onValidate(doGenerate);
    } else {
      doGenerate();
    }
  };

  const doGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setHasResult(true);
      setIsGenerating(false);
      
      if (onAddHistory) {
        onAddHistory({
          id: Date.now().toString(),
          modelId: model?.id,
          modality: 'image',
          prompt: prompt || 'Applied Edit',
          result: 'https://picsum.photos/seed/after/1024/768',
          cost: 15,
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
          {/* Upload Slots */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-zinc-800">Media Assets <span className="text-red-500">*</span></label>
            
            <div className="border hover:border-blue-400 border-zinc-200 rounded-xl p-4 bg-zinc-50/50 flex flex-col items-center justify-center text-center cursor-pointer transition-colors border-dashed min-h-[140px] group">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-zinc-700">Upload Reference Image</p>
              <p className="text-[11px] text-zinc-500 mt-1">PNG, JPG, max 10MB</p>
            </div>

            {(isWan || isImage01) && (
              <div className="border hover:border-zinc-300 border-zinc-200 rounded-xl p-3 bg-zinc-50/50 flex items-center justify-between cursor-pointer transition-colors border-dashed group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-3.5 h-3.5 text-zinc-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-zinc-700">Mask / Additional (Optional)</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Edit Prompt */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-800 flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-purple-600" /> Edit Instructions
            </label>
            <Textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="e.g. Turn the background into a cyberpunk city..."
              className="h-[120px] resize-none"
            />
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
                  <Textarea value={negativePrompt} onChange={e => setNegativePrompt(e.target.value)} className="h-20 text-sm" placeholder="..." />
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
            {isGenerating ? <Sparkles className="w-5 h-5 mr-2 animate-pulse fill-amber-400 text-amber-400" /> : <Wand2 className="w-5 h-5 mr-2" />}
            {isGenerating ? 'Editing...' : 'Apply Edits'}
          </Button>
        </div>
      </div>

      {/* Right Results Area */}
      <div className="flex-1 p-8 overflow-y-auto bg-zinc-100 flex flex-col items-center justify-center">
        {!hasResult && !isGenerating ? (
          <div className="flex flex-col items-center text-zinc-400">
            <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-sm font-medium text-zinc-500">Upload an image and apply edits to see the result</p>
          </div>
        ) : isGenerating ? (
          <div className="w-full max-w-2xl aspect-[4/3] bg-zinc-200 animate-pulse rounded-2xl shadow-sm" />
        ) : (
          <div className="w-full max-w-3xl aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl bg-white select-none">
            {/* After Image (Background) */}
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/after/1024/768')] bg-cover bg-center" />
            
            {/* Before Image (Foreground, clipped) */}
            <div 
              className="absolute inset-0 bg-[url('https://picsum.photos/seed/before/1024/768')] bg-cover bg-center border-r-[3px] border-white/80 box-content"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            />
            
            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-8 -ml-4 flex items-center justify-center cursor-ew-resize z-10"
              style={{ left: `${sliderPos}%` }}
              onMouseDown={(e: any) => {
                const slider = e.currentTarget.parentElement;
                const onMouseMove = (e: MouseEvent) => {
                  const rect = slider.getBoundingClientRect();
                  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                  setSliderPos((x / rect.width) * 100);
                };
                const onMouseUp = () => {
                  window.removeEventListener('mousemove', onMouseMove);
                  window.removeEventListener('mouseup', onMouseUp);
                };
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
              }}
            >
              <div className="h-10 w-10 bg-white shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-full flex items-center justify-center border border-zinc-100 hover:scale-110 transition-transform">
                <GripVertical className="w-5 h-5 text-zinc-600" />
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full pointer-events-none">BEFORE</div>
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full pointer-events-none">AFTER</div>
          </div>
        )}
      </div>
    </div>
  );
}
