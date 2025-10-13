'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import WorkSkeleton from '../../Skeleton/Work'
import { WorkType } from '@/app/types/work'

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
        <div className='text-center mb-14'>
          <h2 className='mb-6 capitalize'>Why it Works</h2>

          <p className='text-lightpurple max-w-2xl mx-auto md:text-lg font-normal md:leading-8'>
            It’s not about competing with central banks. It’s about using tech to lower the barrier to entry for everyone else. Because the future of finance isn’t about who controls the money. It’s about who gets to own it. DivvyFi changes that by connecting stable, real-world assets to decentralized technology, lowering the barrier to entry for the rest of the world. See what real world assets you can own.
          </p>

          {/* ✅ Added bullet section here, below the main paragraph */}
          <div className='text-lightpurple max-w-2xl mx-auto md:text-lg font-normal md:leading-8 mt-8 text-left'>
            <ul className='list-disc list-inside space-y-4'>
              <li>
                <strong>Lower barriers to ownership:</strong> Blockchain technology makes access to real assets — homes, businesses, and income streams — simple, secure, and global.
              </li>
              <li>
                <strong>Own what you believe in:</strong> Every token is backed by something real, not speculation. Real-world value, real income, real impact.
              </li>
              <li>
                <strong>Your ownership on your terms:</strong> Keep or transfer your ownership whenever you choose. DeFi liquidity pools give you flexibility traditional assets never could.
              </li>
            </ul>
          </div>
        </div>

        {/* ✅ Cards Section */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-5 mt-20'>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <WorkSkeleton key={i} />)
            : workdata?.map((items, i) => (
                <div
                  key={i}
                  className='bg-darkmode border border-darkmode group hover:border-primary hover:scale-105 duration-300 p-8 relative rounded-2xl hover:mb-5'
                >
                  {/* Fixed invalid class: replaced left-40% with correct Tailwind centering */}
                  <div className='rounded-full flex justify-center absolute -top-10 left-1/2 transform -translate-x-1/2 p-6 bg-gradient-to-r from-primary to-secondary'>
                    <Image
                      src={items.imgSrc}
                      alt={items.imgSrc}
                      width={44}
                      height={44}
                    />
                  </div>

                  <div className='flex justify-center mt-6'>
                    <Image
                      src='/images/icons/bg-arrow.svg'
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
