import { Fragment } from "react";
import { cn } from "@/lib/cn";

/** Renderiza texto com trechos em **negrito** destacados. */
export function RichText({ text, strongClassName }: { text: string; strongClassName?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index} className={cn("font-medium text-foreground", strongClassName)}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Remove os marcadores de negrito (para metadados e busca). */
export const plainText = (text: string) => text.replace(/\*\*/g, "");
