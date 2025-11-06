'use client'

import Link from 'next/link'
import Logo from '@/app/components/layout/header/logo'
import { useState } from 'react'

export default function InsiderSignup() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: connect to your backend API route or Supabase table
    console.log('Insider form submitted:', { name, email })
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-br from-black via-[#0b0015] to-[#240030] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#BD24DF] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#00FFE0] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-md w-full text-center space-y-6">
        <div className="mb-6 inline-block max-w-[160px]">
          <Logo />
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold drop-shadow-[0_0_12px_rgba(189,36,223,0.8)]">
          Become an Insider
        </h1>

        <p className="text-gray-300 text-base mb-6">
          Get early access to our private beta, fractional real-world asset opportunities,
          and exclusive rewards before public launch.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-md border border-white/20 bg-transparent px-5 py-3 text-base text-white placeholder:text-gray-400 focus:border-primary focus:ring-0 transition"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-white/20 bg-transparent px-5 py-3 text-base text-white placeholder:text-gray-400 focus:border-primary focus:ring-0 transition"
              />
            </div>
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
