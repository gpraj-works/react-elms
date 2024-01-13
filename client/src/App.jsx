import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AdminAuth, AdminLayout } from './components/Admin';
import { UserAuth, UserLayout } from './components/Employee';
//prettier-ignore
import { AdminDashboard, AllLeaves, ChangeAdminPassword, Department, Employees, LeaveById, LeaveType, Leaves } from './pages/admin';
import Login from './pages/Login';
//prettier-ignore
import { ChangeUserPassword, LeaveHistory, RequestLeave, UserDashboard } from './pages/employee';

function App() {
	return (
		<Routes>
			<Route element={<UserAuth />}>
				<Route path='/' element={<UserLayout />}>
					<Route path='dashboard' element={<UserDashboard />} />
					<Route path='request-leave' element={<RequestLeave />} />
					<Route path='leave-history' element={<LeaveHistory />} />
					<Route path='change-password' element={<ChangeUserPassword />} />
				</Route>
			</Route>
			<Route element={<AdminAuth />}>
				<Route path='/admin' element={<AdminLayout />}>
					<Route path='dashboard' element={<AdminDashboard />} />
					<Route path='department' element={<Department />} />
					<Route path='leave-type' element={<LeaveType />} />
					<Route path='employees' element={<Employees />} />
					<Route path='change-password' element={<ChangeAdminPassword />} />
					<Route path='all-leaves' element={<AllLeaves />} />
					<Route path='leaves/:status' element={<Leaves />} />
					<Route path='leave/:id' element={<LeaveById />} />
				</Route>
			</Route>
			<Route path='/login' element={<Login />} />
		</Routes>
	);
}

export default App;
