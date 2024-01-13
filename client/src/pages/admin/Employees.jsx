//prettier-ignore
import { Box, Button, IconButton, Paper, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddEmployee } from '../../components/Admin';
import { useEmployees } from '../../hooks/useAdminDashboard';
import { updateEmployee } from '../../toolkit/slices/adminSlice';
import { server } from '../../utils/server';

const Employees = () => {
	const { data, mutate } = useEmployees();
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);

	const handleClose = () => {
		setOpen(false);
		mutate(data);
		dispatch(updateEmployee({ editing: false, employee: {} }));
	};

	const editEmployee = async (id) => {
		const toUpdate = data?.employees?.filter((item) => item.id === id)[0];
		toUpdate.dob = moment(toUpdate.dob).format('YYYY-MM-DD');
		dispatch(updateEmployee({ editing: true, employee: toUpdate }));
		handleOpen();
	};

	const deleteEmployee = async (id) => {
		const isOk = confirm('Are you sure?');
		if (!isOk) return;
		try {
			await server.delete(`/admin/employees/${id}`);
			mutate(data);
		} catch (error) {
			console.log(error?.response?.data);
			alert(error?.response?.data?.message);
		}
	};

	return (
		<>
			<Box>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<Typography variant='h6' color='gray'>
						<Typography
							component='span'
							className='ri-group-line'
							color='gray'
						/>
						&nbsp;Manage employees
					</Typography>
					<Button
						sx={{ textAlign: 'right' }}
						variant='contained'
						onClick={handleOpen}
					>
						Add new employee
					</Button>
				</Stack>
				<Box
					sx={{ my: 2, bgcolor: 'white', borderRadius: 2, p: 3, boxShadow: 2 }}
				>
					<TableContainer component={Paper} sx={{ boxShadow: 0 }}>
						<Table sx={{ minWidth: 650 }} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>Sl.No</TableCell>
									<TableCell>Id/Department</TableCell>
									<TableCell>Name/Email</TableCell>
									<TableCell>DoB</TableCell>
									<TableCell>Gender</TableCell>
									<TableCell>Address</TableCell>
									<TableCell>Status</TableCell>
									<TableCell>Updated at</TableCell>
									<TableCell>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data?.employees?.map((row, index) => (
									<TableRow key={row.id}>
										<TableCell width={10}>{index + 1}</TableCell>
										<TableCell width={130}>
											<Typography component='p' fontWeight='bold'>
												{row.empId}
											</Typography>
											<Typography component='p' fontSize={13}>
												{row.department}
											</Typography>
										</TableCell>
										<TableCell width={120}>
											<Typography component='p' fontWeight='bold'>
												{row.name}
											</Typography>
											<Typography component='p' fontSize={13}>
												{row.email}
											</Typography>
											<Typography component='p' fontSize={13}>
												{row.mobile}
											</Typography>
										</TableCell>
										<TableCell width={80}>
											{moment(row.dob).format('DD-MM-YYYY')}
										</TableCell>
										<TableCell>{row.gender}</TableCell>
										<TableCell>
											<Typography component='p' fontSize={13}>
												{row.address}, {row.country}
											</Typography>
										</TableCell>
										<TableCell>
											<Switch checked={row.status ? true : false} />
										</TableCell>
										<TableCell width={100}>
											<Typography component='p' fontSize={13}>
												{moment(row.updatedAt).fromNow()}
											</Typography>
										</TableCell>
										<TableCell width={70}>
											<IconButton
												disableRipple
												onClick={() => editEmployee(row.id)}
											>
												<Typography
													component='span'
													className='ri-edit-box-line'
													color='primary'
												/>
											</IconButton>
											<IconButton
												disableRipple
												onClick={() => deleteEmployee(row.id)}
											>
												<Typography
													component='span'
													className='ri-delete-bin-line'
													color='red'
												/>
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
			<AddEmployee open={open} handleClose={handleClose} />
		</>
	);
};

export default Employees;
