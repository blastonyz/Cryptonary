'use client'
import React, { Suspense } from 'react';
import {  useGLTF } from '@react-three/drei';


const Model = ({ url }) => {
  const { scene } = useGLTF(url);

  return <primitive object={scene} />;
};

const CageMesh = () => {
  return (
 
      <Suspense fallback={null}>
        <Model url="/cage.glb" position={[0, 0, -1]}/>
      </Suspense>
    
  );
};

export default CageMesh;
