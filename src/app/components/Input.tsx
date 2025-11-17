import React from "react";

export default function Input({ label, name, value, onChange, type = "text" }: any) {
  return (
    <div className="mb-3">
      <label className="block text-sm text-purple-300 mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="w-full bg-[#0e051e] border border-purple-700 text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}
