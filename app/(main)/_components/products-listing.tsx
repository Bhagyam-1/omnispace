import React from 'react'
import { products } from '../_utils/config'
import ProductCard from './product-card'

const ProductsListing = () => {
  return (
    <section className='bg-muted/30 py-24 mx-4 rounded-lg' aria-labelledby='products-listing'>
        <div className='container mx-auto px-4'>
            <div className='flex flex-col gap-4 items-center mb-16'>
                <h2 className='text-3xl font-bold text-primary text-center' id='products-listing'>
                    Explore our products
                </h2>
                <p className='text-muted-foreground text-center font-semibold text-lg'>
                    Experience the power of omnichannel integration with our products.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    </section>  
  )
}

export default ProductsListing;