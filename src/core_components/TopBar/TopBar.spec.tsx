import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopBar from './TopBar';

describe('TopBar Component', () => {
  it('renders the top bar with correct text', () => {
    render(<TopBar />);
    const topBarText = screen.getByTitle('top-bar');
    expect(topBarText).toBeInTheDocument();
    expect(topBarText).toHaveTextContent('Sign up and get 20% off to your first order. Sign Up Now');
  });
});
