import { NextResponse } from 'next/server'

export async function GET() {
  const rvData = [
    {
      id: 'rv1',
      imgSrc: '/images/assets/rv1.png',
      title: 'Luxury RV 2024',
      description: 'Top-of-the-line RV ready for co-ownership',
      link: 'https://rvtrader.com/listing/rv1',
    },
    {
      id: 'rv2',
      imgSrc: '/images/assets/rv2.png',
      title: 'Family Camper 2023',
      description: 'Perfect for family adventures with passive yield potential',
      link: 'https://rvtrader.com/listing/rv2',
    },
  ]

  return NextResponse.json(rvData)
}
