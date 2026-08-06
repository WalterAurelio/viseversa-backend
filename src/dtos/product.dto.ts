import type { IProductDocument } from '../models/Product';
import IProduct from '../interfaces/IProduct';
import type { Condicion, Color, Talle, Categoria, GeneroRopa } from '../types';

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
  talle: Talle;
  color: Color[];
  marca: string;
  condicion: Condicion;
  comentarios: string[];

  constructor(data: IProductDocument) {
    this.id = data._id.toString();
    this.usuarioId = data.usuarioId.toString();
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
    this.fechaCreacion = data.fechaCreacion;
    this.imagenes = data.imagenes ?? [];
    this.estaActivo = data.estaActivo;
    this.categoria = data.categoria;
    this.genero =  data.genero;
    this.talle = data.talle;
    this.color = data.color;
    this.marca = data.marca;
    this.condicion = data.condicion;
    this.comentarios = data.comentarios?.map((id) => id.toString()) ?? [];
  }
}
