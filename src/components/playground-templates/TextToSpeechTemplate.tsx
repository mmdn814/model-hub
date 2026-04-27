import React, {  useState , useEffect } from 'react';
import { Settings2, Play, Download, Mic2, Pause, Volume2 , Copy} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const QWEN_VOICES = ['Cherry', 'Serena', 'Ethan', 'Chelsie', 'Momo', 'Vivian', 'Moon', 'Maia', 'Kai', 'Nofish', 'Bella'];

export function TextToSpeechTemplate({ model, restoredParams, onValidate, onAddHistory }: { model: any, restoredParams?: any, onValidate?: (cb: () => void) => void, onAddHistory?: (item: any) => void }) {
  const [text, setText] = useState('Quantum computing is a rapidly-emerging technology...');
  const [voice, setVoice] = useState('Cherry');
  const [speed, setSpeed] = useState([1.0]);
  const [language, setLanguage] = useState('auto');
  const [instructions, setInstructions] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (restoredParams) {
      if (restoredParams.input) setText(restoredParams.input);
      if (restoredParams.voice) setVoice(restoredParams.voice);
      if (restoredParams.speed) setSpeed([restoredParams.speed]);
      if (restoredParams.language) setLanguage(restoredParams.language);
      if (restoredParams.instructions) setInstructions(restoredParams.instructions);
    }
  }, [restoredParams]);

  const getPayload = () => ({
    model: model?.id,
    input: text,
    voice,
    speed: speed[0],
    language,
    instructions: instructions || undefined
  });

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(getPayload(), null, 2));
  };

  const isQwen = model?.id?.includes('qwen');

  const handleGenerate = () => {
    if (!text.trim()) return;
    if (onValidate) {
      onValidate(doGenerate);
    } else {
      doGenerate();
    }
  };

  const doGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setAudioReady(true);
      setIsPlaying(true);
      
      if (onAddHistory) {
        onAddHistory({
          id: Date.now().toString(),
          modelId: model?.id,
          modality: 'audio',
          prompt: text,
          result: 'https://www.w3schools.com/html/horse.mp3',
          cost: 2,
          timestamp: Date.now(),
          params: getPayload()
        });
      }
    }, 1500);
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-zinc-50 relative">
      {/* Left Input Area */}
      <div className="flex-1 bg-white border-r border-zinc-200 flex flex-col min-w-0">
        <div className="flex-1 p-6 flex flex-col relative">
          <Textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter the text to be spoken..."
            className="flex-1 resize-none text-lg leading-relaxed focus-visible:ring-0 border-0 p-0 shadow-none"
          />
          <div className="absolute bottom-4 right-6 text-xs text-zinc-400 font-medium">
            已输入 {text.length} / 5000字
          </div>
        </div>
        
        <div className="p-4 border-t border-zinc-100 flex justify-end gap-2">
          <Button
            variant="outline"
            className="h-12 w-12 shrink-0 rounded-xl"
            title="Copy API Parameters as JSON"
            onClick={handleCopyJSON}
          >
            <Copy className="w-5 h-5 text-zinc-600" />
          </Button>
          <Button 
            className="h-12 w-48 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl shadow-lg font-bold"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? 'Synthesizing...' : 'Synthesize Audio'}
          </Button>
        </div>
      </div>

      {/* Right Settings & Results Area */}
      <div className="w-[480px] bg-white flex flex-col shrink-0 overflow-y-auto">
        <div className="p-6 space-y-8 flex-1">
          {/* Voice Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-800 flex items-center gap-2">
              <Mic2 className="w-4 h-4 text-blue-600" /> Voice Selection
            </h3>
            
            {isQwen ? (
              <div className="grid grid-cols-2 gap-2">
                {QWEN_VOICES.map(v => (
                  <div 
                    key={v}
                    onClick={() => setVoice(v)}
                    className={cn(
                      "flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors",
                      voice === v ? "border-blue-500 bg-blue-50" : "border-zinc-200 hover:border-zinc-300"
                    )}
                  >
                    <span className="text-sm font-semibold text-zinc-700">{v}</span>
                    <Button variant="ghost" size="icon" className="w-6 h-6 rounded-full hover:bg-white/50 text-zinc-400">
                      <Play className="w-3 h-3 fill-current" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <Input value={voice} onChange={e => setVoice(e.target.value)} placeholder="Voice Identifier (e.g. female-01)" />
              </div>
            )}
          </div>

          <div className="border-t border-zinc-100" />

          {/* Settings */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-semibold text-zinc-800">Speed</label>
                <span className="text-sm font-mono text-zinc-500">{speed[0].toFixed(1)}x</span>
              </div>
              <Slider value={speed} onValueChange={(v) => setSpeed(v as number[])} min={0.5} max={2.0} step={0.1} />
            </div>

            {isQwen && (
              <>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-zinc-800">Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto Detect</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-800">Style Instructions</label>
                  <Input value={instructions} onChange={e => setInstructions(e.target.value)} placeholder="e.g. Speak with a warm, gentle tone..." />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Audio Player Result */}
        <div className="p-6 bg-zinc-50 border-t border-zinc-200 min-h-[140px]">
          {audioReady ? (
            <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm flex flex-col gap-4">
              <div className="flex flex-1 items-center gap-3">
                <Button 
                  size="icon" 
                  className={cn(
                    "w-12 h-12 rounded-full shrink-0 shadow-sm",
                    isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-zinc-900 hover:bg-zinc-800"
                  )}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </Button>
                
                <div className="flex-1">
                  {/* Fake Waveform */}
                  <div className="h-8 flex items-center justify-between gap-0.5 opacity-50">
                    {Array.from({length: 40}).map((_, i) => (
                      <div key={i} className="w-1 bg-blue-600 rounded-full" style={{ height: `${Math.max(20, Math.random() * 100)}%` }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 px-1">
                <span>00:03</span>
                <span>00:12</span>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400">
              <Volume2 className="w-8 h-8 mb-2 opacity-20" />
              <p className="text-sm font-medium">Audio synthesis will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
