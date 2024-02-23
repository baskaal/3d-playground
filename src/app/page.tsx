"use client";

import { Canvas } from "@react-three/fiber"
import { Playground } from '../components/Playground';

const Page = () => {
  return (
    <Canvas>
      <Playground />
    </Canvas>
  )
}

export default Page
