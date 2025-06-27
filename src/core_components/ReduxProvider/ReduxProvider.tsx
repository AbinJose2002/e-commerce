'use client'

import React from 'react'
import Navbar from '../Navbar/Navbar'
import store from '@/store/store'
import { Provider } from 'react-redux'
type Props = {
    children: React.ReactNode
}
import { colors, createTheme, ThemeProvider } from "@mui/material";
import Footer from '../Footer/Footer'
import TopBar from '../TopBar/TopBar'
import NewsLetter from '../Footer/NewsLetter'

const theme = createTheme({
  typography: {
    fontFamily: "'Bebas Neue', sans-serif",
  },
  palette: {
    primary: {
      main: '#000000', // Black as the primary color
      contrastText: '#ffffff', // White text on primary
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'black' }, 
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
const ReduxProvider = ({children} : Props) => {

  return (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <TopBar />
            <Navbar />
            {children}
            <NewsLetter />
            <Footer />
        </ThemeProvider>
    </Provider>
  )
}

export default ReduxProvider
