export const colors = ["negro", "azul", "blanco", "verde", "rojo", "beige", "gris"] as const;

export type Color = (typeof colors)[number];
