import { StatusCodes } from 'http-status-codes';
import { validateToken } from '../utils/tokenUtils.js';

export const authAdmin = async (req, res, next) => {
	const { admin } = req.cookies;

	if (!admin) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			status: false,
			message: 'Token is invalid or expired. Login again.',
		});
	}

	try {
		const { user } = validateToken(admin);
		delete user.updatedAt;
		req.admin = { ...user };
		next();
	} catch (error) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			status: false,
			message: 'Token is invalid or expired. Login again.',
		});
	}
};

export const authUser = async (req, res, next) => {
	const { user } = req.cookies;

	if (!user) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			status: false,
			message: 'Token is invalid or expired. Login again.',
		});
	}

	try {
		const token = validateToken(user);
		req.user = {
			empId: token.user.empId,
			email: token.user.email,
			id: token.user.id,
		};

		next();
	} catch (error) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			status: false,
			message: 'Token is invalid or expired. Login again.',
		});
	}
};
