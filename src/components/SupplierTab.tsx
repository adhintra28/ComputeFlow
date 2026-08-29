import React, { useState } from 'react';
import {
  Server, DollarSign, Activity, TrendingUp, ShieldCheck, CheckCircle2,
  HardDrive, Cpu, AlertTriangle, ArrowUpRight, Zap, Building2, HelpCircle
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

interface SupplierTabProps {
  utilization: number;
}

const activeSuppliers = [
  {
    id: 'SUP-BOM-01',
    name: 'DataVault HyperScale',
    location: 'Mumbai (Navi Mumbai DC-3)',
    gpuModel: 'NVIDIA H200 141GB SXM5',
    gpuCount: 128,
    utilization: 89.4,
    monthlyPayout: 117500,
    uptime: '99.99%',
    tier: 'Platinum Partner',
    status: 'Optimal'
  },
  {
    id: 'SUP-DEL-02',
    name: 'CloudBridge Infrastructure',
    location: 'Noida (Sector 62 DC)',
    gpuModel: 'NVIDIA H100 80GB SXM5',
    gpuCount: 64,
    utilization: 84.1,
    monthlyPayout: 58800,
    uptime: '99.96%',
    tier: 'Gold Partner',
    status: 'Optimal'
  },
  {
    id: 'SUP-BLR-03',
    name: 'Apex Colo Solutions',
    location: 'Bengaluru (Whitefield Tech Park)',
    gpuModel: 'NVIDIA H200 141GB SXM5',
    gpuCount: 48,
    utilization: 91.2,
    monthlyPayout: 44600,
    uptime: '100.00%',
    tier: 'Platinum Partner',
    status: 'Surge Yield'
  },
  {
    id: 'SUP-HYD-04',
    name: 'CyberGrid Tier-4 DC',
    location: 'Hyderabad (HITEC City)',
    gpuModel: 'NVIDIA B200 Blackwell (Early Access)',
    gpuCount: 32,
    utilization: 86.8,
    monthlyPayout: 38400,
    uptime: '99.98%',
    tier: 'Gold Partner',
    status: 'Optimal'
  },
];

export default function SupplierTab({ utilization }: SupplierTabProps) {
  const [gpuSliderCount, setGpuSliderCount] = useState<number>(32);

  // Revenue math for comparison
  const selfOperatedMonthly = gpuSliderCount * 720;
  const awsLeaseMonthly = gpuSliderCount * 1440;
  const neevCloudMonthly = gpuSliderCount * 1530;
  const annualGainVsAws = (neevCloudMonthly - awsLeaseMonthly) * 12;

  const comparisonChartData = [
    { name: 'Self-Operated (40% Load)', revenue: selfOperatedMonthly, fill: '#64748b' },
    { name: 'AWS Fixed Lease (80% Cap)', revenue: awsLeaseMonthly, fill: '#3b82f6' },
    { name: 'NeevCloud 60/40 Share (85%+)', revenue: neevCloudMonthly, fill: '#14b8a6' },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Header Explanation Pill */}
      <div className="bg-navy-900 border border-teal-500/30 rounded-2xl p-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-500/20 text-teal-400 rounded-xl border border-teal-500/30">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  SUPPLY-SIDE FINTECH
                </span>
                <span className="text-xs text-slate-400">Zero-CapEx GPU Acquisition</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Data Center Yield Optimization & Equipment Revenue-Share
              </h3>
            </div>
          </div>
          <div className="text-xs text-slate-300 bg-navy-950 px-3.5 py-2 rounded-xl border border-slate-800">
            NeevCloud Split: <span className="text-teal-400 font-bold">60% to Supplier</span> | <span className="text-blue-400 font-bold">40% Platform Fee</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Revenue-Share Calculator */}
      <div className="glass-card rounded-2xl p-6 border border-slate-700/60">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Interactive ROI Simulator
            </span>
            <h4 className="text-lg font-bold text-white mt-0.5">
              Why Hardware Lenders Earn More Leasing to NeevCloud
            </h4>
            <p className="text-xs text-slate-400">
              Adjust the GPU cluster size to compare annual returns against traditional hyperscaler fixed leases.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-navy-950 px-4 py-2.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-300 font-medium">Cluster Size:</span>
            <input
              type="range"
              min="8"
              max="256"
              step="8"
              value={gpuSliderCount}
              onChange={(e) => setGpuSliderCount(Number(e.target.value))}
              className="w-36 accent-teal-400 cursor-pointer"
            />
            <span className="text-sm font-extrabold text-teal-400 w-16 text-right">
              {gpuSliderCount} GPUs
            </span>
          </div>
        </div>

        {/* 3 Outcome Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Card 1 */}
          <div className="bg-navy-950/70 border border-slate-800 rounded-xl p-4">
            <span className="text-xs text-slate-400 font-medium">Model 1: Self-Operated</span>
            <p className="text-xs text-slate-500 mt-0.5">40% avg load, high sales overhead</p>
            <p className="text-2xl font-bold text-slate-300 mt-2">${selfOperatedMonthly.toLocaleString()} <span className="text-xs text-slate-500">/mo</span></p>
            <p className="text-xs text-slate-400 mt-1">${(selfOperatedMonthly * 12).toLocaleString()} / year</p>
          </div>

          {/* Card 2 */}
          <div className="bg-navy-950/70 border border-blue-500/20 rounded-xl p-4">
            <span className="text-xs text-blue-400 font-medium">Model 2: AWS Fixed Lease</span>
            <p className="text-xs text-slate-500 mt-0.5">Fixed $1.99/hr rate, 80% utilization cap</p>
            <p className="text-2xl font-bold text-blue-300 mt-2">${awsLeaseMonthly.toLocaleString()} <span className="text-xs text-slate-500">/mo</span></p>
            <p className="text-xs text-slate-400 mt-1">${(awsLeaseMonthly * 12).toLocaleString()} / year</p>
          </div>

          {/* Card 3 */}
          <div className="bg-teal-950/30 border border-teal-500/40 rounded-xl p-4 relative overflow-hidden glow-teal">
            <div className="absolute top-0 right-0 px-2 py-0.5 bg-teal-500/20 text-teal-300 text-[10px] font-bold rounded-bl">
              RECOMMENDED
            </div>
            <span className="text-xs text-teal-400 font-bold">Model 3: NeevCloud 60/40 Share</span>
            <p className="text-xs text-slate-400 mt-0.5">85%+ dynamic yield + MSME off-peak load</p>
            <p className="text-2xl font-bold text-emerald-400 mt-2">${neevCloudMonthly.toLocaleString()} <span className="text-xs text-slate-400">/mo</span></p>
            <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+${annualGainVsAws.toLocaleString()} Extra Profit / Year</span>
            </div>
          </div>
        </div>

        {/* Visual Chart */}
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip
                formatter={(val: any) => [`$${Number(val).toLocaleString()} / month`, 'Monthly Payout']}
                contentStyle={{ backgroundColor: '#0c1527', borderColor: '#23385e', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="revenue" fill="#14b8a6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Live Supplier Leaderboard */}
      <div className="glass-card rounded-2xl p-6 border border-slate-700/60">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-bold text-white text-base">Connected Hardware Supplier Fleets</h4>
            <p className="text-xs text-slate-400">Real-time status of data centers participating in the 60/40 revenue share</p>
          </div>
          <span className="text-xs px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full border border-teal-500/30 font-semibold">
            272 GPUs Under Yield Mgmt
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-navy-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Data Center / Location</th>
                <th className="py-3 px-4">GPU Cluster</th>
                <th className="py-3 px-4">Node Count</th>
                <th className="py-3 px-4">Live Utilization</th>
                <th className="py-3 px-4">Monthly Share</th>
                <th className="py-3 px-4">Uptime SLA</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {activeSuppliers.map((s) => (
                <tr key={s.id} className="hover:bg-navy-900/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white text-sm">{s.name}</div>
                    <div className="text-[11px] text-slate-400">{s.location}</div>
                  </td>
                  <td className="py-3 px-4 text-teal-300 font-medium">{s.gpuModel}</td>
                  <td className="py-3 px-4 font-bold text-white">{s.gpuCount} GPUs</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-navy-950 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-teal-400 h-full rounded-full"
                          style={{ width: `${s.utilization}%` }}
                        />
                      </div>
                      <span className="font-semibold text-teal-300">{s.utilization}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-400 text-sm">
                    ${s.monthlyPayout.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">{s.uptime}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. The 4 Trust Pillars for Hardware Lenders */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-navy-950/70 border border-slate-800 rounded-xl p-4">
          <div className="p-2 bg-teal-500/10 text-teal-400 rounded-lg w-fit mb-2">
            <Zap className="w-4 h-4" />
          </div>
          <h5 className="font-bold text-white text-xs mb-1">1. Automated Weekly Settlement</h5>
          <p className="text-[11px] text-slate-400">Direct escrow bank payouts based on audited GPU-second telemetry logs.</p>
        </div>

        <div className="bg-navy-950/70 border border-slate-800 rounded-xl p-4">
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg w-fit mb-2">
            <HardDrive className="w-4 h-4" />
          </div>
          <h5 className="font-bold text-white text-xs mb-1">2. Zero Asset Dilution</h5>
          <p className="text-[11px] text-slate-400">Suppliers keep hardware title on their balance sheets while claiming 100% depreciation.</p>
        </div>

        <div className="bg-navy-950/70 border border-slate-800 rounded-xl p-4">
          <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg w-fit mb-2">
            <Activity className="w-4 h-4" />
          </div>
          <h5 className="font-bold text-white text-xs mb-1">3. Real-Time Telemetry</h5>
          <p className="text-[11px] text-slate-400">Granular thermal, memory, and wattage visibility ensures zero abusive over-clocking.</p>
        </div>

        <div className="bg-navy-950/70 border border-slate-800 rounded-xl p-4">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg w-fit mb-2">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h5 className="font-bold text-white text-xs mb-1">4. 5% FLDG Risk Backstop</h5>
          <p className="text-[11px] text-slate-400">NeevCloud absorbs up to 5% portfolio default risk via First-Loss Guarantee.</p>
        </div>
      </div>
    </div>
  );
}
