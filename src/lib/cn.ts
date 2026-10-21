type ClassValue = string | false | null | undefined;

/** Junta classes ignorando valores vazios. */
export function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}
