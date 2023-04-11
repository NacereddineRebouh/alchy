"use client";
import Image from "next/image";
import { Inter, Alegreya } from "@next/font/google";
import Bottle from "@/Components/bottle";
import BottleScene from "@/Components/bottleScene";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useLayoutEffect } from "react";
import Content from "@/Components/Content";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });
const alegreya = Alegreya({ subsets: ["latin"] });
const DynamicComponentWithNoSSR = dynamic(
  () => import("../Components/Content"),
  {
    ssr: false,
  }
);
export default function Home() {
  return (
    <div
      className={`${alegreya.className} flex flex-col items-center justify-center text-4xl font-bold italic text-slate-100`}
    >
      <DynamicComponentWithNoSSR />
      <div className="fixed left-0 right-0 top-1/2 aspect-square w-full -translate-y-1/2 md:left-auto md:w-1/2">
        <BottleScene />
      </div>
    </div>
  );
}
