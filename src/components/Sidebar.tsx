'use client';

import { Box, Chip, Stack, Typography } from '@mui/material';
import AccordianWrapper from '@/Wrappers/AccordianWrapper';
import { useSearchParams, useRouter } from 'next/navigation';

const Sidebar = () => {
  const params = useSearchParams();
  const router = useRouter();

  const rating = params.get('rating');
  const minPrice = params.get('minPrice');
  const maxPrice = params.get('maxPrice');

  const handleDelete = (key: string) => {
    const currentParams = new URLSearchParams(params.toString());
    console.log(currentParams)
    currentParams.delete(key);

    const newQuery = currentParams.toString();
    const newPath = newQuery ? `?${newQuery}` : '/products'; 

    router.push(newPath); 
  };

  return (
    <Box sx={{ width: '100%', p: 2, borderRadius: 3 }}>
      {(rating || minPrice || maxPrice) && (
        <Stack pt={2} spacing={2} direction="row" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {rating && <Chip label={`Rating: ${rating}`} onDelete={() => handleDelete('rating')} />}
          {minPrice && <Chip label={`Min Price: ${minPrice}`} onDelete={() => handleDelete('minPrice')} />}
          {maxPrice && <Chip label={`Max Price: ${maxPrice}`} onDelete={() => handleDelete('maxPrice')} />}
        </Stack>
      )}

      <Typography variant="h6" fontWeight="bold" mb={2}>
        Filters
      </Typography>
      <AccordianWrapper />
    </Box>
  );
};

export default Sidebar;
