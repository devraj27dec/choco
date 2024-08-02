import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import bgImage from '../../../../public/assets/chocolate.jpg'

const Hero = () => {
  return (
    <section className=' h-svh relative'>
        <div className=' container mx-auto my-auto flex h-full flex-col justify-center px-5 text-white md:px-10 xl:px-28  3xl:px-5 '>
          <h1 className=' text-4xl md:text-6xl lg:text-8xl font-bold capitalize leading-[1.2] tracking-tight 3xl:leading-[1.2]'>10 Minute Delivery <br /> At Your Door</h1>
          <p className=' mt-8 max-w-[600px] text-xl 3xl:text-2xl'>
          Why wait? Our 10-minute delivery service brings your favorite chocolates right
          to your door, swiftly and reliably. Convenience and indulgence, all in one
          package.
          </p>
          <Button variant="secondary" className=' mt-6 lg:mt-8 w-fit md:px-8 px-6'>
              Shop now
          </Button>
        </div>
        <Image
         src={bgImage}
         alt='Hero Choclate'
         fill
         className=' -z-10 object-cover'
        />
        <div className="absolute inset-0 -z-10 bg-black/50" />
    </section>
  )
}

export default Hero