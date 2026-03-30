import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DevAnnotation } from "@/components/DevAnnotation";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Clock, 
  Code, 
  CheckCircle2, 
  XCircle, 
  Activity, 
  Box,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CHART_DATA = [
  { date: 'Mar 21', value: 200 },
  { date: 'Mar 22', value: 550 },
  { date: 'Mar 23', value: 100 },
  { date: 'Mar 24', value: 0 },
  { date: 'Mar 25', value: 380 },
  { date: 'Mar 26', value: 720 },
  { date: 'Mar 27', value: 300 },
];

const MOCK_LOGS = [
  {
    id: 'tsk_ch_9a8b7c6d...',
    timestamp: 'Mar 27, 05:25 PM',
    model: 'wan-2.1-video',
    appType: 'VIDEO',
    appName: 'prod-backend-key',
    details: [
      { label: 'RES', value: '1080p' },
      { label: 'DUR', value: '5s' }
    ],
    costCredits: '150',
    costUsd: '$0.150',
    status: 'SUCCESS',
    action: 'download'
  },
  {
    id: 'chatcmpl-8f7e6d...',
    timestamp: 'Mar 27, 05:24 PM',
    model: 'qwen2.5-72b-instruct',
    appType: 'CHAT',
    appName: 'test-demo-key',
    details: [
      { label: 'In', value: '688' },
      { label: 'Out', value: '812', valueColor: 'text-blue-600' }
    ],
    costCredits: '45',
    costUsd: '$0.045',
    status: 'SUCCESS',
    action: 'view'
  },
  {
    id: 'tsk_ch_7e6d5c4b...',
    timestamp: 'Mar 27, 05:10 PM',
    model: 'seedream-5-0',
    appType: 'IMAGE',
    appName: 'prod-backend-key',
    details: [
      { label: 'RES', value: '1024x1024' },
      { label: 'N', value: '4' }
    ],
    costCredits: '120',
    costUsd: '$0.120',
    status: 'RUNNING',
    action: 'clock'
  },
  {
    id: 'tsk_ch_6d5c4b3a...',
    timestamp: 'Mar 27, 04:55 PM',
    model: 'kling-2.5-turbo',
    appType: 'VIDEO',
    appName: 'marketing-script',
    details: [
      { label: 'RES', value: '720p' },
      { label: 'DUR', value: '10s' }
    ],
    costCredits: '--',
    costUsd: '',
    status: 'FAILED',
    error: 'Safety policy violation: Prom...',
    action: 'code'
  }
];

export default function Logs() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return (
          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100 px-2 py-1 gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {status}
          </Badge>
        );
      case 'RUNNING':
        return (
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100 px-2 py-1 gap-1">
            <Activity className="w-3 h-3" />
            {status}
          </Badge>
        );
      case 'FAILED':
        return (
          <Badge variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-100 px-2 py-1 gap-1">
            <XCircle className="w-3 h-3" />
            {status}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getAppTypeBadge = (type: string) => {
    switch (type) {
      case 'VIDEO':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100 rounded-sm px-1.5 py-0 text-[10px] font-bold tracking-wider">{type}</Badge>;
      case 'CHAT':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-sm px-1.5 py-0 text-[10px] font-bold tracking-wider">{type}</Badge>;
      case 'IMAGE':
        return <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 rounded-sm px-1.5 py-0 text-[10px] font-bold tracking-wider">{type}</Badge>;
      default:
        return <Badge variant="secondary" className="rounded-sm px-1.5 py-0 text-[10px] font-bold tracking-wider">{type}</Badge>;
    }
  };

  const getActionButton = (action: string) => {
    switch (action) {
      case 'download':
        return (
          <Button variant="outline" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 border-zinc-200">
            <Download className="w-4 h-4" />
          </Button>
        );
      case 'view':
        return (
          <Button variant="outline" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 border-zinc-200">
            <Eye className="w-4 h-4" />
          </Button>
        );
      case 'clock':
        return (
          <Button variant="outline" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-900 border-zinc-200">
            <Clock className="w-4 h-4" />
          </Button>
        );
      case 'code':
        return (
          <Button variant="destructive" size="icon" className="h-8 w-8 bg-red-500 text-white hover:bg-red-600 border-none">
            <Code className="w-4 h-4" />
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0f172a] tracking-tight">{t("Activity Logs")}</h1>
        <p className="text-zinc-500 mt-2 text-base">{t("Track your API usage, review generated assets, and debug requests.")}</p>
      </div>

      {/* Alert */}
      <DevAnnotation customContent={<div className="whitespace-pre-wrap">业务逻辑 (Logic)：为了节省昂贵的 OSS 对象存储空间并合规：媒体文件 (MP4/PNG/WAV) 生成后仅保留 7 天，过期自动清理 CDN 链接和物理文件。纯文本日志记录 (JSON 元数据) 保留 30 天。前端强耦合：前端在渲染表格时，必须校验当前记录的 created_at。如果已过期大于 7 天，必须将该行的 Download 下载按钮置灰禁用，并提示“文件已过期清理”。</div>}>
        <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-xl p-4 flex gap-3">
          <div className="bg-[#fef3c7] p-2 rounded-full h-fit">
            <AlertTriangle className="w-5 h-5 text-[#d97706]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-[#92400e] text-sm">{t("API Media Retention Policy Alert")}</h3>
            <p className="text-[#b45309] text-sm leading-relaxed">
              {t("For data privacy and system performance, media files (images, videos, audio) generated via API are only temporarily hosted for 7 days. Data beyond this period will be permanently deleted. Please ensure your application downloads and hosts the assets locally.")}
            </p>
          </div>
        </div>
      </DevAnnotation>

      <Card className="border-zinc-200 shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          {/* Controls */}
          <DevAnnotation customContent={<div className="whitespace-pre-wrap">业务逻辑 (Logic)：支持多条件交叉查询分页。搜索框主要用于精准匹配 Task ID 或 Request ID，是开发者线上 Debug (查错) 的最核心入口。高级筛选 (Filter) 中必须包含状态 (如仅看 Failed)、模型类别和 API Key 的下拉过滤。（注意这里的task id 是用户api请求的task id，request ID同理）</div>}>
            <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-100">
              <Button variant="outline" className="w-full sm:w-auto justify-start gap-2 border-zinc-200 text-zinc-700 font-medium rounded-xl h-11 px-4">
                <Calendar className="w-4 h-4 text-zinc-400" />
                Mar 01, 2026 - Mar 27, 2026
              </Button>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button variant="outline" className="gap-2 border-zinc-200 text-zinc-700 font-medium rounded-xl h-11 px-4">
                  <Filter className="w-4 h-4 text-zinc-400" />
                  {t("Filter")}
                </Button>
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <Input
                    placeholder={t("Search Task ID...")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-zinc-50/50 border-zinc-200 rounded-xl h-11"
                  />
                </div>
              </div>
            </div>
          </DevAnnotation>

          {/* Chart */}
          <DevAnnotation customContent={<div className="whitespace-pre-wrap">业务逻辑 (Logic)： 后台执行时间序列聚合查询。前端根据选定的时间跨度动态渲染柱状图，帮助客户直观发现某天额度消耗的异常飙升。</div>}>
            <div className="h-64 p-6 border-b border-zinc-100">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#a1a1aa', fontSize: 12, fontWeight: 500 }}
                    tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f4f4f5' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#1d4ed8" 
                    radius={[4, 4, 0, 0]} 
                    barSize={32}
                    className="fill-blue-600 hover:fill-blue-700 transition-colors"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DevAnnotation>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-400 font-bold tracking-wider uppercase bg-white border-b border-zinc-100">
                <tr>
                  <th className="px-6 py-4">{t("TIMESTAMP / ID")}</th>
                  <th className="px-6 py-4">{t("MODEL & APP")}</th>
                  <th className="px-6 py-4">
                    <DevAnnotation customContent={<div className="whitespace-pre-wrap">业务逻辑 (Logic)：多模态兼容的核心设计。对于文本/Chat 模型，渲染 prompt_tokens 和 completion_tokens。对于图像/视频模型，渲染 resolution (分辨率)、duration (时长) 或 batch_size。前端通过判断该条日志的 modality (模态类型) 字段，动态呈现截然不同的排版结构。</div>}>
                      {t("DETAILS (TOKENS/PARAM)")}
                    </DevAnnotation>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <DevAnnotation customContent={<div className="whitespace-pre-wrap">业务逻辑 (Logic)：主视觉(黑色大字) 必须展示底层真实扣除的 Credits（如 150）。下方辅助视觉(灰色小字) 由前端读取全局汇率，动态除法算出预估的 USD 成本（如 $0.150），以满足海外客户基于法币对账的刚性习惯。</div>}>
                      {t("COST (CREDITS)")}
                    </DevAnnotation>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <DevAnnotation customContent={<div className="whitespace-pre-wrap">由后端异步网关的状态机直接映射：{"\n"}Processing (处理中)：任务正在队列或渲染中，平台已按最大预估成本【预冻结】了 Credits。{"\n"}Completed (已完成)：成功生成资产或文本。底层已按照真实使用量【完成扣费】并【释放】了多余的冻结额度。{"\n"}Failed (失败)：因参数错误、超时或触发安全敏感词导致失败。底层已【全额解冻】预扣分，实际扣费为 0。</div>}>
                      {t("STATUS")}
                    </DevAnnotation>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <DevAnnotation customContent={<div className="whitespace-pre-wrap">前端需动态渲染最右侧的操作按钮：{"\n"}等待 (Pending)：触发：状态为 Processing。表现：灰色时钟图标，按钮禁用。悬停提示：“Still generating...”。{"\n"}下载 (Download)：触发：状态为 Completed + 模态为 Video/Image/Audio。表现：下载图标。点击直接下载生成的媒体文件。如遇 7 天过期，则按钮不可用。{"\n"}查看明细 (View Details)：触发：状态为 Completed + 模态为 Chat/Text。表现：眼睛图标。点击弹出抽屉或 Modal，展示用户完整的输入 Prompt 和模型输出结果 (JSON 格式)，供回溯上下文。{"\n"}错误追溯 (Error Trace)：触发：状态为 Failed (任何模态)。表现：红色代码图标 &lt; &gt;。点击弹出代码层级的报错详情（如 &#123;"error": "Safety policy violation"&#125;），帮助开发者修 Bug。</div>}>
                      {t("ACTION")}
                    </DevAnnotation>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {MOCK_LOGS.map((log, index) => (
                  <tr key={index} className="bg-white hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1.5">
                        <span className="font-bold text-zinc-900">{log.timestamp}</span>
                        <span className="font-mono text-xs text-zinc-400">{log.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-2">
                        <span className="font-bold text-zinc-900">{log.model}</span>
                        <div className="flex items-center gap-2">
                          {getAppTypeBadge(log.appType)}
                          <div className="flex items-center gap-1 text-xs text-zinc-500">
                            <Box className="w-3 h-3" />
                            {log.appName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1 text-xs font-mono">
                        {log.details.map((detail, idx) => (
                          <div key={idx} className="flex gap-2">
                            <span className="text-zinc-400 w-8">{detail.label}:</span>
                            <span className={detail.valueColor || "text-zinc-900 font-medium"}>{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-bold text-zinc-900 text-base">{log.costCredits}</span>
                        {log.costUsd && <span className="text-xs text-zinc-400">{log.costUsd}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-center gap-2">
                        {getStatusBadge(log.status)}
                        {log.error && (
                          <span className="text-xs text-red-500 max-w-[150px] truncate" title={log.error}>
                            {log.error}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex justify-center">
                        {getActionButton(log.action)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
