import swr from 'swr';
import { fetcher } from '../utils/server';

export const useCounts = () => {
	return swr('admin/get-counts', fetcher);
};

export const useRecentRequests = () => {
	return swr('admin/recent-requests', fetcher);
};

export const useDepartments = () => {
	return swr('admin/departments', fetcher);
};

export const useLeaveTypes = () => {
	return swr('admin/leave-types', fetcher);
};

export const useLeaves = () => {
	return swr('admin/leaves', fetcher);
};

export const useLeaveById = (id) => {
	return swr(`admin/leave/${id}`, fetcher);
};

export const useLeavesByStatus = (status) => {
	return swr(`admin/leaves/${status}`, fetcher);
};

export const useRecentLeaveRequests = () => {
	return swr(`admin/recent-requests`, fetcher);
};

export const useEmployees = () => {
	return swr('admin/employees', fetcher);
};
