import { Router } from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { updateUserSchema, getUserByIdSchema, deleteUserSchema } from '../schemas/user.schema';
import { validateIdToken } from '../middleware/validateIdToken';

const router = Router();

router.get('/', getUsers);
router.get('/:id', validate(getUserByIdSchema.shape.params, 'params'), getUserById);
router.put('/:id', validateIdToken, validate(updateUserSchema.shape.body), validate(getUserByIdSchema.shape.params, 'params'), updateUser);
router.delete('/:id', validate(deleteUserSchema.shape.params, 'params'), deleteUser);

export default router;
