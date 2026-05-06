import { useState } from "react";
import { useAssets, AssetType } from "@/contexts/AssetContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image as ImageIcon, Video, Wand2, HardDrive, Clock, FileType2, Tag, Trash2, Pencil, Check, X, Loader2, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

export default function Assets() {
  const { assets, updateAsset, deleteAsset } = useAssets();
  const [activeTab, setActiveTab] = useState("all");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filterAssets = (type?: AssetType) => {
    if (!type) return assets;
    return assets.filter(a => a.type === type);
  };

  const formatBytes = (bytes: number = 0, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const handleRenameSubmit = async (id: string) => {
    if (editingName.trim()) {
      await updateAsset(id, editingName.trim());
    }
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteAsset(id);
    } finally {
      setDeletingId(null);
    }
  };

  const AssetGrid = ({ items }: { items: any[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((asset) => (
        <div key={asset.id} className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm flex flex-col hover:border-purple-300 transition-colors">
          <div className="aspect-video bg-zinc-100 flex items-center justify-center relative overflow-hidden">
            {asset.type === 'image' ? (
              <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
            ) : asset.type === 'video' ? (
              <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-white">
                <Video className="w-10 h-10 opacity-50" />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-purple-50 text-purple-600">
                <Wand2 className="w-10 h-10 opacity-50" />
              </div>
            )}
            <div className="absolute top-2 right-2 bg-black/60 rounded px-2 py-1 text-[10px] text-white backdrop-blur-md font-medium uppercase shadow-sm tracking-wider">
              {asset.type}
            </div>
            {deletingId === asset.id && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10 transition-opacity">
                <div className="bg-white rounded-full p-2 shadow-lg text-red-500 flex items-center gap-2 px-4 shadow-red-500/20">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs font-semibold">Deleting via Adoraod API...</span>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2 h-7">
              {editingId === asset.id ? (
                <div className="flex items-center gap-1 w-full relative z-20">
                  <Input 
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRenameSubmit(asset.id);
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    autoFocus
                    className="h-7 text-xs px-2 shadow-sm focus-visible:ring-purple-400"
                  />
                  <button onClick={() => handleRenameSubmit(asset.id)} className="p-1 hover:bg-green-100 text-green-600 rounded transition-colors" title="Save">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => setEditingId(null)} className="p-1 hover:bg-zinc-200 text-zinc-500 rounded transition-colors" title="Cancel">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-sm font-semibold text-zinc-900 truncate" title={asset.name}>{asset.name}</span>
                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-1 shrink-0">
                    <Tooltip>
                      <TooltipTrigger 
                        type="button"
                        onClick={() => {
                          setEditingId(asset.id);
                          setEditingName(asset.name);
                        }}
                        className="p-1.5 hover:bg-purple-100 text-purple-600 rounded-md transition-colors cursor-pointer border-none bg-transparent"
                      >
                        <Pencil className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent><p>Rename Asset</p></TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger 
                        type="button"
                        onClick={() => handleDelete(asset.id)}
                        disabled={deletingId === asset.id}
                        className="p-1.5 hover:bg-red-100 text-red-600 rounded-md transition-colors cursor-pointer disabled:opacity-50 border-none bg-transparent"
                      >
                        <Trash2 className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[280px]">
                        <p>删除需要调adorado的接口，返回成功后在当前资产库删除此资产</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-500">
              <div className="flex items-center gap-1.5" title="Asset ID">
                <Tag className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                <span className="truncate">{asset.id}</span>
              </div>
              <div className="flex items-center gap-1.5" title="File Size">
                <HardDrive className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                <span className="truncate">{formatBytes(asset.size)}</span>
              </div>
              <div className="flex items-center gap-1.5" title="Upload Time">
                <Clock className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                <span className="truncate">{new Date(asset.createdAt).toLocaleString(undefined, {
                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}</span>
              </div>
              <div className="flex items-center gap-1.5" title="File Type">
                <FileType2 className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                <span className="truncate uppercase">{asset.type}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {items.length === 0 && (
         <div className="col-span-full py-16 text-center text-zinc-500 text-sm border-2 border-dashed border-zinc-200 rounded-xl">
           No assets found.
         </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 flex items-center gap-2">
          Asset Library
          <Tooltip>
            <TooltipTrigger type="button" className="cursor-pointer border-none bg-transparent p-0 flex items-center justify-center">
              <Info className="w-5 h-5 text-zinc-400 hover:text-purple-500 transition-colors" />
            </TooltipTrigger>
            <TooltipContent className="max-w-sm p-4 space-y-2 bg-white text-zinc-900 border border-zinc-200 shadow-xl">
              <p className="font-semibold text-sm border-b pb-2">技术接入提示：</p>
              <ol className="list-decimal pl-4 text-xs space-y-2 text-zinc-700">
                <li><strong>资产获取（查询列表）</strong><br/><span className="text-zinc-500">页面/组件初始化时，需请求 Adoraod API 获取当前用户的资产列表（支持按 image/video/audio 分页或分类筛选），返回含有 asset_id 的详情信息。</span></li>
                <li><strong>资产重命名</strong><br/><span className="text-zinc-500">无需请求adorado直接修改</span></li>
                <li><strong>资产删除（已添加待优化）</strong><br/><span className="text-zinc-500">需调用 Adoraod API 执行删除 (Delete Asset) 操作，必须等待接口返回成功后（200 OK），才能在当前前端维护的资产列表状态中移除该项。</span></li>
              </ol>
            </TooltipContent>
          </Tooltip>
        </h1>
        <p className="text-sm text-zinc-500">Manage all your uploaded references across generative models.</p>
      </div>

      <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 text-sm text-purple-800">
        <h3 className="font-semibold mb-1 flex items-center gap-2">How to use your Asset Library</h3>
        <p>
          Whenever you upload new materials (images, videos, or audio) in Seedance 2.0, they are automatically secured and saved here. You can easily reuse these assets from your library in future creations without needing to re-upload them, accelerating your workflow and keeping your references organized.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="image"><ImageIcon className="w-4 h-4 mr-2"/> Image</TabsTrigger>
          <TabsTrigger value="video"><Video className="w-4 h-4 mr-2"/> Video</TabsTrigger>
          <TabsTrigger value="audio"><Wand2 className="w-4 h-4 mr-2"/> Audio</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <AssetGrid items={filterAssets()} />
        </TabsContent>
        <TabsContent value="image">
         <AssetGrid items={filterAssets('image')} />
        </TabsContent>
        <TabsContent value="video">
         <AssetGrid items={filterAssets('video')} />
        </TabsContent>
        <TabsContent value="audio">
         <AssetGrid items={filterAssets('audio')} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
