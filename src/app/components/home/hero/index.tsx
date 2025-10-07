'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'

const Banner = () => {
  const [isOpen, setOpen] = useState(false)

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <section className='relative pb-0' id='home-section'>
      <div className='bg-banner-image absolute w-full h-full top-0 blur-390'></div>
      <div className='overflow-hidden'>
        <div className='container lg:pt-20 pt-10 relative'>
          <div className='relative z-10'>
            <div className='grid grid-cols-1 lg:grid-cols-12 my-16 items-center'>
              <div className='lg:col-span-7 mb-16'>
                <h1 className='mb-5 lg:text-start text-center sm:leading-snug leading-tight'>
                  Real Ownership, <br /> Real World Assets.
                </h1>
                <p className='text-white font-normal mb-10 max-w-[70%] lg:text-start text-center lg:mx-0 mx-auto capitalize'>
                  DivvyFi is the bridge between the old world of finance locked behind banks, and the new world of financial freedom that breaks those barriers.
                </p>
                <div className='flex align-middle justify-center lg:justify-start'>
                  <button className='text-xl font-semibold text-white py-4 px-6 lg:px-12 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary rounded-xl mr-6 cursor-pointer'>
                    See Assets
                  </button>
                  <button
                    onClick={openModal}
                    className='bg-transparent flex justify-center items-center text-white cursor-pointer'>
                    <Image
                      src={'/images/banner/playbutton.svg'}
                      alt='button-image'
                      className='mr-3'
                      width={47}
                      height={47}
                    />
                    <span className='hover:text-primary'>How It Works</span>
                  </button>
                </div>
              </div>
              <div className='lg:col-span-5 lg:-m-48 -m-20 overflow-hidden'>
                <Image
                  src='/images/banner/banner.png'
                  alt='nothing'
                  width={1013}
                  height={760}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-gradient-to-br from-primary to-secondary rounded-lg sm:m-0 m-4'>
            <div className='overlay flex items-center justify-between border-b border-solid border-border p-5 z-50 backdrop-blur-sm'>
              <h3 className='text-white'>How It Works</h3>
              <button onClick={closeModal} className='inline-block dark:invert'>
                <Icon
                  icon='tabler:circle-x'
                  className='text-2xl text-white hover:cursor-pointer hover:text-primary'
                />
              </button>
            </div>
            <iframe
              height='400'
              className='p-4 md:w-[50rem] w-full'
              src='https://www.youtube.com/channel/UC-Y-0dGlA3z8RfkZyKiPycQ'
              title='How DiffyFi works'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen></iframe>
          </div>
        </div>
      )}
    </section>
  )
}

export default Banner
