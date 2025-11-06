'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/app/components/layout/header/logo'

export default function InsiderSignup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('/api/insider-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })

      const data = await res.json()
      if (data.success) setSubmitted(true)
      else setError(data.error || 'Failed to send email')
    } catch (err: any) {
      setError(err.message || 'Failed to send email')
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

        {!submitted ? (
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
              className="w-full rounded-md bg-primary px-5 py-3 text-lg font-medium text-white border border-primary hover:bg-transparent hover:text-primary transition duration-300"
            >
              Join the Insider List
            </button>
          </form>
        ) : (
          <div className="text-green-400 text-lg font-medium mt-10">
            ✅ You’re on the list! Welcome to DivvyFi Insider.
          </div>
        )}

        {error && <div className="text-red-400 mt-4">{error}</div>}

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
