'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import WorkSkeleton from '../../Skeleton/Work'
import { WorkType } from '@/app/types/work'

const tiers = [
  {
    name: 'Insider',
    entry: 'Open Access (Net worth: $0–100k)',
    benefits: [
      'Access to Real-World Asset (RWA) guides',
      'Visibility into upcoming asset listings',
      'DeFi community networking events',
      'Referral & loyalty incentives',
      'Future investment opportunities',
    ],
    color: 'bg-gradient-to-r from-[#bd24df] to-[#c0c0c0]',
  },
  {
    name: 'Investor',
    entry: 'Accredited Investor (Net worth: $100k+)',
    benefits: [
      'Early access to handpicked assets',
      'Due diligence & financial reports',
      'Private networking forums',
      'Quarterly market insights',
      'Virtual lounges & webinars',
    ],
    color: 'bg-gradient-to-r from-[#bd24df] to-[#ffd700]',
  },
  {
    name: 'Founder',
    entry: 'Invitation-Only (Net worth: $250k+)',
    benefits: [
      'Prime access to high-value assets',
      'Personalized portfolio strategy',
      'Ultra-exclusive deals and events',
      'Private boardroom & voting access',
      'Co-investment with top partners',
    ],
    color: 'bg-gradient-to-r from-[#bd24df] to-[#000000]',
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
            Start Owning
          </h2>
          <p className='lg:text-lg font-normal mb-10 text-white max-w-4xl mx-auto'>
            Create an account, verify your identity, and start networking, buying, and co-owning real assets in just a few clicks — all on a secure, intuitive platform.
          </p>

          <div className='space-y-6 text-white text-left max-w-4xl mx-auto'>
            <p>
              <strong>1.</strong> Once your identity is verified, start connecting with trusted partners and link your digital wallet to verify funds.
            </p>
            <p>
              <strong>2.</strong> Discover real-world assets — from vehicles and property to businesses — that align with your shared goals.
            </p>
            <p>
              <strong>3.</strong> Co-own income-producing assets and track growth and yield directly from your DivvyFi dashboard.
            </p>
          </div>
        </div>

        {/* Membership Tiers */}
        <div className='my-16'>
          <h3 className='text-3xl font-semibold text-center mb-10 text-white'>
            Membership Tiers
          </h3>

          <div className='flex flex-col md:flex-row justify-center items-stretch gap-8'>
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-2xl shadow-lg p-6 w-full md:w-80 flex flex-col transition-transform hover:scale-105 ${tier.color} text-white`}
              >
                {/* Tier Title with Neon Glow */}
                <h4
                  className='text-2xl font-semibold mb-2 text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]'
                >
                  {tier.name}
                </h4>
                <p className='italic mb-4 text-center'>{tier.entry}</p>
                <ul className='list-disc list-inside space-y-1 text-sm flex-1'>
                  {tier.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className='mt-8 text-center text-base italic text-white max-w-3xl mx-auto'>
            DivvyFi currently <strong>does not have any membership fees</strong> and will <strong>never</strong> collect payments or private data without your consent.
            Your net worth verification is handled securely through our trusted providers. For memberships or verification questions please reach out to our help desk at mailto:info.divvyfi@gmail.com 
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
