'use client'

import { useEffect, useState } from 'react'

type Table = {
  index: number
  name: string
  imgSrc: string
  price: number
  change: number
  cap: number
  action: string
}

const StablecoinTable = () => {
  const [tableData, setTableData] = useState<Table[]>([])
  const [lastUpdated, setLastUpdated] = useState<string>('')

  const fetchData = async () => {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=stablecoins&order=market_cap_desc&per_page=5&page=1'
      )
      const data = await res.json()

      const formatted = data.map((coin: any, i: number) => ({
        index: i + 1,
        name: `${coin.name} (${coin.symbol.toUpperCase()})`,
        imgSrc: coin.image,
        price: coin.current_price,
        change: coin.price_change_percentage_24h,
        cap: coin.market_cap,
        action: coin.price_change_percentage_24h >= 0 ? 'Buy' : 'Sell',
      }))

      setTableData(formatted)
      setLastUpdated(new Date().toLocaleTimeString()) // update timestamp
    } catch (error) {
      console.error('Error fetching stablecoin data:', error)
    }
  }

  useEffect(() => {
    fetchData() // Initial fetch
    const interval = setInterval(fetchData, 30000) // Auto-refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-x-auto border rounded-lg p-6 bg-white/5 backdrop-blur-md text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        💹 Top 5 Stablecoins (Live Data)
      </h2>

      <table className="min-w-full text-sm text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-2 px-3">#</th>
            <th className="py-2 px-3">Coin</th>
            <th className="py-2 px-3">Price</th>
            <th className="py-2 px-3">24h Change</th>
            <th className="py-2 px-3">Market Cap</th>
            <th className="py-2 px-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((coin) => (
            <tr
              key={coin.index}
              className="border-b border-gray-800 hover:bg-white/10 transition"
            >
              <td className="py-2 px-3 text-center">{coin.index}</td>
              <td className="flex items-center gap-2 py-2 px-3">
                <img
                  src={coin.imgSrc}
                  alt={coin.name}
                  width={26}
                  height={26}
                  className="rounded-full"
                />
                {coin.name}
              </td>
              <td className="py-2 px-3">${coin.price.toLocaleString()}</td>
              <td
                className={`py-2 px-3 ${
                  coin.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {coin.change?.toFixed(2)}%
              </td>
              <td className="py-2 px-3">
                ${coin.cap.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </td>
              <td
                className={`py-2 px-3 font-medium ${
                  coin.action === 'Buy' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {coin.action}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🕒 Timestamp */}
      <div className="text-sm text-gray-400 text-center mt-4">
        🕒 Last updated: {lastUpdated || 'Loading...'}
      </div>
    </div>
  )
}

export default StablecoinTable
