import fs from 'fs';

let code = fs.readFileSync('src/pages/Pricing.tsx', 'utf-8');

// The issue right now is Pricing.tsx is completely messed up.
// Let's find the start of the map:
const mapStart = code.indexOf('{model.versions.map((version, idx) => (');
// The end which is cut... Wait, the end is:
/*
                                    {t(model.category.toLowerCase())}
                                  </Badge>
                                  
          ) : (
            <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center text-zinc-500">
*/

// Let's completely replace the mapping inside `filteredModels.map`
const badCodeStart = code.indexOf('{filteredModels.length > 0 ? (');
const badCodeEnd = code.indexOf('          ) : (', badCodeStart);

if (badCodeStart !== -1 && badCodeEnd !== -1) {
    const fixedContent = `{filteredModels.length > 0 ? (
            filteredModels.map((model) => {
              const fullModel = models.find(m => m.id === model.id || m.id.startsWith(model.id));
              const providerLogo = fullModel?.providerLogo || model.provider[0];
              
              return (
                <div key={model.id} className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 p-5 bg-zinc-50/80 border-b border-zinc-100">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      {providerLogo}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 leading-tight">
                        {fullModel?.name || model.id}
                      </h3>
                      <p className="text-sm text-zinc-500 mt-0.5 font-medium">{fullModel?.description || "High-performance AI model"}</p>
                    </div>
                  </div>

                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
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
                          {model.versions.some(v => v.cachePrice !== undefined) && (
                            <th className="py-3 px-6 text-sm font-semibold text-zinc-500 w-[25%] text-right">
                              {t("Cache Hit (Credits / USD)")}
                            </th>
                          )}
                          <th className="py-3 px-6 text-sm font-semibold text-zinc-500 w-[25%] text-right">
                            {t("Our Price (USD)")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {model.versions.map((version, idx) => (
                          <tr key={idx} className="border-b border-zinc-100 last:border-none hover:bg-zinc-50/50 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex flex-col gap-1.5">
                                <span className="font-medium text-[15px] text-zinc-800">
                                  {version.id}
                                </span>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className={cn(
                                    "text-[10px] uppercase tracking-wider border-transparent px-2 py-0.5 font-semibold",
                                    model.category === "video" && "bg-blue-100 text-[#0055FF] hover:bg-blue-100",
                                    model.category === "chat" && "bg-blue-100 text-[#0055FF] hover:bg-blue-100",
                                    model.category === "image" && "bg-blue-100 text-[#0055FF] hover:bg-blue-100"
                                  )}>
                                    {t(model.category.toLowerCase())}
                                  </Badge>
                                  <span className="text-sm text-zinc-500 font-medium">
                                    {model.provider}
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
                            {model.versions.some(v => v.cachePrice !== undefined) && (
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })
`;
  code = code.slice(0, badCodeStart) + fixedContent + code.slice(badCodeEnd);
  fs.writeFileSync('src/pages/Pricing.tsx', code);
  console.log("Fixed Pricing.tsx");
} else {
  console.log("Could not find start/end.");
}
