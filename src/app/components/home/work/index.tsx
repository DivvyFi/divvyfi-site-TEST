'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import WorkSkeleton from '../../Skeleton/Work'
import { WorkType } from '@/app/types/work'
import { motion } from 'framer-motion'
import Link from 'next/link'

// Main fallback signup URL
const SIGNUP_URL = '/signup'

// Tier definitions with optional href and glow color
const tiers = [
  {
    name: 'Insider',
    entry: 'Open Access ($0–100k)',
    benefits: [
      'Visibility into upcoming asset listings',
      'DeFi community networking events',
      'Referral & loyalty incentives',
      'Future investment opportunities',
      'Access to Real-World Asset guides',
    ],
    color: 'bg-gradient-to-b from-[#bd24df] to-[#2d6ade]',
    glowColor: 'rgba(189,36,223,0.8)',
    href: '/signup/insider',
  },
  {
    name: 'Investor',
    entry: 'Accredited Investor ($100k+)',
    benefits: [
      'Early access to handpicked assets',
      'Due diligence & financial reports',
      'Private networking forums',
      'Quarterly market insights',
      'Virtual lounges & webinars',
    ],
    color: 'bg-gradient-to-b from-[#bd24df] to-[#2d6ade]',
    glowColor: 'rgba(189,36,223,0.8)',
  },
  {
    name: 'Founder',
    entry: 'Invitation Only ($250k+)',
    benefits: [
      'Prime access to high-value assets',
      'Personalized portfolio strategy',
      'Ultra-exclusive deals and events',
      'Private boardroom & voting access',
      'Co-investment with top partners',
    ],
    color: 'bg-gradient-to-b from-[#bd24df] to-[#2d6ade]',
    glowColor: 'rgba(189,36,223,0.8)',
    href: '/signup/founder',
  },
]

const Work = () => {
  const [workdata, setWorkdata] = useState<WorkType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setWorkdata(data?.workdata)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section className='relative'>
      <div className='bg-banner-image absolute w-full h-full right-auto blur-390' />

      <div className='container'>
        {/* Intro Text */}
        <div className='text-center mb-14'>
          <h2 className='mb-10 text-4xl font-semibold text-white capitalize'>
            Join a Community
          </h2>
          <p className='font-normal text-left mb-10 text-white max-w-3xl mx-auto'>
          <span>
    At DivvyFi, we’re not just helping you invest, we’re helping you join a community of innovators, dreamers, and doers who are turning digital possibilities into real-world wealth. Every connection you make, every asset you explore, every co-ownership you take part in brings you closer to financial freedom.
          </span>
          <span className='block mt-4'>
    Own, share, and earn from real-world assets you never thought possible, from vehicles and property to thriving businesses without needing to navigate complex systems or endless paperwork. The journey is exciting, and the rewards are tangible. Join a community and start turning your digital wallet into tangible wealth today.
         </span>
          </p>
          <div className='space-y-6 text-white text-left max-w-3xl mx-auto'>
            <p>
              <strong>Verify & Connect:</strong> Secure your account, link your wallet, and start networking with trusted partners.
            </p>
            <p>
              <strong>Discover & Invest:</strong> Find and in invest in property, or businesses that align with your partners shared goals.
            </p>
            <p>
              <strong>Co-own & Earn:</strong> Own income producing assets, share them and track their growth all from the dashboard.
            </p>
          </div>
        </div>

        {/* Membership Tiers */}
        <div className='my-16'>
          <h3 className='text-3xl font-semibold text-center mb-10 text-white drop-shadow-[0_0_12px_rgba(189,36,223,0.8)]'>
            Membership Tiers
          </h3>

          <div className='flex flex-col md:flex-row justify-center items-stretch gap-8'>
            {tiers.map((tier, index) => (
              <Link key={index} href={tier.href || SIGNUP_URL}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative rounded-2xl shadow-lg p-6 w-full md:w-80 flex flex-col transition-transform ${tier.color} text-white border border-white/20 backdrop-blur-md cursor-pointer`}
                  style={{
                    boxShadow: `0 0 10px transparent`,
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 25px 5px ${tier.glowColor}`
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 10px transparent`
                  }}
                >
                  <h4 className='text-2xl font-semibold mb-2 text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]'>
                    {tier.name}
                  </h4>
                  <p className='italic mb-4 text-center'>{tier.entry}</p>
                  <ul className='list-disc list-inside space-y-1 text-sm flex-1'>
                    {tier.benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </motion.div>
              </Link>
            ))}
          </div>

          <p className='mt-8 text-center text-base italic text-white max-w-3xl mx-auto'>
            DivvyFi currently <strong>does not have any membership fees</strong> and will <strong>never</strong> collect payments or private data without your consent.
            Your net worth verification is handled securely through our trusted providers. For membership or verification questions, please reach out to our help.
          </p>
        </div>

        {/* Existing Work Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-5 mt-20'>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <WorkSkeleton key={i} />)
            : workdata?.map((items, i) => (
                <div
                  className='bg-darkmode border border-darkmode group hover:border-primary hover:scale-105 duration-300 p-8 relative rounded-2xl hover:mb-5'
                  key={i}
                >
                  <div className='rounded-full flex justify-center absolute -top-10 left-[40%] p-6 bg-gradient-to-r from-primary to-secondary'>
                    <Image
                      src={items.imgSrc}
                      alt={items.heading || 'icon'}
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className='flex justify-center'>
                    <Image
                      src='/images/icons/bg-arrow.svg'
                      alt='arrow-bg'
                      width={85}
                      height={35}
                    />
                  </div>
                  <p className='text-2xl text-white font-semibold text-center mt-8 capitalize drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]'>
                    {items.heading}
                  </p>
                  <p className='text-base font-normal text-white text-center mt-2 overflow-hidden line-clamp-3 group-hover:h-auto group-hover:line-clamp-none transition-all duration-300'>
                    {items.subheading}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

export default Work
