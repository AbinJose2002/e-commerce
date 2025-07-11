'use client';
import React from 'react';

import { Box, Paper } from '@mui/material';
import Image from 'next/image';

const zara = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/330px-Zara_Logo.svg.png'
const gucci = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/1960s_Gucci_Logo.svg/640px-1960s_Gucci_Logo.svg.png'
const ck = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Calvin_klein_logo_old.svg/640px-Calvin_klein_logo_old.svg.png'
const prada = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Prada-Logo.svg/640px-Prada-Logo.svg.png'
const versace = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Versace_old_logo.svg/425px-Versace_old_logo.svg.png?20230331111419'

const brands = [versace, ck, prada, gucci, zara];

const BrandBar = () => {
  return (
    <Paper
      sx={{
        width: '90%',
        maxWidth: '1200px',
        margin: '30px auto',
        borderRadius: '20px',
        padding: { xs: '16px', sm: '20px', md: '40px' },
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: {xs: 'center', md: 'space-between'},
        gap: { xs: 2, sm: 4 },
        alignItems: 'center',
      }}
      elevation={1}
    >
      {brands.map((logo, idx) => (
        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image loading="lazy" src={logo} alt={`brand-${idx}`} height={60} width={140} />
        </Box>
      ))}
    </Paper>
  );
};

export default BrandBar;
