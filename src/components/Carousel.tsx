'use client';

import React, { useState } from 'react';
import Headphone from './Headphone';
import HomeBanner from './HomeBanner';
import { Stack, Button, Box } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

const Carousel = () => {
  const bannerContent = [
    {
      type: 'headphones',
      model: 'headphones',
      head: 'FIND HEADPHONES THAT MATCH YOUR VIBE',
      para: 'Discover premium headphones crafted to elevate your music experience — from rich bass to crystal-clear sound. Designed for comfort, performance, and style.',
      scale: [1.6, 1.6, 1.6],
      position: [0, 0.2, 0],
    },
    {
      type: 'tshirt',
      model: 'tshirt',
      head: 'FIND T-SHIRTS THAT DEFINE YOUR STYLE',
      para: 'Explore our collection of premium T-shirts designed for comfort and self-expression — perfect fits, soft fabrics, and bold designs for every vibe.',
      scale: [1, 1, 1],
      position: [0, -1, 0],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? bannerContent.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === bannerContent.length - 1 ? 0 : prev + 1));
  };

  const current = bannerContent[currentIndex];

  return (
    <Box>
      <Stack
        padding={10}
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="space-between"
      >
        <HomeBanner head={current.head} para={current.para} />
        <Headphone model={current.model} scale={current.scale} position={current.position} />
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
        <Button variant="outlined" sx={{border: '1px solid black', color: 'black'}} onClick={handlePrev} startIcon={<ArrowBackIosNew />}>
          
        </Button>
        <Button variant="contained" sx={{border: '1px solid black', color: 'white', bgcolor: 'black'}} startIcon={<ArrowForwardIos />} onClick={handleNext}>
          
        </Button>
      </Stack>
    </Box>
  );
};

export default Carousel;
