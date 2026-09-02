type TalleRopa = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

type TallePantalon =
  | '36'
  | '38'
  | '40'
  | '42'
  | '44'
  | '46'
  | '48';

type TalleCalzado =
  | '35'
  | '36'
  | '37'
  | '38'
  | '39'
  | '40'
  | '41'
  | '42'
  | '43'
  | '44'
  | '45';

type TalleAccesorio = 'Único';

type TallePorCategoria = {
  Remeras: TalleRopa[];
  Camisas: TalleRopa[];
  Buzos: TalleRopa[];
  Abrigos: TalleRopa[];
  Pantalones: TallePantalon[];
  Vestidos: TalleRopa[];
  Calzado: TalleCalzado[];
  Accesorios: TalleAccesorio[];
};

export const TALLES_POR_CATEGORIA: TallePorCategoria = {
  Remeras: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Camisas: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Buzos: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Abrigos: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Pantalones: ['36', '38', '40', '42', '44', '46', '48'],
  Vestidos: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Calzado: [
    '35', '36', '37', '38', '39',
    '40', '41', '42', '43', '44', '45'
  ],
  Accesorios: ['Único'],
};

export const TALLES = Object.values(TALLES_POR_CATEGORIA).flat() as [
  string,
  ...string[],
];
