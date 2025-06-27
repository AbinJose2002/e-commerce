import FeatureProductCard from '@/shared_features/FeatureProductCard'
import { Box } from '@mui/material'
import React from 'react'

const FeatureProducts = () => {



  return (
    <Box>
        <FeatureProductCard head="new arrival" type='new'/>
        <FeatureProductCard head="top selling" type='top'/>
    </Box>
  )
}

export default FeatureProducts
