'use client'
import React from 'react'
import Image from 'next/image'

interface IconWrapperProps {
  src: string
  alt: string
}

export default function IconWrapper({ src, alt }: IconWrapperProps) {
  return (
    <div className="w-20 h-20 flex items-center justify-center">
      <Image
        src={src}
        alt={alt}
        width={80}
        height={80}
        className="object-contain"
      />
    </div>
  )
}
