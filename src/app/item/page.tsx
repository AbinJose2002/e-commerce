'use client'
import ProductDetails from '@/shared_features/product_page/ProductDetails'
import ProductDisplay from '@/shared_features/product_page/ProductDisplay'
import { Box } from '@mui/material'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export type ProductDisplayType = {
    id? : number
    title?: string
    description?: string
    rating?: number
    price?: number
    discountPercentage?: number
    thumbnail?: string
    images?: string[]
    availabilityStatus: string
}

export type ReviewType = {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export type ProductDetailsType = {
  title: string
  description: string
  category: string
  rating: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: ReviewType[]
  returnPolicy: string
}


const Page = () => {
    const searchParams = useSearchParams()
    const itemId = searchParams.get('product')
    const [productDisplay, setProductDisplay] = useState<ProductDisplayType>()
    const [productDetails, setProductDetails] = useState<ProductDetailsType>()

    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://dummyjson.com/products/${itemId}`)
                setProductDisplay(res.data)
                setProductDetails(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProduct()
    }, [itemId])

  return (
    <Box p={4}>
        { productDetails && productDisplay && 
            <Box>
                <ProductDisplay prodDis={productDisplay}/>
        <ProductDetails prodDet={productDetails}/>
            </Box>
        }
    </Box>
  )
}

export default Page
