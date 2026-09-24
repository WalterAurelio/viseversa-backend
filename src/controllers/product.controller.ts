import { Request, Response } from "express";
import Product from "../models/Product";
import { AppError } from "../errors/AppError";
import { asyncHandler } from "../middleware/errorHandler";
import { ProductDetailsDto, ProductDisplayDto, ProductIdentifierDto } from "../dtos/product.dto";
import { CreateProductSchema, DeleteProductByIdSchema, GetProductByIdSchema, UpdateProductSchema } from "../schemas/product.schema";
import User from "../models/User";
import { escapeRegExp } from "../utils/escapeRegExp";

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find().populate<{ userId: { location: string } }>("userId", "location");

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Productos obtenidos exitosamente",
    data: products.map((product) => new ProductDisplayDto(product))
  });
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as GetProductByIdSchema["params"];
  const product = await Product.findById(id).populate<{ userId: { location: string } }>("userId", "location");

  if (!product) {
    throw AppError.notFound("Producto no encontrado");
  }

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Producto obtenido exitosamente",
    data: new ProductDetailsDto(product)
  });
});

export const getProductsByCategory = asyncHandler(async (req: Request, res: Response) => {
  const { category } = req.params;
  const queries = req.query as Record<string, string | string[]>;
  const dbQuery: Record<string, unknown> = { category };

  for (const [key, value] of Object.entries(queries)) {
    if (key === "location") {
      const users = await User.find({ location: value }).select("_id");
      const userIds = users.map((user) => user._id);
      dbQuery.userId = { $in: userIds };
    } else {
      dbQuery[key] = Array.isArray(value) ? { $in: value } : value;
    }
  }
  const products = await Product.find(dbQuery).populate<{ userId: { location: string } }>("userId", "location");

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Productos obtenidos exitosamente",
    data: products.map((product) => new ProductDisplayDto(product))
  });
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const user = req.dbUser!;
  const body = req.body as CreateProductSchema["body"];
  const product = await Product.create({ ...body, userId: user._id });

  res.status(201).json({
    status: "success",
    statusCode: 201,
    message: "Producto creado exitosamente",
    data: new ProductIdentifierDto(product)
  });
});

export const getProductsByQuery = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as Record<string, string>;
  const terms = query.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const fields = ["title", "description", "category", "size", "color", "brand"];
  const dbQuery = {
    $and: terms.map((term) => {
      return {
        $or: fields.map((field) => ({
          [field]: { $regex: escapeRegExp(term), $options: "i" }
        }))
      };
    })
  };

  const products = await Product.find(dbQuery).populate<{ userId: { location: string } }>("userId", "location");

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Búsqueda realizada exitosamente",
    data: products.map((product) => new ProductDisplayDto(product))
  });
});

export const updateProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as UpdateProductSchema["params"];
  const body = req.body as UpdateProductSchema["body"];
  const product = await Product.findById(id);

  if (!product) {
    throw AppError.notFound("Producto no encontrado");
  }

  Object.assign(product, body);
  const updatedProduct = await product.save();

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Producto actualizado exitosamente",
    data: new ProductIdentifierDto(updatedProduct)
  });
});

export const deleteProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as DeleteProductByIdSchema["params"];
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw AppError.notFound("Producto no encontrado");
  }

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Producto eliminado exitosamente",
    data: new ProductIdentifierDto(product)
  });
});
