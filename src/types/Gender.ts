export const genders = ["unisex", "masculino", "femenino"] as const;

export type Gender = (typeof genders)[number];
