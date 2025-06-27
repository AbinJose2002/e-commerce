'use client';

import { Box, Paper } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import versace from '../../../public/company-logo/versache.png';
import ck from '../../../public/company-logo/ck.png';
import prada from '../../../public/company-logo/prada.png';
import gucci from '../../../public/company-logo/gucci.png';
import zara from '../../../public/company-logo/zara.png';

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
          <Image src={logo} alt={`brand-${idx}`} height={60} style={{ width: 'auto' }} />
        </Box>
      ))}
    </Paper>
  );
};

export default BrandBar;
