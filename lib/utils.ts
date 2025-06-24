import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const ServerUrl = false
  ? 'https://api.woo.moveup.digital'
  /* : 'https://79j3r6m3-3000.brs.devtunnels.ms'; */
  : 'http://localhost:3000';

