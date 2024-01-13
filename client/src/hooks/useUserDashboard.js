import swr from 'swr';
import { fetcher } from '../utils/server';

export const useLeaveTypes = () => {
	return swr('user/leave-types', fetcher);
};

export const useLeaves = () => {
	return swr('user/leaves', fetcher);
};
