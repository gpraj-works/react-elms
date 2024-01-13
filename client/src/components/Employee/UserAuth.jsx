import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetUser } from '../../hooks/useUser';
import { updateUser } from '../../toolkit/slices/userSlice';
import Loader from '../Layouts/Loader';

const UserAuth = () => {
	const dispatch = useDispatch();
	const { data, isLoading, error } = useGetUser();

	if (isLoading) {
		return <Loader />;
	}

	if (!error?.response?.data?.status) {
		if (error?.response?.status === 401) {
			return <Navigate to='/login' replace />;
		}
	}

	if (data.status) {
		dispatch(updateUser(data.user));
		return <Outlet />;
	}

	return <Navigate to='/login' replace />;
};

export default UserAuth;
