import DashSidebar from '@/components/DashSidebar'
import Orders from '@/components/Orders'
import { Box } from '@mui/material'
import React from 'react'

const page = () => {
  
  return (
    <Box width={1} height={'90dvh'} sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Box width={{xs: .1, md:.2}}><DashSidebar/></Box>
      <Box width={{xs: 1, md:.8}}><Orders /></Box>
    </Box>
  )
}

export default page
