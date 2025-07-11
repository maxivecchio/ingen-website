import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const ServerUrl = false
  ? 'https://api.woo.moveup.digital'
  /* : 'https://79j3r6m3-3000.brs.devtunnels.ms'; */
  : 'http://localhost:3000';

export const getImageUrl = (file: any): string => {
  const datePath = file.createdAt.slice(0, 10).replace(/-/g, '/');
  const relativePath = `desarrurbana/${datePath}/${file.filename}`;

  console.log(`https://cdn.moveup.digital/${relativePath}`);
  return `https://cdn.moveup.digital/${relativePath}`;
};