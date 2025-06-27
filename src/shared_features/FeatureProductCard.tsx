'use client'

import { Box, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import SkeletonCard from './SkeletonCard'

export type Product = {
  id: number;
  category: string;
  brand: string;
  thumbnail: string;
  title: string | null;
  price: number;
  discountPercentage: number;
  rating: number;
  reviews?: object[];
};

type Props = {
  head?: string;
  type?: 'new' | 'top';
};

const FeatureProductCard = ({ head, type }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skipParam = type === 'new' ? '&skip=10' : '';
        const res = await axios.get(`https://dummyjson.com/products?limit=4${skipParam}`);
        setProducts(res.data.products);
        setLoading(true)
      } catch (_error) {
      }
    };

    fetchData();
  }, [type]);

  return (
    <Box margin={8}>
      <Typography variant="h4" align="center" mb={4}>
        {head}
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={3}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        {loading ? products.map((item, index) => (
          <Box key={index} sx={{ mt: { xs: 8, md: 0 } }}>
  <ProductCard
    id={item.id}
    category={item.category}
    brand={item.brand}
    thumbnail={item.thumbnail}
    title={item.title}
    price={item.price}
    discountPercentage={item.discountPercentage}
    rating={item.rating}
    reviews={item.reviews ?? []}
  />
</Box>

        )) :
          <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          </>
          }
      </Stack>
    </Box>
  );
};

export default FeatureProductCard;
