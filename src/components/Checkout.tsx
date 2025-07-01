'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Stack,
  Divider,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { decreaseCount, increaseCount } from '@/store/cartslice';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { getDiscountedPrice } from '@/shared_features/commonFunctions';

const Checkout = () => {
    const [itemCount, setItemCount] = useState<number>(1);

  const cartItems = useSelector((state: RootState) => state.cartReducer.items);
  const dispatch = useDispatch<AppDispatch>();

  const handleDecrease = (id: number) => {
    dispatch(decreaseCount(id));
  };

  const handleIncrease = (id: number) => {
    dispatch(increaseCount(id));
  };


  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

  const params = useSearchParams();
  const itemId = params.get('id');

  const [singleItem, setSingleItem] = useState<{title: string, price: number, thumbnail: string, discountPercentage: number}>();

  useEffect(() => {
    const fetchProduct = async () => {
      if (itemId) {
        const res = await fetch(`https://dummyjson.com/products/${itemId}`);
        const data = await res.json();
        console.log(data)
        setSingleItem(data);
      }
    };
    fetchProduct();
  }, [itemId]);

  if (itemId && singleItem) {
    return (
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>

        <Grid container spacing={4}>
          {/* LEFT - Form */}
          <Grid size={{xs: 12, md:6}}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Shipping Information
              </Typography>
              <Stack spacing={2}>
                <TextField label="Full Name" fullWidth />
                <TextField label="Phone Number" fullWidth />
                <TextField label="Email" fullWidth />
                <TextField label="Address" fullWidth multiline rows={3} />
                <TextField label="City" fullWidth />
                <TextField label="Postal Code" fullWidth />
                <TextField label="Country" fullWidth />
                <Button variant="contained" color="primary">
                  Confirm Details
                </Button>
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{xs: 12, md:6}}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>

              <Stack spacing={2}>
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      borderBottom: '1px solid #ddd',
      pb: 1,
    }}
  >
    <Image
      src={singleItem.thumbnail}
      alt={singleItem.title}
      width={60}
      height={60}
      style={{ borderRadius: 8 }}
    />
    <Box flex={1}>
      <Typography variant="body1">{singleItem.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        ₹{getDiscountedPrice(singleItem.price,singleItem.discountPercentage)} x {itemCount}
      </Typography>
    </Box>
    <Typography variant="body1" fontWeight="bold">
      ₹{(Number(getDiscountedPrice(singleItem.price, singleItem.discountPercentage)) * itemCount).toFixed(2)}
    </Typography>
    <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton onClick={() => setItemCount(Math.max(1, itemCount - 1))}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{itemCount}</Typography>
                    <IconButton onClick={() => setItemCount(itemCount+1)}>
                      <AddIcon />
                    </IconButton>
                  </Stack>
  </Box>
</Stack>

              <Divider sx={{ my: 2 }} />

              <Box
                flex={1}
                sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3 }}
              >
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography>Total Product Price</Typography>
                    <Typography variant="body1" fontWeight="bold">
                        ₹{(Number(getDiscountedPrice(singleItem.price, singleItem.discountPercentage)) * itemCount).toFixed(2)}
                    </Typography>

                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography>Delivery Charge</Typography>
                    <Typography>₹49.00</Typography>
                  </Stack>

                  <Divider sx={{ my: 1 }} />

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">Subtotal</Typography>
                    <Typography variant="h6">
                      ₹{(Number(getDiscountedPrice(singleItem.price, singleItem.discountPercentage)) * itemCount + 49).toFixed(2)} 
                    </Typography>
                  </Stack>
                </Stack>

                <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                  Place Order
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{xs: 12, md:6}}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Stack spacing={2}>
              <TextField label="Full Name" fullWidth />
              <TextField label="Phone Number" fullWidth />
              <TextField label="Email" fullWidth />
              <TextField label="Address" fullWidth multiline rows={3} />
              <TextField label="City" fullWidth />
              <TextField label="Postal Code" fullWidth />
              <TextField label="Country" fullWidth />
              <Button variant="contained" color="primary">
                Confirm Details
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{xs: 12, md:6}}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>

            <Stack spacing={2}>
              {cartItems.map((item) => (
                <Box
                  key={item.itemId}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    borderBottom: '1px solid #ddd',
                    pb: 1,
                  }}
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={60}
                    height={60}
                    style={{ borderRadius: 8 }}
                  />
                  <Box flex={1}>
                    <Typography variant="body1">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{Number(getDiscountedPrice(item.price, item.discountPercentage))} x {item.count}
                    </Typography>
                  </Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton onClick={() => handleDecrease(item.itemId)}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.count}</Typography>
                    <IconButton onClick={() => handleIncrease(item.itemId)}>
                      <AddIcon />
                    </IconButton>
                  </Stack>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Box
              flex={1}
              sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3 }}
            >
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>Total Product Price</Typography>
                  <Typography>₹{getTotal().toFixed(2)}</Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography>Delivery Charge</Typography>
                  <Typography>₹49.00</Typography>
                </Stack>

                <Divider sx={{ my: 1 }} />

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6">Subtotal</Typography>
                  <Typography variant="h6">
                    ₹{(getTotal() + 49).toFixed(2)}
                  </Typography>
                </Stack>
              </Stack>

              <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                Place Order
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
