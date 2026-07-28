import type { Metadata } from "next";
import { Main } from "@/shared/layout/main";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return <Main ground="bone" />;
}
