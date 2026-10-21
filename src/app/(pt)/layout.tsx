import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import "../globals.css";

export { viewport } from "@/lib/metadata";

export default function PortugueseLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="pt">{children}</SiteShell>;
}
