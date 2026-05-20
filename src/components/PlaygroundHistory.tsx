import React from 'react';
import { History, AlertCircle, Music, RotateCcw, Image as ImageIcon, Video, Mic, MessageSquare, Download, ScrollText, CopyPlus, Info } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useTranslation } from 'react-i18next';
import { HistoryItem } from '@/pages/Playground';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface PlaygroundHistoryProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export function PlaygroundHistory({ history, onSelect }: PlaygroundHistoryProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDownload = (result: string | string[]) => {
    const urls = Array.isArray(result) ? result : [result];
    urls.forEach((url, index) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated_media_${index}`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="h-[260px] bg-white shrink-0 flex flex-col shadow-[0_-4px_20px_rgba(0,0,0,0.02)] z-20">
      <div className="flex items-center justify-between px-6 py-2.5 bg-zinc-50/80 border-b border-zinc-100 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-zinc-500" />
          <span className="text-sm font-bold text-zinc-800 tracking-tight">Generation History</span>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-3.5 w-3.5 text-zinc-400 cursor-help hover:text-zinc-600 transition-colors" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[240px] text-xs space-y-1.5 p-3">
              <p><strong>{t("Restore:")}</strong> {t("恢复当前生成的参数配置")}</p>
              <p><strong>{t("Download:")}</strong> {t("下载生成的内容(7天内可下载)")}</p>
              <p><strong>{t("Logs:")}</strong> {t("跳转到这条请求对应的API日志页面")}</p>
            </TooltipContent>
          </Tooltip>
          <Badge variant="secondary" className="bg-zinc-200 text-zinc-600 px-1.5 py-0 h-5 text-[10px] ml-1">{history.length}</Badge>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-[11px] font-medium text-zinc-500 flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5" />
            Records and assets are kept for 7 days
          </p>
          <Button variant="ghost" size="sm" className="h-7 text-xs text-zinc-500 hover:text-red-600 hover:bg-red-50">Clear All</Button>
        </div>
      </div>

      <ScrollArea className="flex-1 w-full relative">
        <div className="flex flex-col p-4 gap-2">
          {history.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 min-h-[160px]">
              <p className="text-sm font-medium">No recent generations</p>
            </div>
          ) : (
            history.map(item => {
              const imageCount = item.params?.n || 1;
              const usdCost = (item.cost * 0.001).toFixed(3); // Assuming 1000 credits = $1 for demo

              return (
                <div 
                  key={item.id} 
                  className="w-full flex items-center gap-4 p-2 rounded-lg border border-zinc-200 hover:border-blue-400 hover:bg-zinc-50 transition-all group bg-white"
                >
                  {/* Thumbnail */}
                  <div className="w-[80px] h-[56px] rounded bg-zinc-100 overflow-hidden relative shrink-0 border border-zinc-200">
                    {item.modality === 'image' && <img src={Array.isArray(item.result) ? item.result[0] : item.result} alt="preview" className="w-full h-full object-cover" />}
                    {(item.modality === 'video' || (typeof item.result === 'string' && item.result.endsWith('.mp4'))) && (
                      <>
                        <video src={Array.isArray(item.result) ? item.result[0] : item.result} className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <Video className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </>
                    )}
                    {item.modality === 'text' && (
                      <div className="p-2 w-full h-full flex items-center justify-center relative bg-blue-50/50">
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                      </div>
                    )}
                    {item.modality === 'audio' && (
                      <div className="w-full h-full flex items-center justify-center bg-indigo-50/50">
                        <Mic className="h-5 w-5 text-indigo-400" />
                      </div>
                    )}
                    <div className="absolute top-0 right-0 bg-black/60 text-white text-[8px] px-1 py-0.5 rounded-bl font-medium tracking-wider uppercase backdrop-blur-md">
                      {item.modality}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-3 flex flex-col gap-0.5">
                      <div className="text-xs font-semibold text-zinc-900 truncate" title={item.modelId || item.id}>
                        {item.modelId || item.id}
                      </div>
                      <div className="text-[10px] text-zinc-500">
                        {new Date(item.timestamp).toLocaleString(undefined, {
                          month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'
                        })}
                      </div>
                    </div>
                    
                    <div className="col-span-3 flex flex-col gap-0.5 border-l border-zinc-100 pl-4">
                      {item.modality === 'image' ? (
                        <div className="text-xs text-zinc-700 flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{imageCount} {imageCount > 1 ? 'Images' : 'Image'}</span>
                        </div>
                      ) : (
                        <div className="text-xs text-zinc-700 flex items-center gap-1.5">
                          {item.modality === 'video' && <Video className="w-3.5 h-3.5 text-zinc-400" />}
                          {item.modality === 'audio' && <Music className="w-3.5 h-3.5 text-zinc-400" />}
                          {item.modality === 'text' && <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />}
                          <span className="capitalize">{item.modality}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="col-span-3 flex flex-col gap-0.5 border-l border-zinc-100 pl-4">
                      <div className="text-xs font-mono text-zinc-700">
                        {item.cost} <span className="text-[10px] text-zinc-500 font-sans">credits</span>
                      </div>
                      <div className="text-[10px] text-zinc-500">
                        ≈ ${usdCost} USD
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pr-2 shrink-0 border-l border-zinc-100 pl-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="cursor-pointer">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-blue-600 hover:bg-blue-50" onClick={() => {
                            onSelect(item);
                            if (item.params) {
                              navigator.clipboard.writeText(JSON.stringify(item.params, null, 2));
                            } else {
                              navigator.clipboard.writeText(item.prompt);
                            }
                          }}>
                            <CopyPlus className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{t('Restore & Copy Params')}</TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger className="cursor-pointer">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50" onClick={() => handleDownload(item.result)}>
                            <Download className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{t('Download Content')}</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger className="cursor-pointer">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50" onClick={() => navigate('/logs')}>
                            <ScrollText className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{t('View in Logs')}</TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger className="cursor-pointer">
                          <Button variant="outline" size="sm" className="ml-2 h-8 text-xs font-medium bg-zinc-50 hover:bg-zinc-100" onClick={() => {
                            const urls = Array.isArray(item.result) ? item.result : [item.result];
                            urls.forEach(url => window.open(url, '_blank'));
                          }}>
                            <RotateCcw className="w-3 h-3 mr-1.5" /> Open
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[200px] text-center">
                          {t('打开 (同时能在详情页中进行三张图片的轮播或查看)')}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
