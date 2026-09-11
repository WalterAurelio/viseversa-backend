import { Router } from "express";
import { validateIdToken } from "../middleware/validateIdToken";
import { getProducts, getProductsByCategory, createProduct, updateProductById, deleteProductById } from "../controllers/product.controller";
import { validate } from "../middleware/validate";
import { createProductSchema, updateProductSchema, deleteProductByIdSchema } from "../schemas/product.schema";

const router = Router();

router.get("/", getProducts);
router.get("/:category", getProductsByCategory);
router.post("/", validateIdToken, validate(createProductSchema.shape.body), createProduct);
router.put("/:id", validateIdToken, validate(updateProductSchema.shape.params, "params"), validate(updateProductSchema.shape.body), updateProductById);
router.delete("/:id", validateIdToken, validate(deleteProductByIdSchema.shape.params, "params"), deleteProductById);

export default router;
