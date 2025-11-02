'use client'

import AssetList from './components/AssetList'

export default function HomePage() {
  return (
    <main className="min-h-screen p-10">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-purple-400 drop-shadow-lg">
          DivvyFi Asset Feed
        </h1>
        <p className="text-gray-300 mt-4 max-w-xl mx-auto">
          Browse fractional ownership opportunities from Arrived, Lofty, and Koia, all in one place.
        </p>
      </section>

      <AssetList />
    </main>
  )
}

