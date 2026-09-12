import { Router } from "express";
import { getUserProfile, getUserById, updateUser, deleteUser } from "../controllers/user.controller";

const router = Router();

router.get("/", getUserProfile);
router.get("/:id", getUserById);
router.put("/", updateUser);
router.delete("/", deleteUser);

export default router;
