import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from '@mui/material';
import { Dashboard } from '@mui/icons-material';

const actions = [
  { icon: <Dashboard/>, name: 'Dashboard', action: () => console.log('Go to Dashboard') },
  { icon: <ShoppingBagIcon />, name: 'My Orders', action: () => console.log('Go to Orders') },
  { icon: <FavoriteBorderIcon />, name: 'Wishlist', action: () => console.log('Go to Wishlist') },
  { icon: <AccountCircleIcon />, name: 'Profile', action: () => console.log('Go to Profile') },
  { icon: <LogoutIcon />, name: 'Logout', action: () => console.log('Logging out...') },
];

export default function OpenIconSpeedDial() {
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
            <Tooltip key={action.name} title={action.name} placement="left">
                <SpeedDialAction
                icon={action.icon}
                onClick={action.action}
                aria-label={action.name}
                />
            </Tooltip>
            ))}

      </SpeedDial>
    </Box>
  );
}
