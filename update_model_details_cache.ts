import fs from 'fs';

let code = fs.readFileSync('src/pages/ModelDetails.tsx', 'utf-8');

// We have the thead and tbody block
const blockStart = code.indexOf('<table className="w-full text-left border-collapse min-w-[700px]">');
const blockEnd = code.indexOf('</table>', blockStart);

if (blockStart !== -1 && blockEnd !== -1) {
    const replacement = `<table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                          <tr className="border-b border-zinc-100 bg-zinc-50/50">
                            <th className="py-3 px-6 text-sm font-semibold text-zinc-500 w-[25%]">
                              {t("Model & Modality")}
                            </th>
                            <th className="py-3 px-6 text-sm font-semibold text-zinc-500 w-[25%]">
                              <div className="flex items-center gap-1">
                                {t("Credits / Gen")}
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="w-3.5 h-3.5 text-zinc-400 cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{t("1 USD = 1000 Credits")}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </th>
                            {(() => {
                              const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
                              return pData && pData.versions.some(v => v.cachePrice !== undefined) ? (
                                <th className="py-3 px-6 text-sm font-semibold text-zinc-500 w-[25%] text-right">
                                  {t("Cache Hit (Credits / USD)")}
                                </th>
                              ) : null;
                            })()}
                            <th className="py-3 px-6 text-sm font-semibold text-zinc-500 w-[25%] text-right">
                              {t("Our Price (USD)")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                            const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
                            if (!pData) {
                              return (
                                <tr>
                                  <td colSpan={4} className="py-4 px-6 text-center text-zinc-500">
                                    {t("Pricing information not available.")}
                                  </td>
                                </tr>
                              );
                            }
                            const hasCache = pData.versions.some(v => v.cachePrice !== undefined);
                            return pData.versions.map((version, idx) => (
                              <tr key={idx} className="border-b border-zinc-100 last:border-none hover:bg-zinc-50/50 transition-colors">
                                <td className="py-4 px-6">
                                  <div className="flex flex-col gap-1.5">
                                    <span className="font-medium text-[15px] text-zinc-800">
                                      {version.id}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="secondary" className={cn(
                                        "text-[10px] uppercase tracking-wider border-transparent px-2 py-0.5 font-semibold",
                                        pData.category === "video" && "bg-blue-100 text-[#0055FF] hover:bg-blue-100",
                                        pData.category === "chat" && "bg-blue-100 text-[#0055FF] hover:bg-blue-100",
                                        pData.category === "image" && "bg-blue-100 text-[#0055FF] hover:bg-blue-100"
                                      )}>
                                        {t(pData.category.toLowerCase())}
                                      </Badge>
                                      <span className="text-sm text-zinc-500 font-medium">
                                        {pData.provider}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-6 align-top">
                                  <div className="flex flex-col">
                                    <span className="font-bold text-[17px] text-zinc-900">
                                      {version.credits}
                                    </span>
                                    <span className="text-[13px] text-zinc-400 font-medium mt-0.5">
                                      {t(version.unit)}
                                    </span>
                                  </div>
                                </td>
                                {hasCache && (
                                  <td className="py-4 px-6 align-top text-right">
                                    {version.cachePrice !== undefined ? (
                                      <div className="flex flex-col items-end">
                                        <span className="font-bold text-[17px] text-emerald-600">
                                          \${version.cachePrice.toFixed(3)}
                                        </span>
                                        <span className="text-[13px] text-zinc-400 font-medium mt-0.5">
                                          {version.cacheCredits} {t("credits")}
                                        </span>
                                      </div>
                                    ) : (
                                      <span className="text-zinc-300">-</span>
                                    )}
                                  </td>
                                )}
                                <td className="py-4 px-6 align-top text-right">
                                  <span className="font-bold text-[17px] text-[#0055FF]">
                                    \${version.price.toFixed(3)}
                                  </span>
                                </td>
                              </tr>
                            ));
                          })()}
                        </tbody>`;
    code = code.slice(0, blockStart) + replacement + code.slice(blockEnd);
    fs.writeFileSync('src/pages/ModelDetails.tsx', code);
    console.log("Updated cache columns in ModelDetails");
} else {
    console.log("Could not find table");
}
