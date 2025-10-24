'use client'

import Image from "next/image";
import { useState } from "react";

export default function Banner() {
  const [isVideoOpen, setVideoOpen] = useState(false);

  const openModal = () => setVideoOpen(true);
  const closeModal = () => setVideoOpen(false);

  return (
    <section className='relative pb-0' id='home-section'>
      <div className='bg-banner-image absolute w-full h-full top-0 blur-390'></div>
      <div className='overflow-hidden'>
        <div className='container lg:pt-20 pt-10 relative'>
          <div className='relative z-10'>
            <div className='grid grid-cols-1 lg:grid-cols-12 my-16 items-center'>
              {/* Left text */}
              <div className='lg:col-span-7 mb-16'>
                <h1 className='mb-5 lg:text-start text-center sm:leading-snug leading-tight'>
                  Real Assets, <br /> Reinvented Ownership.
                </h1>
                <p className='text-white font-normal mb-10 max-w-[90%] lg:text-start text-center lg:mx-0 mx-auto'>
                  DivvyFi isn’t just a fintech platform, it’s the bridge between traditional finance locked behind banks, and blockchain-secured real assets that break those barriers.
                </p>
                <div className='flex align-middle justify-center lg:justify-start gap-4'>
                  <button className='text-xl font-semibold text-white py-4 px-6 lg:px-12 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary rounded-xl'>
                    Start Owning
                  </button>
                  <button
                    onClick={openModal}
                    className='bg-transparent flex justify-center items-center text-white cursor-pointer'>
                    <Image
                      src={'/images/banner/playbutton.svg'}
                      alt='Play Video'
                      width={47}
                      height={47}
                      className='mr-3'
                    />
                    <span className='hover:text-primary'>How It Works</span>
                  </button>
                </div>
                {/* How It Works points */}
                <div className='mt-10 space-y-4 text-white max-w-lg mx-auto lg:mx-0'>
                  <p>1. Create an account and verify your identity to get started securely.</p>
                  <p>2. Browse real-world assets you can co-own — from vehicles to property and more.</p>
                  <p>3. Earn real yield and manage your ownership all in one intuitive dashboard.</p>
                </div>
              </div>

              {/* Right banner image */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <Image
                  src="/images/banner/banner.png"
                  alt="DivvyFi banner"
                  width={1060}
                  height={760}
                  className="block object-contain mx-auto lg:mx-0 lg:-mt-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video modal */}
      {isVideoOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-gradient-to-br from-primary to-secondary rounded-lg sm:m-0 m-4'>
            <div className='overlay flex items-center justify-between border-b border-solid border-border p-5 z-50 backdrop-blur-sm'>
              <h3 className='text-white'>How It Works</h3>
              <button onClick={closeModal} className='inline-block dark:invert'>
                &times;
              </button>
            </div>
            <iframe
              height='400'
              className='p-4 md:w-[50rem] w-full'
              src='https://www.youtube.com/channel/UC-Y-0dGlA3z8RfkZyKiPycQ'
              title='How DivvyFi works'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
