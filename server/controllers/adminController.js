import { StatusCodes } from 'http-status-codes';
import { db } from '../config/dbConfig.js';
import { hashString } from '../utils/tokenUtils.js';

export const getCurrentAdmin = async (req, res) => {
	const { id } = req.admin;
	const [[admin]] = await db.query(
		`SELECT * FROM admins WHERE id='${id}' LIMIT 1`
	);

	delete admin.password;

	return res.status(StatusCodes.OK).json({
		status: true,
		admin,
	});
};

export const changeAdminPassword = async (req, res) => {
	const { password } = req.body;
	const { username } = req.admin;

	const hashedPassword = await hashString(password);

	const result = await db.query(`
		UPDATE admins SET password='${hashedPassword}' WHERE username='${username}'
	`);

	return res.status(StatusCodes.CREATED).json({
		status: true,
		message: 'Password changed successfully',
	});
};

export const getCounts = async (req, res) => {
	const [[employees]] = await db.query(
		`SELECT COUNT(*) AS count FROM employees`
	);
	const [[departments]] = await db.query(
		`SELECT COUNT(*) AS count FROM departments`
	);
	const [[leaves]] = await db.query(`SELECT COUNT(*) AS count FROM leaves`);
	const [[leaveTypes]] = await db.query(
		`SELECT COUNT(*) AS count FROM leave_types`
	);

	return res.status(StatusCodes.OK).json({
		status: true,
		counts: {
			employees: employees.count,
			departments: departments.count,
			leaves: leaves.count,
			leaveTypes: leaveTypes.count,
		},
	});
};

export const getRecentRequests = async (req, res) => {
	const [requests] = await db.query(
		`SELECT * FROM leaves WHERE status='pending'`
	);

	return res.status(StatusCodes.OK).json({
		status: true,
		requests,
	});
};

export const getAllDepartments = async (req, res) => {
	const [departments] = await db.query(
		`SELECT * FROM departments ORDER BY updatedAt DESC`
	);

	return res.status(StatusCodes.OK).json({
		status: true,
		departments,
	});
};

export const createDepartment = async (req, res) => {
	const result = await db.query('INSERT INTO departments SET ?', req.body);
	return res.status(StatusCodes.CREATED).json({
		status: true,
		message: 'Department created successfully!',
	});
};

export const updateDepartment = async (req, res) => {
	const data = req.body;
	const { id } = req.params;
	let query = 'UPDATE departments SET ';
	let first = true;

	for (const key in data) {
		if (data[key] !== '') {
			if (!first) {
				query += ', ';
			}
			query += `${key} = COALESCE('${data[key]}', ${key})`;
			first = false;
		}
	}

	query += `WHERE id='${id}'`;

	const result = await db.query(query);
	return res.status(StatusCodes.CREATED).json({
		status: true,
		message: 'Department updated successfully!',
	});
};

export const deleteDepartment = async (req, res) => {
	const result = await db.query('DELETE FROM departments WHERE id=?', [
		req.params.id,
	]);
	return res.status(StatusCodes.CREATED).json({
		status: true,
		message: 'Department deleted successfully',
	});
};

export const getAllLeaveTypes = async (req, res) => {
	const [leaveTypes] = await db.query(
		`SELECT * FROM leave_types ORDER BY updatedAt DESC`
	);

	return res.status(StatusCodes.OK).json({
		status: true,
		leaveTypes,
	});
};

export const getAllLeaves = async (req, res) => {
	const { empId } = req.user;
	const [leaves] = await db.query(
		`SELECT * FROM leaves WHERE empId='${empId}' ORDER BY updatedAt DESC`
	);

	return res.status(StatusCodes.OK).json({
		status: true,
		leaves,
	});
};

export const getLeavesByStatus = async (req, res) => {
	const { status } = req.params;

	const [leaves] = await db.query(
		`SELECT * FROM leaves WHERE Status='${status}'`
	);

	return res.status(StatusCodes.OK).json({
		status: true,
		leaves,
	});
};

export const createLeaveType = async (req, res) => {
	const result = await db.query('INSERT INTO leave_types SET ?', req.body);
	return res.status(StatusCodes.CREATED).json({
		status: true,
		message: 'Leave type created successfully!',
	});
};

export const updateLeaveType = async (req, res) => {
	const data = req.body;
	const { id } = req.params;
	let query = 'UPDATE leave_types SET ';
	let first = true;

	for (const key in data) {
		if (data[key] !== '') {
			if (!first) {
				query += ', ';
			}
			query += `${key} = COALESCE('${data[key]}', ${key})`;
			first = false;
		}
	}

	query += `WHERE id='${id}'`;

	const result = await db.query(query);
	return res.status(StatusCodes.CREATED).json({
		status: true,
		message: 'Leave type updated successfully!',
	});
};

export const deleteLeaveType = async (req, res) => {
	const result = await db.query('DELETE FROM leave_types WHERE id=?', [
		req.params.id,
	]);
	return res.status(StatusCodes.CREATED).json({
		status: true,
		message: 'Leave type deleted successfully',
	});
};

export const getLeaveById = async (req, res) => {
	const { id } = req.params;
	const [[leave]] = await db.query(`SELECT * FROM leaves WHERE id='${id}'`);
	const [[employee]] = await db.query(
		`SELECT * FROM employees WHERE empId='${leave.empId}'`
	);

	delete employee.status;

	return res.status(StatusCodes.OK).json({
		status: true,
		leave: {
			...leave,
			...employee,
		},
	});
};

export const updateLeaveById = async (req, res) => {
	const { id } = req.params;
	const { status, remark } = req.body;

	const result = await db.query(
		'UPDATE leaves SET status=?, remark=?, remarkedAt=? WHERE id=?',
		[status, remark, new Date(), id]
	);

	return res.status(StatusCodes.CREATED).json({
		status: true,
		message: 'Leave updated successfully!',
	});
};

export const getAllEmployees = async (req, res) => {
	const [employees] = await db.query(
		`SELECT * FROM employees ORDER BY updatedAt DESC`
	);

	return res.status(StatusCodes.OK).json({
		status: true,
		employees,
	});
};

export const createEmployee = async (req, res) => {
	const result = await db.query('INSERT INTO employees SET ?', req.body);
	return res.status(StatusCodes.CREATED).json({
		status: true,
		message: `Employee added successfully.`,
	});
};

export const updateEmployee = async (req, res) => {
	const data = req.body;
	const { id } = req.params;
	let query = 'UPDATE employees SET ';
	let first = true;

	for (const key in data) {
		if (data[key] !== '') {
			if (!first) {
				query += ', ';
			}
			query += `${key} = COALESCE('${data[key]}', ${key})`;
			first = false;
		}
	}

	query += `WHERE id='${id}'`;

	const result = await db.query(query);
	return res.status(StatusCodes.CREATED).json({
		status: true,
		message: 'Employee updated successfully!',
	});
};

export const deleteEmployee = async (req, res) => {
	const result = await db.query('DELETE FROM employees WHERE id=?', [
		req.params.id,
	]);
	return res.status(StatusCodes.CREATED).json({
		status: true,
		message: 'Employee deleted successfully',
	});
};
