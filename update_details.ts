import fs from 'fs';

let code = fs.readFileSync('src/pages/ModelDetails.tsx', 'utf-8');

// replace pricing table body
const replaceStart = code.indexOf('<tbody>');
const replaceEnd = code.indexOf('</tbody>');

if (replaceStart !== -1 && replaceEnd !== -1) {
    const importStatement = `import { pricingData } from "@/data/pricing";\n`;
    if (!code.includes('import { pricingData }')) {
        const lastImport = code.lastIndexOf('import');
        const nextLine = code.indexOf('\n', lastImport) + 1;
        code = code.slice(0, nextLine) + importStatement + code.slice(nextLine);
    }
    
    const newBody = `<tbody>
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
                                    $\{version.price.toFixed(3)}
                                  </span>
                                </td>
                              </tr>
                            ));
                          })()}
                        </tbody>`;

    const codeStart = code.slice(0, code.indexOf('<tbody>'));
    const codeEnd = code.slice(code.indexOf('</tbody>') + '</tbody>'.length);
    code = codeStart + newBody + codeEnd;
    
    // Check if there is another table with hardcoded prices? E.g., the top badge.
    // Replace top badge prices:
    code = code.replace(/<span className="text-emerald-500 mr-1">\$<\/span> \$0\.030 <span className="text-emerald-500\/70 text-xs ml-1">\/ IMAGE<\/span>/g,
      `{(() => {
        const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
        const priceStr = pData && pData.versions.length > 0 ? pData.versions[0].price.toFixed(3) : "0.000";
        const unitStr = pData && pData.versions.length > 0 ? pData.versions[0].unit.replace("per ", "").toUpperCase() : "REQ";
        return <><span className="text-emerald-500 mr-1">$</span> \${priceStr} <span className="text-emerald-500/70 text-xs ml-1">/ {unitStr}</span></>;
      })()}`);
    
    code = code.replace(/<span>30 <span className="text-slate-500 text-xs ml-1 font-semibold">CREDITS \/ IMAGE<\/span><\/span>/g,
      `<span>{(() => {
        const pData = pricingData.find(pd => pd.modelIds?.includes(mainModelId || model.id) || pd.id === (mainModelId || model.id));
        const creditsStr = pData && pData.versions.length > 0 ? pData.versions[0].credits : "0";
        const unitStr = pData && pData.versions.length > 0 ? pData.versions[0].unit.replace("per ", "").toUpperCase() : "REQ";
        return <>{creditsStr} <span className="text-slate-500 text-xs ml-1 font-semibold">CREDITS / {unitStr}</span></>;
      })()}</span>`);
    
    fs.writeFileSync('src/pages/ModelDetails.tsx', code);
    console.log('Successfully updated ModelDetails.tsx');
} else {
    console.log('Failed to find tbody');
}
