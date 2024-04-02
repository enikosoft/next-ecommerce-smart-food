import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isObjectEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}
