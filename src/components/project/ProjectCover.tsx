import Image from "next/image";
import type { ProjectCover as Cover, ResolvedCover } from "@/data/types";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";
import { ProjectArt } from "./ProjectArt";

export function resolveCover(cover: Cover, locale: Locale): ResolvedCover {
  return cover.kind === "image" ? { ...cover, alt: cover.alt[locale] } : cover;
}

type ProjectCoverProps = {
  cover: ResolvedCover;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  /** Identificador único (slug) para os ids internos das ilustrações. */
  uid?: string;
};

/** Capa do projeto: captura real (WebP) ou ilustração SVG. */
export function ProjectCover({ cover, sizes, className, imageClassName, priority, uid }: ProjectCoverProps) {
  if (cover.kind === "art") {
    return <ProjectArt motif={cover.motif} icon={cover.icon} className={className} uid={uid} />;
  }

  return (
    <Image
      src={cover.image}
      alt={cover.alt}
      fill
      sizes={sizes}
      preload={priority}
      loading={priority ? "eager" : "lazy"}
      className={cn(
        cover.fit === "contain" ? "object-contain p-10" : "object-cover object-top",
        imageClassName,
      )}
    />
  );
}
