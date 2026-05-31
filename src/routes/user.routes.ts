import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { createUserSchema, updateUserSchema, getUserByIdSchema, deleteUserSchema } from '../schemas/user.schema';

const router = Router();

router.post('/', validate(createUserSchema.shape.body), createUser);
router.get('/', getUsers);
router.get('/:id', validate(getUserByIdSchema.shape.params, 'params'), getUserById);
router.put('/:id', validate(updateUserSchema.shape.body), validate(getUserByIdSchema.shape.params, 'params'), updateUser);
router.delete('/:id', validate(deleteUserSchema.shape.params, 'params'), deleteUser);

export default router;
