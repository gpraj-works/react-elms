import { Router } from 'express';
import { authUser } from '../middlewares/authMiddleware.js';
//prettier-ignore
import { changeUserPassword, getCurrentUser, requestLeave } from '../controllers/userController.js';
import { validateEmployeeId } from '../middlewares/validationMiddleware.js';
//prettier-ignore
import { getAllLeaveTypes, getAllLeaves, updateEmployee } from '../controllers/adminController.js';

const router = Router();

router.get('/current-user', authUser, getCurrentUser);
router.put('/change-password', authUser, changeUserPassword);
router.put('/profile-update/:id', authUser, validateEmployeeId, updateEmployee);

router.route('/leave-types').get(authUser, getAllLeaveTypes);
router.post('/request-leave', authUser, requestLeave);
router.get('/leaves', authUser, getAllLeaves);

export default router;
