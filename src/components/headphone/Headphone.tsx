'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Box } from '@mui/material';

type Props = {
  model: string;
  scale?: [number, number, number];
  position?: [number, number, number] ;
};

const HeadphoneModel = ({ model, scale, position }: Props) => {
  const path = `/models/${model}.glb`;
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={scale} position={position} />;
};

useGLTF.preload('/models/yourDefaultModel.glb'); // preload one if needed

const Headphone = ({ model, scale = [1, 1, 1], position = [0, 0, 0] }: Props) => {
  return (
    <Box sx={{ height: '400px', width: '100%', padding: '20px' }}>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={<mesh><boxGeometry /><meshStandardMaterial /></mesh>}>
          <HeadphoneModel model={model} scale={scale} position={position} />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </Box>
  );
};

export default Headphone;
