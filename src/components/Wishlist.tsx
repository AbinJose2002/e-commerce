'use client';

import { Box, Typography, Stack, IconButton, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addToCart } from '@/store/cartslice'; // Optional: Move item to cart
import { clearWishlist, removeFromWishlist, WishlistItem } from '@/store/wishliststore';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems: WishlistItem[] = useSelector((state: RootState) => state.WishlistReducer.items);

  const handleRemove = (itemId: number) => {
    dispatch(removeFromWishlist(itemId));
  };

  const handleMoveToCart = (item: WishlistItem) => {
    dispatch(addToCart({ ...item, count: 1 }));
    dispatch(removeFromWishlist(item.itemId));
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Wishlist
      </Typography>

      {wishlistItems.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
          Your wishlist is empty.
        </Typography>
      ) : (
        <>
          <Stack spacing={2}>
            {wishlistItems.map((item) => (
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
                </Box>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleMoveToCart(item)}
                  >
                    Move to Cart
                  </Button>

                  <IconButton onClick={() => handleRemove(item.itemId)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Box>
            ))}
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Button variant="outlined" color="error" onClick={() => dispatch(clearWishlist())}>
            Clear Wishlist
          </Button>
        </>
      )}
    </Box>
  );
};

export default Wishlist;
