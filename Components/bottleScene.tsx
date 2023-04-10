"use client";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import dynamic from "next/dynamic";
import React, { Suspense, useMemo, useRef } from "react";
import { DirectionalLight, Group, Scene } from "three";
// import Coin from "./Coin";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useSpring,
} from "framer-motion";

const Coin = dynamic(() => import("./bottle"), {
  ssr: false,
});
type Props = {};

export default function BottleScene({}: Props) {
  let { scrollY } = useScroll();
  let rotationY = useSpring(scrollY, { damping: 20, stiffness: 100 });
  const ref = useRef<React.Ref<Group> | undefined>();

  const Canv = useMemo(
    () => (
      <Canvas
        shadows
        id="canvasSkills"
        className="h-full w-full"
        gl={{ antialias: true }}
        camera={{ position: [0, 2, 10], fov: 32.5 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
      >
        <Lights />
        <Suspense>
          <Coin />
          <Environment preset="night" />
        </Suspense>
        <EffectS />
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          autoRotate={false}
          enablePan={false}
          enableRotate
          rotateSpeed={2}
          enableZoom={false}
        />
      </Canvas>
    ),
    []
  );
  return <>{Canv}</>;
}

const Lights = () => {
  const {
    SpotColor,
    SpotColor2,

    directionalLightColor,
  } = {
    SpotColor: "#9706f9",
    SpotColor2: "#fc0365",
    directionalLightColor: "white",
  };
  const directRef = useRef<DirectionalLight>(null);
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight
        position={[20, 20, 25]}
        penumbra={1}
        angle={0.2}
        color={SpotColor}
        intensity={2}
        castShadow
        // shadow-mapSize={[512, 512]}
      />
      <directionalLight
        ref={directRef}
        position={[-5, 5, -4]}
        intensity={2}
        color={directionalLightColor}
      />
      <directionalLight
        ref={directRef}
        position={[0, -5, 4]}
        intensity={1.2}
        color={directionalLightColor}
      />
      <spotLight
        position={[0, 15, -5]}
        intensity={2}
        color={SpotColor2}
        penumbra={1}
        angle={1}
      />
    </>
  );
};

const EffectS = () => {
  return <></>;
};
