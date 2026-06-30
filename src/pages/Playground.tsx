import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  MessageSquare, Image as ImageIcon, Video, Music, 
  Wand2, Play, Code, Eye, History, Upload, Settings2,
  ChevronLeft, Coins, AlertCircle, Download, Maximize2,
  Loader2, Star, Info, HelpCircle, X, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslation, Trans } from 'react-i18next';
import { cn } from '@/lib/utils';

import { PlaygroundHistory } from '@/components/PlaygroundHistory';
import { ChatTemplate } from '@/components/playground-templates/ChatTemplate';
import { TextToImageTemplate } from '@/components/playground-templates/TextToImageTemplate';
import { ImageToImageTemplate } from '@/components/playground-templates/ImageToImageTemplate';
import { TextToVideoTemplate } from '@/components/playground-templates/TextToVideoTemplate';
import { ImageToVideoTemplate } from '@/components/playground-templates/ImageToVideoTemplate';
import { TextToSpeechTemplate } from '@/components/playground-templates/TextToSpeechTemplate';
import { Seedance20Template } from '@/components/playground-templates/Seedance20Template';
import { models } from '@/data/models';

export type Modality = 'text' | 'image' | 'video' | 'audio';

export interface HistoryItem {
  id: string;
  modelId: string;
  modality: Modality;
  prompt: string;
  result: string | string[];
  cost: number;
  timestamp: number;
  params?: any;
}

const examples = {
  text: {
    prompt: "Explain quantum computing in simple terms.",
    output: "Quantum computing is a rapidly-emerging technology that harnesses the laws of quantum mechanics to solve problems too complex for classical computers.\n\nUnlike traditional computers that use bits (0s and 1s), quantum computers use quantum bits or 'qubits'. These qubits can exist in multiple states simultaneously, a property known as superposition. This allows quantum computers to process a vast number of possibilities at once."
  },
  image: {
    prompt: "A futuristic cyberpunk city at night, neon lights, flying cars, highly detailed, 8k resolution.",
    output: [
      "https://picsum.photos/seed/cyberpunk1/800/600",
      "https://picsum.photos/seed/cyberpunk2/800/600",
      "https://picsum.photos/seed/cyberpunk3/800/600"
    ]
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

const ParamTooltip = ({ name, type, required = false, desc, options, defaultValue }: any) => (
  <TooltipProvider delay={200}>
    <Tooltip>
      <TooltipTrigger className="ml-1.5 cursor-help inline-flex align-middle rounded-full bg-orange-500 text-white w-3.5 h-3.5 items-center justify-center font-bold text-[9px] hover:bg-orange-600 transition-colors shadow-sm focus:outline-none">
        ?
      </TooltipTrigger>
      <TooltipContent side="right" align="start" className="max-w-[280px] p-0 overflow-hidden border border-zinc-200 bg-white shadow-md">
        <div className="bg-zinc-50 border-b border-zinc-100 px-3 py-2 font-semibold text-zinc-800 text-xs text-left">
          {name}
        </div>
        <div className="p-3 space-y-2 text-xs leading-relaxed text-zinc-600 font-medium text-left">
          <p><span className="text-zinc-400 mr-1">说明：</span>{desc}</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <p><span className="text-zinc-400 block text-[10px] mb-0.5">组件类型</span>{type}</p>
            <p><span className="text-zinc-400 block text-[10px] mb-0.5">是否必填</span><span className={required ? "text-amber-600" : "text-emerald-600"}>{required ? '是 (Yes)' : '否 (No)'}</span></p>
          </div>
          {options && <p className="pt-1"><span className="text-zinc-400 block text-[10px] mb-0.5">可选值</span>{options}</p>}
          {defaultValue !== undefined && <p className="pt-1"><span className="text-zinc-400 block text-[10px] mb-0.5">默认值</span>{defaultValue}</p>}
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const TemplatesTooltip = () => (
  <TooltipProvider delay={200}>
    <Tooltip>
      <TooltipTrigger className="cursor-help inline-flex align-middle items-center gap-1.5 text-zinc-600 hover:text-orange-600 transition-colors text-xs font-medium bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded-full border border-orange-200">
        <span className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-[10px] leading-none shrink-0 shadow-sm">?</span>
        <span>了解 6 套模板机制</span>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="start" className="max-w-[420px] p-0 overflow-hidden border border-zinc-200 shadow-xl z-50 bg-white">
        <div className="bg-zinc-50 border-b border-zinc-100 px-4 py-3 font-semibold text-zinc-800 text-sm">
          灵活的 6 套 UI 动态渲染模板
        </div>
        <div className="p-4 space-y-3 text-xs leading-relaxed text-zinc-600">
          <p>为了覆盖目前平台所有的模型能力和参数接口规范，Playground 在底层被设计为 6 套动态渲染机制。左侧面板会根据模型的具体生成范式自动切换字段：</p>
          <ul className="space-y-2 list-none p-0 m-0">
            <li><strong className="text-zinc-800">1. 对话补全 (Chat Completion)</strong><br/><span className="text-zinc-500">用于普通对话、代码、多模态图文对话及Tools调用。</span></li>
            <li><strong className="text-zinc-800">2. 文生图 (Text-to-Image)</strong><br/><span className="text-zinc-500">纯文本生成视觉内容，需配置画面比例与分辨率。</span></li>
            <li><strong className="text-zinc-800">3. 图生图/编辑 (Image-to-Image)</strong><br/><span className="text-zinc-500">引入 Input Assets 提供垫图、遮罩上传，用于局部重绘等限制生成。</span></li>
            <li><strong className="text-zinc-800">4. 文生视频 (Text-to-Video)</strong><br/><span className="text-zinc-500">文本驱动视频，参数包含时间长度、画面清晰度及生成音频选项。</span></li>
            <li><strong className="text-zinc-800">5. 图生视频 (Image-to-Video)</strong><br/><span className="text-zinc-500">交互复杂度极高，支持单图或多图参考帧控制，及运镜强度调节。</span></li>
            <li><strong className="text-zinc-800">6. 语音合成 (Text-to-Speech)</strong><br/><span className="text-zinc-500">文本长转语音，支持精准控制音色、情感指令甚至语种识别。</span></li>
          </ul>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const GenerateFlowTooltip = () => (
  <TooltipProvider delay={200}>
    <Tooltip>
      <TooltipTrigger className="ml-1.5 cursor-help inline-flex align-middle items-center justify-center p-0 w-3.5 h-3.5 focus:outline-none">
        <Info className="w-3.5 h-3.5 text-zinc-400 hover:text-orange-500 transition-colors" />
      </TooltipTrigger>
      <TooltipContent side="top" align="center" className="max-w-[380px] p-0 overflow-hidden border border-zinc-200 shadow-xl z-50 bg-white">
        <div className="bg-zinc-50 border-b border-zinc-100 px-3 py-2.5 font-semibold text-zinc-800 text-xs">
          Generate 执行与计费流程
        </div>
        <div className="p-3.5 space-y-2.5 text-xs leading-relaxed text-zinc-600 text-left">
          <p><strong className="text-zinc-800">步骤一 (校验登录):</strong> 若监测到未登录，会阻断并弹出登录提示框，要求前往 Auth 页面。(在此Demo场景下，“前往登录”按钮被接上了一个模拟成功的恢复操作，点击验证后会自动触发下一步。)</p>
          <p><strong className="text-zinc-800">步骤二 (校验余额):</strong> 用户检查登录后，系统调用预估接口获取当前请求预估的credits并显示，当余额不足时，会拦截掉并弹出充值提示弹窗。</p>
          <p><strong className="text-zinc-800">步骤三 (快捷 API Key 拦截):</strong> 非常核心的一点。文本输入框自带了一个默认的极简取名比如 playground-test，用户只要点“确认创建自动选中”，生成的新 Key 会推送到选择器上下文，创建的key也同时写入api keys页面，创建的key就是默认选项</p>
          <p><strong className="text-zinc-800">步骤四 (最终二次确认生成):</strong> 当 API Key 准备妥当时，最后弹出本次扣费请求确认的 API Key 切换层，选中指定 Key 后点击“确认并生成”，随后关闭弹窗无缝开启 Generate 状态以及返回结果。</p>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default function Playground({ inline = false, modelId }: { inline?: boolean, modelId?: string }) {
  const params = useParams();
  const id = modelId || params.id;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const currentModel = models.find(m => m.id === id);
  const playgroundType = (currentModel as any)?.playgroundType || 'chat_completion';

  // Mock model data based on ID or default
  const [modality, setModality] = useState<Modality>('text');
  const [balance, setBalance] = useState(12500);
  
  // Inputs
  const [prompt, setPrompt] = useState(examples.text.prompt);
  const [chatImages, setChatImages] = useState<string[]>([]);
  
  // Chat params
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [topP, setTopP] = useState([1.0]);
  const [stream, setStream] = useState(false);
  const [thinkingEnable, setThinkingEnable] = useState(false);
  const [enableSearch, setEnableSearch] = useState(false);
  const [stopWords, setStopWords] = useState('');
  const [toolChoice, setToolChoice] = useState('none');
  const [toolsJson, setToolsJson] = useState('[]');

  // Image params
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [n, setN] = useState(1);
  const [negativePrompt, setNegativePrompt] = useState('');
  const [seed, setSeed] = useState('');
  const [responseFormat, setResponseFormat] = useState('url');
  const [watermark, setWatermark] = useState(false);
  const [promptExtend, setPromptExtend] = useState(false);
  const [thinkingMode, setThinkingMode] = useState(false);
  const [sequentialGeneration, setSequentialGeneration] = useState(false);
  
  // Video params
  const [duration, setDuration] = useState('5s');
  const [resolution, setResolution] = useState('1080p');
  const [generateAudio, setGenerateAudio] = useState(false);
  const [draftMode, setDraftMode] = useState(false);
  const [cameraFixed, setCameraFixed] = useState(false);
  const [returnLastFrame, setReturnLastFrame] = useState(false);
  const [motionStrength, setMotionStrength] = useState([50]);

  // Audio / TTS params
  const [voiceId, setVoiceId] = useState('alloy');
  const [speed, setSpeed] = useState([1.0]);
  const [pitch, setPitch] = useState([0]);
  const [instructions, setInstructions] = useState('');
  const [optimizeInstructions, setOptimizeInstructions] = useState(false);
  const [language, setLanguage] = useState('auto');
  const [audioFormat, setAudioFormat] = useState('mp3');
  const [streamAudio, setStreamAudio] = useState(false);
  
  // Flow states
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [apiKeys, setApiKeys] = useState<{name: string, value: string}[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>('');
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [showCreateKeyModal, setShowCreateKeyModal] = useState(false);
  const [showSelectKeyModal, setShowSelectKeyModal] = useState(false);
  
  const [newKeyName, setNewKeyName] = useState('playground-test');
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // State
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string | string[] | null>(examples.text.output);
  const [restoredParams, setRestoredParams] = useState<any>(null);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      modelId: 'qwen3-max',
      modality: 'text',
      prompt: examples.text.prompt,
      result: examples.text.output,
      cost: 15,
      timestamp: Date.now() - 1000 * 60 * 5,
    },
    {
      id: '2',
      modelId: 'wan2.7-image-pro',
      modality: 'image',
      prompt: examples.image.prompt,
      result: examples.image.output,
      cost: 50,
      timestamp: Date.now() - 1000 * 60 * 60,
      params: { n: 3 }
    },
    {
      id: '3',
      modelId: 'wan2.7-t2v',
      modality: 'video',
      prompt: examples.video.prompt,
      result: examples.video.output,
      cost: 500,
      timestamp: Date.now() - 1000 * 60 * 60 * 2,
    },
    {
      id: '4',
      modelId: 'qwen3-tts-instruct-flash',
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

  useEffect(() => {
    if (currentModel) {
      if (currentModel.category === 'image') handleModalityChange('image');
      else if (currentModel.category === 'video') handleModalityChange('video');
      else if (currentModel.category === 'audio') handleModalityChange('audio');
      else handleModalityChange('text');
    }
  }, [currentModel]);

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

  const executeGenerate = () => {
    setIsGenerating(true);
    setOutput(null);
    setActiveTab('preview');

    // Mock API call
    setTimeout(() => {
      let mockResult: string | string[] = '';
      switch (modality) {
        case 'text':
          mockResult = "This is a simulated response from the model based on your prompt: " + prompt;
          break;
        case 'image':
          if (n > 1) {
            mockResult = Array.from({ length: n }).map((_, i) => "https://picsum.photos/seed/" + Math.random() + "/800/600?i=" + i);
          } else {
            mockResult = "https://picsum.photos/seed/" + Math.random() + "/800/600";
          }
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
        modelId: currentModel?.id || 'default',
        modality,
        prompt,
        result: mockResult,
        cost: currentCost,
        timestamp: Date.now(),
        params: JSON.parse(getPayloadJson())
      }, ...prev].slice(0, 20)); // Keep last 20
      
      setIsGenerating(false);
    }, 2000);
  };

  const handleValidateAndGenerate = (actionCb: () => void) => {
    // Check mock states based on playground type
    if (playgroundType === 'chat_completion') {
      setShowLoginModal(true);
      return;
    }
    
    if (playgroundType === 'text_to_image') {
      setShowBillingModal(true);
      return;
    }
    
    if (playgroundType === 'image_to_image') {
      setShowCreateKeyModal(true);
      return;
    }
    
    // For others
    if (apiKeys.length === 0) {
      setApiKeys([{name: 'local-test', value: 'sk-123'}]);
      setSelectedKey('sk-123');
    }
    setPendingAction(() => actionCb);
    setShowSelectKeyModal(true);
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    
    const newKey = {
      name: newKeyName,
      value: `sk-${Math.random().toString(36).substr(2, 12)}`
    };
    
    const updatedKeys = [...apiKeys, newKey];
    setApiKeys(updatedKeys);
    setSelectedKey(newKey.value);
    setNewKeyName('');
    setShowCreateKeyModal(false);
    
    setTimeout(() => {
      setShowSelectKeyModal(true);
    }, 150);
  };

  const handleConfirmKeySelection = () => {
    if (!selectedKey) return;
    setShowSelectKeyModal(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleLoginConfirm = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const getPayloadJson = () => {
    const base = {
      model: id || 'default-model',
    };

    switch (playgroundType) {
      case 'chat_completion':
        return JSON.stringify({ 
          ...base, 
          messages: [{ role: 'user', content: prompt }],
          temperature: temperature[0], 
          max_tokens: maxTokens,
          top_p: topP[0],
          stream,
          thinking: { enable: thinkingEnable },
          enable_search: enableSearch,
          stop: stopWords ? stopWords.split(',').map(s => s.trim()) : undefined
        }, null, 2);
      case 'text_to_image':
        return JSON.stringify({ 
          ...base,
          prompt, 
          aspect_ratio: aspectRatio,
          n,
          negative_prompt: negativePrompt || undefined,
          seed: seed ? Number(seed) : undefined, 
          response_format: responseFormat,
          watermark,
          prompt_extend: promptExtend,
          thinking_mode: thinkingMode,
          sequential_generation: sequentialGeneration
        }, null, 2);
      case 'image_to_image':
        return JSON.stringify({
          ...base,
          input_assets: [], // Mocked
          prompt,
          aspect_ratio: aspectRatio,
          n,
          negative_prompt: negativePrompt || undefined,
          seed: seed ? Number(seed) : undefined,
          response_format: responseFormat,
          watermark
        }, null, 2)
      case 'text_to_video':
        return JSON.stringify({ 
          ...base,
          prompt, 
          duration,
          resolution,
          aspect_ratio: aspectRatio, 
          negative_prompt: negativePrompt || undefined,
          seed: seed ? Number(seed) : undefined, 
          watermark,
          prompt_extend: promptExtend,
          generate_audio: generateAudio,
          draft: draftMode,
          camera_fixed: cameraFixed,
          return_last_frame: returnLastFrame
        }, null, 2);
      case 'image_to_video':
        return JSON.stringify({ 
          ...base,
          input_assets: [], // Mocked
          prompt, 
          duration,
          resolution,
          aspect_ratio: aspectRatio, 
          motion_strength: motionStrength[0],
          negative_prompt: negativePrompt || undefined,
          seed: seed ? Number(seed) : undefined, 
          watermark
        }, null, 2);
      case 'text_to_speech':
        return JSON.stringify({ 
          ...base,
          input: prompt, 
          voice: voiceId, 
          speed: speed[0], 
          pitch: pitch[0], 
          instructions: instructions || undefined,
          optimize_instructions: optimizeInstructions,
          language_type: language,
          response_format: audioFormat,
          stream: streamAudio
        }, null, 2);
      default:
        return JSON.stringify(base, null, 2);
    }
  };

  return (
    <div className={cn("flex flex-col bg-zinc-50 overflow-hidden", inline ? "h-[800px]" : "h-[calc(100vh-4rem)]")}>
      {/* Header */}
      {!inline && (
      <header className="h-14 bg-white border-b border-zinc-200 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/models')} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
              {currentModel?.providerLogo || 'AI'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Link to={`/models/${id}`} className="font-semibold text-sm hover:underline">{currentModel?.name || id || 'seedance-1-0-pro-fast'}</Link>
                <Badge variant="secondary" className="text-[10px] h-5 px-1.5">{currentModel?.provider || 'Provider'}</Badge>
              </div>
              <p className="text-xs text-zinc-500">{currentModel?.description || 'High-performance multimodal generation model'}</p>
            </div>
          </div>
          <div className="pl-2 border-l border-zinc-200 h-8 flex items-center ml-2">
            <TemplatesTooltip />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Button variant="outline" size="sm" onClick={() => navigate(`/models/${id}`)} className="h-8 text-xs border-zinc-200">
            <FileText className="w-3.5 h-3.5 mr-1.5" />
            {t("Model Details")}
          </Button>
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
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          {playgroundType === 'chat_completion' && <ChatTemplate model={currentModel} restoredParams={restoredParams} onValidate={handleValidateAndGenerate} onAddHistory={(item) => setHistory(prev => [item, ...prev].slice(0, 20))} />}
          {playgroundType === 'text_to_image' && <TextToImageTemplate model={currentModel} restoredParams={restoredParams} onValidate={handleValidateAndGenerate} onAddHistory={(item) => setHistory(prev => [item, ...prev].slice(0, 20))} />}
          {playgroundType === 'image_to_image' && <ImageToImageTemplate model={currentModel} restoredParams={restoredParams} onValidate={handleValidateAndGenerate} onAddHistory={(item) => setHistory(prev => [item, ...prev].slice(0, 20))} />}
          {playgroundType === 'text_to_video' && <TextToVideoTemplate model={currentModel} restoredParams={restoredParams} onValidate={handleValidateAndGenerate} onAddHistory={(item) => setHistory(prev => [item, ...prev].slice(0, 20))} />}
          {playgroundType === 'image_to_video' && <ImageToVideoTemplate model={currentModel} restoredParams={restoredParams} onValidate={handleValidateAndGenerate} onAddHistory={(item) => setHistory(prev => [item, ...prev].slice(0, 20))} />}
          {playgroundType === 'text_to_speech' && <TextToSpeechTemplate model={currentModel} restoredParams={restoredParams} onValidate={handleValidateAndGenerate} onAddHistory={(item) => setHistory(prev => [item, ...prev].slice(0, 20))} />}
          {playgroundType === 'seedance_2_0' && <Seedance20Template model={currentModel} restoredParams={restoredParams} onValidate={handleValidateAndGenerate} onAddHistory={(item) => setHistory(prev => [item, ...prev].slice(0, 20))} />}
        </div>
        {playgroundType !== 'chat_completion' && (
          <PlaygroundHistory 
            history={history.filter(h => h.modelId === currentModel?.id)} 
            onSelect={(item) => {
              if (item.params) {
                setRestoredParams(item.params);
              } else {
                setPrompt(item.prompt);
              }
            }} 
          />
        )}
      </div>

      {/* Modals for Flow */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('Login Required')}</DialogTitle>
            <DialogDescription>{t('You appear to be logged out. Please log in to use model generation features.')}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowLoginModal(false)}>{t('Cancel')}</Button>
            <Button onClick={handleLoginConfirm}>{t('Go to Login')}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showBillingModal} onOpenChange={setShowBillingModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('Insufficient Balance')}</DialogTitle>
            <DialogDescription>{t('Your account balance is insufficient to pay for this generation')} ({currentCost} Credits). {t('Please recharge your account.')}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowBillingModal(false)}>{t('Cancel')}</Button>
            <Button onClick={() => { setShowBillingModal(false); navigate('/billing'); }}>{t('Go to Billing')}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateKeyModal} onOpenChange={setShowCreateKeyModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('Quick Create API Key')}</DialogTitle>
            <DialogDescription>
              {t('Estimated Credits Needed', { credits: currentCost })}
            </DialogDescription>
          </DialogHeader>
          <div className="py-2 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('Key Name Identifier')}</label>
              <Input value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder={t('Key Name Placeholder')} />
            </div>
            <p className="text-xs text-zinc-500">
              <Trans i18nKey="Create Key Instruction">
                该请求需要您先创建 API Key，稍后您可以在 <Link to="/api-keys" className="text-indigo-600 hover:underline">API Keys</Link> 页面中管理。
              </Trans>
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateKeyModal(false)}>{t('Cancel')}</Button>
              <Button onClick={handleCreateKey} disabled={!newKeyName.trim()}>
                {t('Confirm Create & Generate')}
              </Button>
            </div>
            <p className="text-[10px] text-zinc-500 text-center">
              {t('Estimated Value Note')}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSelectKeyModal} onOpenChange={setShowSelectKeyModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('Select API Key Title')}</DialogTitle>
            <DialogDescription>{t('Select API Key Description', { credits: currentCost })}</DialogDescription>
          </DialogHeader>
          <div className="py-2 space-y-4">
            <Select value={selectedKey} onValueChange={setSelectedKey}>
              <SelectTrigger>
                <SelectValue placeholder={t('Select API Key Placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {apiKeys.map(k => (
                  <SelectItem key={k.value} value={k.value}>
                    <div className="flex items-center justify-between w-[250px]">
                      <span className="font-medium text-sm">{k.name}</span>
                      <span className="text-xs text-zinc-500 font-mono ml-2">...{k.value.slice(-4)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowSelectKeyModal(false)}>{t('Cancel Generation')}</Button>
              <Button onClick={handleConfirmKeySelection} disabled={!selectedKey}>{t('Confirm & Generate')}</Button>
            </div>
            <p className="text-[10px] text-zinc-500 text-center">
              {t('Estimated Value Note')}
            </p>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
