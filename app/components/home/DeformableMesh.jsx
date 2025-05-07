'use client';

import React, { useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const DeformableMesh = ({ url }) => {
  const gltf = useLoader(GLTFLoader, url);
  const mesh = useRef();
  const { size } = useThree();
/*
  const shaderMaterial = useRef(
    new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          // Deformación suave tipo latido
          vec3 newPosition = position + normal * sin(position.y * 5.0 + uTime) * 0.2;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        varying vec2 vUv;

        void main() {
          float mr = min(uResolution.x, uResolution.y);
          vec2 uv = (vUv * 2.0 - 1.0) * (uResolution / mr);

          float d = -uTime * 0.5;
          float a = 0.0;
          for (float i = 0.0; i < 8.0; ++i) {
              a += cos(i - d - a * uv.x);
              d += sin(uv.y * i + a);
          }
          d += uTime * 0.5;
          vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
          col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })
  );*/


  const shaderMaterial = useRef(
    new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
  
        void main() {
          vUv = uv;
          vec3 newPos = position + normal * sin(position.y * 10.0 + uTime) * 0.2;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        varying vec2 vUv;
  
        void main() {
          float mr = min(uResolution.x, uResolution.y);
          vec2 uv = (vUv * 2.0 - 1.0) * (mr / uResolution.xy);
  
          float d = -uTime * 0.5;
          float a = 0.0;
          for (float i = 0.0; i < 8.0; ++i) {
              a += cos(i - d - a * uv.x);
              d += sin(uv.y * i + a);
          }
          d += uTime * 0.5;
          vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
          col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })
  );

  // Animar el tiempo
  useFrame(({ clock }) => {
    if (shaderMaterial.current) {
      shaderMaterial.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  // Aplicar el shader al primer mesh que encuentre
  const mainMesh = gltf.scene.children.find((child) => child.isMesh);

  if (mainMesh) {
    mainMesh.material = shaderMaterial.current;
  }

  return <primitive ref={mesh} object={gltf.scene} />;
};

export default DeformableMesh;