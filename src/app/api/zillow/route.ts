import { NextResponse } from 'next/server'

export async function GET() {
  const zillowData = [
    {
      id: 'house1',
      imgSrc: '/images/assets/house1.png',
      title: 'Modern Condo',
      description: 'Prime city condo with rental income potential',
      link: 'https://zillow.com/homedetails/house1',
    },
    {
      id: 'house2',
      imgSrc: '/images/assets/house2.png',
      title: 'Beachfront Villa',
      description: 'Co-own a luxury villa and enjoy shared income',
      link: 'https://zillow.com/homedetails/house2',
    },
  ]

  return NextResponse.json(zillowData)
}
