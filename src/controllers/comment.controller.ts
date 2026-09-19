import { Request, Response } from "express";
import Comment from "../models/Comment";
import Product from "../models/Product";
import { AppError } from "../errors/AppError";
import { asyncHandler } from "../middleware/errorHandler";
import { CommentDto } from "../dtos/comment.dto";
import { CreateCommentInput, DeleteCommentByIdInput, GetCommentsByProductIdInput, UpdateCommentInput } from "../schemas/comment.schema";

export const getCommentsByProductId = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params as GetCommentsByProductIdInput["params"];
  const comments = await Comment.find({ productId }).populate<{ userId: { username: string; profilePicture?: string } }>("userId", "username profilePicture");

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Comentarios obtenidos exitosamente",
    data: comments.map((comment) => new CommentDto(comment))
  });
});

export const createComment = asyncHandler(async (req: Request, res: Response) => {
  const user = req.dbUser!;
  const { productId } = req.params as CreateCommentInput["params"];
  const { parentCommentId, content } = req.body as CreateCommentInput["body"];
  const productExists = await Product.exists({ productId });

  if (!productExists) {
    throw AppError.notFound("Producto no encontrado");
  }

  if (parentCommentId) {
    const parentComment = await Comment.findOne({ _id: parentCommentId, productId });
    if (!parentComment) {
      throw AppError.notFound("Comentario padre no encontrado");
    }
  }

  const comment = await Comment.create({ userId: user._id, productId, parentCommentId, content });

  res.status(201).json({
    status: "success",
    statusCode: 201,
    message: "Comentario creado exitosamente",
    data: comment._id.toString()
  });
});

export const updateCommentById = asyncHandler(async (req: Request, res: Response) => {
  const user = req.dbUser!;
  const { id } = req.params as UpdateCommentInput["params"];
  const { content } = req.body as UpdateCommentInput["body"];
  const comment = await Comment.findOne({ _id: id, userId: user._id });

  if (!comment) {
    throw AppError.notFound("Comentario no encontrado");
  }

  comment.content = content;
  const updatedComment = await comment.save();

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Comentario actualizado exitosamente",
    data: updatedComment._id.toString()
  });
});

export const deleteCommentById = asyncHandler(async (req: Request, res: Response) => {
  const user = req.dbUser!;
  const { id } = req.params as DeleteCommentByIdInput["params"];
  const comment = await Comment.findOneAndDelete({ _id: id, userId: user._id });

  if (!comment) {
    throw AppError.notFound("Comentario no encontrado");
  }

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Comentario eliminado exitosamente",
    data: comment._id.toString()
  });
});
