//prettier-ignore
import { Box, Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddDepartment } from '../../components/Admin';
import { useDepartments } from '../../hooks/useAdminDashboard';
import { updateDepartment } from '../../toolkit/slices/adminSlice';
import { server } from '../../utils/server';

const Department = () => {
	const { data, mutate } = useDepartments();
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);

	const handleClose = () => {
		setOpen(false);
		mutate(data);
		dispatch(updateDepartment({ editing: false, department: {} }));
	};

	const editDepartment = async (id) => {
		const toUpdate = data?.departments?.filter((item) => item.id === id)[0];
		dispatch(updateDepartment({ editing: true, department: toUpdate }));
		handleOpen();
	};

	const deleteDepartment = async (id) => {
		const isOk = confirm('Are you sure?');
		if (!isOk) return;
		try {
			await server.delete(`/admin/departments/${id}`);
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
							className='ri-bar-chart-horizontal-line'
							color='gray'
						/>
						&nbsp;Manage departments
					</Typography>
					<Button
						sx={{ textAlign: 'right' }}
						variant='contained'
						onClick={handleOpen}
					>
						Add new department
					</Button>
				</Stack>
				<Box
					sx={{ my: 2, bgcolor: 'white', borderRadius: 2, p: 3, boxShadow: 2 }}
				>
					<TableContainer component={Paper} sx={{ boxShadow: 0 }}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Sl.No</TableCell>
									<TableCell>Code</TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Alias</TableCell>
									<TableCell>Updated at</TableCell>
									<TableCell>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data?.departments?.map((row, index) => (
									<TableRow key={row.id}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{row.departmentCode}</TableCell>
										<TableCell>{row.departmentName}</TableCell>
										<TableCell>{row.departmentAlias}</TableCell>
										<TableCell>
											{moment(row.updatedAt).format('DD-MM-YYYY H:MM A')}
										</TableCell>
										<TableCell>
											<IconButton
												disableRipple
												onClick={() => editDepartment(row.id)}
											>
												<Typography
													component='span'
													className='ri-edit-box-line'
													color='primary'
												/>
											</IconButton>
											<IconButton
												disableRipple
												onClick={() => deleteDepartment(row.id)}
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
			<AddDepartment open={open} handleClose={handleClose} />
		</>
	);
};

export default Department;
