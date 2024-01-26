import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHumanReadableDate(dateString: string | Date | number) {
  const date = new Date(dateString);
  if (date.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {
    return "Today";
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// TODO: replace hardcoded currency formatter. create global currency config.
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "MYR",
});

export function formatCurrency(value: number) {
  return formatter.format(value);
}
