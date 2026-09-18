import { Request, Response } from "express";
import Comment from "../models/Comment";
import User from "../models/User";
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
  const firebaseUid = req.user?.uid;
  const { productId } = req.params as CreateCommentInput["params"];
  const { parentCommentId, content } = req.body as CreateCommentInput["body"];
  const user = await User.findOne({ firebaseUid });

  if (!user) {
    throw AppError.notFound("Usuario no encontrado");
  }

  const comment = await Comment.create({ productId, parentCommentId, content });

  res.status(201).json({
    status: "success",
    statusCode: 201,
    message: "Comentario creado exitosamente",
    data: comment._id.toString()
  });
});

export const updateCommentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as UpdateCommentInput["params"];
  const { content } = req.body as UpdateCommentInput["body"];
  const comment = await Comment.findById(id);

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
  const { id } = req.params as DeleteCommentByIdInput["params"];
  const comment = await Comment.findByIdAndDelete(id);

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
