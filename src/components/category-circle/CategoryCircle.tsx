'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

type CategoryType = {
  slug: string
  name: string
  url: string
}

const CategoryCircle = () => {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/products/categories')
        setCategories(res.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <Box>
      <Typography title='category-title' variant="h4" align="center" sx={{ py: 5 }}>
        Shop by Category
      </Typography>

      <Box sx={{ position: 'relative', width: '100%' }}>
        {/* Scroll Buttons */}
        <IconButton
          onClick={() => scroll('left')}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            zIndex: 1,
            transform: 'translateY(-50%)',
            backgroundColor: '#fff',
            boxShadow: 1,
          }}
        >
          <ChevronLeft />
        </IconButton>

        <Box
          ref={scrollRef}
          sx={{
            width: '90%',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'start',
            gap: 5,
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            paddingBottom: 2,
            scrollbarWidth: 'none', // Firefox
            '&::-webkit-scrollbar': {
              display: 'none', // Chrome, Safari
            },
          }}
        >
          {categories.map((item, index) => (
            <Stack
              role={item.slug}
              data-testid={item.slug}
              spacing={1}
              direction="column"
              alignItems="center"
              key={index}
              sx={{ cursor: 'pointer' }}
              onClick={() => router.push(`/products?category=${item.slug}`)}
            >
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: '#000',
                  fontSize: 14,
                  textAlign: 'center',
                }}
              >
                {item.name
                  .split(' ')
                  .map((word) => word[0])
                  .join('')
                  .toUpperCase()}
              </Avatar>
              <Typography variant="subtitle1" textAlign="center">
                {item.name}
              </Typography>
            </Stack>
          ))}
        </Box>

        <IconButton
          onClick={() => scroll('right')}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 0,
            zIndex: 1,
            transform: 'translateY(-50%)',
            backgroundColor: '#fff',
            boxShadow: 1,
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  )
}

export default CategoryCircle
