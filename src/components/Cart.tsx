'use client';

import { Box, Typography, Stack, IconButton, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { decreaseCount, increaseCount, removeFromCart } from '@/store/cartslice';
import { useRouter } from 'next/navigation';

const Cart = () => {
    const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cartReducer.items);

  const handleIncrease = (itemId: number) => {
    dispatch(increaseCount(itemId));
  };

  const handleDecrease = (itemId: number) => {
    dispatch(decreaseCount(itemId));
  };

  const handleRemove = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
          Your cart is empty.
        </Typography>
      ) : (
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />}
        >
            
          <Box flex={2}>
            <Typography variant="subtitle2" color="text.secondary" mb={2}>
              {cartItems.reduce((acc, item) => acc + item.count, 0)} items in cart
            </Typography>

            <Stack spacing={2}>
              {cartItems.map((item) => (
                <Box
                  key={item.itemId}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={80}
                    height={80}
                    style={{ borderRadius: 8 }}
                  />
                  <Box flex={1}>
                    <Typography variant="subtitle1">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{item.price}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                      <IconButton onClick={() => handleDecrease(item.itemId)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.count}</Typography>
                      <IconButton onClick={() => handleIncrease(item.itemId)}>
                        <AddIcon />
                      </IconButton>
                    </Stack>
                  </Box>
                  <IconButton onClick={() => handleRemove(item.itemId)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          </Box>

<Box flex={1} sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3, height: 'fit-content' }}>
  <Typography variant="h6" gutterBottom>
    Order Summary
  </Typography>

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
      <Typography variant="h6">₹{(getTotal() + 49).toFixed(2)}</Typography>
    </Stack>
  </Stack>

  <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={()=>router.push('/checkout')}>
    Proceed to Checkout
  </Button>
</Box>

        </Stack>
      )}
    </Box>
  );
};

export default Cart;
