import { emojiParts } from "@/lib/emojis";
import { Emojis } from "@/lib/type";
import { useRouter, useSearchParams } from "next/navigation";
import {  useEffect, useState } from "react";

type faceType = {
  eyes: string;
  nose: string;
  mouth: string;
};

export const FaceRender = () => {
  const searchparams = useSearchParams();
  const router = useRouter();
  const [face, setFace] = useState<faceType>({ eyes: "", nose: "", mouth: "" });
  const [lock, setLock] = useState<string[]>([]);

  useEffect(() => {
    setFace({
      eyes: searchparams.get("eyes") || "",
      nose: searchparams.get("nose") || "",
      mouth: searchparams.get("mouth") || "",
    });
    setLock(searchparams.get("lock")?.split(",") || []);
  }, [searchparams]);

  function giveFace() {
    const url = new URLSearchParams(searchparams.toString());
    (Object.entries(emojiParts) as [keyof Emojis, string[]][]).map(
      ([partName, partValues]) => {
        if (!lock.includes(partName)) {
          url.set(
            partName,
            partValues[Math.floor(Math.random() * partValues.length)]
          );
        }
      }
    );
    if (lock[0] && lock[0] !== "") url.set("lock", lock.toString());
    else url.delete("lock");

    router.push(`?${url}`);
  }

  function handleLock(part: string) {
    const ithas = lock.includes(part);
    if (ithas) {
      const index = lock.indexOf(part);
      console.log(index);
      setLock((prev) => [...prev.filter((p) => p !== part)]);
      console.log(lock);
    } else {
      setLock((prev) => [...prev, part]);
      console.log(lock);
    }
    console.log(lock);
  }

  return (
    <div className="flex flex-col items-center gap-1 justify-center h-screen">
        {face.eyes !== "" &&
          (Object.entries(face) as [keyof faceType, string][]).map(
            ([partName, partValue]) => (
              <div
                key={partName}
                className="flex justify-between w-52 border-t-[1px] border-gray-300 py-1"
              >
                <span className="mx-auto"> {partValue}</span>
                <button
                  onClick={() => handleLock(partName)}
                  className={`mx-8 rounded-md border-2 transition-all ${
                    lock.includes(partName)
                      ? "bg-[black!important] text-white"
                      : "border-gray-500 bg-transparent"
                  }`}
                >
                  {lock.includes(partName) ? "🔒" : "🔓"}
                </button>
              </div>
            )
          )}
      <button
        onClick={giveFace}
        className="bg-green-500 rounded-md px-2 py-3 hover:bg-green-400 focus:ring-2 focus:ring-green-300 text-white transition-all"
      >
        give me random face
      </button>
    </div>
  );
};
