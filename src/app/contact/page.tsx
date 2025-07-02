import React from 'react';
import { Box, Paper, Stack } from '@mui/material';
import Image from 'next/image';
import shop from '../../../public/shop.jpg';
import SharedForm from '@/shared_features/SharedForm';

const Page = () => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 2, sm: 4 }}
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '100vh', px: 2 }}
    >
      <Box
        sx={{
          width: { xs: '90vw', md: '40vw' },
          height: 'auto',
          borderRadius: '20px',
        }}
      >
        <Paper elevation={10} sx={{borderRadius: '20px'}}>
            <SharedForm type='contact'/>
        </Paper>
      </Box>

      <Box
        sx={{
          position: 'relative',
          width: { xs: '90vw', sm: '40vw' },
          height: { xs: 200, sm: 300, md: 400 }, 
          borderRadius: '20px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={shop}
          alt="Image of a store"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </Box>
    </Stack>
  );
};

export default Page;
