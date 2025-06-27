'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Box } from '@mui/material';

type Props = {
  model: string;
  scale?: number | number[]
  position?: number | number[]
};

const HeadphoneModel = ({ model, scale, position }: Props) => {
  const gltf = useGLTF(`/models/${model}.glb`);
  useGLTF.preload(`/models/${model}.glb`);

  return <primitive object={gltf.scene} scale={scale} position={position} />;
};

const Headphone = (props: Props) => {
  return (
    <Box sx={{ height: '400px', width: '100%', padding: '20px' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={'Loading...'}>
          <HeadphoneModel model={props.model} scale={props.scale} position={props.position} />
        </Suspense>
        <OrbitControls enableZoom={true} />
      </Canvas>
    </Box>
  );
};

export default Headphone;
