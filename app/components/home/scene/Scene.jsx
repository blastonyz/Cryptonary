'use client'
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import DeformableMesh from "./DeformableMesh";
import CageMesh from "./Cage";



const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} >
      <ambientLight intensity={30} color={'green'} />
      <directionalLight position={[0, 1,1]} intensity={30} color={'green'} />
      <Suspense fallback={null}>
        <DeformableMesh url="./mass.glb" />
        <CageMesh url="./cage.glb" />
      </Suspense>
      *<OrbitControls />*
    </Canvas>
  );
};

export default Scene;