import { Router } from "express";
import { createComment, deleteCommentById, getCommentsByProductId, updateCommentById } from "../controllers/comment.controller";
import { validate } from "../middleware/validate";
import { createCommentSchema, deleteCommentByIdSchema, getCommentsByProductIdSchema, updateCommentSchema } from "../schemas/comment.schema";

const router = Router();

router.get("/:productId", validate(getCommentsByProductIdSchema.shape.params, "params"), getCommentsByProductId);
router.post("/:productId", validate(createCommentSchema.shape.params, "params"), validate(createCommentSchema.shape.body), createComment);
router.put("/:id", validate(updateCommentSchema.shape.params, "params"), validate(updateCommentSchema.shape.body), updateCommentById);
router.delete("/:id", validate(deleteCommentByIdSchema.shape.params, "params"), deleteCommentById);

export default router;
