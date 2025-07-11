// import React, { Suspense } from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import Headphone from './Headphone'; // Adjust path as needed

// // Mock the @react-three/drei module
// jest.mock('@react-three/drei', () => ({
//   OrbitControls: () => <div data-testid="mock-orbit-controls" />,
//   useGLTF: jest.fn(() => ({ scene: <mesh data-testid="mock-gltf-model" /> })),
//   // Add other mocks from @react-three/drei if used (e.g., Environment)
// }));

// describe('Headphone Component', () => {
//   it('renders the Canvas with the mock model and OrbitControls', async () => {
//     render(<Headphone model="someModel" />);

//     // Check if the mock Canvas is rendered
//     expect(screen.getByTestId('mock-canvas')).toBeInTheDocument();

//     // Check if the mock OrbitControls are rendered
//     expect(screen.getByTestId('mock-orbit-controls')).toBeInTheDocument();

//     // Wait for the Suspense fallback to disappear and the model to load
//     await waitFor(() => {
//         expect(screen.getByTestId('mock-gltf-model')).toBeInTheDocument();
//     });
//   });

//   it('passes the correct model path to useGLTF', async () => {
//     // You'll need to mock useGLTF before rendering
//     const useGLTFMock = require('@react-three/drei').useGLTF;
//     useGLTFMock.mockReturnValue({ scene: <mesh data-testid="mock-gltf-model" /> });

//     render(<Headphone model="anotherModel" />);

//     await waitFor(() => {
//         expect(useGLTFMock).toHaveBeenCalledWith('/models/anotherModel.glb');
//     });
//   });

//   it('renders a fallback when the model is loading', () => {
//     render(<Headphone model="loadingModel" />);
//     expect(screen.getByTestId('mock-canvas')).toBeInTheDocument(); // Canvas should be there
//     // You could also assert for a specific fallback element if you add data-testid to it
//   });

//   // Example of testing props (scale and position are passed to the primitive)
//   it('passes the scale and position props correctly to the primitive', async () => {
//     const useGLTFMock = require('@react-three/drei').useGLTF;
//     useGLTFMock.mockReturnValue({ scene: <mesh data-testid="mock-gltf-model" /> });

//     render(<Headphone model="testModel" scale={[2, 2, 2]} position={[1, 1, 1]} />);

//     await waitFor(() => {
//       // Access the mock useGLTF and check the props passed to the primitive's object
//       // This might require a slightly more complex mock for the primitive component
//       // to capture and assert on the props.
//       // For a simpler test, you might rely on snapshot testing the rendered component.
//       // Or, you could test the `HeadphoneModel` component in isolation more rigorously.
//     });
//   });
// });
