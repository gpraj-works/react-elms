import swr from 'swr';
import { fetcher } from '../utils/server';

export const useGetAdmin = () => {
	return swr('admin/current-admin', fetcher);
};
