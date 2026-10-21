import { ExternalLink, FileText, Package } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import type { ProjectLink } from "@/data/types";

export function ProjectLinkIcon({
  kind,
  className = "h-3.5 w-3.5",
}: {
  kind: ProjectLink["kind"];
  className?: string;
}) {
  switch (kind) {
    case "github":
      return <GithubIcon className={className} />;
    case "paper":
      return <FileText className={className} aria-hidden="true" />;
    case "artifact":
      return <Package className={className} aria-hidden="true" />;
    default:
      return <ExternalLink className={className} aria-hidden="true" />;
  }
}
