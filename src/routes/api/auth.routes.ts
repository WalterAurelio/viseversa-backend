import { Router } from "express";
import { createUserAccount } from "../../controllers/auth.controller";
import { validateIdToken } from "../../middleware/validateIdToken";
import { validate } from "../../middleware/validate";
import { createUserSchema } from "../../schemas/user.schema";

const router = Router();

router.post("/", validateIdToken, validate(createUserSchema.shape.body), createUserAccount);

export default router;
