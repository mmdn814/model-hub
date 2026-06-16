import fs from 'fs';

let content = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

// 1. Extract Modality Tabs
const startModality = '{/* Modality Tabs */}';
const endModality = '{/* Processing Mode Toggle */}';
const modIdxStart = content.indexOf(startModality);
const modIdxEnd = content.indexOf(endModality);
const modalityTabsCode = content.slice(modIdxStart, modIdxEnd);

// 2. Extract Processing Mode Toggle (might be empty/comments)
const startProcessing = '{/* Processing Mode Toggle */}';
const endProcessing = '{/* Filter Bar */}';
const procIdxStart = content.indexOf(startProcessing);
const procIdxEnd = content.indexOf(endProcessing);
const processingTabsCode = content.slice(procIdxStart, procIdxEnd);

// 3. Extract Filter bar
const startFilter = '{/* Filter Bar */}';
const endFilter = '{true ? (\\n        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-2">';
// Let's use simpler finding for endFilter
const endFilterIdx = content.indexOf('{true ? (\n');

const filterBarCode = content.slice(content.indexOf(startFilter), endFilterIdx);

// Delete them from their original place
content = content.replace(modalityTabsCode, '');
content = content.replace(processingTabsCode, '');
content = content.replace(filterBarCode, '');

// Also add title to Overview Cards
// Where is `{true ? (\n        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-2">`?
const originalOverviewStr = `{true ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-2">`;
if (content.includes(originalOverviewStr)) {
  content = content.replace(
    originalOverviewStr,
    `{/* Level 2: 24h Global Overview */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-zinc-900">{t("Global Overview (24h)")}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-2">`
  );
  // Also we need to fix the closing brace for the `{true ? (` condition which we removed.
  // Wait, the `{true ? (` is closed by `)}` later. Let's find `)}` right before `{/* Level 3: Usage Charts */}`.
  // The structure is:
  //      </Card>
  //    </div>
  //  )}
  //  {/* Level 3: Usage Charts */}
  
  content = content.replace(
`        </div>
      )}

      {/* Level 3: Usage Charts */}`,
`        </div>

      {/* Level 3: Usage Charts */}`
  );
}

// Now insert them into Usage Analytics
const insertTargetStr = `<Card className="bg-white border-zinc-200 shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b border-zinc-100 flex justify-end items-center bg-zinc-50/50">
            <div className="flex bg-zinc-100/80 p-1 rounded-lg border border-zinc-200/50 shadow-inner">`;

const replaceStr = `<Card className="bg-white border-zinc-200 shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
               <h3 className="text-lg font-bold text-zinc-900">{t("Metrics Breakdown")}</h3>
               <div className="flex bg-zinc-100/80 p-1 rounded-lg border border-zinc-200/50 shadow-inner">`;

content = content.replace(insertTargetStr, replaceStr);

// We need to insert the Filter Bar and Modality Tabs inside `.p-4` but below the header.
// Let's find where the toggle buttons end.
const toggleEndStr = `</button>
            </div>
          </div>`;
          
const injectCode = `</button>
            </div>
          </div>
          <div className="px-4 pb-4 bg-zinc-50/50 flex flex-col gap-4 border-b border-zinc-100">
             ${modalityTabsCode.trim()}
             ${processingTabsCode.trim()}
             ${filterBarCode.trim()}
          </div>`;

content = content.replace(toggleEndStr, injectCode);

fs.writeFileSync('src/pages/Dashboard.tsx', content);
console.log('Refactored Dashboard.tsx');
