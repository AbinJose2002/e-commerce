'use client'
import ProductDisplay from '@/shared_features/product_page/ProductDisplay'
import { Box } from '@mui/material'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export type ProductDisplayType = {
    title?: string
    description?: string
    rating?: number
    price?: number
    discountPercentage?: number
    thumbnail?: string
    images?: string[]
}

const Page = () => {
    const searchParams = useSearchParams()
    const itemId = searchParams.get('product')
    const [product, setProduct] = useState<object>()
    const [productDisplay, setProductDisplay] = useState<ProductDisplayType>()

    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://dummyjson.com/products/${itemId}`)
                setProduct(res.data)
                setProductDisplay(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProduct()
    }, [])

  return (
    <Box p={4}>
        <ProductDisplay prodDis={productDisplay}/>
    </Box>
  )
}

export default Page
