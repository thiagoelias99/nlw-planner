import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Create a random confirmation token with 6 numeric digits
export function createConfirmationToken() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
