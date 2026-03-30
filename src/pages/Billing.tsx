import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Download, Plus, Settings2, Link as LinkIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { DevAnnotation } from "@/components/DevAnnotation";

export default function Billing() {
  const { t } = useTranslation();
  const [autoTopUpEnabled, setAutoTopUpEnabled] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t("Billing & Credits")}</h2>
        <p className="text-zinc-500">{t("Manage your balance, payment methods, and billing history.")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <Card className="md:col-span-1 bg-zinc-900 text-zinc-50 border-zinc-800">
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

        {/* Auto-recharge */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">{t("Automatic Payments")}</CardTitle>
            <CardDescription className="text-base text-zinc-500 mt-2">
              {t("Set up automatic billing by linking a payment method. When your credit balance drops below your specified threshold, we will automatically recharge your account by charging your saved payment method (maximum once every 10 minutes) for the amount selected below.")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <DevAnnotation customContent={<div className="whitespace-pre-wrap">自动充值状态 (Auto-Recharge Status)：核心交互依赖于用户是否已经在第四方支付网关留存了合法的代扣授权。包含两种状态处理：{"\n"}状态 A（未充值过 / 未留存代扣协议）：允许用户拨动开关并设置金额。但在点击底部的 Save 时，后端不直接生效，而是返回一条第四方授权链接（如 Stripe SetupIntent URL）。前端重定向用户至外部收银台完成绑卡授权，成功后自动开启本功能。{"\n"}状态 B（已绑卡 / 曾充值并授权存卡）：用户拨动开关并点击 Save 时，直接调用后端接口更新配置，立即静默生效。开启瞬间，系统自动将用户的 Tier 等级升级为 Scale (最高并发组)。</div>}>
              <div className="flex items-center space-x-3">
                <Switch 
                  id="auto-top-up" 
                  checked={autoTopUpEnabled}
                  onCheckedChange={setAutoTopUpEnabled}
                />
                <label 
                  htmlFor="auto-top-up" 
                  className="text-base font-semibold cursor-pointer"
                >
                  {t("Enable auto top-ups")}
                </label>
              </div>
            </DevAnnotation>

            {autoTopUpEnabled && (
              <div className="space-y-6 pt-4 border-t border-zinc-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-600">{t("Auto-Pay Threshold")}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <LinkIcon className="h-4 w-4 text-zinc-400" />
                      </div>
                      <Input type="number" defaultValue="1000" className="pl-9 font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-600">{t("Auto-Pay Amount")}</label>
                    <Select defaultValue="2000">
                      <SelectTrigger className="font-medium">
                        <SelectValue placeholder={t("Select amount")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2000">2,000 {t("credits")} - $10</SelectItem>
                        <SelectItem value="5000">5,000 {t("credits")} - $25</SelectItem>
                        <SelectItem value="10000">10,000 {t("credits")} - $50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DevAnnotation customContent={<div className="whitespace-pre-wrap">保存自动支付配置 (Save Auto-Pay Config)：{"\n"}A：提交 threshold (触发阈值) 和 amount_package_id (下拉框选中的定额充值套餐)。{"\n"}B：后台守护进程触发：系统监控账单扣费，当用户的 total_credits 跌破阈值时，后台触发 Server-to-Server 接口，向第四方网关发起静默代扣 (Off-session charge)。{"\n"}安全风控逻辑：为防止因底层计费 Bug 或网关异常导致的“无限恶意扣款”，必须在系统层面设置冷却期机制（如 UI 文案所述：max once every 15 minutes，即15分钟内只允许触发一次代扣尝试）。</div>}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg rounded-xl">
                    {t("Save")}
                  </Button>
                </DevAnnotation>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Credit Packages */}
      <div id="credit-packages" className="space-y-4">
        <h3 className="text-lg font-semibold">{t("Credit Packages")}</h3>
        <DevAnnotation customContent={<div className="whitespace-pre-wrap">第四方聚合支付闭环 (Gateway Flow){"\n"}业务逻辑 (Logic)：前端携带 PackageID 调后端，后端向第四方平台申请支付链接 (Payment URL)———&gt;前端在新窗口或当前页重定向至第四方收银台 (聚合了卡/PayPal等)———&gt;支付成功后，第四方异步回调我们后端的 Webhook———&gt;后端校验签名无误后，为用户加款，并生成账单流水。显示的标签来源于后端,套餐种类都自来后端</div>}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="hover:border-zinc-300 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold mb-1">5,000 <span className="text-sm font-normal text-zinc-500">{t("credits")}</span></div>
                <div className="text-sm text-zinc-500 mb-4">≈ $5.00 USD</div>
                <Button variant="outline" className="w-full">{t("Checkout")} ↗</Button>
              </CardContent>
            </Card>
            <Card className="hover:border-zinc-300 transition-colors cursor-pointer border-zinc-900 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-zinc-900"></div>
              <CardContent className="p-6 text-center">
                <Badge className="absolute top-3 right-3 bg-zinc-100 text-zinc-900 hover:bg-zinc-100">{t("Popular")}</Badge>
                <div className="text-2xl font-bold mb-1 mt-2">20,000 <span className="text-sm font-normal text-zinc-500">{t("credits")}</span></div>
                <div className="text-sm text-zinc-500 mb-4">≈ $20.00 USD</div>
                <Button className="w-full">{t("Checkout")} ↗</Button>
              </CardContent>
            </Card>
            <Card className="hover:border-zinc-300 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold mb-1">100,000 <span className="text-sm font-normal text-zinc-500">{t("credits")}</span></div>
                <div className="text-sm text-zinc-500 mb-4">≈ $100.00 USD</div>
                <Button variant="outline" className="w-full">{t("Checkout")} ↗</Button>
              </CardContent>
            </Card>
          </div>
        </DevAnnotation>
      </div>

      {/* Billing History */}
      <DevAnnotation customContent={<div className="whitespace-pre-wrap">字段1: Data显示用户付费的时间,按照前端用户时区显示{"\n"}字段2: Description显示购买的套餐,显示credits{"\n"}字段3: Credits显示购买的套餐所对应的credits{"\n"}字段4: Amount(USD)核心合规字段！即使全站用 Credit 结算，这里也必须如实显示用户充值时实际支付的法币或 Crypto 金额，用于企业财务精准入账和报销。{"\n"}字段5:Invoice PDF：点击下载,下载PDF 由于不在前端收集实体地址，发票中的地址需要第四方回传我放获取，如果不回传第四方可以提供电子凭证就是跳转链接, 直接重定向至第四方支付网关提供的电子凭证页面。</div>}>
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
