import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { BaseStory } from "@/components/home/BaseStory";
import { Signatures } from "@/components/home/Signatures";
import { BoxReveal } from "@/components/home/BoxReveal";
import { LifeAtGrana } from "@/components/home/LifeAtGrana";
import { Guestbook } from "@/components/home/Guestbook";
import { Visit } from "@/components/home/Visit";
import { Marquee } from "@/components/ui/Marquee";
import styles from "./page.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const tapeA = ["It's all about the base!", "Wood-fired", "Hand-stretched", "Panampilly Nagar", "Open 12–11"];
const tapeB = ["Pizza? Yes, please.", "Fresh pasta", "Tiramisu", "Takeaway", "Swiggy & Zomato"];

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className={styles.tapes}>
        <Marquee items={tapeA} tone="ink" tilt={-2} speed={42} />
        <Marquee items={tapeB} tone="cream" tilt={-0.7} speed={36} reverse className={styles.tape2} />
      </div>
      <Manifesto />
      <BaseStory />
      <Signatures />
      <BoxReveal />
      <LifeAtGrana />
      <Guestbook />
      <Visit />
    </>
  );
}
