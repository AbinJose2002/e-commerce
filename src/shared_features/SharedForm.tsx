'use client';

import { useState } from 'react';
import { asyncLogin, googleLogin } from '@/store/AuthSlice';
import { AppDispatch } from '@/store/store';
import { Google } from '@mui/icons-material';

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
import { loginSchema, registerSchema } from '@/schema';

type Props = {
  head?: string;
  subHead?: string;
  type?: 'login' | 'register';
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
        handleLogin(values)
      console.log('Form Submitted:', values);
      if (props.type === 'login') {
        
      }
    },
    validationSchema: props.type === 'login' ? loginSchema : registerSchema
  });

  if (props.type === 'login') {
    return (
      <Box p={2}>
        <Stack spacing={2}>
          <Typography variant="h3">Login</Typography>
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
                Login
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

        <Snackbar open={open} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}} autoHideDuration={6000} onClose={() => setOpen(false)}>
            <Alert severity={alertSeverity} onClose={() => setOpen(false)} sx={{ width: '100%' }}>
                {alertMessage}
            </Alert>
        </Snackbar>



      </Box>
    );
  }

  return (
    <Box p={2}>
      <Stack spacing={2}>
        <Typography variant="h3">Register</Typography>
        <Typography variant="h4">Create A New Account</Typography>
      </Stack>
      <form onSubmit={formData.handleSubmit}>
        <Snackbar open={open} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}} autoHideDuration={6000} onClose={() => setOpen(false)}>
            <Alert severity={alertSeverity} onClose={() => setOpen(false)} sx={{ width: '100%' }}>
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
              Register
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
  );
};

export default SharedForm;
