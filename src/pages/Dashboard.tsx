import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts";
import { Filter, FileText, Maximize2, ChevronDown, Plus, Check, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { DevAnnotation } from "@/components/DevAnnotation";

const data = [
  { time: "01", "GPT-4o-mini": 1.0, "Claude Opus 4.6": 2.0, "gpt-oss-120b": 0.5, "Others": 0.1 },
  { time: "02", "GPT-4o-mini": 2.0, "Claude Opus 4.6": 1.0, "gpt-oss-120b": 1.0, "Others": 0.2 },
  { time: "03", "GPT-4o-mini": 1.5, "Claude Opus 4.6": 3.0, "gpt-oss-120b": 0.8, "Others": 0.1 },
  { time: "04", "GPT-4o-mini": 4.0, "Claude Opus 4.6": 1.0, "gpt-oss-120b": 2.0, "Others": 0.3 },
  { time: "05", "GPT-4o-mini": 2.0, "Claude Opus 4.6": 2.0, "gpt-oss-120b": 1.0, "Others": 0.2 },
];

const legendItems = [
  { name: "GPT-4o-mini", color: "#ef4444", value: "4.93", reqs: "11", tokens: "27K" },
  { name: "Claude Opus 4.6", color: "#3b82f6", value: "4.07", reqs: "34", tokens: "46K" },
  { name: "gpt-oss-120b", color: "#f97316", value: "3.40", reqs: "10", tokens: "24K" },
  { name: "Others", color: "#d4d4d8", value: "0.79", reqs: "15", tokens: "25K" },
];

const apiKeyData = [
  { time: "01", "lover-demp": 2.0, "test-bookmarks": 1.6 },
  { time: "02", "lover-demp": 1.5, "test-bookmarks": 2.7 },
  { time: "03", "lover-demp": 3.0, "test-bookmarks": 2.4 },
  { time: "04", "lover-demp": 1.0, "test-bookmarks": 6.3 },
  { time: "05", "lover-demp": 0.76, "test-bookmarks": 2.2 },
];

const apiKeyLegendItems = [
  { name: "lover-demp", color: "#0ea5e9", value: "0.00826", reqs: "41", tokens: "50K", keyString: "sk-or-v1-146...fdc" },
  { name: "test-bookmarks", color: "#10b981", value: "0.00493", reqs: "29", tokens: "72K", keyString: "sk-or-v1-0d4...8bb" },
  { name: "openclaw", color: "#f59e0b", value: "0.00000", reqs: "0", tokens: "0", keyString: "sk-or-v1-6db...b0d" },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState("1 Month");
  const [groupFilter, setGroupFilter] = useState("By Model");
  const [selectedModels, setSelectedModels] = useState<string[]>(legendItems.map(item => item.name));
  const [selectedApiKeys, setSelectedApiKeys] = useState<string[]>(apiKeyLegendItems.map(item => item.name));

  const currentData: any[] = groupFilter === "By API Key" ? apiKeyData : data;
  const allLegendItems = groupFilter === "By API Key" ? apiKeyLegendItems : legendItems;
  const selectedFilters = groupFilter === "By API Key" ? selectedApiKeys : selectedModels;
  
  const currentLegendItems = allLegendItems.filter(item => selectedFilters.includes(item.name));

  const toggleFilter = (name: string) => {
    if (groupFilter === "By Model") {
      setSelectedModels(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
    } else {
      setSelectedApiKeys(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl text-zinc-600 font-medium">{t("Your usage across models on ModelHub")}</h2>
        <div className="flex items-center gap-3">
          <Popover>
            <DevAnnotation
              elementName="数据过滤器"
              componentType="Dropdown / Popover"
              functionDesc="用于过滤下方图表显示的数据维度"
              interactionRule="点击展开包含Models和API Keys的折叠面板，勾选/取消勾选可实时更新图表数据"
              defaultValue="全选"
              dataSource="本地状态 selectedModels 和 selectedApiKeys"
              autoLogic="当切换分组（By Model/By API Key）时，自动应用对应的过滤状态"
              devNotes="注意：Popover内部使用了Accordion和Command组件，需确保事件冒泡正常"
            >
              <PopoverTrigger className="flex items-center gap-2 px-3 py-1.5 border border-zinc-200 rounded-full text-sm hover:bg-zinc-50 transition-colors">
                <Filter className="w-4 h-4" /> {t("Filters")}
              </PopoverTrigger>
            </DevAnnotation>
            <PopoverContent align="end" className="w-80 p-3 rounded-xl shadow-lg border-zinc-200">
              <Accordion className="w-full space-y-3">
                <AccordionItem value="models" className="border border-zinc-200 rounded-lg px-3 py-1 bg-white shadow-sm">
                  <AccordionTrigger className="hover:no-underline py-2 text-base font-medium">
                    {t("Models")}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-1 border-t border-zinc-100 mt-2">
                    <Command className="bg-transparent">
                      <DevAnnotation
                        elementName="模型搜索框"
                        componentType="Input"
                        functionDesc="在模型列表中搜索特定模型"
                        interactionRule="输入文本实时过滤下方列表"
                        defaultValue="空"
                        autoLogic="使用模糊匹配搜索模型名称"
                        devNotes="需处理防抖逻辑，避免频繁触发搜索"
                      >
                        <CommandInput placeholder={t("Search models")} className="h-9" />
                      </DevAnnotation>
                      <CommandList className="max-h-[200px]">
                        <CommandEmpty>{t("No models found.")}</CommandEmpty>
                        <CommandGroup heading={t("Models")}>
                          {legendItems.map((item) => (
                            <DevAnnotation
                              key={item.name}
                              elementName={`模型选项: ${item.name}`}
                              componentType="Checkbox / CommandItem"
                              functionDesc="选择或取消选择该模型"
                              interactionRule="点击切换选中状态"
                              defaultValue="默认全选"
                              devNotes="选中状态需同步至全局过滤状态"
                            >
                              <CommandItem
                                onSelect={() => {
                                  if (groupFilter !== "By Model") setGroupFilter("By Model");
                                  setSelectedModels(prev => prev.includes(item.name) ? prev.filter(n => n !== item.name) : [...prev, item.name]);
                                }}
                                className="flex items-center gap-2 cursor-pointer py-2"
                              >
                                <div className={`flex items-center justify-center w-4 h-4 border rounded-sm transition-colors ${selectedModels.includes(item.name) ? 'bg-zinc-900 border-zinc-900 text-white' : 'border-zinc-300'}`}>
                                  {selectedModels.includes(item.name) && <Check className="w-3 h-3" />}
                                </div>
                                <span className="font-medium text-zinc-700">{item.name}</span>
                              </CommandItem>
                            </DevAnnotation>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="api-keys" className="border border-zinc-200 rounded-lg px-3 py-1 bg-white shadow-sm">
                  <AccordionTrigger className="hover:no-underline py-2 text-base font-medium">
                    {t("API Keys")}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-1 border-t border-zinc-100 mt-2">
                    <Command className="bg-transparent">
                      <DevAnnotation
                        elementName="API Key搜索框"
                        componentType="Input"
                        functionDesc="在API Key列表中搜索特定Key"
                        interactionRule="输入文本实时过滤下方列表"
                        defaultValue="空"
                        autoLogic="使用模糊匹配搜索Key名称或值"
                        devNotes="需处理防抖逻辑"
                      >
                        <CommandInput placeholder={t("Search API keys")} className="h-9" />
                      </DevAnnotation>
                      <CommandList className="max-h-[200px]">
                        <CommandEmpty>{t("No API keys found.")}</CommandEmpty>
                        <CommandGroup heading={t("API Keys")}>
                          {apiKeyLegendItems.map((item) => (
                            <DevAnnotation
                              key={item.name}
                              elementName={`API Key选项: ${item.name}`}
                              componentType="Checkbox / CommandItem"
                              functionDesc="选择或取消选择该API Key"
                              interactionRule="点击切换选中状态"
                              defaultValue="默认全选"
                              devNotes="选中状态需同步至全局过滤状态"
                            >
                              <CommandItem
                                onSelect={() => {
                                  if (groupFilter !== "By API Key") setGroupFilter("By API Key");
                                  setSelectedApiKeys(prev => prev.includes(item.name) ? prev.filter(n => n !== item.name) : [...prev, item.name]);
                                }}
                                className="flex items-center gap-2 cursor-pointer py-2"
                              >
                                <div className={`flex items-center justify-center w-4 h-4 border rounded-sm transition-colors ${selectedApiKeys.includes(item.name) ? 'bg-zinc-900 border-zinc-900 text-white' : 'border-zinc-300'}`}>
                                  {selectedApiKeys.includes(item.name) && <Check className="w-3 h-3" />}
                                </div>
                                <Key className="w-4 h-4 text-zinc-500" />
                                <span className="font-medium text-zinc-900">{item.name}</span>
                                <span className="text-zinc-400 text-sm ml-1">{item.keyString}</span>
                              </CommandItem>
                            </DevAnnotation>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DevAnnotation
              elementName="时间范围选择器"
              componentType="Dropdown"
              functionDesc="选择图表数据的时间跨度"
              interactionRule="点击展开时间选项，选择后更新图表X轴和数据"
              defaultValue="1 Month"
              dataSource="静态选项数组"
              autoLogic="选择后自动关闭下拉菜单并触发数据重新获取（当前为Mock）"
              devNotes="后续需接入真实API，根据选择的时间范围传递不同的 start/end 参数"
            >
              <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 border border-zinc-200 rounded-full text-sm hover:bg-zinc-50 transition-colors">
                {t(timeFilter)} <ChevronDown className="w-4 h-4 text-zinc-400" />
              </DropdownMenuTrigger>
            </DevAnnotation>
            <DropdownMenuContent align="end" className="w-40">
              {["1 Hour", "1 Day", "1 Week", "1 Month", "1 Year"].map((time) => (
                <DevAnnotation
                  key={time}
                  elementName={`时间选项: ${time}`}
                  componentType="DropdownItem"
                  functionDesc="选择特定的时间范围"
                  interactionRule="点击后更新全局时间过滤状态并关闭下拉菜单"
                  autoLogic="选中状态会显示 Check 图标"
                  devNotes="需确保时间格式与后端API要求的格式一致"
                >
                  <DropdownMenuItem onClick={() => setTimeFilter(time)} className="justify-between">
                    {t(time)}
                    {timeFilter === time && <Check className="w-4 h-4" />}
                  </DropdownMenuItem>
                </DevAnnotation>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DevAnnotation
              elementName="数据分组选择器"
              componentType="Dropdown"
              functionDesc="切换图表数据的聚合维度（按模型或按API Key）"
              interactionRule="点击选择分组方式，图表和图例将立即切换到对应维度"
              defaultValue="By Model"
              dataSource="静态选项数组"
              autoLogic="切换时，自动将 currentData 和 currentLegendItems 切换为对应的数据源"
              devNotes="切换分组时，注意保持之前在Filters中设置的勾选状态隔离"
            >
              <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 border border-zinc-200 rounded-full text-sm hover:bg-zinc-50 transition-colors">
                {t(groupFilter)} <ChevronDown className="w-4 h-4 text-zinc-400" />
              </DropdownMenuTrigger>
            </DevAnnotation>
            <DropdownMenuContent align="end" className="w-40">
              {["By API Key", "By Model"].map((group) => (
                <DevAnnotation
                  key={group}
                  elementName={`分组选项: ${group}`}
                  componentType="DropdownItem"
                  functionDesc="选择特定的数据聚合维度"
                  interactionRule="点击后更新全局分组状态并关闭下拉菜单"
                  autoLogic="选中状态会显示 Check 图标"
                  devNotes="切换分组时会触发图表数据的重新渲染"
                >
                  <DropdownMenuItem onClick={() => setGroupFilter(group)} className="justify-between">
                    {t(group)}
                    {groupFilter === group && <Check className="w-4 h-4" />}
                  </DropdownMenuItem>
                </DevAnnotation>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Spend Card */}
        <DevAnnotation
          elementName="花费统计模块"
          componentType="Card / Chart"
          functionDesc="展示用户在选定时间范围内的花费情况"
          interactionRule="鼠标悬浮在柱状图上显示具体数值"
          dataSource="后端聚合API / 缓存"
          autoLogic="根据顶部过滤器（时间、分组）自动更新数据"
          devNotes="需处理数据加载中和无数据状态的骨架屏显示"
        >
          <Card className="shadow-sm border-zinc-200">
            <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-sm font-medium text-zinc-600 mb-1">{t("Spend")}</div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-bold">13.2</div>
                  <div className="text-sm text-zinc-500 font-medium">{t("credits")}</div>
                </div>
                <div className="text-xs text-zinc-400 mt-1">≈ $0.0132 USD</div>
                <DevAnnotation
                  elementName="充值按钮"
                  componentType="Button"
                  functionDesc="跳转到充值页面添加账户余额"
                  interactionRule="点击后路由跳转至 /billing"
                  devNotes="需确保用户有权限访问充值页面"
                >
                  <Button size="sm" className="mt-3 h-7 px-3 text-xs gap-1.5 rounded-full" onClick={() => navigate('/billing')}>
                    <Plus className="w-3 h-3" /> {t("Add Funds")}
                  </Button>
                </DevAnnotation>
              </div>
              <DevAnnotation
                elementName="放大图表按钮"
                componentType="Button (Icon)"
                functionDesc="全屏或在弹窗中放大显示当前图表"
                interactionRule="点击后展开图表详细视图"
                devNotes="当前暂未实现具体放大逻辑，可考虑使用 Dialog 组件包裹放大后的图表"
              >
                <button className="text-zinc-400 hover:text-zinc-600">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </DevAnnotation>
            </div>
            
            <div className="h-[120px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData} barSize={12}>
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '12px' }} />
                  {currentLegendItems.map((item, index) => (
                    <Bar key={item.name} dataKey={item.name} stackId="a" fill={item.color} radius={index === currentLegendItems.length - 1 ? [2, 2, 0, 0] : [0, 0, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {currentLegendItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-zinc-700">{item.name}</span>
                  </div>
                  <span className="text-zinc-500 font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </DevAnnotation>

        {/* Requests Card */}
        <DevAnnotation
          elementName="请求数统计模块"
          componentType="Card / Chart"
          functionDesc="展示用户在选定时间范围内的API请求次数"
          interactionRule="鼠标悬浮在柱状图上显示具体数值"
          dataSource="后端聚合API / 缓存"
          autoLogic="根据顶部过滤器（时间、分组）自动更新数据"
          devNotes="需处理数据加载中和无数据状态的骨架屏显示"
        >
        <Card className="shadow-sm border-zinc-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-sm font-medium text-zinc-600 mb-1">{t("Requests")}</div>
                <div className="text-3xl font-bold">70</div>
              </div>
              <button className="text-zinc-400 hover:text-zinc-600">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="h-[120px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData} barSize={12}>
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '12px' }} />
                  {currentLegendItems.map((item, index) => (
                    <Bar key={item.name} dataKey={item.name} stackId="a" fill={item.color} radius={index === currentLegendItems.length - 1 ? [2, 2, 0, 0] : [0, 0, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {currentLegendItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-zinc-700">{item.name}</span>
                  </div>
                  <span className="text-zinc-500 font-mono">{item.reqs}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </DevAnnotation>

        {/* Tokens Card */}
        <DevAnnotation
          elementName="Token消耗统计模块"
          componentType="Card / Chart"
          functionDesc="展示用户在选定时间范围内的Token消耗量"
          interactionRule="鼠标悬浮在柱状图上显示具体数值"
          dataSource="后端聚合API / 缓存"
          autoLogic="根据顶部过滤器（时间、分组）自动更新数据"
          devNotes="需处理数据加载中和无数据状态的骨架屏显示"
        >
        <Card className="shadow-sm border-zinc-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-sm font-medium text-zinc-600 mb-1">{t("Tokens")}</div>
                <div className="text-3xl font-bold">122K</div>
              </div>
              <button className="text-zinc-400 hover:text-zinc-600">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="h-[120px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData} barSize={12}>
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '12px' }} />
                  {currentLegendItems.map((item, index) => (
                    <Bar key={item.name} dataKey={item.name} stackId="a" fill={item.color} radius={index === currentLegendItems.length - 1 ? [2, 2, 0, 0] : [0, 0, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {currentLegendItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-zinc-700">{item.name}</span>
                  </div>
                  <span className="text-zinc-500 font-mono">{item.tokens}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </DevAnnotation>
      </div>

      {/* Logs Banner */}
      <DevAnnotation
        elementName="日志迁移提示横幅"
        componentType="System Logic / Banner"
        functionDesc="提示用户日志功能已迁移至独立页面"
        interactionRule="点击整个横幅区域跳转至 /logs 页面"
        autoLogic="可考虑增加关闭按钮，点击后记录在 localStorage 中不再显示"
        devNotes="当前为硬编码跳转，后续可根据用户配置决定是否显示"
      >
        <div 
          onClick={() => navigate('/logs')}
          className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex items-start gap-4 cursor-pointer hover:bg-indigo-50 transition-colors"
        >
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-zinc-900 mb-1">{t("Logs have moved")}</h3>
            <p className="text-zinc-600 text-sm">
              {t("Your API request logs now have their own")} <span className="text-indigo-600 hover:underline">{t("dedicated page")}</span>.
            </p>
          </div>
        </div>
      </DevAnnotation>
    </div>
  );
}
