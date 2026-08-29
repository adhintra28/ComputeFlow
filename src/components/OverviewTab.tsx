import React, { useState } from 'react';
import {
  Activity, TrendingUp, Users, DollarSign, Zap, ArrowRight, ShieldCheck,
  Layers, CheckCircle2, RefreshCw, BarChart3, Database, Sparkles, AlertCircle
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';

interface OverviewTabProps {
  utilization: number;
  price: number;
  activeUsers: number;
  standbyUsers: number;
}

const utilizationTrend = [
  { time: '00:00', traditional: 48, dynamic: 82, creditBoost: 88 },
  { time: '04:00', traditional: 35, dynamic: 74, creditBoost: 84 },
  { time: '08:00', traditional: 52, dynamic: 86, creditBoost: 91 },
  { time: '12:00', traditional: 64, dynamic: 92, creditBoost: 96 },
  { time: '16:00', traditional: 58, dynamic: 89, creditBoost: 93 },
  { time: '20:00', traditional: 45, dynamic: 81, creditBoost: 87 },
  { time: '24:00', traditional: 40, dynamic: 78, creditBoost: 85 },
];

const revenueComparisonData = [
  { model: 'Status Quo (Flat $2.00, 50% load)', revenue: 72000, color: '#64748b' },
  { model: 'Dynamic Pricing Only (75% load)', revenue: 118800, color: '#3b82f6' },
  { model: 'NeevSetu: Yield + Credit (88% load)', revenue: 157248, color: '#14b8a6' },
];

const flywheelSteps = [
  {
    step: 1,
    title: '1. MSME Credit Issuance',
    desc: 'Underwrite underserved AI startups using real-time Compute Score, unlocking 40% reserved discounts on installments.',
    tag: 'Demand Unlock',
    color: 'border-teal-500/50 bg-teal-500/10 text-teal-300'
  },
  {
    step: 2,
    title: '2. Latent Demand Conversion',
    desc: '10,000+ standby users start running off-peak and reserved batch workloads instead of sitting idle in queue.',
    tag: 'Load Absorption',
    color: 'border-blue-500/50 bg-blue-500/10 text-blue-300'
  },
  {
    step: 3,
    title: '3. Cluster Utilization Spikes',
    desc: 'Cluster utilization surges from 45–50% to a consistent 85–92%, eliminating wasted data center power and hardware idle time.',
    tag: 'Yield Surge',
    color: 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300'
  },
  {
    step: 4,
    title: '4. Revenue Expansion',
    desc: 'NeevCloud yields +92% more revenue per cluster, sharing 60% with hardware suppliers ($1,530/GPU/mo vs $1,440 AWS lease).',
    tag: 'Supplier ROI',
    color: 'border-purple-500/50 bg-purple-500/10 text-purple-300'
  },
  {
    step: 5,
    title: '5. Hardware Lenders Onboard',
    desc: 'Data centers and GPU asset owners willingly lease capacity to NeevCloud under revenue-share—zero CapEx required.',
    tag: 'Zero-CapEx Supply',
    color: 'border-amber-500/50 bg-amber-500/10 text-amber-300'
  },
  {
    step: 6,
    title: '6. Compounding Liquidity',
    desc: 'Larger GPU pool allows further price optimizations, granting more MSME credit limits and self-reinforcing the network.',
    tag: 'Compounding Loop',
    color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
  },
];

export default function OverviewTab({ utilization, price, activeUsers, standbyUsers }: OverviewTabProps) {
  const [selectedFlywheelStep, setSelectedFlywheelStep] = useState<number>(1);
  const [simulationCreditAdoption, setSimulationCreditAdoption] = useState<number>(65);

  // Simulated metrics based on credit adoption slider
  const simulatedUtilization = (50 + (simulationCreditAdoption * 0.42)).toFixed(1);
  const simulatedMonthlyRev = Math.round(72000 + (simulationCreditAdoption * 1320));
  const simulatedGpusUnlocked = Math.round(100 + (simulationCreditAdoption * 12.5));

  return (
    <div className="space-y-8">
      {/* 1. Live KPI Summary Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="glass-card rounded-2xl p-5 border border-teal-500/20 hover:border-teal-500/50 transition-all glow-teal">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Live GPU Utilization</span>
            <span className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium bg-teal-500/20 text-teal-300 rounded-full border border-teal-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              Live Telemetry
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-3xl font-extrabold text-white">{utilization.toFixed(1)}%</span>
            <span className="text-xs font-semibold text-emerald-400">+36.2% vs Baseline</span>
          </div>
          <div className="w-full bg-navy-950 rounded-full h-2 mt-3 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${utilization}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">Target: &gt;85% cluster load for optimal supplier yield</p>
        </div>

        {/* Metric 2 */}
        <div className="glass-card rounded-2xl p-5 border border-blue-500/20 hover:border-blue-500/50 transition-all glow-blue">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Dynamic Clearing Rate</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
              NVIDIA H200
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-3xl font-extrabold text-white">${price.toFixed(2)}</span>
            <span className="text-xs text-slate-400">/ GPU-hour</span>
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-slate-300">
            <span className="text-emerald-400 font-semibold">-42% cheaper</span> than AWS On-Demand ($3.50/hr)
          </div>
          <p className="text-xs text-slate-400 mt-2">Yield-adjusted pricing based on standby queue pressure</p>
        </div>

        {/* Metric 3 */}
        <div className="glass-card rounded-2xl p-5 border border-purple-500/20 hover:border-purple-500/50 transition-all glow-purple">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">MSME Compute Pipeline</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
              Credit Enabled
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-3xl font-extrabold text-white">{activeUsers}</span>
            <span className="text-xs text-purple-300 font-medium">Active Startups</span>
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-300">
            <span className="font-semibold text-amber-400">{standbyUsers.toLocaleString()}</span>
            <span>MSMEs converting via Compute Score</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Underwritten via GPU telemetry, zero bank collateral</p>
        </div>

        {/* Metric 4 */}
        <div className="glass-card rounded-2xl p-5 border border-emerald-500/20 hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Supply Unlocked (Zero CapEx)</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
              Rev-Share Leased
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-3xl font-extrabold text-white">848</span>
            <span className="text-xs text-emerald-400 font-semibold">GPUs Online</span>
          </div>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-300">
            <span className="text-teal-400 font-bold">$0 Debt / Equity</span> spent on hardware
          </div>
          <p className="text-xs text-slate-400 mt-2">Data centers lease to NeevCloud for guaranteed 85% yield</p>
        </div>
      </div>

      {/* 2. Two-Sided Value Matrix (The Core Innovation) */}
      <div className="glass-card rounded-2xl p-6 border border-slate-700/60">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30 uppercase tracking-wider">
                Two-Sided Fintech Architecture
              </span>
              <span className="text-xs text-slate-400">How Both Sides Compound</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Supply-Side Yield Engine meets Demand-Side Compute Credit
            </h3>
          </div>
          <div className="text-xs text-slate-400 bg-navy-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
            Mechanism: <span className="text-teal-400 font-medium">Yield Optimization + Alternative Underwriting</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Side A: Supply */}
          <div className="bg-gradient-to-br from-navy-950 to-navy-900 border border-teal-500/30 rounded-xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-semibold rounded-bl-lg border-l border-b border-teal-500/30">
              MODULE A: SUPPLY SIDE
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-teal-500/10 rounded-xl text-teal-400 border border-teal-500/30">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">GPU Hardware Owners & Data Centers</h4>
                <p className="text-xs text-slate-400">Colo facilities, asset managers with idle clusters</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-navy-900/80 rounded-lg border border-slate-800">
                <span className="text-rose-400 font-semibold">The Pain:</span> Idle GPUs run at 30–50% load, losing $10,000+ per GPU/year. Reluctant to lease without upfront guarantees.
              </div>
              <div className="p-3 bg-teal-950/30 rounded-lg border border-teal-500/30">
                <span className="text-teal-400 font-semibold">Our Financial Solution:</span> 60/40 Revenue-share lease backed by dynamic pricing that keeps utilization at <strong>85%+</strong>.
              </div>
              <div className="flex items-center justify-between p-3 bg-navy-950 rounded-lg border border-slate-800 text-slate-300">
                <span>Supplier Net Revenue:</span>
                <span className="text-emerald-400 font-bold text-sm">$1,530/GPU/mo (+$10.8k/yr vs AWS lease)</span>
              </div>
            </div>
          </div>

          {/* Side B: Demand */}
          <div className="bg-gradient-to-br from-navy-950 to-navy-900 border border-blue-500/30 rounded-xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-bl-lg border-l border-b border-blue-500/30">
              MODULE B: DEMAND SIDE
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/30">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">AI MSMEs, Startups & Research Labs</h4>
                <p className="text-xs text-slate-400">12,000+ Indian AI developers locked out of reserved tiers</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-navy-900/80 rounded-lg border border-slate-800">
                <span className="text-rose-400 font-semibold">The Pain:</span> Cannot pay ₹50k–₹5L upfront prepayments for reserved discounts; banks reject them due to zero collateral.
              </div>
              <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-500/30">
                <span className="text-blue-400 font-semibold">Our Financial Solution:</span> Embedded Compute Credit Line underwritten on real-time <strong>"Compute Score"</strong> usage telemetry.
              </div>
              <div className="flex items-center justify-between p-3 bg-navy-950 rounded-lg border border-slate-800 text-slate-300">
                <span>MSME Savings:</span>
                <span className="text-teal-400 font-bold text-sm">40% Off ($158/mo saved on 200 hrs H200)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Compounding Flywheel Simulator */}
      <div className="glass-card rounded-2xl p-6 border border-slate-700/60">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                Compounding Flywheel
              </span>
              <span className="text-xs text-slate-400">Click any step to inspect the economic trigger</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              How Dynamic Pricing & Compute Credit Compound
            </h3>
          </div>

          <div className="flex items-center gap-3 bg-navy-950 p-2.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-300">Simulate MSME Credit Adoption:</span>
            <input
              type="range"
              min="10"
              max="100"
              value={simulationCreditAdoption}
              onChange={(e) => setSimulationCreditAdoption(Number(e.target.value))}
              className="w-32 accent-teal-400 cursor-pointer"
            />
            <span className="text-xs font-bold text-teal-400 w-10 text-right">{simulationCreditAdoption}%</span>
          </div>
        </div>

        {/* Interactive Flywheel Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 my-6">
          {flywheelSteps.map((step) => {
            const isSelected = selectedFlywheelStep === step.step;
            return (
              <div
                key={step.step}
                onClick={() => setSelectedFlywheelStep(step.step)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? `${step.color} shadow-lg scale-[1.02]`
                    : 'bg-navy-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-black/40 text-slate-200">
                    {step.tag}
                  </span>
                  <span className="text-xs text-slate-400">Step {step.step}/6</span>
                </div>
                <h5 className="font-bold text-sm text-white mb-1.5">{step.title}</h5>
                <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Dynamic Simulation Ticker Result */}
        <div className="p-4 bg-navy-950 rounded-xl border border-teal-500/30 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500/20 text-teal-400 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Projected Flywheel Output at {simulationCreditAdoption}% Credit Penetration:</p>
              <p className="text-sm font-semibold text-white">
                Cluster Load: <span className="text-teal-400">{simulatedUtilization}%</span> | Monthly Cluster Rev: <span className="text-emerald-400">${simulatedMonthlyRev.toLocaleString()}</span> | GPUs Unlocked: <span className="text-purple-400">{simulatedGpusUnlocked} GPUs</span>
              </p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30 font-medium">
            Zero Dilution Scaling
          </span>
        </div>
      </div>

      {/* 4. Financial Charts: Utilization Curve & Revenue Expansion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 */}
        <div className="glass-card rounded-2xl p-6 border border-slate-700/60">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-white text-base">24-Hour Utilization Curve</h4>
              <p className="text-xs text-slate-400">Comparing Traditional Flat Rate vs NeevSetu Yield & Credit</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
              88% Avg Load
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={utilizationTrend}>
                <defs>
                  <linearGradient id="colorCredit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorTrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0c1527', borderColor: '#23385e', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="traditional" stroke="#64748b" fillOpacity={1} fill="url(#colorTrad)" name="Traditional Flat Rate (48% avg)" />
                <Area type="monotone" dataKey="creditBoost" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorCredit)" name="NeevSetu: Yield + Credit (88% avg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">
            Off-peak night valley (00:00–06:00) is filled by MSME batch training runs underwritten by Compute Credit.
          </p>
        </div>

        {/* Chart 2 */}
        <div className="glass-card rounded-2xl p-6 border border-slate-700/60">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-white text-base">Monthly Revenue / 100-GPU Cluster</h4>
              <p className="text-xs text-slate-400">Comparing monetization models ($USD / Month)</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              +118% Expansion
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueComparisonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${v/1000}k`} />
                <YAxis type="category" dataKey="model" stroke="#64748b" fontSize={10} width={130} />
                <Tooltip
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Monthly Revenue']}
                  contentStyle={{ backgroundColor: '#0c1527', borderColor: '#23385e', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="revenue" fill="#14b8a6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">
            Zero hardware cost: 60% of the $157.2k is paid to data center partners; NeevCloud keeps 40% gross margin.
          </p>
        </div>
      </div>
    </div>
  );
}
