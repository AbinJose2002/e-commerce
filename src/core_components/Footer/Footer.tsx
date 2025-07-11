'use client';

import React from 'react'
import { Box, Typography, Grid, Stack, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import Image from 'next/image';

const paypal = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/PayPal_2024.svg/500px-PayPal_2024.svg.png'
const applepay = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/250px-Apple_Pay_logo.svg.png'
const mastercard = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/330px-Mastercard_2019_logo.svg.png'
const visa = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/500px-Visa_2021.svg.png'
const gpay = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/330px-Google_Pay_Logo.svg.png'

const Footer = () => {

    const paymentIcons = [
        { src: visa, alt: 'visa' },
        { src: mastercard, alt: 'mastercard' },
        { src: paypal, alt: 'paypal' },
        { src: applepay, alt: 'applepay' },
        { src: gpay, alt: 'gpay' },
    ];

  return (
    <Box bgcolor="#f5f5f5" px={{ xs: 4, md: 12 }} py={6}>
      <Grid container spacing={4} justifyContent={'space-between'}>
        <Grid size={{xs: 12, md: 3}}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Kidilam store
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            We have clothes that suit your style and which you are proud to wear. From women to men.
          </Typography>
          <Stack direction="row" spacing={1} mt={2}>
            <IconButton>
              <Twitter fontSize="small" />
            </IconButton>
            <IconButton>
              <Facebook fontSize="small" />
            </IconButton>
            <IconButton>
              <Instagram fontSize="small" />
            </IconButton>
          </Stack>
        </Grid>

        {[
          {
            title: 'COMPANY',
            links: ['About', 'Features', 'Works', 'Career'],
          },
          {
            title: 'HELP',
            links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'],
          },
          {
            title: 'FAQ',
            links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'],
          },
          {
            title: 'RESOURCES',
            links: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'],
          },
        ].map((section, idx) => (
          <Grid key={idx} size={{xs: 6, md: 2}}>
            <Typography fontWeight="bold" letterSpacing={'1px'} variant="subtitle1" mb={2}>
              {section.title}
            </Typography>
            {section.links.map((link) => (
              <Typography key={link} variant="body2" color="text.secondary" mb={1}>
                {link}
              </Typography>
            ))}
          </Grid>
        ))}
      </Grid>

      <Box
        mt={6}
        pt={3}
        borderTop="1px solid #ddd"
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="caption" color="text.secondary">
          Kidilam store © 2000–2023, All Rights Reserved
        </Typography>
        <Stack direction="row" spacing={2} mt={{ xs: 2, md: 0 }}>
          {paymentIcons.map((icon) => (
            <Image
              key={icon.alt}
              src={icon.src} 
              alt={icon.alt}
              width={46}
              height={24}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
