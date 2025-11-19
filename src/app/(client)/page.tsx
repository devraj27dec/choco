"use client"
import React from 'react'
import Header from './_component/Header'
import Hero from './_component/Hero'
import SpecialProducts from './_component/specialProducts'
import Footer from './_component/Footer'
import NewsLetter from './_component/NewsLetter'
import Products from './_component/products'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const HomePage = () => {

  const { data: session} = useSession();
  // console.log(`your are ${session?.user.role}`)
  if(session?.user.role === 'admin'){
    redirect('/admin' )
  }

  return (
    <>
      <Header/>
      <Hero/>
      <SpecialProducts/>
      <Products/>
      <NewsLetter/>
      <Footer/>
    </>
  )
}

export default HomePage