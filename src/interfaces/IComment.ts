interface IComment {
  id: string;
  usuarioId: string;
  productoId: string;
  descripcion: string;
  imagenes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default IComment;