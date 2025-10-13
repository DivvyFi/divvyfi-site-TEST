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
      {/* Background Image / Banner */}
      <div className='bg-banner-image absolute w-full h-full right-auto blur-390 z-0' />

      <div className='container relative z-10'>
        {/* Section Header */}
        <div className='text-center mb-14'>
          <h2 className='mb-6 capitalize text-white text-3xl md:text-4xl font-bold'>Why it Works</h2>
          <p className='text-gray-300 max-w-2xl mx-auto md:text-lg font-normal md:leading-8 text-left'>
            It’s not about competing with central banks. It’s about using tech to lower the barrier to entry for everyone else. Because the future of finance isn’t about who controls the money. It’s about who gets to own it. DivvyFi changes that by connecting stable, real-world assets to decentralized technology, lowering the barrier to entry for the rest of the world. See what real world assets you can own.
          </p>

          {/* Bullet Points */}
          <div className='text-gray-300 max-w-2xl mx-auto md:text-lg font-normal md:leading-8 mt-8 text-left'>
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
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6 mt-12'>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 w-full bg-gray-800 animate-pulse rounded-3xl flex items-center justify-center text-gray-400 shadow-lg"
                >
                  Loading...
                </div>
              ))
            : workdata?.map((items, i) => (
                <div key={i} className='relative group rounded-3xl overflow-hidden'>
                  {/* Card Base */}
                  <div className='bg-gray-900 border border-gray-700 p-10 rounded-3xl shadow-xl group-hover:shadow-yellow-500/50 transition-all duration-300 transform group-hover:scale-105'>
                    
                    {/* Floating Icon */}
                    <div className='rounded-full flex justify-center absolute -top-12 left-1/2 transform -translate-x-1/2 p-6 bg-gradient-to-r from-yellow-500 to-yellow-400 shadow-lg group-hover:shadow-yellow-400/80 transition-shadow duration-300'>
                      <Image
                        src={items.imgSrc}
                        alt={items.heading}
                        width={48}
                        height={48}
                      />
                    </div>

                    {/* Decorative Arrow */}
                    <div className='flex justify-center mt-8'>
                      <Image
                        src='/images/icons/bg-arrow.svg'
                        alt='arrow-bg'
                        width={90}
                        height={35}
                        className='opacity-70 group-hover:opacity-100 transition-opacity duration-300'
                      />
                    </div>

                    {/* Title */}
                    <p className='text-2xl md:text-3xl text-white font-semibold text-center mt-10 capitalize'>
                      {items.heading}
                    </p>

                    {/* Description */}
                    <p className='text-base md:text-lg text-gray-300 text-center mt-4 overflow-hidden line-clamp-3 group-hover:h-auto group-hover:line-clamp-none transition-all duration-300'>
                      {items.subheading}
                    </p>
                  </div>

                  {/* Animated Gradient Overlay */}
                  <div className='absolute inset-0 pointer-events-none bg-gradient-to-r from-yellow-400/10 via-yellow-500/20 to-yellow-400/10 opacity-0 group-hover:opacity-100 animate-shimmer'></div>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

export default Work
