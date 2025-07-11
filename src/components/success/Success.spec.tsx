// import { render, screen, waitFor } from '@testing-library/react';
// import React from 'react';
// import '@testing-library/jest-dom';
// import Success from './Success';

// // Mock Next.js router
// const mockPush = jest.fn();
// jest.mock('next/navigation', () => ({
//   useRouter: () => ({
//     push: mockPush,
//   }),
// }));

// // ✅ Mock Confetti component
// jest.mock('react-confetti',
//     () => {
//         const confettiComp = (props: {width: number, height: number, numberOfPieces: number, recycle: boolean}) => <div data-testid="confetti" {...props} />;
//         confettiComp.displayName = 'confetti-component'
// }
// );

// describe('Success Component', () => {
//   beforeEach(() => {
//     jest.useFakeTimers(); // Mock timers
//   });

//   afterEach(() => {
//     jest.clearAllTimers();
//     jest.clearAllMocks();
//     jest.useRealTimers();
//   });

//   it('renders success message and image', () => {
//     render(<Success />);

//     expect(
//       screen.getByText(/your order has been placed successfully/i)
//     ).toBeInTheDocument();

//     // Image src from remote link is transformed by next/image, so we match partially
//     const successImg = screen.getByAltText('success-icon') as HTMLImageElement;
//     expect(successImg.src).toMatch(/i\.gifer\.com\/7efs\.gif/);

//     expect(screen.getByTestId('confetti')).toBeInTheDocument();
//   });

//   it('redirects to home after 5 seconds', async () => {
//     render(<Success />);

//     jest.advanceTimersByTime(5000);

//     await waitFor(() => {
//       expect(mockPush).toHaveBeenCalledWith('/');
//     });
//   });
// });
