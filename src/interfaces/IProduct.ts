import type { Condicion, Color, Talle, Categoria, GeneroRopa } from '../types';

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
  talle: Talle;
  color: Color[];
  marca: string;
  condicion: Condicion;
  comentarios: string[];
}

export default IProduct;
