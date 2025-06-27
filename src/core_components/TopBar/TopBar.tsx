import { Box, Typography } from '@mui/material'
import React from 'react'

const TopBar = () => {
  return (
    <Box bgcolor={'black'} p={1} width='100%' color={'white'}>
      <Typography align='center' variant='subtitle1'>
        Sign up and get 20% off to your first order. Sign Up Now
      </Typography>
    </Box>
  )
}

export default TopBar
