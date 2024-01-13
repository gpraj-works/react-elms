import { db } from '../config/dbConfig.js';
import { StatusCodes } from 'http-status-codes';
import moment from 'moment';

export const getCurrentUser = async (req, res) => {
	const { id } = req.user;
	const [[user]] = await db.query(
		`SELECT * FROM employees WHERE id='${id}' LIMIT 1`
	);

	delete user.password;
	user.dob = moment(user.dob).format('YYYY-MM-DD');

	return res.status(StatusCodes.OK).json({
		status: true,
		user,
	});
};

export const changeUserPassword = async (req, res) => {
	const { password } = req.body;
	const { email } = req.user;

	const result = await db.query(`
		UPDATE employees SET password='${password}' WHERE email='${email}'
	`);

	return res.status(StatusCodes.CREATED).json({
		status: true,
		message: 'Password changed successfully',
	});
};

export const requestLeave = async (req, res) => {
	req.body.empId = req.user.empId;
	req.body.requestedAt = new Date();
	const result = await db.query('INSERT INTO leaves SET ?', req.body);
	return res.status(StatusCodes.CREATED).json({
		status: true,
		message: `Leave requested successfully.`,
	});
};
