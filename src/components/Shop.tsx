'use client'

import { Product } from '@/shared_features/FeatureProductCard'
import ProductCard from '@/shared_features/ProductCard'
import { Box, Breadcrumbs, Pagination, Typography } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)

  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const pagesParam = searchParams.get('pages')
  const pages = pagesParam ? parseInt(pagesParam, 10) : 1
  const limit = 12
  const skip = (pages - 1) * limit

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            setLoading(true)
            const url = category
                ? `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
                : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`

            const res = await axios.get(url)
            setProducts(res.data.products)
            setTotal(res.data.total)
        } catch (error) {
            console.error('Failed to fetch:', error)
        } finally {
            setLoading(false)
        }
    }

    fetchProducts()
  }, [category, pages, skip])

  const handlepagesChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('pages', value.toString())
    router.push(`/products?${params.toString()}`)
  }

  return (
    <Box p={4}>
      <Breadcrumbs sx={{ mb: 4, color: 'black' }}>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        {category && (
          <Typography color="text.primary" textTransform="capitalize">
            {category.replace('-', ' ')}
          </Typography>
        )}
      </Breadcrumbs>

      <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center">
        {loading
          ? 'Loading...'
          : products.map((item, index) => (
              <Box key={index}>
                <ProductCard
                  id={item.id}
                  category={item.category}
                  brand={item.brand}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  price={item.price}
                  discountPercentage={item.discountPercentage}
                  rating={item.rating}
                />
              </Box>
            ))}
      </Box>

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          page={pages}
          count={Math.ceil(total / limit)}
          onChange={handlepagesChange}
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  )
}

export default Shop
