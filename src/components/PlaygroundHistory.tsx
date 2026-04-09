import React from 'react';
import { History, AlertCircle, Music } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslation } from 'react-i18next';
import { HistoryItem } from '@/pages/Playground';

interface PlaygroundHistoryProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export function PlaygroundHistory({ history, onSelect }: PlaygroundHistoryProps) {
  const { t } = useTranslation();

  return (
    <div className="h-48 border-t border-zinc-800 bg-[#1a1d27] shrink-0 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/50">
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
          <History className="h-4 w-4" />
          {t("History")}
        </div>
        <p className="text-[10px] text-zinc-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {t("Records and assets are kept for 7 days, and can be downloaded within 7 days")}
        </p>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex gap-4 p-4">
          {history.length === 0 ? (
            <div className="w-full text-center text-sm text-zinc-600 py-8">
              {t("No recent generations")}
            </div>
          ) : (
            history.map(item => (
              <div key={item.id} className="w-40 shrink-0 group cursor-pointer" onClick={() => onSelect(item)}>
                <div className="aspect-video bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 group-hover:border-indigo-500 transition-colors relative">
                  {item.modality === 'image' && <img src={item.result} alt="" className="w-full h-full object-cover" />}
                  {item.modality === 'video' && <video src={item.result} className="w-full h-full object-cover" />}
                  {item.modality === 'text' && <div className="p-2 text-[8px] text-zinc-400 line-clamp-4">{item.result}</div>}
                  {item.modality === 'audio' && <div className="w-full h-full flex items-center justify-center"><Music className="h-6 w-6 text-zinc-600" /></div>}
                  
                  <div className="absolute top-1 right-1 bg-black/60 rounded px-1 py-0.5 text-[8px] text-white">
                    {item.cost} cr
                  </div>
                </div>
                <p className="text-xs text-zinc-400 mt-1.5 truncate group-hover:text-zinc-200">{item.prompt}</p>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
