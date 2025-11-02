'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

export default function AssetList() {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAssets() {
      try {
        const res = await fetch('http://localhost:3001/api/assets')
        if (!res.ok) throw new Error('Failed to fetch assets')
        const data = await res.json()
        setAssets(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAssets()
  }, [])

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <CircularProgress color="secondary" />
      </div>
    )

  if (error)
    return <div className="text-red-400 text-center py-10">⚠️ {error}</div>

  if (!assets.length)
    return <div className="text-gray-400 text-center py-10">No assets found</div>

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {assets.map((asset, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 250 }}
        >
          <Card className="bg-gradient-to-br from-[#0a0a0f] to-[#181825] border border-purple-700/40 rounded-2xl shadow-md hover:shadow-purple-500/30 transition-all duration-300">
            <CardContent className="p-6">
              <Typography variant="h6" className="text-purple-400 font-semibold mb-3">
                {asset.name || 'Untitled Asset'}
              </Typography>
              <Typography variant="body2" className="text-gray-300 mb-2">
                Platform: <span className="text-white">{asset.platform || 'N/A'}</span>
              </Typography>
              <Typography variant="body2" className="text-gray-300 mb-4">
                Price: <span className="text-white font-medium">{asset.price || '—'}</span>
              </Typography>
              {asset.url && (
                <Button
                  href={asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  className="bg-purple-600 hover:bg-purple-700 normal-case font-semibold shadow-md"
                >
                  View Asset
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </section>
  )
}

