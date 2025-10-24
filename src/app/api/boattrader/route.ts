import { NextResponse } from 'next/server'

export async function GET() {
  const boatData = [
    {
      id: 'boat1',
      imgSrc: '/images/assets/boat1.png',
      title: 'Speedboat X1',
      description: 'High-performance speedboat perfect for co-ownership',
      link: 'https://boattrader.com/listing/boat1',
    },
    {
      id: 'boat2',
      imgSrc: '/images/assets/boat2.png',
      title: 'Luxury Yacht',
      description: 'Co-own a private yacht with passive yield potential',
      link: 'https://boattrader.com/listing/boat2',
    },
  ]

  return NextResponse.json(boatData)
}
