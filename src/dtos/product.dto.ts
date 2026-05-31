import type { IProductDocument } from '../models/Product';
import IProduct from '../interfaces/IProduct';

export class ProductDto implements IProduct {
  id: string;
  usuarioId: string;
  titulo: string;
  descripcion: string;
  imagenes: string[];
  estaActivo: boolean;
  comentarios: string[];

  constructor(data: IProductDocument) {
    this.id = data._id.toString();
    this.usuarioId = data.usuarioId.toString();
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
    this.imagenes = data.imagenes ?? [];
    this.estaActivo = data.estaActivo;
    this.comentarios = data.comentarios?.map(id => id.toString()) ?? [];
  }
}
