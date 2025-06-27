import { Box, Paper, Typography, Stack, Rating } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/navigation';
import { getDiscountedPrice } from './commonFunctions';

type Review = {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

type Props = {
    id?: number
    category?: string
    brand: string
    thumbnail: string
    title: string | null
    price: number
    discountPercentage: number
    rating: number,
    reviews: Review[]
}

const ProductCard = ({
  id,
  category,
  brand,
  thumbnail,
  title,
  price,
  discountPercentage,
  rating,
  // reviews,
}: Props) => {

  const handleWishIcon = (e: React.MouseEvent<SVGElement>) => {
  const target = e.currentTarget;
  target.style.color = target.style.color === 'red' ? 'black' : 'red';
}

const router = useRouter()

const handleProductSelect = (item: number) => {
  router.push(`/item?product=${item}`)
}


  return (
    <Box onClick={()=>handleProductSelect(id as number)}>
      <Paper elevation={10} sx={{ minHeight: 350, width: 250, borderRadius: "20px", padding: 2, position: 'relative'}}>
          <Stack spacing={1}>
            <Box sx={{position: 'absolute', top: 16, right: 16}} >
                <FavoriteIcon onClick={(e)=>handleWishIcon(e)}/>
            </Box>
            <Image
              src={thumbnail}
              alt='Product thumbnail'
              width={230}
              height={180}
              style={{ borderRadius: "10px", objectFit: "cover" }}
            />
            <Typography variant="h6" fontWeight="bold" noWrap>
              {title}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
                <Rating name="read-only" value={rating} readOnly precision={0.1} sx={{ color: 'grey' }} />
                <Typography variant="caption">
                    ({rating})
                </Typography>
            </Stack>

            <Typography variant="caption" fontWeight="bold" noWrap>
              {brand}, {category}
            </Typography>

            <Box display="flex" alignItems="baseline" gap={1}>
                <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                    ₹{getDiscountedPrice(price, discountPercentage)}
                    </Typography>
                    
                    <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    ₹{price}
                    </Typography>

                    <Typography variant="caption" color="error">
                    ({discountPercentage}% off)
                    </Typography>
                </Stack>
            </Box>


            
          </Stack>
      </Paper>
    </Box>
  )
}

export default ProductCard