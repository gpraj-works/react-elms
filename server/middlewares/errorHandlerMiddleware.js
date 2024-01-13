import { StatusCodes } from 'http-status-codes';

export const checkError = (errorMessage) => {
	if (errorMessage.includes('Unknown column')) {
		return {
			code: StatusCodes.NOT_FOUND,
			msg: 'Requested data not found',
		};
	}
};
