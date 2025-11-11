"use client";

import { useState } from "react";

export default function InsiderSignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/insider-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Thanks for joining! You’ll get early access updates soon.");
        setName("");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-br from-black via-[#0b0015] to-[#240030] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#BD24DF] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#7100A8] rounded-full blur-[160px]" />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center drop-shadow-lg">
        Join the Insider List
      </h1>
      <p className="text-center text-gray-300 max-w-md mb-8">
        Get early access to private beta, fractional real-world assets, and exclusive rewards.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-3 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BD24DF]"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BD24DF]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[#BD24DF] hover:bg-[#A020C9] text-white font-semibold py-3 px-6 rounded-md transition-all disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Sign Up"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-6 text-sm ${
            status === "success"
              ? "text-green-400"
              : status === "error"
              ? "text-red-400"
              : "text-gray-300"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
