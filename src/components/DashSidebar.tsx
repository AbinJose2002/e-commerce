'use client'
import { Inbox, Mail } from '@mui/icons-material';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react'

const DashSidebar = () => {

  const DrawerList = (
    <Box width={200} role="presentation">
      <List>
        {['Home', 'Orders', 'Shops', 'Customers', 'Commissions', 'Subscriptions'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Settings', 'Profile'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Drawer open={true}  variant='permanent' slotProps={{
    paper: {
      sx: {
        height: '90vh',
        top: '64px', 
      },
    },
  }}>
            {DrawerList}
        </Drawer>
    </Box>
  )
}

export default DashSidebar
