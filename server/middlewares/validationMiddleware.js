import { StatusCodes } from 'http-status-codes';
import { db } from '../config/dbConfig.js';
import { compareString } from '../utils/tokenUtils.js';
import { checkError } from './errorHandlerMiddleware.js';

export const validateAdminLogin = async (req, res, next) => {
	const { username, password } = req.body;

	try {
		const [admin] = await db.query(
			`SELECT * FROM admins WHERE username='${username}' LIMIT 1`
		);

		if (!admin.length) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				status: false,
				message: 'Username not found!',
			});
		}

		const isPasswordMatched = await compareString(password, admin[0].password);

		if (!isPasswordMatched) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				status: false,
				message: 'Given password not match',
			});
		}

		next();
	} catch (error) {
		const errorResult = checkError(error.message);
		return res.status(errorResult.code).json({
			status: false,
			message: errorResult.msg,
		});
	}
};

export const validateDepartmentInputs = async (req, res, next) => {
	const { departmentName, departmentCode, departmentAlias } = req.body;

	const [department] = await db.query(
		`SELECT * FROM departments WHERE departmentCode=? OR departmentName=? OR departmentAlias=?`,
		[departmentCode, departmentName, departmentAlias]
	);

	if (department.length) {
		return res.status(StatusCodes.CONFLICT).json({
			status: false,
			message: 'Department code or name or alias already exist',
		});
	}

	next();
};

export const validateLeaveTypeInputs = async (req, res, next) => {
	const { type } = req.body;

	try {
		const [leaveType] = await db.query(
			`SELECT * FROM leave_types WHERE type='${type}'`
		);

		if (leaveType.length) {
			return res.status(StatusCodes.CONFLICT).json({
				status: false,
				message: 'Leave type already exist',
			});
		}

		next();
	} catch (error) {
		const errorResult = checkError(error.message);
		return res.status(errorResult.code).json({
			status: false,
			message: errorResult.msg,
		});
	}
};

export const validateEmployeeInputs = async (req, res, next) => {
	const { email, empId, mobile } = req.body;

	try {
		const [employee] = await db.query(
			`SELECT * FROM employees WHERE empId='${empId}' OR email='${email}' OR mobile='${mobile}'`
		);

		if (employee.length) {
			return res.status(StatusCodes.CONFLICT).json({
				status: false,
				message: 'Employee id or email or mobile already exist',
			});
		}

		next();
	} catch (error) {
		const errorResult = checkError(error.message);
		return res.status(errorResult.code).json({
			status: false,
			message: errorResult.msg,
		});
	}
};

export const validateDepartmentId = async (req, res, next) => {
	const [department] = await db.query(`SELECT * FROM departments WHERE id=?`, [
		req.params.id,
	]);

	if (!department.length) {
		return res.status(StatusCodes.CONFLICT).json({
			status: false,
			message: 'Department not exist',
		});
	}

	next();
};

export const validateLeaveTypeId = async (req, res, next) => {
	const [leaveType] = await db.query(`SELECT * FROM leave_types WHERE id=?`, [
		req.params.id,
	]);

	if (!leaveType.length) {
		return res.status(StatusCodes.CONFLICT).json({
			status: false,
			message: 'Leave type not exist',
		});
	}

	next();
};

export const validateEmployeeId = async (req, res, next) => {
	const [employee] = await db.query(`SELECT * FROM employees WHERE id=?`, [
		req.params.id,
	]);

	if (!employee.length) {
		return res.status(StatusCodes.CONFLICT).json({
			status: false,
			message: 'Employee not exist',
		});
	}

	next();
};

export const validateUserLogin = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const [user] = await db.query(
			`SELECT * FROM employees WHERE email='${email}' LIMIT 1`
		);

		if (!user.length) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				status: false,
				message: 'User not found!',
			});
		}

		if (password !== user[0].password) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				status: false,
				message: 'Given password not match',
			});
		}

		next();
	} catch (error) {
		const errorResult = checkError(error.message);
		return res.status(errorResult.code).json({
			status: false,
			message: errorResult.msg,
		});
	}
};
