import fs from 'fs';

let code = fs.readFileSync('src/pages/Pricing.tsx', 'utf-8');

// Replace table header in Pricing.tsx
const thTarget = `<th className="py-3 px-6 text-sm font-semibold text-zinc-500 w-[25%] text-right">
                            {t("Our Price (USD)")}
                          </th>`;
const thReplacement = `{model.versions.some(v => v.cachePrice !== undefined) && (
                            <th className="py-3 px-6 text-sm font-semibold text-zinc-500 w-[25%] text-right">
                              {t("Cache Hit (Credits / USD)")}
                            </th>
                          )}
                          <th className="py-3 px-6 text-sm font-semibold text-zinc-500 w-[25%] text-right">
                            {t("Our Price (USD)")}
                          </th>`;
code = code.replace(thTarget, thReplacement);

// Replace table body in Pricing.tsx
const tdTarget = `<td className="py-4 px-6 align-top text-right">
                              <span className="font-bold text-[17px] text-[#0055FF]">
                                \${version.price.toFixed(3)}
                              </span>
                            </td>`;

const tdReplacement = `{model.versions.some(v => v.cachePrice !== undefined) && (
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
                            </td>`;

code = code.replace(tdTarget, tdReplacement);

// Remove the old cache hit row/badge logic
code = code.replace(/\{version\.isCache && \([\s\S]*?\}\)/, '');

fs.writeFileSync('src/pages/Pricing.tsx', code);
console.log('Pricing.tsx updated');
