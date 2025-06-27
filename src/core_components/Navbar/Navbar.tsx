'use client';

import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemText,
  Typography,
  IconButton,
  Drawer,
  ListItem,
  useTheme,
  useMediaQuery,
  Button,
  Avatar,
} from '@mui/material';
import {
  AccountCircle,
  SearchOutlined,
  ShoppingCart,
  Menu as MenuIcon,
  Person,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import { useRouter } from 'next/navigation';
import TextInput from '@/shared_features/TextInput';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLogged = useSelector((state: RootState) => state.authReducer.isLogged);
  const user = useSelector((state: RootState) => state.authReducer.user);

  const router = useRouter();

  const navLinks = [
    { label: 'Shop', href: '/products' },
    { label: 'On Sale', href: '/on-sale' },
    { label: 'New Arrival', href: '/new-arrival' },
    { label: 'Contact', href: '/contact' },
  ];

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLogIn = () => {
    router.push('/login');
  };

  const drawer = (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Menu
        </Typography>
        <List>
          {navLinks.map((item) => (
              <ListItem key={item.label} component="a" onClick={()=>router.push(item.href)}>
                <ListItemText
                  primary={
                    <Typography sx={{ color: 'black', textDecoration: 'none' }}>
                      {item.label}
                    </Typography>
                  }
                />
              </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          flexWrap: 'wrap',
        }}
      >
          <Typography
            onClick={()=>router.push('/')}
            variant="h4"
            sx={{ color: 'black', textDecoration: 'none' }}
          >
            KIDILAM STORE
          </Typography>

        {!isMobile && (
  <nav>
    <List sx={{ display: 'flex', gap: '20px' }}>
      {navLinks.map((item) => (
        <ListItemText
          key={item.label}
          primary={
            <Typography
              onClick={() => router.push(item.href)}
              sx={{ color: 'black', textDecoration: 'none', cursor: 'pointer' }}
            >
              {item.label}
            </Typography>
          }
        />
      ))}
    </List>
  </nav>
)}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {isMobile ? (
            <>
              {!isLogged ? (
                <Button
                  sx={{ backgroundColor: 'black' }}
                  variant="contained"
                  endIcon={<Person />}
                  onClick={handleLogIn}
                >
                  Login
                </Button>
              ) : (
                <>
                  <ShoppingCart />
                  {user?.photo ? (
                  <Avatar src={user.photo} />
                ) : (
                  <AccountCircle  />
                )}

                </>
              )}
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <>
              <TextInput label="Search for products..." icon={<SearchOutlined />}  />
              {!isLogged ? (
                <LoadingButton
                  sx={{ bgcolor: 'black' }}
                  variant="contained"
                  endIcon={<Person />}
                  onClick={()=>router.push('/login')}
                >
                  Login
                </LoadingButton>
              ) : (
                <>
                  <ShoppingCart />
                  {user?.photo ? (
                  <Avatar src={user.photo} />
                ) : (
                  <AccountCircle  />
                )}
                </>
              )}
            </>
          )}
        </Box>
      </Box>

      {isMobile && <Box sx={{ px: 2 }}><TextInput label="Search for products..." icon={<SearchOutlined />} /></Box>}

      {drawer}
    </Box>
  );
};

export default Navbar;
