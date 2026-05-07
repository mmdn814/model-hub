import React, { useState, useEffect } from "react";
import {
  Settings2,
  Video,
  Wand2,
  Play,
  Download,
  Zap,
  Copy,
  Image as ImageIcon,
  Plus,
  X,
  FileCheck,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { AssetAgreementDialog } from "@/components/AssetAgreementDialog";
import { useAssets, AssetType } from "@/contexts/AssetContext";

import { useNavigate } from "react-router-dom";

export function Seedance20Template({
  model,
  restoredParams,
  onValidate,
  onAddHistory,
}: {
  model: any;
  restoredParams?: any;
  onValidate?: (cb: () => void) => void;
  onAddHistory?: (item: any) => void;
}) {
  const isFast = model?.id?.includes('fast');
  const DEFAULT_MIN_IMAGES = isFast ? 1 : 5;

  const { hasSignedAgreement, assets, addAsset } = useAssets();
  const alreadySigned = isFast || hasSignedAgreement;
  const navigate = useNavigate();

  const [goToLibraryDialogOpen, setGoToLibraryDialogOpen] = useState(false);
  const [assetPickerOpen, setAssetPickerOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    onSuccess: (url: string) => void;
    type: AssetType;
  } | null>(null);

  const handleSlotClick = (type: AssetType, onSuccess: (url: string) => void) => {
    setPendingAction({ type, onSuccess });
    if (!alreadySigned) {
      setGoToLibraryDialogOpen(true);
    } else {
      setAssetPickerOpen(true);
    }
  };

  const handleGoToLibrary = () => {
    setGoToLibraryDialogOpen(false);
    navigate("/assets");
  };

  const handleSelectAsset = (assetUrl: string) => {
    if (pendingAction) {
      pendingAction.onSuccess(assetUrl);
      setAssetPickerOpen(false);
      setPendingAction(null);
    }
  };

  const [prompt, setPrompt] = useState(
    "A highly detailed 3D animated character dancing in a futuristic neon city...",
  );
  const [firstFrameUrl, setFirstFrameUrl] = useState("");
  const [lastFrameUrl, setLastFrameUrl] = useState("");
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [referenceVideos, setReferenceVideos] = useState<string[]>([""]);
  const [referenceAudios, setReferenceAudios] = useState<string[]>([""]);

  const [duration, setDuration] = useState([8]);
  const [resolution, setResolution] = useState("1080p");
  const [aspectRatio, setAspectRatio] = useState("16:9");

  const [generateAudio, setGenerateAudio] = useState(true);
  const [webSearch, setWebSearch] = useState(false);
  const [nsfwChecker, setNsfwChecker] = useState(true);

  const [status, setStatus] = useState<
    "idle" | "in_queue" | "in_progress" | "completed"
  >("idle");

  useEffect(() => {
    if (restoredParams) {
      if (restoredParams.prompt) setPrompt(restoredParams.prompt);
      if (restoredParams.first_frame_url) setFirstFrameUrl(restoredParams.first_frame_url);
      if (restoredParams.last_frame_url) setLastFrameUrl(restoredParams.last_frame_url);
      if (restoredParams.reference_image_urls) {
        let urls = [...restoredParams.reference_image_urls];
        const min = model?.id?.includes('fast') ? 1 : 5;
        while (urls.length < min) urls.push('');
        setReferenceImages(urls);
      }
      if (restoredParams.reference_video_urls && restoredParams.reference_video_urls.length > 0) {
        setReferenceVideos(restoredParams.reference_video_urls);
      }
      if (restoredParams.reference_audio_urls && restoredParams.reference_audio_urls.length > 0) {
        setReferenceAudios(restoredParams.reference_audio_urls);
      }
      if (restoredParams.duration) setDuration([restoredParams.duration]);
      if (restoredParams.resolution) setResolution(restoredParams.resolution);
      if (restoredParams.aspect_ratio) setAspectRatio(restoredParams.aspect_ratio);
      if (restoredParams.generate_audio !== undefined)
        setGenerateAudio(restoredParams.generate_audio);
      if (restoredParams.web_search !== undefined) setWebSearch(restoredParams.web_search);
      if (restoredParams.nsfw_checker !== undefined) setNsfwChecker(restoredParams.nsfw_checker);
    } else {
      setReferenceImages(Array(model?.id?.includes('fast') ? 1 : 5).fill(''));
    }
  }, [restoredParams, model?.id]);

  useEffect(() => {
    if (isFast && !["480p", "720p"].includes(resolution)) {
      setResolution("720p");
    } else if (!isFast && !["480p", "720p", "1080p"].includes(resolution)) {
      setResolution("1080p");
    }
  }, [isFast, resolution]);

  const getPayload = () => {
    const payload: any = {
      model: model?.id || "seedance-2-0-pro",
      prompt,
      reference_image_urls: referenceImages.filter(url => url !== ''),
      resolution,
      aspect_ratio: aspectRatio,
      duration: duration[0],
      web_search: webSearch,
      nsfw_checker: nsfwChecker,
    };
    if (firstFrameUrl) payload.first_frame_url = firstFrameUrl;
    if (lastFrameUrl) payload.last_frame_url = lastFrameUrl;
    if (referenceVideos.filter(v => v !== '').length > 0) payload.reference_video_urls = referenceVideos.filter(v => v !== '');
    if (referenceAudios.filter(a => a !== '').length > 0) payload.reference_audio_urls = referenceAudios.filter(a => a !== '');
    payload.generate_audio = generateAudio;
    return payload;
  };

  const handleAddReference = () => {
    if (referenceImages.length < 9) {
      setReferenceImages([...referenceImages, '']);
    }
  };

  const handleRemoveReference = (index: number) => {
    if (index >= DEFAULT_MIN_IMAGES) {
      const newImages = [...referenceImages];
      newImages.splice(index, 1);
      setReferenceImages(newImages);
    }
  };

  const handleUploadReference = (index: number, f: File) => {
    const newImages = [...referenceImages];
    newImages[index] = `https://fake-storage/${f.name}`;
    setReferenceImages(newImages);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(getPayload(), null, 2));
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    if (onValidate) {
      onValidate(doGenerate);
    } else {
      doGenerate();
    }
  };

  const doGenerate = () => {
    setStatus("in_queue");
    setTimeout(() => setStatus("in_progress"), 1500);
    setTimeout(() => {
      setStatus("completed");
      if (onAddHistory) {
        onAddHistory({
          id: Date.now().toString(),
          modelId: model?.id || "seedance-2-0-pro",
          modality: "video",
          prompt: prompt,
          result: "https://www.w3schools.com/html/mov_bbb.mp4",
          cost: duration[0] * 15,
          timestamp: Date.now(),
          params: getPayload(),
        });
      }
    }, 5000);
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-zinc-50 relative">
      {/* Left Input Area */}
      <div className="w-[400px] bg-white border-r border-zinc-200 flex flex-col shrink-0 overflow-y-auto">
        <div className="p-5 space-y-6 flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
            <span className="w-6 h-6 rounded bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-[10px]">
              v2
            </span>
            <h3 className="font-bold text-zinc-800 text-sm flex items-center gap-2">
              Seedance 2.0 Studio
              <Tooltip>
                <TooltipTrigger type="button" className="cursor-pointer border-none bg-transparent p-0 flex items-center justify-center">
                  <Info className="w-4 h-4 text-zinc-400 hover:text-purple-500 transition-colors" />
                </TooltipTrigger>
                <TooltipContent className="max-w-md p-4 space-y-2 bg-white text-zinc-900 border border-zinc-200 shadow-xl" side="right">
                  <p className="font-semibold text-sm border-b pb-2">技术接入提示：</p>
                  <ol className="list-decimal pl-4 text-xs space-y-2 text-zinc-700">
                    <li><strong>协议状态维护</strong><br/><span className="text-zinc-500">首次同意《资产附加协议》状态在实际开发中应存储至用户配置系统或数据库的 User 记录中，不由前端本地存储判定。</span></li>
                    <li><strong>资产上传（图片/视频/音频入库）</strong><br/><span className="text-zinc-500">用户选择文件后，需要直接上传到对象存储或请求 Adoraod API 进行资产注册，API 必须同步返回生成的 asset_id 供前端绑定和展示。</span></li>
                    <li><strong>用户选择资产库的资产</strong><br/><span className="text-zinc-500">用户需选择需要按照类型选择,例如在上传audio的资产库选择只能选择audio文件等</span></li>
                    <li><strong>生成/推理请求 (Generate 按钮)</strong><br/><span className="text-zinc-500">触发生成时，不再传递二进制文件。需要将用户在资产库中选中的首尾帧、参考图/视频/音频的 asset_id，连同 Prompt 和高阶参数一起打包提交给 Adoraod 推理接口。</span></li>
                  </ol>
                </TooltipContent>
              </Tooltip>
            </h3>
          </div>

          {/* Prompt */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-zinc-800">
                Prompt <span className="text-red-500">*</span>
              </label>
            </div>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the video motion and scene details..."
              className="h-[120px] resize-none focus-visible:ring-purple-500"
            />
          </div>

          {/* First/Last Frame */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">First Frame Image</label>
                <div 
                  onClick={() => handleSlotClick('image', setFirstFrameUrl)}
                  className="h-16 rounded-xl border-2 border-dashed border-zinc-200 hover:border-purple-400 bg-zinc-50 flex flex-col items-center justify-center cursor-pointer transition-colors text-zinc-400 relative overflow-hidden group"
                >
                  <ImageIcon className="w-4 h-4 mb-1" />
                  <span className="text-[10px] font-medium truncate w-full text-center px-1">{firstFrameUrl ? firstFrameUrl.split('/').pop() : 'Upload First'}</span>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-700">Last Frame Image</label>
                <div 
                  onClick={() => handleSlotClick('image', setLastFrameUrl)}
                  className="h-16 rounded-xl border-2 border-dashed border-zinc-200 hover:border-purple-400 bg-zinc-50 flex flex-col items-center justify-center cursor-pointer transition-colors text-zinc-400 relative overflow-hidden group"
                >
                  <ImageIcon className="w-4 h-4 mb-1" />
                  <span className="text-[10px] font-medium truncate w-full text-center px-1">{lastFrameUrl ? lastFrameUrl.split('/').pop() : 'Upload Last'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reference Images */}
          <div className="space-y-3 pt-2 border-t border-zinc-100">
             <div className="flex flex-col mb-1">
                <label className="text-sm font-semibold text-zinc-800">
                  Reference Images
                </label>
                <span className="text-[10px] text-zinc-500 leading-tight mt-1">
                   Click to upload or drag and drop<br/>
                   Supported formats: JPEG, PNG, WEBP, JPG Maximum file size: 30MB; Maximum files: {isFast ? "9 (The first slot cannot be deleted)" : "9 (The first 5 slots cannot be deleted)"}
                </span>
             </div>
             
             <div className="grid grid-cols-4 gap-2">
                {referenceImages.map((url, i) => (
                    <div 
                        key={i} 
                        onClick={() => handleSlotClick('image', (newUrl) => {
                          const newImages = [...referenceImages];
                          newImages[i] = newUrl;
                          setReferenceImages(newImages);
                        })}
                        className="relative aspect-square rounded-xl border-2 border-dashed border-zinc-200 hover:border-purple-400 bg-zinc-50 flex flex-col items-center justify-center cursor-pointer transition-colors text-zinc-400 overflow-hidden group"
                    >
                        {url ? (
                            <>
                                <ImageIcon className="w-5 h-5 text-purple-500 mb-1" />
                                <span className="text-[10px] font-medium text-zinc-600 truncate px-2 w-full text-center">
                                    {url.split('/').pop()}
                                </span>
                            </>
                        ) : (
                            <>
                                <ImageIcon className="w-5 h-5 mb-1 opacity-50" />
                                <span className="text-[10px] font-medium">Slot {i + 1}</span>
                            </>
                        )}
                        {i >= DEFAULT_MIN_IMAGES && (
                            <button
                                type="button"
                                className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleRemoveReference(i);
                                }}
                            >
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                ))}
                
                {referenceImages.length < 9 && (
                   <div 
                     onClick={handleAddReference}
                     className="aspect-square rounded-xl border-2 border-dashed border-zinc-300 hover:border-purple-500 hover:bg-purple-50 flex flex-col items-center justify-center cursor-pointer transition-colors text-zinc-500"
                   >
                     <Plus className="w-6 h-6 mb-1 text-zinc-400" />
                     <span className="text-[10px] font-medium">Add</span>
                   </div>
                )}
             </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-100">
             <label className="text-sm font-semibold text-zinc-800 block">
               Additional Reference Files
             </label>
             
             <div className="space-y-2">
               <label className="text-xs font-medium text-zinc-700">Reference Video</label>
               <span className="block text-[10px] text-zinc-500 leading-tight">
                  Click to upload or drag and drop<br/>
                  Supported formats: MP4, QUICKTIME, X-MATROSKA Maximum file size: 50MB; Maximum files: 3
               </span>
               <div className="grid grid-cols-3 gap-2">
                 {referenceVideos.map((url, i) => (
                   <div 
                     key={`vid-${i}`} 
                     onClick={() => handleSlotClick('video', (newUrl) => {
                       const newVids = [...referenceVideos];
                       newVids[i] = newUrl;
                       setReferenceVideos(newVids);
                     })}
                     className="relative h-16 rounded-xl border-2 border-dashed border-zinc-200 hover:border-purple-400 bg-zinc-50 flex flex-col items-center justify-center cursor-pointer transition-colors text-zinc-400 overflow-hidden group"
                   >
                     {url ? (
                       <>
                         <Video className="w-4 h-4 mb-1 text-purple-500" />
                         <span className="text-[10px] font-medium truncate w-full text-center px-1 text-zinc-600">{url.split('/').pop()}</span>
                       </>
                     ) : (
                       <>
                         <Video className="w-4 h-4 mb-1 opacity-50" />
                         <span className="text-[10px] font-medium">Slot {i + 1}</span>
                       </>
                     )}
                     {i >= 1 && (
                       <button
                         type="button"
                         className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
                         onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           const newVids = [...referenceVideos];
                           newVids.splice(i, 1);
                           setReferenceVideos(newVids);
                         }}
                       >
                         <X className="w-3 h-3" />
                       </button>
                     )}
                   </div>
                 ))}
                 
                 {referenceVideos.length < 3 && (
                   <div 
                     onClick={() => setReferenceVideos([...referenceVideos, ''])}
                     className="relative h-16 rounded-xl border-2 border-dashed border-zinc-300 hover:border-purple-500 hover:bg-purple-50 flex flex-col items-center justify-center cursor-pointer transition-colors text-zinc-500"
                   >
                     <Plus className="w-5 h-5 mb-1 text-zinc-400" />
                     <span className="text-[10px] font-medium">Add</span>
                   </div>
                 )}
               </div>
               <span className="block text-[10px] text-zinc-500 mt-1">
                 A list of input video URLs. Furthermore, the total length of the three videos must not exceed 15 seconds.
               </span>
             </div>

             <div className="space-y-2">
               <label className="text-xs font-medium text-zinc-700">Reference Audio</label>
               <span className="block text-[10px] text-zinc-500 leading-tight">
                  Click to upload or drag and drop<br/>
                  Supported formats: MPEG, WAV, X-WAV, AAC, MP4, OGG Maximum file size: 15MB; Maximum files: 3
               </span>
               <div className="grid grid-cols-3 gap-2">
                 {referenceAudios.map((url, i) => (
                   <div 
                     key={`aud-${i}`}
                     onClick={() => handleSlotClick('audio', (newUrl) => {
                       const newAuds = [...referenceAudios];
                       newAuds[i] = newUrl;
                       setReferenceAudios(newAuds);
                     })}
                     className="relative h-16 rounded-xl border-2 border-dashed border-zinc-200 hover:border-purple-400 bg-zinc-50 flex flex-col items-center justify-center cursor-pointer transition-colors text-zinc-400 overflow-hidden group"
                   >
                     {url ? (
                       <>
                         <Wand2 className="w-4 h-4 mb-1 text-purple-500" />
                         <span className="text-[10px] font-medium truncate w-full text-center px-1 text-zinc-600">{url.split('/').pop()}</span>
                       </>
                     ) : (
                       <>
                         <Wand2 className="w-4 h-4 mb-1 opacity-50" />
                         <span className="text-[10px] font-medium">Slot {i + 1}</span>
                       </>
                     )}
                     {i >= 1 && (
                       <button
                         type="button"
                         className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
                         onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           const newAuds = [...referenceAudios];
                           newAuds.splice(i, 1);
                           setReferenceAudios(newAuds);
                         }}
                       >
                         <X className="w-3 h-3" />
                       </button>
                     )}
                   </div>
                 ))}
                 
                 {referenceAudios.length < 3 && (
                   <div 
                     onClick={() => setReferenceAudios([...referenceAudios, ''])}
                     className="relative h-16 rounded-xl border-2 border-dashed border-zinc-300 hover:border-purple-500 hover:bg-purple-50 flex flex-col items-center justify-center cursor-pointer transition-colors text-zinc-500"
                   >
                     <Plus className="w-5 h-5 mb-1 text-zinc-400" />
                     <span className="text-[10px] font-medium">Add</span>
                   </div>
                 )}
               </div>
             </div>
          </div>

          <div className="border-t border-zinc-100 my-2" />

          {/* Config */}
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-semibold text-zinc-800">
                  Duration
                </label>
                <span className="text-sm font-mono text-purple-600 font-bold">
                  {duration[0]}s
                </span>
              </div>
              <Slider
                value={duration}
                onValueChange={(v) => setDuration(v as number[])}
                min={4}
                max={15}
                step={1}
                className="py-2"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-800">
                Resolution
              </label>
              <RadioGroup
                value={resolution}
                onValueChange={setResolution}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="480p" id="480p" />
                  <label htmlFor="480p" className="text-sm">
                    480P
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="720p" id="720p" />
                  <label htmlFor="720p" className="text-sm">
                    720P
                  </label>
                </div>
                {!isFast && (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1080p" id="1080p" />
                    <label htmlFor="1080p" className="text-sm">
                      1080P
                    </label>
                  </div>
                )}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-800">
                Aspect Ratio
              </label>
              <RadioGroup
                value={aspectRatio}
                onValueChange={setAspectRatio}
                className="grid grid-cols-3 gap-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="16:9" id="16:9" className="hidden" />
                  <label htmlFor="16:9" className={cn("text-xs font-medium w-full text-center py-2 px-3 border rounded-lg cursor-pointer transition-colors", aspectRatio === "16:9" ? "bg-purple-50 text-purple-700 border-purple-200" : "border-zinc-200 text-zinc-600 hover:bg-zinc-50")}>
                    16:9
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4:3" id="4:3" className="hidden" />
                  <label htmlFor="4:3" className={cn("text-xs font-medium w-full text-center py-2 px-3 border rounded-lg cursor-pointer transition-colors", aspectRatio === "4:3" ? "bg-purple-50 text-purple-700 border-purple-200" : "border-zinc-200 text-zinc-600 hover:bg-zinc-50")}>
                    4:3
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1:1" id="1:1" className="hidden" />
                  <label htmlFor="1:1" className={cn("text-xs font-medium w-full text-center py-2 px-3 border rounded-lg cursor-pointer transition-colors", aspectRatio === "1:1" ? "bg-purple-50 text-purple-700 border-purple-200" : "border-zinc-200 text-zinc-600 hover:bg-zinc-50")}>
                    1:1
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3:4" id="3:4" className="hidden" />
                  <label htmlFor="3:4" className={cn("text-xs font-medium w-full text-center py-2 px-3 border rounded-lg cursor-pointer transition-colors", aspectRatio === "3:4" ? "bg-purple-50 text-purple-700 border-purple-200" : "border-zinc-200 text-zinc-600 hover:bg-zinc-50")}>
                    3:4
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="9:16" id="9:16" className="hidden" />
                  <label htmlFor="9:16" className={cn("text-xs font-medium w-full text-center py-2 px-3 border rounded-lg cursor-pointer transition-colors", aspectRatio === "9:16" ? "bg-purple-50 text-purple-700 border-purple-200" : "border-zinc-200 text-zinc-600 hover:bg-zinc-50")}>
                    9:16
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="21:9" id="21:9" className="hidden" />
                  <label htmlFor="21:9" className={cn("text-xs font-medium w-full text-center py-2 px-3 border rounded-lg cursor-pointer transition-colors", aspectRatio === "21:9" ? "bg-purple-50 text-purple-700 border-purple-200" : "border-zinc-200 text-zinc-600 hover:bg-zinc-50")}>
                    21:9
                  </label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-sm font-semibold text-zinc-800">
                Advanced Features
              </label>

              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-700">
                  Native Audio Generation
                </label>
                <Switch
                  checked={generateAudio}
                  onCheckedChange={setGenerateAudio}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-700">
                  Web Search
                </label>
                <Switch checked={webSearch} onCheckedChange={setWebSearch} />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-700">
                  NSFW Checker
                </label>
                <Switch checked={nsfwChecker} onCheckedChange={setNsfwChecker} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-zinc-100 bg-white flex gap-2">
          <Button
            variant="outline"
            className="h-12 w-12 shrink-0 rounded-xl hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
            title="Copy API Parameters as JSON"
            onClick={handleCopyJSON}
          >
            <Copy className="w-5 h-5 text-zinc-600" />
          </Button>
          <Button
            className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-lg shadow-purple-600/20 font-bold text-base"
            onClick={handleGenerate}
            disabled={status !== "idle" && status !== "completed"}
          >
            <Video className="w-5 h-5 mr-2" />
            Generate Seedance 2.0
          </Button>
        </div>
      </div>

      {/* Right Results Area */}
      <div className="flex-1 p-8 bg-zinc-100 flex flex-col items-center justify-center relative">
        {status === "idle" ? (
          <div className="flex flex-col items-center text-zinc-400">
            <Video className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-sm font-medium">
              Seedance 2.0 Video generation results will appear here
            </p>
          </div>
        ) : status === "in_queue" || status === "in_progress" ? (
          <div className="w-full max-w-3xl aspect-video bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center border border-purple-100">
            <div className="w-20 h-20 relative mb-6">
              <div className="absolute inset-0 border-4 border-zinc-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-purple-600 font-bold text-xs">
                2.0
              </div>
            </div>
            <h3 className="text-xl font-bold text-zinc-800 mb-2">
              {status === "in_queue"
                ? "Queueing in Seedance GPU Pool..."
                : "Rendering with Seedance 2.0 Engine..."}
            </h3>
            <p className="text-zinc-500 text-sm">
              Enhancing motion dynamics and spatial consistency.
            </p>

            <div className="w-64 h-2 bg-zinc-100 rounded-full mt-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000"
                style={{ width: status === "in_queue" ? "20%" : "75%" }}
              />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl aspect-video bg-black rounded-2xl shadow-2xl relative overflow-hidden group">
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full object-contain"
            />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                className="bg-white/90 hover:bg-white text-purple-900 shadow-xl border-none"
              >
                <Download className="w-4 h-4 mr-2" /> Download 2.0 HD
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Go To Library Modal */}
      <Dialog open={goToLibraryDialogOpen} onOpenChange={setGoToLibraryDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Asset Library Required</DialogTitle>
            <DialogDescription className="pt-2 text-zinc-600">
              To use Seedance 2.0, you need to upload and manage your assets in the Asset Library first. 
              Please go to the Asset Library to upload files before generating.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2 flex sm:justify-end gap-2">
            <Button variant="ghost" onClick={() => setGoToLibraryDialogOpen(false)}>Cancel</Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleGoToLibrary}>
              Go to Asset Library
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Asset Picker Modal */}
      <Dialog open={assetPickerOpen} onOpenChange={setAssetPickerOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <DialogTitle>Select Asset</DialogTitle>
              <DialogDescription>Select an asset from your library</DialogDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => { setAssetPickerOpen(false); navigate("/assets"); }}>
              <Upload className="w-4 h-4 mr-2" />
              Upload New
            </Button>
          </DialogHeader>
          
          <div className="h-[300px] overflow-y-auto pr-2 mt-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {assets.filter(a => a.type === pendingAction?.type).map(asset => (
                <div 
                  key={asset.id} 
                  className="relative group aspect-square rounded-xl border border-zinc-200 overflow-hidden cursor-pointer hover:border-purple-500 hover:ring-2 hover:ring-purple-200"
                  onClick={() => handleSelectAsset(asset.url)}
                >
                  {asset.type === 'image' ? (
                    <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                  ) : asset.type === 'video' ? (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-white">
                      <Video className="w-8 h-8 opacity-50" />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-purple-50 flex items-center justify-center text-purple-500">
                      <Wand2 className="w-8 h-8 opacity-50" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 backdrop-blur-md text-[10px] text-white truncate text-center">
                    {asset.name}
                  </div>
                </div>
              ))}
              {assets.filter(a => a.type === pendingAction?.type).length === 0 && (
                <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                  <p className="text-zinc-500 text-sm mb-4">No assets found in your library for this type.</p>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => { setAssetPickerOpen(false); navigate("/assets"); }}>
                    <Upload className="w-4 h-4 mr-2" />
                    Go to Asset Library to Upload
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
