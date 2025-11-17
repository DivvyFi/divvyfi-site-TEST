import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function DealChart({ data = [] }: any) {
  const chartData = data.map((d:any) => ({ name: `Y${d.year}`, value: Number(d.cashflow || 0) }));
  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1b0d2b" />
          <XAxis dataKey="name" stroke="#a78bfa" />
          <YAxis stroke="#a78bfa" />
          <Tooltip formatter={(v:number) => `$${(v || 0).toLocaleString()}`} />
          <Area type="monotone" dataKey="value" stroke="#7c3aed" fill="url(#colorCash)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
