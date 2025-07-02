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
import { useFormik } from 'formik';
import { checkoutSchema } from '@/schema';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

type checkoutFormType = {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
    country: string
}

const Checkout = () => {

const stripePromise = loadStripe('pk_test_51Pf271RrUp4W2KP556GuzSY5xDEQOiH0FdTiNpHsBByUhWgscyRiBbXqpK0dr0S0ShP71FFOKl4oddnXGhBDqRly00ekAPON9R'); 
const params = useSearchParams();
  const itemId = params.get('id');
const isSingleItemCheckout = !!itemId;

const calculateTotalAmount = () => {
  if (isSingleItemCheckout && singleItem) {
    const itemPrice = Number(getDiscountedPrice(singleItem.price, singleItem.discountPercentage));
    return itemPrice * itemCount + 49;
  } else {
    return getTotal() + 49;
  }
};


const formData = useFormik<checkoutFormType>({
  initialValues: { 
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    country: '',
},
  validationSchema: checkoutSchema,
  onSubmit: async (values) => {
  const stripe = await stripePromise;
  if (!stripe) {
    console.error('Stripe failed to load');
    return;
  }

  const totalAmount = calculateTotalAmount();

  try {
    const res = await axios.post('http://localhost:8080/payment-intent', {
      formData: values,
      itemId,
      itemCount,
      totalAmount, 
    });
    console.log(res.data)
    const session = res.data;

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  } catch (err) {
    console.error('Stripe checkout error', err);
  }
}


});

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

  

  const [singleItem, setSingleItem] = useState<{title: string, price: number, thumbnail: string, discountPercentage: number}>();
  const [itemCount, setItemCount] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (itemId) {
        const res = await fetch(`https://dummyjson.com/products/${itemId}`);
        const data = await res.json();
        setSingleItem(data);
      }
    };
    fetchProduct();
  }, [itemId]);

  if (itemId && singleItem) {
    return (
      <form onSubmit={formData.handleSubmit}>
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
                <TextField
  label="Full Name"
  name="name"
  value={formData.values.name}
  onChange={formData.handleChange}
  onBlur={formData.handleBlur}
  error={!!formData.errors.name && formData.touched.name}
  helperText={formData.touched.name && formData.errors.name}
  fullWidth
/>

<TextField
  label="Phone Number"
  name="phone"
  value={formData.values.phone}
  onChange={formData.handleChange}
  onBlur={formData.handleBlur}
  error={!!formData.errors.phone && formData.touched.phone}
  helperText={formData.touched.phone && formData.errors.phone}
  fullWidth
/>

<TextField
  label="Email"
  name="email"
  value={formData.values.email}
  onChange={formData.handleChange}
  onBlur={formData.handleBlur}
  error={!!formData.errors.email && formData.touched.email}
  helperText={formData.touched.email && formData.errors.email}
  fullWidth
/>

<TextField
  label="Address"
  name="address"
  value={formData.values.address}
  onChange={formData.handleChange}
  onBlur={formData.handleBlur}
  error={!!formData.errors.address && formData.touched.address}
  helperText={formData.touched.address && formData.errors.address}
  fullWidth
  multiline
  rows={3}
/>

<TextField
  label="City"
  name="city"
  value={formData.values.city}
  onChange={formData.handleChange}
  onBlur={formData.handleBlur}
  error={!!formData.errors.city && formData.touched.city}
  helperText={formData.touched.city && formData.errors.city}
  fullWidth
/>

<TextField
  label="Postal Code"
  name="pincode"
  value={formData.values.pincode}
  onChange={formData.handleChange}
  onBlur={formData.handleBlur}
  error={!!formData.errors.pincode && formData.touched.pincode}
  helperText={formData.touched.pincode && formData.errors.pincode}
  fullWidth
/>

<TextField
  label="Country"
  name="country"
  value={formData.values.country}
  onChange={formData.handleChange}
  onBlur={formData.handleBlur}
  error={!!formData.errors.country && formData.touched.country}
  helperText={formData.touched.country && formData.errors.country}
  fullWidth
/>

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
                        {/* ₹{(Number(getDiscountedPrice(singleItem.price, singleItem.discountPercentage)) * itemCount).toFixed(2)} */}
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

                <Button variant="contained" fullWidth sx={{ mt: 2 }} type='submit'>
                  Place Order
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      </form>
    );
  }

  return (
    <form onSubmit={formData.handleSubmit}>
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
              <TextField
  label="Full Name"
  name="name"
  value={formData.values.name}
  onChange={formData.handleChange}
  onBlur={formData.handleBlur}
  error={!!formData.errors.name && formData.touched.name}
  helperText={formData.touched.name && formData.errors.name}
  fullWidth
/>

<TextField
  label="Phone Number"
  name="phone"
  value={formData.values.phone}
  onChange={formData.handleChange}
  onBlur={formData.handleBlur}
  error={!!formData.errors.phone && formData.touched.phone}
  helperText={formData.touched.phone && formData.errors.phone}
  fullWidth
/>

<TextField
  label="Email"
  name="email"
  value={formData.values.email}
  onChange={formData.handleChange}
  onBlur={formData.handleBlur}
  error={!!formData.errors.email && formData.touched.email}
  helperText={formData.touched.email && formData.errors.email}
  fullWidth
/>

<TextField
  label="Address"
  name="address"
  value={formData.values.address}
  onChange={formData.handleChange}
  onBlur={formData.handleBlur}
  error={!!formData.errors.address && formData.touched.address}
  helperText={formData.touched.address && formData.errors.address}
  fullWidth
  multiline
  rows={3}
/>

<TextField label="City" name="city" value={formData.values.city} onChange={formData.handleChange} onBlur={formData.handleBlur} error={!!formData.errors.city && formData.touched.city} helperText={formData.touched.city && formData.errors.city} fullWidth/>
<TextField label="Postal Code" name="pincode" value={formData.values.pincode} onChange={formData.handleChange} onBlur={formData.handleBlur} error={!!formData.errors.pincode && formData.touched.pincode} helperText={formData.touched.pincode && formData.errors.pincode} fullWidth/>
<TextField label="Country" name="country" value={formData.values.country} onChange={formData.handleChange} onBlur={formData.handleBlur} error={!!formData.errors.country && formData.touched.country} helperText={formData.touched.country && formData.errors.country} fullWidth/>

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

              <Button variant="contained" fullWidth sx={{ mt: 2 }} type='submit'>
                Place Order
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </form>
  );
};

export default Checkout;


