import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Download, Plus, Settings2, Link as LinkIcon, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { DevAnnotation } from "@/components/DevAnnotation";

export default function Billing() {
  const { t } = useTranslation();
  const [autoTopUpEnabled, setAutoTopUpEnabled] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("20k");
  const [selectedPayment, setSelectedPayment] = useState<string>("credit_card");

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t("Billing & Credits")}</h2>
        <p className="text-zinc-500">{t("Manage your balance, payment methods, and billing history.")}</p>
      </div>

      <div className="max-w-md">
        {/* Balance Card */}
        <Card className="bg-zinc-900 text-zinc-50 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-200">{t("Current Balance")}</CardTitle>
            <CardDescription className="text-zinc-400">{t("Available USD credits")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1 mb-1">
              <DevAnnotation customContent={<div className="whitespace-pre-wrap">核心余额 (Credits Balance)：平台唯一且绝对真实的结算依据。每次扣费后必须实时更新。底层是根据 New API 的 Quota 反向除以汇率算出来的。</div>}>
                <div className="text-4xl font-bold">124,500</div>
              </DevAnnotation>
              <div className="text-lg text-zinc-400">{t("credits")}</div>
            </div>
            <DevAnnotation customContent={<div className="whitespace-pre-wrap">美金预估值 (USD Equivalent)：纯前端展示逻辑。假设系统配置 1 USD = 1000 Credits，则前端直接除以 1000 并保留两位小数展示。不参与后台实际扣款。</div>}>
              <div className="text-sm text-zinc-400 mb-6">≈ $124.50 USD</div>
            </DevAnnotation>
            <DevAnnotation customContent={<div className="whitespace-pre-wrap">Add Funds (快捷充值动作)：点击后平滑滚动 (Smooth Scroll) 至下方的 Credit Packages 区域。</div>}>
              <Button 
                className="w-full bg-white text-zinc-900 hover:bg-zinc-100"
                onClick={() => {
                  document.getElementById('credit-packages')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Plus className="w-4 h-4 mr-2" /> {t("Add Funds")}
              </Button>
            </DevAnnotation>
          </CardContent>
        </Card>
      </div>

      {/* Credit Packages */}
      <Card id="credit-packages" className="border-zinc-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">{t("Add Credits")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-zinc-600">{t("Select Package")}</h3>
            <DevAnnotation customContent={<div className="whitespace-pre-wrap">1、套餐来源于后台上架的套餐，显示3个套餐{"\n"}2、后台默认的套餐，在前台是默认被选中的状态{"\n"}3、如果套餐设置了折扣，就显示折扣角标{"\n"}第四方聚合支付闭环 (Gateway Flow){"\n"}业务逻辑 (Logic)：前端携带 PackageID 调后端，后端向第四方平台申请支付链接 (Payment URL)———&gt;前端在新窗口或当前页重定向至第四方收银台 (聚合了卡/PayPal等)———&gt;支付成功后，第四方异步回调我们后端的 Webhook———&gt;后端校验签名无误后，为用户加款，并生成账单流水。显示的标签来源于后端,套餐种类都自来后端</div>}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div 
                  className={`transition-all rounded-xl p-5 ${selectedPackage === '5k' ? 'bg-blue-600 text-white shadow-md' : 'bg-zinc-100/80 text-zinc-900'} ${autoTopUpEnabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-zinc-200/80'}`}
                  onClick={() => !autoTopUpEnabled && setSelectedPackage('5k')}
                >
                  <div className="text-2xl font-bold mb-2">$5</div>
                  <div className={`text-sm ${selectedPackage === '5k' ? 'text-blue-100' : 'text-zinc-600'}`}>1,000 {t("credits")}</div>
                </div>
                <div 
                  className={`transition-all rounded-xl p-5 relative overflow-hidden ${selectedPackage === '20k' ? 'bg-blue-600 text-white shadow-md' : 'bg-zinc-100/80 text-zinc-900'} ${autoTopUpEnabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-zinc-200/80'}`}
                  onClick={() => !autoTopUpEnabled && setSelectedPackage('20k')}
                >
                  {/* Save 5% Corner Ribbon */}
                  <div className={`absolute top-0 right-0 w-24 h-24 overflow-hidden`}>
                    <div className={`absolute top-4 -right-8 w-32 text-center text-[10px] font-bold py-1 rotate-45 ${selectedPackage === '20k' ? 'bg-blue-400 text-white' : 'bg-blue-500 text-white'}`}>
                      SAVE 5%
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">$50</div>
                  <div className={`text-sm ${selectedPackage === '20k' ? 'text-blue-100' : 'text-zinc-600'}`}>10,000 {t("credits")}</div>
                </div>
                <div 
                  className={`transition-all rounded-xl p-5 relative overflow-hidden ${selectedPackage === '100k' ? 'bg-blue-600 text-white shadow-md' : 'bg-zinc-100/80 text-zinc-900'} ${autoTopUpEnabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-zinc-200/80'}`}
                  onClick={() => !autoTopUpEnabled && setSelectedPackage('100k')}
                >
                  {/* Save 10% Corner Ribbon */}
                  <div className={`absolute top-0 right-0 w-24 h-24 overflow-hidden`}>
                    <div className={`absolute top-4 -right-8 w-32 text-center text-[10px] font-bold py-1 rotate-45 ${selectedPackage === '100k' ? 'bg-blue-400 text-white' : 'bg-blue-500 text-white'}`}>
                      SAVE 10%
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">$1250</div>
                  <div className={`text-sm ${selectedPackage === '100k' ? 'text-blue-100' : 'text-zinc-600'}`}>275,000 {t("credits")}</div>
                </div>
              </div>
            </DevAnnotation>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-zinc-600">{t("Payment Method")}</h3>
            <div className="bg-zinc-100/80 p-1.5 rounded-xl flex items-center gap-1">
              <button 
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedPayment === 'credit_card' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'} ${autoTopUpEnabled ? 'opacity-60 cursor-not-allowed' : 'hover:text-zinc-700 hover:bg-zinc-200/50'}`}
                onClick={() => !autoTopUpEnabled && setSelectedPayment('credit_card')}
                disabled={autoTopUpEnabled}
              >
                <CreditCard className="w-4 h-4" />
                <span>{t("Credit Card")}</span>
              </button>
              <button 
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedPayment === 'paypal' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'} ${autoTopUpEnabled ? 'opacity-60 cursor-not-allowed' : 'hover:text-zinc-700 hover:bg-zinc-200/50'}`}
                onClick={() => !autoTopUpEnabled && setSelectedPayment('paypal')}
                disabled={autoTopUpEnabled}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a2.093 2.093 0 0 0-2.067 1.776l-.006.038-1.011 6.41.896.002 1.107-7.025c.082-.518.526-.9 1.05-.9h2.19c4.298 0 7.664-1.748 8.647-6.797.03-.15.054-.294.077-.437.112-.716.155-1.37.126-1.954z"/></svg>
                <span>PayPal</span>
              </button>
            </div>
          </div>

          {selectedPayment === 'credit_card' && (
            <div className="pt-4 border-t border-zinc-100">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="auto-top-up" className="text-base font-semibold cursor-pointer">
                    {t("Enable auto top-ups")}
                  </label>
                  <p className="text-sm text-zinc-500">
                    {t("Automatically recharge when balance is low")}
                  </p>
                </div>
                <Switch 
                  id="auto-top-up" 
                  checked={autoTopUpEnabled}
                  onCheckedChange={setAutoTopUpEnabled}
                />
              </div>

              {autoTopUpEnabled && (
                <div className="mt-4 space-y-2">
                  <label className="text-sm font-semibold text-zinc-600">{t("Auto-Pay Threshold")}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <LinkIcon className="h-4 w-4 text-zinc-400" />
                    </div>
                    <Input type="number" defaultValue="1000" className="pl-9 pr-16 font-medium" />
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <span className="text-sm text-zinc-500">{t("credits")}</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">
                    {t("When your balance falls below this amount, we will automatically charge your credit card for the selected package. You will receive an email notification for each automatic top-up.")}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="pt-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-6 text-base rounded-xl">
              {autoTopUpEnabled ? t("Save & Enable Auto-Pay") : t("Buy Credits")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <DevAnnotation customContent={<div className="whitespace-pre-wrap">字段1: Data显示用户付费的时间,按照前端用户时区显示{"\n"}字段2: Description显示购买的套餐,显示credits{"\n"}字段3: Credits显示购买的套餐所对应的credits{"\n"}字段4: Amount(USD)核心合规字段！即使全站用 Credit 结算，这里也必须如实显示用户充值时实际支付的法币或 Crypto 金额，用于企业财务精准入账和报销。{"\n"}字段5: Payment Source显示支付来源（如Stripe、PayPal等）{"\n"}字段6:Invoice PDF：点击下载,下载PDF 由于不在前端收集实体地址，发票中的地址需要第四方回传我放获取，如果不回传第四方可以提供电子凭证就是跳转链接, 直接重定向至第四方支付网关提供的电子凭证页面。</div>}>
        <Card>
          <CardHeader>
            <CardTitle>{t("Billing History")}</CardTitle>
            <CardDescription>{t("View and download your past invoices.")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-zinc-50 text-zinc-500 border-b">
                  <tr>
                    <th className="px-4 py-3 font-medium">{t("Date")}</th>
                    <th className="px-4 py-3 font-medium">{t("Description")}</th>
                    <th className="px-4 py-3 font-medium">{t("Credits")}</th>
                    <th className="px-4 py-3 font-medium">{t("Amount (USD)")}</th>
                    <th className="px-4 py-3 font-medium">{t("Payment Source")}</th>
                    <th className="px-4 py-3 font-medium">{t("Status")}</th>
                    <th className="px-4 py-3 font-medium text-right">{t("Invoice")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Mar 10, 2026</td>
                    <td className="px-4 py-3">Credit Package - 20,000 {t("credits")}</td>
                    <td className="px-4 py-3 font-bold">20,000 <span className="text-zinc-400 text-xs font-normal">{t("credits")}</span></td>
                    <td className="px-4 py-3 font-bold">$20.00</td>
                    <td className="px-4 py-3 text-zinc-600">Stripe</td>
                    <td className="px-4 py-3"><Badge variant="success" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-transparent uppercase text-xs font-bold">{t("Paid")}</Badge></td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-zinc-500">
                        <Download className="w-4 h-4 mr-2" /> {t("PDF")}
                      </Button>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Feb 15, 2026</td>
                    <td className="px-4 py-3">Auto-Recharge - 50,000 {t("credits")}</td>
                    <td className="px-4 py-3 font-bold">50,000 <span className="text-zinc-400 text-xs font-normal">{t("credits")}</span></td>
                    <td className="px-4 py-3 font-bold">$50.00</td>
                    <td className="px-4 py-3 text-zinc-600">PayPal</td>
                    <td className="px-4 py-3"><Badge variant="success" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-transparent uppercase text-xs font-bold">{t("Paid")}</Badge></td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-zinc-500">
                        <Download className="w-4 h-4 mr-2" /> {t("PDF")}
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </DevAnnotation>
    </div>
  );
}
