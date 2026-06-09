import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAssets, AssetType } from "@/contexts/AssetContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image as ImageIcon, Video, Wand2, HardDrive, Clock, FileType2, Tag, Trash2, Pencil, Check, X, Loader2, Info, Upload, AlertCircle, AudioLines, Image, Plus, Library, ArrowLeft, RefreshCw, QrCode, Smartphone, ScanFace, ChevronRight, Languages, Copy, Book } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AssetAgreementDialog } from "@/components/AssetAgreementDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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

const CopyIdButton = ({ id }: { id: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className={cn("absolute top-3 right-3 px-2 py-1.5 bg-black/50 hover:bg-black/70 rounded-md backdrop-blur-md transition-all cursor-pointer", copied ? "opacity-100" : "opacity-0 group-hover:opacity-100")} 
      onClick={(e) => { 
        e.stopPropagation(); 
        navigator.clipboard.writeText(id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}>
       <span className="text-white text-xs font-mono font-medium flex items-center gap-1.5">
         {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />} 
         {copied ? "Copied successfully" : "Id"}
       </span>
    </div>
  );
};

const OfficialAssetGrid = ({ items, onPreview }: { items: typeof OFFICIAL_ASSETS, onPreview: (asset: any) => void }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {items.map((asset) => (
        <div key={asset.id} className="relative group cursor-pointer aspect-[3/4] rounded-2xl bg-zinc-100 ring-1 ring-zinc-200" onClick={() => onPreview({
          id: asset.id,
          name: asset.shortDesc,
          type: "image",
          url: asset.url,
          status: "done",
          size: 0,
          file: new File([], ''),
          official: true,
          biography: asset.biography,
          tags: asset.tags
        })}>
          <img src={asset.url} alt={asset.shortDesc} className="w-full h-full object-cover rounded-2xl" />
          
          <CopyIdButton id={asset.id} />
          
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none rounded-b-2xl"></div>
          
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <span className="text-white text-sm font-medium leading-tight max-w-[70%] line-clamp-2">{asset.tags.join(' • ')}</span>
            <div className="flex gap-2 items-center">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger 
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-md transition-colors relative cursor-pointer" 
                    onClick={(e) => { e.stopPropagation(); }}
                  >
                    <Book className="w-5 h-5 text-white" />
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={12} className="w-80 bg-white rounded-xl shadow-2xl ring-1 ring-zinc-200 p-5 text-left pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                      <div className="space-y-4">
                        <div>
                          <p className="text-zinc-500 text-xs mb-1">character tag</p>
                          <p className="text-zinc-900 text-sm font-medium">{asset.tags.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-zinc-500 text-xs mb-1">asset ID</p>
                          <div className="flex items-center gap-2 group/id">
                            <p className="text-zinc-900 text-sm font-medium truncate">{asset.id}</p>
                            <button onClick={() => navigator.clipboard.writeText(asset.id)} className="text-zinc-400 hover:text-zinc-600">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-blue-600 hover:underline text-xs mt-1 cursor-pointer w-fit" onClick={() => navigator.clipboard.writeText(asset.id)}>Generate and copy asset URIs</p>
                        </div>
                        <div>
                          <p className="text-zinc-500 text-xs mb-1">biography</p>
                          <p className="text-zinc-700 text-sm leading-relaxed whitespace-normal">{asset.biography}</p>
                        </div>
                      </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const OFFICIAL_ASSETS = [
  {
    id: "asset-20260225015229-d77t9",
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80",
    tags: ["United Kingdom", "male", "Model"],
    biography: "The 22-year-old British male model is an extremely perfect fit for street-style high-fashion shoots. He has a habit of whistling softly while waiting for his turn on set, and always spends his leisure time on the terrace of his apartment tending to the dozen or so ornamental pigeons he keeps.",
    shortDesc: "United Kingdom 22-year-old male"
  },
  {
    id: "asset-20260225015230-e88u0",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80",
    tags: ["France", "female", "Fashion"],
    biography: "A 24-year-old French female fashion model known for elegant editorial shoots. She enjoys vintage photography and often brings an old film camera to her sets.",
    shortDesc: "France 24-year-old female"
  },
  {
    id: "asset-20260225015231-f99v1",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
    tags: ["United States", "male", "Casual"],
    biography: "A 28-year-old American actor with a rugged, casual style perfect for lifestyle and outdoor campaigns. An avid surfer who spends his weekends on the coast.",
    shortDesc: "United States 28-year-old male"
  }
];

export default function Assets() {
  const location = useLocation();
  const { assets, updateAsset, deleteAsset, addAsset, hasSignedAgreement, signAgreement } = useAssets();
  const [mainTab, setMainTab] = useState((location.state as any)?.tab || "virtual");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteGroup, setConfirmDeleteGroup] = useState<any | null>(null);
  const [uploadGroupDetails, setUploadGroupDetails] = useState<{ id: string; name: string } | null>(null);

  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [legalDialogOpen, setLegalDialogOpen] = useState(false);
  const [previewAsset, setPreviewAsset] = useState<any | null>(null);
  const [selectedVirtualGroup, setSelectedVirtualGroup] = useState<any | null>(null);
  const [selectedRealHumanGroup, setSelectedRealHumanGroup] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Real human specific states
  const [rhSubTab, setRhSubTab] = useState<'created' | 'authorized'>('created');
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [h5DialogOpen, setH5DialogOpen] = useState(false);
  const [h5Step, setH5Step] = useState<'login' | 'auth' | 'live' | 'success' | 'upload' | 'upload_success'>('login');
  const [h5LiveStepStatus, setH5LiveStepStatus] = useState<'idle' | 'scanning' | 'done'>('idle');
  const [authAgreed, setAuthAgreed] = useState(false);
  const [h5ActionType, setH5ActionType] = useState<'auth_only' | 'auth_and_upload' | null>(null);
  const [simulateMismatch, setSimulateMismatch] = useState(false);
  const [showMismatchTips, setShowMismatchTips] = useState(false);
  const [rhFlowInfoOpen, setRhFlowInfoOpen] = useState(false);
  const [h5FlowInfoOpen, setH5FlowInfoOpen] = useState(false);
  const [h5UploadGroupName, setH5UploadGroupName] = useState("");
  const [h5UploadedAssets, setH5UploadedAssets] = useState<string[]>([]);
  const h5GroupCreatedRef = useRef(false);

  const [realHumanGroups, setRealHumanGroups] = useState([
    {
      id: "rh-1",
      name: "",
      assetCount: 1,
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
    }
  ]);

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

  const handleRenameSubmit = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (editingName.trim()) {
      if (id.startsWith('rh-')) {
        setRealHumanGroups(prev => prev.map(g => g.id === id ? { ...g, name: editingName.trim() } : g));
      } else {
        await updateAsset(id, editingName.trim());
      }
    }
    setEditingId(null);
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let assetToDelete = assets.find(a => a.id === id);
    if (!assetToDelete) {
      assetToDelete = realHumanGroups.find(a => a.id === id) as any;
    }
    if (assetToDelete) {
      setConfirmDeleteGroup(assetToDelete);
    }
  };

  const executeDelete = async () => {
    if (!confirmDeleteGroup) return;
    setDeletingId(confirmDeleteGroup.id);
    try {
      if (confirmDeleteGroup.id.startsWith('rh-')) {
        setRealHumanGroups(prev => prev.filter(g => g.id !== confirmDeleteGroup.id));
      } else {
        await deleteAsset(confirmDeleteGroup.id);
      }
    } finally {
      setDeletingId(null);
      setConfirmDeleteGroup(null);
    }
  };

  const handleUploadClick = () => {
    if (mainTab === 'real-human') {
      // For real-human, we want them to sign the agreement and see the QR code.
      if (!hasSignedAgreement) {
        setLegalDialogOpen(true);
      } else {
        setQrDialogOpen(true);
      }
    } else {
      if (!hasSignedAgreement) {
        setLegalDialogOpen(true);
      } else {
        fileInputRef.current?.click();
      }
    }
  };

  const handleH5Close = () => {
    if (!h5GroupCreatedRef.current) {
        if ((h5Step === 'success' || h5Step === 'upload' || h5Step === 'upload_success') && h5ActionType === 'auth_and_upload') {
            h5GroupCreatedRef.current = true;
            const newId = `rh-${Date.now()}`;
            const newAsset = {
              id: newId,
              name: h5UploadGroupName || "Unnamed Group",
              assetCount: h5UploadedAssets.length,
              url: h5UploadedAssets.length > 0 ? h5UploadedAssets[0] : "https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=500&q=80&blur=100"
            };
            setRealHumanGroups(prev => [newAsset, ...prev]);
        } else if (h5Step === 'success' && h5ActionType === 'auth_only') {
            h5GroupCreatedRef.current = true;
            const newId = `rh-${Date.now()}`;
            const newAsset = {
              id: newId,
              name: "Unnamed Group",
              assetCount: 0,
              url: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=500&q=80&blur=100"
            };
            setRealHumanGroups(prev => [newAsset, ...prev]);
        }
    }
    setRhSubTab('created');
    setAuthAgreed(false);
    setH5ActionType(null);
    setH5DialogOpen(false);
  };

  const handleLegalAccept = () => {
    signAgreement();
    setLegalDialogOpen(false);
    if (mainTab === 'real-human') {
      setQrDialogOpen(true);
    } else {
      fileInputRef.current?.click();
    }
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

      const baseName = f.name.replace(/\.[^/.]+$/, "");

      return {
        id: `temp-${Math.random().toString(36).substring(2, 9)}`,
        name: `${baseName}_group`,
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

  const removeUploadingFile = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setUploadingFiles(prev => prev.filter(u => u.id !== id));
  };

  const getCombinedItems = (typeFilter?: AssetType) => {
    const filteredUploads = typeFilter ? uploadingFiles.filter(u => u.type === typeFilter) : uploadingFiles;
    const filteredAssets = filterAssets(typeFilter);
    return [...filteredUploads, ...filteredAssets];
  };

  const VirtualAssetGrid = ({ items }: { items: any[] }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
      {/* Upload New Card */}
      <div 
        onClick={handleUploadClick}
        className="relative group overflow-hidden bg-zinc-50 border border-dashed border-zinc-300 flex flex-col items-center justify-center transition-all aspect-square outline outline-1 outline-offset-[-1px] outline-transparent hover:border-purple-400 hover:bg-purple-50 cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center gap-1 p-4 text-center">
          <div className="p-3 bg-white shadow-sm rounded-full group-hover:bg-purple-100 transition-colors mb-1">
            <Plus className="w-6 h-6 text-zinc-500 group-hover:text-purple-600" />
          </div>
          <span className="text-zinc-600 font-medium text-sm group-hover:text-purple-700">Add Virtual Portrait</span>
          <span className="text-zinc-400 text-xs mt-0.5">Create a new group and add assets</span>
        </div>
      </div>
      {items.map((asset) => {
        const isUploading = asset.status === 'uploading';
        const isError = asset.status === 'error';
        const isTemp = isUploading || isError;

        return (
          <div 
            key={asset.id} 
            className={cn(
              "relative group overflow-hidden bg-zinc-100 flex flex-col transition-all aspect-square outline outline-1 outline-offset-[-1px] outline-transparent hover:outline-zinc-300 hover:z-10", 
              !isTemp && "cursor-pointer"
            )}
            onClick={() => !isTemp && setSelectedVirtualGroup(asset)}
          >
            {asset.type === 'image' || asset.type === 'video' ? (
              <img src={asset.previewUrl || asset.url} alt={asset.name} className={cn("w-full h-full object-cover", isTemp && "opacity-50 grayscale")} />
            ) : (
              <div className="w-full h-full bg-purple-600 flex items-center justify-center relative overflow-hidden">
                <AudioLines className="w-24 h-24 text-white/50 animate-pulse drop-shadow-md" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
              </div>
            )}

            {/* Video/Audio Icon overlay */}
            {asset.type === 'video' && !isTemp && (
              <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
                 <Video className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            {asset.type === 'audio' && !isTemp && (
              <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
                 <AudioLines className="w-3.5 h-3.5 text-white" />
              </div>
            )}

            {/* Editing and Delete overlay */}
            {!isTemp && (
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-20">
                <Tooltip>
                  <TooltipTrigger
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadGroupDetails({ id: asset.id, name: asset.name });
                    }}
                    className="p-1.5 bg-white/80 hover:bg-white backdrop-blur-md text-purple-600 rounded-md shadow-sm transition-colors cursor-pointer border-none"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </TooltipTrigger>
                  <TooltipContent><p>Add Asset to Group</p></TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingId(asset.id);
                      setEditingName(asset.name);
                    }}
                    className="p-1.5 bg-white/80 hover:bg-white backdrop-blur-md text-zinc-700 rounded-md shadow-sm transition-colors cursor-pointer border-none"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </TooltipTrigger>
                  <TooltipContent><p>Rename Group</p></TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger
                    type="button"
                    onClick={(e) => handleDelete(asset.id, e)}
                    disabled={deletingId === asset.id}
                    className="p-1.5 bg-white/80 hover:bg-white backdrop-blur-md text-red-600 rounded-md shadow-sm transition-colors cursor-pointer disabled:opacity-50 border-none"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </TooltipTrigger>
                  <TooltipContent><p>Delete Group</p></TooltipContent>
                </Tooltip>
              </div>
            )}

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 pt-12 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none">
              {editingId === asset.id && !isTemp ? (
                <div className="flex items-center gap-1 w-full pointer-events-auto">
                  <Input 
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRenameSubmit(asset.id, e as any);
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    autoFocus
                    className="h-7 text-xs px-2 bg-white/90 text-zinc-900 border-none focus-visible:ring-1 focus-visible:ring-purple-400"
                  />
                  <button onClick={(e) => handleRenameSubmit(asset.id, e)} className="p-1.5 hover:bg-green-500/20 bg-black/40 text-green-400 rounded backdrop-blur-md transition-colors" title="Save">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setEditingId(null); }} className="p-1.5 hover:bg-zinc-500/20 bg-black/40 text-zinc-300 rounded backdrop-blur-md transition-colors" title="Cancel">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-0.5">
                  <span className={cn("text-white font-medium text-[13px] drop-shadow-md line-clamp-1 leading-tight w-11/12 min-h-[19px]", isError && "text-red-300")}>
                    {asset.name}
                  </span>
                  {!isTemp && !isError && (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-white/60 text-[10px] font-mono drop-shadow-md">
                        ID: {asset.id}
                      </span>
                      <span className="text-white/80 flex items-center gap-1 text-[11px] font-medium drop-shadow-md">
                        <Library className="w-3 h-3" /> Asset Group • {(asset.name.length % 5) + 3} items
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Uploading State overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10 flex-col gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-white" />
                <span className="text-[11px] font-medium text-white tracking-widest uppercase">Uploading</span>
              </div>
            )}

            {/* Error State overlay */}
            {isError && (
              <div className="absolute inset-0 bg-red-950/60 backdrop-blur-sm flex items-center justify-center z-10 flex-col p-4 text-center">
                <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                <span className="text-xs font-medium text-white leading-tight drop-shadow-md">{asset.errorMessage || "Upload failed"}</span>
                <button onClick={(e) => removeUploadingFile(asset.id, e)} className="mt-3 p-1.5 bg-red-500/20 hover:bg-red-500/40 text-red-100 rounded-full transition-colors shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Deleting State overlay */}
            {!isTemp && deletingId === asset.id && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10 transition-opacity">
                <div className="bg-black/60 rounded-full p-2 py-1.5 shadow-lg text-red-400 flex items-center gap-2 px-4 border border-red-500/20">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="text-[11px] font-medium tracking-wide">Deleting...</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
      {items.length === 0 && (
         <div className="col-span-full py-24 text-center text-zinc-500 text-sm border border-dashed border-zinc-200 rounded-xl">
           No assets found. Upload some to create virtual portrait groups.
         </div>
      )}
    </div>
  );

  const GroupDetail = ({ group, onBack, isRealHuman }: { group: any, onBack: () => void, isRealHuman?: boolean }) => {
    const [detailFilter, setDetailFilter] = useState<'All' | 'image' | 'video' | 'audio'>('All');
    
    // Merge uploading files mapping specifically to this group if implemented, or just show them generally.
    // For now we mock the group details based on the screenshot, and prepending any currently uploading files
    const mockDetailItems = [
      { id: `${group.id}-1`, name: 'Neon City Scape.png', type: 'image', size: 2.38 * 1024 * 1024, url: group.url || group.previewUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80', status: 'success', createdAt: 'May 11, 03:30 PM' },
      { id: `${group.id}-2`, name: 'Retro Computer.jpg', type: 'image', size: 1.72 * 1024 * 1024, url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80', status: 'success', createdAt: 'May 11, 03:28 PM' },
      { id: `${group.id}-3`, name: 'invalid_format_image.gif', type: 'image', size: 500 * 1024, url: '', status: 'error', errorMessage: 'File format not supported.' },
      { id: `${group.id}-4`, name: 'demo_video_processing.mp4', type: 'video', size: 15 * 1024 * 1024, url: '', status: 'uploading' },
      { id: `${group.id}-5`, name: 'Sample Reference Video (MP4)', type: 'video', size: 14.69 * 1024 * 1024, url: '', status: 'success', createdAt: 'May 11, 03:26 PM' },
      { id: `${group.id}-6`, name: 'Cyberpunk Beat (WAV)', type: 'audio', size: 4.01 * 1024 * 1024, url: '', status: 'success', createdAt: 'May 11, 03:25 PM' },
    ];

    const currentUploadsInDetail = uploadingFiles.map(u => ({
      ...u,
      createdAt: 'Just now',
    }));

    const allItems = [...currentUploadsInDetail, ...mockDetailItems];
    const filtered = allItems.filter(i => detailFilter === 'All' || i.type === detailFilter.toLowerCase());

    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full shadow-sm bg-white border border-zinc-200">
             <ArrowLeft className="w-4 h-4 text-zinc-600" />
          </Button>
          <div>
            <h2 className="text-xl font-bold text-zinc-900 leading-tight">{group.name || (isRealHuman ? 'Real Human Assets' : 'Group Assets')}</h2>
            <p className="text-zinc-500 text-sm">Manage assets in this group</p>
          </div>
          <div className="ml-auto">
             <Button onClick={() => setUploadGroupDetails({ id: group.id, name: group.name || (isRealHuman ? 'Real Human Assets' : 'Group Assets') })} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm rounded-lg px-4 h-9 font-medium text-sm">
               <Upload className="w-4 h-4 mr-2" /> Upload Assets
             </Button>
          </div>
        </div>

        {isRealHuman && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm px-4 py-3 rounded-xl flex items-start gap-2 shadow-sm">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p>
              <strong className="font-semibold text-blue-900">Note:</strong> All portraits uploaded to the same asset group must be of the same person.
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100/80 rounded-lg w-fit border border-zinc-200/50">
          {[
            { id: 'All', label: 'All', icon: null },
            { id: 'image', label: 'Image', icon: ImageIcon },
            { id: 'video', label: 'Video', icon: Video },
            { id: 'audio', label: 'Audio', icon: AudioLines }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setDetailFilter(f.id as any)}
              className={cn(
                "px-3.5 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2",
                detailFilter === f.id ? "bg-white text-zinc-950 shadow-sm border border-zinc-200/50" : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50 border border-transparent"
              )}
            >
              {f.icon && <f.icon className="w-4 h-4" />}
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
           {filtered.map(item => (
             <div key={item.id} className="border border-zinc-200/80 bg-white rounded-[14px] overflow-hidden shadow-sm flex flex-col group relative">
               <div className={cn("relative aspect-[5/3] bg-zinc-100/80 flex items-center justify-center overflow-hidden border-b border-zinc-100", item.status === 'error' && "bg-red-50/50")}>
                 {item.status === 'uploading' && (
                   <div className="flex flex-col items-center justify-center text-indigo-600 gap-3">
                     <RefreshCw className="w-8 h-8 animate-spin" />
                     <span className="text-sm font-semibold tracking-wide">Uploading...</span>
                   </div>
                 )}
                 {item.status === 'error' && (
                   <div className="flex flex-col items-center justify-center text-red-600 gap-3">
                     <AlertCircle className="w-8 h-8" />
                     <span className="text-sm font-semibold">{item.errorMessage || 'File format not supported.'}</span>
                   </div>
                 )}
                 {item.status !== 'error' && item.status !== 'uploading' && item.type === 'image' && (
                   <img src={item.url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80'} alt="" className="w-full h-full object-cover" />
                 )}
                 {item.status !== 'error' && item.status !== 'uploading' && item.type === 'video' && (
                   <div className="w-full h-full bg-zinc-800 flex items-center justify-center relative inner-shadow">
                     <Video className="w-10 h-10 text-white/50" />
                   </div>
                 )}
                 {item.status !== 'error' && item.status !== 'uploading' && item.type === 'audio' && (
                   <div className="w-full h-full bg-purple-50 flex items-center justify-center">
                     <Wand2 className="w-10 h-10 text-purple-400 rotate-45" />
                   </div>
                 )}
                 
                 {/* Type Badge */}
                 {item.status !== 'uploading' && item.status !== 'error' && (
                   <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white px-2 py-1 rounded tracking-widest uppercase">
                     {item.type}
                   </div>
                 )}
               </div>

               <div className="p-4 flex flex-col gap-4 bg-white relative">
                 <div className="flex items-start justify-between">
                   <h3 className={cn("text-[14px] font-bold line-clamp-1 flex-1 pr-2 tracking-tight", item.status === 'error' ? "text-red-600" : "text-zinc-900")} title={item.name}>{item.name}</h3>
                   {item.status === 'error' && (
                     <button className="text-zinc-400 hover:text-red-500 transition-colors p-0.5"><X className="w-4 h-4" /></button>
                   )}
                 </div>
                 
                 <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-auto opacity-70">
                   <div className="flex items-center gap-2 text-xs text-zinc-600 min-w-0">
                     <HardDrive className="w-3.5 h-3.5 shrink-0" />
                     <span className="truncate">{formatBytes(item.size)}</span>
                   </div>
                   <div className="flex items-center gap-2 text-xs text-zinc-600 min-w-0 uppercase font-medium">
                     {item.type === 'image' && <ImageIcon className="w-3.5 h-3.5 shrink-0" />}
                     {item.type === 'video' && <Video className="w-3.5 h-3.5 shrink-0" />}
                     {item.type === 'audio' && <AudioLines className="w-3.5 h-3.5 shrink-0" />}
                     <span className="truncate">{item.type}</span>
                   </div>
                   {item.createdAt && (
                     <div className="flex items-center gap-2 text-[11.5px] text-zinc-500 min-w-0 col-span-1">
                       <Clock className="w-3.5 h-3.5 shrink-0" />
                       <span className="truncate">{item.createdAt}</span>
                     </div>
                   )}
                   {item.id && item.status !== 'error' && item.status !== 'uploading' && (
                     <div className="flex items-center gap-2 text-[11.5px] text-zinc-500 min-w-0 col-span-1">
                       <Tag className="w-3.5 h-3.5 shrink-0" />
                       <span className="truncate">asset-{item.id.split('-')[1] || item.id}</span>
                     </div>
                   )}
                 </div>
               </div>
             </div>
           ))}
        </div>
      </div>
    );
  };

  const RealHumanGrid = () => {
    const filteredGroups = rhSubTab === 'created' ? realHumanGroups : [];
    
    return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center p-1 bg-zinc-100 rounded-lg w-fit border border-zinc-200/50 shadow-sm">
          <button
            onClick={() => setRhSubTab('created')}
            className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-all", rhSubTab === 'created' ? "bg-white text-zinc-950 shadow-sm border border-zinc-200/50" : "text-zinc-500 hover:text-zinc-700")}
          >
            Created
          </button>
          <button
            onClick={() => setRhSubTab('authorized')}
            className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-all", rhSubTab === 'authorized' ? "bg-white text-zinc-950 shadow-sm border border-zinc-200/50" : "text-zinc-500 hover:text-zinc-700")}
          >
            Authorized
          </button>
        </div>
        <Tooltip>
          <TooltipTrigger type="button" onClick={() => setRhFlowInfoOpen(true)} className="p-2 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100 transition-colors">
            <Info className="w-5 h-5" />
          </TooltipTrigger>
          <TooltipContent><p>流程说明</p></TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger type="button" onClick={() => setH5FlowInfoOpen(true)} className="p-2 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100 transition-colors">
            <Languages className="w-5 h-5" />
          </TooltipTrigger>
          <TooltipContent><p>H5中英文案</p></TooltipContent>
        </Tooltip>
      </div>
      
      {rhSubTab === 'authorized' && filteredGroups.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 bg-zinc-50 border border-zinc-100 rounded-xl">
          <ScanFace className="w-12 h-12 text-zinc-300 mb-4" />
          <p className="text-zinc-500 font-medium">No authorized assets found</p>
        </div>
      )}

      {(rhSubTab === 'created' || filteredGroups.length > 0) && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
          {rhSubTab === 'created' && (
            <div 
              onClick={handleUploadClick}
              className="relative group overflow-hidden bg-zinc-50 border border-dashed border-zinc-300 flex flex-col items-center justify-center transition-all aspect-[3/4] outline outline-1 outline-offset-[-1px] outline-transparent hover:border-purple-400 hover:bg-purple-50 cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center gap-1 p-4 text-center">
                <div className="p-3 bg-white shadow-sm rounded-full group-hover:bg-purple-100 transition-colors mb-1">
                  <Plus className="w-6 h-6 text-zinc-500 group-hover:text-purple-600" />
                </div>
                <span className="text-zinc-600 font-medium text-sm group-hover:text-purple-700">Add Real-human Asset</span>
                <span className="text-zinc-400 text-xs mt-0.5">Create a new group and add assets</span>
              </div>
            </div>
          )}
          
          {filteredGroups.map(asset => (
            <div 
              key={asset.id}
              className="relative group overflow-hidden bg-zinc-100 flex flex-col transition-all aspect-[3/4] outline outline-1 outline-offset-[-1px] outline-transparent hover:outline-zinc-300 hover:z-10 cursor-pointer"
              onClick={() => setSelectedRealHumanGroup(asset)}
            >
          <img 
            src={asset.url} 
            alt="Real Human" 
            className={cn("w-full h-full object-cover blur-[2px]", deletingId === asset.id && "opacity-50 grayscale")} 
          />
          
          {/* Hover Action overlay */}
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-20">
            <Tooltip>
              <TooltipTrigger
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setUploadGroupDetails({ id: asset.id, name: asset.name });
                }}
                className="p-1.5 bg-white/80 hover:bg-white backdrop-blur-md text-purple-600 rounded-md shadow-sm transition-colors cursor-pointer border-none"
              >
                <Plus className="w-3.5 h-3.5" />
              </TooltipTrigger>
              <TooltipContent><p>Add Asset to Group</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingId(asset.id);
                  setEditingName(asset.name);
                }}
                className="p-1.5 bg-white/80 hover:bg-white backdrop-blur-md text-zinc-700 rounded-md shadow-sm transition-colors cursor-pointer border-none"
              >
                <Pencil className="w-3.5 h-3.5" />
              </TooltipTrigger>
              <TooltipContent><p>Rename Group</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                type="button"
                onClick={(e) => handleDelete(asset.id, e)}
                disabled={deletingId === asset.id}
                className="p-1.5 bg-white/80 hover:bg-white backdrop-blur-md text-red-600 rounded-md shadow-sm transition-colors cursor-pointer disabled:opacity-50 border-none"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </TooltipTrigger>
              <TooltipContent><p>Delete Group</p></TooltipContent>
            </Tooltip>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 pt-12 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none">
            {editingId === asset.id ? (
                <div className="flex items-center gap-1 w-full pointer-events-auto">
                  <Input 
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRenameSubmit(asset.id, e as any);
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    autoFocus
                    className="h-7 text-xs px-2 bg-white/90 text-zinc-900 border-none focus-visible:ring-1 focus-visible:ring-purple-400"
                  />
                  <button onClick={(e) => handleRenameSubmit(asset.id, e)} className="p-1.5 hover:bg-green-500/20 bg-black/40 text-green-400 rounded backdrop-blur-md transition-colors" title="Save">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setEditingId(null); }} className="p-1.5 hover:bg-zinc-500/20 bg-black/40 text-zinc-300 rounded backdrop-blur-md transition-colors" title="Cancel">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
            ) : (
                <div className="flex flex-col gap-0.5">
                  <span className="text-white font-medium text-[13px] drop-shadow-md min-h-[19px]">
                    {asset.name}
                  </span>
                  <span className="text-white/60 text-[10px] font-mono drop-shadow-md">
                    ID: {asset.id}
                  </span>
                  <span className="text-white/80 flex items-center gap-1 text-[11px] font-medium drop-shadow-md">
                    <Library className="w-3 h-3" /> Asset Group • {asset.assetCount} item
                  </span>
                </div>
            )}
          </div>

          {/* Deleting State overlay */}
          {deletingId === asset.id && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10 transition-opacity">
              <div className="bg-black/60 rounded-full p-2 py-1.5 shadow-lg text-red-400 flex items-center gap-2 px-4 border border-red-500/20">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="text-[11px] font-medium tracking-wide">Deleting...</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
    )}
    </div>
  );
};

  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-6">
      <div className="flex flex-col gap-4">
        {/* Header Action Bar */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 flex items-center gap-2">
            Asset Library
            <Tooltip>
              <TooltipTrigger type="button" className="cursor-pointer border-none bg-transparent p-0 flex items-center justify-center">
                <Info className="w-5 h-5 text-zinc-400 hover:text-purple-500 transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="max-w-lg p-5 flex-col items-start space-y-4 bg-white text-zinc-900 border border-zinc-200 shadow-xl max-h-[85vh] overflow-y-auto">
                <p className="font-semibold text-sm border-b pb-2 w-full text-left">技术开发细节说明：</p>
                
                <div className="space-y-2 text-xs text-zinc-700 w-full text-left">
                  <p className="font-medium text-zinc-900 text-[13px]">用户首次使用资产库</p>
                  <ul className="list-disc pl-4 space-y-1.5 marker:text-zinc-400">
                    <li>看到的是real-human和virtual portrait的空页面，只显示各自的上传资产的按钮</li>
                    <li>当用户点击上传资产（无论是real-human和virtual portrait）都需要弹出用户协议，当用户同意协议后，才可以进行上传，或者认证行为</li>
                    <li>virtual portrait上传流程不变</li>
                    <li>real-huma新增</li>
                  </ul>
                </div>

                <div className="space-y-2 text-xs text-zinc-700 pt-3 border-t w-full text-left">
                  <p className="font-medium text-zinc-900 text-[13px]">用户非首次使用资产库/并且已经创建了资产组/上传了资产</p>
                  <p>显示用户的资产组卡片，每个资产组一个卡片。资产组卡片构成：</p>
                  <ol className="list-none pl-0 space-y-2 marker:text-zinc-400">
                    <li><strong className="font-medium">1、封面图</strong>：用户上传的首个素材作为封面图，图片就是图片，视频是封面图，音频是默认的图片</li>
                    <li><strong className="font-medium">2、资产组名称</strong>：virtual portrait默认显示用户上传的第一个素材名称+_group,例如用户上传的素材名称是001.png, 那当前组名称默认就是001_group<br/>real-human资产组名称默认是空的</li>
                    <li><strong className="font-medium">3、资产组ID</strong></li>
                    <li><strong className="font-medium">4、资产组的资产数量</strong></li>
                    <li><strong className="font-medium">5、功能</strong>：上传资产、修改名称、删除。
                      <ul className="list-none pl-4 mt-1.5 space-y-1.5 text-zinc-600">
                        <li>上传资产-往当前资产组中上传资产（和上期一致，需要带着当前资产组的ID）</li>
                        <li>修改名称-弹出修改名称的弹窗，可以修改资产组的名称，这里和上一期修改资产名称保持一致，保存在C端不用掉接口（参考 原型）</li>
                        <li>删除资产组-请求adorado的接口删除当前资产组，并会删除当前资产组下的所有资产，需要给客户二次确认弹窗</li>
                      </ul>
                    </li>
                    <li><strong className="font-medium">6、点击封面图</strong>：跳转到资产组的详情页</li>
                  </ol>
                </div>
              </TooltipContent>
            </Tooltip>
          </h1>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            multiple 
            accept="image/*,video/*,audio/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm px-4 py-3 rounded-lg flex items-start gap-2 shadow-sm">
          <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p>
            <strong className="font-semibold text-amber-900">Important Notice:</strong> Assets uploaded to this library can ONLY be used with the Seedance 2.0 model.
          </p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col md:flex-row gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-zinc-100 shadow-sm">
          <div className="flex-1 px-4 pt-4 md:pt-0 first:pl-0 first:pt-0 last:pr-0">
            <div className="flex items-center gap-2 mb-2">
              <ImageIcon className="w-4 h-4 text-indigo-500" />
              <h4 className="font-semibold text-zinc-900 text-sm">Images</h4>
            </div>
            <p className="text-[13px] text-zinc-500 leading-relaxed">
              JPEG, JPG, PNG, WebP, GIF, HEIC. &lt; 30MB. Ratio 0.4-2.5. 300-6000px.
            </p>
          </div>
          <div className="flex-1 px-4 pt-4 md:pt-0 first:pl-0 first:pt-0 last:pr-0">
            <div className="flex items-center gap-2 mb-2">
              <Video className="w-4 h-4 text-purple-500" />
              <h4 className="font-semibold text-zinc-900 text-sm">Videos</h4>
            </div>
            <p className="text-[13px] text-zinc-500 leading-relaxed">
              MP4, MOV. 480p/720p. 2-15s. &le; 50MB. 24-60fps.
            </p>
          </div>
          <div className="flex-1 px-4 pt-4 md:pt-0 first:pl-0 first:pt-0 last:pr-0">
            <div className="flex items-center gap-2 mb-2">
              <AudioLines className="w-4 h-4 text-emerald-500" />
              <h4 className="font-semibold text-zinc-900 text-sm">Audio</h4>
            </div>
            <p className="text-[13px] text-zinc-500 leading-relaxed">
              WAV, MP3. 2-15s. &le; 15MB. Studio quality preferred.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 border-b border-zinc-200 pb-0">
          <button
            onClick={() => setMainTab("real-human")}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors relative",
              mainTab === "real-human" ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 rounded-t-lg"
            )}
          >
            Real-human
            {mainTab === "real-human" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />
            )}
          </button>
          <button
            onClick={() => setMainTab("virtual")}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors relative",
              mainTab === "virtual" ? "text-zinc-900 bg-zinc-100 rounded-t-lg" : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 rounded-t-lg"
            )}
          >
            Virtual Portrait
            {mainTab === "virtual" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />
            )}
          </button>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setMainTab("official")}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors relative cursor-pointer",
              mainTab === "official" ? "text-zinc-900 bg-zinc-100 rounded-t-lg" : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 rounded-t-lg"
            )}
          >
            <div className="flex items-center gap-1.5">
              Official Library
              <Popover>
                <PopoverTrigger 
                  className="cursor-pointer text-xs font-semibold text-zinc-900 bg-amber-200/60 px-1.5 py-0.5 rounded border border-amber-300/50 hover:bg-amber-300/80 transition-colors inline-block" 
                  onClick={(e) => e.stopPropagation()} 
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  【202668 需求】
                </PopoverTrigger>
                <PopoverContent side="bottom" align="start" className="w-[480px] p-5 text-sm bg-white text-zinc-800 shadow-2xl border border-zinc-200/80 rounded-xl" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-col">
                    <p className="font-semibold text-zinc-900 mb-2">这一期的官方素材均来源于字节的官方虚拟人像图片素材</p>
                    
                    <div className="mt-3 mb-2 p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                      <p className="font-semibold text-zinc-900 mb-1.5">关于资产库的权限与来源</p>
                      <ol className="list-decimal space-y-1.5 text-zinc-600 ml-4">
                        <li>增加官方素材库<br/><span className="text-zinc-500">只有B端后台，开启官方素材库的用户并且在C端签署了《使用资产库》协议的用户才能看到官方素材库</span></li>
                        <li>官方素材库的素材来源于我们的服务器</li>
                        <li>官方素材库显示：资产标签、资产ID和资产描述，三个字段，这三个字段需要去字节后台的虚拟人像官方资产库提前抓取，并入到我们自己的库中</li>
                      </ol>
                    </div>

                    <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                      <p className="font-semibold text-zinc-900 mb-1.5">关于资产库在C端的显示（已有权限的情况下）：</p>
                      <ol className="list-decimal space-y-1.5 text-zinc-600 ml-4">
                        <li>显示素材图片的缩略图</li>
                        <li>缩略图上宣誓素材标签、详情的图标、复制ID图标</li>
                      </ol>
                      
                      <p className="font-semibold text-zinc-900 mt-3 mb-1.5">关于素材库图片的功能：</p>
                      <ol className="list-decimal space-y-1.5 text-zinc-600 ml-4">
                        <li>点击缩略图，显示当前素材的大图</li>
                        <li>鼠标悬停到【详情的图标】显示当前素材的tag、assetid和biography</li>
                        <li>鼠标点击【复制ID图标】复制当前素材的assetid</li>
                      </ol>
                    </div>

                    <div className="mt-3 p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                      <p className="font-semibold text-zinc-900 mb-1.5">关于官方素材的补充说明：</p>
                      <ul className="list-disc space-y-1.5 text-zinc-600 ml-4">
                        <li>如果当前用户有权限官方素材库,那么在seedance2.0的两个模型在选择素材的时候也需要能显示出来官方素材</li>
                        <li>官方素材可以作为一个资产组来看待</li>
                      </ul>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            {mainTab === "official" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />
            )}
          </div>
        </div>
      </div>

      {mainTab === "real-human" && !selectedRealHumanGroup && (
        <RealHumanGrid />
      )}

      {mainTab === "real-human" && selectedRealHumanGroup && (
        <GroupDetail group={selectedRealHumanGroup} onBack={() => setSelectedRealHumanGroup(null)} isRealHuman={true} />
      )}

      {mainTab === "virtual" && !selectedVirtualGroup && (
        <VirtualAssetGrid items={getCombinedItems()} />
      )}

      {mainTab === "virtual" && selectedVirtualGroup && (
        <GroupDetail group={selectedVirtualGroup} onBack={() => setSelectedVirtualGroup(null)} />
      )}
      
      {mainTab === "official" && (
        <OfficialAssetGrid items={OFFICIAL_ASSETS} onPreview={setPreviewAsset} />
      )}
      
      <AssetAgreementDialog 
        open={legalDialogOpen}
        onOpenChange={setLegalDialogOpen}
        onAccept={handleLegalAccept}
        onCancel={() => setLegalDialogOpen(false)}
      />

      {/* QR Code Dialog for Real Human Auth */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="max-w-md bg-white border-zinc-200 shadow-xl overflow-hidden">
          <DialogHeader className="pt-6 px-6 pb-2">
            <DialogTitle className="text-xl font-bold text-zinc-900 text-center">Scan to Authorize</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6 gap-6">
            <p className="text-zinc-500 text-sm text-center">
              Please scan this QR code with your mobile device to complete live human facial authorization.
            </p>
            <div 
              className="w-48 h-48 bg-white border-2 border-zinc-200 rounded-2xl flex items-center justify-center shadow-sm cursor-pointer hover:border-indigo-400 group transition-all"
              onClick={() => {
                setQrDialogOpen(false);
                setSimulateMismatch(false);
                setShowMismatchTips(false);
                setH5Step('login');
                setH5DialogOpen(true);
              }}
              title="Click to simulate normal scanning"
            >
              <QrCode className="w-32 h-32 text-zinc-800 group-hover:scale-105 transition-transform" />
            </div>
            
            <Button 
              variant="outline" 
              className="w-full text-zinc-600 border-zinc-300 hover:bg-zinc-100"
              onClick={() => {
                setQrDialogOpen(false);
                setSimulateMismatch(true);
                setShowMismatchTips(true); // Will show later in H5 view
                setH5Step('login');
                setH5DialogOpen(true);
              }}
            >
              临时验收账户不一致流程
            </Button>

            <div className="bg-amber-50 text-amber-800 border border-amber-200 text-xs px-4 py-3 rounded-lg flex gap-2 mt-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <p>For testing, click the QR code to simulate the normal mobile browser authorization flow, or test the mismatch flow via the button.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* H5 Mobile Simulation Dialog */}
      <Dialog open={h5DialogOpen} onOpenChange={(open) => {
        if (!open) {
          handleH5Close();
        } else {
          h5GroupCreatedRef.current = false;
          setH5UploadGroupName("");
          setH5UploadedAssets([]);
          setH5DialogOpen(true);
        }
      }}>
        <DialogContent className="p-0 border-none bg-transparent shadow-none w-full max-w-[375px]">
          <div className="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl border-[8px] border-zinc-900 relative overflow-hidden flex flex-col mx-auto shrink-0 select-none">
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50 pointer-events-none">
              <div className="w-32 h-6 bg-zinc-900 rounded-b-xl"></div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col relative overflow-y-auto">
              {h5Step === 'login' && (
                <div className="flex-1 flex flex-col p-6 animate-in fade-in zoom-in-95 duration-300 pt-20">
                  <div className="flex-1 flex flex-col items-center justify-center gap-8">
                    <div className="rounded-2xl w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <ScanFace className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-zinc-900">PowerTokens</h2>
                      <p className="text-zinc-500 mt-2 text-sm">Sign in to authorize your portrait</p>
                    </div>

                    <div className="w-full space-y-3 mt-4">
                      <Button onClick={() => setH5Step('auth')} className="w-full bg-zinc-900 text-white hover:bg-zinc-800 h-12 rounded-xl text-base font-medium">
                        Log in with GitHub
                      </Button>
                      <Button onClick={() => setH5Step('auth')} variant="outline" className="w-full border-zinc-200 hover:bg-zinc-50 text-zinc-800 h-12 rounded-xl text-base font-medium bg-white">
                        Log in with Google
                      </Button>
                    </div>

                    <p className="text-xs text-zinc-400 mt-8 text-center px-4 leading-relaxed">
                      By continuing, you agree to the Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </div>
              )}

              {h5Step === 'auth' && (
                <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
                  {showMismatchTips && (
                    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40 p-4 animate-in fade-in">
                      <div className="bg-white rounded-2xl p-6 w-full shadow-2xl relative mb-12">
                        <button 
                          onClick={() => setShowMismatchTips(false)}
                          className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                        <h4 className="text-lg font-bold text-center mb-4">Tips</h4>
                        <p className="text-zinc-600 text-[14px] leading-relaxed mb-6">
                          The platform has detected that the QR code account and the authorized account are inconsistent. The authorization will be granted to the QR code account (user@example.com).
                        </p>
                        <Button 
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 font-medium"
                          onClick={() => setShowMismatchTips(false)}
                        >
                          I already know
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="relative h-64 bg-zinc-900 shrink-0 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80" alt="Reference" className="w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <ScanFace className="w-24 h-24 text-white/30" />
                    </div>
                    <div className="absolute top-0 inset-x-0 pt-12 pb-4 bg-gradient-to-b from-black/50 to-transparent flex flex-col items-center justify-center pointer-events-none">
                       <span className="text-white drop-shadow-md text-sm font-medium tracking-wide">Portrait Management</span>
                    </div>
                  </div>

                  <div className="flex-1 bg-white -mt-4 relative rounded-t-2xl px-5 pt-6 pb-8 flex flex-col isolate">
                    <p className="text-xs font-semibold text-zinc-500 tracking-wider uppercase mb-1">Authorization Details</p>
                    <h3 className="text-xl font-bold text-zinc-900 mb-6">Real-Human Asset</h3>

                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 mb-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 bottom-0 w-1 bg-indigo-500 rounded-l-xl"></div>
                      <p className="text-[13px] text-zinc-700 leading-relaxed text-left">
                        {simulateMismatch 
                          ? <span>The platform has detected that the QR code account and the authorized account are <span className="font-semibold text-amber-600">inconsistent</span>. The authorization will be granted to the QR code account (<span className="font-semibold text-zinc-900">user@example.com</span>). The time limit is set to "permanent".</span>
                          : <span>The platform has detected that the QR code account and the authorized account are the same account (<span className="font-semibold text-indigo-800">user@example.com</span>). The time limit is set to "permanent".</span>
                        }
                      </p>
                    </div>

                    <div className="space-y-4 mb-8 text-[13px] text-zinc-600 leading-relaxed">
                      <p className="text-left text-zinc-500">
                        I consent to the use of materials uploaded via this account containing my likeness and/or voice for AI-generated content. Authorization scope, parties, and duration are governed by this account's actions. Any disputes shall be resolved by the relevant parties.
                      </p>
                      <label className="flex items-start gap-3 p-2 -ml-2 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer border border-transparent">
                        <input 
                          type="checkbox" 
                          className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-600 w-4 h-4 border-zinc-300 transition-all cursor-pointer" 
                          checked={authAgreed}
                          onChange={(e) => setAuthAgreed(e.target.checked)}
                        />
                        <span className="text-zinc-700 font-medium">Read and agree to <span className="text-indigo-600 inline-block align-baseline hover:underline leading-snug break-words">"Rules for Processing and Authorization of Facial Information"</span></span>
                      </label>
                    </div>

                    <div className="mt-auto pt-4 flex gap-3">
                      <Button 
                        variant="outline" 
                        disabled={!authAgreed} 
                        className="flex-1 rounded-xl h-[52px] font-medium border-indigo-200 text-indigo-700 hover:bg-indigo-50 disabled:opacity-50 transition-colors"
                        onClick={() => {
                           setH5ActionType('auth_only');
                           setH5Step('live');
                           setH5LiveStepStatus('scanning');
                           setTimeout(() => setH5LiveStepStatus('done'), 2000);
                        }}
                      >
                        Authorize
                      </Button>
                      <Button 
                        disabled={!authAgreed} 
                        className="flex-[1.5] rounded-xl h-[52px] font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none transition-all"
                        onClick={() => {
                           setH5ActionType('auth_and_upload');
                           setH5Step('live');
                           setH5LiveStepStatus('scanning');
                           setTimeout(() => setH5LiveStepStatus('done'), 2000);
                        }}
                      >
                        Authorize & Upload
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {h5Step === 'live' && (
                <div className="flex-1 bg-black flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                  <div className="absolute inset-0 bg-zinc-900 opacity-50"></div>
                  
                  <div className="z-10 flex flex-col items-center w-full max-w-xs">
                    <h3 className="text-white text-xl font-medium mb-12">
                      {h5LiveStepStatus === 'scanning' ? 'Face the camera' : 'Verification Complete'}
                    </h3>

                    <div className="relative w-64 h-64 mx-auto mb-12">
                      <div className={cn("absolute inset-0 border-4 rounded-full transition-colors duration-500", h5LiveStepStatus === 'scanning' ? "border-indigo-500 border-t-white animate-spin" : "border-green-500")}></div>
                      <div className="absolute inset-2 bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center shadow-inner pt-0">
                        {h5LiveStepStatus === 'scanning' ? (
                          <ScanFace className="w-24 h-24 text-zinc-400 animate-pulse" />
                        ) : (
                          <Check className="w-24 h-24 text-green-500 animate-in zoom-in duration-300" />
                        )}
                      </div>
                    </div>

                    {h5LiveStepStatus === 'scanning' ? (
                      <p className="text-zinc-400 text-sm animate-pulse">Connecting to Adorado live detection...</p>
                    ) : (
                      <Button 
                        className="w-full bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20 rounded-xl h-14 text-lg font-medium animate-in slide-in-from-bottom-4 fade-in"
                        onClick={() => {
                          setH5Step('success');
                        }}
                      >
                         Continue
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {h5Step === 'success' && (
                <div className="flex-1 bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-2 mt-4">Authorization Complete</h3>
                  <p className="text-zinc-500 mb-10 text-[15px] px-4 leading-relaxed">
                    {h5ActionType === 'auth_and_upload' 
                      ? "Authorization successful. You may now upload your assets."
                      : "You have successfully authorized your portrait. You may now close this window and return to your PC."}
                  </p>
                  
                  <Button 
                    className="w-full max-w-xs bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-[52px] font-medium"
                    onClick={() => {
                      if (h5ActionType === 'auth_and_upload') {
                        setH5Step('upload');
                      } else {
                        handleH5Close();
                      }
                    }}
                  >
                    Continue
                  </Button>
                </div>
              )}

              {h5Step === 'upload' && (
                <div className="flex-1 bg-white flex flex-col p-6 animate-in slide-in-from-right duration-300 overflow-y-auto pt-16">
                    <p className="text-zinc-500 text-xs mb-6">Group ID: group-{Date.now().toString().slice(-6)}-v9c5g</p>
                    
                    <div className="space-y-4 flex-1">
                      <div>
                        <label className="block text-sm font-medium text-zinc-900 mb-1.5">Asset group name:</label>
                        <Input 
                          placeholder="Please enter group name"
                          value={h5UploadGroupName}
                          onChange={(e) => setH5UploadGroupName(e.target.value)}
                        />
                      </div>
                      
                      <div className="pt-2">
                        <div className="flex flex-wrap gap-2 mb-2">
                           <div 
                             className="w-20 h-20 border-2 border-dashed border-zinc-200 rounded-lg flex items-center justify-center text-zinc-400 hover:bg-zinc-50 hover:border-indigo-400 cursor-pointer transition-colors"
                             onClick={() => {
                               if (h5UploadedAssets.length < 10) {
                                  const demoImages = [
                                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80",
                                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80",
                                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80"
                                  ];
                                  setH5UploadedAssets(prev => [...prev, demoImages[prev.length % demoImages.length]]);
                               }
                             }}
                           >
                             <Plus className="w-6 h-6" />
                           </div>
                           {h5UploadedAssets.map((url, i) => (
                             <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-zinc-200">
                               <img src={url} className="w-full h-full object-cover" />
                               <button 
                                 className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 hover:bg-black/70 shadow-sm"
                                 onClick={() => setH5UploadedAssets(prev => prev.filter((_, idx) => idx !== i))}
                               >
                                 <X className="w-3 h-3" />
                               </button>
                             </div>
                           ))}
                        </div>
                        <p className="text-zinc-500 text-xs">{h5UploadedAssets.length} items (Max 10)</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 space-y-4 pb-6">
                      <p className="text-zinc-400 text-[11px] text-center leading-relaxed px-2">
                        By uploading, you confirm that you own or have the necessary rights to the content, and that it does not violate any laws or infringe any third-party rights.
                      </p>
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 font-medium shadow-md shadow-blue-500/20"
                        onClick={() => {
                          setH5Step('upload_success');
                        }}
                      >
                         Upload and authorize
                      </Button>
                    </div>
                </div>
              )}

              {h5Step === 'upload_success' && (
                <div className="flex-1 bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-2 mt-4">Upload Complete</h3>
                  <p className="text-zinc-500 mb-10 text-[15px] px-4 leading-relaxed">
                    You have successfully authorized your portrait and uploaded your assets. You may now close this window and return to your PC.
                  </p>
                  
                  <Button 
                    className="w-full max-w-xs bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-[52px] font-medium"
                    onClick={() => {
                      handleH5Close();
                    }}
                  >
                    Continue
                  </Button>
                </div>
              )}
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1 inset-x-0 h-[5px] flex justify-center z-50 pointer-events-none mb-1">
              <div className="w-1/3 h-full bg-zinc-300 rounded-full"></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
      <Dialog open={!!confirmDeleteGroup} onOpenChange={(open) => !open && setConfirmDeleteGroup(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Asset Group</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-zinc-600">
              Are you sure you want to delete this asset group? 
              This will also delete the <strong>{(confirmDeleteGroup?.name?.length % 5) + 3}</strong> assets under this group. This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmDeleteGroup(null)}>Cancel</Button>
            <Button variant="destructive" onClick={executeDelete} disabled={!!deletingId}>Delete Group</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!uploadGroupDetails} onOpenChange={(open) => !open && setUploadGroupDetails(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Upload assets to {uploadGroupDetails?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <div 
              onClick={() => {
                if (!hasSignedAgreement) {
                  setLegalDialogOpen(true);
                } else {
                  fileInputRef.current?.click();
                  setUploadGroupDetails(null);
                }
              }}
              className="border-2 border-dashed border-indigo-200 bg-indigo-50/40 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-indigo-50/80 transition-colors group"
            >
              <div className="bg-white shadow-sm border border-indigo-100 p-3 rounded-xl mb-4 text-indigo-600 group-hover:scale-105 transition-transform">
                <FileType2 className="w-6 h-6" />
              </div>
              <p className="text-zinc-800 font-medium mb-3">
                <span className="text-indigo-600 font-semibold cursor-pointer">Click</span> or Drag and drop folder/media files to upload assets to this group
              </p>
              <div className="space-y-1.5 text-[13px] text-zinc-500 max-w-2xl">
                <p>Each media file will be added to this asset group. Once uploaded, assets can be reused indefinitely, eliminating the need for re-uploads.</p>
                <p>Supported formats: image (jpeg/jpg/png), video (mp4/mov), audio (mp3/wav), upload up to 500 at a time</p>
                <p>Naming format: {"{asset title} & & {asset group title} & & {asset group description}"}</p>
              </div>
            </div>
            
            {/* Empty list area styled as in screenshot */}
            <div className="mt-8 flex justify-between items-center bg-zinc-50/50 px-2">
              <span className="text-sm font-bold text-zinc-900">Upload list</span>
            </div>
            <div className="mt-3 border rounded-lg overflow-hidden">
               <div className="grid grid-cols-12 bg-white text-xs font-semibold text-zinc-600 p-3 border-b">
                 <div className="col-span-5">File name</div>
                 <div className="col-span-5">Status</div>
                 <div className="col-span-2 text-right">Actions</div>
               </div>
               <div className="p-8 text-center text-zinc-400 text-sm bg-zinc-50/30">
                  No files selected
               </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 border-t pt-4">
             <span className="text-sm text-zinc-500">Successfully created 0/0</span>
             <div className="flex gap-2">
               <Button variant="outline" onClick={() => setUploadGroupDetails(null)} className="rounded-full shadow-sm">Cancel</Button>
               <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-sm" onClick={() => setUploadGroupDetails(null)}>Complete</Button>
             </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Process Documentation Dialog */}
      <Dialog open={rhFlowInfoOpen} onOpenChange={setRhFlowInfoOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Real-human 首次创建资产组与活体认证/授权流程</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-sm text-zinc-700 pb-6 pr-2">
            <section className="space-y-2">
              <h3 className="font-semibold text-base text-zinc-900 border-b pb-2">第一阶段：PC端触发 (PC Web)</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>在电脑端，用户处于 Real-human 资产页面，点击 Add Real-human Asset 按钮。</li>
                <li>弹出《用户协议》弹窗。</li>
                <li>用户点击同意后，PC端弹出一个包含二维码的弹窗，提示用户“请使用手机扫码完成人脸活体认证与授权”。</li>
              </ol>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base text-zinc-900 border-b pb-2">第二阶段：手机扫码与登录 (Mobile H5)</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>用户在手机上扫码，打开专属的 H5 页面（页面带有 PowerTokens 域名、ModelArk Logo 等品牌元素）。</li>
                <li>强制登录：H5 页面要求用户强制登录，并且只能通过 Google 或 GitHub 进行授权登录。</li>
                <li>
                  <span className="font-medium">账号一致性校验：</span>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-zinc-600">
                    <li>系统会自动对比【PC端展示二维码的登录账号】与【手机端当前授权登录的账号】。</li>
                    <li>如果不一致：触发截图中演示的 Tips 弹窗，提示用户“平台检测到扫码账号与授权账号不一致...（此时授权给的是扫码账号）”，用户点击“我知道了(I already know)”后可继续。</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base text-zinc-900 border-b pb-2">第三阶段：H5授权与操作选择 (Mobile H5)</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>账号确认后，进入真正的授权主界面。</li>
                <li>页面信息展示：明确展示正在将肖像授权给哪个账户（PC端的邮箱），去掉了之前的期限限制（忽略日期）。</li>
                <li>协议勾选：底部有 Checkbox，必须勾选“已阅读并同意《人脸信息处理和授权规则》”。</li>
                <li>
                  <span className="font-medium">双路分支操作按钮（核心变化）：</span>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-zinc-600">
                    <li>按钮 A【Authorized Portrait】（仅授权）</li>
                    <li>按钮 B【Authorize and upload】（授权且上传）</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section className="space-y-3">
              <h3 className="font-semibold text-base text-zinc-900 border-b pb-2">第四阶段：活体检测与数据回传 (Mobile H5 -{`>`} Server -{`>`} PC Web)</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>用户点击上述任意一个按钮后，H5 调取手机摄像头。</li>
                <li>接入 Adorado（底层由字节提供）的活体检测接口，用户对着镜头完成摇头、张嘴等活体动作。</li>
                <li>认证成功后，如果选择【Authorize and upload】，手机端进入填写资产组名称并上传素材的页面；若选择【Authorized Portrait】，则手机端提示“认证与授权成功”，可以关闭页面。</li>
                <li>PC端的状态刷新：PC端一直处于轮询/监听状态，收到成功回调后自动关闭二维码弹窗，刷新资产组列表。</li>
              </ol>
              <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200">
                <h4 className="font-medium text-zinc-900 mb-2">Auth & Upload 流程特殊说明:</h4>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  如果用户点击的是 <code>Authorize & Upload</code>，活体认证成功后会进入资产上传页，用户可以输入资产组名称并上传最多 10 个视频/图片资产。即使活体认证成功但用户未上传资产（例如直接关闭了页面），PC 端也会显示出新创建的当前资产组，只是该资产组内容为空。
                </p>
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base text-zinc-900 border-b pb-2">第五阶段：PC端创建资产组的不同结果 (差异化逻辑)</h3>
              <p className="text-zinc-600">根据用户在手机端点击的按钮不同，PC端新创建的资产组状态也不同：</p>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <span className="font-medium text-zinc-800">如果手机端点击的是【仅授权】：</span>
                  <ul className="list-circle pl-5 mt-1 space-y-1 text-zinc-600">
                    <li>通过Adorado接口仅 创建一个 Real-human 资产组。</li>
                    <li>由于没有上传视频，该资产组是空的（0个资产），并且没有封面图（默认封面或空状态）。</li>
                    <li>资产组名称默认是空，只有资产组ID。</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium text-zinc-800">如果手机端点击的是【授权且上传】：</span>
                  <ul className="list-circle pl-5 mt-1 space-y-1 text-zinc-600">
                    <li>通过Adorado接口 创建一个 Real-human 资产组。</li>
                    <li>并将刚才录制的活体认证视频作为第一个素材上传。</li>
                    <li>该资产组包含 1个资产，并且资产组的封面图是该视频的封面截图。</li>
                    <li>资产组名称默认是空，只有资产组ID。</li>
                    <li>上传的素材名称使用默认的文件名，并且有资产ID。</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base text-zinc-900 border-b pb-2">第六阶段：PC端界面扩展 (分类 Tab)</h3>
              <p className="text-zinc-600">为了更清晰地管理这些复杂的授权关系，在 Real-human 面板下增加两个子分类 Tab：</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><span className="font-medium text-zinc-800">My Created（我创建的）：</span>用我自己当前的号，扫码使用了自己的脸创建的。</li>
                <li><span className="font-medium text-zinc-800">Authorized to me（授权给我的）：</span>其他人扫了我的码，用别人的账号登录，把他们的脸授权给我当前账号使用的资产组。</li>
              </ol>
            </section>
          </div>
        </DialogContent>
      </Dialog>

      {/* H5 Bilingual Text Document Dialog */}
      <Dialog open={h5FlowInfoOpen} onOpenChange={setH5FlowInfoOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">H5 各个步骤弹窗和页面中英文对照</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-sm text-zinc-700 pb-6 pr-2">
            <section className="space-y-2">
              <h3 className="font-semibold text-base text-zinc-900 border-b pb-2">1. 登录页面 (Login Step)</h3>
              <ul className="list-disc pl-5 space-y-1 text-zinc-600">
                <li><span className="font-medium text-zinc-800">Sign in to authorize your portrait</span> (登录以授权您的人像)</li>
                <li><span className="font-medium text-zinc-800">Log in with GitHub</span> (使用 GitHub 登录)</li>
                <li><span className="font-medium text-zinc-800">Log in with Google</span> (使用 Google 登录)</li>
                <li><span className="font-medium text-zinc-800">By continuing, you agree to the Terms of Service and Privacy Policy.</span> (继续即表示您同意服务条款和隐私政策。)</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base text-zinc-900 border-b pb-2">2. 授权页面 (Auth Step)</h3>
              <ul className="list-disc pl-5 space-y-1 text-zinc-600 mb-4">
                <li><span className="font-medium text-zinc-800">Portrait Management</span> (人像管理)</li>
                <li><span className="font-medium text-zinc-800">Authorization Details</span> (授权详情)</li>
                <li><span className="font-medium text-zinc-800">Real-Human Asset</span> (真人资产)</li>
                <li><span className="font-medium text-zinc-800">I consent to the use of materials uploaded via this account containing my likeness and/or voice for AI-generated content. Authorization scope, parties, and duration are governed by this account's actions. Any disputes shall be resolved by the relevant parties.</span><br/>(我同意使用通过此帐号上传的包含本人肖像及/或声音的素材进行AI内容生成。授权范围、授权方和授权期限以本账号行为为准。如有纠纷由相关方自行解决。)</li>
                <li><span className="font-medium text-zinc-800">Read and agree to "Rules for Processing and Authorization of Facial Information"</span> (阅读并同意《人脸信息处理及授权规则》)</li>
                <li><span className="font-medium text-zinc-800">Authorize</span> (授权)</li>
                <li><span className="font-medium text-zinc-800">Authorize & Upload</span> (授权并上传)</li>
              </ul>
              
              <h4 className="font-medium text-zinc-800 mt-4">正常账号一致时的文案：</h4>
              <ul className="list-disc pl-5 space-y-1 text-zinc-600 mb-4">
                <li><span className="font-medium text-zinc-800">The platform has detected that the QR code account and the authorized account are the same account (user@example.com). The time limit is set to "permanent".</span><br/>(平台检测到扫码账号与当前授权登录账号一致（user@example.com）。授权期限默认设置为“永久”。)</li>
              </ul>

              <h4 className="font-medium text-zinc-800 mt-4">账号不一致时的提示 (页面内文案 + Tips 弹窗)：</h4>
              <ul className="list-disc pl-5 space-y-1 text-zinc-600">
                <li><span className="font-medium text-zinc-800">Tips</span> (提示)</li>
                <li><span className="font-medium text-zinc-800">The platform has detected that the QR code account and the authorized account are inconsistent. The authorization will be granted to the QR code account (user@example.com).</span><br/>(平台检测到扫码账号与当前授权账号不一致。本次授权将授予给扫码账号 (user@example.com)。)</li>
                <li><span className="font-medium text-zinc-800">I already know</span> (我知道了)</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base text-zinc-900 border-b pb-2">3. 活体检测页面 (Live/Scan Face Step)</h3>
              <p className="text-zinc-500 italic pl-2">该页面提示信息见上文流程或使用第三方活体平台文案</p>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base text-zinc-900 border-b pb-2">4. 授权成功结果页 (Success Step)</h3>
              <ul className="list-disc pl-5 space-y-1 text-zinc-600">
                <li><span className="font-medium text-zinc-800">Verification Complete / Authorization Complete</span> (验证完成/授权完成)</li>
                <li><span className="font-medium text-zinc-800">You have successfully authorized your portrait. You may now close this window and return to your PC.</span><br/>(您已成功授权您的人像。现在您可以关闭此窗口并返回电脑端进行操作。)</li>
                <li><span className="font-medium text-zinc-800">Authorization successful. You may now upload your assets.</span><br/>(授权成功。您现在可以上传您的资产。 - 仅 auth_and_upload 流程)</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base text-zinc-900 border-b pb-2">5. 资产上传页面 (Upload Step - 仅 auth_and_upload)</h3>
              <ul className="list-disc pl-5 space-y-1 text-zinc-600 mb-4">
                <li><span className="font-medium text-zinc-800">Asset group name:</span> (资产组名称)</li>
                <li><span className="font-medium text-zinc-800">Please enter group name</span> (请输入资产组名称)</li>
                <li><span className="font-medium text-zinc-800">X items (Max 10)</span> (X 项 (最多 10 项))</li>
                <li><span className="font-medium text-zinc-800">By uploading, you confirm that you own or have the necessary rights to the content, and that it does not violate any laws or infringe any third-party rights.</span><br/>(上传即表示您确认您拥有该内容的必要权利且不违反任何法律或侵犯任何第三方权利。)</li>
                <li><span className="font-medium text-zinc-800">Upload and authorize</span> (上传并授权)</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-semibold text-base text-zinc-900 border-b pb-2">6. 上传成功结果页 (Upload Success Step - 仅 auth_and_upload)</h3>
              <ul className="list-disc pl-5 space-y-1 text-zinc-600">
                <li><span className="font-medium text-zinc-800">Upload Complete</span> (上传完成)</li>
                <li><span className="font-medium text-zinc-800">You have successfully authorized your portrait and uploaded your assets. You may now close this window and return to your PC.</span><br/>(您已成功授权人像并上传资产。现在您可以关闭此窗口并返回电脑端进行操作。)</li>
              </ul>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
