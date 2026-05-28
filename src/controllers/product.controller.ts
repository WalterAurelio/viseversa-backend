import { Request, Response } from 'express';
import Product from '../models/Product';
import User from '../models/User';
import { AppError } from '../errors/AppError';
import { asyncHandler } from '../middleware/errorHandler';

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { usuarioId, titulo, descripcion, imagenes, estaActivo } = req.body;

  const user = await User.findById(usuarioId);
  if (!user) {
    throw AppError.notFound('Usuario no encontrado');
  }

  const product = await Product.create({
    usuarioId,
    titulo,
    descripcion,
    imagenes,
    estaActivo: estaActivo ?? true
  });

  res.status(201).json({
    status: 'success',
    statusCode: 201,
    message: 'Producto creado exitosamente',
    data: product
  });
});

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find();

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Productos obtenidos exitosamente',
    data: products
  });
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw AppError.notFound('Producto no encontrado');
  }

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Producto obtenido exitosamente',
    data: product
  });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  // const { titulo, descripcion, imagenes, estaActivo } = req.body;

  // Verificar que el producto existe
  const product = await Product.findById(id);
  if (!product) {
    throw AppError.notFound('Producto no encontrado');
  }

  // Actualizar campos
  const updatedData = Object.fromEntries(Object.entries(req.body).filter(([key, value]) => value !== undefined));
  Object.assign(product, updatedData);
  const updatedProduct = await product.save();

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Producto actualizado exitosamente',
    data: updatedProduct
  });
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw AppError.notFound('Producto no encontrado');
  }

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Producto eliminado exitosamente',
    data: product
  });
});
