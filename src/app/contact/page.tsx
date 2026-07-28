import type { Metadata } from "next";
import { Main } from "@/shared/layout/main";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <Main ground="bone" />;
}
