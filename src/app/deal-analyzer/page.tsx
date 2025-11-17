"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function DealAnalyzerPage() {
  const [form, setForm] = useState({
    revenue: "",
    expenses: "",
    ebitda: "",
    askingPrice: "",
    riskScore: "",
    partnerCount: "",
  });

  const [valuation, setValuation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function analyzeDeal() {
    setLoading(true);

    // Example mock valuation logic (replace with API call)
    const netIncome =
      Number(form.revenue) - Number(form.expenses);

    const multiplier = 3.2; // sample EBITDA multiple
    const estimatedValue = Number(form.ebitda) * multiplier;

    setValuation({
      netIncome,
      estimatedValue,
      underValued: estimatedValue > Number(form.askingPrice),
      partnerRisk:
        Number(form.riskScore) >= 7
          ? "High Risk"
          : Number(form.riskScore) >= 4
          ? "Moderate Risk"
          : "Low Risk",
      perPartnerContribution:
        Number(form.askingPrice) / Number(form.partnerCount || 1),
    });

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b021a] to-[#160233] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-2 text-center"
        >
          DivvyFi Deal Analyzer
        </motion.h1>
        <p className="text-center text-purple-300 mb-10">
          AI-powered valuation for fractional business acquisitions
        </p>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#15072a] border border-purple-800 rounded-xl p-6 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

            <Input
              label="Annual Revenue ($)"
              name="revenue"
              value={form.revenue}
              onChange={handleChange}
            />

            <Input
              label="Annual Expenses ($)"
              name="expenses"
              value={form.expenses}
              onChange={handleChange}
            />

            <Input
              label="EBITDA ($)"
              name="ebitda"
              value={form.ebitda}
              onChange={handleChange}
            />

            <Input
              label="Asking Price ($)"
              name="askingPrice"
              value={form.askingPrice}
              onChange={handleChange}
            />

            <Input
              label="Risk Score (1-10)"
              name="riskScore"
              value={form.riskScore}
              onChange={handleChange}
            />

            <Input
              label="Number of Partners"
              name="partnerCount"
              value={form.partnerCount}
              onChange={handleChange}
            />
          </div>

          <button
            onClick={analyzeDeal}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 transition rounded-lg py-3 font-semibold"
          >
            {loading ? "Analyzing..." : "Run Deal Analysis"}
          </button>
        </motion.div>

        {/* RESULTS */}
        {valuation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 bg-[#1a0c33] border border-purple-900 p-6 rounded-xl shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-4">Analysis Results</h2>

            <Result label="Net Income" value={`$${valuation.netIncome.toLocaleString()}`} />
            <Result label="Estimated Business Value" value={`$${valuation.estimatedValue.toLocaleString()}`} />
            <Result
              label="Under Valued?"
              value={valuation.underValued ? "YES — Good Deal" : "NO — Overpriced"}
            />
            <Result label="Partner Risk Level" value={valuation.partnerRisk} />
            <Result
              label="Contribution Per Partner"
              value={`$${valuation.perPartnerContribution.toLocaleString()}`}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block mb-1 text-purple-300 text-sm">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-[#0e051e] border border-purple-700 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}

function Result({ label, value }: any) {
  return (
    <div className="flex justify-between py-2 border-b border-purple-900">
      <span className="text-purple-300">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
