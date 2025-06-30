"use client";

import { FaceRender } from "@/components/FaceRender";
import { Suspense } from "react";



// in Object.entries, the first item is the key (property), and the second is the value

export default function Home() {
  return(
    <Suspense>
      <FaceRender/>
    </Suspense>
  )
}
