import { Router } from "express";
import { getLocations } from "../../controllers/api/location.controller";

const router = Router();

router.get("/", getLocations);

export default router;
