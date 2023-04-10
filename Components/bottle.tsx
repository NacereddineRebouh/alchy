"use client";
import React, { Ref, useEffect, useRef } from "react";
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import gsap, { Expo, Power4 } from "gsap";
import THREE, {
  Group,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  Scene,
  Vector3,
} from "three";
import { useFrame } from "@react-three/fiber";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useSpring,
} from "framer-motion";
// import coin from "@/public/3d";
type Props = {
  refScene?: Ref<Group> | undefined;
};

const Bottle = ({ refScene }: Props) => {
  let { scrollY } = useScroll();
  let rotationY = useSpring(scrollY, { damping: 50, stiffness: 222 });
  const refCap = useRef<React.Ref<Mesh>>(null);
  const refGlass = useRef<React.Ref<Mesh>>(null);
  const refLiquidGas = useRef<React.Ref<Mesh>>(null);
  const ref = useRef<React.Ref<Group>>(null);
  useEffect(() => {
    console.log("scrollY");
  });

  useEffect(() => {
    // ref.current.rotation.x = -0.2;
    refCap.current?.rotateOnWorldAxis(
      new Vector3(1, 0, 0),
      MathUtils.degToRad(15)
    );
    refGlass.current?.rotateOnWorldAxis(
      new Vector3(1, 0, 0),
      MathUtils.degToRad(15)
    );
    refLiquidGas.current?.rotateOnWorldAxis(
      new Vector3(1, 0, 0),
      MathUtils.degToRad(15)
    );
    // ref.current.rotateOnWorldAxis(new Vector3(1, 0, 0), MathUtils.degToRad(25));
  }, []);
  useFrame((state, delta) => {
    ref.current.rotation.y = rotationY.get() / 100;
    //selecting Axis
    // ref.current.rotateOnWorldAxis(new Vector3(0, 1, 0), rotationY.get() / 100);
  });
  const openState = false;
  // const { scene } = useGLTF("/3d/magic.gltf");
  const { nodes, materials } = useGLTF("/3d/magic.gltf");

  // scene.scale.set(0, 0, 0);
  // scene.rotation.set(0, 0, 0);
  // useEffect(() => {
  //   if (openState) {
  //     gsap.to(scene.scale, {
  //       x: 0,
  //       y: 0,
  //       z: 0,
  //       ease: Power4.easeOut,
  //       duration: 2,
  //     });
  //     gsap.to(scene.rotation, {
  //       y: 0,
  //       ease: Expo.easeOut,
  //       duration: 2,
  //     });
  //   } else {
  //     gsap.to(scene.scale, {
  //       x: 1,
  //       y: 1,
  //       z: 1,
  //       ease: Power4.easeOut,
  //       duration: 3,
  //     });
  //     gsap.to(scene.rotation, {
  //       y: Math.PI * 2,
  //       ease: Expo.easeOut,
  //       duration: 4,
  //     });
  //   }
  // }, [openState]);

  // const { viewport } = useThree();
  // scene.scale.set(viewport.width / 2, viewport.width / 2, viewport.width / 2);

  return (
    <group ref={ref} position={[0, -1.2, 0]}>
      {/* <primitive object={scene} /> */}
      {/* @ts-ignore */}
      <mesh
        ref={refGlass}
        castShadow
        receiveShadow
        geometry={nodes.bottle.geometry}
        // material={materials.glassCover}
      >
        <MeshTransmissionMaterial
          thickness={0.08}
          chromaticAberration={0.25}
          anisotropy={5}
          clearcoat={1}
          roughness={0.05}
          clearcoatRoughness={0.2}
          envMapIntensity={2}
          distortionScale={0}
          temporalDistortion={0}
        />

        {/* <meshPhysicalMaterial
          roughness={0.1}
          metalness={0}
          opacity={0}
          thickness={1}
          envMapIntensity={4}
          color={"#efefef"}
          clearcoat={0.25}
          transmission={1}
          // thickness={0.1} // Add refraction!
        /> */}
      </mesh>
      {/* @ts-ignore */}

      <mesh
        castShadow
        receiveShadow
        ref={refCap}
        material={materials.lambert1}
        geometry={nodes.final_model_lambert1_0.geometry}
      ></mesh>
      <mesh
        ref={refLiquidGas}
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials.water}
      ></mesh>
    </group>
  );
};
export default React.memo(Bottle);
useGLTF.preload("/3d/magic.gltf");
