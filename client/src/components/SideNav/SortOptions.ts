export const SortOptions = {
  Date: "date",
  PriceAsc: "priceAsc",
  PriceDesc: "priceDesc",
} as const;

export type SortOptions = typeof SortOptions[keyof typeof SortOptions];
