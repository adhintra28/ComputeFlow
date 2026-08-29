import React from 'react';
import {
  ShieldCheck, Landmark, Scale, FileText, CheckCircle2, TrendingUp,
  HeartHandshake, Sparkles, AlertCircle, Building, Users, Globe2
} from 'lucide-react';

export default function FintechImpactTab() {
  return (
    <div className="space-y-8">
      {/* 1. Top Banner */}
      <div className="bg-navy-900 border border-emerald-500/30 rounded-2xl p-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  REGULATORY &amp; IMPACT ARCHITECTURE
                </span>
                <span className="text-xs text-slate-400">Innovation Unbound Core Criteria</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                RBI Digital Lending Compliance &amp; Sovereign AI Inclusion
              </h3>
            </div>
          </div>
          <div className="text-xs text-slate-300 bg-navy-950 px-3.5 py-2 rounded-xl border border-slate-800">
            Regulated Rails: <span className="text-emerald-400 font-bold">LSP + NBFC Partner</span> • <span className="text-teal-400 font-bold">Account Aggregator</span>
          </div>
        </div>
      </div>

      {/* 2. The 4 Pillars of RBI Fintech Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1 */}
        <div className="glass-card rounded-2xl p-6 border border-slate-700/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-teal-500/20 text-teal-400 rounded-lg">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">1. Lending Service Provider (LSP) Model</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Under the <strong>RBI Digital Lending Guidelines (April 2024 update)</strong>, non-financial tech platforms cannot lend off their balance sheet. NeevCloud acts strictly as an <strong>LSP</strong>, routing loan origination and compute telemetry directly to an RBI-registered NBFC or Scheduled Commercial Bank.
          </p>
          <div className="space-y-2 text-xs text-slate-400 bg-navy-950 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Direct bank-to-bank settlement (Zero pass-through accounts)
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Real-time 3-second Key Fact Statement (KFS) generation
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Transparent APR disclosures with zero hidden processing cuts
            </div>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="glass-card rounded-2xl p-6 border border-slate-700/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">2. 5% First Loss Default Guarantee (FLDG)</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            RBI permits LSPs to provide up to a <strong>5% First Loss Default Guarantee</strong> on the credit portfolio. NeevCloud backs the NBFC with a 5% FLDG pool funded through reserved platform margins, protecting lenders against early default while ensuring skin-in-the-game.
          </p>
          <div className="space-y-2 text-xs text-slate-400 bg-navy-950 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> 100% compliant with RBI FLDG framework guidelines
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> De-risks institutional capital entering compute asset financing
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Self-liquidating portfolio with instant GPU instance reclaiming
            </div>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="glass-card rounded-2xl p-6 border border-slate-700/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
              <Building className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">3. Account Aggregator (AA) &amp; OCEN Rails</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            In addition to real-time GPU telemetry, MSMEs can consent via the <strong>RBI Account Aggregator framework</strong> to share cash-flow and GST transaction velocity. This hybrid underwriting model gives unbanked startups instant credit access.
          </p>
          <div className="space-y-2 text-xs text-slate-400 bg-navy-950 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Integrates with Sahamati-approved Account Aggregators (Setu, Anumati)
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Replaces rigid 3-year P&amp;L requirements with live cash velocity
            </div>
          </div>
        </div>

        {/* Pillar 4 */}
        <div className="glass-card rounded-2xl p-6 border border-slate-700/60">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Landmark className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">4. RBI Regulatory Sandbox Readiness</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            NeevSetu qualifies under the <strong>RBI Regulatory Sandbox Theme for MSME Lending &amp; Alternative Underwriting</strong>. With a minimal net worth threshold of ₹10 Lakhs, the sandbox enables live cohort testing of Compute Score underwriting.
          </p>
          <div className="space-y-2 text-xs text-slate-400 bg-navy-950 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> On-tap regulatory application pathway
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Direct testing environment for asset-backed micro-credit innovations
            </div>
          </div>
        </div>
      </div>

      {/* 3. Social Impact & IndiaAI Alignment */}
      <div className="glass-card rounded-2xl p-6 border border-teal-500/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-teal-500/20 text-teal-400 rounded-xl">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white">Social Impact &amp; Democratization of Indian AI</h4>
            <p className="text-xs text-slate-400">Transforming India's $380B+ MSME credit gap into sovereign tech capacity</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-navy-950/70 border border-slate-800 rounded-xl p-4">
            <div className="text-2xl font-extrabold text-teal-300">$380B+</div>
            <div className="text-xs font-semibold text-white mt-1">India MSME Credit Gap</div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              84% of Indian MSMEs lack formal bank lines. NeevSetu converts compute usage into a bankable asset class.
            </p>
          </div>

          <div className="bg-navy-950/70 border border-slate-800 rounded-xl p-4">
            <div className="text-2xl font-extrabold text-blue-300">₹10,371 Cr</div>
            <div className="text-xs font-semibold text-white mt-1">IndiaAI Mission Synergy</div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Expands national subsidized compute reach beyond elite research labs to grassroot MSMEs across Tier-2/3 India.
            </p>
          </div>

          <div className="bg-navy-950/70 border border-slate-800 rounded-xl p-4">
            <div className="text-2xl font-extrabold text-purple-300">10,000+</div>
            <div className="text-xs font-semibold text-white mt-1">AI Startups Empowered</div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              Democratizes high-end compute (H100/H200) without forcing founders to dilute equity or pledge physical land.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
