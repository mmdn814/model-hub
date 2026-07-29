const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf8');

// Remove settingsNavItem from getting pushed
code = code.replace(/    items\.push\(settingsNavItem\);\n/, '');

// Remove balance UI block
const balanceBlock = `<div className="bg-zinc-100/80 rounded-xl p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500">{t("Balance")}</span>
              <span className="text-sm font-bold text-zinc-900">124,500</span>
            </div>
            <button className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-white border border-zinc-200 shadow-sm rounded-lg text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-300 transition-all">
              <CreditCard className="w-3.5 h-3.5" />
              {t("Add Funds")}
            </button>
          </div>`;
if (code.includes(balanceBlock)) {
    code = code.replace(balanceBlock, '');
} else {
    console.log("Warning: exact balance block not found, trying regex...");
    const regex = /<div className="bg-zinc-100\/80 rounded-xl p-3 flex flex-col gap-2">[\s\S]*?<\/div>/;
    code = code.replace(regex, '');
}

fs.writeFileSync('src/components/Layout.tsx', code);
console.log('Cleaned up Layout.tsx');
