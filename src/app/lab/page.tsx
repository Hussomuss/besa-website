import type { Metadata } from "next";
import { ButtonLab } from "@/features/lab/components/button-lab";
import { LabIntro } from "@/features/lab/components/lab-intro";
import "./lab.css";

export const metadata: Metadata = {
  title: "Component lab",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return (
    <main className="flex-1">
      <LabIntro />
      <ButtonLab />
    </main>
  );
}
