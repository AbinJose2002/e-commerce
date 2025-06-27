'use client'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const searchParams = useSearchParams()
    const itemId = searchParams.get('product')

    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://dummyjson.com/products/${itemId}`)
                console.log(res.data)
            } catch (error) {
                
            }
        }
        fetchProduct()
    }, [])

  return (
    <div>
        
    </div>
  )
}

export default Page
