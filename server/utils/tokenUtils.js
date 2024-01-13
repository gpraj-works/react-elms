import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';

export const hashString = async (string) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(string, salt);
};

export const compareString = async (string, hash) => {
	return await bcrypt.compare(string, hash);
};

export const createToken = (user) => {
	return Jwt.sign({ user }, process.env.TOKEN_KEY, { expiresIn: '1d' });
};

export const validateToken = (token) => {
	return Jwt.verify(token, process.env.TOKEN_KEY);
};
