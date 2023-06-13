import { Router } from 'express';
import { register, login, logout, changePassword } from '../controller/auth.js';

// middleware
import authentication from '../middleware/authentication.js';

// initialize router
const router = Router();

// routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/change-password", authentication, changePassword);

// export router
export default router;