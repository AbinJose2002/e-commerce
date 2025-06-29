'use client'

import {
  Box,
  Button,
  Typography,
} from '@mui/material'
import AccordianWrapper from '@/Wrappers/AccordianWrapper'

const Sidebar = () => {

    
  
  return (
    <Box sx={{ width: '100%', p: 2, borderRadius: 3 }}>
      
        <Typography variant="h6" fontWeight="bold" mb={2}>Filters</Typography>
        <AccordianWrapper />

        <Button
          variant={"black"}
          fullWidth
          sx={{ mt: 3, borderRadius: '20px', textTransform: 'none', fontWeight: 'bold' }}
        >
          Apply Filter
        </Button>
        
    </Box>
  )
}

export default Sidebar
