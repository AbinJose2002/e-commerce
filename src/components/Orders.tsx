'use client'

import { Box, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Orders = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Typography variant="h4" mb={2}>My Orders</Typography>

      <Box width={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            width: { xs: '100%', md: '70%' },
            bgcolor: '#e8e8e8',
            padding: '10px',
            borderRadius: '20px',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth" // 👈 forces tabs to take equal width
            TabIndicatorProps={{ style: { display: 'none' } }} // hide bottom indicator
          >
            {['On Shipping', 'Arrived', 'Cancelled'].map((label, index) => (
              <Tab
                key={label}
                label={label}
                {...a11yProps(index)}
                sx={{
                  bgcolor: value === index ? '#fff' : 'transparent',
                  fontWeight: value === index ? 'bold' : 'normal',
                  borderRadius: 20,
                  mx: 1,
                  textTransform: 'none'
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
    </div>
  );
};

export default Orders;
