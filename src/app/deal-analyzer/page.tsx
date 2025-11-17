"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../../components/Input";
import ResultsCard from "../../components/ResultsCard";
import DealChart from "../../components/DealChart";
import LoadingSpinner from "../../components/LoadingSpinner";
import { analyzeDeal } from "../../lib/api";

export default function DealAnalyzerPage() {
  const [form, setForm] = useState({
    purchasePrice: "",
    revenue: "",
    expenses: "",
    sde: "",
    downPayment: "",
    interestRate: "",
    loanYears: "",
    partners: "1",
    projectedGrowth: "0.05",
    industry: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  function updateField(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function submit() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // convert numbers where appropriate
      const payload = {
        ...form,
        purchasePrice: Number(form.purchasePrice || 0),
        revenue: Number(form.revenue || 0),
        expenses: Number(form.expenses || 0),
        sde: Number(form.sde || 0),
        debtTerms: {
          downPayment: Number(form.downPayment || 0),
          interestRate: Number(form.interestRate || 0),
          loanYears: Number(form.loanYears || 0),
        },
        partners: Array.from({ length: Number(form.partners || 1) }).map((_, i) => ({ name: `P${i+1}`, equity: Math.round(100 / Number(form.partners || 1)) })),
        investors: [],
        projectedGrowth: Number(form.projectedGrowth || 0.05),
        industry: form.industry,
        location: form.location,
      };

      const res = await analyzeDeal(payload);
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b021a] to-[#160233] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <motion.header initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">DivvyFi — Deal Analyzer</h1>
          <p className="text-center text-purple-300 mt-2 max-w-2xl mx-auto">
            Analyze business acquisitions for fractional ownership — partner risk, cashflow, investor returns, and a clear Deal Score.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Form */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-1 bg-[#15072a] border border-purple-800 rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Deal Inputs</h2>

            <Input label="Purchase Price ($)" name="purchasePrice" value={form.purchasePrice} onChange={updateField} />
            <Input label="Annual Revenue ($)" name="revenue" value={form.revenue} onChange={updateField} />
            <Input label="Annual Expenses ($)" name="expenses" value={form.expenses} onChange={updateField} />
            <Input label="SDE / EBITDA ($)" name="sde" value={form.sde} onChange={updateField} />

            <div className="grid grid-cols-2 gap-2">
              <Input label="Down Payment ($)" name="downPayment" value={form.downPayment} onChange={updateField} />
              <Input label="Interest Rate (%)" name="interestRate" value={form.interestRate} onChange={updateField} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Input label="Loan Years" name="loanYears" value={form.loanYears} onChange={updateField} />
              <Input label="Partners" name="partners" value={form.partners} onChange={updateField} />
            </div>

            <Input label="Projected Annual Growth (dec)" name="projectedGrowth" value={form.projectedGrowth} onChange={updateField} />
            <Input label="Industry" name="industry" value={form.industry} onChange={updateField} />
            <Input label="Location" name="location" value={form.location} onChange={updateField} />

            <button
              onClick={submit}
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-purple-600 to-violet-500 py-3 rounded-lg font-semibold shadow hover:brightness-105 disabled:opacity-60"
            >
              {loading ? <LoadingSpinner /> : "Run Analysis"}
            </button>

            {error && <div className="mt-3 text-red-400 text-sm">{error}</div>}
          </motion.div>

          {/* RIGHT: Results */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-2 space-y-6">
            {result ? (
              <>
                <ResultsCard title="Deal Summary" result={result} />
                <div className="bg-[#130620] border border-purple-900 rounded-xl p-6 shadow">
                  <h3 className="text-lg font-semibold mb-4">Cashflow & Projections</h3>
                  <DealChart data={result?.cashflowProjection || sampleProjection(result)} />
                </div>
                <div className="bg-[#0f0520] border border-purple-900 rounded-xl p-6 shadow">
                  <h3 className="text-lg font-semibold mb-3">AI Recommendations</h3>
                  <ul className="list-disc ml-5 text-sm text-purple-200">
                    {(result.recommendations || []).slice(0, 8).map((r:any, idx:number) => (
                      <li key={idx} className="mb-2">{r}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="bg-[#11031a] border border-purple-900 rounded-xl p-8 text-center text-purple-300">
                Enter deal inputs and click <strong>Run Analysis</strong> to see results here.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/** fallback sample projection generator */
function sampleProjection(result:any) {
  if (!result) {
    return Array.from({ length: 5 }).map((_, i) => ({ year: i+1, cashflow: 20000 * (i+1) }));
  }
  return result.cashflowProjection || Array.from({ length: 5 }).map((_, i) => ({ year: i+1, cashflow: (result.profitability?.annualCashflow || 0) * Math.pow(1 + (result.projectedGrowth || 0.05), i) }));
}
