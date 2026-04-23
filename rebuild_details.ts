import fs from 'fs';

let code = fs.readFileSync('src/pages/ModelDetails.tsx', 'utf-8');

// The issue right now is the tables are messed up.
// I will locate the start of Section 2 "Available Model Versions"
const section2Match = code.indexOf('{/* 2. Available Model Versions */}');
// I will locate the end of Section 6 "Pricing Details" ... actually I'll locate the end of Section 6 which is `</section>` before `</div>\n            </DevAnnotation>\n          )}\n        </div>`
const sectionEndRegex = /<\/section>\s*<\/div>\s*<\/DevAnnotation>\s*\)\}\s*<\/div>\s*<\/div>\s*<\/div>\s*\);\s*\}/;

const endMatch = code.match(sectionEndRegex);

if (section2Match !== -1 && endMatch) {
    const startPart = code.slice(0, section2Match);
    const endPart = code.slice(endMatch.index);
    
    // Construct the correct middle part
    const middlePart = `{/* 2. Available Model Versions */}
              <section>
                <h2 className="text-2xl font-bold text-[#0B1120] mb-4 flex items-center gap-2">
                  <span className="text-red-500">📌</span> Available Model Versions
                </h2>
                <p className="text-zinc-600 mb-4">
                  To ensure stability in production environments, we provide both trunk models that always point to the latest version, and snapshot models locked to specific dates:
                </p>
                <div className="border border-zinc-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 border-b border-zinc-200">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-zinc-900">{t("Model ID (API Call)")}</th>
                        <th className="px-6 py-4 font-semibold text-zinc-900">{t("Type")}</th>
                        <th className="px-6 py-4 font-semibold text-zinc-900">{t("API Docs")}</th>
                        <th className="px-6 py-4 font-semibold text-zinc-900">{t("Credits")} <Info className="w-3 h-3 inline-block text-zinc-400" /></th>
                        <th className="px-6 py-4 font-semibold text-zinc-900">{t("Price (USD)")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      <tr className="bg-white">
                        <td className="px-6 py-4 font-mono text-blue-600 font-medium">
                          <div className="flex items-center gap-2">
                            {model.id}
                            <ModelIdCopyButton id={model.id} />
                          </div>
                        </td>
                        <td className="px-6 py-4"><Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-transparent font-bold">LATEST</Badge></td>
                        <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer flex items-center gap-1">Official Docs <ExternalLink className="w-3 h-3" /></td>
                        <td className="px-6 py-4 font-bold text-zinc-800">
                          {(() => {
                            const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
                            return pData && pData.versions.length > 0 ? pData.versions[0].credits : "-";
                          })()}
                        </td>
                        <td className="px-6 py-4 font-bold text-blue-600">
                          {(() => {
                            const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
                            return pData && pData.versions.length > 0 ? "$" + pData.versions[0].price.toFixed(3) : "-";
                          })()}
                        </td>
                      </tr>
                      {snapshotModels.map(sm => (
                      <tr key={sm.id} className="bg-white">
                        <td className="px-6 py-4 font-mono text-zinc-600">
                          <div className="flex items-center gap-2">
                            {sm.id}
                            <ModelIdCopyButton id={sm.id} />
                          </div>
                        </td>
                        <td className="px-6 py-4"><Badge variant="secondary" className="bg-zinc-100 text-zinc-500 hover:bg-zinc-100 border-transparent font-bold">FIXED</Badge></td>
                        <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer flex items-center gap-1">Official Docs <ExternalLink className="w-3 h-3" /></td>
                        <td className="px-6 py-4 font-bold text-zinc-800">
                          {(() => {
                            const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
                            return pData && pData.versions.length > 0 ? pData.versions[0].credits : "-";
                          })()}
                        </td>
                        <td className="px-6 py-4 font-bold text-blue-600">
                          {(() => {
                            const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
                            return pData && pData.versions.length > 0 ? "$" + pData.versions[0].price.toFixed(3) : "-";
                          })()}
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 6. Pricing Details */}
              <section id="pricing">
                <h2 className="text-2xl font-bold text-[#0B1120] mb-4 flex items-center gap-2">
                  <span className="text-yellow-600">💰</span> 6. Pricing Details
                </h2>
                
                <DevAnnotation
                  elementName="Pricing Details Description"
                  componentType="Section"
                  functionDesc="Displays the model's pricing rules and combinations"
                  devNotes="🚨 Internal Pricing Note: All prices displayed on the frontend are already marked up by the platform on the backend."
                >
                  <p className="text-zinc-600 mb-6">
                    The actual billing for this model is dynamically calculated based on the specific parameters passed in your API request. Below are the specific combinations and their corresponding pricing:
                  </p>

                  <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="w-full overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                          <tr className="border-b border-zinc-100 bg-zinc-50/50">
                            <th className="py-3 px-6 text-sm font-semibold text-zinc-500 w-[50%]">
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
                                  <td colSpan={3} className="py-4 px-6 text-center text-zinc-500">
                                    {t("Pricing information not available.")}
                                  </td>
                                </tr>
                              );
                            }
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
                                      {version.isCache && (
                                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px] uppercase tracking-wider border-transparent px-2 py-0.5 font-semibold">
                                          {t("Cache Hit")}
                                        </Badge>
                                      )}
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
                                <td className="py-4 px-6 align-top text-right">
                                  <span className="font-bold text-[17px] text-[#0055FF]">
                                    \${version.price.toFixed(3)}
                                  </span>
                                </td>
                              </tr>
                            ));
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </DevAnnotation>
              </section>
`;

    // Make sure my description fix is also preserved
    const newCode = startPart + middlePart + endPart;
    // Replace the description if it still uses the original hardcoded Qwen text
    const fixedCode = newCode.replace(
      "Alibaba Cloud's Qwen-Image-2.0 unifies image generation and editing. It provides realistic texture generation, structured text rendering, native 2K high-resolution output, and flexible image editing capabilities, fully empowering creative and visual design workflows.",
      "{model.description}"
    );

    fs.writeFileSync('src/pages/ModelDetails.tsx', fixedCode);
    console.log("Successfully rebuilt ModelDetails.tsx sections.");
} else {
    console.log("Failed to find boundaries.", {section2Match, endMatchFound: !!endMatch});
}
