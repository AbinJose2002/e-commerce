'use client'

import TextInput from '@/shared_features/TextInput'
import { Box, Typography, Button, Stack } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import React from 'react'

const NewsLetter = () => {
  return (
    <Box width={1} display="flex" justifyContent="center" mt={4}>
      <Box width={{ xs: '90%', md: '60%' }} bgcolor="black" color="white" borderRadius={2} p={4} >
        <Stack spacing={2} alignItems="center" direction={{xs: 'column', md: 'row'}}>
          <Typography variant="h3">STAY UPTO DATE ABOUT OUR LATEST OFFERS</Typography>
          <Stack direction={'column'} spacing={2}>
            <TextInput  label="Enter your email" width icon={<MailIcon />}  />
            <Button variant="contained" sx={{backgroundColor: 'white', color: 'black'}}>Subscribe</Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

export default NewsLetter
