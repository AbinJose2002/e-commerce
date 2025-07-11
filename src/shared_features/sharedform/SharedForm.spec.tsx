import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SharedForm from './SharedForm';
import { asyncLogin, asyncRegister, googleLogin } from '../../store/AuthSlice';

const mockStore = configureStore([]);
const store = mockStore({});
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush  
  }),
}))

// Single mock setup
jest.mock('../../store/AuthSlice', () => ({
  asyncLogin: jest.fn(),
  asyncRegister: jest.fn(),
  googleLogin: jest.fn(),
}));

// Add matchers to mocked thunks
(asyncLogin as any).fulfilled = {
  match: (action: any) => action.type === 'auth/asyncLogin/fulfilled',
};
(asyncLogin as any).rejected = {
  match: (action: any) => action.type === 'auth/asyncLogin/rejected',
};
(asyncRegister as any).fulfilled = {
  match: (action: any) => action.type === 'auth/asyncRegister/fulfilled',
};
(asyncRegister as any).rejected = {
  match: (action: any) => action.type === 'auth/asyncRegister/rejected',
};
(googleLogin as any).fulfilled = {
  match: (action: any) => action.type === 'auth/googleLogin/fulfilled',
};
(googleLogin as any).rejected = {
  match: (action: any) => action.type === 'auth/googleLogin/rejected',
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('SharedForm', () => {
  it('renders login form and submits', async () => {
    (asyncLogin as jest.Mock).mockImplementationOnce(() => ({
      type: 'auth/asyncLogin/fulfilled',
      meta: { requestStatus: 'fulfilled' },
    }));

    render(
      <Provider store={store}>
        <SharedForm type="login" />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'test@123' } });
    fireEvent.click(screen.getByRole('button', { name: /Login Now/i }));

    const alert = await screen.findByRole('alert');

    await waitFor(() => {
      expect(asyncLogin).toHaveBeenCalledWith({
        email: 'test@gmail.com',
        password: 'test@123',
        confirmPassword: '',
        name: '',
        number: '',
      });
      expect(alert).toHaveTextContent(/Logged in successfully!|Login failed\./);
    });
    await waitFor(()=>{
      expect(mockPush).toHaveBeenCalledWith('/')
    })

    // const closeBtn = alert.querySelector('button[aria-label="Close"]');
    // expect(closeBtn).toBeInTheDocument();
    // fireEvent.click(closeBtn!);

    // // Wait for it to disappear
    // await waitFor(() => {
    //   expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    // });
    // await waitFor(()=>{
    //   expect(screen.getByRole('alert')).toHaveTextContent(/Logged in successfully!|Login failed\./);

    // })
  });

  it('renders register form and handles registration', async () => {
    (asyncRegister as jest.Mock).mockImplementationOnce(() => ({
      type: 'auth/asyncRegister/fulfilled',
      meta: { requestStatus: 'fulfilled' },
    }));

    render(
      <Provider store={store}>
        <SharedForm type="register" />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test1' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test1@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'test1@123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'test1@123' } });
    fireEvent.change(screen.getByLabelText(/Mobile Number/i), { target: { value: '1230654789' } });

    fireEvent.click(screen.getByRole('button', { name: /Register Now/i }));

    await waitFor(() => {
      expect(asyncRegister).toHaveBeenCalledWith({
        name: 'Test1',
        email: 'test1@gmail.com',
        password: 'test1@123',
        confirmPassword: 'test1@123',
        number: '1230654789',
      });
      expect(screen.getByRole('alert')).toHaveTextContent(/Registration successfully!|Login failed\./);
    });
  });

  it('renders contact form', () => {
    render(
      <Provider store={store}>
        <SharedForm type="contact" />
      </Provider>
    );
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter Mesage/i)).toBeInTheDocument();
  });

  it('handles Google login', async () => {
    (googleLogin as jest.Mock).mockImplementationOnce(() => ({
      type: 'auth/googleLogin/fulfilled',
      meta: { requestStatus: 'fulfilled' },
    }));

    render(
      <Provider store={store}>
        <SharedForm type="login" />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Sign in with Google/i }));

    await waitFor(() => {
      expect(googleLogin).toHaveBeenCalled();
      expect(screen.getByRole('alert')).toHaveTextContent(/Logged in successfully!|Login failed\./);
    });
  });

  it('shows error alert on register failure (rejected)', async () => {
    (asyncRegister as jest.Mock).mockImplementationOnce(() => ({
      type: 'auth/asyncRegister/rejected',
      meta: { requestStatus: 'rejected' },
    }));

    render(
      <Provider store={store}>
        <SharedForm type="register" />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'FailUser' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'fail@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'fail@123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'fail@123' } });
    fireEvent.change(screen.getByLabelText(/Mobile Number/i), { target: { value: '9999999999' } });

    fireEvent.click(screen.getByRole('button', { name: /Register Now/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Login failed\./);
    });
  });

  it('shows error alert on register exception (catch block)', async () => {
    (asyncRegister as jest.Mock).mockImplementationOnce(() => {
      throw new Error('API failure');
    });

    render(
      <Provider store={store}>
        <SharedForm type="register" />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'ErrorUser' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'error@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'error@123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'error@123' } });
    fireEvent.change(screen.getByLabelText(/Mobile Number/i), { target: { value: '1234567890' } });

    fireEvent.click(screen.getByRole('button', { name: /Register Now/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Login failed\./);
    });
  });

  it('shows error alert on login failure (rejected)', async () => {
    (asyncLogin as jest.Mock).mockImplementationOnce(() => ({
      type: 'auth/asyncLogin/rejected',
      meta: { requestStatus: 'rejected' },
    }));

    render(
      <Provider store={store}>
        <SharedForm type="login" />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'fail@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'fail@123' } });

    fireEvent.click(screen.getByRole('button', { name: /Login Now/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Login failed\./);
    });
  });

  it('shows error alert on login exception (catch block)', async () => {
    (asyncLogin as jest.Mock).mockImplementationOnce(() => {
      throw new Error('API failure');
    });

    render(
      <Provider store={store}>
        <SharedForm type="login" />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'error@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'error@123' } });

    fireEvent.click(screen.getByRole('button', { name: /Login Now/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Login failed\./);
    });
  });
  it('shows error alert on login failure (rejected)', async () => {
    (googleLogin as jest.Mock).mockImplementationOnce(() => ({
      type: 'auth/googleLogin/rejected',
      meta: { requestStatus: 'rejected' },
    }));

    render(
      <Provider store={store}>
        <SharedForm type="login" />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Sign in with Google/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Login failed\./);
    });
  });

  it('shows error alert on login exception (catch block)', async () => {
    (googleLogin as jest.Mock).mockImplementationOnce(() => {
      throw new Error('API failure');
    });

    render(
      <Provider store={store}>
        <SharedForm type="login" />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Sign in with Google/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Login failed\./);
    });
  });

  it('submits contact form and shows success alert', async () => {
  render(
    <Provider store={store}>
      <SharedForm type="contact" />
    </Provider>
  );
  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
  fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'testuser@example.com' } });
  fireEvent.change(screen.getByLabelText(/Mobile Number/i), { target: { value: '9876543210' } });
  fireEvent.change(screen.getByLabelText(/Enter Mesage/i), { target: { value: 'Hello, I need support' } });

  fireEvent.click(screen.getByRole('button', { name: /Send Enquiry/i }));
  const alert = await screen.findByRole('alert');
  jest.runAllTimers();

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
      expect(alert).toHaveTextContent(/Message sent successfully!/);
    });
});

});

