"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingOrb({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * speed * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * speed * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.4}>
      <Sphere ref={meshRef} args={[1, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.4}
          metalness={0.6}
        />
      </Sphere>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      
      <FloatingOrb position={[-3, 1, -6]} color="#6366f1" speed={0.6} />
      <FloatingOrb position={[3, -1, -8]} color="#8b5cf6" speed={0.5} />
    </>
  );
}

export default function Background3D() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.12,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
