'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

// Define the type for your asset cards
interface AssetType {
  id: string
  imgSrc: string
  title: string
  description: string
  link?: string // optional link to the asset
}

const FeaturedAssets = () => {
  const [assets, setAssets] = useState<AssetType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        // Example: fetch mock API endpoints for each asset type
        const [rvRes, zillowRes, boatRes] = await Promise.all([
          fetch('/api/rvtrader'), 
          fetch('/api/zillow'),
          fetch('/api/boattrader')
        ])

        const [rvData, zillowData, boatData] = await Promise.all([
          rvRes.json(),
          zillowRes.json(),
          boatRes.json()
        ])

        // Merge all assets into a single array
        const combinedAssets: AssetType[] = [
          ...rvData,
          ...zillowData,
          ...boatData
        ]

        setAssets(combinedAssets)
      } catch (error) {
        console.error('Failed to fetch featured assets', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAssets()
  }, [])

  return (
    <section id='featured-assets-section' className='scroll-mt-20 py-16'>
      <div className='container mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-white text-3xl font-semibold mb-4'>Featured Assets</h2>
          <p className='text-lightpurple max-w-2xl mx-auto'>
            Explore hand-picked vehicles, properties, and boats available for co-ownership through DivvyFi.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className='bg-darkmode p-6 rounded-lg animate-pulse h-60'
                ></div>
              ))
            : assets.map((asset) => (
                <div
                  key={asset.id}
                  className='bg-darkmode p-6 rounded-lg flex flex-col gap-3 hover:scale-105 transition-transform duration-300'
                >
                  <div className='rounded-full bg-gradient-to-r from-primary to-secondary w-fit p-4 flex items-center justify-center mx-auto'>
                    <Image
                      src={asset.imgSrc}
                      alt={asset.title}
                      width={80}
                      height={80}
                      className='object-contain'
                    />
                  </div>
                  <h5 className='text-white/80 text-lg font-medium text-center'>{asset.title}</h5>
                  <p className='text-white/40 text-sm text-center'>{asset.description}</p>
                  {asset.link && (
                    <a
                      href={asset.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-primary text-sm text-center mt-2 hover:underline'
                    >
                      View More
                    </a>
                  )}
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedAssets
