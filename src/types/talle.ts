export const TALLES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

export type Talle = (typeof TALLES)[number];
