import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'
import bgImage from '../../../../public/assets/choco-bg.jpg'
const NewsLetter = () => {
  return (
    <section className=' mx-auto max-w-6xl px-5 py-14 md:py-20'>
        <div className='  relative mx-auto flex flex-col  items-center justify-center rounded-3xl px-10 py-14 text-white'>
            <h2 className=' text-3xl font-bold tracking-tight'>Stay Updated with Newsletter</h2>
            <p className=' mt-6 w-8/12 text-center'>
            Get the latest news, exclusive offers, and delicious updates delivered right to
            your inbox with our chocolate and cake shop newsletter. 
            </p>

            <div className=' relative mt-6 w-[400px]'>
                <Input
                 className=' border-white/40 bg-white/10 placeholder:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 focus-visible:ring-offset-0'
                 placeholder=' Enter your email address'
                />
                <Button
                 variant="secondary"
                 className=' absolute right-0 top-1/2 mr-1 h-8 -translate-y-1/2 transform bg-white text-brown-900 hover:bg-white'
                 size='sm'
                >
                    Subscribe
                </Button>
            </div>
            <Image 
             src={bgImage}
             alt='Hero Choclate'
             fill
             className=' -z-10 rounded-3xl object-cover'
            />

            <div className=' absolute inset-0 -z-10 rounded-3xl bg-black/70'/>

        </div>

    </section>
  )
}

export default NewsLetter