import type { IProductDocument } from '../models/Product';
import IProduct from '../interfaces/IProduct';
import type { Condicion, Color, TALLES, Categoria, GeneroRopa } from '../types';

export class PartialProductDto implements Partial<IProduct> {
  id: string;
  usuarioId: string;
  titulo: string;
  descripcion: string;
  imagenes: string[];
  categoria: Categoria;
  talle: (typeof TALLES)[number];
  ubicacion?: string;

  constructor(data: IProductDocument) {
    this.id = data._id.toString();
    this.usuarioId = data.usuarioId?._id.toString();
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
    this.imagenes = data.imagenes;
    this.categoria = data.categoria;
    this.talle = data.talle;
    this.ubicacion = (data.usuarioId as any)?.ubicacion ?? undefined;
  }
}

export class ProductDto implements IProduct {
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
  comentarios: string[];
  ubicacion?: string;

  constructor(data: IProductDocument) {
    this.id = data._id.toString();
    this.usuarioId = data.usuarioId._id.toString();
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
    this.fechaCreacion = data.fechaCreacion;
    this.imagenes = data.imagenes ?? [];
    this.estaActivo = data.estaActivo;
    this.categoria = data.categoria;
    this.genero = data.genero;
    this.talle = data.talle;
    this.color = data.color;
    this.marca = data.marca;
    this.condicion = data.condicion;
    this.comentarios = data.comentarios?.map((id) => id.toString()) ?? [];
    this.ubicacion = (data.usuarioId as any)?.ubicacion ?? undefined;
  }
}
