import { useState, useRef } from "react";
import { useAssets, AssetType } from "@/contexts/AssetContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image as ImageIcon, Video, Wand2, HardDrive, Clock, FileType2, Tag, Trash2, Pencil, Check, X, Loader2, Info, Upload, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AssetAgreementDialog } from "@/components/AssetAgreementDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type UploadingFile = {
  id: string;
  name: string;
  type: AssetType;
  status: 'uploading' | 'error';
  errorMessage?: string;
  size: number;
  file: File;
  previewUrl?: string;
};

export default function Assets() {
  const { assets, updateAsset, deleteAsset, addAsset, hasSignedAgreement, signAgreement } = useAssets();
  const [activeTab, setActiveTab] = useState("all");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([
    {
      id: "demo-uploading-1",
      name: "demo_video_processing.mp4",
      type: "video",
      status: "uploading",
      size: 1024 * 1024 * 15,
      file: new File([""], "demo_video_processing.mp4"),
    },
    {
      id: "demo-error-1",
      name: "invalid_format_image.gif",
      type: "image",
      status: "error",
      errorMessage: "File format not supported.",
      size: 1024 * 500,
      file: new File([""], "invalid_format_image.gif"),
    }
  ]);
  const [legalDialogOpen, setLegalDialogOpen] = useState(false);
  const [previewAsset, setPreviewAsset] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleUploadClick = () => {
    if (!hasSignedAgreement) {
      setLegalDialogOpen(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleLegalAccept = () => {
    signAgreement();
    setLegalDialogOpen(false);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (files.length > 10) {
      alert("You can only upload up to 10 files at once.");
      e.target.value = '';
      return;
    }

    const newUploads = files.map(f => {
      let type: AssetType = 'image';
      if (f.type.startsWith('video/')) type = 'video';
      else if (f.type.startsWith('audio/')) type = 'audio';

      return {
        id: `temp-${Math.random().toString(36).substring(2, 9)}`,
        name: f.name,
        type,
        status: 'uploading' as const,
        size: f.size,
        file: f,
        previewUrl: URL.createObjectURL(f),
      };
    });

    setUploadingFiles(prev => [...newUploads, ...prev]);
    e.target.value = '';

    for (const file of newUploads) {
      try {
        await new Promise(r => setTimeout(r, 1500 + Math.random() * 2000));
        
        // Randomly fail sometimes for demo
        const isError = Math.random() < 0.1; 
        if (isError) {
          setUploadingFiles(prev => prev.map(u => u.id === file.id ? { ...u, status: 'error', errorMessage: 'Network error or invalid format.' } : u));
          continue;
        }

        await addAsset({ type: file.type, name: file.name, url: file.previewUrl!, size: file.size });
        setUploadingFiles(prev => prev.filter(u => u.id !== file.id));
      } catch (err) {
        setUploadingFiles(prev => prev.map(u => u.id === file.id ? { ...u, status: 'error', errorMessage: 'Unexpected error.' } : u));
      }
    }
  };

  const removeUploadingFile = (id: string) => {
    setUploadingFiles(prev => prev.filter(u => u.id !== id));
  };

  const getCombinedItems = (typeFilter?: AssetType) => {
    const filteredUploads = typeFilter ? uploadingFiles.filter(u => u.type === typeFilter) : uploadingFiles;
    const filteredAssets = filterAssets(typeFilter);
    return [...filteredUploads, ...filteredAssets];
  };

  const AssetGrid = ({ items }: { items: any[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((asset) => {
        const isUploading = asset.status === 'uploading';
        const isError = asset.status === 'error';
        const isTemp = isUploading || isError;

        return (
        <div key={asset.id} className={cn("group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm flex flex-col transition-colors", isTemp ? "" : "hover:border-purple-300")}>
          <div 
            className={cn("aspect-video bg-zinc-100 flex items-center justify-center relative overflow-hidden", !isTemp && "cursor-pointer")}
            onClick={() => !isTemp && setPreviewAsset(asset)}
          >
            {asset.type === 'image' ? (
              <img src={asset.previewUrl || asset.url} alt={asset.name} className={cn("w-full h-full object-cover", isTemp && "opacity-50 grayscale")} />
            ) : asset.type === 'video' ? (
              <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-white">
                <Video className={cn("w-10 h-10 opacity-50", isTemp && "opacity-20")} />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-purple-50 text-purple-600">
                <Wand2 className={cn("w-10 h-10 opacity-50", isTemp && "opacity-20")} />
              </div>
            )}
            
            <div className={`absolute top-2 right-2 rounded px-2 py-1 text-[10px] text-white backdrop-blur-md font-medium uppercase shadow-sm tracking-wider ${isError ? 'bg-red-500/80' : 'bg-black/60'}`}>
              {isError ? 'Failed' : isUploading ? 'Uploading...' : asset.type}
            </div>

            {isUploading && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10 flex-col gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                <span className="text-xs font-semibold text-purple-900">Uploading...</span>
              </div>
            )}

            {isError && (
              <Tooltip>
                <TooltipTrigger className="absolute inset-0 bg-red-50/80 backdrop-blur-sm flex items-center justify-center z-10 flex-col gap-2 p-4 text-center cursor-help border-none w-full h-full text-left">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                  <span className="text-xs font-semibold text-red-700 leading-tight">{asset.errorMessage || "Upload failed"}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>如果用户刷新页面上传错误的文件将不再显示在列表中</p>
                </TooltipContent>
              </Tooltip>
            )}

            {!isTemp && deletingId === asset.id && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10 transition-opacity">
                <div className="bg-white rounded-full p-2 shadow-lg text-red-500 flex items-center gap-2 px-4 shadow-red-500/20">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs font-semibold">Deleting via Adoraod API...</span>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2 h-7" title={asset.name}>
              {editingId === asset.id && !isTemp ? (
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
                  <span className={cn("text-sm font-semibold truncate", isError ? "text-red-900" : "text-zinc-900")}>{asset.name}</span>
                  {!isTemp ? (
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
                  ) : isError ? (
                    <button onClick={() => removeUploadingFile(asset.id)} className="p-1 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors shrink-0 flex items-center justify-center">
                      <X className="w-4 h-4" />
                    </button>
                  ) : null}
                </>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-500">
              <div className="flex items-center gap-1.5" title="File Size">
                <HardDrive className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                <span className="truncate">{formatBytes(asset.size)}</span>
              </div>
              <div className="flex items-center gap-1.5" title="File Type">
                <FileType2 className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                <span className="truncate uppercase">{asset.type}</span>
              </div>
              {!isTemp && (
                <>
                <div className="flex items-center gap-1.5" title="Upload Time">
                  <Clock className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">{new Date(asset.createdAt).toLocaleString(undefined, {
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}</span>
                </div>
                <div className="flex items-center gap-1.5" title="Asset ID">
                  <Tag className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                  <span className="truncate">{asset.id}</span>
                </div>
                </>
              )}
            </div>
          </div>
        </div>
        );
      })}
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 flex items-center gap-2">
            Asset Library
            <Tooltip>
              <TooltipTrigger type="button" className="cursor-pointer border-none bg-transparent p-0 flex items-center justify-center">
                <Info className="w-5 h-5 text-zinc-400 hover:text-purple-500 transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm p-4 space-y-2 bg-white text-zinc-900 border border-zinc-200 shadow-xl">
                <p className="font-semibold text-sm border-b pb-2">技术接入提示：</p>
                <ol className="list-decimal pl-4 text-xs space-y-2 text-zinc-700">
                  <li><strong>资产获取（查询列表）</strong><br/><span className="text-zinc-500">图片缩略图、视频封面、文件大小、名称由后端存储，不在调用adorado接口，只有当用户点击放大素材时候，才去请求adorado接口获取地址</span></li>
                  <li><strong>资产重命名</strong><br/><span className="text-zinc-500">无需请求adorado直接修改</span></li>
                  <li><strong>资产删除（已添加待优化）</strong><br/><span className="text-zinc-500">需调用 Adoraod API 执行删除 (Delete Asset) 操作，必须等待接口返回成功后（200 OK），才能在当前前端维护的资产列表状态中移除该项。</span></li>
                </ol>
              </TooltipContent>
            </Tooltip>
          </h1>
          
          <Tooltip>
            <TooltipTrigger type="button" onClick={handleUploadClick} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md h-9 px-4 py-2">
              <Upload className="w-4 h-4 mr-2" />
              Upload Assets
            </TooltipTrigger>
            <TooltipContent>
              <p>Max 10 files per upload</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger type="button" onClick={() => localStorage.removeItem("hasSignedSeedanceAgreement_v4")} className="ml-2 inline-flex items-center justify-center whitespace-nowrap text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 rounded-xl shadow-sm h-9 px-3">
              Reset Agreement (Debug)
            </TooltipTrigger>
            <TooltipContent>
              <p>为了方便你测试弹窗，点击此按钮可以清除你之前已经签署过的记录（清除后需刷新页面）</p>
            </TooltipContent>
          </Tooltip>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            multiple 
            accept="image/*,video/*,audio/*"
            onChange={handleFileChange}
          />
        </div>
        <p className="text-sm text-zinc-500">Manage all your uploaded references across generative models.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 mb-6 font-medium shadow-sm">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="w-full">
            <p className="font-bold text-amber-800">Important Notice: Assets uploaded to this library can ONLY be used with the Seedance 2.0 model.</p>
            <div className="mt-3 bg-amber-100/50 p-3 rounded-lg text-xs space-y-1.5 text-amber-800/90 font-normal">
              <p><strong>Images:</strong> jpeg, png, webp, bmp, tiff, gif, heic/heif. Ratio 0.4-2.5. 300-6000px. &lt; 30MB</p>
              <p><strong>Videos:</strong> mp4, mov. 480p/720p. 2-15s duration. 24-60fps. &le; 50MB</p>
              <p><strong>Audio:</strong> wav, mp3. 2-15s duration. &le; 15MB</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="image"><ImageIcon className="w-4 h-4 mr-2"/> Image</TabsTrigger>
          <TabsTrigger value="video"><Video className="w-4 h-4 mr-2"/> Video</TabsTrigger>
          <TabsTrigger value="audio"><Wand2 className="w-4 h-4 mr-2"/> Audio</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <AssetGrid items={getCombinedItems()} />
        </TabsContent>
        <TabsContent value="image">
         <AssetGrid items={getCombinedItems('image')} />
        </TabsContent>
        <TabsContent value="video">
         <AssetGrid items={getCombinedItems('video')} />
        </TabsContent>
        <TabsContent value="audio">
         <AssetGrid items={getCombinedItems('audio')} />
        </TabsContent>
      </Tabs>
      
      <AssetAgreementDialog 
        open={legalDialogOpen}
        onOpenChange={setLegalDialogOpen}
        onAccept={handleLegalAccept}
        onCancel={() => setLegalDialogOpen(false)}
      />

      <Dialog open={!!previewAsset} onOpenChange={(open) => !open && setPreviewAsset(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-zinc-800">
          <DialogHeader className="absolute top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-black/80 to-transparent">
            <DialogTitle className="text-white drop-shadow-md truncate pr-8">
              {previewAsset?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-[80vh] flex items-center justify-center bg-black/50">
             {previewAsset?.type === 'image' && (
               <img src={previewAsset.url} alt={previewAsset.name} className="max-w-full max-h-full object-contain" />
             )}
             {previewAsset?.type === 'video' && (
               <video src={previewAsset.url} controls autoPlay className="max-w-full max-h-full" />
             )}
             {previewAsset?.type === 'audio' && (
               <div className="w-full max-w-md p-8 bg-zinc-900 rounded-xl border border-zinc-800 flex flex-col items-center justify-center gap-6">
                 <Wand2 className="w-16 h-16 text-purple-500" />
                 <audio src={previewAsset.url} controls autoPlay className="w-full" />
               </div>
             )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
