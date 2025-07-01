'use client'

import {
  Box,
  Chip,
  Typography,
} from '@mui/material'
import AccordianWrapper from '@/Wrappers/AccordianWrapper'
import { useSearchParams } from 'next/navigation';

const Sidebar = () => {

  const params = useSearchParams();
    const rating = params.get('rating');    
    console.log(rating)


    const handleClick = () => {
      console.log('object')
    }
  
  return (
    <Box sx={{ width: '100%', p: 2, borderRadius: 3 }}>
        {rating && (<Box>
          <Chip label={`Rating: ${rating}`} onClick={handleClick} />
          </Box>)
          }
        <Typography variant="h6" fontWeight="bold" mb={2}>Filters</Typography>
        <AccordianWrapper />
        
    </Box>
  )
}

export default Sidebar
