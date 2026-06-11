import type IComment from '../interfaces/IComment';
import type { ICommentDocument } from '../models/Comment';

export class CommentDto implements IComment {
  id: string;
  usuarioId: string;
  productoId: string;
  descripcion: string;
  imagenes: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: ICommentDocument) {
    this.id = data._id.toString();
    this.usuarioId = data.usuarioId.toString();
    this.productoId = data.productoId.toString();
    this.descripcion = data.descripcion;
    this.imagenes = data.imagenes;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
