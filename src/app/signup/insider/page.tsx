'use client'

import { useState } from 'react';

export default function InsiderSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/insider-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Something went wrong');
      }

      setMessage({ type: 'success', text: '✅ You’re on the list! Welcome to DivvyFi Insider.' });
      setName('');
      setEmail('');
    } catch (err: any) {
      console.error('Signup error:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to submit. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-br from-black via-[#0b0015] to-[#240030] text-white">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6">Become an Insider</h1>

      {message && (
        <div className={`mb-4 ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-black border border-white/20 text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-black border border-white/20 text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-md bg-purple-700 hover:bg-purple-500 transition text-white"
        >
          {loading ? 'Submitting...' : 'Join the Insider List'}
        </button>
      </form>
    </div>
  );
}
