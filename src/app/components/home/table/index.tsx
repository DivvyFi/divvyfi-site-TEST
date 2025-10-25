'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

type Table = {
  name: string
  imgSrc: string
  price: number
  change: number
  cap: number
  coinbaseSlug: string
}

const StablecoinTable = () => {
  const [tableData, setTableData] = useState<Table[]>([])
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const prevDataRef = useRef<Table[]>([])

  const coinbaseSlugs: { [key: string]: string } = {
    USDT: 'tether',
    USDC: 'usd-coin',
    DAI: 'dai',
    BUSD: 'binance-usd',
    USDE: 'ethena', // added USDE mapping
  }

  const fetchData = async () => {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=stablecoins&order=market_cap_desc&per_page=5&page=1'
      )
      const data = await res.json()

      const formatted = data.map((coin: any) => {
        const slug =
          coinbaseSlugs[coin.symbol.toUpperCase()] || coin.symbol.toLowerCase()
        return {
          name: coin.symbol.toUpperCase() === 'USDE' ? 'Ethena (USDE)' : `${coin.name} (${coin.symbol.toUpperCase()})`,
          imgSrc: coin.image,
          price: coin.current_price,
          change: coin.price_change_percentage_24h,
          cap: coin.market_cap,
          coinbaseSlug: slug,
        }
      })

      prevDataRef.current = tableData
      setTableData(formatted)
      setLastUpdated(new Date().toLocaleTimeString())
    } catch (error) {
      console.error('Error fetching stablecoin data:', error)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (!tableData.length) {
    return (
      <section className="scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-white font-semibold mb-4 text-center drop-shadow-[0_0_12px_rgba(189,36,223,0.8)]">
            Stablecoins Market Cap
          </h2>
          <p className="text-white/80 text-center max-w-2xl mx-auto mb-6">
            Stablecoins are digital currencies designed to keep a steady value, usually pegged to the US dollar. 
            They combine the speed and transparency of crypto with the stability of traditional money — giving 
            you the best of both worlds. Unlike volatile cryptocurrencies, stablecoins are built to stay steady, 
            making them ideal for saving, investing, and transacting confidently on DivvyFi.
          </p>
          <div className="rounded-2xl bg-[#0B0F19]/70 backdrop-blur-lg p-8 border border-[#bd24df]">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-[#1a1f2c]/70 rounded-lg w-full"></div>
              ))}
            </div>
            <div className="text-sm text-gray-400 text-center mt-4">
              Loading...
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-white font-semibold mb-4 text-center drop-shadow-[0_0_12px_rgba(189,36,223,0.8)]">
          Why Stablecoins?
        </h2>
        <p className='font-normal text-left mb-10 text-white max-w-3xl mx-auto'>
          Stablecoins unlock a new decentralized economy, letting you co-own and earn from real assets something traditional finance could never let you do. 
          They combine the speed and transparency of crypto with the stability of traditional money giving 
          you the best of both worlds.
        </p>

        <div className="rounded-2xl bg-[#0B0F19]/70 backdrop-blur-lg p-4 sm:p-8 border border-[#bd24df] overflow-x-auto">
          <table className="w-full text-sm text-white border border-[#bd24df] table-auto">
            <thead className="bg-[#bd24df]/20 uppercase text-[#bd24df]">
              <tr>
                <th className="py-3 px-4 text-left pl-2 border-r border-[#bd24df]">Stablecoin</th>
                <th className="py-3 px-4 text-right border-r border-[#bd24df]">Market Cap</th>
                <th className="py-3 px-4 text-right border-r border-[#bd24df]">24 Hr</th>
                <th className="py-3 px-4 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((coin, idx) => {
                const prevCoin = prevDataRef.current[idx]
                const changeClass =
                  prevCoin && prevCoin.price !== coin.price
                    ? coin.price > prevCoin.price
                      ? 'animate-flash-green'
                      : 'animate-flash-red'
                    : ''

                return (
                  <tr
                    key={coin.name}
                    className="border-t border-[#bd24df] transition-all duration-300 hover:bg-[#bd24df]/10 hover:shadow-[0_0_15px_rgba(189,36,223,0.25),0_0_25px_rgba(45,106,222,0.15)]"
                  >
                    {/* Coin */}
                    <td className="flex items-center gap-3 py-3 px-4 pl-2 border-r border-[#bd24df] min-w-[120px]">
                      <a
                        href={`https://www.coinbase.com/price/${coin.coinbaseSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
                      >
                        <Image
                          src={coin.imgSrc}
                          alt={coin.name}
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                        <span className="hover:underline truncate">{coin.name}</span>
                      </a>
                    </td>

                    {/* Market Cap */}
                    <td className={clsx('py-3 px-4 text-right font-mono text-white border-r border-[#bd24df]', changeClass)}>
                      ${coin.cap.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </td>

                    {/* 24h Change */}
                    <td className="py-3 px-4 text-right">
                      <span
                        className={clsx(
                          'inline-flex items-center gap-1 font-semibold',
                          coin.change >= 0 ? 'text-lime-400' : 'text-red-500'
                        )}
                      >
                        {coin.change >= 0 ? '▲' : '▼'}
                        {coin.change?.toFixed(2)}%
                      </span>
                    </td>

                    {/* Price */}
                    <td className={clsx('py-3 px-4 text-right font-mono text-white border-l border-[#bd24df]', changeClass)}>
                      ${coin.price.toLocaleString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="text-sm text-gray-400 text-center mt-4">
          Last updated: {lastUpdated || 'Loading...'}
        </div>
      </div>

      <style jsx>{`
        @keyframes flashGreen {
          0% { background-color: rgba(45, 106, 222, 0.2); }
          100% { background-color: transparent; }
        }
        @keyframes flashRed {
          0% { background-color: rgba(239, 68, 68, 0.2); }
          100% { background-color: transparent; }
        }
        .animate-flash-green {
          animation: flashGreen 1s ease;
        }
        .animate-flash-red {
          animation: flashRed 1s ease;
        }
      `}</style>
    </section>
  )
}

export default StablecoinTable
