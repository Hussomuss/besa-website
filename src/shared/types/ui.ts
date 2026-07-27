import type Link from "next/link";
import type { ComponentProps } from "react";

export type Href = ComponentProps<typeof Link>["href"];

export type Tone = "bone" | "sand" | "moss";

export type Shape = "rect" | "arch" | "semicircle";
