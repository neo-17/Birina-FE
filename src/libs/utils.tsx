import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { config } from "../config/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const api = axios.create({
  baseURL: `${config.apiUrl}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});
