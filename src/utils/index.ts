/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import BigNumber from "bignumber.js";
export const formatAddress = (address: string) => {
  if (!address) return "--";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSolana(val: any, dec: number) {
  const num = new BigNumber(val);
  return num
    .dividedBy(+`1e${dec}`)
    .toFixed(dec)
    .replace(/\.?0+$/, "");
}

export function formatNumber(value: number, maximumFractionDigits = 10) {
  if (!value) return "--";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(value);
}
