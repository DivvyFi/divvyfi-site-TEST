'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AssetType } from '@/app/types/asset'

const FeaturedAssets = () => {
  const [assets, setAssets] = useState<AssetType[]>([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState<'All' | 'RV' | 'Home' | 'Boat'>('All')
  const [sort, setSort] = useState<'None' | 'PriceAsc' | 'PriceDesc'>('None')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await fetch('/api/featured-assets')
        const data = await res.json()
        setAssets(data.featuredAssets)
      } catch (err) {
        console.error('Error fetching assets', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAssets()
  }, [])

  const filteredAssets = assets
    .filter(asset => 
      (filterType === 'All' || asset.type === filterType) &&
      (asset.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
       (asset.location?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false))
    )
    .sort((a, b) => {
      if (sort === 'PriceAsc') return (a.price || 0) - (b.price || 0)
      if (sort === 'PriceDesc') return (b.price || 0) - (a.price || 0)
      return 0
    })

  return (
    <section id='featured-assets' className='scroll-mt-20'>
      <div className='container relative'>
        {/* Header */}
        <div className='text-center mb-10'>
          <p className='text-primary text-base sm:text-lg font-semibold mb-4'>FEATURED ASSETS</p>
          <h2 className='font-semibold mb-6 text-center max-w-2xl mx-auto sm:leading-14 capitalize'>
            Explore Top RVs, Homes, and Boats
          </h2>
          <p className='lg:text-lg font-normal text-lightpurple text-center max-w-2xl mx-auto'>
            Handpicked assets sourced from trusted platforms — co-own your favorite vehicles, vacation homes, or luxury boats.
          </p>
        </div>

        {/* Search */}
        <div className='flex justify-center mb-4'>
          <input
            type='text'
            placeholder='Search by name or location...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='px-4 py-2 rounded-lg w-full max-w-md bg-darkmode text-white placeholder-white focus:outline-none'
          />
        </div>

        {/* Filters */}
        <div className='flex justify-center gap-4 mb-4 flex-wrap'>
          {['All', 'RV', 'Home', 'Boat'].map(t => (
            <button
              key={t}
              className={`px-4 py-2 rounded-lg ${
                filterType === t ? 'bg-primary text-white' : 'bg-darkmode text-lightpurple'
              }`}
              onClick={() => setFilterType(t as any)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Sorting */}
        <div className='flex justify-center gap-4 mb-8'>
          <button
            className={`px-4 py-2 rounded-lg ${
              sort === 'PriceAsc' ? 'bg-primary text-white' : 'bg-darkmode text-lightpurple'
            }`}
            onClick={() => setSort('PriceAsc')}
          >
            Price ↑
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              sort === 'PriceDesc' ? 'bg-primary text-white' : 'bg-darkmode text-lightpurple'
            }`}
            onClick={() => setSort('PriceDesc')}
          >
            Price ↓
          </button>
        </div>

        {/* Asset Grid */}
        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className='bg-darkmode p-8 rounded-lg animate-pulse' />
              ))
            : filteredAssets.map((asset, i) => (
                <a
                  href={asset.link}
                  key={i}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-darkmode p-6 rounded-lg flex flex-col gap-3 hover:scale-105 hover:border-primary transition-all duration-300 border border-darkmode'>
                  <div className='rounded-full bg-linear-to-r from-primary to-secondary w-fit p-4 flex items-center justify-center mx-auto'>
                    <Image src={asset.imgSrc} alt={asset.heading} width={60} height={60} className='w-auto' />
                  </div>
                  <h5 className='text-white/80 text-lg font-medium capitalize text-center'>{asset.heading}</h5>
                  <p className='text-white/40 text-sm text-center'>{asset.subheading}</p>
                  {asset.price && <p className='text-white font-semibold text-center mt-2'>${asset.price.toLocaleString()}</p>}
                  {asset.source && <p className='text-white/40 text-xs text-center'>Source: {asset.source}</p>}
                </a>
              ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedAssets
