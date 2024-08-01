import Image from 'next/image'
import React from 'react'

const SpecialProducts = () => {

  const products = [
    { src: '/product1.jpg', alt: 'product1', name: 'Cadbury Dairy Milk' },
    { src: '/product2.jpg', alt: 'product2', name: 'Mars Bars' },
    { src: '/product3.jpg', alt: 'product3', name: 'Lindt Excellence Bar' },
    { src: '/product2.jpg', alt: 'product2', name: 'Mars Bars' },
  ]


  return (
    <section className=' mx-auto'>
        <div className=' flex items-center justify-center gap-5'>
            <h2 className=' text-3xl font-bold tracking-tight text-brown-900'>Special Products</h2>
        </div>
        <div>
            {products.map((product , index) => (
                <div key={index} className=' flex items-center justify-center gap-3'>
                    <Image
                     src={product.src}
                     alt={product.alt}
                     width={0}
                     height={0}
                     style={{ width: '220px' , height: '220px'}}
                     className=' rounded-full border-8'
                    />
                    <p className=' font-semibold text-brown-900'>{product.name}</p>
                </div>
            ))}
        </div>
    </section>
  )
}

export default SpecialProducts