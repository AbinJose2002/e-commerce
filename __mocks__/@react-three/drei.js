jest.mock('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="mock-orbit-controls" />,
  useGLTF: jest.fn(() => ({ scene: <mesh data-testid="mock-gltf-model" /> })), // Mock useGLTF to return a mock scene
}));
