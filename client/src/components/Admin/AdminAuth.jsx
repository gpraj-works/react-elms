import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetAdmin } from '../../hooks/useAdmin';
import { updateUser } from '../../toolkit/slices/adminSlice';
import Loader from '../Layouts/Loader';

const AdminAuth = () => {
	const dispatch = useDispatch();
	const { data, isLoading, error } = useGetAdmin();

	if (isLoading) {
		return <Loader />;
	}

	if (!error?.response?.data?.status) {
		if (error?.response?.status === 401) {
			return <Navigate to='/login' replace />;
		}
	}

	if (data.status) {
		dispatch(updateUser(data.admin));
		return <Outlet />;
	}

	return <Navigate to='/login' replace />;
};

export default AdminAuth;
