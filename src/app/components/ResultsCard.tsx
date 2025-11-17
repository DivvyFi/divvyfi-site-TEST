import React from "react";

export default function ResultsCard({ title, result }: any) {
  const dscr = result?.debtAnalysis?.dscr ?? null;
  const dealScore = result?.dealScore ?? null;
  return (
    <div className="bg-[#120726] border border-purple-800 rounded-xl p-6 shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="text-right">
          <div className="text-xs text-purple-300">Deal Score</div>
          <div className="text-2xl font-bold">{dealScore ?? "--"}/100</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Stat label="Annual Cashflow" value={formatMoney(result?.profitability?.annualCashflow)} />
        <Stat label="Monthly Cashflow" value={formatMoney(result?.profitability?.monthlyCashflow)} />
        <Stat label="ROI" value={`${(result?.profitability?.roi ?? "--")}%`} />
        <Stat label="Payback (yrs)" value={result?.profitability?.paybackPeriodYears ?? "--"} />
      </div>

      <div className="mt-6 border-t border-purple-900 pt-4 text-sm text-purple-200">
        <div className="mb-2"><strong>Risk Level:</strong> <span className="ml-2">{result?.riskLevel ?? "—"}</span></div>
        <div className="mb-2"><strong>DSCR:</strong> <span className="ml-2">{dscr ?? "—"}</span></div>
        <div><strong>Suggested Offer:</strong> <span className="ml-2">{formatMoney(result?.valuation?.suggestedOfferPrice)}</span></div>
      </div>
    </div>
  );
}

function Stat({ label, value }: any) {
  return (
    <div className="bg-[#0f0520] border border-purple-900 rounded-md p-3">
      <div className="text-xs text-purple-300">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function formatMoney(num:any) {
  if (num == null || Number.isNaN(num)) return "--";
  return `$${Number(num).toLocaleString()}`;
}
