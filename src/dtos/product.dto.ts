import type { IProduct } from '../models/Product';

export interface CreateProductDto {
  usuarioId: string;
  titulo: string;
  descripcion: string;
  imagenes?: string[];
  estaActivo?: boolean;
}

export interface UpdateProductDto {
  titulo?: string;
  descripcion?: string;
  imagenes?: string[];
  estaActivo?: boolean;
}

export interface ProductDto {
  id: string;
  usuarioId: string;
  titulo: string;
  descripcion: string;
  imagenes: string[];
  estaActivo: boolean;
  comentarios: string[];
}

export const toProductDto = (product: IProduct): ProductDto => ({
  id: product._id.toString(),
  usuarioId: product.usuarioId.toString(),
  titulo: product.titulo,
  descripcion: product.descripcion,
  imagenes: product.imagenes ?? [],
  estaActivo: product.estaActivo,
  comentarios: product.comentarios?.map(id => id.toString()) ?? []
});
