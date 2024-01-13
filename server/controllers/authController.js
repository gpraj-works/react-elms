import { db } from '../config/dbConfig.js';
import { createToken, hashString } from '../utils/tokenUtils.js';
import { StatusCodes } from 'http-status-codes';

export const loginAdmin = async (req, res) => {
	const { username } = req.body;
	const [[admin]] = await db.query(
		`SELECT * FROM admins WHERE username='${username}' LIMIT 1`
	);

	delete admin.password;

	const token = createToken(admin);

	res.cookie('admin', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		expires: new Date(Date.now() + 1000 * 60 * 60 * 6),
	});

	return res.status(StatusCodes.OK).json({
		status: true,
		message: 'Logged in successfully',
	});
};

export const logoutAdmin = async (req, res) => {
	res.cookie('admin', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now()),
	});

	return res.status(StatusCodes.OK).json({
		status: true,
		message: 'Logged out successfully',
	});
};

export const registerAdmin = async (req, res) => {
	req.body.password = await hashString(req.body.password);
	const result = await db.query('INSERT INTO admins SET ?', req.body);
	return res.status(StatusCodes.CREATED).json({
		status: true,
		message: 'Admin created successfully!',
	});
};

export const loginUser = async (req, res) => {
	const { email } = req.body;
	const [[user]] = await db.query(
		`SELECT * FROM employees WHERE email='${email}' LIMIT 1`
	);

	delete user.password;

	const token = createToken(user);

	res.cookie('user', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		expires: new Date(Date.now() + 1000 * 60 * 60 * 6),
	});

	return res.status(StatusCodes.OK).json({
		status: true,
		message: 'Logged in successfully',
	});
};

export const logoutUser = async (req, res) => {
	res.cookie('user', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now()),
	});

	return res.status(StatusCodes.OK).json({
		status: true,
		message: 'Logged out successfully',
	});
};
