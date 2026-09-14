import { Router } from "express";
import { getProducts, getProductsByCategory, createProduct, getProductsByQuery, updateProductById, deleteProductById } from "../controllers/product.controller";
import { validate } from "../middleware/validate";
import { createProductSchema, updateProductSchema, deleteProductByIdSchema } from "../schemas/product.schema";

const router = Router();

router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);
router.post("/", validate(createProductSchema.shape.body), createProduct);
router.get("/search", getProductsByQuery);
router.put("/:id", validate(updateProductSchema.shape.params, "params"), validate(updateProductSchema.shape.body), updateProductById);
router.delete("/:id", validate(deleteProductByIdSchema.shape.params, "params"), deleteProductById);

export default router;
