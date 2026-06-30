import { clsx, type ClassValue } from "clsx"

/**
 * cn — class name combiner for beUI components.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
