import fs from 'fs';

let code = fs.readFileSync('src/pages/ModelDetails.tsx', 'utf-8');

// The dynamic map starts at `{(() => {` and ends at `})()}`
// And it is inside `<tbody className="divide-y divide-zinc-100">`... WAIT, I don't know exactly what the tags are.
// Let's use a very reliable replacement.
// 1. Snapshot table is currently rendering dynamic pricing. Let's find it.
const snapshotStartMatch = /<tbody className="divide-y divide-zinc-100">|\s*<tbody>\s*\{\(\(\) => \{[\s\S]*?pricingData\.find/;
const snapshotStartIdx = code.indexOf('<tbody>\n                          {(() => {');
if (snapshotStartIdx !== -1) {
    const endDynamicTbody = code.indexOf('</tbody>', snapshotStartIdx);
    
    // Replace it back to a generic snapshot list
    const genericSnapshot = `<tbody className="divide-y divide-zinc-100">
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
                      </tr>`;
    code = code.slice(0, snapshotStartIdx) + genericSnapshot + code.slice(endDynamicTbody);
    
    // Now replace the actual pricing table
    const pricingTableIdx = code.indexOf('<tbody>\n                          {/* Image Variants */}');
    if (pricingTableIdx !== -1) {
        const pricingTableEndIdx = code.indexOf('</tbody>', pricingTableIdx);
        
        const dynamicPricing = `<tbody>
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
                          })()}`;
        code = code.slice(0, pricingTableIdx) + dynamicPricing + code.slice(pricingTableEndIdx);
    } else {
        console.log("Could not find actual pricing table");
    }
    
    // There shouldn't be any missing closing tags except from my previous mistake.
    // The previous mistake was: 
    // `let newBody = <tbody>...</tbody>` replaced `<tbody>...</tbody>` correctly, so no tags were mismatched!
    // Why did I get "Unexpected closing "section" tag does not match opening "div" tag"??
    // Let's trace it carefully when testing.
}

fs.writeFileSync('src/pages/ModelDetails.tsx', code);
console.log("Fixed Tables");
