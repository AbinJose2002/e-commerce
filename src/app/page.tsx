import Carousel from '@/components/Carousel'
import CategoryCircle from '@/components/CategoryCircle'
import FeatureProducts from '@/components/FeatureProducts'
import BrandBar from '@/core_components/BrandBar/BrandBar'

import { Box } from '@mui/material'
import React from 'react'

const page = () => {
  return (
    <Box>
      <Carousel />
      <BrandBar />
      <FeatureProducts />
      <Box width={.8} margin={'auto'}>
        <CategoryCircle />
      </Box>
    </Box>
  )
}

export default page