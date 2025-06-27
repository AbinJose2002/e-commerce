import { Box, Paper, Skeleton, Stack } from '@mui/material'
import React from 'react'

const SkeletonCard = () => {
  return (
    <Box>
            <Paper elevation={10} sx={{ minHeight: 350, width: 250, borderRadius: "20px", padding: 2, position: 'relative'}}>
              <Stack spacing={1}>
                          <Box sx={{position: 'absolute', top: 16, right: 16,}} >
                              <Skeleton variant="circular" width={30} height={30} />
                          </Box>
                          <Skeleton variant="rounded" width={210} height={100} />
                          <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                          <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                      </Stack>
            </Paper>
          </Box>
  )
}

export default SkeletonCard
