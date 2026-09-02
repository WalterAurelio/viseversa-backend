import type { Condicion, Color, TALLES, Categoria, GeneroRopa } from '../types';

interface IProduct {
  id: string;
  usuarioId: string;
  titulo: string;
  descripcion: string;
  fechaCreacion: Date;
  imagenes: string[];
  estaActivo: boolean;
  categoria: Categoria;
  genero: GeneroRopa;
  talle: (typeof TALLES)[number];
  color: Color;
  marca: string;
  condicion: Condicion; 
  ubicacion?: string;
  comentarios: string[];
}

export default IProduct;
