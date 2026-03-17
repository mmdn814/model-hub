import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Download, ChevronDown, Check, Eye, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for logs
const MOCK_LOGS = [
  {
    id: 'req_1a2b3c',
    timestamp: '2024-03-13T06:55:00Z',
    model: 'anthropic/claude-3-opus',
    vendor: 'Anthropic',
    status: 'Success',
    duration: '2.4s',
    tokens: { input: 1540, output: 420 },
    cost: '0.0034',
    apiKeyId: '1',
  },
  {
    id: 'req_4d5e6f',
    timestamp: '2024-03-13T06:50:12Z',
    model: 'openai/gpt-4-turbo',
    vendor: 'OpenAI',
    status: 'Success',
    duration: '1.8s',
    tokens: { input: 850, output: 120 },
    cost: '0.0012',
    apiKeyId: '2',
  },
  {
    id: 'req_7g8h9i',
    timestamp: '2024-03-13T06:45:33Z',
    model: 'google/gemini-1.5-pro',
    vendor: 'Google',
    status: 'Failed',
    duration: '0.5s',
    tokens: { input: 0, output: 0 },
    cost: '0.0000',
    error: 'Rate limit exceeded',
    apiKeyId: '1',
  },
  {
    id: 'req_0j1k2l',
    timestamp: '2024-03-13T06:30:00Z',
    model: 'meta-llama/llama-3-70b-instruct',
    vendor: 'Meta',
    status: 'Success',
    duration: '3.1s',
    tokens: { input: 2100, output: 850 },
    cost: '0.0028',
    apiKeyId: '3',
  },
  {
    id: 'req_3m4n5o',
    timestamp: '2024-03-13T06:15:22Z',
    model: 'anthropic/claude-3-sonnet',
    vendor: 'Anthropic',
    status: 'Success',
    duration: '1.2s',
    tokens: { input: 450, output: 150 },
    cost: '0.0008',
    apiKeyId: '2',
  },
];

export default function Logs() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [apiKeySearch, setApiKeySearch] = useState(searchParams.get('apiKeyId') || '');
  const [timeFilter, setTimeFilter] = useState(t('1 Day'));

  useEffect(() => {
    const keyId = searchParams.get('apiKeyId');
    if (keyId) {
      setApiKeySearch(keyId);
    }
  }, [searchParams]);

  const handleApiKeySearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setApiKeySearch(val);
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set('apiKeyId', val);
    } else {
      newParams.delete('apiKeyId');
    }
    setSearchParams(newParams);
  };

  const filteredLogs = MOCK_LOGS.filter(log => {
    const matchesSearch = searchQuery === '' || 
      log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.vendor.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesApiKey = apiKeySearch === '' || log.apiKeyId === apiKeySearch;
    
    return matchesSearch && matchesApiKey;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">{t("API Logs")}</h1>
          <p className="text-zinc-500 mt-1">{t("View and analyze your API request history.")}</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          {t("Export CSV")}
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            placeholder={t("Search by Request ID, Model, or Vendor...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="relative w-full sm:w-64">
          <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            placeholder={t("Filter by API Key ID...")}
            value={apiKeySearch}
            onChange={handleApiKeySearchChange}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 border border-zinc-200 rounded-md text-sm hover:bg-zinc-50 transition-colors justify-between min-w-[120px]">
              {timeFilter}
              <ChevronDown className="w-4 h-4 text-zinc-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              {['1 Hour', '1 Day', '1 Week', '1 Month'].map((time) => (
                <DropdownMenuItem 
                  key={time} 
                  onClick={() => setTimeFilter(t(time))}
                  className="justify-between"
                >
                  {t(time)}
                  {timeFilter === t(time) && <Check className="w-4 h-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            {t("More Filters")}
          </Button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50/50 text-zinc-500 border-b border-zinc-200">
              <tr>
                <th className="px-4 py-3 font-medium">{t("Timestamp")}</th>
                <th className="px-4 py-3 font-medium">{t("Request ID")}</th>
                <th className="px-4 py-3 font-medium">{t("Model & Vendor")}</th>
                <th className="px-4 py-3 font-medium">{t("Status")}</th>
                <th className="px-4 py-3 font-medium">{t("Duration")}</th>
                <th className="px-4 py-3 font-medium text-right">{t("Tokens (In/Out)")}</th>
                <th className="px-4 py-3 font-medium text-right">{t("Cost")}</th>
                <th className="px-4 py-3 font-medium text-center">{t("Actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-4 py-3 text-zinc-600 whitespace-nowrap">
                      {formatDate(log.timestamp)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                      {log.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-medium text-zinc-900">{log.model}</span>
                        <span className="text-xs text-zinc-500">{log.vendor}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge 
                        variant="secondary" 
                        className={
                          log.status === 'Success' 
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-50' 
                            : 'bg-red-50 text-red-700 hover:bg-red-50'
                        }
                      >
                        {log.status}
                      </Badge>
                      {log.error && (
                        <div className="text-xs text-red-600 mt-1">{log.error}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-zinc-600">
                      {log.duration}
                    </td>
                    <td className="px-4 py-3 text-right text-zinc-600">
                      <div className="flex flex-col items-end">
                        <span>{log.tokens.input.toLocaleString()} / {log.tokens.output.toLocaleString()}</span>
                        <span className="text-xs text-zinc-400">
                          {(log.tokens.input + log.tokens.output).toLocaleString()} total
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-zinc-900">
                      ${log.cost}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-zinc-500">
                    {t("No logs found matching your criteria.")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (Mock) */}
        <div className="px-4 py-3 border-t border-zinc-200 flex items-center justify-between text-sm text-zinc-500">
          <div>{t("Showing 1 to 5 of 1,240 entries")}</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>{t("Previous")}</Button>
            <Button variant="outline" size="sm">{t("Next")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
