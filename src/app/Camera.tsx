"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

function Camera() {
  const { scene } = useGLTF("/models/camera.glb");
  return <primitive object={scene} scale={1.5} />;
}

export default function CameraModel() {
  return (
    <div className="w-full h-[400px] sm:h-[500px]">
      <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <Suspense fallback={null}>
          <Camera />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
