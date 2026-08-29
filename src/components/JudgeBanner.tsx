import React, { useState } from 'react';
import { Sparkles, HelpCircle, CheckCircle2, ArrowRight, ShieldCheck, Zap, ChevronDown, ChevronUp } from 'lucide-react';

export default function JudgeBanner() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-teal-500/30 rounded-2xl p-5 mb-8 shadow-xl relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-3 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500/20 border border-teal-500/40 rounded-xl text-teal-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  Innovation Unbound Hackathon
                </span>
                <span className="text-xs text-slate-400">
                  Banking, Financial Inclusion & Social Impact
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1">
                Executive Pitch & Judge's 30-Second Guide
              </h2>
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-navy-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            {expanded ? (
              <>
                <span>Collapse Guide</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Expand 30-Second Cheat Sheet</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {expanded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-1">
            {/* Box 1: The Bottleneck */}
            <div className="bg-navy-950/60 border border-rose-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm mb-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                1. The Two-Sided Bottleneck
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">NeevCloud</strong> cannot spend $500k+ CapEx per cluster. <strong className="text-white">Data centers</strong> won't lease without utilization proof. Meanwhile, <strong className="text-white">10,000+ AI MSMEs</strong> are locked out of reserved discounts because they can't front upfront prepayments.
              </p>
            </div>

            {/* Box 2: The Two-Sided Financial Engine */}
            <div className="bg-navy-950/60 border border-teal-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm mb-2">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                2. Two-Sided Financial Solution
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-teal-300">Module A (Supply):</strong> Dynamic pricing maximizes cluster yield (85%+ load), letting suppliers earn <span className="text-teal-300 font-semibold">+$10.8k/GPU/yr</span> on revenue-share. <br />
                <strong className="text-blue-300">Module B (Demand):</strong> Usage-based credit line lets MSMEs access 40% reserved savings in installments.
              </p>
            </div>

            {/* Box 3: Why It Wins Banking & Fintech */}
            <div className="bg-navy-950/60 border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                3. The Fintech & Social Impact
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Underwritten by <strong className="text-white">"Compute Score"</strong> (real-time GPU telemetry replacing thin credit files). Complies with <strong className="text-white">RBI Digital Lending (LSP model)</strong> with instant self-collateralizing compute asset recovery.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
