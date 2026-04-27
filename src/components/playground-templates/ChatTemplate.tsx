import React, {  useState , useEffect } from 'react';
import { Settings2, Image as ImageIcon, Send, X, Bot, User, Wand2, Plus, GripVertical , Copy} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function ChatTemplate({ model, onValidate, onAddHistory }: { model: any, onValidate?: (cb: () => void) => void, onAddHistory?: (item: any) => void }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am ready to help. What would you like to discuss today?' }
  ]);
  const [input, setInput] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful AI assistant.');
  const [showSystem, setShowSystem] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  
  // Params
  const [temperature, setTemperature] = useState([0.7]);
  const [topP, setTopP] = useState([1.0]);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [stream, setStream] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [enableSearch, setEnableSearch] = useState(false);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    if (restoredParams) {
      if (restoredParams.messages && restoredParams.messages.length > 0) {
          // get the last user message
          const lastUser = restoredParams.messages[restoredParams.messages.length - 1];
          if (lastUser && lastUser.content) setInput(lastUser.content);
      }
      if (restoredParams.temperature !== undefined) setTemperature([restoredParams.temperature]);
      if (restoredParams.top_p !== undefined) setTopP([restoredParams.top_p]);
      if (restoredParams.max_tokens !== undefined) setMaxTokens(restoredParams.max_tokens);
      if (restoredParams.stream !== undefined) setStream(restoredParams.stream);
      if (restoredParams.enable_search !== undefined) setEnableSearch(restoredParams.enable_search);
      if (restoredParams.thinking && restoredParams.thinking.enable !== undefined) setThinking(restoredParams.thinking.enable);
    }
  }, [restoredParams]);

  const getPayload = () => ({
    model: model?.id,
    messages: [{ role: 'user', content: input }],
    temperature: temperature[0],
    top_p: topP[0],
    max_tokens: maxTokens,
    stream,
    enable_search: enableSearch,
    thinking: { enable: thinking }
  });

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(getPayload(), null, 2));
  };

  const handleSend = () => {
    if (onValidate) {
      onValidate(() => {
        if (!input.trim() && images.length === 0) return;
        doGenerate();
      });
    } else {
      if (!input.trim() && images.length === 0) return;
      doGenerate();
    }
  };

  const doGenerate = () => {
    const userContent = input;
    setMessages(prev => [...prev, { role: 'user', content: userContent }]);
    setInput('');
    setImages([]);
    
    // Mock response
    setTimeout(() => {
      const resp = 'This is a mocked stream response for ' + userContent;
      setMessages(prev => [...prev, { role: 'assistant', content: resp }]);
      
      if (onAddHistory) {
        onAddHistory({
          id: Date.now().toString(),
          modelId: model?.id,
          modality: 'text',
          prompt: userContent,
          result: resp,
          cost: 15,
          timestamp: Date.now(),
          params: getPayload()
        });
      }
    }, 1000);
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-zinc-50 relative">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* System Prompt Toggle */}
        <div className="px-4 py-2 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-zinc-500 hover:text-zinc-900"
            onClick={() => setShowSystem(!showSystem)}
          >
            <Settings2 className="w-4 h-4 mr-2" />
            {showSystem ? 'Hide System Prompt' : 'Set System Prompt'}
          </Button>
        </div>
        
        {showSystem && (
          <div className="p-4 border-b border-zinc-100 bg-zinc-50">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">System Prompt</label>
            <Textarea 
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="You are a helpful assistant..."
              className="min-h-[80px] bg-white resize-y"
            />
          </div>
        )}

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-3xl mx-auto space-y-6 pb-4">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-4", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", msg.role === 'user' ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600")}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={cn("px-4 py-3 rounded-2xl max-w-[80%]", msg.role === 'user' ? "bg-blue-600 text-white rounded-tr-sm" : "bg-zinc-100/80 text-zinc-800 rounded-tl-sm")}>
                  <p className="whitespace-pre-wrap leading-relaxed text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-zinc-100">
          <div className="max-w-3xl mx-auto relative border border-zinc-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-sm">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message the model... (Supports text and image upload)"
              className="min-h-[80px] max-h-[200px] border-0 focus-visible:ring-0 resize-none pb-12 shadow-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            
            {images.length > 0 && (
              <div className="absolute bottom-12 left-3 flex gap-2 overflow-x-auto">
                {images.map((img, i) => (
                  <div key={i} className="relative w-12 h-12 rounded-md border border-zinc-200 overflow-hidden group">
                    <img src={img} alt="upload" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-0 right-0 bg-black/60 text-white w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-md"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100"
                onClick={() => setImages(prev => [...prev, 'https://picsum.photos/seed/chat/150'])}
              >
                <ImageIcon className="w-4 h-4 mr-2" /> <span className="text-xs">Add Image</span>
              </Button>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100"
                  onClick={handleCopyJSON}
                  title="Copy JSON"
                >
                  <Copy className="w-3.5 h-3.5" />
                </Button>
                <Button 
                  size="sm" 
                  className="h-8 bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg"
                  onClick={handleSend}
                >
                  <Send className="w-3.5 h-3.5 mr-2" /> Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Params */}
      <div className="w-[320px] bg-white border-l border-zinc-200 flex flex-col shrink-0 overflow-y-auto">
        <div className="p-4 border-b border-zinc-100 flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-zinc-400" />
          <h3 className="font-semibold text-zinc-800 text-sm">Parameters</h3>
        </div>
        
        <div className="p-5 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-zinc-700">Temperature</label>
              <span className="text-xs text-zinc-500 font-mono">{temperature[0]}</span>
            </div>
            <Slider value={temperature} onValueChange={(v) => setTemperature(v as number[])} max={2} step={0.1} className="py-2" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-zinc-700">Top P</label>
              <span className="text-xs text-zinc-500 font-mono">{topP[0]}</span>
            </div>
            <Slider value={topP} onValueChange={(v) => setTopP(v as number[])} max={1} step={0.05} className="py-2" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-zinc-700">Max Tokens</label>
              <span className="text-xs text-zinc-500 font-mono">{maxTokens}</span>
            </div>
            <Input type="number" value={maxTokens} onChange={e => setMaxTokens(Number(e.target.value))} className="h-8 text-sm" />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="text-xs font-medium text-zinc-700">Stream Output</label>
            <Switch checked={stream} onCheckedChange={setStream} />
          </div>

          <div className="border-t border-zinc-100 pt-4 mt-4">
            <Button 
              variant="ghost" 
              className="w-full justify-between h-8 text-xs font-medium text-zinc-500 hover:text-zinc-900 px-0"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              Advanced Settings
              <Plus className={cn("w-3 h-3 transition-transform", showAdvanced && "rotate-45")} />
            </Button>
            
            {showAdvanced && (
              <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-top-2">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-700">Stop Sequence</label>
                  <Input placeholder="e.g. \n, User:" className="h-8 text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-700">Seed</label>
                  <Input type="number" placeholder="Random" className="h-8 text-xs" />
                </div>
                
                {isAlibaba && (
                  <div className="flex items-center justify-between pt-2">
                    <label className="text-xs font-medium text-zinc-700 flex items-center gap-1">
                      Web Search <Badge variant="secondary" className="text-[9px] px-1 py-0 h-4 bg-blue-50 text-blue-600 border-none">ALI</Badge>
                    </label>
                    <Switch checked={enableSearch} onCheckedChange={setEnableSearch} />
                  </div>
                )}
                
                {isZhipu && (
                  <div className="flex items-center justify-between pt-2">
                    <label className="text-xs font-medium text-zinc-700 flex items-center gap-1">
                      Thinking<Badge variant="secondary" className="text-[9px] px-1 py-0 h-4 bg-purple-50 text-purple-600 border-none">ZHIPU</Badge>
                    </label>
                    <Switch checked={thinking} onCheckedChange={setThinking} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
