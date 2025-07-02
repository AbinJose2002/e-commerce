'use client'

import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useEffect, useState } from 'react'

type CategoryType = {
  slug: string
  name: string
  url: string
}

const CategoryCircle = () => {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/products/categories') // Replace with your actual API endpoint
        setCategories(res.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <Box>
      <Typography variant="h4" align="center" sx={{ py: 5 }}>
        Shop by Category
      </Typography>

      <Box
        sx={{
          width: '90%',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'start',
          gap: 5,
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          paddingBottom: 2,
          
        }}
      >
        {categories.map((item, index) => (
          <Stack
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
    </Box>
  )
}

export default CategoryCircle
