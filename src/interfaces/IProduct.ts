interface IProduct {
  id: string;
  usuarioId: string;
  titulo: string;
  descripcion: string;
  imagenes: string[];
  estaActivo: boolean;
  comentarios: string[];
}

export default IProduct;
