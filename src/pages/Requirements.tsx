import React, { useState } from 'react';
import { ClipboardList, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Requirements() {
  const [activeTab, setActiveTab] = useState("phase1");
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col overflow-hidden bg-white">
      <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 flex items-center gap-4">
        <button 
          onClick={() => navigate('/')} 
          className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-zinc-800 flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-indigo-500" />
          功能需求汇总
        </h1>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-zinc-100 bg-zinc-50 flex flex-col py-4">
          <nav className="space-y-1 px-3">
            <button
              onClick={() => setActiveTab("phase1")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "phase1"
                  ? "bg-white text-indigo-600 shadow-sm border border-zinc-200/60"
                  : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900"
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${activeTab === "phase1" ? "bg-indigo-500" : "bg-zinc-300"}`} />
              第一期需求
            </button>
            <button
              onClick={() => setActiveTab("phase2")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "phase2"
                  ? "bg-white text-indigo-600 shadow-sm border border-zinc-200/60"
                  : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900"
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${activeTab === "phase2" ? "bg-indigo-500" : "bg-zinc-300"}`} />
              第二期需求
            </button>
            <button
              onClick={() => setActiveTab("phase3")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "phase3"
                  ? "bg-white text-indigo-600 shadow-sm border border-zinc-200/60"
                  : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900"
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${activeTab === "phase3" ? "bg-indigo-500" : "bg-zinc-300"}`} />
              第三期需求
            </button>
            <button
              onClick={() => setActiveTab("phase4")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "phase4"
                  ? "bg-white text-indigo-600 shadow-sm border border-zinc-200/60"
                  : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900"
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${activeTab === "phase4" ? "bg-indigo-500" : "bg-zinc-300"}`} />
              第四期需求
            </button>
            <button
              onClick={() => setActiveTab("phase202629")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "phase202629"
                  ? "bg-white text-indigo-600 shadow-sm border border-zinc-200/60"
                  : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900"
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${activeTab === "phase202629" ? "bg-indigo-500" : "bg-zinc-300"}`} />
              202629需求
            </button>
            <button
              onClick={() => setActiveTab("seo")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "seo"
                  ? "bg-white text-indigo-600 shadow-sm border border-zinc-200/60"
                  : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900"
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${activeTab === "seo" ? "bg-indigo-500" : "bg-zinc-300"}`} />
              202629SEO需求
            </button>
            <button
              onClick={() => setActiveTab("gtm")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "gtm"
                  ? "bg-white text-indigo-600 shadow-sm border border-zinc-200/60"
                  : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900"
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${activeTab === "gtm" ? "bg-indigo-500" : "bg-zinc-300"}`} />
              2026629GTM需求
            </button>
            <button
              onClick={() => setActiveTab("phase2026710")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "phase2026710"
                  ? "bg-white text-indigo-600 shadow-sm border border-zinc-200/60"
                  : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900"
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${activeTab === "phase2026710" ? "bg-indigo-500" : "bg-zinc-300"}`} />
              2026710需求
            </button>
            <button
              onClick={() => setActiveTab("phase2026724")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "phase2026724"
                  ? "bg-white text-indigo-600 shadow-sm border border-zinc-200/60"
                  : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900"
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${activeTab === "phase2026724" ? "bg-indigo-500" : "bg-zinc-300"}`} />
              2026724需求
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-white p-8">
          {activeTab === "phase1" && (
            <div className="max-w-4xl space-y-10">
              
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">第一期主要功能范围</h2>
                <p className="text-zinc-600 mb-6 mt-4">第一期主要包含以下模块：官网、用户体系、API Key 管理、API 文档基础。</p>
              </div>

              {/* Section 1: 官网 */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold text-zinc-800 flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-md flex items-center justify-center text-sm">1</span>
                  官网
                </h3>
                
                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">1.1 涉及页面</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">页面 / 模块</th><th className="px-4 py-2 font-medium w-1/4">功能</th><th className="px-4 py-2 font-medium">功能细节</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">官网</td><td className="px-4 py-3 text-zinc-600">官网基础页面</td><td className="px-4 py-3 text-zinc-600">官网基础页面展示，包括产品介绍、模型入口、价格入口、文档入口等</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">官网</td><td className="px-4 py-3 text-zinc-600">多语言展示</td><td className="px-4 py-3 text-zinc-600">官网页面文案、按钮、提示信息等支持多语言展示</td></tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">1.2 功能说明（官网基础页面）</div>
                  <div className="p-4 space-y-3 text-sm text-zinc-600">
                    <p>官网需要作为用户进入平台的主要入口，承担产品介绍、功能引导和转化作用。基础页面需要支持：</p>
                    <ul className="space-y-2 list-disc pl-5">
                      <li><strong>产品介绍：</strong>展示平台核心能力，例如模型 API、统一调用、模型文档、价格说明等</li>
                      <li><strong>模型入口：</strong>用户可从官网跳转至模型广场或模型详情</li>
                      <li><strong>文档入口：</strong>用户可从官网跳转至 API 文档</li>
                      <li><strong>登录入口：</strong>用户可从官网进入授权登录页面</li>
                      <li><strong>价格入口：</strong>用户可从官网进入 Pricing 页面</li>
                      <li><strong>多语言展示：</strong>支持页面内容按语言切换展示</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 2: 用户体系 */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold text-zinc-800 flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-md flex items-center justify-center text-sm">2</span>
                  用户体系
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">2.1 & 2.2 涉及页面与功能</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">页面 / 模块</th><th className="px-4 py-2 font-medium w-1/4">功能</th><th className="px-4 py-2 font-medium">功能细节</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">授权登录页面</td><td className="px-4 py-3 text-zinc-600">Google 第三方授权登录</td><td className="px-4 py-3 text-zinc-600">支持 Google OAuth 2.0 快捷登录</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">授权登录页面</td><td className="px-4 py-3 text-zinc-600">GitHub 第三方授权登录</td><td className="px-4 py-3 text-zinc-600">支持 GitHub OAuth 2.0 快捷登录</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">用户系统</td><td className="px-4 py-3 text-zinc-600">用户创建</td><td className="px-4 py-3 text-zinc-600">首次通过第三方授权成功后，自动创建平台用户账户</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">用户系统</td><td className="px-4 py-3 text-zinc-600">登录状态处理</td><td className="px-4 py-3 text-zinc-600">第三方平台授权成功后，创建用户登录态</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">用户系统</td><td className="px-4 py-3 text-zinc-600">用户信息记录</td><td className="px-4 py-3 text-zinc-600">记录用户名称、授权账户邮箱、头像、授权渠道</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">设置页面</td><td className="px-4 py-3 text-zinc-600">用户信息展示</td><td className="px-4 py-3 text-zinc-600">展示用户名称、邮箱地址、头像、授权渠道来源</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">设置页面</td><td className="px-4 py-3 text-zinc-600">授权账户绑定</td><td className="px-4 py-3 text-zinc-600">支持用户在设置页面绑定其他第三方授权账户</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">设置页面</td><td className="px-4 py-3 text-zinc-600">账户唯一性处理</td><td className="px-4 py-3 text-zinc-600">根据账户绑定规则判断是否允许绑定或合并账户</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">2.3 第三方授权支持</div>
                  <div className="p-4 space-y-4 text-sm text-zinc-600">
                    <div>
                      <p className="font-semibold text-zinc-800 mb-2">支持渠道：</p>
                      <table className="w-full text-sm text-left border border-zinc-200">
                        <thead className="bg-white border-b border-zinc-200 text-zinc-500">
                          <tr><th className="px-4 py-2 font-medium">授权渠道</th><th className="px-4 py-2 font-medium">授权协议</th><th className="px-4 py-2 font-medium">说明</th></tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 bg-white">
                          <tr><td className="px-4 py-2 font-medium text-zinc-800">Google</td><td className="px-4 py-2 text-zinc-600">Google OAuth 2.0</td><td className="px-4 py-2 text-zinc-600">用户可使用 Google 账户快捷登录</td></tr>
                          <tr><td className="px-4 py-2 font-medium text-zinc-800">GitHub</td><td className="px-4 py-2 text-zinc-600">GitHub OAuth 2.0</td><td className="px-4 py-2 text-zinc-600">用户可使用 GitHub 账户快捷登录</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-800 mb-2">授权成功后获取的数据：</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>用户名称：</strong>第三方账户返回的用户名称</li>
                        <li><strong>邮箱地址：</strong>授权账户邮箱</li>
                        <li><strong>头像：</strong>第三方账户头像</li>
                        <li><strong>授权渠道：</strong>Google / GitHub</li>
                        <li><strong>授权账户 ID：</strong>第三方平台返回的账户唯一 ID</li>
                        <li><strong>登录状态：</strong>用户当前登录态</li>
                        <li><strong>用户 ID：</strong>平台内部用户唯一 ID</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">2.4 账号绑定与创建逻辑</div>
                  <div className="p-4 space-y-4 text-sm text-zinc-600">
                    <div>
                      <p className="font-semibold text-zinc-800 mb-2">新用户创建：</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>用户首次使用 Google / GitHub 授权登录，系统自动创建平台账户。</li>
                        <li>首次创建账户后不需要用户额外设置密码。</li>
                        <li>用户登录成功后创建用户登录状态。</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">2.5 & 2.6 账户唯一性与合并规则总结</div>
                  <div className="p-4 space-y-3 text-sm text-zinc-600">
                    <p><strong>核心原则：</strong>平台内部以 <code className="bg-white px-1.5 py-0.5 rounded border border-zinc-200">用户 ID</code> 作为唯一账户主体。Google、GitHub 等第三方授权账户只是该用户 ID 下面的授权登录方式。</p>
                    
                    <table className="w-full mt-3 border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-200"><th className="text-left py-2 font-medium">规则</th><th className="text-left py-2 font-medium">是否允许</th></tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        <tr><td className="py-2">Google 登录后，绑定一个未在平台存在的 GitHub 账户</td><td className="py-2"><span className="text-emerald-600 font-medium">允许</span></td></tr>
                        <tr><td className="py-2">GitHub 登录后，绑定一个未在平台存在的 Google 账户</td><td className="py-2"><span className="text-emerald-600 font-medium">允许</span></td></tr>
                        <tr><td className="py-2">Google 和 GitHub 已分别创建过平台账户后，再互相绑定</td><td className="py-2"><span className="text-rose-600 font-medium">不允许</span></td></tr>
                        <tr><td className="py-2">一个第三方授权账户绑定多个平台用户 ID</td><td className="py-2"><span className="text-rose-600 font-medium">不允许</span></td></tr>
                        <tr><td className="py-2">一个平台用户 ID 绑定多个不同授权渠道</td><td className="py-2"><span className="text-emerald-600 font-medium">允许</span></td></tr>
                        <tr><td className="py-2">删除状态账户是否可重新绑定</td><td className="py-2"><span className="text-zinc-500">第一期暂不支持</span></td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Section 3: API Key 管理 */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold text-zinc-800 flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-md flex items-center justify-center text-sm">3</span>
                  API Key 管理
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">3.1 & 3.2 涉及页面与功能</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">页面 / 模块</th><th className="px-4 py-2 font-medium w-1/4">功能</th><th className="px-4 py-2 font-medium">功能细节</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">API Key</td><td className="px-4 py-3 text-zinc-600">创建 Key</td><td className="px-4 py-3 text-zinc-600">创建新的安全密钥</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">API Key</td><td className="px-4 py-3 text-zinc-600">修改 Key</td><td className="px-4 py-3 text-zinc-600">修改 Key 名称、消费上限、重置周期等所有配置</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">API Key</td><td className="px-4 py-3 text-zinc-600">禁用 Key</td><td className="px-4 py-3 text-zinc-600">将 Key 状态改为 Disabled，不允许继续调用 API</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">API Key</td><td className="px-4 py-3 text-zinc-600">启用 Key</td><td className="px-4 py-3 text-zinc-600">将 Disabled 状态的 Key 恢复为 Active</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">API Key</td><td className="px-4 py-3 text-zinc-600">删除 Key</td><td className="px-4 py-3 text-zinc-600">将 Key 改为 Deleted 状态，删除后不可恢复</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">API Key</td><td className="px-4 py-3 text-zinc-600">Reset Limit</td><td className="px-4 py-3 text-zinc-600">重置 API Key 的 Usage 统计，使其重新释放可用额度</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">API Key</td><td className="px-4 py-3 text-zinc-600">Key 列表</td><td className="px-4 py-3 text-zinc-600">展示 Key 名称、Key 掩码、状态、过期时间、花费、最后使用时间</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">API Key</td><td className="px-4 py-3 text-zinc-600">Key 详情</td><td className="px-4 py-3 text-zinc-600">展示单个 Key 的详细使用数据</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">3.3 API Key 字段规则</div>
                  <div className="p-4 space-y-2 text-sm text-zinc-600">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>密钥格式：</strong>平台生成的安全密钥统一以 <code className="bg-white px-1.5 py-0.5 rounded border border-zinc-200">sk-ch-</code> 开头。</li>
                      <li><strong>明文展示：</strong>完整密钥仅在创建成功时展示一次。关闭弹窗后，用户无法再次查看完整密钥明文。</li>
                      <li><strong>列表展示：</strong>列表中只展示密钥掩码，例如 <code className="bg-white px-1.5 py-0.5 rounded border border-zinc-200">sk-ch-****abcd</code>。后端不应在普通查询接口中返回完整密钥明文。</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">3.4 API Key 创建规则</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium">字段</th><th className="px-4 py-2 font-medium">是否必填</th><th className="px-4 py-2 font-medium">说明</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Key 名称</td><td className="px-4 py-3 text-rose-600">必填</td><td className="px-4 py-3 text-zinc-600">用户自定义 API Key 名称</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Spend Limit / Limit</td><td className="px-4 py-3 text-zinc-600">选填</td><td className="px-4 py-3 text-zinc-600">该 Key 的消费上限</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Reset</td><td className="px-4 py-3 text-emerald-600">条件必填</td><td className="px-4 py-3 text-zinc-600">仅当设置了 Limit 时可选</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Expiration</td><td className="px-4 py-3 text-zinc-600">选填</td><td className="px-4 py-3 text-zinc-600">如第一期需要可支持，否则默认不过期</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">状态</td><td className="px-4 py-3 text-zinc-500">系统生成</td><td className="px-4 py-3 text-zinc-600">创建成功后默认为 Active</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">3.5 消费上限 Spend Limit / Limit 扣费与拦截逻辑</div>
                  <div className="p-4 space-y-3 text-sm text-zinc-600">
                    <p><strong>基础规则：</strong>Limit 选填（留空表示无限制）。Limit 不是从账户余额中隔离扣除的真实预留金额，它是该 Key 自身的最大可使用额度。</p>
                    <p><strong>扣费与拦截逻辑：</strong>实际调用 API 时，费用永远直接从账户总余额中扣除。满足以下任意条件则拦截调用：</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>账户总余额不足或归零 <span className="text-rose-500 font-medium">→ 余额不足</span></li>
                      <li>当前 API Key 的独立 Usage 达到自身 Limit <span className="text-rose-500 font-medium">→ Key已经到了限额 (402)</span></li>
                      <li>当前 API Key 状态为 Disabled / Deleted <span className="text-rose-500 font-medium">→ 禁止调用</span></li>
                      <li>当前 API Key 已过期 <span className="text-rose-500 font-medium">→ 禁止调用</span></li>
                    </ul>
                  </div>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">3.6 Reset 重置周期规则</div>
                  <div className="p-4 space-y-2 text-sm text-zinc-600">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>TOTAL:</strong> 总额度，不按周期自动重置</li>
                      <li><strong>MONTHLY / WEEKLY / CUSTOM:</strong> 按月、周、自定义周期重置</li>
                    </ul>
                    <p className="mt-2 font-semibold text-zinc-800">Limit 与 Reset 的关系：</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Limit 为空 → Reset 强制锁定为 TOTAL，不可更改。</li>
                      <li>Limit 有具体数值 → Reset 可选择 TOTAL、MONTHLY、WEEKLY、CUSTOM。</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">3.7 API Key 状态机与编辑权限</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium">状态</th><th className="px-4 py-2 font-medium">是否可调用 API</th><th className="px-4 py-2 font-medium">是否可编辑</th><th className="px-4 py-2 font-medium">是否可恢复</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Active</td><td className="px-4 py-3 text-emerald-600">是</td><td className="px-4 py-3 text-emerald-600">是</td><td className="px-4 py-3 text-zinc-400">-</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Disabled</td><td className="px-4 py-3 text-rose-600">否</td><td className="px-4 py-3 text-zinc-600">只能修改名称/Limit</td><td className="px-4 py-3 text-emerald-600">是 (恢复为 Active)</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Deleted</td><td className="px-4 py-3 text-rose-600">否</td><td className="px-4 py-3 text-rose-600">否</td><td className="px-4 py-3 text-rose-600">否 (永久废弃)</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">3.8 & 3.9 API Key 列表与详情字段</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium">字段</th><th className="px-4 py-2 font-medium">说明</th><th className="px-4 py-2 font-medium text-center">列表展示</th><th className="px-4 py-2 font-medium text-center">详情展示</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">Key 名称</td><td className="px-4 py-2 text-zinc-600">用户自定义名称</td><td className="px-4 py-2 text-center text-emerald-600">✓</td><td className="px-4 py-2 text-center text-emerald-600">✓</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">Key 掩码</td><td className="px-4 py-2 text-zinc-600">脱敏后的 Key</td><td className="px-4 py-2 text-center text-emerald-600">✓</td><td className="px-4 py-2 text-center text-emerald-600">✓</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">状态</td><td className="px-4 py-2 text-zinc-600">Active / Disabled / Deleted</td><td className="px-4 py-2 text-center text-emerald-600">✓</td><td className="px-4 py-2 text-center text-emerald-600">✓</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">Spend Limit / Limit</td><td className="px-4 py-2 text-zinc-600">当前 Key 设置的消费上限</td><td className="px-4 py-2 text-center text-emerald-600">✓</td><td className="px-4 py-2 text-center text-emerald-600">✓</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">Usage</td><td className="px-4 py-2 text-zinc-600">当前 Key 已使用额度</td><td className="px-4 py-2 text-center text-emerald-600">✓</td><td className="px-4 py-2 text-center text-emerald-600">✓</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">Reset</td><td className="px-4 py-2 text-zinc-600">重置周期</td><td className="px-4 py-2 text-center text-emerald-600">✓</td><td className="px-4 py-2 text-center text-emerald-600">✓</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">过期时间</td><td className="px-4 py-2 text-zinc-600">Key 过期时间</td><td className="px-4 py-2 text-center text-emerald-600">✓</td><td className="px-4 py-2 text-center text-emerald-600">✓</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">花费</td><td className="px-4 py-2 text-zinc-600">当前 Key 累计花费</td><td className="px-4 py-2 text-center text-emerald-600">✓</td><td className="px-4 py-2 text-center text-emerald-600">✓</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">最后使用时间</td><td className="px-4 py-2 text-zinc-600">最近一次调用 API 的时间</td><td className="px-4 py-2 text-center text-emerald-600">✓</td><td className="px-4 py-2 text-center text-emerald-600">✓</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">创建时间</td><td className="px-4 py-2 text-zinc-600">Key 创建时间</td><td className="px-4 py-2 text-center text-zinc-400">-</td><td className="px-4 py-2 text-center text-emerald-600">✓</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">更新时间</td><td className="px-4 py-2 text-zinc-600">Key 最近一次更新时间</td><td className="px-4 py-2 text-center text-zinc-400">-</td><td className="px-4 py-2 text-center text-emerald-600">✓</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">3.10 API Key 接口校验规则</div>
                  <div className="p-4 space-y-4 text-sm text-zinc-600">
                    <div>
                      <p className="font-semibold text-zinc-800 mb-2">创建 Key & 编辑 Key 校验：</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Key 名称：</strong>必填 / 支持修改</li>
                        <li><strong>Limit：</strong>选填；填写时必须大于 0</li>
                        <li><strong>Reset：</strong>Limit 为空时强制为 TOTAL；Limit 有值时可选且必须符合互斥规则</li>
                        <li><strong>Key 格式 (仅创建)：</strong>必须生成 sk-ch- 开头的安全密钥</li>
                        <li><strong>编辑状态限制：</strong>Active/Disabled 可编辑，Deleted 状态不可编辑</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-800 mb-2">修改状态校验：</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Active ↔ Disabled 相互切换：允许</li>
                        <li>Active / Disabled → Deleted：允许</li>
                        <li>Deleted → Active / Disabled：不允许</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-800 mb-2">Reset Limit 校验：</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Key 必须存在且非 Deleted 状态</li>
                        <li>必须设置了 Limit，未设置时无实际意义可不展示该操作</li>
                        <li>重置后清空或重新计算该 Key 当前周期 Usage</li>
                        <li>重置只影响 Key Usage 统计，不影响、不返还账户总余额</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4: API 文档基础 */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold text-zinc-800 flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-md flex items-center justify-center text-sm">4</span>
                  API 文档基础
                </h3>
                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">4.1 涉及页面 / 模块</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/3">页面 / 模块</th><th className="px-4 py-2 font-medium">说明</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">API 文档 - 文档结构设计</td><td className="px-4 py-2 text-zinc-600">按供应商、模型类型、模型改造组织文档结构</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">API 文档 - 视频类模型 JSON 数据整合</td><td className="px-4 py-2 text-zinc-600">整合视频类模型 JSON 数据</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">API 文档 - 图片类模型 JSON 数据整合</td><td className="px-4 py-2 text-zinc-600">整合图片类模型 JSON 数据</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">API 文档 - 聊天类模型 JSON 数据整合</td><td className="px-4 py-2 text-zinc-600">整合聊天类模型 JSON 数据</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">API 文档 - 音频类模型 JSON 数据整合</td><td className="px-4 py-2 text-zinc-600">整合音频类模型 JSON 数据</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">API 文档 - 模型配置聚合处理</td><td className="px-4 py-2 text-zinc-600">处理 docs.json 模型配置文件</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">API 文档 - 模型文档拆分</td><td className="px-4 py-2 text-zinc-600">将现有模型拆解成每个具体模型的独立文档</td></tr>
                      <tr><td className="px-4 py-2 text-zinc-800 font-medium">API 文档 - 单模型文档内容</td><td className="px-4 py-2 text-zinc-600">每个模型包含请求参数、返回参数、错误说明</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

            </div>
          )}

          {activeTab === "phase2" && (
            <div className="max-w-4xl space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">第二期主要功能范围</h2>
                <p className="text-zinc-600 mb-6 mt-4">第二期主要包含以下模块：模型广场 Models、模型详情页 Model Details、Pricing 页面、模型详情页 Playground、Mintlify 文档系统。</p>
              </div>

              {/* Section 1: 模型广场 Models */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">1</div>
                  模型广场 Models
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">1.1 & 1.2 页面与功能</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">页面 / 模块</th><th className="px-4 py-2 font-medium w-1/4">功能</th><th className="px-4 py-2 font-medium">功能细节</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">模型广场</td><td className="px-4 py-3 text-zinc-600">模型列表展示</td><td className="px-4 py-3 text-zinc-600">模型列表接口需支持数据筛选、分页、总条数展示</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">模型广场</td><td className="px-4 py-3 text-zinc-600">模型信息展示</td><td className="px-4 py-3 text-zinc-600">列表项展示模型基础信息，点击后进入模型详情页</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">模型广场</td><td className="px-4 py-3 text-zinc-600">数据筛选</td><td className="px-4 py-3 text-zinc-600">支持按供应商、模态分类、任务标签等条件筛选</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">模型广场</td><td className="px-4 py-3 text-zinc-600">顶部搜索</td><td className="px-4 py-3 text-zinc-600">支持按模型名称、模型 ID、Provider 名称、标签等搜索</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">模型广场</td><td className="px-4 py-3 text-zinc-600">模型卡片</td><td className="px-4 py-3 text-zinc-600">展示模型封面、价格、Logo、模型 ID、简介、功能标签等信息</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">1.4 模型卡片展示说明</div>
                  <div className="p-4 space-y-4 text-sm text-zinc-600">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>卡片顶部 Preview：</strong>展示模型封面素材，优先使用后端返回的图片/视频 URL</li>
                      <li><strong>卡片主体：</strong>模型名称、模型 ID、简介</li>
                      <li><strong>卡片价格区 Price：</strong>展示该模型的基础价格或起始价格</li>
                      <li><strong>卡片品牌区 Provider Logo：</strong>仅展示 Logo，不展示 Provider 文本名称</li>
                      <li><strong>卡片标签区 Tags：</strong>展示模型能力标签，辅助用户识别模型类型</li>
                    </ul>
                    <p className="mt-2 text-rose-500 bg-rose-50 px-3 py-2 rounded-md"><strong>规则说明：</strong>前端卡片上不直接展示提供商名称，但顶部搜索栏和筛选条件需支持按提供商搜索/过滤。</p>
                  </div>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">1.7 字段来源</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">数据来源</th><th className="px-4 py-2 font-medium w-1/3">包含字段</th><th className="px-4 py-2 font-medium">说明</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">后端模型基础信息</td><td className="px-4 py-3 text-zinc-600">模型 ID、模型名称、Provider、模型类型、状态</td><td className="px-4 py-3 text-zinc-600">模型的核心结构化信息</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Display Metadata</td><td className="px-4 py-3 text-zinc-600">Preview、Provider Logo、展示素材、品牌资产</td><td className="px-4 py-3 text-zinc-600">主要用于前端视觉展示</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Pricing Details</td><td className="px-4 py-3 text-zinc-600">Price、计费方式、计费单位、美元价格、Credit 换算</td><td className="px-4 py-3 text-zinc-600">主要用于价格展示和预估计算</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">CMS</td><td className="px-4 py-3 text-zinc-600">Description、模型简介、营销文案、适用场景描述</td><td className="px-4 py-3 text-zinc-600">主要用于内容展示</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Taxonomy</td><td className="px-4 py-3 text-zinc-600">Tags、模态分类、二级任务标签、能力标签</td><td className="px-4 py-3 text-zinc-600">主要用于标签展示、筛选和搜索</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* End Section 1 */}

              {/* Section 2: 模型详情页 Model Details */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">2</div>
                  模型详情页 Model Details
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">2.2 页面结构</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">区域 / Tab</th><th className="px-4 py-2 font-medium w-1/4">功能</th><th className="px-4 py-2 font-medium">功能细节</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Header 区域</td><td className="px-4 py-3 text-zinc-600">模型核心信息展示</td><td className="px-4 py-3 text-zinc-600">展示商业授权标识、Run with API 快捷按钮、各规格美元报价</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Copy Page 按钮</td><td className="px-4 py-3 text-zinc-600">Markdown 复制</td><td className="px-4 py-3 text-zinc-600">将模型详情页核心内容转换为 Markdown 并复制</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">API Tab</td><td className="px-4 py-3 text-zinc-600">API 调用说明</td><td className="px-4 py-3 text-zinc-600">提供 Endpoint、请求参数说明及 Python / Node.js / cURL 代码示例</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">README Tab</td><td className="px-4 py-3 text-zinc-600">模型背景信息</td><td className="px-4 py-3 text-zinc-600">展示可用模型版本、价格详情等信息</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Showcase Tab</td><td className="px-4 py-3 text-zinc-600">案例静态展示</td><td className="px-4 py-3 text-zinc-600">静态展示模型生成案例 (图片/视频/文本及 Prompt)</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">2.7 README Tab 价格模块展示规则</div>
                  <div className="p-4 space-y-4 text-sm text-zinc-600">
                    <div>
                      <p className="font-semibold text-zinc-800 mb-2">Available Model Versions (可用模型版本):</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>展示 <strong>Trunk Model</strong> (最新版本) 和 <strong>Snapshot Model</strong> (特定版本)</li>
                        <li>字段：Model ID / API Call、Type (Latest/Snapshot)、API Docs、Credits、Price USD</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-800 mb-2">Pricing Details (价格详情):</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>展示不同计费组合及其对应价格，如 Input Token、Output Token、生成次数、视频时长等</li>
                        <li>字段：Model & Modality、Credits / Gen、Cache Hit (如支持)、Our Price USD</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* End Section 2 */}

              {/* Section 3: Pricing 页面 */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">3</div>
                  Pricing 页面
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">3.2 功能清单</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能</th><th className="px-4 py-2 font-medium">功能细节</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Pricing 列表</td><td className="px-4 py-3 text-zinc-600">集中展示所有模型的计费标准</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">数据筛选</td><td className="px-4 py-3 text-zinc-600">支持按模型类型、供应商等条件过滤</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">分页与总条数</td><td className="px-4 py-3 text-zinc-600">支持分页展示，展示符合筛选条件的数据总条数</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">详情跳转</td><td className="px-4 py-3 text-zinc-600">支持跳转至对应模型详情页</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 4: 模型详情页 Playground */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">4</div>
                  模型详情页 Playground
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">4.2 功能清单</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能</th><th className="px-4 py-2 font-medium">功能细节</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">动态参数面板</td><td className="px-4 py-3 text-zinc-600">根据不同大模型规范 (如字节、阿里、MiniMax、智谱等)，动态渲染该模型专属参数</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">价格预计计算</td><td className="px-4 py-3 text-zinc-600">根据计费因子 (输入字数、图片分辨率、视频时长等) 自动计算本次调用预估价格</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">API 调用逻辑</td><td className="px-4 py-3 text-zinc-600">统一由后端 NewAPI 服务转发，不直接从前端调用模型供应商接口</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">异步任务</td><td className="px-4 py-3 text-zinc-600">视频等耗时任务支持异步状态轮询 / 查询 (Pending -&gt; Processing -&gt; Succeeded/Failed)</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">日志记录</td><td className="px-4 py-3 text-zinc-600">每一次调用都记录模型调用日志，用于后续账单和额度扣除追溯</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* End Section 4 */}

              {/* Section 5: Mintlify 文档系统 */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">5</div>
                  Mintlify 文档系统
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">5.1 涉及模块</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能</th><th className="px-4 py-2 font-medium">功能细节</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">文档系统调研</td><td className="px-4 py-3 text-zinc-600">参考 Kie.ai 风格进行文档结构调研</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">文档系统创建</td><td className="px-4 py-3 text-zinc-600">创建 API 独立文档系统</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">文档内容输出</td><td className="px-4 py-3 text-zinc-600">输出模型 API 文档内容</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>
              
              {/* End Section 5 */}
            </div>
          )}

          {activeTab === "phase3" && (
            <div className="max-w-4xl space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">第三期主要功能范围</h2>
                <p className="text-zinc-600 mb-6 mt-4">第三期主要包含以下模块：Billing 页面、API Keys 页面、Asset Library 页面、Playground / Models 页面。</p>
              </div>

              {/* Section 1: Billing 页面：财务与账单管理 */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">1</div>
                  Billing 页面：财务与账单管理
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">1.1 & 1.2 页面与功能</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能</th><th className="px-4 py-2 font-medium">功能细节</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Add Funds / 充值套餐</td><td className="px-4 py-3 text-zinc-600">用户选择固定充值套餐并完成支付</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">套餐列表</td><td className="px-4 py-3 text-zinc-600">获取后台配置的套餐列表，例如 5 美金 = 5000 Credits</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Credit 计价规则</td><td className="px-4 py-3 text-zinc-600">采用 Credit 计价，例如后台可配置 1 美金 = 1000 Credits</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">支付对接</td><td className="px-4 py-3 text-zinc-600">PayPal支付；Stripe （信用卡）支付接入</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">支付成功邮件</td><td className="px-4 py-3 text-zinc-600">用户支付成功后发送充值成功邮件</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">支付 Webhook</td><td className="px-4 py-3 text-zinc-600">接收支付平台 Webhook 回调，更新订单与账户余额</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Payment Methods / 支付方式管理</td><td className="px-4 py-3 text-zinc-600">获取与保存用户支付方式</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Auto-recharge / 自动充值</td><td className="px-4 py-3 text-zinc-600">支持绑定支付方式后，设置余额低于指定美元值时自动触发扣款充值，目前只支持信用卡付款可以开启自动充值</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Billing History / 充值账单列表</td><td className="px-4 py-3 text-zinc-600">展示用户充值订单记录</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Invoice / 发票下载</td><td className="px-4 py-3 text-zinc-600">每笔充值订单可下载 PDF 格式的合规 Invoice</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 2: API Keys 页面：API Key 优化 */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">2</div>
                  API Keys 页面：API Key 优化
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">2.4 & 2.5 接口优化规则</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能</th><th className="px-4 py-2 font-medium">规则说明</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">编辑接口优化</td><td className="px-4 py-3 text-zinc-600">编辑时需要调用 NewAPI 接口进行同步，NewAPI 返回成功后再更新本地 API Key 数据</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">删除接口优化</td><td className="px-4 py-3 text-zinc-600">删除时需要调用 NewAPI 接口进行同步，删除后 Key 进入 Deleted 状态（不可恢复/不可编辑）</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 3: Asset Library 页面：Seedance 2.0 用户资产库 */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">3</div>
                  Asset Library 页面：Seedance 2.0 用户资产库
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">3.2 功能清单</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能</th><th className="px-4 py-2 font-medium">功能细节</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">授权认证接口与数据表设计</td><td className="px-4 py-3 text-zinc-600">支持 Seedance 2.0 资产授权认证能力</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">用户可授信资产库列表</td><td className="px-4 py-3 text-zinc-600">查询并展示用户可授信资产列表</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">用户资产上传</td><td className="px-4 py-3 text-zinc-600">用户上传 Seedance 2.0 支持的图片或视频资产，绑定当前平台用户 ID 与授权信息</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">用户资产重命名</td><td className="px-4 py-3 text-zinc-600">仅资产所属用户可重命名</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">用户资产删除</td><td className="px-4 py-3 text-zinc-600">仅资产所属用户可删除，软删除状态</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">用户资产状态回调</td><td className="px-4 py-3 text-zinc-600">接收资产处理状态回调（可用/失败等）</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">资产状态展示</td><td className="px-4 py-3 text-zinc-600">展示资产上传、处理中、可用、失败等状态</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 4: Playground / Models 页面：Seedance 2.0 模型调用 */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">4</div>
                  Playground / Models 页面：Seedance 2.0 模型调用
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">4.2 功能清单</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能</th><th className="px-4 py-2 font-medium">功能细节</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Seedance 2.0 模型接口优化</td><td className="px-4 py-3 text-zinc-600">调用优化后的 Seedance 2.0 模型接口</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">专属生成按钮</td><td className="px-4 py-3 text-zinc-600">针对 Seedance 2.0 模型展示生成 / 调用入口</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">资产引用</td><td className="px-4 py-3 text-zinc-600">调用时可选择 Asset Library 中可用状态的资产</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">调用状态展示</td><td className="px-4 py-3 text-zinc-600">展示生成中、成功、失败等状态</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">结果展示</td><td className="px-4 py-3 text-zinc-600">调用成功后展示生成结果，并进行日志记录和错误处理</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* End Section 4 */}
            </div>
          )}

          {activeTab === "phase4" && (
            <div className="max-w-4xl space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">第四期主要功能范围</h2>
                <p className="text-zinc-600 mb-6 mt-4">第四期主要包含以下模块：Dashboard 仪表盘、Playground 模型调用与调试优化、Activity Log 日志系统、资产库与素材库 API、财务支付与自动扣款优化、基础 UI 优化。</p>
              </div>

              {/* Section 1: Dashboard 仪表盘 */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">1</div>
                  Dashboard 仪表盘
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">1.2 功能清单</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能</th><th className="px-4 py-2 font-medium">功能细节</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Spend 卡片</td><td className="px-4 py-3 text-zinc-600">实时展示当前账户美元余额及消耗情况</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">24 小时消耗趋势</td><td className="px-4 py-3 text-zinc-600">Spend 卡片配备 24 小时消耗趋势柱状图</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Requests 卡片</td><td className="px-4 py-3 text-zinc-600">展示 API 请求总数</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">成功率</td><td className="px-4 py-3 text-zinc-600">请求成功率</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">1.3 Tooltips / 规则说明</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">页面区域 / 元素</th><th className="px-4 py-2 font-medium">Tooltips / 规则说明</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Spend 卡片</td><td className="px-4 py-3 text-zinc-600">实时展示当前账户的美元余额及消耗情况，配备直观的 24 小时消耗趋势柱状图</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Requests 卡片</td><td className="px-4 py-3 text-zinc-600">统计并展示 API 请求总数，且明确区分成功与失败的调用</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">成功率卡片</td><td className="px-4 py-3 text-zinc-600">统计总请求的成功率，成功次数/总请求次数</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">1.4 Dashboard 卡片字段</div>
                  <div className="p-4 space-y-4 text-sm text-zinc-600">
                    <div>
                      <p className="font-semibold text-zinc-800 mb-2">Spend 卡片：</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>当前美元余额、当前 Credits 余额、今日消耗、24 小时消耗趋势</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-800 mb-2">Requests & 成功率卡片：</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>请求总数 (当前统计周期内 API 请求总数)</li>
                        <li>成功率 (当前统计周期内 API 请求成功率)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Playground 模型调用与调试优化 */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">2</div>
                  Playground 模型调用与调试优化
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">2.2 功能清单</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能</th><th className="px-4 py-2 font-medium">功能细节</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">左右布局重构</td><td className="px-4 py-3 text-zinc-600">重构为左侧参数、右侧结果的布局结构</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">生成历史记录列表</td><td className="px-4 py-3 text-zinc-600">生成历史记录改为列表格式，方便回溯每次结果</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">API Key 智能选择</td><td className="px-4 py-3 text-zinc-600">请求时只需选择一次 API Key</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Key 余额不足提示</td><td className="px-4 py-3 text-zinc-600">当 Key 余额不满足当前调用时，主动提示用户更换 Key</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">参数控件统一</td><td className="px-4 py-3 text-zinc-600">统一相同类型参数的控件形式</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">系统提示词</td><td className="px-4 py-3 text-zinc-600">增加系统提示词功能</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">参数来源统一</td><td className="px-4 py-3 text-zinc-600">C 端配合 B 端梳理并统一所有 Playground 参数来源</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Seedance 2.0 assetId 调用</td><td className="px-4 py-3 text-zinc-600">请求 Seedance 2.0 平台素材时，改为通过 assetId 直接调用</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Pricing 详情跳转</td><td className="px-4 py-3 text-zinc-600">在相关入口增加可跳转至对应模型 Pricing 详情的超链接</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">2.3 Tooltips / 规则说明</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">页面区域 / 元素</th><th className="px-4 py-2 font-medium">Tooltips / 规则说明</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">整体布局与历史</td><td className="px-4 py-3 text-zinc-600">重构为“左侧参数，右侧结果”的高效布局结构；生成历史记录修改为列表格式，方便回溯每次具体生成结果</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">API Key 智能体验</td><td className="px-4 py-3 text-zinc-600">请求时只需选择一次 API Key；系统会在 Key 余额不满足当前调用时，主动提示用户更换</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">参数与控件统一</td><td className="px-4 py-3 text-zinc-600">统一相关联的参数控件，例如所有涉及秒数选择的地方统一使用下拉框或滑块；增加系统提示词功能，并从 C 端配合 B 端完整梳理并统一参数来源逻辑</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">资产引用</td><td className="px-4 py-3 text-zinc-600">在 Playground 请求 Seedance 2.0 平台素材时，变更为直接通过 assetId 进行调用；并在相关入口增加可跳转至对应模型 Pricing 详情的超链接</td></tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">2.4 - 2.7 布局及控件等各项规则</div>
                  <div className="p-4 space-y-4 text-sm text-zinc-600">
                    <div>
                      <p className="font-semibold text-zinc-800 mb-2">布局规则：</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>左侧参数区：模型选择、API Key、参数控件、系统提示词、输入内容、生成按钮。</li>
                        <li>右侧结果区：生成结果、加载状态、错误提示、生成历史入口。</li>
                        <li>历史记录区：历史生成列表。</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-800 mb-2">API Key 及 AssetID 调用规则：</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>一次选择/记忆选择：Playground 记住用户的选择，调用前检查 Key 状态和余额。余额不足提示更换，禁用 Key 拦截。</li>
                        <li>AssetID 调用：仅 Available 状态资产可被引用，报错及日志均记录 AssetID。</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-800 mb-2">参数控件统一规则：</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>秒数/时长：下拉框或滑块；数量：步进器或下拉框；分辨率/尺寸：下拉框。</li>
                        <li>开关项：Switch；文本输入：输入框/Textarea；枚举参数：Select。</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Activity Log 日志系统 */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">3</div>
                  Activity Log 日志系统
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">3.2 功能清单</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能</th><th className="px-4 py-2 font-medium">功能细节</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">日志列表</td><td className="px-4 py-3 text-zinc-600">展示每次调用的时间、模型、延迟、Token 用量、花费、状态和操作</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">日志详情</td><td className="px-4 py-3 text-zinc-600">支持查看单条日志详情</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Pending 等待状态</td><td className="px-4 py-3 text-zinc-600">Processing 状态下展示等待状态，按钮禁用</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Download 下载</td><td className="px-4 py-3 text-zinc-600">Completed 且模态为 Video/Image/Audio 时支持下载媒体文件</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">View Details 查看明细</td><td className="px-4 py-3 text-zinc-600">Completed 且模态为 Chat/Text 时支持查看完整输入和输出</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Error Trace 错误追溯</td><td className="px-4 py-3 text-zinc-600">Failed 状态下支持查看代码层级报错详情</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">多模态动态字段渲染</td><td className="px-4 py-3 text-zinc-600">根据 modality 字段动态展示 Token、分辨率、时长、batch size 等数据</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">3.3 Tooltips / 规则说明</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">页面区域 / 元素</th><th className="px-4 py-2 font-medium">Tooltips / 规则说明</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">日志展示</td><td className="px-4 py-3 text-zinc-600">列表需要精确展示每次调用的时间、模型名称、网络延迟、Token 用量以及预估 / 实际花费</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">详情与导出流</td><td className="px-4 py-3 text-zinc-600">不仅支持查看具体日志详情，还提供日志的异步导出任务，支持查询导出进度，并支持将最终生成的日志文件直接发送至用户绑定邮箱</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Pending 等待</td><td className="px-4 py-3 text-zinc-600">当日志状态为 Processing 时，展示灰色时钟图标，按钮禁用，悬停提示 “Still generating…”</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Download 下载</td><td className="px-4 py-3 text-zinc-600">当日志状态为 Completed 且模态为 Video / Image / Audio 时，展示下载图标，点击后直接下载生成的媒体文件；如媒体文件已超过 7 天有效期，则按钮不可用</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">View Details 查看明细</td><td className="px-4 py-3 text-zinc-600">当日志状态为 Completed 且模态为 Chat / Text 时，展示眼睛图标，点击弹出抽屉或 Modal，展示用户完整输入 Prompt 和模型输出结果，输出建议以 JSON 格式展示</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">Error Trace 错误追溯</td><td className="px-4 py-3 text-zinc-600">当日志状态为 Failed 时，无论任何模态，都展示红色代码图标 &lt; &gt;，点击后弹出代码层级报错详情，帮助开发者排查问题</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">多模态兼容逻辑</td><td className="px-4 py-3 text-zinc-600">对于文本 / Chat 模型，展示 prompt_tokens 和 completion_tokens；对于图像 / 视频模型，展示 resolution、duration 或 batch_size。前端通过日志的 modality 字段动态渲染不同排版结构</td></tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">3.4 - 3.8 日志相关规则与字段</div>
                  <div className="p-4 space-y-4 text-sm text-zinc-600">
                    <div>
                      <p className="font-medium text-zinc-800">1. 日志只保留 30 天</p>
                      <p>超过 30 天的日志系统自动清理。</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6: 基础 UI 优化 */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">6</div>
                  基础 UI 优化
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">6.2 功能清单</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能</th><th className="px-4 py-2 font-medium">功能细节</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">页面动效优化</td><td className="px-4 py-3 text-zinc-600">优化官网页面动效，保证不影响加载性能</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">跳转链接优化</td><td className="px-4 py-3 text-zinc-600">优化官网各模块跳转链接</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">视觉配色优化</td><td className="px-4 py-3 text-zinc-600">优化平台整体 UI 配色</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">视觉一致性</td><td className="px-4 py-3 text-zinc-600">保持 Dashboard、Playground、Billing、Activity Log 等页面风格一致</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">6.3 Tooltips / 规则说明</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">页面区域 / 元素</th><th className="px-4 py-2 font-medium">Tooltips / 规则说明</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">官网与视觉</td><td className="px-4 py-3 text-zinc-600">优化官网的页面动效及各模块的跳转链接；对平台的整体 UI 视觉配色进行优化</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {activeTab === "phase202629" && (
            <div className="max-w-4xl space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">[202629需求] 模型折扣</h2>
                <p className="text-zinc-600 mb-6 mt-4">该需求主要是在各个模型展示区域增加模型折扣的标签，并依据 B 端活动设置来显示具体折扣及生效时间。</p>
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">1</div>
                  需求内容与 Tooltips
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">展示区域与规则说明</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能点</th><th className="px-4 py-2 font-medium">细节与 Tooltips / 规则</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr>
                        <td className="px-4 py-3 text-zinc-800 font-medium">模型折扣标签展示区域</td>
                        <td className="px-4 py-3 text-zinc-600">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Pricing 页面</li>
                            <li>模型广场页面</li>
                            <li>模型详情页头部（标题旁边）</li>
                            <li>模型详情页 Readme 价格区域</li>
                          </ul>
                          <p className="mt-2 text-sm text-zinc-500">在上述区域都增加对应的模型折扣标签。</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-zinc-800 font-medium">折扣数据来源</td>
                        <td className="px-4 py-3 text-zinc-600">模型是否有折扣，以及具体折扣、时间范围，均来自 B 端营销模块的模型限时折扣活动对应的设置。</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">[202629需求] 模型广场排序需求</h2>
                <p className="text-zinc-600 mb-6 mt-4">该需求是为了运营可以在模型广场按照模型的热度对模型排序进行人为干预。</p>
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">2</div>
                  需求内容与 Tooltips
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">模型广场排序规则</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能点</th><th className="px-4 py-2 font-medium">细节与 Tooltips / 规则</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr>
                        <td className="px-4 py-3 text-zinc-800 font-medium">默认排序规则</td>
                        <td className="px-4 py-3 text-zinc-600">模型广场模型排序按照B端的序号进行排序（倒序），如果序号相同，则按照模型上架时间（倒序）排列。</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* API Key Restrictions Requirement */}
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">[202629需求] API Key 增加 IP 白名单与指定模型限制</h2>
                <p className="text-zinc-600 mb-6 mt-4">为了提升 API Key 的安全性与成本控制能力，允许用户在创建或编辑 API Key 时，对该 Key 的调用权限进行更精细的管控，包括：限制 API Key 只能从指定 IP 调用；限制 API Key 只能调用指定模型。</p>
              </div>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">3</div>
                  需求内容与 Tooltips
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">一、IP 白名单限制</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能点</th><th className="px-4 py-2 font-medium">细节与 Tooltips / 规则</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr>
                        <td className="px-4 py-3 text-zinc-800 font-medium">设置入口与输入规则</td>
                        <td className="px-4 py-3 text-zinc-600">在创建或编辑 API Key 时，增加 IP 白名单输入框。<br/>支持输入一个或多个 IP，以英文逗号、分号或换行分隔。输入框下方需有文案提示。<br/>校验规则：支持 IPv4 单个地址。</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-zinc-800 font-medium">调用规则</td>
                        <td className="px-4 py-3 text-zinc-600">若为空则不限制调用来源。若填写了，仅允许来自白名单中的 IP 发起请求。<br/>非白名单 IP 请求拦截并返回 <code>ip_not_allowed</code> 错误。</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">二、指定模型限制</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能点</th><th className="px-4 py-2 font-medium">细节与 Tooltips / 规则</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr>
                        <td className="px-4 py-3 text-zinc-800 font-medium">设置入口</td>
                        <td className="px-4 py-3 text-zinc-600">在创建或编辑 API Key 时，增加模型限制选择器（下拉多选或复选框），支持搜索模型以便快速选择。</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-zinc-800 font-medium">设置与调用规则</td>
                        <td className="px-4 py-3 text-zinc-600">默认不限制模型。若选择了指定模型，则该 Key 仅能调用选中模型。<br/>调用未授权模型时返回 <code>model_not_allowed</code> 错误。</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">三、API Key 列表及其他页面功能</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能点</th><th className="px-4 py-2 font-medium">细节与 Tooltips / 规则</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr>
                        <td className="px-4 py-3 text-zinc-800 font-medium">列表展示</td>
                        <td className="px-4 py-3 text-zinc-600">API Key 列表增加是否开启 IP 限制、模型限制。如果有，展示具体内容；鼠标悬停可查看详细，没有则显示否。</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-zinc-800 font-medium">兼容性规则</td>
                        <td className="px-4 py-3 text-zinc-600">已有 Key 默认保持“不限制”状态（空 IP、空模型），允许任意 IP 和所有模型调用。</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              
              {/* User ID Display Requirement */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">[202629需求] 用户唯一标识 (User ID) 展示</h2>
                <p className="text-zinc-600 mb-6 mt-4">为了方便用户确认自己的身份以及后续排查问题，在前端全局增加用户唯一标识（User ID）的展示，要求脱敏且唯一，不能直接暴露业务规模（如递增的数字 ID）。</p>
                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">功能细节</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能点</th><th className="px-4 py-2 font-medium">细节与要求</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr>
                        <td className="px-4 py-3 text-zinc-800 font-medium">顶部导航栏头像下拉菜单</td>
                        <td className="px-4 py-3 text-zinc-600">在点击右上角头像展开的下拉菜单中，除了原有显示的用户名、邮箱外，增加一行显示用户的唯一 User ID。</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-zinc-800 font-medium">Settings (设置) 页面</td>
                        <td className="px-4 py-3 text-zinc-600">在 Settings 页面的顶部个人资料卡片区域，紧跟邮箱地址后，新增显示该用户的 User ID。</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-zinc-800 font-medium">ID 格式规则</td>
                        <td className="px-4 py-3 text-zinc-600">1. 必须全局唯一。<br/>2. 采用随机字符串形式（例如包含字母和数字的哈希或 UUID 变体，带 <code>usr_</code> 前缀），<strong className="text-red-500">绝不能使用自增数字</strong>，防止暴露出平台当前注册用户的总数。</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="max-w-4xl space-y-10">
              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">PowerTokens SEO 基础改造方案</h2>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800">一、目标</h3>
                <p className="text-zinc-600">本次只做 SEO 基础建设，让 Google 能正常抓取官网，并初步识别：</p>
                <ul className="list-disc pl-6 text-zinc-600 space-y-1">
                  <li>PowerTokens 是一个独立品牌</li>
                  <li>PowerTokens 是一个 Unified AI API Platform</li>
                  <li>PowerTokens 提供 DeepSeek、Qwen、Seedance、MiniMax、Hailuo 等模型 API 接入</li>
                </ul>
                <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100 mt-4">
                  <p className="text-sm text-zinc-700"><strong>官网统一域名：</strong> https://powertokens.ai</p>
                  <p className="text-sm text-zinc-700 mt-2"><strong>品牌名称统一：</strong> PowerTokens</p>
                  <p className="text-sm text-zinc-500 mt-1">不要混用：Power Token, Power Tokens, Powertoken, powerwin.ai</p>
                </div>
              </section>

              <div className="border-t border-zinc-200 my-8"></div>

              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-zinc-800">二、改造7个方面</h3>

                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-zinc-800">1. robots.txt</h4>
                  <p className="text-zinc-600 text-sm">当前 Cloudflare 的 robots 规则可以保留。</p>
                  <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                    <p className="text-sm font-medium text-zinc-700 mb-2">需要确认：</p>
                    <ol className="list-decimal pl-5 text-sm text-zinc-600 space-y-1">
                      <li>不要禁止 Googlebot</li>
                      <li>最好增加 Sitemap: <code>https://powertokens.ai/sitemap.xml</code></li>
                    </ol>
                    <p className="text-xs text-zinc-500 mt-3">如果 Cloudflare 不方便加 sitemap，也没关系，只要后面在 Google Search Console 手动提交 sitemap。</p>
                  </div>
                </div>

                <div className="border-t border-zinc-100 my-6"></div>

                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-zinc-800">2. sitemap.xml</h4>
                  <p className="text-zinc-600 text-sm">新增：<code>app/sitemap.ts</code></p>
                  <p className="text-zinc-600 text-sm">基础版 sitemap 包含公开页面，不包含登录后页面。</p>
                  <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-xs overflow-x-auto">
{`import type { MetadataRoute } from 'next'

const baseUrl = 'https://powertokens.ai'

const staticRoutes = [
  { path: '/', changeFrequency: 'weekly' as const, priority: 1 },
  { path: '/pricing', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: '/models', changeFrequency: 'weekly' as const, priority: 0.95 },
  { path: '/readme', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/faq', changeFrequency: 'monthly' as const, priority: 0.7 },
]

const modelSlugs = [
  'dreamina-seedance-2-0-mini-260615',
  'dreamina-seedance-2-0-260128',
  'dreamina-seedance-2-0-fast-260128',
  'glm-5-2',
  'glm-5',
  'seedream-5-0-260128',
  'minimax-m3',
  'seedance-1-5-pro-251215',
  'glm-5-turbo',
  'glm-5-1',
  'minimax-hailuo-2-3-fast',
  'minimax-hailuo-2-3',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages = staticRoutes.map((route) => ({
    url: \`\${baseUrl}\${route.path}\`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const modelPages = modelSlugs.map((slug) => ({
    url: \`\${baseUrl}/models/\${slug}\`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  return [...staticPages, ...modelPages]
}`}
                  </pre>
                  <div className="bg-red-50 text-red-800 p-3 rounded-lg border border-red-100 text-sm">
                    <strong>不要放进 sitemap：</strong> <code>/dashboard</code>, <code>/api-key</code>, <code>/api-keys</code>, <code>/billing</code>, <code>/settings</code>, <code>/login</code>, <code>/register</code>
                  </div>
                </div>

                <div className="border-t border-zinc-100 my-6"></div>

                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-zinc-800">3. 首页不要纯 CSR</h4>
                  <p className="text-zinc-600 text-sm">首页核心内容必须能在源码中看到。<br/>Next.js App Router 首页：<code>app/page.tsx</code><br/>不要整页写：<code>'use client'</code></p>
                  
                  <p className="text-sm font-medium text-zinc-700 mt-4">首页核心内容建议：</p>
                  <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-xs overflow-x-auto">
{`<h1>PowerTokens</h1>
<h2>Unified AI API Platform</h2>
<p>
Unified API access to DeepSeek, Qwen, Kimi, GLM, Seedance, WanX, MiniMax, Hailuo, and other leading AI models for developers and teams.
</p>`}
                  </pre>
                  
                  <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100 mt-4">
                    <p className="text-sm font-medium text-zinc-700 mb-2">上线后检查：</p>
                    <p className="text-sm text-zinc-600 font-mono mb-2">view-source:https://powertokens.ai</p>
                    <p className="text-sm text-zinc-600">源码里要能搜到：<br/>PowerTokens, Unified AI API Platform, DeepSeek, Qwen, Seedance, Kimi, GLM, MiniMax, Hailuo</p>
                  </div>
                </div>

                <div className="border-t border-zinc-100 my-6"></div>

                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-zinc-800">4. 首页 Title / Description / Canonical</h4>
                  <p className="text-zinc-600 text-sm">在 <code>app/page.tsx</code> 添加：</p>
                  <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-xs overflow-x-auto">
{`import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'PowerTokens | Unified AI API for DeepSeek, Qwen, Seedance GLM and More',
  description:
    'PowerTokens provides unified API access to leading Chinese AI models, including DeepSeek, Qwen, Kimi, GLM, Seedance, WanX, MiniMax, Hailuo, and more, for developers and teams.',
  alternates: {
    canonical: 'https://powertokens.ai/',
  },
}`}
                  </pre>
                  <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-100 text-sm text-zinc-600">
                    <strong>说明：</strong>不需要 meta keywords。关键词自然放进 title、description、H1/H2 和正文。
                  </div>
                </div>

                <div className="border-t border-zinc-100 my-6"></div>

                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-zinc-800">5. 首页只保留一个 H1</h4>
                  <p className="text-zinc-600 text-sm">首页只保留：<code>&lt;h1&gt;PowerTokens&lt;/h1&gt;</code></p>
                  <p className="text-zinc-600 text-sm">其他标题用：<code>&lt;h2&gt;</code>, <code>&lt;h3&gt;</code></p>
                  <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-100 text-sm text-zinc-600 mt-2">
                    <strong>验收：</strong><br/>
                    <code>document.querySelectorAll('h1').length</code> 结果应为：1
                  </div>
                </div>

                <div className="border-t border-zinc-100 my-6"></div>

                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-zinc-800">6. 登录后页面加 noindex</h4>
                  <p className="text-zinc-600 text-sm">这些页面不要被 Google 收录：<br/>
                    <code>/dashboard</code>, <code>/api-key</code>, <code>/api-keys</code>, <code>/billing</code>, <code>/settings</code>
                  </p>
                  <p className="text-zinc-600 text-sm mt-2">对应页面加：</p>
                  <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-xs overflow-x-auto">
{`import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}`}
                  </pre>
                </div>

                <div className="border-t border-zinc-100 my-6"></div>

                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-zinc-800">7. 新增 404 页面</h4>
                  <p className="text-zinc-600 text-sm">新增：<code>app/not-found.tsx</code></p>
                  <p className="text-zinc-600 text-sm">代码：</p>
                  <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-xs overflow-x-auto">
{`import Link from 'next/link'

export default function NotFound() {
  return (
    <main>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/">Back to Home</Link>
    </main>
  )
}`}
                  </pre>
                </div>
              </section>

              <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-xl text-indigo-900 mt-10">
                <p className="text-sm font-medium">本次只做基础 SEO：保留 Cloudflare robots，不禁止 Googlebot；新增 sitemap；首页源码可读；配置 title、description、canonical；首页只有一个 H1；登录后页面 noindex；新增 404 页面。</p>
              </div>
            </div>
          )}

          {activeTab === "gtm" && (
            <div className="max-w-4xl space-y-10">
              <section>
                <h2 className="text-2xl font-bold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">[2026629需求] PowerTokens 前端 GTM / GA4 转化事件接入需求</h2>
                
                <div className="space-y-8 mt-6">
                  {/* 一、目标 */}
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">一</div>
                      目标
                    </h3>
                    <p className="text-sm text-zinc-600 mb-2">PowerTokens 官网需要通过 Google Tag Manager 追踪关键转化行为。前端需要完成：</p>
                    <ol className="list-decimal pl-5 space-y-1 text-sm text-zinc-600">
                      <li>全站接入 GTM 全局代码；</li>
                      <li>移除原有直接接入的 GA4 gtag.js，避免重复统计；</li>
                      <li>注册成功后上报 <code>sign_up</code>；</li>
                      <li>点击付费按钮 / 开始支付流程时上报 <code>begin_checkout</code>；</li>
                      <li>支付成功后上报 <code>purchase</code>；</li>
                      <li><code>purchase</code> 事件需要做防重复处理。</li>
                    </ol>
                  </div>

                  {/* 二、ID 信息 */}
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">二</div>
                      ID 信息
                    </h3>
                    <div className="bg-zinc-50 rounded-xl border border-zinc-100 p-4">
                      <p className="text-sm text-zinc-800 font-medium">前端只需要安装 GTM ID: <code className="text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded">GTM-WV236VFP</code></p>
                      <p className="text-sm text-zinc-600 mt-2">说明：前端代码中只安装 GTM-WV236VFP。GA4 Measurement ID 由 GTM 后台配置，不需要前端直接安装 GA4 gtag.js。</p>
                    </div>
                  </div>

                  {/* 三、前端需要移除原 GA4 直连代码 */}
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">三</div>
                      前端需要移除原 GA4 直连代码
                    </h3>
                    <div className="space-y-3">
                      <p className="text-sm text-zinc-600">如果当前网站已经直接接入了 GA4，例如类似：</p>
                      <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-xs overflow-x-auto">
{`<script async src="https://www.googletagmanager.com/gtag/js?id=G-4F7244PPZQ"></script>
<script>
  window.dataLayer = window.dataLayer || []
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date())
  gtag('config', 'G-4F7244PPZQ')
</script>`}
                      </pre>
                      <p className="text-sm text-zinc-600">本次接入 GTM 后，需要移除上述 GA4 直连代码。最终前端只保留：<code>GTM-WV236VFP</code></p>
                      <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-100 text-sm text-zinc-600">
                        <strong>原因：</strong>如果同时保留 GA4 gtag.js 和 GTM 内的 GA4 配置，可能导致 page_view 或事件重复统计。
                      </div>
                    </div>
                  </div>

                  {/* 四、GTM 全局代码接入 */}
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">四</div>
                      GTM 全局代码接入
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-base font-medium text-zinc-800 mb-2">1. 第一段代码：将此代码粘贴到网页的 &lt;head&gt; 中尽可能靠上的位置：</h4>
                        <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-xs overflow-x-auto">
{`<!-- Google Tag Manager -->
<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-WV236VFP');
</script>
<!-- End Google Tag Manager -->`}
                        </pre>
                      </div>
                      <div>
                        <h4 className="text-base font-medium text-zinc-800 mb-2">2. 第二段代码：请将此代码粘帖到紧跟起始 &lt;body&gt; 标记之后的位置：</h4>
                        <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-xs overflow-x-auto">
{`<!-- Google Tag Manager (noscript) -->
<noscript>
  <iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-WV236VFP"
    height="0"
    width="0"
    style="display:none;visibility:hidden"
  ></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->`}
                        </pre>
                      </div>
                      <div>
                        <h4 className="text-base font-medium text-zinc-800 mb-2">3. Next.js App Router 手动接入示例</h4>
                        <p className="text-sm text-zinc-600 mb-2">如果使用手动方式，可以在 <code>app/layout.tsx</code> 中这样写：</p>
                        <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-xs overflow-x-auto">
{`import Script from 'next/script'

const GTM_ID = 'GTM-WV236VFP'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {\`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','\${GTM_ID}');
          \`}
        </Script>
      </head>

      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={\`https://www.googletagmanager.com/ns.html?id=\${GTM_ID}\`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}
      </body>
    </html>
  )
}`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* 五、前端事件封装 */}
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">五</div>
                      前端事件封装
                    </h3>
                    <p className="text-sm text-zinc-600 mb-2">建议新增文件：<code>lib/gtm.ts</code><br/>完整代码如下：</p>
                    <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-xs overflow-x-auto">
{`declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

function pushToDataLayer(eventData: Record<string, unknown>) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(eventData)
}

/**
 * 注册成功事件
 *
 * 触发时机：
 * 用户真正注册成功后触发。
 * 不要在点击注册按钮时触发。
 */
export function trackSignUp(method: 'email' | 'google' | 'github' = 'email') {
  pushToDataLayer({
    event: 'sign_up',
    method,
  })
}

/**
 * 点击付费按钮 / 开始支付流程事件
 *
 * 触发时机：
 * 用户点击 Pay / Buy / Recharge / Subscribe 按钮，
 * 并开始进入支付流程时触发。
 *
 * 注意：
 * begin_checkout 只代表用户有付费意向，
 * 不代表支付成功。
 */
export function trackBeginCheckout(params: {
  itemId: string
  itemName: string
  value: number
  currency?: string
}) {
  pushToDataLayer({
    event: 'begin_checkout',
    ecommerce: {
      currency: params.currency || 'USD',
      value: params.value,
      items: [
        {
          item_id: params.itemId,
          item_name: params.itemName,
          price: params.value,
          quantity: 1,
        },
      ],
    },
  })
}

/**
 * 支付成功事件
 *
 * 触发时机：
 * 必须在真实支付成功后触发。
 *
 * 正确触发条件：
 * - 支付平台确认成功；
 * - 后端订单状态为 paid；
 * - 充值到账成功；
 * - 订阅创建成功。
 *
 * 不要在点击支付按钮、创建订单、跳转支付页时触发。
 */
export function trackPurchase(params: {
  transactionId: string
  itemId: string
  itemName: string
  value: number
  currency?: string
}) {
  pushToDataLayer({
    event: 'purchase',
    ecommerce: {
      transaction_id: params.transactionId,
      currency: params.currency || 'USD',
      value: params.value,
      items: [
        {
          item_id: params.itemId,
          item_name: params.itemName,
          price: params.value,
          quantity: 1,
        },
      ],
    },
  })
}`}
                    </pre>
                  </div>

                  {/* 六、事件触发位置 */}
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">六</div>
                      事件触发位置
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                        <h4 className="text-base font-medium text-zinc-800 mb-2">1. 注册成功：<code>sign_up</code></h4>
                        <div className="text-sm text-zinc-600 mb-2">
                          <strong>触发时机</strong><br/>
                          用户提交注册 ↓ 后端返回注册成功 ↓ 前端调用 trackSignUp()
                        </div>
                        <div className="text-sm text-zinc-600 mt-4">
                          <strong>示例</strong><br/>
                          邮箱注册成功：<code>trackSignUp('email')</code><br/>
                          Google 注册成功：<code>trackSignUp('google')</code><br/>
                          GitHub 注册成功：<code>trackSignUp('github')</code>
                        </div>
                      </div>

                      <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                        <h4 className="text-base font-medium text-zinc-800 mb-2">2. 点击付费按钮 / 开始支付流程：<code>begin_checkout</code></h4>
                        <div className="text-sm text-zinc-600 mb-2">
                          <strong>触发时机</strong><br/>
                          用户点击付费、充值、购买套餐、订阅按钮，并开始进入支付流程时触发。<br/>
                          例如：用户点击 Recharge / Subscribe / Pay 按钮 ↓ 准备创建订单或跳转支付页 ↓ 前端调用 trackBeginCheckout()
                        </div>
                        <div className="text-sm text-zinc-600 space-y-4 mt-4">
                          <div>
                            <strong>示例：点击充值 $20</strong>
                            <pre className="bg-zinc-900 text-zinc-100 p-3 rounded-lg text-xs mt-2">
{`trackBeginCheckout({
  itemId: 'credits_20',
  itemName: '20 USD Credits',
  value: 20,
})`}
                            </pre>
                          </div>
                          <div>
                            <strong>示例：点击 Pro 月付套餐</strong>
                            <pre className="bg-zinc-900 text-zinc-100 p-3 rounded-lg text-xs mt-2">
{`trackBeginCheckout({
  itemId: 'pro_monthly',
  itemName: 'Pro Monthly Plan',
  value: 49,
})`}
                            </pre>
                          </div>
                        </div>
                      </div>

                      <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                        <h4 className="text-base font-medium text-zinc-800 mb-2">3. 支付成功：<code>purchase</code></h4>
                        <div className="text-sm text-zinc-600 mb-2">
                          <strong>触发时机</strong><br/>
                          必须在真实支付成功后触发。<br/>
                          例如：支付平台确认成功 ↓ 后端订单状态变为 paid ↓ 前端进入支付成功页 / 充值成功页 ↓ 前端调用 trackPurchase()
                        </div>
                        <div className="text-sm text-zinc-600 space-y-4 mt-4">
                          <div>
                            <strong>示例：充值成功</strong>
                            <pre className="bg-zinc-900 text-zinc-100 p-3 rounded-lg text-xs mt-2">
{`trackPurchase({
  transactionId: order.id,
  itemId: 'credits_20',
  itemName: '20 USD Credits',
  value: 20,
})`}
                            </pre>
                          </div>
                          <div>
                            <strong>示例：订阅成功</strong>
                            <pre className="bg-zinc-900 text-zinc-100 p-3 rounded-lg text-xs mt-2">
{`trackPurchase({
  transactionId: subscription.id,
  itemId: 'pro_monthly',
  itemName: 'Pro Monthly Plan',
  value: 49,
})`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 七、purchase 防重复要求 */}
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">七</div>
                      purchase 防重复要求
                    </h3>
                    <div className="space-y-4 text-sm text-zinc-600">
                      <p>支付成功页可能被用户刷新，导致 purchase 重复上报。前端需要保证：<strong>同一个 transaction_id 只允许上报一次 purchase。</strong>可以使用 localStorage 做基础防重复。</p>
                      <p><strong>示例：</strong></p>
                      <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-xs overflow-x-auto">
{`const key = \\\`ga_purchase_tracked_\${order.id}\\\`

if (!localStorage.getItem(key)) {
  trackPurchase({
    transactionId: order.id,
    itemId: order.planId,
    itemName: order.planName,
    value: order.amount,
  })

  localStorage.setItem(key, '1')
}`}
                      </pre>
                      <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                        <strong>注意：</strong>localStorage 只用于防止前端重复上报。是否支付成功，必须以后端订单 paid 状态为准。
                      </div>
                    </div>
                  </div>

                  {/* 八、dataLayer 数据结构要求 */}
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">八</div>
                      dataLayer 数据结构要求
                    </h3>
                    
                    <div className="space-y-6 text-sm text-zinc-600">
                      <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                        <h4 className="font-medium text-zinc-800 mb-2">1. 注册成功</h4>
                        <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-xs">
{`window.dataLayer.push({
  event: 'sign_up',
  method: 'email',
})`}
                        </pre>
                      </div>
                      
                      <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                        <h4 className="font-medium text-zinc-800 mb-2">2. 点击付费按钮 / 开始支付流程</h4>
                        <p className="mb-2">电商事件必须使用 ecommerce 嵌套结构：</p>
                        <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-xs">
{`window.dataLayer.push({
  event: 'begin_checkout',
  ecommerce: {
    currency: 'USD',
    value: 20,
    items: [
      {
        item_id: 'credits_20',
        item_name: '20 USD Credits',
        price: 20,
        quantity: 1,
      },
    ],
  },
})`}
                        </pre>
                      </div>

                      <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                        <h4 className="font-medium text-zinc-800 mb-2">3. 支付成功</h4>
                        <p className="mb-2">电商事件必须使用 ecommerce 嵌套结构：</p>
                        <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-xs">
{`window.dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'order_123456',
    currency: 'USD',
    value: 20,
    items: [
      {
        item_id: 'credits_20',
        item_name: '20 USD Credits',
        price: 20,
        quantity: 1,
      },
    ],
  },
})`}
                        </pre>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-indigo-900">
                        <strong>说明：</strong>begin_checkout 和 purchase 不要使用扁平结构。需要把 currency、value、transaction_id、items 放在 ecommerce 对象中。
                      </div>
                    </div>
                  </div>

                  {/* 九、事件名必须固定 */}
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">九</div>
                      事件名必须固定
                    </h3>
                    <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100 text-sm text-zinc-600">
                      <p className="mb-4">前端必须严格使用以下事件名：</p>
                      <div className="flex gap-4 mb-6">
                        <span className="px-3 py-1 bg-white border border-zinc-200 rounded-md font-mono text-indigo-600 shadow-sm">sign_up</span>
                        <span className="px-3 py-1 bg-white border border-zinc-200 rounded-md font-mono text-indigo-600 shadow-sm">begin_checkout</span>
                        <span className="px-3 py-1 bg-white border border-zinc-200 rounded-md font-mono text-indigo-600 shadow-sm">purchase</span>
                      </div>
                      <p className="text-red-600 font-medium mb-2">不要改成：</p>
                      <ul className="list-disc pl-5 text-zinc-500 line-through space-y-1 font-mono">
                        <li>signup</li>
                        <li>register</li>
                        <li>checkout</li>
                        <li>payment_click</li>
                        <li>pay_success</li>
                        <li>payment_success</li>
                      </ul>
                      <p className="mt-4 text-zinc-800 font-medium">否则 GTM 中的触发器无法匹配。</p>
                    </div>
                  </div>

                  {/* 十、前端验收方式 */}
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">十</div>
                      前端验收方式
                    </h3>
                    <div className="text-sm text-zinc-600 space-y-4 bg-zinc-50 p-6 rounded-xl border border-zinc-100">
                      <p>前端接入后，在 GTM Preview 中连接：<code>https://powertokens.ai</code></p>
                      <p className="font-medium text-zinc-800">分别测试：</p>
                      <ul className="list-disc pl-5">
                        <li>注册成功</li>
                        <li>点击付费按钮</li>
                        <li>支付成功</li>
                      </ul>
                      <p className="font-medium text-zinc-800 pt-2">预期结果：</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Tag Assistant 中可以看到 <code>sign_up</code> / <code>begin_checkout</code> / <code>purchase</code> 事件。</li>
                        <li>对应 GA4 Tag 显示 <strong>fired</strong>。</li>
                        <li>GA4 DebugView 中可以看到 <code>sign_up</code> / <code>begin_checkout</code> / <code>purchase</code>。</li>
                      </ul>
                    </div>
                  </div>

                  {/* 十一、前端最终验收清单 */}
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">十一</div>
                      前端最终验收清单
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm text-zinc-600 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                      <div className="flex items-start gap-3"><div className="mt-1 w-4 h-4 rounded border border-zinc-300 bg-zinc-50 shrink-0"></div>网站前端只安装 GTM-WV236VFP</div>
                      <div className="flex items-start gap-3"><div className="mt-1 w-4 h-4 rounded border border-zinc-300 bg-zinc-50 shrink-0"></div>网站前端已移除原 GA4 gtag.js 直连代码</div>
                      <div className="flex items-start gap-3"><div className="mt-1 w-4 h-4 rounded border border-zinc-300 bg-zinc-50 shrink-0"></div>GTM 全局代码已在所有页面生效</div>
                      <div className="flex items-start gap-3"><div className="mt-1 w-4 h-4 rounded border border-zinc-300 bg-zinc-50 shrink-0"></div>注册成功后触发 sign_up</div>
                      <div className="flex items-start gap-3"><div className="mt-1 w-4 h-4 rounded border border-zinc-300 bg-zinc-50 shrink-0"></div>点击付费按钮 / 开始支付流程时触发 begin_checkout</div>
                      <div className="flex items-start gap-3"><div className="mt-1 w-4 h-4 rounded border border-zinc-300 bg-zinc-50 shrink-0"></div>支付成功后触发 purchase</div>
                      <div className="flex items-start gap-3"><div className="mt-1 w-4 h-4 rounded border border-zinc-300 bg-zinc-50 shrink-0"></div>begin_checkout 使用 ecommerce 嵌套结构</div>
                      <div className="flex items-start gap-3"><div className="mt-1 w-4 h-4 rounded border border-zinc-300 bg-zinc-50 shrink-0"></div>purchase 使用 ecommerce 嵌套结构</div>
                      <div className="flex items-start gap-3"><div className="mt-1 w-4 h-4 rounded border border-zinc-300 bg-zinc-50 shrink-0"></div>purchase 包含 transaction_id</div>
                      <div className="flex items-start gap-3"><div className="mt-1 w-4 h-4 rounded border border-zinc-300 bg-zinc-50 shrink-0"></div>purchase 包含 value</div>
                      <div className="flex items-start gap-3"><div className="mt-1 w-4 h-4 rounded border border-zinc-300 bg-zinc-50 shrink-0"></div>purchase 包含 currency</div>
                      <div className="flex items-start gap-3"><div className="mt-1 w-4 h-4 rounded border border-zinc-300 bg-zinc-50 shrink-0"></div>purchase 包含 items</div>
                      <div className="flex items-start gap-3"><div className="mt-1 w-4 h-4 rounded border border-zinc-300 bg-zinc-50 shrink-0"></div>purchase 不因刷新页面重复触发</div>
                      <div className="flex items-start gap-3"><div className="mt-1 w-4 h-4 rounded border border-zinc-300 bg-zinc-50 shrink-0"></div>事件名严格为 sign_up / begin_checkout / purchase</div>
                      <div className="flex items-start gap-3"><div className="mt-1 w-4 h-4 rounded border border-zinc-300 bg-zinc-50 shrink-0"></div>GTM Preview 中可以看到 3 个事件</div>
                      <div className="flex items-start gap-3"><div className="mt-1 w-4 h-4 rounded border border-zinc-300 bg-zinc-50 shrink-0"></div>GA4 DebugView 中可以看到 3 个事件</div>
                    </div>
                  </div>

                  {/* 十二、GTM / GA4 后台前置条件 */}
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">十二</div>
                      GTM / GA4 后台前置条件
                    </h3>
                    <div className="text-sm text-zinc-600 space-y-4">
                      <p>以下内容由运营或数据负责人在 GTM / GA4 后台配置，前端只需知道事件名保持一致：</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-100">
                          <p className="font-medium text-zinc-800 mb-2">GTM 中配置 Google Tag - GA4 All Pages</p>
                          <p className="text-zinc-500">Tag ID: <code className="text-zinc-800">G-4F7244PPZQ</code></p>
                        </div>

                        <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-100">
                          <p className="font-medium text-zinc-800 mb-2">GTM 中配置 3 个 GA4 Event Tag：</p>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>GA4 - sign_up</li>
                            <li>GA4 - begin_checkout</li>
                            <li>GA4 - purchase</li>
                          </ol>
                        </div>

                        <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-100">
                          <p className="font-medium text-zinc-800 mb-2">GTM 中配置 3 个 Custom Event Trigger：</p>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>CE-sign_up</li>
                            <li>CE-begin_checkout</li>
                            <li>CE-purchase</li>
                          </ol>
                        </div>

                        <div className="bg-zinc-50 p-5 rounded-xl border border-zinc-100">
                          <p className="font-medium text-zinc-800 mb-2">GA4 中将以下事件标记为 Key event：</p>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>sign_up</li>
                            <li>begin_checkout</li>
                            <li>purchase</li>
                          </ol>
                        </div>
                      </div>
                      
                      <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-xl text-indigo-900 mt-6 shadow-sm">
                        <p className="font-semibold mb-1 text-lg">这一版重点：</p>
                        <p>装 GTM、删 GA4 直连、加 lib/gtm.ts、在正确业务节点调用 3 个事件、purchase 防重复。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "phase2026710" && (
            <div className="max-w-4xl space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">2026710需求范围</h2>
                <p className="text-zinc-600 mb-6 mt-4">主要增加 供应商（Providers）统计分析页面 及关联全局导航更新。</p>
              </div>

              {/* Section 1: 供应商 Providers 页面 */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">1</div>
                  供应商（Providers）页面
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">1.1 页面与核心功能</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能模块</th><th className="px-4 py-2 font-medium w-1/4">数据范围</th><th className="px-4 py-2 font-medium">详情描述</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">全局入口</td><td className="px-4 py-3 text-zinc-600">全部页面可见</td><td className="px-4 py-3 text-zinc-600">在左侧全局导航中增加 Providers 入口，路由路径：/providers。</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">数据统计</td><td className="px-4 py-3 text-zinc-600">按提供商分组</td><td className="px-4 py-3 text-zinc-600">动态统计每个提供商拥有的模型分类及对应的模型数量。</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">有效模型过滤</td><td className="px-4 py-3 text-zinc-600">仅 Active 状态</td><td className="px-4 py-3 text-zinc-600">仅统计并展示状态为 Active / Visible 的模型，Hidden 模型排除在外。</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">模型性能概览</td><td className="px-4 py-3 text-zinc-600">昨日全平台数据</td><td className="px-4 py-3 text-zinc-600">
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>总请求次数 (Requests)：</strong>前一天全平台范围内的汇总请求次数（包含同步请求与异步任务请求）。</li>
                          <li><strong>成功率 (Success Rate)：</strong>计算公式为 (成功处理的请求数 / 总请求数) * 100%。</li>
                          <li><strong>平均延迟 (Latency)：</strong>计算公式为总耗时除以成功请求数，范围仅包含成功的请求。若该供应商支持异步任务，则延时指标拆分为<strong>同步延时 (Sync)</strong>与<strong>异步延时 (Async)</strong>分别计算展示。</li>
                        </ul>
                      </td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">模型交互</td><td className="px-4 py-3 text-zinc-600">支持点击跳转</td><td className="px-4 py-3 text-zinc-600">点击列表中的具体模型即可跳转至对应的模型详情页面 (/models/:id)。</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">1.2 页面设计要点</div>
                  <div className="p-4 space-y-4 text-sm text-zinc-600">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>无搜索栏：</strong>由于目前接入的供应商较少，整体数据可读性强，去除了顶部搜索框以保持页面极简结构。</li>
                      <li><strong>模型平铺展示：</strong>展开单个供应商时，直接按类别或平铺呈现具体的可用模型卡片。</li>
                      <li><strong>悬停交互：</strong>模型卡片支持悬停及光标反馈 (Hover effect & cursor-pointer) 以表明其可跳转性。</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 2: 余额预警功能 */}
              <section className="space-y-4 mt-8">
                <h3 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">2</div>
                  Billing 余额预警 (Balance Alert)
                </h3>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">2.1 预警设置规则</div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-white border-b border-zinc-100 text-zinc-500">
                      <tr><th className="px-4 py-2 font-medium w-1/4">功能模块</th><th className="px-4 py-2 font-medium">详情描述</th></tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 bg-white">
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">总开关</td><td className="px-4 py-3 text-zinc-600">在 Billing 页面增加「余额预警」开关，控制是否启用低余额提醒。</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">阈值设置</td><td className="px-4 py-3 text-zinc-600">用户可输入触发提醒的 credits 额度（不可小于当前余额），当剩余 credits 小于该阈值时触发。</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">提醒频率</td><td className="px-4 py-3 text-zinc-600">支持通过下拉框选择：30分钟、60分钟、90分钟、120分钟、3小时、4小时、5小时 触发一次。</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">提醒次数</td><td className="px-4 py-3 text-zinc-600">支持通过下拉框选择连续发送：1次、2次、3次。</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">清零提醒</td><td className="px-4 py-3 text-zinc-600">提供单选框，勾选后当余额等于或小于 0 时额外发送预警邮件。</td></tr>
                      <tr><td className="px-4 py-3 text-zinc-800 font-medium">重置机制</td><td className="px-4 py-3 text-zinc-600">页面增加提示语："直到您完成一次充值后再次触发预警邮件,会再次按照您上面的设置发送余额预警邮件"。</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden mt-4">
                  <div className="px-4 py-3 bg-zinc-100/50 border-b border-zinc-100 font-semibold text-zinc-700 text-sm">2.2 邮件文案模版</div>
                  <div className="p-4 space-y-4 text-sm text-zinc-600">
                    <div>
                      <p className="font-medium text-zinc-800 mb-2">邮件 B：余额不足告警</p>
                      <div className="bg-white p-3 rounded-lg border border-zinc-200 text-zinc-700 space-y-2 font-mono text-xs whitespace-pre-wrap">
                        <p><strong>邮件主题 (Subject):</strong> Low Balance Alert - Please Top Up Your Account</p>
                        <div className="h-px bg-zinc-100 my-2"></div>
                        <p>Hi {"{{username}}"},</p>
                        <p>Your current account balance has fallen below the configured balance alert threshold.</p>
                        <p>Your API service usage is subject to your real-time account balance. To avoid service interruption, we recommend topping up your account or enabling automatic top-up as soon as possible.</p>
                        <p>Here are your current balance details:</p>
                        <ul className="list-disc pl-5">
                          <li>Current balance: ${"{{current_balance}}"}</li>
                          <li>Alert threshold: ${"{{alert_threshold}}"}</li>
                          <li>Alert time: {"{{alert_time}}"} UTC</li>
                        </ul>
                        <div className="bg-zinc-50 p-2 border border-zinc-200 rounded my-2 space-y-2">
                          <p className="text-zinc-500 font-sans font-medium text-xs">【第一次提醒时显示】</p>
                          <p>This is your first low balance reminder. If your balance remains below ${"{{next_alert_threshold}}"}, we will send you another reminder in approximately {"{{next_reminder_interval}}"} hours.</p>
                          <p className="text-zinc-500 font-sans font-medium text-xs mt-2">【第二次提醒时显示】</p>
                          <p>This is your second low balance reminder. If your balance remains below ${"{{next_alert_threshold}}"}, we will send you a final reminder in approximately {"{{next_reminder_interval}}"} hours.</p>
                          <p className="text-zinc-500 font-sans font-medium text-xs mt-2">【第三次提醒时显示】</p>
                          <p>This is your third and final low balance reminder. Your account may soon run out of available balance, which could interrupt your API services. Please top up your account as soon as possible.</p>
                        </div>
                        <p>You can complete manual top-up or configure automatic top-up via the link below:</p>
                        <p>👉 Billing & Recharge Center: {"{{billing_settings_url}}"}</p>
                        <p>If you have any questions, please contact us via {"{{support_email}}"}.</p>
                        <p>Thank you for building with Powertokens!</p>
                        <p>Best regards,<br/>The Powertokens Team</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-zinc-800 mb-2">邮件 C：余额为 0 提醒</p>
                      <div className="bg-white p-3 rounded-lg border border-zinc-200 text-zinc-700 space-y-2 font-mono text-xs whitespace-pre-wrap">
                        <p><strong>邮件主题 (Subject):</strong> Account Balance Reached $0 - API Services May Be Interrupted</p>
                        <div className="h-px bg-zinc-100 my-2"></div>
                        <p>Hi {"{{username}}"},</p>
                        <p>Your Powertokens account balance has reached $0.</p>
                        <p>Requests that require a positive available balance may now be rejected, and your API services may be interrupted until your account is topped up.</p>
                        <p>Here are your account balance details:</p>
                        <ul className="list-disc pl-5">
                          <li>Current balance: ${"{{current_balance}}"}</li>
                          <li>Balance reached $0 at: {"{{balance_zero_time}}"} UTC</li>
                          <li>Automatic top-up status: {"{{auto_top_up_status}}"}</li>
                        </ul>
                        <p>To restore normal API service usage, please complete a manual top-up or review your automatic top-up settings via the link below:</p>
                        <p>👉 Billing & Recharge Center: {"{{billing_settings_url}}"}</p>
                        <p>After your payment is successfully completed and your balance is updated, you can continue using Powertokens services normally.</p>
                        <p>If you have any questions, please contact us via {"{{support_email}}"}.</p>
                        <p>Thank you for building with Powertokens!</p>
                        <p>Best regards,<br/>The Powertokens Team</p>
                      </div>
                    </div>

                    <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 text-blue-700 text-xs">
                      <p><strong>注：</strong>建议三个余额阈值分别使用 <code>{"{{first_alert_threshold}}"}</code>、<code>{"{{second_alert_threshold}}"}</code> 和 <code>{"{{third_alert_threshold}}"}</code>，方便后台区分 X、Y、Z 三档触发条件。</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: 用户账号合并 (Account Merging) */}
              <section className="space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-semibold">3</div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-800">一邮一用户、多登录方式</h3>
                    <p className="text-sm text-zinc-500 mt-1">产品逻辑规格 v2.0</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* 1 & 2 */}
                  <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-800 text-sm">产品目标与核心原则</div>
                    <div className="p-4 space-y-4 text-sm text-zinc-600">
                      <div>
                        <p className="font-medium text-zinc-800 mb-2">1. 产品目标</p>
                        <ul className="list-disc pl-5 space-y-1 mb-2">
                          <li>PowerTokens 支持：Google 登录、GitHub 登录、邮箱验证码登录</li>
                        </ul>
                        <div className="bg-indigo-50/50 text-indigo-800 p-3 rounded-lg border border-indigo-100 mb-2 font-medium">
                          统一规则：同一个邮箱只对应一个 PowerTokens 用户，一个用户可以绑定多种登录方式。
                        </div>
                        <p>用户使用任意已绑定方式登录，进入的都是同一个用户。（注：本期只处理同一个人的多登录方式问题。多个用户共同使用企业账户的需求，在二期通过企业邀请和成员权限实现。）</p>
                      </div>
                      <div className="h-px bg-zinc-100 my-4"></div>
                      <div>
                        <p className="font-medium text-zinc-800 mb-2">2. 核心原则</p>
                        <ul className="list-decimal pl-5 space-y-1.5">
                          <li>用户通过任意方式登录成功后，均按本次验证成功的邮箱检查是否存在相同邮箱的用户。</li>
                          <li>如果没有相同邮箱，按照新用户流程处理，现有注册流程不变。</li>
                          <li>如果相同邮箱只有一个用户，登录或绑定到该用户，不创建重复用户。如果已经存在的绑定是同一个邮箱的账户，就是统一的 User ID。</li>
                          <li>目前 Settings 页面里的绑定操作只允许绑定相同的邮箱，原来的 Linked Accounts 概念修改成 Linked 登录方式。</li>
                          <li>如果相同邮箱存在多个历史用户，必须验证其他登录方式并完成统一。</li>
                          <li>强制统一不可跳过，完成前不能进入产品主界面。</li>
                          <li>未完成对应登录方式验证前，不展示该历史用户的具体数据。</li>
                          <li>统一后，充值记录、调用日志、API Key、素材库等数据全部合并展示。</li>
                          <li>原有 API Key 继续有效，不影响正在运行的 API 服务。</li>
                          <li>本期不调整当前数据库结构。</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 3 & 4 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                      <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-800 text-sm">3. 场景一：库中没有相同邮箱</div>
                      <div className="p-4 space-y-3 text-sm text-zinc-600">
                        <p>用户通过任意方式（Google、GitHub、邮箱验证码）完成登录验证，登录成功后，如果库中不存在相同邮箱：</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>按照新用户处理</li>
                          <li>创建新用户</li>
                          <li>本次登录方式作为该用户的登录方式</li>
                          <li>原有新用户注册和登录流程保持不变</li>
                          <li>直接进入产品</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                      <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-800 text-sm">4. 场景二：检测到一种其他登录方式</div>
                      <div className="p-4 space-y-3 text-sm text-zinc-600">
                        <p>用户通过某种方式登录成功后，如果检测到相同邮箱还存在另一种登录方式对应的历史用户：</p>
                        <ul className="list-decimal pl-5 space-y-1">
                          <li>用户跳转到 Settings 页面</li>
                          <li>自动弹出强制绑定弹窗</li>
                          <li>弹窗不可关闭，不能跳过</li>
                          <li>用户必须完成对应登录方式的验证</li>
                          <li>验证成功后，将该登录方式绑定到当前用户</li>
                          <li>对应历史数据统一到当前用户</li>
                          <li>完成后进入产品</li>
                        </ul>
                        <div className="mt-3 p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                          <p className="font-medium text-zinc-800 mb-1">弹窗文案：</p>
                          <p><strong>标题：</strong>检测到相同邮箱的其他登录方式</p>
                          <p><strong>正文：</strong>我们检测到邮箱 <code>XXXX@X.com</code> 曾通过 GitHub 登录 PowerTokens。请验证并绑定该 GitHub 登录方式。完成后，相关充值记录、调用日志、API Key 和素材库将统一到当前用户。下次您可以使用不同的登录方式进入同一个 PowerTokens 用户。</p>
                          <p><strong>按钮：</strong>验证并绑定 GitHub</p>
                          <p className="text-xs text-zinc-500 mt-1">（"GitHub" 根据实际情况替换为 Google 或邮箱验证码）</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5 */}
                  <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-800 text-sm">5. 场景三：检测到两种其他登录方式</div>
                    <div className="p-4 space-y-3 text-sm text-zinc-600">
                      <p>用户通过某种方式登录成功后，如果检测到相同邮箱还存在另外两种登录方式：</p>
                      <ul className="list-decimal pl-5 space-y-1">
                        <li>跳转到 Settings 页面并打开强制绑定弹窗</li>
                        <li>弹窗一次性说明检测到的两种登录方式</li>
                        <li>用户依次完成两种方式的验证</li>
                        <li>全部完成前不能关闭、跳过或进入产品</li>
                        <li>全部验证成功后，将相关登录方式绑定到当前用户</li>
                        <li>相关历史数据统一到当前用户，用户进入产品</li>
                      </ul>
                      <div className="mt-3 p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                        <p className="font-medium text-zinc-800 mb-2">弹窗文案：</p>
                        <p><strong>标题：</strong>检测到相同邮箱的其他登录方式</p>
                        <p><strong>正文：</strong>我们检测到邮箱 <code>XXXX@X.com</code> 曾通过以下方式登录 PowerTokens：<br/>1. Google 登录<br/>2. GitHub 登录<br/><br/>请依次完成验证并绑定以上登录方式。完成后，相关充值记录、调用日志、API Key 和素材库将全部统一到当前用户。<br/>下次您可以使用任意已绑定方式进入同一个 PowerTokens 用户。</p>
                        <div className="my-3 p-3 bg-white border border-zinc-200 rounded font-mono text-xs">
                          <p>邮箱验证码　已验证</p>
                          <p>Google　　　待验证</p>
                          <p>GitHub　　　待验证</p>
                        </div>
                        <p><strong>按钮：</strong>开始验证并绑定</p>
                      </div>
                    </div>
                  </div>

                  {/* 6 & 7 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                      <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-800 text-sm">6. 验证与中断规则</div>
                      <div className="p-4 text-sm text-zinc-600">
                        <ul className="list-disc pl-5 space-y-1.5">
                          <li>本次登录成功的方式视为已验证，不需要重复验证。</li>
                          <li>其他登录方式必须分别验证，不能相互替代。</li>
                          <li>验证前只展示邮箱和登录方式，不展示余额、充值记录、日志、API Key 或素材库。</li>
                          <li>用户中途退出后，下次登录继续进入强制绑定流程。</li>
                          <li>已完成的步骤不需要重复处理。</li>
                          <li>验证失败时允许重试，但不能进入产品主界面。</li>
                          <li>无法完成验证时，提供联系客服入口。</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                      <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-800 text-sm">7. 统一后的结果</div>
                      <div className="p-4 text-sm text-zinc-600">
                        <p className="mb-2 font-medium">完成后：</p>
                        <ul className="list-disc pl-5 space-y-1.5">
                          <li>同一个邮箱只对应一个用户；</li>
                          <li>Google、GitHub、邮箱验证码成为该用户的不同登录方式；</li>
                          <li>任意已绑定方式均进入同一个用户；</li>
                          <li>充值记录统一；调用日志统一；素材库统一；</li>
                          <li>API Key 统一且原有 Key 继续有效；</li>
                          <li>后续产生的数据均归入该用户。</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 8 & 9 */}
                  <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-800 text-sm">8. 废弃跨邮箱绑定 & 9. 最终规则</div>
                    <div className="p-4 space-y-4 text-sm text-zinc-600">
                      <div>
                        <p className="font-medium text-zinc-800 mb-1">8. 废弃跨邮箱绑定</p>
                        <p>停止新增不同邮箱之间的登录方式绑定。例如“A 邮箱的 Google 登录”绑定“B 邮箱的 GitHub 登录”不再允许。</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          <li>下线相关产品入口；</li>
                          <li>不允许新增跨邮箱绑定；</li>
                          <li>已存在的跨邮箱绑定暂时保留，不主动拆分；</li>
                          <li>历史关系不参与本期同邮箱统一流程；</li>
                          <li>二期通过企业邀请和成员权限机制处理多人协作。</li>
                        </ul>
                      </div>
                      <div className="h-px bg-zinc-100"></div>
                      <div>
                        <p className="font-medium text-zinc-800 mb-2">9. 最终规则</p>
                        <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200 text-zinc-700">
                          用户通过任意方式登录后，系统按本次验证成功的邮箱查找用户。没有相同邮箱时，按照现有新用户流程处理；存在同邮箱其他登录方式时，用户必须完成验证和绑定。完成后，同一个邮箱只对应一个用户，不同登录方式均进入该用户，充值记录、调用日志、API Key 和素材库统一展示。
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "phase2026724" && (
            <div className="max-w-4xl space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-2 border-b border-zinc-100 pb-4">2026724需求</h2>
                <p className="text-zinc-600 mb-6 mt-4">企业空间与多角色协作 (Enterprise Workspace & RBAC)</p>
              </div>

              {/* Section 1: 企业空间与多角色协作 (Enterprise Workspace & RBAC) */}
              <section className="space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-semibold">1</div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-800">企业空间与多角色协作 (Enterprise Workspace & RBAC)</h3>
                    <p className="text-sm text-zinc-500 mt-1">支持多用户共享资产、资金池与分权管理</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-800 text-sm">1. 核心架构重构（User ID 与 Account ID 拆分）</div>
                    <div className="p-4 space-y-4 text-sm text-zinc-600">
                      <p>这是本次需求的基础架构变动。技术团队需在底层将 User 与 Account 进行概念和实体拆分，关系为 <strong>多对多（N:N）</strong>。</p>
                      
                      <div>
                        <p className="font-medium text-zinc-800 mb-1">User ID（用户主体/自然人）</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>定义：</strong>代表操作系统的具体的人。</li>
                          <li><strong>职责：</strong>仅负责身份认证（登录校验、邮箱验证码、密码验证）与个人通用偏好（如界面语言、深浅色主题）。</li>
                          <li><strong>绑定关系：</strong>包含其关联的多个登录方式（如：A 邮箱、B 邮箱对应的 Google/GitHub 等，遵循已有的同邮箱合并逻辑）。</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="font-medium text-zinc-800 mb-1">Account ID（工作空间/企业账户）</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>定义：</strong>代表资产、业务和计费的实体。</li>
                          <li><strong>职责：</strong>所有业务数据均挂载于 Account ID 之下。</li>
                          <li><strong>包含资产：</strong>API Key 管理、充值记录、扣费与调用日志、Playground 生成记录、素材资产库等。</li>
                          <li><strong>自动生成逻辑：</strong>对于历史存量用户和新注册用户，系统默认自动生成一个与该 User ID 绑定的专属 Account ID（即个人默认空间）。无论是新注册还是新被邀请进企业的用户都会有个人空间，只有一种情况没有个人空间，就是个人的空间被升级成了企业空间。若该用户的空间被升级为企业空间后，其被移出了该企业空间（不再拥有任何角色），则在其下次登录时，系统将为其重新生成一个全新的个人空间。</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-800 text-sm">2. 个人空间升维企业空间及协议逻辑</div>
                    <div className="p-4 space-y-4 text-sm text-zinc-600">
                      <div>
                        <p className="font-medium text-zinc-800 mb-1">原地升维机制</p>
                        <p>在现有的运营后台（管理端）中，针对 Account ID 维度增加一个「开启企业协作」的开关。目前暂由运营人员手动开启。</p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          <li><strong>默认状态（关闭）：</strong>该 Account ID 表现为个人版，客户端侧边栏隐藏协作管理相关入口。</li>
                          <li><strong>原地升维：</strong>企业空间的开启为“原地升维”。即当前个人的 Account ID 直接升级为企业空间，而非分裂出新的空间。</li>
                          <li><strong>空间归属：</strong>升维后，该用户原本的个人空间不复存在，当前账号仅拥有该企业空间（作为初始管理员）。</li>
                          <li><strong>被邀请逻辑：</strong>如果该用户（作为普通个人用户）被邀请进入其他企业空间，则该用户将同时拥有自己的个人空间，以及受邀进入的企业空间，支持在侧边栏顶部切换。</li>
                        </ul>
                      </div>
                      
                      <div className="h-px bg-zinc-100 my-4"></div>
                      <div>
                        <p className="font-medium text-zinc-800 mb-1">企业空间名称与标识展示 (Workspace Display UI)</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>标识与名称：</strong>由于本期企业空间暂不支持自定义修改名称，企业空间的名称将默认继承其升级前的用户名。为了在视觉上区分个人空间与企业空间，会在企业空间的用户名右侧新增一个 <code>Team</code> 的标签。</li>
                          <li><strong>ID 显示位置调整：</strong>因原个人的 User ID 已原地升维为该企业空间的 Account ID，该 ID 不应再作为“个人用户”的 ID 在个人设置等处孤立显示，而是直接展示在企业空间名称的下方（即作为该企业空间的唯一标识）。</li>
                        </ul>
                      </div>
                      <div className="h-px bg-zinc-100 my-4"></div>
                      <div>
                        <p className="font-medium text-zinc-800 mb-1">资产库协议签署逻辑 (Asset Library Agreements)</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>管理权限：</strong>资产库（Asset Library）仅管理员（Administrator）有权限访问和使用。</li>
                          <li><strong>前置签署保留：</strong>如果管理员在个人空间升级为企业空间前，已经签署过资产库相关协议，升级成企业空间后原管理员依然保留权限，无需重签。</li>
                          <li><strong>新管理员强校验：</strong>如果企业空间管理员邀请了新成员并赋予了“管理员”权限，该新管理员在点击资产库 Tab 时，必须<strong>独立签署一遍资产库协议</strong>，签署后才能够点击进去正常使用。</li>
                        </ul>
                      </div>
                      <div className="h-px bg-zinc-100 my-4"></div>
                      <div>
                        <p className="font-medium text-zinc-800 mb-2">空间与资产归属最终形态总结：</p>
                        <div className="overflow-x-auto rounded-lg border border-zinc-200">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-zinc-50 border-b border-zinc-200 text-xs text-zinc-700">
                                <th className="px-3 py-2 border-r border-zinc-200 font-medium">用户身份</th>
                                <th className="px-3 py-2 border-r border-zinc-200 font-medium">拥有的工作空间 (Workspaces)</th>
                                <th className="px-3 py-2 border-r border-zinc-200 font-medium">空间内的资产/账单归属</th>
                                <th className="px-3 py-2 font-medium">资产库协议状态</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 text-xs">
                              <tr className="hover:bg-zinc-50">
                                <td className="px-3 py-2 border-r border-zinc-200 font-medium">创始人 (升级者)</td>
                                <td className="px-3 py-2 border-r border-zinc-200">默认仅有 1 个：自己的企业空间（注：若被移出该企业空间，下次登录时将为其重新生成个人空间）</td>
                                <td className="px-3 py-2 border-r border-zinc-200">属于该企业 Account ID</td>
                                <td className="px-3 py-2">继承其作为个人时的签署状态</td>
                              </tr>
                              <tr className="hover:bg-zinc-50">
                                <td className="px-3 py-2 border-r border-zinc-200 font-medium">被邀请的管理员</td>
                                <td className="px-3 py-2 border-r border-zinc-200">至少 2 个：自己的个人空间 + 别人的企业空间</td>
                                <td className="px-3 py-2 border-r border-zinc-200">根据当前切换的空间隔离</td>
                                <td className="px-3 py-2">在企业空间首次点击资产库时需独立签署</td>
                              </tr>
                              <tr className="hover:bg-zinc-50">
                                <td className="px-3 py-2 border-r border-zinc-200 font-medium">被邀请的技术/财务</td>
                                <td className="px-3 py-2 border-r border-zinc-200">至少 2 个：自己的个人空间 + 别人的企业空间</td>
                                <td className="px-3 py-2 border-r border-zinc-200">根据当前切换的空间隔离</td>
                                <td className="px-3 py-2">左侧菜单不可见资产库，无需签署</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-800 text-sm">3. 成员管理功能 (Team Members)</div>
                    <div className="p-4 space-y-4 text-sm text-zinc-600">
                      <p>当 Account ID 开启企业空间后，在左侧导航栏出现「成员管理」模块。</p>
                      <div>
                        <p className="font-medium text-zinc-800 mb-1">功能要求</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>邮箱邀请机制：</strong>管理员可通过邮箱发送邀请链接。被邀请的用户点击链接后可加入该工作空间。</li>
                          <li><strong>邀请状态管理：</strong>管理员可查看邀请的接受状态（例如“待接受”）。</li>
                          <li><strong>取消邀请：</strong>如果用户尚未接受邀请，管理员可以取消邀请。取消后，原先发送到邮箱内的邀请链接即刻失效；如果非被邀请人（邮箱不匹配）尝试通过转发的链接进入，也会报错/阻止进入。</li>
                          <li><strong>移除成员：</strong>如果将某技术成员从空间中移除，仅移除其身份，其此前创建的 API Key 不会自动删除，需由管理员自行决定是否停用。</li>
                          <li><strong>限制要求：</strong>每个企业空间必须至少保留一名管理员（Administrator），不可将最后一名管理员移除或降级。</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-800 text-sm">4. 多角色权限控制 (RBAC)</div>
                    <div className="p-4 space-y-4 text-sm text-zinc-600">
                      <p>企业空间支持配置以下三种主要角色，基于左侧侧边栏可见性进行权限划分（注：Dashboard, Providers, Models 等模块所有人都可见）：</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3">
                          <p className="font-medium text-zinc-800 mb-2">管理员 (Administrator)</p>
                          <p className="text-xs mb-2">最高权限，负责整体空间管控。</p>
                          <p className="text-xs font-semibold text-zinc-700">可见专属功能/Tab：</p>
                          <ul className="list-disc pl-4 text-xs space-y-1">
                            <li>全部可用</li>
                            <li>Team Members</li>
                            <li>Audit Logs</li>
                            <li>Settings</li>
                            <li>Billing, API Keys, Logs</li>
                            <li>Asset Library</li>
                            <li>Playground</li>
                          </ul>
                        </div>
                        
                        <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3">
                          <p className="font-medium text-zinc-800 mb-2">财务 (Finance)</p>
                          <p className="text-xs mb-2">负责充值、发票、余额预警等计费管理。</p>
                          <p className="text-xs font-semibold text-zinc-700">可见专属功能/Tab：</p>
                          <ul className="list-disc pl-4 text-xs space-y-1">
                            <li>Billing</li>
                          </ul>
                          <p className="text-xs font-semibold text-zinc-700 mt-2">不可见/不可用：</p>
                          <p className="text-xs text-zinc-500">API Keys, Logs, Team Members, Audit Logs, Settings, Asset Library, Playground</p>
                        </div>
                        
                        <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3">
                          <p className="font-medium text-zinc-800 mb-2">技术操作 (Developer)</p>
                          <p className="text-xs mb-2">负责对接 API、调试与查看调用日志。</p>
                          <p className="text-xs font-semibold text-zinc-700">可见专属功能/Tab：</p>
                          <ul className="list-disc pl-4 text-xs space-y-1">
                            <li>API Keys</li>
                            <li>Logs (调用日志)</li>
                            <li>Playground</li>
                          </ul>
                          <p className="text-xs font-semibold text-zinc-700 mt-2">不可见/不可用：</p>
                          <p className="text-xs text-zinc-500">Billing, Team Members, Audit Logs, Settings, Asset Library</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-zinc-100">
                        <p className="font-semibold text-zinc-800 mb-2">角色切换/空间切换的页面重定向逻辑：</p>
                        <ul className="list-disc pl-5 space-y-1 text-xs">
                          <li>如果用户在当前空间处于某个专属页面（例如财务处于 Billing），然后切换至另一个扮演不同角色的空间（如技术）。</li>
                          <li>系统会判断切换后的新角色是否有权限访问当前停留在的页面。</li>
                          <li>如果有权限，则停留在当前页面不变；如果没有权限，则根据新角色跳转至该角色的默认页面：
                            <ul className="list-circle pl-5 mt-1 space-y-1 text-zinc-500">
                              <li><strong>管理员/普通个人用户：</strong> 默认跳转至 Dashboard (首页)</li>
                              <li><strong>财务 (Finance)：</strong> 默认跳转至 Billing (账单页面)</li>
                              <li><strong>技术 (Developer)：</strong> 默认跳转至 API Keys (密钥管理页面)</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-800 text-sm">5. 操作日志 (Audit/Action Logs)</div>
                    <div className="p-4 space-y-4 text-sm text-zinc-600">
                      <p><strong>功能说明：</strong>当开启企业空间后，在侧边栏增加「操作日志」Tab，专用于账号行为审计（区别于 API 调用的 Logs）。</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>记录范围：</strong>空间内任何成员产生的核心变动动作都需要被记录并归档在 Account ID 下。</li>
                        <li><strong>日志字段：</strong>操作时间（UTC）、操作人（User ID/邮箱）、IP 地址、动作类型（如：创建 API Key、充值、邀请成员、修改成员角色等）、动作详情。</li>
                        <li><strong>权限约束：</strong>仅管理员（Owner/Admin）有权限查看此操作日志列表。</li>
                      </ul>
                      
                      <div className="mt-6">
                        <p className="font-semibold text-zinc-800 mb-2">已支持的日志动作列表：</p>
                        <div className="overflow-x-auto rounded-lg border border-zinc-200">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-zinc-50 border-b border-zinc-200">
                                <th className="px-4 py-2 font-medium text-zinc-900 border-r border-zinc-200">动作类型 (Action Type)</th>
                                <th className="px-4 py-2 font-medium text-zinc-900">动作详情示例 (Details)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200">
                              <tr className="hover:bg-zinc-50">
                                <td className="px-4 py-2 border-r border-zinc-200">User Login</td>
                                <td className="px-4 py-2">Logged into the workspace.</td>
                              </tr>
                              <tr className="hover:bg-zinc-50">
                                <td className="px-4 py-2 border-r border-zinc-200">Enable Auto-Recharge</td>
                                <td className="px-4 py-2">Enabled auto-recharge for $100 when balance falls below $20.</td>
                              </tr>
                              <tr className="hover:bg-zinc-50">
                                <td className="px-4 py-2 border-r border-zinc-200">Enable Alert</td>
                                <td className="px-4 py-2">Enabled balance alert threshold at $10.</td>
                              </tr>
                              <tr className="hover:bg-zinc-50">
                                <td className="px-4 py-2 border-r border-zinc-200">Disable Auto-Recharge</td>
                                <td className="px-4 py-2">Disabled auto-recharge.</td>
                              </tr>
                              <tr className="hover:bg-zinc-50">
                                <td className="px-4 py-2 border-r border-zinc-200">Disable Alert</td>
                                <td className="px-4 py-2">Disabled balance alert.</td>
                              </tr>
                              <tr className="hover:bg-zinc-50">
                                <td className="px-4 py-2 border-r border-zinc-200">Invite Member</td>
                                <td className="px-4 py-2">Invited dev2@company.com with Developer role.</td>
                              </tr>
                              <tr className="hover:bg-zinc-50">
                                <td className="px-4 py-2 border-r border-zinc-200">Create API Key</td>
                                <td className="px-4 py-2">Created key 'Production Key v2'.</td>
                              </tr>
                              <tr className="hover:bg-zinc-50">
                                <td className="px-4 py-2 border-r border-zinc-200">Edit API Key</td>
                                <td className="px-4 py-2">Updated key 'Production Key v2' name or spending limit.</td>
                              </tr>
                              <tr className="hover:bg-zinc-50">
                                <td className="px-4 py-2 border-r border-zinc-200">Disable API Key</td>
                                <td className="px-4 py-2">Disabled key 'Production Key v2'.</td>
                              </tr>
                              <tr className="hover:bg-zinc-50">
                                <td className="px-4 py-2 border-r border-zinc-200">Delete API Key</td>
                                <td className="px-4 py-2">Deleted key 'Production Key v2'.</td>
                              </tr>
                              <tr className="hover:bg-zinc-50">
                                <td className="px-4 py-2 border-r border-zinc-200">Recharge</td>
                                <td className="px-4 py-2">Recharged $500.00 via Stripe.</td>
                              </tr>
                              <tr className="hover:bg-zinc-50">
                                <td className="px-4 py-2 border-r border-zinc-200">Change Role</td>
                                <td className="px-4 py-2">Changed role of finance@company.com to Finance.</td>
                              </tr>
                              <tr className="hover:bg-zinc-50">
                                <td className="px-4 py-2 border-r border-zinc-200">Enable Enterprise</td>
                                <td className="px-4 py-2">Enabled Enterprise Workspace.</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-800 text-sm">6. API Keys 优化与登录补充</div>
                    <div className="p-4 space-y-4 text-sm text-zinc-600">
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>创建人字段：</strong>由于工作空间内支持多技术人员，需在 API Keys 列表中新增一列「创建人」（展示创建者的邮箱或 User ID），以便溯源。</li>
                        <li><strong>密码登录支持：</strong>除现有的邮箱验证码、第三方登录外，增加支持「密码登录」功能（此需求作为登录基础体验优化，与企业空间并行实施）。</li>
                        <li><strong>简化登录交互与设置密码：</strong>登录页仅保留“密码登录”与“验证码登录”，摒弃繁琐的注册与找回密码流程。用户若忘记密码，可直接通过验证码/Magic Link完成登录。</li>
                        <li><strong>用户设置新增安全模块：</strong>用户登录后，可在 Settings 页面新增的“安全 (Security)”模块中随时设置或修改密码。</li>
                        <li><strong>第三方账号关联简化：</strong>默认同一邮箱对应的不同登录方式（密码、验证码、Google、GitHub等）自动统一映射至同一用户（Account ID），移除在 Settings 中的手动第三方账号关联/解绑功能。</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
