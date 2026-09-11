export const categories = ["zapatillas", "campera", "remera", "pantalon", "buzo"] as const;

export type Category = (typeof categories)[number];
