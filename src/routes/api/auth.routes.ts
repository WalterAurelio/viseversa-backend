import { Router } from "express";
import { createUserAccount } from "../../controllers/api/auth.controller";
import { validate } from "../../middleware/validate";
import { createUserSchema } from "../../schemas/user.schema";

const router = Router();

router.post("/", validate(createUserSchema.shape.body), createUserAccount);

export default router;
