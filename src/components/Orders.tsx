'use client'

import { Box, Grid, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import OrderCard from './OrderCard';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// ✅ Custom tab panel that shows content only when active
function CustomTabPanel(props: { children: React.ReactNode; value: number; index: number }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
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
            variant="fullWidth"
            TabIndicatorProps={{ style: { display: 'none' } }}
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
                  textTransform: 'none',
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Box>

      {/* ✅ Tab Content */}
      <CustomTabPanel value={value} index={0}>
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <OrderCard/>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <OrderCard/>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <OrderCard/>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <OrderCard/>
            </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Arrived Orders
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Cancelled Orders
      </CustomTabPanel>
    </div>
  );
};

export default Orders;
