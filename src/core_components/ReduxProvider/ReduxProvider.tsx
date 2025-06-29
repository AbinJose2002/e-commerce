'use client'

import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import store, { AppDispatch } from '@/store/store';
import { Provider, useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from "@mui/material";
import Footer from '../Footer/Footer';
import TopBar from '../TopBar/TopBar';
import NewsLetter from '../Footer/NewsLetter';
import { checkAuthFromCookie } from '@/store/AuthSlice';

type Props = {
    children: React.ReactNode;
};

const theme = createTheme({
  typography: {
    fontFamily: "'Bebas Neue', sans-serif",
  },
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' }, 
          style: {
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: '#333',
            },
          },
        },
      ],
    },
  },
});

// Separate component to use Redux hooks inside <Provider>
const InitAuthChecker = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuthFromCookie());
  }, [dispatch]);

  return null;
};;

const ReduxProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <InitAuthChecker />
        <TopBar />
        <Navbar />
        {children}
        <NewsLetter />
        <Footer />
      </ThemeProvider>
    </Provider>
  );
};

export default ReduxProvider;
