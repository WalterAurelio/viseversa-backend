import { Router } from "express";
import { deleteUser, seedDb } from "../../controllers/test.controller";

const router = Router();

router.get("/", seedDb);
router.post("/delete-user", deleteUser);

export default router;
