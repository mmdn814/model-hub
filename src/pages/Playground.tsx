import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, Image as ImageIcon, Video, Music, 
  Wand2, Play, Code, Eye, History, Upload, Settings2,
  ChevronLeft, Coins, AlertCircle, Download, Maximize2,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslation } from 'react-i18next';

import { PlaygroundHistory } from '@/components/PlaygroundHistory';

export type Modality = 'text' | 'image' | 'video' | 'audio';

export interface HistoryItem {
  id: string;
  modality: Modality;
  prompt: string;
  result: string;
  cost: number;
  timestamp: number;
}

const examples = {
  text: {
    prompt: "Explain quantum computing in simple terms.",
    output: "Quantum computing is a rapidly-emerging technology that harnesses the laws of quantum mechanics to solve problems too complex for classical computers.\n\nUnlike traditional computers that use bits (0s and 1s), quantum computers use quantum bits or 'qubits'. These qubits can exist in multiple states simultaneously, a property known as superposition. This allows quantum computers to process a vast number of possibilities at once."
  },
  image: {
    prompt: "A futuristic cyberpunk city at night, neon lights, flying cars, highly detailed, 8k resolution.",
    output: "https://picsum.photos/seed/cyberpunk/800/600"
  },
  video: {
    prompt: "A cinematic sweeping shot of a cyberpunk city at night, neon lights reflecting on wet streets.",
    output: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  audio: {
    prompt: "A futuristic cyberpunk city ambient soundscape, flying cars passing by, neon buzzing.",
    output: "https://www.w3schools.com/html/horse.mp3"
  }
};

export default function Playground() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Mock model data based on ID or default
  const [modality, setModality] = useState<Modality>('text');
  const [balance, setBalance] = useState(12500);
  
  // Inputs
  const [prompt, setPrompt] = useState(examples.text.prompt);
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [seed, setSeed] = useState('');
  const [motionStrength, setMotionStrength] = useState([50]);
  const [duration, setDuration] = useState('5s');
  const [voiceId, setVoiceId] = useState('alloy');
  const [speed, setSpeed] = useState([1.0]);
  const [pitch, setPitch] = useState([0]);
  
  // State
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string | null>(examples.text.output);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      modality: 'text',
      prompt: examples.text.prompt,
      result: examples.text.output,
      cost: 15,
      timestamp: Date.now() - 1000 * 60 * 5,
    },
    {
      id: '2',
      modality: 'image',
      prompt: examples.image.prompt,
      result: examples.image.output,
      cost: 50,
      timestamp: Date.now() - 1000 * 60 * 60,
    },
    {
      id: '3',
      modality: 'video',
      prompt: examples.video.prompt,
      result: examples.video.output,
      cost: 500,
      timestamp: Date.now() - 1000 * 60 * 60 * 2,
    },
    {
      id: '4',
      modality: 'audio',
      prompt: examples.audio.prompt,
      result: examples.audio.output,
      cost: 20,
      timestamp: Date.now() - 1000 * 60 * 60 * 24,
    }
  ]);
  const [activeTab, setActiveTab] = useState('preview');

  const handleModalityChange = (m: Modality) => {
    setModality(m);
    setPrompt(examples[m].prompt);
    setOutput(examples[m].output);
    setActiveTab('preview');
  };

  // Calculate cost based on modality and params
  const calculateCost = () => {
    switch (modality) {
      case 'text': return Math.max(1, Math.floor(prompt.length / 10));
      case 'image': return 50;
      case 'video': return 500;
      case 'audio': return Math.max(10, Math.floor(prompt.length / 5));
      default: return 10;
    }
  };

  const currentCost = calculateCost();

  const handleGenerate = () => {
    if (balance < currentCost) {
      alert(t("Insufficient balance. Please top up."));
      navigate('/billing');
      return;
    }

    setIsGenerating(true);
    setOutput(null);
    setActiveTab('preview');

    // Mock API call
    setTimeout(() => {
      let mockResult = '';
      switch (modality) {
        case 'text':
          mockResult = "This is a simulated response from the model based on your prompt: " + prompt;
          break;
        case 'image':
          mockResult = "https://picsum.photos/seed/" + Math.random() + "/800/600";
          break;
        case 'video':
          mockResult = "https://www.w3schools.com/html/mov_bbb.mp4";
          break;
        case 'audio':
          mockResult = "https://www.w3schools.com/html/horse.mp3";
          break;
      }
      
      setOutput(mockResult);
      setBalance(prev => prev - currentCost);
      setHistory(prev => [{
        id: Date.now().toString(),
        modality,
        prompt,
        result: mockResult,
        cost: currentCost,
        timestamp: Date.now()
      }, ...prev].slice(0, 20)); // Keep last 20
      
      setIsGenerating(false);
    }, 2000);
  };

  const getPayloadJson = () => {
    const base = {
      model: id || 'default-model',
      messages: [{ role: 'user', content: prompt }]
    };

    switch (modality) {
      case 'text':
        return JSON.stringify({ ...base, temperature: temperature[0], max_tokens: maxTokens }, null, 2);
      case 'image':
        return JSON.stringify({ prompt, negative_prompt: negativePrompt, aspect_ratio: aspectRatio, seed: seed || undefined, model: id }, null, 2);
      case 'video':
        return JSON.stringify({ prompt, aspect_ratio: aspectRatio, motion_strength: motionStrength[0], duration, model: id }, null, 2);
      case 'audio':
        return JSON.stringify({ input: prompt, voice: voiceId, speed: speed[0], pitch: pitch[0], model: id }, null, 2);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-zinc-50 overflow-hidden">
      {/* Header */}
      <header className="h-14 bg-white border-b border-zinc-200 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
              AI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-sm">{id || 'seedance-1-0-pro-fast'}</h1>
                <Badge variant="secondary" className="text-[10px] h-5 px-1.5">Pro</Badge>
              </div>
              <p className="text-xs text-zinc-500">High-performance multimodal generation model</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Modality Switcher for Demo Purposes */}
          <div className="flex items-center bg-zinc-100 p-1 rounded-lg">
            {(['text', 'image', 'video', 'audio'] as Modality[]).map(m => (
              <button
                key={m}
                onClick={() => handleModalityChange(m)}
                className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
                  modality === m ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-zinc-600">
              <Coins className="h-4 w-4 text-amber-500" />
              <span className="font-medium">{balance.toLocaleString()}</span>
              <span className="text-xs text-zinc-400">credits</span>
            </div>
            <div className="h-4 w-px bg-zinc-200"></div>
            <div className="flex items-center gap-1.5 text-zinc-600">
              <span className="text-xs text-zinc-400">Est. Cost:</span>
              <span className="font-medium">{currentCost}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Input & Config */}
        <div className="w-[400px] flex flex-col bg-white border-r border-zinc-200 shrink-0 overflow-y-auto">
          <div className="p-4 flex-1 space-y-6">
            
            {/* Input Assets (Conditional) */}
            {modality !== 'text' && (
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Input Assets
                </label>
                <div className="border-2 border-dashed border-zinc-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mb-2">
                    <Upload className="h-5 w-5 text-zinc-500" />
                  </div>
                  <p className="text-sm font-medium text-zinc-700">Drag & drop files here</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {modality === 'image' ? 'Upload base image or mask (PNG, JPG)' : 
                     modality === 'video' ? 'Upload start/end frames (PNG, JPG)' : 
                     'Upload 10s voice sample (WAV, MP3)'}
                  </p>
                </div>
              </div>
            )}

            {/* Prompt */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Prompt
                </label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  onClick={() => setPrompt(prev => prev ? prev + " (enhanced with more details, high quality, masterpiece)" : "A highly detailed, beautiful masterpiece...")}
                >
                  <Wand2 className="h-3 w-3 mr-1" />
                  Auto-Enhance
                </Button>
              </div>
              <Textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  modality === 'text' ? "Enter your prompt here..." :
                  modality === 'image' ? "Describe the image you want to generate..." :
                  modality === 'video' ? "Describe the video motion and scene..." :
                  "Enter the text to be spoken..."
                }
                className="min-h-[120px] resize-none"
              />
            </div>

            {/* Advanced Settings */}
            <div className="space-y-4 pt-4 border-t border-zinc-100">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Settings2 className="h-4 w-4" />
                Advanced Settings
              </label>

              {modality === 'text' && (
                <>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600">Temperature</span>
                      <span className="font-medium">{temperature[0]}</span>
                    </div>
                    <Slider value={temperature} onValueChange={(v) => setTemperature(v as number[])} max={2} step={0.1} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600">Max Tokens</span>
                      <span className="font-medium">{maxTokens}</span>
                    </div>
                    <Input type="number" value={maxTokens} onChange={(e) => setMaxTokens(Number(e.target.value))} />
                  </div>
                </>
              )}

              {(modality === 'image' || modality === 'video') && (
                <div className="space-y-3">
                  <label className="text-sm text-zinc-600">Aspect Ratio</label>
                  <Select value={aspectRatio} onValueChange={setAspectRatio}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1:1">1:1 (Square)</SelectItem>
                      <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                      <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                      <SelectItem value="4:3">4:3 (Standard)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {modality === 'image' && (
                <>
                  <div className="space-y-3">
                    <label className="text-sm text-zinc-600">Negative Prompt</label>
                    <Input value={negativePrompt} onChange={(e) => setNegativePrompt(e.target.value)} placeholder="e.g., blurry, low quality" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm text-zinc-600">Seed</label>
                    <Input value={seed} onChange={(e) => setSeed(e.target.value)} placeholder="Random" type="number" />
                  </div>
                </>
              )}

              {modality === 'video' && (
                <>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600">Motion Strength</span>
                      <span className="font-medium">{motionStrength[0]}</span>
                    </div>
                    <Slider value={motionStrength} onValueChange={(v) => setMotionStrength(v as number[])} max={100} step={1} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm text-zinc-600">Duration</label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5s">5 Seconds</SelectItem>
                        <SelectItem value="10s">10 Seconds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {modality === 'audio' && (
                <>
                  <div className="space-y-3">
                    <label className="text-sm text-zinc-600">Voice ID</label>
                    <Select value={voiceId} onValueChange={setVoiceId}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alloy">Alloy (Neutral)</SelectItem>
                        <SelectItem value="echo">Echo (Male)</SelectItem>
                        <SelectItem value="nova">Nova (Female)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600">Speed</span>
                      <span className="font-medium">{speed[0]}x</span>
                    </div>
                    <Slider value={speed} onValueChange={(v) => setSpeed(v as number[])} min={0.5} max={2.0} step={0.1} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600">Pitch</span>
                      <span className="font-medium">{pitch[0]}</span>
                    </div>
                    <Slider value={pitch} onValueChange={(v) => setPitch(v as number[])} min={-20} max={20} step={1} />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Generate Button */}
          <div className="p-4 border-t border-zinc-200 bg-zinc-50 shrink-0">
            <Button 
              className="w-full h-12 text-base font-medium bg-zinc-900 hover:bg-zinc-800 text-white"
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  Generate ({currentCost} credits)
                </>
              )}
            </Button>
            <p className="text-[10px] text-center text-zinc-500 mt-2 flex items-center justify-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Credits will be deducted upon generation
            </p>
          </div>
        </div>

        {/* Right Panel: Output & History */}
        <div className="flex-1 flex flex-col bg-[#0f111a] text-zinc-300 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <div className="h-12 border-b border-zinc-800 flex items-center px-4 shrink-0 bg-[#1a1d27]">
              <TabsList className="bg-transparent border-none p-0 h-auto gap-4">
                <TabsTrigger 
                  value="preview" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:border-b-2 border-indigo-500 rounded-none px-0 py-3 text-zinc-400"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger 
                  value="code"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:border-b-2 border-indigo-500 rounded-none px-0 py-3 text-zinc-400"
                >
                  <Code className="h-4 w-4 mr-2" />
                  API Request
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden relative">
              <TabsContent value="preview" className="h-full m-0 border-none p-0 data-[state=active]:flex flex-col">
                {isGenerating ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
                    <Loader2 className="h-8 w-8 animate-spin mb-4 text-indigo-500" />
                    <p>Processing your request...</p>
                  </div>
                ) : output ? (
                  <div className="flex-1 p-6 overflow-y-auto flex items-center justify-center">
                    {modality === 'text' && (
                      <div className="w-full max-w-3xl bg-[#1a1d27] p-6 rounded-xl border border-zinc-800 text-zinc-200 leading-relaxed">
                        {output}
                      </div>
                    )}
                    {modality === 'image' && (
                      <div className="relative group">
                        <img src={output} alt="Generated" className="max-w-full max-h-[60vh] rounded-xl shadow-2xl" />
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                          <Button size="icon" variant="secondary" className="bg-black/50 hover:bg-black/70 text-white border-none">
                            <Maximize2 className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="secondary" className="bg-black/50 hover:bg-black/70 text-white border-none">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    {modality === 'video' && (
                      <div className="w-full max-w-3xl bg-black rounded-xl overflow-hidden shadow-2xl">
                        <video src={output} controls autoPlay loop muted className="w-full h-auto" />
                      </div>
                    )}
                    {modality === 'audio' && (
                      <div className="w-full max-w-xl bg-[#1a1d27] p-8 rounded-xl border border-zinc-800 flex flex-col items-center gap-6">
                        <div className="w-full h-24 bg-zinc-800 rounded-lg flex items-center justify-center overflow-hidden relative">
                          {/* Mock Waveform */}
                          <div className="flex items-center gap-1 h-12 px-4 w-full justify-center">
                            {Array.from({ length: 40 }).map((_, i) => (
                              <div key={i} className="w-1.5 bg-indigo-500 rounded-full" style={{ height: `${Math.max(10, Math.random() * 100)}%` }}></div>
                            ))}
                          </div>
                        </div>
                        <audio src={output} controls className="w-full" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-zinc-600">
                    {modality === 'text' ? <MessageSquare className="h-12 w-12 mb-4 opacity-20" /> :
                     modality === 'image' ? <ImageIcon className="h-12 w-12 mb-4 opacity-20" /> :
                     modality === 'video' ? <Video className="h-12 w-12 mb-4 opacity-20" /> :
                     <Music className="h-12 w-12 mb-4 opacity-20" />}
                    <p>Enter a prompt and click Generate to see the result</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="code" className="h-full m-0 border-none p-0 data-[state=active]:flex flex-col">
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="bg-[#1a1d27] rounded-xl border border-zinc-800 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-[#1e212b]">
                      <span className="text-xs font-mono text-zinc-400">POST /v1/models/{id || 'model'}/generate</span>
                      <Button variant="ghost" size="sm" className="h-6 text-xs text-zinc-400 hover:text-white">Copy</Button>
                    </div>
                    <pre className="p-4 text-sm font-mono text-zinc-300 overflow-x-auto">
                      <code>{getPayloadJson()}</code>
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </div>

            {/* History Module */}
            <PlaygroundHistory 
              history={history} 
              onSelect={(item) => {
                setModality(item.modality);
                setPrompt(item.prompt);
                setOutput(item.result);
                setActiveTab('preview');
              }} 
            />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
