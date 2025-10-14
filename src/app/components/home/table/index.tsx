'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type Table = {
  name: string
  imgSrc: string
  price: number
  change: number
  cap: number
  action: string
  coinbaseSlug: string
}

const StablecoinTable = () => {
  const [tableData, setTableData] = useState<Table[]>([])
  const [lastUpdated, setLastUpdated] = useState<string>('')

  // Map symbols to Coinbase slugs
  const coinbaseSlugs: { [key: string]: string } = {
    USDT: 'tether',
    USDC: 'usd-coin',
    DAI: 'dai',
    BUSD: 'binance-usd',
    // Add more as needed
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
          name: `${coin.name} (${coin.symbol.toUpperCase()})`,
          imgSrc: coin.image,
          price: coin.current_price,
          change: coin.price_change_percentage_24h,
          cap: coin.market_cap,
          action: coin.price_change_percentage_24h >= 0 ? 'Buy' : 'Sell',
          coinbaseSlug: slug,
        }
      })

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

  return (
    <section className="scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-[#0B0F19]/70 backdrop-blur-lg p-8 border border-gray-700">
          <h2 className="text-2xl text-white font-semibold mb-4 text-center">
            Stablecoins Market Cap Data
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white border border-gray-700">
              <thead className="bg-white/10 uppercase text-gray-300">
                <tr>
                  <th className="py-3 px-4 text-left pl-2">Coin</th>
                  <th className="py-3 px-4 text-right">Price</th>
                  <th className="py-3 px-4 text-right">24h Change</th>
                  <th className="py-3 px-4 text-right">Market Cap</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((coin) => (
                  <tr
                    key={coin.name}
                    className="border-t border-gray-700 hover:bg-white/10 transition"
                  >
                    {/* Coin */}
                    <td className="flex items-center gap-3 py-3 px-4 pl-2">
                      <Image
                        src={coin.imgSrc}
                        alt={coin.name}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      {coin.name}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 text-right">
                      ${coin.price.toLocaleString()}
                    </td>

                    {/* 24h Change */}
                    <td
                      className={`py-3 px-4 text-right ${
                        coin.change >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {coin.change?.toFixed(2)}%
                    </td>

                    {/* Market Cap */}
                    <td className="py-3 px-4 text-right">
                      ${coin.cap.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </td>

                    {/* Action button linking to Coinbase */}
                    <td className="py-3 px-4 text-center">
                      <a
                        href={`https://www.coinbase.com/price/${coin.coinbaseSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-3 py-1 rounded-full font-semibold transition ${
                          coin.action === 'Buy'
                            ? 'bg-green-400 text-black hover:opacity-90'
                            : 'bg-red-400 text-black hover:opacity-90'
                        }`}
                      >
                        {coin.action}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Last updated */}
          <div className="text-sm text-gray-400 text-center mt-4">
            🕒 Last updated: {lastUpdated || 'Loading...'}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StablecoinTable

