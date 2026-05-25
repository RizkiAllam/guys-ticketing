import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Centralized utility for merging tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}