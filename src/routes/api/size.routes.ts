import { Router } from "express";
import { getSizes } from "../../controllers/api/size.controller";

const router = Router();

router.get("/:category", getSizes);

export default router;
