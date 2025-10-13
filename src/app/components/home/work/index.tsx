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
  {[1,2,3].map(i => (
    <div key={i} className='bg-gray-900 text-white p-10 rounded-3xl shadow-xl'>
      <p className='text-2xl'>Card {i}</p>
      <p className='text-gray-300 mt-2'>Description</p>
    </div>
  ))}
</div>

      </div>
    </section>
  )
}

export default Work
