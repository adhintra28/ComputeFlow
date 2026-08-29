import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Activity, Server, CreditCard, ArrowRight, ShieldCheck, Check,
  Info, TrendingUp, Layers, HelpCircle, ChevronRight, FileText,
  Sun, Moon
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';

type TabType = 'overview' | 'supplier' | 'msme';

interface LiveState {
  utilization: number;
  price: number;
  activeUsers: number;
  standbyUsers: number;
  timestamp: number;
}

const revenueData = [
  { name: 'Status Quo (50% Load, Flat)', revenue: 72000, color: '#71717a' },
  { name: 'Dynamic Pricing Only (75% Load)', revenue: 118800, color: '#a1a1aa' },
  { name: 'ComputeFlow: Yield + Credit (88% Load)', revenue: 157200, color: '#3b82f6' },
];

const suppliersList = [
  { name: 'DataVault DC', location: 'Mumbai', gpus: 128, model: 'H200 SXM5', load: '89.4%', monthly: '$117,500' },
  { name: 'CloudBridge', location: 'Noida', gpus: 64, model: 'H100 SXM5', load: '84.1%', monthly: '$58,800' },
  { name: 'Apex Colo', location: 'Bengaluru', gpus: 48, model: 'H200 SXM5', load: '91.2%', monthly: '$44,600' },
  { name: 'CyberGrid', location: 'Hyderabad', gpus: 32, model: 'B200 NVLink', load: '86.8%', monthly: '$38,400' },
];

const jobPresets = [
  {
    name: 'Fine-tune LLaMA-3 70B',
    specs: '8x NVIDIA H200 (48 hrs)',
    onDemandCost: 764,
    creditCost: 460,
    installments: '3 × $153.33 / mo',
    savings: 304,
  },
  {
    name: 'Diffusion Video Model Batch',
    specs: '4x NVIDIA H200 (36 hrs)',
    onDemandCost: 286,
    creditCost: 172,
    installments: '3 × $57.33 / mo',
    savings: 114,
  },
  {
    name: 'DeepSeek-V3 Domain Adaptation',
    specs: '16x NVIDIA H200 (72 hrs)',
    onDemandCost: 2292,
    creditCost: 1380,
    installments: '3 × $460.00 / mo',
    savings: 912,
  },
];

export default function Home() {
  const [isDark, setIsDark] = useState(true); // Default to True Black Mode
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [mounted, setMounted] = useState(false);
  const [live, setLive] = useState<LiveState>({
    utilization: 87.4,
    price: 2.49,
    activeUsers: 342,
    standbyUsers: 8742,
    timestamp: 0,
  });

  // Supplier calculator state
  const [supplierGpus, setSupplierGpus] = useState<number>(32);

  // MSME calculator state
  const [selectedJobIndex, setSelectedJobIndex] = useState<number>(0);
  const [showKfs, setShowKfs] = useState<boolean>(false);
  const [jobSubmitted, setJobSubmitted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    setLive({
      utilization: 87.4,
      price: 2.49,
      activeUsers: 342,
      standbyUsers: 8742,
      timestamp: Date.now(),
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setLive(prev => ({
        utilization: Math.min(93, Math.max(82, prev.utilization + (Math.random() - 0.48) * 1.2)),
        price: Math.min(2.80, Math.max(2.20, prev.price + (Math.random() - 0.5) * 0.05)),
        activeUsers: Math.floor(Math.min(450, Math.max(320, prev.activeUsers + (Math.random() - 0.5) * 4))),
        standbyUsers: Math.floor(Math.min(9200, Math.max(8400, prev.standbyUsers + (Math.random() - 0.5) * 15))),
        timestamp: Date.now(),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, [mounted]);

  const selectedJob = jobPresets[selectedJobIndex];

  // Supplier math
  const selfOp = supplierGpus * 720;
  const awsLease = supplierGpus * 1440;
  const neevShare = supplierGpus * 1530;
  const annualGain = (neevShare - awsLease) * 12;

  // True Jet Black Theme configuration
  const theme = {
    bg: isDark ? 'bg-[#000000] text-zinc-100' : 'bg-slate-50 text-slate-900',
    headerBg: isDark ? 'bg-[#000000]/95 border-zinc-800/80' : 'bg-white/95 border-slate-200',
    card: isDark ? 'bg-[#0a0a0c] border-zinc-800/90 text-zinc-100 shadow-none' : 'bg-white border-slate-200 text-slate-900 shadow-sm',
    subCard: isDark ? 'bg-[#121215] border-zinc-800/60 text-zinc-200' : 'bg-slate-50 border-slate-200 text-slate-800',
    border: isDark ? 'border-zinc-800' : 'border-slate-200',
    mutedText: isDark ? 'text-zinc-400' : 'text-slate-500',
    navActive: isDark ? 'bg-zinc-100 text-zinc-950 font-bold' : 'bg-slate-900 text-white font-bold',
    navInactive: isDark ? 'text-zinc-400 hover:text-white hover:bg-zinc-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
    highlightBox: isDark ? 'bg-blue-950/20 border-blue-500/40 text-blue-100' : 'bg-blue-50 border-blue-200 text-blue-950',
    highlightText: isDark ? 'text-blue-400' : 'text-blue-600',
    gridLine: isDark ? '#27272a' : '#f1f5f9',
    axisColor: isDark ? '#a1a1aa' : '#64748b',
    tooltipBg: isDark ? '#09090b' : '#ffffff',
    tooltipBorder: isDark ? '#27272a' : '#e2e8f0',
    tagBg: isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200',
  };

  return (
    <>
      <Head>
        <title>ComputeFlow | Two-Sided GPU Supply-Chain Finance &amp; Credit Platform</title>
        <meta name="description" content="Two-sided GPU finance platform: Dynamic Yield & Compute Credit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={`min-h-screen ${theme.bg} font-sans transition-colors duration-150`}>
        {/* Navigation Bar */}
        <header className={`${theme.headerBg} border-b sticky top-0 z-40 backdrop-blur-md transition-colors`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between flex-wrap gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-base shadow-sm">
                C
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-extrabold text-xl tracking-tight">ComputeFlow</span>
                </div>
                <p className={`text-xs ${theme.mutedText} hidden sm:block mt-0.5`}>
                  Two-Sided GPU Supply-Chain Finance &amp; Compute Credit
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className={`flex items-center gap-1.5 p-1 rounded-xl border ${isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-slate-100 border-slate-200'}`}>
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'overview' ? theme.navActive : theme.navInactive
                }`}
              >
                1. Overview &amp; Flywheel
              </button>
              <button
                onClick={() => setActiveTab('supplier')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'supplier' ? theme.navActive : theme.navInactive
                }`}
              >
                2. Supplier Yield (Supply)
              </button>
              <button
                onClick={() => setActiveTab('msme')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'msme' ? theme.navActive : theme.navInactive
                }`}
              >
                3. MSME Credit (Demand)
              </button>
            </nav>

            {/* Right Controls: Live Badge + Dark/Light Mode Toggle */}
            <div className="flex items-center gap-3">
              <div className={`hidden md:flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Cluster Load: <strong className={theme.highlightText}>{live.utilization.toFixed(1)}%</strong></span>
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={() => setIsDark(!isDark)}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className={`p-2 rounded-lg border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                  isDark
                    ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800'
                    : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 shadow-sm'
                }`}
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="hidden sm:inline">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-slate-700" />
                    <span className="hidden sm:inline">Dark</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Body Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Executive Summary Pitch Card */}
          <div className={`${theme.card} border rounded-2xl p-6 sm:p-8`}>
            <div className="flex items-center justify-between flex-wrap gap-3 border-b pb-4 mb-6 border-inherit">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  How ComputeFlow Solves the GPU Supply &amp; Demand Capital Lock
                </h2>
                <p className={`text-sm ${theme.mutedText} mt-1`}>
                  Connecting Data Center Yield Optimization with Alternative MSME Underwriting
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
              <div className={`${theme.subCard} p-5 sm:p-6 rounded-xl border`}>
                <div className="font-bold text-base mb-2.5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>Supply Side: Equipment Yield Management</span>
                </div>
                <p className={`${theme.mutedText} text-sm leading-relaxed`}>
                  <strong className={isDark ? 'text-zinc-100' : 'text-slate-900'}>The Bottleneck:</strong> Cloud platforms cannot spend $500k+ upfront to buy GPU clusters, and data centers will not lease without guaranteed high utilization. <br className="my-1.5" />
                  <strong className={theme.highlightText}>The Solution:</strong> Dynamic pricing maintains 85%+ cluster utilization, letting data centers earn <strong className={isDark ? 'text-emerald-400' : 'text-emerald-700'}>+$10,800/GPU/yr more</strong> than AWS on a 60/40 revenue-share—unlocking GPU supply without CapEx.
                </p>
              </div>

              <div className={`${theme.subCard} p-5 sm:p-6 rounded-xl border`}>
                <div className="font-bold text-base mb-2.5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>Demand Side: Usage-Based Credit Line</span>
                </div>
                <p className={`${theme.mutedText} text-sm leading-relaxed`}>
                  <strong className={isDark ? 'text-zinc-100' : 'text-slate-900'}>The Bottleneck:</strong> 10,000+ AI startups are locked out of 40% reserved pricing because they cannot front ₹50,000+ prepayments, and banks reject them without physical collateral. <br className="my-1.5" />
                  <strong className={theme.highlightText}>The Solution:</strong> Embedded credit line lets MSMEs pay in 3 monthly installments, underwritten by real-time <strong className={isDark ? 'text-zinc-100' : 'text-slate-900'}>"Compute Score"</strong> usage telemetry instead of credit bureau files.
                </p>
              </div>
            </div>
          </div>

          {/* TAB 1: OVERVIEW & FLYWHEEL */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* 4 Clean Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`${theme.card} border rounded-2xl p-6`}>
                  <span className={`text-sm font-medium ${theme.mutedText}`}>Cluster Utilization</span>
                  <div className="text-3xl sm:text-4xl font-extrabold mt-1.5">{live.utilization.toFixed(1)}%</div>
                  <span className="text-xs font-semibold text-emerald-400 mt-2 block">+37% vs 50% baseline</span>
                </div>

                <div className={`${theme.card} border rounded-2xl p-6`}>
                  <span className={`text-sm font-medium ${theme.mutedText}`}>Dynamic Price (H200)</span>
                  <div className="text-3xl sm:text-4xl font-extrabold mt-1.5">${live.price.toFixed(2)}<span className={`text-base font-normal ${theme.mutedText}`}>/hr</span></div>
                  <span className={`text-xs ${theme.mutedText} mt-2 block`}>-40% vs AWS on-demand</span>
                </div>

                <div className={`${theme.card} border rounded-2xl p-6`}>
                  <span className={`text-sm font-medium ${theme.mutedText}`}>Active AI Startups</span>
                  <div className="text-3xl sm:text-4xl font-extrabold mt-1.5">{live.activeUsers}</div>
                  <span className={`text-xs ${theme.mutedText} mt-2 block`}>{live.standbyUsers.toLocaleString()} on standby</span>
                </div>

                <div className={`${theme.card} border rounded-2xl p-6`}>
                  <span className={`text-sm font-medium ${theme.mutedText}`}>Supply Unlocked</span>
                  <div className="text-3xl sm:text-4xl font-extrabold mt-1.5">848 GPUs</div>
                  <span className={`text-xs font-semibold ${theme.highlightText} mt-2 block`}>Zero CapEx / $0 Debt</span>
                </div>
              </div>

              {/* The Compounding Flywheel Diagram */}
              <div className={`${theme.card} border rounded-2xl p-6 sm:p-8`}>
                <h3 className="text-lg sm:text-xl font-bold mb-1">The Compounding Flywheel</h3>
                <p className={`text-sm ${theme.mutedText} mb-6`}>How MSME credit and data center yield create a self-reinforcing supply-chain cycle</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { num: '1', title: 'MSME Credit Issuance', desc: 'Alternative Compute Score grants AI startups 40% reserved pricing on installments.' },
                    { num: '2', title: 'Standby Queue Conversion', desc: '10,000+ waiting MSMEs convert into active off-peak and batch training workloads.' },
                    { num: '3', title: 'Cluster Load Surges to 85%+', desc: 'Eliminates wasted data center idle time and thermal power losses.' },
                    { num: '4', title: 'Revenue Expansion (+92%)', desc: 'ComputeFlow generates $157k/mo per 100 GPUs, paying data centers $1,530/GPU/mo.' },
                    { num: '5', title: 'Data Centers Lease More GPUs', desc: 'Hardware lenders trust ComputeFlow with additional clusters on revenue-share.' },
                    { num: '6', title: 'Network Scale & Lower Costs', desc: 'Larger GPU pool allows further price optimizations, expanding credit lines.' },
                  ].map((step, idx) => (
                    <div key={idx} className={`p-5 rounded-xl border ${theme.subCard}`}>
                      <div className="flex items-center gap-3 mb-2.5">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                          {step.num}
                        </span>
                        <h4 className="font-bold text-sm sm:text-base">{step.title}</h4>
                      </div>
                      <p className={`text-xs sm:text-sm ${theme.mutedText} leading-relaxed`}>{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Expansion Chart */}
              <div className={`${theme.card} border rounded-2xl p-6 sm:p-8`}>
                <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">Monthly Revenue Expansion (per 100-GPU Cluster)</h3>
                    <p className={`text-sm ${theme.mutedText}`}>Comparison across monetization models ($USD / Month)</p>
                  </div>
                  <span className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full border ${theme.tagBg}`}>
                    +118% Net Expansion
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData} layout="vertical" margin={{ left: 20, right: 30, top: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={theme.gridLine} />
                      <XAxis type="number" stroke={theme.axisColor} fontSize={12} tickFormatter={(v) => `$${v/1000}k`} />
                      <YAxis type="category" dataKey="name" stroke={theme.axisColor} fontSize={12} width={230} />
                      <Tooltip
                        formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Monthly Revenue']}
                        contentStyle={{ backgroundColor: theme.tooltipBg, borderColor: theme.tooltipBorder, borderRadius: '8px', fontSize: '13px', color: isDark ? '#f8fafc' : '#0f172a' }}
                      />
                      <Bar dataKey="revenue" fill={isDark ? '#3b82f6' : '#2563eb'} radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className={`text-xs sm:text-sm ${theme.mutedText} text-center mt-4`}>
                  Under the 60/40 revenue share, data centers earn 60% ($94.3k/mo), while ComputeFlow retains 40% gross margin ($62.9k/mo) with zero hardware debt.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: SUPPLIER DASHBOARD (SUPPLY SIDE) */}
          {activeTab === 'supplier' && (
            <div className="space-y-8">
              {/* Supplier Calculator */}
              <div className={`${theme.card} border rounded-2xl p-6 sm:p-8`}>
                <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">Data Center Revenue-Share Calculator</h3>
                    <p className={`text-sm ${theme.mutedText}`}>Calculate supplier earnings under ComputeFlow 60/40 dynamic yield vs AWS fixed lease</p>
                  </div>
                  <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${theme.subCard}`}>
                    <span className="text-xs sm:text-sm font-medium">Cluster Size:</span>
                    <input
                      type="range"
                      min="8"
                      max="128"
                      step="8"
                      value={supplierGpus}
                      onChange={(e) => setSupplierGpus(Number(e.target.value))}
                      className="w-32 accent-blue-500 cursor-pointer"
                    />
                    <span className={`text-sm font-bold w-16 text-right ${theme.highlightText}`}>{supplierGpus} GPUs</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className={`p-5 sm:p-6 rounded-xl border ${theme.subCard}`}>
                    <span className={`text-xs sm:text-sm font-medium ${theme.mutedText}`}>1. Self-Operated (40% Load)</span>
                    <div className="text-2xl sm:text-3xl font-bold mt-2">${selfOp.toLocaleString()} <span className={`text-xs sm:text-sm font-normal ${theme.mutedText}`}>/ mo</span></div>
                    <span className={`text-xs sm:text-sm ${theme.mutedText} mt-1.5 block`}>${(selfOp * 12).toLocaleString()} / year</span>
                  </div>

                  <div className={`p-5 sm:p-6 rounded-xl border ${theme.subCard}`}>
                    <span className={`text-xs sm:text-sm font-medium ${theme.mutedText}`}>2. AWS Fixed Lease (80% Cap)</span>
                    <div className="text-2xl sm:text-3xl font-bold mt-2">${awsLease.toLocaleString()} <span className={`text-xs sm:text-sm font-normal ${theme.mutedText}`}>/ mo</span></div>
                    <span className={`text-xs sm:text-sm ${theme.mutedText} mt-1.5 block`}>${(awsLease * 12).toLocaleString()} / year</span>
                  </div>

                  <div className={`p-5 sm:p-6 rounded-xl border ${theme.highlightBox}`}>
                    <span className={`text-xs sm:text-sm font-bold ${theme.highlightText}`}>3. ComputeFlow 60/40 Share (85%+)</span>
                    <div className="text-2xl sm:text-3xl font-bold mt-2">${neevShare.toLocaleString()} <span className={`text-xs sm:text-sm font-normal opacity-80`}>/ mo</span></div>
                    <span className="text-xs sm:text-sm font-semibold mt-1.5 block text-emerald-400">
                      +${annualGain.toLocaleString()} / year extra profit
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Supplier Fleet Table */}
              <div className={`${theme.card} border rounded-2xl p-6 sm:p-8`}>
                <h3 className="text-lg sm:text-xl font-bold mb-1">Active Connected Data Center Fleets</h3>
                <p className={`text-sm ${theme.mutedText} mb-6`}>Hardware suppliers currently participating in the 60/40 revenue share</p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className={`border-b ${theme.border} font-bold text-xs uppercase tracking-wider ${theme.mutedText}`}>
                      <tr>
                        <th className="py-3 px-4">Data Center</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Cluster</th>
                        <th className="py-3 px-4">GPUs</th>
                        <th className="py-3 px-4">Avg Load</th>
                        <th className="py-3 px-4">Monthly Payout</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${theme.border}`}>
                      {suppliersList.map((s, i) => (
                        <tr key={i} className={`hover:bg-zinc-500/5 transition-colors`}>
                          <td className="py-3.5 px-4 font-bold">{s.name}</td>
                          <td className={`py-3.5 px-4 ${theme.mutedText}`}>{s.location}</td>
                          <td className="py-3.5 px-4">{s.model}</td>
                          <td className="py-3.5 px-4 font-semibold">{s.gpus} GPUs</td>
                          <td className={`py-3.5 px-4 font-bold ${theme.highlightText}`}>{s.load}</td>
                          <td className="py-3.5 px-4 font-extrabold text-emerald-400">{s.monthly}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MSME CREDIT PORTAL (DEMAND SIDE) */}
          {activeTab === 'msme' && (
            <div className="space-y-8">
              {/* MSME Profile & Compute Score */}
              <div className={`${theme.card} border rounded-2xl p-6 sm:p-8`}>
                <div className="flex items-center justify-between flex-wrap gap-4 border-b pb-4 mb-6 border-inherit">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">Alternative Underwriting: Compute Score</h3>
                    <p className={`text-sm ${theme.mutedText}`}>Underwritten via real-time GPU telemetry (zero physical collateral required)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs sm:text-sm ${theme.mutedText}`}>Profile Score:</span>
                    <span className={`text-sm sm:text-base font-extrabold px-3.5 py-1 rounded-full border ${theme.tagBg}`}>
                      765 / 850 (Gold Tier)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className={`p-4 sm:p-5 rounded-xl border ${theme.subCard}`}>
                    <div className="font-bold">1. Compute Velocity (35%)</div>
                    <div className={`text-xs sm:text-sm ${theme.mutedText} mt-1.5`}>280 GPU-hrs / mo (92/100 score)</div>
                  </div>
                  <div className={`p-4 sm:p-5 rounded-xl border ${theme.subCard}`}>
                    <div className="font-bold">2. Completion Rate (25%)</div>
                    <div className={`text-xs sm:text-sm ${theme.mutedText} mt-1.5`}>96.4% completed runs</div>
                  </div>
                  <div className={`p-4 sm:p-5 rounded-xl border ${theme.subCard}`}>
                    <div className="font-bold">3. Workload Type (20%)</div>
                    <div className={`text-xs sm:text-sm ${theme.mutedText} mt-1.5`}>70% Inference / 30% Fine-tuning</div>
                  </div>
                  <div className={`p-4 sm:p-5 rounded-xl border ${theme.subCard}`}>
                    <div className="font-bold">4. Payment History (20%)</div>
                    <div className={`text-xs sm:text-sm ${theme.mutedText} mt-1.5`}>100% on-time micro-billing</div>
                  </div>
                </div>
              </div>

              {/* Job Micro-Financing (BNPL) Calculator */}
              <div className={`${theme.card} border rounded-2xl p-6 sm:p-8`}>
                <h3 className="text-lg sm:text-xl font-bold mb-1">Job-Level Micro-Financing Calculator</h3>
                <p className={`text-sm ${theme.mutedText} mb-6`}>Select an AI workload to compare upfront on-demand cost vs 3-installment credit</p>

                {/* Preset Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {jobPresets.map((job, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedJobIndex(idx);
                        setJobSubmitted(false);
                      }}
                      className={`p-4 sm:p-5 rounded-xl text-left border text-sm transition-all ${
                        selectedJobIndex === idx
                          ? `${theme.highlightBox} font-semibold shadow-sm`
                          : `${theme.subCard} hover:border-zinc-500`
                      }`}
                    >
                      <div className="font-bold text-sm sm:text-base">{job.name}</div>
                      <div className={`text-xs ${theme.mutedText} mt-1`}>{job.specs}</div>
                    </button>
                  ))}
                </div>

                {/* Pricing Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className={`p-5 sm:p-6 rounded-xl border ${theme.subCard}`}>
                    <span className={`text-xs sm:text-sm font-medium ${theme.mutedText}`}>Option 1: Traditional On-Demand</span>
                    <div className="text-3xl sm:text-4xl font-extrabold mt-2">${selectedJob.onDemandCost}</div>
                    <p className={`text-xs sm:text-sm ${theme.mutedText} mt-2`}>100% upfront cash burn before workload starts</p>
                  </div>

                  <div className={`p-5 sm:p-6 rounded-xl border ${theme.highlightBox}`}>
                    <span className={`text-xs sm:text-sm font-bold ${theme.highlightText}`}>Option 2: Compute Credit Line (Save 40%)</span>
                    <div className="text-3xl sm:text-4xl font-extrabold mt-2">{selectedJob.installments}</div>
                    <p className={`text-xs sm:text-sm mt-2 text-emerald-400 font-medium`}>
                      Total: ${selectedJob.creditCost} (Save ${selectedJob.savings} via reserved rate)
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 pt-5 border-t border-inherit flex items-center justify-between flex-wrap gap-4 text-xs sm:text-sm">
                  <div className={theme.mutedText}>
                    Underwritten via <span className={`font-semibold ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>Alternative GPU Telemetry Model</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowKfs(true)}
                      className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border transition-colors ${
                        isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800' : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      View Key Fact Statement (KFS)
                    </button>
                    <button
                      onClick={() => setJobSubmitted(true)}
                      className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm"
                    >
                      {jobSubmitted ? 'Credit Sanctioned & Queued ✓' : 'Sanction Credit & Run Job'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Fact Statement Modal */}
          {showKfs && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className={`${theme.card} border rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-sm`}>
                <div className="flex items-center justify-between border-b pb-3 mb-4 border-inherit">
                  <h4 className="font-bold text-base">Key Fact Statement (KFS)</h4>
                  <button onClick={() => setShowKfs(false)} className={`${theme.mutedText} hover:text-white text-base`}>✕</button>
                </div>
                <div className={`space-y-3 ${theme.mutedText}`}>
                  <div className="flex justify-between py-1 border-b border-inherit">
                    <span>Platform:</span>
                    <strong className={isDark ? 'text-zinc-100' : 'text-slate-900'}>ComputeFlow</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-inherit">
                    <span>Sanctioned Amount:</span>
                    <strong className={isDark ? 'text-zinc-100' : 'text-slate-900'}>${selectedJob.creditCost}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-inherit">
                    <span>Repayment:</span>
                    <strong className={isDark ? 'text-zinc-100' : 'text-slate-900'}>{selectedJob.installments}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Security / Collateral:</span>
                    <strong className={isDark ? 'text-zinc-100' : 'text-slate-900'}>Self-Collateralizing GPU Pause</strong>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-inherit flex justify-end">
                  <button
                    onClick={() => setShowKfs(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-xs sm:text-sm hover:bg-blue-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Clean Footer */}
        <footer className={`border-t ${theme.border} py-6 mt-12 text-xs sm:text-sm ${theme.mutedText}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <strong className={isDark ? 'text-zinc-200' : 'text-slate-900'}>ComputeFlow</strong>
            </div>
            <div>
              Two-Sided GPU Supply-Chain Finance &amp; Compute Credit Platform • {mounted && `Updated: ${new Date(live.timestamp).toLocaleTimeString()}`}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
