import swr from 'swr';
import { fetcher } from '../utils/server';

export const useGetUser = () => {
	return swr('user/current-user', fetcher);
};