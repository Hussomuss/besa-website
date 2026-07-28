import type { Metadata } from "next";
import { ButtonLab } from "@/features/lab/components/button-lab";
import { GrainLab } from "@/features/lab/components/grain-lab";
import { LabIntro } from "@/features/lab/components/lab-intro";
import { Main } from "@/shared/layout/main";
import "./lab.css";

export const metadata: Metadata = {
  title: "Component lab",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return (
    <Main ground="bone">
      <LabIntro />
      <ButtonLab />
      <GrainLab />
    </Main>
  );
}
