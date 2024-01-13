import { Router } from 'express';
//prettier-ignore
import { validateAdminLogin, validateUserLogin } from '../middlewares/validationMiddleware.js';
//prettier-ignore
import { loginAdmin, loginUser, logoutAdmin, logoutUser, registerAdmin } from '../controllers/authController.js';
import { authAdmin, authUser } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/admin/login', validateAdminLogin, loginAdmin);
router.post('/admin/register', registerAdmin);
router.get('/admin/logout', authAdmin, logoutAdmin);

router.post('/user/login', validateUserLogin, loginUser);
router.get('/user/logout', authUser, logoutUser);

export default router;
