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
    <section className='relative '>
      <div className='bg-banner-image absolute w-full h-full right-auto blur-390' />
      <div className='container'>
        <div className='text-center mb-14'>
          <h2 className='mb-3 capitalize'>How It Works</h2>
          <p className='lg:text-lg font-normal text-white text-center sm:text-start'>
            Getting started is simple. Create an account, verify your identity, and start networking, buying, owning, and using real assets in just a few clicks all on a secure and intuitive
            platform.
            </p>
          <p className='text-white font-normal mb-10 max-w-[90%] mx-auto text-center lg:text-left'>
            1. Create an account and verify your identity to get started securely. Start by linking your digital wallet and connecting with trusted partners. Once your funds are verified you’re all set to connect with the trusted partner network.
            </p>
          <p className='text-white font-normal mb-10 max-w-[90%] mx-auto text-center lg:text-left'>
            2. Browse real-world assets you can co-own + enjoy yourslef. Discover real world assets that your partners have or want to own together: vehicles, property, businesses, that fit yours and your partner(s) goals.
            </p>
          <p className='text-white font-normal mb-10 max-w-[90%] mx-auto text-center lg:text-left'>
            3. Buy Tokenized Asset Shares and Earn Yield as it Grows. Co-own income producing assets and watch your assets earn yield while your diversified portfolio grows in value, all tracked right from your dashboard.
          </p>
        </div>
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

