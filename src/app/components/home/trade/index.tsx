import Image from 'next/image'

const Trade = () => {
  return (
    <section className='overflow-hidden'>
      <div className='container relative'>
        <div className='bg-linear-to-r from-primary to-secondary hidden lg:block absolute w-full h-full top-1/2  blur-390'></div>
        <div className='grid lg:grid-cols-2 gap-x-5 items-center relative z-10'>
          <div>
            <Image
              src={'/images/trade/macbook.png'}
              alt='macBook-image'
              width={787}
              height={512}
            />
          </div>
          <div className='flex flex-col gap-7'>
            <h2 className='font-semibold text-center sm:text-start max-w-96 leading-14'>
              Joint Ownership = Shared Income.
            </h2>
            <p className='lg:text-lg font-normal text-lightblue text-center sm:text-start'>
              High value income producing assets shouldn’t be reserved for the few, it should be shared by the many. DivvyFi lets you co-own high value income producing assets such as: real estate, private businesses, luxury planes, yachts, cars using blockchain-backed contracts. Each asset is securely tokenized, transparently managed, and income-generating. You earn from what you co-own and trade or exit whenever you choose.
            </p>
            <div className='flex justify-between'>
              <Image
                src={'/images/trade/security-icon.svg'}
                alt='security'
                width={61}
                height={105}
              />
              <div className='verticalLine'></div>
              <Image
                src={'/images/trade/community-icon.svg'}
                alt='community'
                width={80}
                height={105}
              />
              <div className='verticalLine'></div>
              <Image
                src={'/images/trade/governance-icon.svg'}
                alt='governance'
                width={80}
                height={105}
              />
              <div className='verticalLine'></div>
              <Image
                src={'/images/trade/yield-icon.svg'}
                alt='yield'
                width={71}
                height={105}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Trade
