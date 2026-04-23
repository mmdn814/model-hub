import React from 'react';
import { History, AlertCircle, Music, RotateCcw, Image as ImageIcon, Video, Mic, MessageSquare } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useTranslation } from 'react-i18next';
import { HistoryItem } from '@/pages/Playground';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PlaygroundHistoryProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export function PlaygroundHistory({ history, onSelect }: PlaygroundHistoryProps) {
  const { t } = useTranslation();

  return (
    <div className="h-[220px] bg-white shrink-0 flex flex-col shadow-[0_-4px_20px_rgba(0,0,0,0.02)] z-20">
      <div className="flex items-center justify-between px-6 py-2.5 bg-zinc-50/80 border-b border-zinc-100 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-zinc-500" />
          <span className="text-sm font-bold text-zinc-800 tracking-tight">Generation History</span>
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

      <ScrollArea className="flex-1 w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 p-4 h-full items-center">
          {history.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 min-w-[300px]">
              <p className="text-sm font-medium">No recent generations</p>
            </div>
          ) : (
            history.map(item => (
              <div 
                key={item.id} 
                className="w-[200px] h-full flex flex-col gap-2 p-2 rounded-xl border border-zinc-200 hover:border-blue-400 hover:shadow-md bg-white transition-all group shrink-0 relative"
              >
                {/* Preview Thumbnail */}
                <div className="h-[90px] w-full rounded-lg bg-zinc-100 overflow-hidden relative flex items-center justify-center border border-zinc-100 group-hover:border-blue-200 transition-colors">
                  {item.modality === 'image' && <img src={item.result} alt="preview" className="w-full h-full object-cover" />}
                  {item.modality === 'video' && (
                    <>
                      <video src={item.result} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20">
                          <Video className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </>
                  )}
                  {item.modality === 'text' && (
                    <div className="p-3 w-full h-full relative">
                      <MessageSquare className="w-4 h-4 text-blue-300 absolute top-2 left-2" />
                      <p className="text-[10px] text-zinc-600 leading-relaxed max-w-[140px] pl-6 h-full text-wrap line-clamp-4">
                        {item.result.slice(0, 80)}...
                      </p>
                    </div>
                  )}
                  {item.modality === 'audio' && (
                    <div className="flex flex-col items-center justify-center gap-1.5 opacity-60">
                      <Mic className="h-5 w-5 text-indigo-500" />
                      <span className="text-[10px] font-bold text-indigo-600 tracking-wider">AUDIO</span>
                    </div>
                  )}

                  {/* Play/Replay Button Overlay */}
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" className="h-7 text-[10px] bg-blue-600 hover:bg-blue-700 text-white shadow-sm" onClick={() => onSelect(item)}>
                      <RotateCcw className="w-3 h-3 mr-1" /> Replay
                    </Button>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex-1 flex flex-col justify-between px-1">
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 font-medium">
                    <span>{new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-mono">{item.cost} credits</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-semibold text-zinc-700 truncate">
                      {item.id}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>
    </div>
  );
}
