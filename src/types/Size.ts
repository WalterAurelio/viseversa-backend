import { Category } from "./Category";

export const numericSizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44"] as const;
export const letterSizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const sizeByCategory = {
  zapatillas: numericSizes,
  campera: letterSizes,
  remera: letterSizes,
  pantalon: numericSizes,
  buzo: letterSizes
} as const satisfies Record<Category, typeof numericSizes | typeof letterSizes>;

export type NumericSize = (typeof numericSizes)[number];
export type LetterSize = (typeof letterSizes)[number];
export type Size = NumericSize | LetterSize;
