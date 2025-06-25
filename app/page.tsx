import Image from "next/image";
import { Hero } from "@/features/Hero";
import { Latest } from "@/features/Latest";
import { Business } from "@/features/Business";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image 
        src="/logo.png"
        alt="logo"
        width={250}
        height={10}
        className="md:w-100 w-60 h-10 my-10"
      />

      <Hero />
      <Latest />
      <Business />
    </div>
  );
}
