import Link from 'next/link'

const Simple = () => {
  return (
    <section className='bg-simple-bg relative before:absolute before:w-full before:h-full before:bg-arrow-bg before:bg-no-repeat before:top-10'>
      <div className=''>
        <div className='container relative z-10'>
          <div className='max-w-2xl mx-auto'>
            <h2 className='text-center font-semibold mb-6 sm:leading-16'>
              You’re not speculating. You’re earning income.
            </h2>
            <p className='text-center text-lightpurple text-lg font-normal mb-8'>
              Earn passive income from real estate, businesses, and more all powered by blockchain. Every tokenized asset on the platform, whether real estate, a business, or a piece of equipment  is designed to generate real yield from real-world activity.
            </p>
          </div>
          <div className='flex justify-center '>
            <Link
              href={'/'}
              className='text-xl font-semibold text-white py-4 px-6 lg:px-12 bg-linear-to-r from-primary to-secondary hover:from-secondary hover:to-primary rounded-xl cursor-pointer'>
              Connect Wallet
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Simple
