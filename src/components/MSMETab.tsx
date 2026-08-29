import React, { useState } from 'react';
import {
  Award, CreditCard, Clock, TrendingUp, CheckCircle2, Zap, Shield,
  ArrowRight, DollarSign, FileText, Check, AlertCircle, Sparkles, ChevronRight
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts';

interface MSMETabProps {
  price: number;
}

const scoreHistory = [
  { month: 'Month 1', score: 650, tier: 'Bronze', limit: 500 },
  { month: 'Month 2', score: 685, tier: 'Bronze', limit: 800 },
  { month: 'Month 3', score: 720, tier: 'Silver', limit: 1500 },
  { month: 'Month 4', score: 745, tier: 'Silver', limit: 2500 },
  { month: 'Month 5', score: 765, tier: 'Gold', limit: 5000 },
];

const workloadPresets = [
  {
    id: 'llama',
    name: 'Fine-tune LLaMA-3 70B (LoRA)',
    hardware: '8x NVIDIA H200 SXM5',
    hours: 48,
    onDemandCost: 764,
    reservedCreditCost: 460,
    monthlyInstallment: 153.33,
    savings: 304,
  },
  {
    id: 'sdxl',
    name: 'Diffusion Video Model Batch Inference',
    hardware: '4x NVIDIA H200 SXM5',
    hours: 36,
    onDemandCost: 286,
    reservedCreditCost: 172,
    monthlyInstallment: 57.33,
    savings: 114,
  },
  {
    id: 'deepseek',
    name: 'DeepSeek-V3 Domain Adaptation',
    hardware: '16x NVIDIA H200 SXM5',
    hours: 72,
    onDemandCost: 2292,
    reservedCreditCost: 1380,
    monthlyInstallment: 460.00,
    savings: 912,
  },
];

export default function MSMETab({ price }: MSMETabProps) {
  const [selectedPreset, setSelectedPreset] = useState(workloadPresets[0]);
  const [showKfsModal, setShowKfsModal] = useState(false);
  const [jobApplied, setJobApplied] = useState(false);

  return (
    <div className="space-y-8">
      {/* 1. Header Explanation Pill */}
      <div className="bg-navy-900 border border-blue-500/30 rounded-2xl p-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  DEMAND-SIDE FINTECH
                </span>
                <span className="text-xs text-slate-400">Alternative Underwriting for MSMEs</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                Embedded Compute Credit Line & Job Micro-Financing
              </h3>
            </div>
          </div>
          <div className="text-xs text-slate-300 bg-navy-950 px-3.5 py-2 rounded-xl border border-slate-800">
            Credit Model: <span className="text-blue-400 font-bold">Usage Telemetry Underwriting</span> (Zero Physical Collateral)
          </div>
        </div>
      </div>

      {/* 2. Top Stats: The MSME Profile */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4 border border-amber-500/30">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Compute Score</span>
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded font-bold">Gold Tier</span>
          </div>
          <p className="text-3xl font-extrabold text-amber-400 mt-2">765 <span className="text-xs text-slate-400 font-normal">/ 850</span></p>
          <p className="text-xs text-emerald-400 mt-1">Top 8% of AI MSMEs in India</p>
        </div>

        <div className="glass-card rounded-xl p-4 border border-teal-500/30">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Sanctioned Credit Line</span>
            <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded font-bold">30-Day Revolving</span>
          </div>
          <p className="text-3xl font-extrabold text-teal-300 mt-2">$5,000</p>
          <p className="text-xs text-slate-300 mt-1">$3,620 available today</p>
        </div>

        <div className="glass-card rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Effective GPU Rate</span>
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded font-bold">Reserved Tier</span>
          </div>
          <p className="text-3xl font-extrabold text-blue-300 mt-2">$1.20 <span className="text-xs text-slate-400 font-normal">/ hr</span></p>
          <p className="text-xs text-emerald-400 mt-1">40% cheaper than On-Demand</p>
        </div>

        <div className="glass-card rounded-xl p-4 border border-purple-500/30">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Net Monthly Savings</span>
            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded font-bold">Reinvested</span>
          </div>
          <p className="text-3xl font-extrabold text-purple-300 mt-2">$158 <span className="text-xs text-slate-400 font-normal">/ mo</span></p>
          <p className="text-xs text-slate-300 mt-1">$1,896 / yr retained capital</p>
        </div>
      </div>

      {/* 3. The 4 Underwriting Signals (How the Compute Score is calculated) */}
      <div className="glass-card rounded-2xl p-6 border border-slate-700/60">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Alternative Credit Engine
            </span>
            <h4 className="text-lg font-bold text-white mt-0.5">
              Multi-Signal Telemetry Underwriting Engine
            </h4>
            <p className="text-xs text-slate-400">
              Traditional banks require 3 years of audited P&amp;L and property collateral. NeevSetu underwrites in 3 seconds from GPU telemetry.
            </p>
          </div>
          <span className="text-xs px-3 py-1 bg-navy-950 text-slate-300 rounded-lg border border-slate-800">
            Compliant with <span className="text-teal-400 font-semibold">RBI Account Aggregator (AA)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {/* Signal 1 */}
          <div className="bg-navy-950/70 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-slate-200">1. Compute Velocity</span>
              <span className="text-teal-400 font-bold">35% Weight</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">Trailing 90-day GPU burn stability</p>
            <div className="text-lg font-extrabold text-white">280 hrs / mo</div>
            <div className="w-full bg-navy-900 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-teal-400 h-full rounded-full" style={{ width: '92%' }} />
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">Score: 92/100 (High Consistency)</span>
          </div>

          {/* Signal 2 */}
          <div className="bg-navy-950/70 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-slate-200">2. Job Completion Ratio</span>
              <span className="text-blue-400 font-bold">25% Weight</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">% of runs completed vs aborted</p>
            <div className="text-lg font-extrabold text-white">96.4% Completed</div>
            <div className="w-full bg-navy-900 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-blue-400 h-full rounded-full" style={{ width: '96%' }} />
            </div>
            <span className="text-[10px] text-blue-400 font-semibold mt-1 block">Revenue-generation proxy</span>
          </div>

          {/* Signal 3 */}
          <div className="bg-navy-950/70 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-slate-200">3. Workload Risk Profile</span>
              <span className="text-purple-400 font-bold">20% Weight</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">Inference vs R&amp;D Training Mix</p>
            <div className="text-lg font-extrabold text-white">70% Inference</div>
            <div className="w-full bg-navy-900 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-purple-400 h-full rounded-full" style={{ width: '85%' }} />
            </div>
            <span className="text-[10px] text-purple-300 font-semibold mt-1 block">Stable cash flow stream</span>
          </div>

          {/* Signal 4 */}
          <div className="bg-navy-950/70 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-slate-200">4. Payment Track Record</span>
              <span className="text-emerald-400 font-bold">20% Weight</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">On-time micro-billing history</p>
            <div className="text-lg font-extrabold text-white">100% On-Time</div>
            <div className="w-full bg-navy-900 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">Zero default track record</span>
          </div>
        </div>
      </div>

      {/* 4. Interactive Job-Level Micro-Financing (BNPL for Compute) */}
      <div className="glass-card rounded-2xl p-6 border border-teal-500/30 glow-teal">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold border border-teal-500/30">
                JOB-LEVEL BNPL CALCULATOR
              </span>
              <span className="text-xs text-slate-400">Micro-Financing at the API Layer</span>
            </div>
            <h4 className="text-xl font-bold text-white mt-1">
              Run Heavy AI Jobs Now, Pay in Flexible Installments
            </h4>
          </div>
          <div className="text-xs text-slate-400">
            Selected Workload: <span className="text-white font-bold">{selectedPreset.name}</span>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
          {workloadPresets.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedPreset(preset);
                  setJobApplied(false);
                }}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-teal-950/40 border-teal-500 text-white shadow-lg'
                    : 'bg-navy-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-white">{preset.name}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
                </div>
                <div className="text-[11px] text-slate-400">{preset.hardware} ({preset.hours}h run)</div>
              </button>
            );
          })}
        </div>

        {/* Comparison Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Option A: Cash Upfront */}
          <div className="bg-navy-950/80 border border-slate-800 rounded-xl p-5">
            <span className="text-xs text-slate-400 font-semibold uppercase">Option 1: Traditional On-Demand</span>
            <p className="text-3xl font-extrabold text-slate-200 mt-2">${selectedPreset.onDemandCost.toFixed(2)}</p>
            <p className="text-xs text-rose-400 mt-1">Requires 100% upfront cash burn before job starts</p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
              <div>• Billed at spot/on-demand full rate ($1.99/hr)</div>
              <div>• Cash flow drain for early-stage startups</div>
            </div>
          </div>

          {/* Option B: Compute Credit Line */}
          <div className="bg-gradient-to-br from-teal-950/50 to-navy-900 border border-teal-500/50 rounded-xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-teal-500 text-navy-950 font-bold text-xs rounded-bl-lg">
              SAVE ${selectedPreset.savings} (40%)
            </div>
            <span className="text-xs text-teal-300 font-semibold uppercase">Option 2: Compute Credit Line</span>
            <p className="text-3xl font-extrabold text-emerald-400 mt-2">
              3 × ${selectedPreset.monthlyInstallment.toFixed(2)} <span className="text-xs text-slate-400 font-normal">/ mo</span>
            </p>
            <p className="text-xs text-teal-300 mt-1 font-semibold">Total: ${selectedPreset.reservedCreditCost} (Reserved Discounted Rate)</p>
            <div className="mt-4 pt-3 border-t border-teal-500/20 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Check className="w-3.5 h-3.5" /> Instant sanction via Compute Score (765)
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Check className="w-3.5 h-3.5" /> Zero upfront CapEx shock
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            Backed by <span className="text-teal-400 font-semibold">RBI-Regulated NBFC Partner</span> • 0% Prepayment Penalty
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowKfsModal(true)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-teal-400" />
              View RBI Key Fact Statement (KFS)
            </button>

            <button
              onClick={() => setJobApplied(true)}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                jobApplied
                  ? 'bg-emerald-500 text-navy-950 cursor-default'
                  : 'bg-teal-400 hover:bg-teal-300 text-navy-950 shadow-lg shadow-teal-500/20'
              }`}
            >
              {jobApplied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Credit Sanctioned &amp; Job Queued!
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Sanction Credit &amp; Dispatch Job
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Score Progression Chart */}
      <div className="glass-card rounded-2xl p-6 border border-slate-700/60">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-bold text-white text-base">Your Compute Score &amp; Credit Limit Growth</h4>
            <p className="text-xs text-slate-400">As your workload history matures, your credit limit expands and rate discounts deepen</p>
          </div>
          <span className="text-xs px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30 font-semibold">
            650 → 765 Score Trajectory
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[600, 800]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0c1527', borderColor: '#23385e', borderRadius: '8px', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} name="Compute Score" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KFS Modal Disclosure */}
      {showKfsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-teal-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal-400" />
                <h5 className="font-bold text-white text-base">RBI Mandated Key Fact Statement (KFS)</h5>
              </div>
              <button
                onClick={() => setShowKfsModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Regulated Entity (Lender):</span>
                <span className="font-semibold text-white">Partnered NBFC (RBI Reg: N-14.0321)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Lending Service Provider (LSP):</span>
                <span className="font-semibold text-teal-400">NeevCloud Sovereign Compute</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Sanctioned Amount:</span>
                <span className="font-semibold text-white">${selectedPreset.reservedCreditCost}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Repayment Schedule:</span>
                <span className="font-semibold text-white">3 Monthly Installments of ${selectedPreset.monthlyInstallment.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Annual Percentage Rate (APR):</span>
                <span className="font-semibold text-emerald-400">0.00% (Subsidized via Reserved Margin)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Collateral / Security:</span>
                <span className="font-semibold text-white">Self-Collateralizing GPU Instance Suspension</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Cooling-off Period:</span>
                <span className="font-semibold text-white">3 Days as per RBI DL Guidelines</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowKfsModal(false)}
                className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-navy-950 text-xs font-bold rounded-lg"
              >
                Acknowledge &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
