"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import React, { useEffect, useState } from "react";

type Props = {};

export default function Content({}: Props) {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  let rotationY = useSpring(scrollY, { damping: 50, stiffness: 222 });
  const [hookedYPostion, setHookedYPosition] = React.useState(0);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    // hook into the onChange, store the current value as state.
    const unsubscribeX = rotationY.on("change", () => {
      setHookedYPosition(rotationY.get());
      let n = (rotationY.get() / (6000 / 6) + "").split(".")[0];
      //   console.log(hookedYPostion, "  ", n);
      setIndex(n as unknown as number);
    });

    return () => {
      unsubscribeX();
    };
  }, [scrollYProgress]);
  return (
    <div className="relative w-full flex-col items-center justify-start p-12">
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-50 mx-auto h-4 cursor-pointer bg-violet-600 active:bg-rose-400"
      ></motion.div>
      <div className="sticky top-0">
        {[0, 0, 0, 0, 0, 0, 0].map((val: any, i: number) => {
          return (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              style={{
                color:
                  index != i
                    ? //   &&
                      //   hookedYPostion / (i + 1) < 1
                      "gray"
                    : "white",
              }}
              transition={{
                damping: 100,
                stiffness: 400,
                type: "spring",
                delay: 0,
              }}
              key={i}
              className="
                flex w-full items-center justify-start p-12 text-slate-100 md:text-5xl"
            >
              <motion.div
                animate={{
                  scale:
                    index != i
                      ? // &&
                        // hookedYPostion / (i + 1) < (6000 / 6) * (i + 2)
                        1
                      : 1.1,
                }}
              >
                Section {i}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      <div className="h-[6000px]"></div>
    </div>
  );
}
