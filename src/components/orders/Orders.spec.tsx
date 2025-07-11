import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Orders from './Orders';
import '@testing-library/jest-dom';

jest.mock('../order-card/OrderCard', () => {
  const MockOrderCard = () => <div data-testid="order-card">Mock OrderCard</div>;
  MockOrderCard.displayName = 'MockOrderCard';
  return MockOrderCard;
});

describe('Orders component', () => {
  it('renders heading and initial tab', () => {
    render(<Orders />);
    expect(screen.getByText(/My Orders/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /On Shipping/i })).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    expect(screen.getAllByTestId('order-card')).toHaveLength(4); // 4 mock order cards
  });

  it('switches to Arrived tab', () => {
    render(<Orders />);
    const arrivedTab = screen.getByRole('tab', { name: /Arrived/i });
    fireEvent.click(arrivedTab);
    expect(screen.getByText('Arrived Orders')).toBeInTheDocument();
  });

  it('switches to Cancelled tab', () => {
    render(<Orders />);
    const cancelledTab = screen.getByRole('tab', { name: /Cancelled/i });
    fireEvent.click(cancelledTab);
    expect(screen.getByText('Cancelled Orders')).toBeInTheDocument();
  });

  it('does not show previous tab content when tab changes', () => {
    render(<Orders />);
    const arrivedTab = screen.getByRole('tab', { name: /Arrived/i });
    fireEvent.click(arrivedTab);
    expect(screen.queryByTestId('order-card')).not.toBeInTheDocument();
  });
});
