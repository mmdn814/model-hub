import React, { useState } from 'react';
import { Settings2, Video, Wand2, Play, Download, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function TextToVideoTemplate({ model, onValidate, onAddHistory }: { model: any, onValidate?: (cb: () => void) => void, onAddHistory?: (item: any) => void }) {
  const [prompt, setPrompt] = useState('A cinematic sweeping shot of a cyberpunk city at night...');
  const [duration, setDuration] = useState([5]);
  const [resolution, setResolution] = useState('1080p');
  
  const [cameraFixed, setCameraFixed] = useState(false);
  const [generateAudio, setGenerateAudio] = useState(false);
  const [draft, setDraft] = useState(false);
  const [watermark, setWatermark] = useState(false);
  const [seed, setSeed] = useState('');

  const [status, setStatus] = useState<'idle' | 'in_queue' | 'in_progress' | 'completed'>('idle');

  const isSeedance = model?.id?.includes('seedance');
  const isSeedance15 = model?.id?.includes('1-5');

  const handleGenerate = () => {
    if (!prompt.trim()) return;
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
          prompt: prompt,
          result: 'https://www.w3schools.com/html/mov_bbb.mp4',
          cost: duration[0] * 10,
          timestamp: Date.now()
        });
      }
    }, 4500);
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
              <Button variant="ghost" size="sm" className="h-6 text-[10px] text-blue-600 px-2">
                <Wand2 className="w-3 h-3 mr-1" />
                Rewrite Prompt
              </Button>
            </div>
            <Textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe the video motion and scene details..."
              className="h-[140px] resize-none"
            />
          </div>

          <div className="border-t border-zinc-100 my-2" />

          {/* Config */}
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-semibold text-zinc-800">Duration</label>
                <span className="text-sm font-mono text-blue-600 font-bold">{duration[0]}s</span>
              </div>
              <Slider value={duration} onValueChange={(v) => setDuration(v as number[])} min={2} max={15} step={1} className="py-2" />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-800">Resolution</label>
              <RadioGroup value={resolution} onValueChange={setResolution} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="480p" id="480p" />
                  <label htmlFor="480p" className="text-sm">480P</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="720p" id="720p" />
                  <label htmlFor="720p" className="text-sm">720P</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1080p" id="1080p" />
                  <label htmlFor="1080p" className="text-sm">1080P</label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-sm font-semibold text-zinc-800">Advanced</label>
              
              {isSeedance && (
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-zinc-700">Fixed Camera</label>
                  <Switch checked={cameraFixed} onCheckedChange={setCameraFixed} />
                </div>
              )}
              
              {isSeedance15 && (
                <>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-zinc-700">Generate Audio</label>
                    <Switch checked={generateAudio} onCheckedChange={setGenerateAudio} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-zinc-700">Draft Mode (Fast)</label>
                    <Switch checked={draft} onCheckedChange={setDraft} />
                  </div>
                </>
              )}

              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-700">Watermark</label>
                <Switch checked={watermark} onCheckedChange={setWatermark} />
              </div>
              
              <div className="space-y-2 pt-1">
                <label className="text-xs font-medium text-zinc-700">Seed</label>
                <Input type="number" value={seed} onChange={e => setSeed(e.target.value)} placeholder="Random" className="h-8 text-sm" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-zinc-100 bg-white">
          <Button 
            className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl shadow-lg shadow-zinc-900/10 font-bold text-base"
            onClick={handleGenerate}
            disabled={status !== 'idle' && status !== 'completed'}
          >
            <Video className="w-5 h-5 mr-2" />
            Generate Video
          </Button>
        </div>
      </div>

      {/* Right Results Area */}
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
            <h3 className="text-xl font-bold text-zinc-800 mb-2">
              {status === 'in_queue' ? 'Waiting in queue...' : 'Generating Video...'}
            </h3>
            <p className="text-zinc-500 text-sm">This may take a few minutes depending on the model and duration.</p>
            
            <div className="w-64 h-2 bg-zinc-100 rounded-full mt-6 overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                style={{ width: status === 'in_queue' ? '20%' : '75%' }}
              />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl aspect-video bg-black rounded-2xl shadow-2xl relative overflow-hidden group">
            <video 
              src="https://www.w3schools.com/html/mov_bbb.mp4" 
              autoPlay loop muted playsInline
              className="w-full h-full object-contain"
            />
            {/* Overlay tools */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button size="icon" className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/50 text-white">
                <Play className="w-8 h-8 ml-1" />
              </Button>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <Button size="sm" className="bg-white/90 hover:bg-white text-zinc-900 shadow-xl border-none">
                 <Download className="w-4 h-4 mr-2" /> Download HD
               </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
