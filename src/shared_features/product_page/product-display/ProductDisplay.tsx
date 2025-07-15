'use client'

import { Alert, Box, Button, Rating, Snackbar, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ProductDisplayType } from '../../../app/item/page'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { addToCart } from '../../../store/cartslice'
import { useRouter } from 'next/navigation'
import { convertUSD, getDiscountedPrice } from '../../commonFunctions'

type Props = {
  prodDis: ProductDisplayType
}

const ProductDisplay = ({ prodDis }: Props) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>()

  const dispatch = useDispatch<AppDispatch>();

const handleAddToCart = () => {
  if (!prodDis) return;

  dispatch(
    addToCart({
      itemId: prodDis.id as number ,
      title: prodDis.title,
      price: prodDis.price,
      thumbnail: prodDis.thumbnail,
      count: 1,
      discountPercentage: prodDis.discountPercentage
    })
  );
  setSnackbarOpen(true); // Show snackbar
}

const handleCloseSnackbar = (
  event?: React.SyntheticEvent | Event,
  reason?: string
) => {
  if (reason === 'clickaway') return;
  setSnackbarOpen(false);
};

const router = useRouter()

const handleBuyNow = (id: number) => {
  handleAddToCart()
  router.push(`/checkout?id=${id}`)
}


  useEffect(() => {
    setSelectedImage(prodDis?.thumbnail)
  }, [prodDis?.thumbnail])

  return (
    <Box sx={{ width: '90%', margin: 'auto', py: 4 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        {/* Image Section */}
        <Box width={{ xs: 1, md: 0.5 }}>
          <Stack direction={{ xs: 'column-reverse', md: 'row' }} spacing={2}>
            <Stack direction={{ xs: 'row', md: 'column' }} spacing={2}>
              {prodDis?.images?.map((img, index) => (
                <Box key={index} sx={{ cursor: 'pointer' }}>
                  <Image
                    src={img}
                    alt="prod-icon"
                    width={80}
                    height={80}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      objectFit: 'cover',
                      border: selectedImage === img ? '2px solid black' : '1px solid #ccc',
                      borderRadius: 8,
                    }}
                  />
                </Box>
              ))}
            </Stack>

            <Box sx={{ width: '100%', maxWidth: 400, height: 'auto' }}>
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="selected"
                  width={400}
                  height={400}
                  style={{ objectFit: 'contain', borderRadius: 12 }}
                />
              )}
            </Box>
          </Stack>
        </Box>

        <Box width={{ xs: 1, md: 0.5 }}>
          <Typography variant="h2" gutterBottom>
            {prodDis?.title}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <Rating value={prodDis.rating} precision={0.1} readOnly />
            <Typography variant="caption" color="text.secondary">
              ({prodDis?.rating} / 5)
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={3} mb={2}>
            <Typography variant="h5" color="primary" fontWeight="bold">
              {/* ₹{getDiscountedPrice(prodDis?.price || 0, prodDis?.discountPercentage || 0)} */}
              ₹{getDiscountedPrice(prodDis.price, prodDis.discountPercentage)}
            </Typography>

            <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
              ₹{convertUSD(prodDis.price)}
            </Typography>

            <Typography variant="caption" color="error">
              ({prodDis?.discountPercentage}% off)
            </Typography>
          </Stack>

          <Typography variant="subtitle1" gutterBottom>
            {prodDis?.description}
          </Typography>
            <Stack direction={'row'} spacing={2}>
              {prodDis?.availabilityStatus === 'In Stock' && (
                  <Button
                    fullWidth
                    onClick={handleAddToCart}
                    sx={{
                      backgroundColor: 'grey',
                      color: 'white',
                      mt: 2,
                      '&:hover': { backgroundColor: '#222' },
                    }}
                  >
                    Add to Cart
                  </Button>
                )}
                <Button onClick={()=>handleBuyNow(prodDis?.id as number)}
                sx={{
                      backgroundColor: 'black',
                      color: 'white',
                      mt: 2,
                      '&:hover': { backgroundColor: '#222' },
                    }}
                    fullWidth variant='contained'
                    name='buy-now'>Buy Now</Button>
            </Stack>          
        </Box>
      </Stack>
      <Snackbar
        data-testid="alert"
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert role="alert" onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Item added to cart successfully
        </Alert>
      </Snackbar>

    </Box>
  )
}

export default ProductDisplay
