const fs = require('fs');
let code = fs.readFileSync('src/pages/Settings.tsx', 'utf8');

// Find the start of the section to remove
const startIdx = code.indexOf('<DevAnnotation\n        elementName="账户统一测试工具 (合并流程 Demo)"');
if (startIdx !== -1) {
    code = code.substring(0, startIdx);
    
    // Add the new Security block
    code += `
      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <ShieldCheck className="w-5 h-5 text-blue-500" />
          <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase">
            {t("Security")}
          </h3>
        </div>

        <div className="max-w-md space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{t("New Password")}</label>
            <input 
              type="password" 
              placeholder={t("Enter new password")}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{t("Confirm Password")}</label>
            <input 
              type="password" 
              placeholder={t("Confirm new password")}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button className="w-full bg-[#0f172a] hover:bg-slate-800 text-white rounded-xl">
            {t("Update Password")}
          </Button>
        </div>
      </div>
    </div>
  );
}
`;
    fs.writeFileSync('src/pages/Settings.tsx', code);
    console.log('Settings.tsx updated successfully');
} else {
    console.log('Target text not found');
}
