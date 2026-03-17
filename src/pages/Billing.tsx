import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Plus, Settings2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Billing() {
  const { t } = useTranslation();

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
              <div className="text-4xl font-bold">124,500</div>
              <div className="text-lg text-zinc-400">{t("credits")}</div>
            </div>
            <div className="text-sm text-zinc-400 mb-6">≈ $124.50 USD</div>
            <Button className="w-full bg-white text-zinc-900 hover:bg-zinc-100">
              <Plus className="w-4 h-4 mr-2" /> {t("Add Funds")}
            </Button>
          </CardContent>
        </Card>

        {/* Auto-recharge */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t("Auto-Recharge")}</CardTitle>
                <CardDescription>{t("Automatically add funds when balance falls below a threshold.")}</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-zinc-100 text-zinc-600">{t("Disabled")}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">{t("When balance falls below")}</label>
                <div className="relative">
                  <Input type="number" defaultValue="10000" className="pr-16" disabled />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">{t("credits")}</span>
                </div>
              </div>
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">{t("Recharge amount")}</label>
                <div className="relative">
                  <Input type="number" defaultValue="50000" className="pr-16" disabled />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">{t("credits")}</span>
                </div>
              </div>
              <Button variant="outline" className="gap-2">
                <Settings2 className="w-4 h-4" /> {t("Configure")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing Info & Packages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold">{t("Credit Packages")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="hover:border-zinc-300 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold mb-1">5,000 <span className="text-sm font-normal text-zinc-500">{t("credits")}</span></div>
                <div className="text-sm text-zinc-500 mb-4">≈ $5.00 USD</div>
                <Button variant="outline" className="w-full">{t("Buy via Stripe")}</Button>
              </CardContent>
            </Card>
            <Card className="hover:border-zinc-300 transition-colors cursor-pointer border-zinc-900 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-zinc-900"></div>
              <CardContent className="p-6 text-center">
                <Badge className="absolute top-3 right-3 bg-zinc-100 text-zinc-900 hover:bg-zinc-100">{t("Popular")}</Badge>
                <div className="text-2xl font-bold mb-1 mt-2">20,000 <span className="text-sm font-normal text-zinc-500">{t("credits")}</span></div>
                <div className="text-sm text-zinc-500 mb-4">≈ $20.00 USD</div>
                <Button className="w-full">{t("Buy via Stripe")}</Button>
              </CardContent>
            </Card>
            <Card className="hover:border-zinc-300 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold mb-1">100,000 <span className="text-sm font-normal text-zinc-500">{t("credits")}</span></div>
                <div className="text-sm text-zinc-500 mb-4">≈ $100.00 USD</div>
                <Button variant="outline" className="w-full">{t("Buy via Crypto")}</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t("Billing Information")}</h3>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("Country")}</label>
                <Input defaultValue="United States" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("Address")}</label>
                <Input defaultValue="123 AI Street, Tech City, CA 94016" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("Tax ID (Optional)")}</label>
                <Input placeholder="VAT / GST / EIN" />
              </div>
              <Button variant="secondary" className="w-full mt-2">{t("Save Information")}</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Billing History */}
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
                  <th className="px-4 py-3 font-medium">{t("Amount")}</th>
                  <th className="px-4 py-3 font-medium">{t("Status")}</th>
                  <th className="px-4 py-3 font-medium text-right">{t("Invoice")}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="bg-white">
                  <td className="px-4 py-3">Mar 10, 2026</td>
                  <td className="px-4 py-3">Credit Package - 20,000 {t("credits")}</td>
                  <td className="px-4 py-3 font-medium">20,000 {t("credits")}</td>
                  <td className="px-4 py-3"><Badge variant="success" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-transparent">{t("Paid")}</Badge></td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-zinc-500">
                      <Download className="w-4 h-4 mr-2" /> {t("PDF")}
                    </Button>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3">Feb 15, 2026</td>
                  <td className="px-4 py-3">Auto-Recharge - 50,000 {t("credits")}</td>
                  <td className="px-4 py-3 font-medium">50,000 {t("credits")}</td>
                  <td className="px-4 py-3"><Badge variant="success" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-transparent">{t("Paid")}</Badge></td>
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
    </div>
  );
}
