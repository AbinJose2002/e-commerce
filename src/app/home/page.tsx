import ProductCard from '@/shared_features/product_card/ProductCard'
import React from 'react'

const page = () => {
  return (
    <div>
      <ProductCard
        id={1}
        category="beauty"
        brand="Essence"
        thumbnail="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
        title="Essence Mascara Lash Princess"
        price={9.99}
        discountPercentage={10.48}
        rating={2.56}
      />
    </div>
  )
}

export default page
