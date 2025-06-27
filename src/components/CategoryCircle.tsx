'use client'

import Image from 'next/image'
import jewelry from '../../public/category-bagde/jewewlry.jpg'
import kitchen from '../../public/category-bagde/kitchen.jpg'
import groccery from '../../public/category-bagde/groceries.webp'
import skin from '../../public/category-bagde/skin.jpg'
import fragrance from '../../public/category-bagde/fragrences.jpg'

import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const CategoryCircle = () => {
  const category = [
    {
      name: 'Groceries',
      image: groccery,
      route: 'groceries',
    },
    {
      name: 'Kitchen Accessories',
      image: kitchen,
      route: 'kitchen-accessories',
    },
    {
      name: 'Skin Care',
      image: skin,
      route: 'skin-care',
    },
    {
      name: 'Womens Jewellery',
      image: jewelry,
      route: 'womens-jewellery',
    },
    {
      name: 'Fragrances',
      image: fragrance,
      route: 'fragrances',
    },
  ]

  const router = useRouter()

  return (
    <Box>
      <Typography variant="h4" align="center" sx={{ py: 5 }}>
        Shop by Category
      </Typography>

      <Box
        sx={{
          width: '80%',
          margin: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 5,
        }}
      >
        {category.map((item, index) => (
          <Stack
            spacing={1}
            direction="column"
            alignItems="center"
            key={index}
            sx={{ cursor: 'pointer' }}
            onClick={() => router.push(`/products?category=${item.route}`)}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'transparent',
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
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
