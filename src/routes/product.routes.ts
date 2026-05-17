import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller';
import { validate } from '../middleware/validate';
import { createProductSchema, updateProductSchema, getProductByIdSchema, deleteProductSchema } from '../schemas/product.schema';

const router = Router();

router.post('/', validate(createProductSchema.shape.body), createProduct);
router.get('/', getProducts);
router.get('/:id', validate(getProductByIdSchema.shape.params, 'params'), getProductById);
router.put('/:id', validate(updateProductSchema.shape.body), validate(getProductByIdSchema.shape.params, 'params'), updateProduct);
router.delete('/:id', validate(deleteProductSchema.shape.params, 'params'), deleteProduct);

export default router;
