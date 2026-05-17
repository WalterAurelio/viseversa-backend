import { Router } from 'express';
import {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
} from '../controllers/comment.controller';
import { validate } from '../middleware/validate';
import {
  createCommentSchema,
  updateCommentSchema,
  getCommentByIdSchema,
  deleteCommentSchema,
} from '../schemas/comment.schema';

const router = Router();

// POST /api/comments - Crear comentario
router.post('/', validate(createCommentSchema.shape.body), createComment);

// GET /api/comments - Obtener todos los comentarios
router.get('/', getComments);

// GET /api/comments/:id - Obtener comentario por ID
router.get('/:id', validate(getCommentByIdSchema.shape.params, 'params'), getCommentById);

// PUT /api/comments/:id - Actualizar comentario
router.put(
  '/:id',
  validate(updateCommentSchema.shape.body),
  validate(getCommentByIdSchema.shape.params, 'params'),
  updateComment
);

// DELETE /api/comments/:id - Eliminar comentario
router.delete('/:id', validate(deleteCommentSchema.shape.params, 'params'), deleteComment);

export default router;
