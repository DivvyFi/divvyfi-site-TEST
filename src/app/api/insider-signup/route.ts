'use client'

import { useState } from 'react'

export default function InsiderSignup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/insider-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('success')
      } else {
        console.error('Server error:', data.error)
        setStatus('error')
      }
    } catch (err) {
      console.error('Network error:', err)
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl mb-6">Join the Insider List</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-sm">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="p-3 rounded bg-gray-800 border border-gray-700"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          className="p-3 rounded bg-gray-800 border border-gray-700"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="p-3 rounded bg-[#BD24DF] hover:bg-[#a91fcc] transition font-semibold"
        >
          {status === 'loading' ? 'Sending...' : 'Sign Up'}
        </button>
      </form>

      {status === 'success' && (
        <p className="mt-4 text-green-400">✅ Thank you! You’ve joined the Insider List.</p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-red-400">❌ Something went wrong. Please try again later.</p>
      )}
    </div>
  )
}
