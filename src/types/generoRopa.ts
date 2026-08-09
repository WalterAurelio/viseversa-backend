export const GENEROS = [
    'Hombre',
    'Mujer',
    'Unisex'
] as const;

export type GeneroRopa = (typeof GENEROS)[number];