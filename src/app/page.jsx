'use client' // only if your page uses client-side hooks (optional)

import AssetList from './components/AssetList' // 👈 this is the import line

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white p-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-400 drop-shadow-lg">
        DivvyFi Asset Feed
      </h1>
      <AssetList /> {/* 👈 this displays your scraper data */}
    </main>
  )
}
