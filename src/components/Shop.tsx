'use client'

import { Product } from '@/shared_features/FeatureProductCard'
import ProductCard from '@/shared_features/ProductCard'
import {
  Box,
  Breadcrumbs,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CategoryCircle from './CategoryCircle'

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)

  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const pagesParam = searchParams.get('pages')
  const sort = searchParams.get('sort')
  const rating: number = Number(searchParams.get('rating'))
  const minPrice = Number(searchParams.get('minPrice'))
  const maxPrice = Number(searchParams.get('maxPrice'))
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

  // Filter and sort logic (MOVED OUTSIDE JSX)
  let displayedProducts = (rating || minPrice || maxPrice
    ? products.filter(
        (item) =>
          (!isNaN(rating) ? item.rating >= rating : true) &&
          (!isNaN(minPrice) ? item.price >= minPrice : true) &&
          (!isNaN(maxPrice) ? item.price <= maxPrice : true)
      )
    : products
  )

  if (sort === 'low-to-high') {
    displayedProducts = [...displayedProducts].sort((a, b) => a.price - b.price)
  } else if (sort === 'high-to-low') {
    displayedProducts = [...displayedProducts].sort((a, b) => b.price - a.price)
  }

  return (
    <Box p={4}>
      <CategoryCircle />
      <Breadcrumbs sx={{ mb: 4, color: 'black' }}>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        {category && (
          <Typography color="text.primary" textTransform="capitalize">
            {category.replace('-', ' ')}
          </Typography>
        )}
      </Breadcrumbs>

      <FormControl sx={{ minWidth: 200, mb: 3 }}>
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          value={sort || ''}
          label="Sort By"
          onChange={(e) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('sort', e.target.value)
            router.push(`/products?${params.toString()}`)
          }}
        >
          <MenuItem value="">Default</MenuItem>
          <MenuItem value="low-to-high">Price: Low to High</MenuItem>
          <MenuItem value="high-to-low">Price: High to Low</MenuItem>
        </Select>
      </FormControl>

      <Box display="flex" flexWrap="wrap" gap={4} justifyContent="center">
        {loading ? (
          'Loading...'
        ) : (
          displayedProducts.map((item, index) => (
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
          ))
        )}
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
