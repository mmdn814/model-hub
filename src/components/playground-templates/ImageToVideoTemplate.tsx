import React, {  useState , useEffect } from 'react';
import { Settings2, Video, Wand2, Upload, Play, Download, Plus, X , Copy} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ImageToVideoTemplate({ model, restoredParams, onValidate, onAddHistory }: { model: any, restoredParams?: any, onValidate?: (cb: () => void) => void, onAddHistory?: (item: any) => void }) {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState([5]);
  const [status, setStatus] = useState<'idle' | 'in_queue' | 'in_progress' | 'completed'>('idle');

  const isWanI2v = model?.id === 'wan2.7-i2v';
  const isWanR2v = model?.id === 'wan2.7-r2v';
  const isWanKf2v = model?.id?.includes('wan2') && model?.id?.includes('kf2v');
  const isHailuo02FirstLast = model?.id === 'MiniMax-Hailuo-02' && model?.playgroundType === 'image_to_video';

  const [references, setReferences] = useState<{type: string, file: string}[]>([]);

  useEffect(() => {
    if (restoredParams) {
      if (restoredParams.prompt) setPrompt(restoredParams.prompt);
      if (restoredParams.duration) setDuration([restoredParams.duration]);
      if (restoredParams.references) setReferences(restoredParams.references);
    }
  }, [restoredParams]);

  const getPayload = () => ({
    model: model?.id,
    prompt,
    duration: duration[0],
    references
  });

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(getPayload(), null, 2));
  };

  const handleGenerate = () => {
    if (onValidate) {
      onValidate(doGenerate);
    } else {
      doGenerate();
    }
  };

  const doGenerate = () => {
    setStatus('in_queue');
    setTimeout(() => setStatus('in_progress'), 1500);
    setTimeout(() => {
      setStatus('completed');
      if (onAddHistory) {
        onAddHistory({
          id: Date.now().toString(),
          modelId: model?.id,
          modality: 'video',
          prompt: prompt || 'Animated with image references',
          result: 'https://www.w3schools.com/html/mov_bbb.mp4',
          cost: duration[0] * 12,
          timestamp: Date.now(),
          params: getPayload()
        });
      }
    }, 4500);
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-zinc-50 relative">
      <div className="w-[400px] bg-white border-r border-zinc-200 flex flex-col shrink-0 overflow-y-auto">
        <ScrollArea className="flex-1 p-5">
          <div className="space-y-6 pb-20">
            {/* dynamic slots based on model */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-800">Media Inputs</label>
              
              {isWanR2v ? (
                // R2V Reference mode
                <div className="space-y-3">
                  {references.map((ref, idx) => (
                    <div key={idx} className="border border-zinc-200 rounded-lg p-3 bg-zinc-50">
                      <div className="flex items-center justify-between mb-2">
                        <Select value={ref.type} onValueChange={(val) => {
                          const newRefs = [...references];
                          newRefs[idx].type = val;
                          setReferences(newRefs);
                        }}>
                          <SelectTrigger className="h-7 text-xs w-[140px] bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="reference_image">Reference Image</SelectItem>
                            <SelectItem value="reference_video">Reference Video</SelectItem>
                            <SelectItem value="first_frame">First Frame</SelectItem>
                          </SelectContent>
                        </Select>
                        <button onClick={() => setReferences(prev => prev.filter((_, i) => i !== idx))} className="text-zinc-400 hover:text-red-500">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="h-16 border-2 border-dashed border-zinc-200 rounded-md bg-white flex items-center justify-center cursor-pointer hover:border-blue-400 text-zinc-400">
                        <Upload className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                  {references.length < 5 && (
                    <Button variant="outline" className="w-full border-dashed" onClick={() => setReferences(prev => [...prev, {type: 'reference_image', file: ''}])}>
                      <Plus className="w-4 h-4 mr-2" /> Add Reference
                    </Button>
                  )}
                </div>
              ) : (
                // Standard mode (First frame, Last frame)
                <div className="grid grid-cols-2 gap-3">
                  <div className="border hover:border-blue-400 border-zinc-200 rounded-xl p-3 bg-zinc-50/50 flex flex-col items-center justify-center text-center cursor-pointer transition-colors border-dashed min-h-[120px] group">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Upload className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-xs font-semibold text-zinc-700">First Frame <span className="text-red-500">*</span></p>
                  </div>

                  {(isWanKf2v || isHailuo02FirstLast) ? (
                    <div className="border hover:border-blue-400 border-zinc-200 rounded-xl p-3 bg-zinc-50/50 flex flex-col items-center justify-center text-center cursor-pointer transition-colors border-dashed min-h-[120px] group">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Upload className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-xs font-semibold text-zinc-700">Last Frame <span className="text-red-500">*</span></p>
                    </div>
                  ) : (
                    <div className="border hover:border-zinc-300 border-zinc-200 rounded-xl p-3 bg-zinc-50/50 flex flex-col items-center justify-center text-center cursor-pointer transition-colors border-dashed min-h-[120px] group">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Upload className="w-4 h-4 text-zinc-400" />
                      </div>
                      <p className="text-xs font-semibold text-zinc-500">Last Frame (Opt)</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-800">Motion Prompt</label>
              <Textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Describe how the image elements should move..."
                className="h-[100px] resize-none"
              />
            </div>

            <div className="border-t border-zinc-100 my-2" />
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-semibold text-zinc-800">Duration</label>
                <span className="text-sm font-mono text-blue-600 font-bold">{duration[0]}s</span>
              </div>
              <Slider value={duration} onValueChange={(v) => setDuration(v as number[])} min={2} max={15} step={1} className="py-2" />
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-zinc-100 bg-white shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] z-10 flex gap-2">
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
            disabled={status !== 'idle' && status !== 'completed'}
          >
            <Video className="w-5 h-5 mr-2" /> Generate Video
          </Button>
        </div>
      </div>

      {/* Right Results Area - Same as T2V */}
      <div className="flex-1 p-8 bg-zinc-100 flex flex-col items-center justify-center relative">
        {status === 'idle' ? (
          <div className="flex flex-col items-center text-zinc-400">
            <Video className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-sm font-medium">Video generation results will appear here</p>
          </div>
        ) : status === 'in_queue' || status === 'in_progress' ? (
          <div className="w-full max-w-3xl aspect-video bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center border border-zinc-200">
            <div className="w-16 h-16 relative mb-6">
              <div className="absolute inset-0 border-4 border-zinc-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h3 className="text-xl font-bold text-zinc-800 mb-2">Generating Video...</h3>
            <div className="w-64 h-2 bg-zinc-100 rounded-full mt-6 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: status === 'in_queue' ? '20%' : '75%' }} />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl aspect-video bg-black rounded-2xl shadow-2xl relative overflow-hidden group">
            <video src="https://www.w3schools.com/html/mov_bbb.mp4" autoPlay loop muted playsInline className="w-full h-full object-contain" />
          </div>
        )}
      </div>
    </div>
  );
}
