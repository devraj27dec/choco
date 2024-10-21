import React from 'react'
import Header from './_component/Header'
import Hero from './_component/Hero'
import SpecialProducts from './_component/specialProducts'
import Footer from './_component/Footer'
import NewsLetter from './_component/NewsLetter'
import Products from './_component/products'

const HomePage = () => {
  
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