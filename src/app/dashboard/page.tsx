'use client'

import DashSidebar from '@/components/DashSidebar'
import Orders from '@/components/Orders'
import AuthGuard from '@/core_components/authguard/AuthGuard'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import OpenIconSpeedDial from '@/shared_components/OpenIconSpeedDial'

const Page = () => {
  const theme = useTheme();
  const isLaptopUp = useMediaQuery(theme.breakpoints.up('md')); 

  return (
    <AuthGuard>
      {isLaptopUp ? (
        <Box width={1} height={'90dvh'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box width="20%">
            <DashSidebar />
          </Box>
          <Box width="80%">
            <Orders />
          </Box>
        </Box>
      ) : (
        <Box>
          <Box pb={8}>
            <Orders />
          </Box>
          <OpenIconSpeedDial />
        </Box>
      )}
    </AuthGuard>
  );
};

export default Page;
