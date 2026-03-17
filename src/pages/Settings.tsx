import { ShieldCheck, Globe, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DevAnnotation } from "@/components/DevAnnotation";

export default function Settings() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-[#0f172a] tracking-tight mb-2">
          {t("Settings")}
        </h1>
        <p className="text-lg text-slate-500">
          {t("Manage your account preferences, security, and billing configurations.")}
        </p>
      </div>

      <DevAnnotation
        elementName="个人资料卡片"
        componentType="Card"
        functionDesc="展示当前登录用户的基本信息和用户等级标识"
        dataSource="当前登录用户的会话信息 (User Session) / 订阅服务API"
        autoLogic="Tier 0(Free): 仅注册或Pro余额耗尽。Tier 1(Pro): 余额>0且曾购买；余额=0且无自动充值1小时内降级Free。Tier 2(Scale): 绑卡且激活自动充值；关闭自动充值降级Pro，扣款失败且余额耗尽降级Free。"
        devNotes="标签仅显示 FREE、PRO 或 SCALE。不同等级对应不同的 API 速率限制 (Rate Limits) 和服务保障。"
      >
        <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 bg-[#e0f2fe] text-[#0284c7] rounded-3xl flex items-center justify-center text-4xl font-black shadow-inner">
              JD
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#0f172a] mb-1">
                {t("James Developer")}
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-xl text-slate-500">{t("james_dev@global.io")}</span>
                <DevAnnotation
                  customContent={
                    <div className="space-y-3 text-sm">
                      <div className="font-bold text-base border-b border-[#fbc02d] pb-1 mb-2">用户等级体系 (User Tiers)</div>
                      <p>系统根据用户的付费行为和余额状态动态划分等级，对应不同的速率限制：</p>
                      
                      <div className="space-y-1">
                        <div className="font-bold text-[#f57f17]">Tier 0: Free (基础用户)</div>
                        <div className="pl-2">
                          <span className="font-semibold">准入：</span>仅完成注册，或 Pro 用户余额耗尽。<br/>
                          <span className="font-semibold">权益：</span>例如较低的并发数 (如 5 RPM)，仅限免费基础模型测试。
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="font-bold text-[#f57f17]">Tier 1: Pro (专业用户)</div>
                        <div className="pl-2">
                          <span className="font-semibold">准入：</span>账户余额 &gt; 0<br/>
                          <span className="font-semibold">权益：</span>例如标准并发数 (如 50 RPM)，解锁所有商业化模型，支持导出 PDF 发票。<br/>
                          <span className="font-semibold">退回准则：</span>当账户余额耗尽 (Credits = 0) 且未开启自动充值时，系统自动将等级退回至 Free。
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="font-bold text-[#f57f17]">Tier 2: Scale (规模化用户)</div>
                        <div className="pl-2">
                          <span className="font-semibold">准入：</span>成功绑定支付方式并激活“自动充值”功能。<br/>
                          <span className="font-semibold">权益：</span>例如最高并发限制 (如 200 RPM)，任务优先排队，后端可以设置例如：自动充值可获额外 1%-5% 的 Credits 赠送。<br/>
                          <span className="font-semibold">退回准则：</span>若手动关闭“自动充值”，等级退回至 Pro；若扣款失败且余额耗尽，退回至 Free。
                        </div>
                      </div>
                    </div>
                  }
                >
                  <span className="bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold px-2.5 py-1 rounded-md tracking-wide uppercase">
                    {t("PRO")}
                  </span>
                </DevAnnotation>
              </div>
            </div>
          </div>
        </div>
      </DevAnnotation>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <ShieldCheck className="w-5 h-5 text-blue-500" />
          <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase">
            {t("LINKED ACCOUNTS")}
          </h3>
        </div>

        <div className="space-y-4">
          {/* Google Account */}
          <DevAnnotation
            elementName="已绑定的 Google 账号"
            componentType="List Item"
            functionDesc="展示已关联的第三方账号状态"
            interactionRule="当前已绑定，不可点击，不可解绑"
            dataSource="用户绑定的 OAuth 提供商列表"
            devNotes="根据后端返回的 provider 列表渲染"
          >
            <div className="flex items-center justify-between bg-[#f8fafc] rounded-3xl p-4 px-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                  <Globe className="w-6 h-6 text-slate-800" />
                </div>
                <span className="text-xl font-bold text-[#0f172a]">
                  {t("Google Account")}
                </span>
              </div>
              <span className="text-sm font-bold text-[#16a34a] tracking-wide uppercase">
                {t("CONNECTED")}
              </span>
            </div>
          </DevAnnotation>

          {/* GitHub Account */}
          <DevAnnotation
            elementName="未绑定的 GitHub 账号"
            componentType="List Item / Button"
            functionDesc="提供绑定其他第三方账号的入口"
            interactionRule="点击 CONNECT 触发 OAuth 绑定流程"
            autoLogic="绑定成功后，状态更新为 CONNECTED 并点亮图标"
            devNotes="需接入 GitHub OAuth 流程，并在回调后刷新当前页面状态"
          >
            <div className="flex items-center justify-between bg-[#f8fafc] rounded-3xl p-4 px-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm opacity-50">
                  <Github className="w-6 h-6 text-slate-800" />
                </div>
                <span className="text-xl font-bold text-slate-300">
                  {t("GitHub Account")}
                </span>
              </div>
              <button className="text-sm font-bold text-blue-500 tracking-wide uppercase hover:underline">
                {t("CONNECT")}
              </button>
            </div>
          </DevAnnotation>
        </div>
      </div>
    </div>
  );
}
