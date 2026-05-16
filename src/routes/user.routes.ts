import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '@controllers/user.controller';
import { validate } from '@middleware/validate';
import {
  createUserSchema,
  updateUserSchema,
  getUserByIdSchema,
  deleteUserSchema,
} from '@schemas/user.schema';

const router = Router();

// POST /api/users - Crear usuario
router.post('/', validate(createUserSchema.shape.body), createUser);

// GET /api/users - Obtener todos los usuarios
router.get('/', getUsers);

// GET /api/users/:id - Obtener usuario por ID
router.get('/:id', validate(getUserByIdSchema.shape.params, 'params'), getUserById);

// PUT /api/users/:id - Actualizar usuario
router.put(
  '/:id',
  validate(updateUserSchema.shape.body),
  validate(getUserByIdSchema.shape.params, 'params'),
  updateUser
);

// DELETE /api/users/:id - Eliminar usuario
router.delete('/:id', validate(deleteUserSchema.shape.params, 'params'), deleteUser);

export default router;
