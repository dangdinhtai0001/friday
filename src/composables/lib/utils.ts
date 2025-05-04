import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveEventName(namespace: string, name: string, id: string) {
  return `${namespace}:${name}:${id}`;
}
