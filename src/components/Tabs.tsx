'use client'

import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import SharedForm from '@/shared_features/SharedForm';

const Tabs = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: 'auto',
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            bgcolor: 'background.paper',
          }}
        >
          <TabList onChange={handleChange} aria-label="login/register tabs" variant="fullWidth">
            <Tab label="Login" value="1" />
            <Tab label="Register" value="2" />
          </TabList>
        </Box>

        <Box sx={{ minHeight: '300px', paddingTop: 2 }}>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <SharedForm type="login" />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}>
            <SharedForm type="register" />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};

export default Tabs;
