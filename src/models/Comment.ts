import mongoose, { Document, Schema } from "mongoose";
import IComment from "../interfaces/Comment";

export interface CommentDocument extends Omit<IComment, "id" | "userId" | "productId" | "parentCommentId">, Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  parentCommentId: mongoose.Types.ObjectId;
}

const commentSchema = new Schema<CommentDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El ID del usuario es requerido"]
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "El ID del producto es requerido"]
    },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    },
    content: {
      type: String,
      required: [true, "El contenido es requerido"],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);

export default Comment;
