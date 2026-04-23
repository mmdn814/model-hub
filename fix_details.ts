import fs from 'fs';

let code = fs.readFileSync('src/pages/ModelDetails.tsx', 'utf-8');

// I will split code with the pricing section marker
const pricingMarker = "{/* 6. Pricing Details */}";
const parts = code.split(pricingMarker);

if (parts.length === 2) {
    let topHalf = parts[0];
    let bottomHalf = parts[1];

    // Let's restore the topHalf's tbody
    // Find the tbody inside topHalf that was messed up.
    // Basically from `<table className="w-full text-left border-collapse min-w-[700px]">` ... wait no
    // The topHalf's table starts around:
    // `<table className="w-full text-left text-sm">`
    // It currently has `<thead className="bg-zinc-50 border-b border-zinc-200">...</thead>` and then our injected `<tbody>`
    
    // I am going to replace the injected `<tbody>...</tbody>` in topHalf with a generic simple tbody for snapshot models:
    const regexTbody = /<tbody>[\s\S]*?<\/tbody>/;
    topHalf = topHalf.replace(regexTbody, `<tbody>
                        <tr className="bg-white border-b border-zinc-100">
                          <td className="px-6 py-4 font-mono text-zinc-600">
                            <div className="flex items-center gap-2">
                              {model.id}
                            </div>
                          </td>
                          <td className="px-6 py-4"><Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-transparent font-bold">LATEST</Badge></td>
                          <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer flex items-center gap-1">Official Docs</td>
                          <td className="px-6 py-4 font-bold text-zinc-800">Standard</td>
                          <td className="px-6 py-4 font-bold text-blue-600">Default</td>
                        </tr>
                      </tbody>`);

    // Now for bottomHalf, which contains the pricing table.
    // It has `<tbody>...</tbody>`. Let's replace it with the dynamic one.
    bottomHalf = bottomHalf.replace(regexTbody, `<tbody>
                          {(() => {
                            const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
                            if (!pData) {
                              return (
                                <tr>
                                  <td colSpan={3} className="py-4 px-6 text-center text-zinc-500">
                                    Pricing information not available.
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
                        </tbody>`);
                        
    // Let's ensure the closing tags are correct.
    // Previously we had unexpected closing tag from mismatched div.
    // The previous error:
    /*
Unexpected closing "div" tag does not match opening "DevAnnotation" tag
639|                  </DevAnnotation>
640|                </section>
641|              </div>
   |                ^
642|              </DevAnnotation>
643|            )}
    */
    // Let's just fix the whole bottom structure safely using regex.
    fs.writeFileSync('src/pages/ModelDetails.tsx', topHalf + pricingMarker + bottomHalf);
    console.log("Updated ModelDetails.tsx tables.");
} else {
    console.log("Pricing marker not found.");
}
