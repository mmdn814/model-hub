import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { Calculator, Zap, Database, Image as ImageIcon, Film, Mic, Box, ArrowRight, Copy, Check, Clock, CircleDollarSign } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export function BillingDetails({ log }: { log: any }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  if (!log.pricing_snapshot_json) return null;

  const pricing = log.pricing_snapshot_json;
  const usage = log.usage_snapshot_json?.normalized_usage || {};
  const rule = pricing.matched_rule || {};

  const filterCostFields = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(filterCostFields);
    } else if (obj !== null && typeof obj === 'object') {
      const newObj: any = {};
      for (const key in obj) {
        if (!key.toLowerCase().includes('cost')) {
          newObj[key] = filterCostFields(obj[key]);
        }
      }
      return newObj;
    }
    return obj;
  };

  const filteredLog = filterCostFields(log);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(filteredLog, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderTextFormula = () => {
    const inputPrice = rule.input_sale_price || 0;
    const outputPrice = rule.output_sale_price || 0;
    
    const unitSize = rule.unit_size || 1000000;
    const qpu = pricing.quota_per_unit || 1000;
    const unitLabel = unitSize === 1000000 ? '1M' : (unitSize === 1000 ? '1k' : unitSize.toString());

    const promptTokens = usage.prompt_tokens || 0;
    const completionTokens = usage.completion_tokens || 0;
    
    // Fallback to usage_snapshot_json directly if needed, but rule states usage.cache_read_tokens
    const cacheRead = usage.cache_read_tokens || 0;
    const cacheWrite = usage.cache_write_tokens || 0;

    const requestEndpoint = log.request_endpoint || "POST /v1/chat/completions";
    // Based on user's first text: POST /v1/chat/completions corresponds to Passive Cache, POST /v1/messages corresponds to Active Cache
    const isPassiveCache = requestEndpoint.includes('/v1/chat/completions') || requestEndpoint.includes('/v1/embeddings');

    const expressionTerms = [];

    const passiveReadPrice = rule.passive_cache_read_sale_price || 0;
    const activeReadPrice = rule.active_cache_read_sale_price || 0;
    const activeWritePrice = rule.active_cache_write_sale_price || 0;

    let totalPriceVal = 0;
    let formulaSteps = null;

    if (isPassiveCache) {
      const billedInputTokens = Math.max(0, promptTokens - cacheRead);
      
      totalPriceVal = (
        billedInputTokens * inputPrice +
        completionTokens * outputPrice +
        cacheRead * passiveReadPrice
      ) / unitSize * qpu;

      const pB = (billedInputTokens * inputPrice).toFixed(4);
      const cB = (completionTokens * outputPrice).toFixed(4);
      const pR = (cacheRead * passiveReadPrice).toFixed(4);

      formulaSteps = (
        <div className="mb-3 p-3 bg-white border border-zinc-200 rounded text-[11px] text-zinc-600 font-mono break-all leading-relaxed whitespace-pre-wrap shadow-sm">
          <span className="font-semibold text-zinc-800 block mb-2">{t("Formula Step-by-Step")}:</span>
          {`( (${promptTokens} - ${cacheRead}) × ${inputPrice} + ${completionTokens} × ${outputPrice} + ${cacheRead} × ${passiveReadPrice} )\n`}
          {`÷ ${unitSize} × ${qpu}\n\n`}
          {`= ( ${pB} + ${cB} + ${pR} )\n`}
          {`÷ ${unitSize} × ${qpu}\n\n`}
          {`= ${(Number(pB) + Number(cB) + Number(pR)).toFixed(4)} ÷ ${unitSize} × ${qpu}\n\n`}
          {`= ${totalPriceVal.toFixed(4)}`}
        </div>
      );
    } else {
      totalPriceVal = (
        promptTokens * inputPrice +
        completionTokens * outputPrice +
        cacheRead * activeReadPrice +
        cacheWrite * activeWritePrice
      ) / unitSize * qpu;

      const pB = (promptTokens * inputPrice).toFixed(4);
      const cB = (completionTokens * outputPrice).toFixed(4);
      const aR = (cacheRead * activeReadPrice).toFixed(4);
      const aW = (cacheWrite * activeWritePrice).toFixed(4);

      formulaSteps = (
        <div className="mb-3 p-3 bg-white border border-zinc-200 rounded text-[11px] text-zinc-600 font-mono break-all leading-relaxed whitespace-pre-wrap shadow-sm">
          <span className="font-semibold text-zinc-800 block mb-2">{t("Formula Step-by-Step")}:</span>
          {`( ${promptTokens} × ${inputPrice} + ${completionTokens} × ${outputPrice} + ${cacheRead} × ${activeReadPrice} + ${cacheWrite} × ${activeWritePrice} )\n`}
          {`÷ ${unitSize} × ${qpu}\n\n`}
          {`= ( ${pB} + ${cB} + ${aR} + ${aW} )\n`}
          {`÷ ${unitSize} × ${qpu}\n\n`}
          {`= ${(Number(pB) + Number(cB) + Number(aR) + Number(aW)).toFixed(4)} ÷ ${unitSize} × ${qpu}\n\n`}
          {`= ${totalPriceVal.toFixed(4)}`}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-800 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-purple-500" />
          {t("Billing Breakdown (Per {{unitLabel}} Tokens)", { unitLabel })}
        </h3>
        <div className="bg-zinc-50 rounded-xl p-4 space-y-4 font-mono text-xs">
          
          <div>
            <h4 className="font-semibold text-zinc-700 mb-2">{t("Variables in Formula")}:</h4>
            <div className="grid grid-cols-[1fr_auto] gap-y-1.5 text-zinc-600 bg-white p-3 rounded border border-zinc-200 shadow-sm">
              <span className="text-zinc-500">prompt_tokens</span>
              <span className="font-medium text-zinc-900">{promptTokens}</span>
              
              <span className="text-zinc-500">completion_tokens</span>
              <span className="font-medium text-zinc-900">{completionTokens}</span>

              {isPassiveCache ? (
                <>
                  <span className="text-zinc-500">passive_cache_read_tokens</span>
                  <span className="font-medium text-zinc-900">{cacheRead}</span>
                </>
              ) : (
                <>
                  <span className="text-zinc-500">active_cache_read_tokens</span>
                  <span className="font-medium text-zinc-900">{cacheRead}</span>
                  
                  <span className="text-zinc-500">active_cache_write_tokens</span>
                  <span className="font-medium text-zinc-900">{cacheWrite}</span>
                </>
              )}

              <div className="col-span-2 h-px bg-zinc-100 my-1"></div>

              <span className="text-zinc-500">input_sale_price</span>
              <span className="font-medium text-zinc-900">{inputPrice}</span>
              
              <span className="text-zinc-500">output_sale_price</span>
              <span className="font-medium text-zinc-900">{outputPrice}</span>

              {isPassiveCache ? (
                <>
                  <span className="text-zinc-500">passive_cache_read_sale_price</span>
                  <span className="font-medium text-zinc-900">{passiveReadPrice}</span>
                </>
              ) : (
                <>
                  <span className="text-zinc-500">active_cache_read_sale_price</span>
                  <span className="font-medium text-zinc-900">{activeReadPrice}</span>
                  
                  <span className="text-zinc-500">active_cache_write_sale_price</span>
                  <span className="font-medium text-zinc-900">{activeWritePrice}</span>
                </>
              )}

              <div className="col-span-2 h-px bg-zinc-100 my-1"></div>

              <span className="text-zinc-500">unit_size</span>
              <span className="font-medium text-zinc-900">{unitSize}</span>
              
              <span className="text-zinc-500">quota_per_unit</span>
              <span className="font-medium text-zinc-900">{qpu}</span>
            </div>
          </div>

          <div className="pt-2">
            {formulaSteps}
            
            <div className="flex justify-between items-center text-sm text-zinc-600 mt-3 mb-1 px-1">
              <span>{t("Calculated credits")}</span>
              <span className="font-medium text-zinc-900">{totalPriceVal.toFixed(4)} credits</span>
            </div>
            <div className="flex justify-between items-center text-sm text-zinc-600 mb-3 px-1">
              <span>{t("Final Deducted credits")} <span className="text-[10px] font-mono">(Math.ceil)</span></span>
              <span className="font-medium text-zinc-900">{Math.ceil(totalPriceVal)} credits</span>
            </div>
            <div className="flex justify-between items-center font-bold text-[15px] text-zinc-900 pt-3 border-t border-zinc-200 px-1">
              <span>{t("Estimated Cost")} (USD)</span>
              <span className="text-blue-600">${(Math.ceil(totalPriceVal) / 1000).toFixed(6)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVideoFormula = () => {
    const outputPrice = rule.output_sale_price || rule.base_sale_price || 0;
    const duration = pricing.video_token_duration_seconds || pricing.duration || rule.duration_value;
    const resolution = pricing.resolution || rule.resolution;
    const videoTokens = pricing.video_tokens || log.usage_snapshot_json?.video_tokens || usage.video_tokens || log.video_tokens || log.usage?.video_tokens || log.usage?.total_tokens || pricing.matched_rule?.video_tokens || usage.total_tokens || log.usage_snapshot_json?.total_tokens || usage.completion_tokens || usage.prompt_tokens || 0;
    const ratio = pricing.ratio;
    const generateAudio = pricing.generate_audio;
    
    const unitSize = rule.unit_size || 1000000;
    const qpu = pricing.quota_per_unit || 1000;

    const totalPriceVal = (videoTokens * outputPrice / unitSize) * qpu;

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-800 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-purple-500" />
          {t("Combination Billing (Video)")}
        </h3>
        <div className="bg-zinc-50 rounded-xl p-4 space-y-3 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {resolution && <Badge variant="outline" className="bg-white">{resolution}</Badge>}
            {duration && <Badge variant="outline" className="bg-white">{duration}s</Badge>}
            {ratio && <Badge variant="outline" className="bg-white">{ratio}</Badge>}
            {generateAudio !== undefined && <Badge variant="outline" className="bg-white">{generateAudio ? 'Audio: Yes' : 'Audio: No'}</Badge>}
            {pricing.mode && <Badge variant="outline" className="bg-white">{pricing.mode} mode</Badge>}
          </div>
          
          <div className="grid grid-cols-[1fr_auto] gap-y-1.5 text-zinc-600 bg-white p-3 rounded border border-zinc-200 shadow-sm">
            <span className="text-zinc-500">video_tokens</span>
            <span className="font-medium text-zinc-900">{videoTokens}</span>
            <span className="text-zinc-500">output_sale_price</span>
            <span className="font-medium text-zinc-900">{outputPrice}</span>
            <span className="text-zinc-500">unit_size</span>
            <span className="font-medium text-zinc-900">{unitSize}</span>
            <span className="text-zinc-500">quota_per_unit</span>
            <span className="font-medium text-zinc-900">{qpu}</span>
          </div>

          <div className="pt-2 text-zinc-600 px-1 mt-3">
            <div className="mb-3 p-3 bg-white border border-zinc-200 rounded text-[11px] text-zinc-600 font-mono break-all leading-relaxed whitespace-pre-wrap shadow-sm">
              <span className="font-semibold text-zinc-800 block mb-2">{t("Formula Step-by-Step")}:</span>
              {`  ${videoTokens} × ${outputPrice} ÷ ${unitSize} × ${qpu}\n\n`}
              {`= ${totalPriceVal.toFixed(4)}`}
            </div>

            <div className="flex justify-between items-center text-sm text-zinc-600 mb-1">
              <span>{t("Calculated credits")}</span>
              <span className="font-medium text-zinc-900">{totalPriceVal.toFixed(4)} credits</span>
            </div>
            <div className="flex justify-between items-center text-sm text-zinc-600 mb-3">
              <span>{t("Final Deducted credits")} <span className="text-[10px] font-mono">(Math.ceil)</span></span>
              <span className="font-medium text-zinc-900">{Math.ceil(totalPriceVal)} credits</span>
            </div>
            <div className="flex justify-between items-center font-bold text-[15px] text-zinc-900 pt-3 border-t border-zinc-200">
              <span>{t("Estimated Cost")} (USD)</span>
              <span className="text-blue-600">${(Math.ceil(totalPriceVal) / 1000).toFixed(6)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderImageFormula = () => {
    const basePrice = rule.base_sale_price || 0;
    const imageCount = pricing.image_count || 1;
    const resolution = pricing.resolution || rule.resolution || 'Default';
    
    const unitSize = rule.unit_size || 1;
    const qpu = pricing.quota_per_unit || 1000;

    const totalPriceVal = (basePrice * imageCount / unitSize) * qpu;

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-800 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-purple-500" />
          {t("Unit Billing (Image)")}
        </h3>
        <div className="bg-zinc-50 rounded-xl p-4 space-y-3 font-mono text-xs">
           <div className="flex justify-between items-center text-zinc-600 mb-2">
            <span className="flex items-center gap-2">
              <ImageIcon className="w-3.5 h-3.5" />
              {t("Resolution")} / {t("Mode")}
            </span>
            <span>{resolution}</span>
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-y-1.5 text-zinc-600 bg-white p-3 rounded border border-zinc-200 shadow-sm">
            <span className="text-zinc-500">base_sale_price</span>
            <span className="font-medium text-zinc-900">{basePrice}</span>
            <span className="text-zinc-500">image_count</span>
            <span className="font-medium text-zinc-900">{imageCount}</span>
          </div>

          <div className="pt-2 text-zinc-600 px-1 mt-3">
            <div className="mb-3 p-3 bg-white border border-zinc-200 rounded text-[11px] text-zinc-600 font-mono break-all leading-relaxed whitespace-pre-wrap shadow-sm">
              <span className="font-semibold text-zinc-800 block mb-2">{t("Formula Step-by-Step")}:</span>
              {`  ( ${basePrice} × ${imageCount} ) ÷ ${unitSize} × ${qpu}\n\n`}
              {`= ${totalPriceVal.toFixed(4)}`}
            </div>

            <div className="flex justify-between items-center text-sm text-zinc-600 mb-1">
              <span>{t("Calculated credits")}</span>
              <span className="font-medium text-zinc-900">{totalPriceVal.toFixed(4)} credits</span>
            </div>
            <div className="flex justify-between items-center text-sm text-zinc-600 mb-3">
              <span>{t("Final Deducted credits")} <span className="text-[10px] font-mono">(Math.ceil)</span></span>
              <span className="font-medium text-zinc-900">{Math.ceil(totalPriceVal)} credits</span>
            </div>
            <div className="flex justify-between items-center font-bold text-[15px] text-zinc-900 pt-3 border-t border-zinc-200">
              <span>{t("Estimated Cost")} (USD)</span>
              <span className="text-blue-600">${(Math.ceil(totalPriceVal) / 1000).toFixed(6)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAudioFormula = () => {
    const basePrice = pricing.base_sale_price || rule.base_sale_price || 0;
    const characters = usage.prompt_tokens || pricing.final_quota || 0;
    const unitSize = rule.unit_size || 1000;
    const qpu = pricing.quota_per_unit || 1000;

    const totalPriceVal = (characters * basePrice / unitSize) * qpu;

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-800 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-purple-500" />
          {t("Length Billing (Audio)")}
        </h3>
        <div className="bg-zinc-50 rounded-xl p-4 space-y-3 font-mono text-xs">
          <div className="grid grid-cols-[1fr_auto] gap-y-1.5 text-zinc-600 bg-white p-3 rounded border border-zinc-200 shadow-sm">
            <span className="text-zinc-500">prompt_tokens / characters</span>
            <span className="font-medium text-zinc-900">{characters}</span>
            <span className="text-zinc-500">base_sale_price</span>
            <span className="font-medium text-zinc-900">{basePrice}</span>
            <span className="text-zinc-500">unit_size</span>
            <span className="font-medium text-zinc-900">{unitSize}</span>
            <span className="text-zinc-500">quota_per_unit</span>
            <span className="font-medium text-zinc-900">{qpu}</span>
          </div>
          
          <div className="pt-2 text-zinc-600 px-1 mt-3">
            <div className="mb-3 p-3 bg-white border border-zinc-200 rounded text-[11px] text-zinc-600 font-mono break-all leading-relaxed whitespace-pre-wrap shadow-sm">
              <span className="font-semibold text-zinc-800 block mb-2">{t("Formula Step-by-Step")}:</span>
              {`  ( ${characters} × ${basePrice} ÷ ${unitSize} ) × ${qpu}\n\n`}
              {`= ${((characters * basePrice)).toFixed(4)} ÷ ${unitSize} × ${qpu}\n\n`}
              {`= ${totalPriceVal.toFixed(4)}`}
            </div>

            <div className="flex justify-between items-center text-sm text-zinc-600 mb-1">
              <span>{t("Calculated credits")}</span>
              <span className="font-medium text-zinc-900">{totalPriceVal.toFixed(4)} credits</span>
            </div>
            <div className="flex justify-between items-center text-sm text-zinc-600 mb-3">
              <span>{t("Final Deducted credits")} <span className="text-[10px] font-mono">(Math.ceil)</span></span>
              <span className="font-medium text-zinc-900">{Math.ceil(totalPriceVal)} credits</span>
            </div>
            <div className="flex justify-between items-center font-bold text-[15px] text-zinc-900 pt-3 border-t border-zinc-200">
              <span>{t("Estimated Cost")} (USD)</span>
              <span className="text-blue-600">${(Math.ceil(totalPriceVal) / 1000).toFixed(6)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const type = log.request_type || log.media_type || pricing.media_type;

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="bg-white border text-center border-zinc-200 rounded-xl p-4 flex-1">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t("Total Cost")} (USD)</p>
          <p className="text-3xl font-bold text-zinc-900 mt-2">${((log.quota || pricing.final_quota || 0) / 1000).toFixed(6)}</p>
        </div>
        <div className="bg-zinc-50 border text-center border-zinc-200 rounded-xl p-4 flex-1">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t("Total Credits")}</p>
          <p className="text-3xl font-bold text-zinc-900 mt-2">{log.quota || pricing.final_quota || 0}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">{t("Overview")}</h3>
        <div className="grid grid-cols-[140px_1fr] gap-y-2 text-sm">
          <div className="text-zinc-500">{t("Provider")}</div>
          <div className="text-zinc-900 font-medium">{log.provider_name_snapshot || 'Unknown'}</div>
          
          <div className="text-zinc-500">{t("Model ID")}</div>
          <div className="text-zinc-900 font-mono text-xs mt-0.5">{log.model_id || pricing.model_name}</div>
          
          <div className="text-zinc-500">{t("Status")}</div>
          <div>
            <Badge variant="outline" className={log.status === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}>
              {log.status}
            </Badge>
          </div>
          
          <div className="text-zinc-500">{t("Executed At")}</div>
          <div className="text-zinc-900">{log.created_at ? new Date(log.created_at * 1000).toLocaleString() : 'N/A'}</div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-zinc-100">
        <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">{t("Request Info")}</h3>
        <div className="grid grid-cols-[140px_1fr] gap-y-2 text-sm">
          <div className="text-zinc-500">{t("Request ID")}</div>
          <div className="text-zinc-900 font-mono text-xs mt-0.5 break-all">{log.request_id || 'N/A'}</div>

          {log.request_endpoint && (
            <>
              <div className="text-zinc-500">{t("Endpoint")}</div>
              <div className="text-zinc-900 font-mono text-xs mt-0.5 break-all">{log.request_endpoint}</div>
            </>
          )}

          {log.task_id && (
            <>
              <div className="text-zinc-500">{t("Task ID")}</div>
              <div className="text-zinc-900 font-mono text-xs mt-0.5">{log.task_id}</div>
            </>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-100">
        {type === 'text' && renderTextFormula()}
        {type === 'video' && renderVideoFormula()}
        {type === 'image' && renderImageFormula()}
        {type === 'audio' && renderAudioFormula()}
        {(!['text', 'video', 'image', 'audio'].includes(type)) && (
          <div className="text-sm text-zinc-500">{t("Detailed breakdown formula is not available for this media type.")}</div>
        )}
      </div>

      <div className="pt-4 border-t border-zinc-100">
        <Accordion className="w-full">
          <AccordionItem value="raw-json" className="border-none">
            <AccordionTrigger className="text-sm font-semibold text-zinc-800 hover:no-underline py-2">
              <span className="flex items-center gap-2">
                {t("Generation Data")} <span className="text-zinc-500 font-normal text-xs">{t("Raw JSON")}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="relative mt-2">
                <div className="absolute right-2 top-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-xs bg-white/90 backdrop-blur"
                    onClick={handleCopy}
                  >
                    {copied ? <Check className="w-3.5 h-3.5 mr-1.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                    {copied ? t("Copied") : t("Copy JSON")}
                  </Button>
                </div>
                <pre className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 pb-6 overflow-x-auto text-xs font-mono text-zinc-700 max-h-[400px] overflow-y-auto">
                  {JSON.stringify(filteredLog, null, 2)}
                </pre>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
