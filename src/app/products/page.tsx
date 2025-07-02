'use client'
import Shop from '@/components/Shop'
import Sidebar from '@/components/Sidebar'
import { FileCopy, FilterList, Print, Save, Share } from '@mui/icons-material'
import { Box, SpeedDial, SpeedDialAction, Stack, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

const Page = () => {

  const actions = [
  { icon: <FileCopy />, name: 'Copy' },
  { icon: <Save />, name: 'Save' },
  { icon: <Print />, name: 'Print' },
  { icon: <Share />, name: 'Share' },
];

  const theme = useTheme()
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Stack direction="row" sx={{ height: '100vh' }}>
      {!isSmallDevice ? 
      <Box
    sx={{ width: {xs: '30%', md: '20%'}, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', bgcolor: '#f8f8f8', borderRight: '1px solid #ccc', zIndex: 1000,
    }}
  >
    <Sidebar />
  </Box> :
  <SpeedDial
  ariaLabel="SpeedDial basic example"
  sx={{ position: 'absolute', bottom: 16, right: 16 }}
  icon={<FilterList  />}
>
  {actions.map((action) => (
    <SpeedDialAction
      key={action.name}
      icon={action.icon}
      tooltipTitle={action.name}
    />
  ))}
</SpeedDial>
      }

  <Box
    sx={{ flexGrow: 1, overflowY: 'auto', height: '100vh', width: {xs: '70%', md: '80%'}, padding: 2,
    }}
  >
    <Shop />
  </Box>
</Stack>

  )
}

export default Page
