'use client'

import { useState } from 'react'
import Logo from '@/app/components/layout/header/logo'
import Link from 'next/link'

export default function InsiderSignup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/insider-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Something went wrong')
      }

      setMessage({ type: 'success', text: '✅ You’re on the list! Welcome to DivvyFi Insider.' })
      setName('')
      setEmail('')
    } catch (err: any) {
      console.error('Signup error:', err)
      setMessage({ type: 'error', text: err.message || 'Failed to submit. Try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-br from-black via-[#0b0015] to-[#240030] text-white relative overflow-hidden">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mb-6 inline-block max-w-[160px]">
          <Logo />
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold drop-shadow-[0_0_12px_rgba(189,36,223,0.8)]">
          Become an Insider
        </h1>

        <p className="text-gray-300 text-base mb-6">
          Get early access to private beta, fractional real-world assets, and exclusive rewards.
        </p>

        {message && (
          <div
            className={`mb-4 text-base font-medium ${
              message.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-md border border-white/20 bg-transparent px-5 py-3 text-base text-white placeholder:text-gray-400 focus:border-primary focus:ring-0 transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border border-white/20 bg-transparent px-5 py-3 text-base text-white placeholder:text-gray-400 focus:border-primary focus:ring-0 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary px-5 py-3 text-lg font-medium text-white border border-primary hover:bg-transparent hover:text-primary transition duration-300"
          >
            {loading ? 'Submitting...' : 'Join the Insider List'}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-8">
          Already part of the community?
          <Link href="/" className="pl-2 text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
