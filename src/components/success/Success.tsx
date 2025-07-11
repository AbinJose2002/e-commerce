'use client'

import { Box, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useRouter } from 'next/navigation'

const success = 'https://i.gifer.com/7efs.gif'

const Success = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const router = useRouter();

  useEffect(() => {

    // Set window size for confetti
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // Confetti and redirect timer
    const timeout = setTimeout(() => {
      setShowConfetti(false);
      router.push('/');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={1000}
          recycle={false}
        />
      )}
      <Box width={0.4} margin="auto" sx={{ borderRadius: '20px' }}>
        <Paper
          elevation={2}
          sx={{
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            flexDirection: 'column',
          }}
        >
          <Image src={success} width={200} height={100} alt="success-icon" />
          <Typography variant="h3" textAlign="center">
            Your order has been placed successfully
          </Typography>
        </Paper>
      </Box>
    </div>
  )
}

export default Success
