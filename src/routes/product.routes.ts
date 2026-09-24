import { Router } from "express";
import { getProducts, getProductsByCategory, createProduct, getProductsByQuery, updateProductById, deleteProductById, getProductById } from "../controllers/product.controller";
import { validate } from "../middleware/validate";
import { createProductSchema, getProductsByQuerySchema, updateProductSchema, deleteProductByIdSchema, getProductByIdSchema } from "../schemas/product.schema";

const router = Router();

router.get("/", getProducts);
router.get("/:id", validate(getProductByIdSchema.shape.params, "params"), getProductById);
router.get("/category/:category", getProductsByCategory);
router.post("/", validate(createProductSchema.shape.body), createProduct);
router.get("/search", validate(getProductsByQuerySchema.shape.query, "query"), getProductsByQuery);
router.put("/:id", validate(updateProductSchema.shape.params, "params"), validate(updateProductSchema.shape.body), updateProductById);
router.delete("/:id", validate(deleteProductByIdSchema.shape.params, "params"), deleteProductById);

export default router;
