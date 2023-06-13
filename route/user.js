import { Router } from "express";

import { getMe, updateUserProfile } from "../controller/user.js";

import authentication from "../middleware/authentication.js";

const router = Router();

router.get("/me", authentication, getMe);
router.put("/update", authentication, updateUserProfile);

export default router;