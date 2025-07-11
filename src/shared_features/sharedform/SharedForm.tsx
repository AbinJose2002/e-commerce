'use client';

import { useState } from 'react';
import { asyncLogin, asyncRegister, googleLogin } from '../../store/AuthSlice';
import { AppDispatch } from '../../store/store';
import { Google, Send } from '@mui/icons-material';

import {
    Alert,
  Box,
  Button,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { contactSchema, loginSchema, registerSchema } from '../../schema/index';
import { useRouter } from 'next/navigation';

type Props = {
  head?: string;
  subHead?: string;
  type?: 'login' | 'register' | 'contact';
};

export type FormType = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  number?: string;
};

const SharedForm = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
    const router = useRouter()

    const handleGoogleLogin = async () => {
        try {
            const action = await dispatch(googleLogin());

            if (googleLogin.fulfilled.match(action)) {
              setAlertMessage('Logged in successfully!');
              setAlertSeverity('success'); 
            } else {
              throw new Error("Login failed");
            }
          } catch  {
            setAlertMessage('Login failed.');
            setAlertSeverity('error'); 
          } finally {
            setOpen(true); 
            setTimeout(() => {
              router.push('/')
            }, 3000);
        }
      };
      
    const handleLogin = async (values: FormType) => {
      try {
        const resultAction = await dispatch(asyncLogin(values));

        if (asyncLogin.fulfilled.match(resultAction)) {
          setAlertMessage('Logged in successfully!');
                setAlertSeverity('success'); 
            } else {
                throw new Error("Login failed");
            }
        } catch  {
            setAlertMessage('Login failed.');
            setAlertSeverity('error');
        } finally {
            setOpen(true);  
            setTimeout(() => {
              router.push('/')
            }, 3000);
        }
    };

    const handleContact = () => {
      setAlertMessage('Message sent successfully!');
      setAlertSeverity('success');
      setOpen(true);
      setTimeout(() => {
        router.push('/')
      }, 3000);
    }

    const handleRegister = async (values: FormType) => {
        try {
            const resultAction = await dispatch(asyncRegister(values));
            if (asyncRegister.fulfilled.match(resultAction)) {
                setAlertMessage('Registration successfully!');
                setAlertSeverity('success'); 
            } else {
                throw new Error("Login failed");
            }
        } catch  {
            setAlertMessage('Login failed.');
            setAlertSeverity('error');
        } finally {
            setOpen(true);  
            setTimeout(() => {
              router.push('/')
            }, 3000);
        }
    };

  const formData = useFormik<FormType>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      number: '',
    },
    onSubmit: (values) => {
      console.log('object')
      if (props.type === 'login') {
        console.log('message success')
        handleLogin(values);
      } else if (props.type === 'register') {
        console.log('message success')
        handleRegister(values);
      } else if (props.type === 'contact'){
        console.log('message success')
        handleContact();
      }
    },
    validationSchema:
  props.type === 'login' ? loginSchema : props.type === 'register' ? registerSchema : props.type === 'contact' ? contactSchema : null,});

  if (props.type === 'login') {
    return (
      <Box p={2}>
        <Stack spacing={2}>
          <Typography variant="h3">User Login</Typography>
          <Typography variant="h4">Log Into An Exclusive</Typography>
        </Stack>
        <form onSubmit={formData.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="email"
              fullWidth
              label="Email Address"
              variant="outlined"
              value={formData.values.email}
              onChange={formData.handleChange}
                helperText={!formData.errors.email && !formData.touched.email ? "" : formData.errors.email} 
                error={!formData.errors.email && !formData.touched.email ? false : true}
            />
            <TextField
              name="password"
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={formData.values.password}
              onChange={formData.handleChange}
                helperText={!formData.errors.password && !formData.touched.password ? "" : formData.errors.password} 
                error={!formData.errors.password && !formData.touched.password ? false : true}
            />
            <Stack direction="row" justifyContent="space-between">
              <Button
                type="submit"
                variant="contained"
                sx={{ minWidth: '100px', bgcolor: 'black' }}
              >
                Login Now
              </Button>
              <Link underline="none" color="black">
                Forget Password?
              </Link>
            </Stack>
            <Typography variant="subtitle1">Or sign in with</Typography>
            <Button
              type="button"
              sx={{ bgcolor: 'black' }}
              variant="contained"
              startIcon={<Google />}
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </Button>
          </Stack>
        </form>

        <Snackbar data-testid='alert' open={open} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}} autoHideDuration={3000} >
            <Alert role='alert' severity={alertSeverity}  sx={{ width: '100%' }}>
                {alertMessage}
            </Alert>
        </Snackbar>



      </Box>
    );
  }

  else if (props.type === 'contact') {
    return (
      <Box p={2}>
        <Stack spacing={2}>
          <Typography variant="h3">Contact</Typography>
        </Stack>
        <form onSubmit={formData.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="name"
              fullWidth
              label="Name"
              variant="outlined"
              value={formData.values.name}
              onChange={formData.handleChange}
                helperText={!formData.errors.name && !formData.touched.name ? "" : formData.errors.name} 
                error={!formData.errors.name && !formData.touched.name ? false : true}
            />
            <TextField
              name="email"
              fullWidth
              label="Email Address"
              variant="outlined"
              value={formData.values.email}
              onChange={formData.handleChange}
                helperText={!formData.errors.email && !formData.touched.email ? "" : formData.errors.email} 
                error={!formData.errors.email && !formData.touched.email ? false : true}
            />
            <TextField
              name="number"
              fullWidth
              label="Mobile Number"
              variant="outlined"
              value={formData.values.number}
              onChange={formData.handleChange}
                helperText={!formData.errors.number && !formData.touched.number ? "" : formData.errors.number} 
                error={!formData.errors.number && !formData.touched.number ? false : true}
            />
            <TextField
              rows={3}
              multiline
              name="message"
              fullWidth
              label="Enter Mesage"
              variant="outlined"
            />
            
            <Button
              type="submit"
              variant="contained"
              sx={{ minWidth: '100px', bgcolor: 'black' }}
            >
              Send Enquiry
            </Button>
          </Stack>
        </form>

        <Snackbar data-testid='alert' open={open} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}} autoHideDuration={3000} >
            <Alert role='alert' severity={alertSeverity}  sx={{ width: '100%' }}>
                {alertMessage}
            </Alert>
        </Snackbar>



      </Box>
    );
  }

  else {
    return (
    <Box p={2}>
      <Stack spacing={2}>
        <Typography variant="h3">User Register</Typography>
        <Typography variant="h4">Create A New Account</Typography>
      </Stack>
      <form onSubmit={formData.handleSubmit}>
        <Snackbar open={open} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}} autoHideDuration={6000} >
            <Alert severity={alertSeverity} sx={{ width: '100%' }}>
                {alertMessage}
            </Alert>
        </Snackbar>

        <Stack spacing={2}>
          <TextField
            name="name"
            fullWidth
            label="Name"
            variant="outlined"
            value={formData.values.name}
            onChange={formData.handleChange}
            helperText={!formData.errors.name && !formData.touched.name ? "" : formData.errors.name} 
                error={!formData.errors.name && !formData.touched.name ? false : true}
          />
          <TextField
            name="email"
            fullWidth
            label="Email Address"
            variant="outlined"
            value={formData.values.email}
            onChange={formData.handleChange}
            helperText={!formData.errors.email && !formData.touched.email ? "" : formData.errors.email} 
                error={!formData.errors.email && !formData.touched.email ? false : true}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              name="password"
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={formData.values.password}
              onChange={formData.handleChange}
              helperText={!formData.errors.password && !formData.touched.password ? "" : formData.errors.password} 
                error={!formData.errors.password && !formData.touched.password ? false : true}
            />
            <TextField
              name="confirmPassword"
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={formData.values.confirmPassword}
              onChange={formData.handleChange}
              helperText={!formData.errors.confirmPassword && !formData.touched.confirmPassword ? "" : formData.errors.confirmPassword} 
                error={!formData.errors.confirmPassword && !formData.touched.confirmPassword ? false : true}
            />
          </Stack>
          <TextField
            name="number"
            fullWidth
            label="Mobile Number"
            variant="outlined"
            value={formData.values.number}
            onChange={formData.handleChange}
            helperText={!formData.errors.number && !formData.touched.number ? "" : formData.errors.number} 
                error={!formData.errors.number && !formData.touched.number ? false : true}
          />
          <Stack direction="row" justifyContent="space-between">
            <Button
              type="submit"
              variant="contained"
              sx={{ minWidth: '100px', bgcolor: 'black' }}
            >
              Register Now
            </Button>
            <Link underline="none" color="black">
              Forget Password?
            </Link>
          </Stack>
          <Typography variant="subtitle1">Or sign in with</Typography>
            <Button
              type="button"
              sx={{ bgcolor: 'black' }}
              variant="contained"
              startIcon={<Google />}
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </Button>
        </Stack>
      </form>
    </Box>
  );}
};

export default SharedForm;
