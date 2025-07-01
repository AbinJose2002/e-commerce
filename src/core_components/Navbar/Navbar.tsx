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
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import {
  AccountCircle,
  ShoppingCart,
  Menu as MenuIcon,
  Person,
  Favorite,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { asyncSignOut } from '@/store/AuthSlice';
import SearchAutocomplete from '@/shared_components/SearchAutoComplete';


const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLogged = useSelector((state: RootState) => state.authReducer.isLogged);
  const user = useSelector((state: RootState) => state.authReducer.user);
  const cart = useSelector((state: RootState) => state.cartReducer.items)
  const wish = useSelector((state: RootState) => state.WishlistReducer.items)

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

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

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path: string) => {
    router.push(path);
    handleClose();
  };

  const handleLogout = () => {
  dispatch(asyncSignOut()).then(() => {
    router.push('/');
    handleClose();
  });
};


  const drawer = (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Menu
        </Typography>
        <List>
          {navLinks.map((item) => (
            <ListItem key={item.label} component="a" onClick={() => router.push(item.href)}>
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
          onClick={() => router.push('/')}
          variant="h4"
          sx={{ color: 'black', textDecoration: 'none', cursor: 'pointer' }}
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
                  <Badge badgeContent={wish.length} onClick={() => router.push('/wishlist')}>
                    <Favorite />
                  </Badge>
                  <Badge badgeContent={cart.length} onClick={() => router.push('/cart')}>
                    <ShoppingCart />
                  </Badge>
                  <IconButton onClick={handleAvatarClick}>
                    {user?.photo ? <Avatar src={user.photo} /> : <AccountCircle />}
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <MenuItem onClick={() => handleMenuClick('/dashboard')}>Dashboard</MenuItem>
                    <MenuItem onClick={() => handleMenuClick('/profile')}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              )}
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <>
              {/* <TextInput label="Search for products..." icon={<SearchOutlined />} /> */}
              <SearchAutocomplete />
              {/* <Autocomplete
                disablePortal
                value={'abin'}
                onChange={(e)=>e.target.value}
                options={['abin','jose']}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Search Your Products..." />}
              /> */}

              {!isLogged ? (
                <LoadingButton
                  sx={{ bgcolor: 'black' }}
                  variant="contained"
                  endIcon={<Person />}
                  onClick={handleLogIn}
                >
                  Login
                </LoadingButton>
              ) : (
                <>
                  <Badge badgeContent={wish.length} onClick={() => router.push('/wishlist')}>
                    <Favorite />
                  </Badge>
                  <Badge badgeContent={cart.length} color={'primary'} onClick={() => router.push('/cart')}>
                    <ShoppingCart />
                  </Badge>
                  <IconButton onClick={handleAvatarClick}>
                    {user?.photo ? <Avatar src={user.photo} /> : <AccountCircle />}
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <MenuItem onClick={() => handleMenuClick('/dashboard')}>Dashboard</MenuItem>
                    <MenuItem onClick={() => handleMenuClick('/profile')}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              )}
            </>
          )}
        </Box>
      </Box>

      {isMobile && (
        <Box sx={{ px: 2 }}>
          {/* <TextInput label="Search for products..." icon={<SearchOutlined />} /> */}
        </Box>
      )}

      {drawer}
    </Box>
  );
};

export default Navbar;
