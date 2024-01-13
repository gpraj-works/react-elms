import { Router } from 'express';
//prettier-ignore
import {
	changeAdminPassword, createDepartment, createEmployee, createLeaveType, deleteDepartment, deleteEmployee, deleteLeaveType, getAllDepartments, getAllEmployees, getAllLeaveTypes, getAllLeaves, getCounts, getCurrentAdmin, getLeaveById, getLeavesByStatus, getRecentRequests, updateDepartment, updateEmployee, updateLeaveById, updateLeaveType
} from '../controllers/adminController.js';
import { authAdmin } from '../middlewares/authMiddleware.js';
//prettier-ignore
import {
	validateDepartmentId, validateDepartmentInputs, validateEmployeeId, validateEmployeeInputs, validateLeaveTypeId,
	validateLeaveTypeInputs
} from '../middlewares/validationMiddleware.js';

const router = Router();

router.get('/current-admin', authAdmin, getCurrentAdmin);
router.put('/change-password', authAdmin, changeAdminPassword);

router.get('/get-counts', authAdmin, getCounts);
router.get('/recent-requests', authAdmin, getRecentRequests);

router
	.route('/departments')
	.get(authAdmin, getAllDepartments)
	.post(authAdmin, validateDepartmentInputs, createDepartment);

router
	.route('/departments/:id')
	.put(authAdmin, validateDepartmentId, updateDepartment)
	.delete(authAdmin, validateDepartmentId, deleteDepartment);

router
	.route('/leave-types')
	.get(authAdmin, getAllLeaveTypes)
	.post(authAdmin, validateLeaveTypeInputs, createLeaveType);

router
	.route('/leave-types/:id')
	.put(authAdmin, validateLeaveTypeId, updateLeaveType)
	.delete(authAdmin, validateLeaveTypeId, deleteLeaveType);

router
	.route('/employees')
	.get(authAdmin, getAllEmployees)
	.post(authAdmin, validateEmployeeInputs, createEmployee);

router
	.route('/employees/:id')
	.put(authAdmin, validateEmployeeId, updateEmployee)
	.delete(authAdmin, validateEmployeeId, deleteEmployee);

router.get('/leaves', authAdmin, getAllLeaves);
router.get('/leaves/:status', authAdmin, getLeavesByStatus);

router
	.route('/leave/:id')
	.get(authAdmin, getLeaveById)
	.put(authAdmin, updateLeaveById);

export default router;
