'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import WorkSkeleton from '../../Skeleton/Work'
import { WorkType } from '@/app/types/work'

const tiers = [
  {
    name: 'Community Insider',
    entry: 'Open application',
    benefits: [
      'Educational content & guides',
      'Visibility into upcoming assets',
      'Community networking',
      'Referral & loyalty incentives',
      'Gamified investment experiences',
    ],
    color: 'bg-white text-[#2d6ade] border-2 border-[#2d6ade]'
  },
  {
    name: 'Premier Investor',
    entry: 'Accredited investor ($100k+)',
    benefits: [
      'Early access to curated assets',
      'Virtual lounges & webinars',
      'Due diligence & financial reports',
      'Private networking forums',
      'Quarterly market insights',
      'Upgrade to Founders Circle',
    ],
    color: 'bg-[#2d6ade] text-white'
  },
  {
    name: 'Founders Circle',
    entry: 'Invitation-only ($250k+)',
    benefits: [
      'First access to high-value assets',
      'Personalized portfolio strategy',
      'Ultra-exclusive events',
      'Private boardroom & voting',
      'Recognition badge on dashboard',
      'Co-investment with top partners',
    ],
    color: 'bg-gradient-to-r from-[#bd24df] to-[#2d6ade] text-white'
  },
];

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
          <h2 className='mb-10 capitalize'>DivvyFi Club Member</h2>
          <p className='lg:text-lg font-normal mb-10 text-white text-center sm:text-start'>
            Getting started is simple. Create an account and verify your identity. Then you can start networking, buying, owning, and using real assets in just a few clicks all on a secure and intuitive platform.
          </p>
          <p className='lg:text-lg font-normal mb-7 text-white text-center sm:text-left'>
            1. Create an account and verify your identity to get started securely. Start by linking your digital wallet and connecting with trusted partners. Once your funds are verified you’re all set to connect with the trusted partner network.
          </p>
          <p className='lg:text-lg font-normal mb-7 text-white text-center sm:text-left'>
            2. Browse real-world assets you can co-own + enjoy yourself. Discover real-world assets that your partners have or want to own together: vehicles, property, businesses, that fit yours and your partner(s) goals.
          </p>
          <p className='lg:text-lg font-normal mb-7 text-white text-center sm:text-left'>
            3. Buy Tokenized Asset Shares and Earn Yield as it Grows. Co-own income-producing assets and watch your assets earn yield while your diversified portfolio grows in value, all tracked right from your dashboard.
          </p>
        </div>

        {/* Membership Roadmap */}
        <div className="my-16">
          <h3 className="text-3xl font-bold text-center mb-10">Membership Roadmap</h3>
          <div className="flex flex-col md:flex-row justify-center items-start gap-8">
            {tiers.map((tier, index) => (
              <div key={index} className={`rounded-xl shadow-lg p-6 w-full md:w-80 flex flex-col ${tier.color}`}>
                <h4 className="text-2xl font-semibold mb-2">{tier.name}</h4>
                <p className="italic mb-4">{tier.entry}</p>
                <ul className="list-disc list-inside space-y-1 flex-1">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-lg italic text-gray-300">
            Start as a Community Insider and upgrade through tiers to unlock exclusive deals and elite networking.
          </p>
        </div>

        {/* Existing Work Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-5 mt-20'>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <WorkSkeleton key={i} />)
            : workdata?.map((items, i) => (
                <div
                  className='bg-darkmode border border-darkmode group hover:border-primary hover:scale-105 duration-300 p-8 relative rounded-2xl hover:mb-5'
                  key={i}>
                  <div className='rounded-full flex justify-center absolute -top-10 left-40% p-6 bg-linear-to-r from-primary to-secondary'>
                    <Image
                      src={items.imgSrc}
                      alt={items.imgSrc}
                      width={44}
                      height={44}
                    />
                  </div>
                  <div>
                    <Image
                      src={'/images/icons/bg-arrow.svg'}
                      alt='arrow-bg'
                      width={85}
                      height={35}
                    />
                  </div>
                  <p className='text-2xl text-white/80 font-semibold text-center mt-8 capitalize'>
                    {items.heading}
                  </p>
                  <p className='text-base font-normal text-white/60 text-center mt-2 overflow-hidden line-clamp-3 group-hover:h-auto group-hover:line-clamp-none transition-all duration-300'>
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
