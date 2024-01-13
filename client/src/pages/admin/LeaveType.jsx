//prettier-ignore
import { Box, Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddLeaveType } from '../../components/Admin';
import { useLeaveTypes } from '../../hooks/useAdminDashboard';
import { updateLeaveType } from '../../toolkit/slices/adminSlice';
import { server } from '../../utils/server';

const LeaveType = () => {
	const { data, mutate } = useLeaveTypes();
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);

	const handleClose = () => {
		setOpen(false);
		mutate(data);
		dispatch(updateLeaveType({ editing: false, leaveType: {} }));
	};

	const editLeaveType = async (id) => {
		const toUpdate = data?.leaveTypes?.filter((item) => item.id === id)[0];
		dispatch(updateLeaveType({ editing: true, leaveType: toUpdate }));
		handleOpen();
	};

	const deleteLeaveType = async (id) => {
		const isOk = confirm('Are you sure?');
		if (!isOk) return;
		try {
			await server.delete(`/admin/leave-types/${id}`);
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
							className='ri-list-check-3'
							color='gray'
						/>
						&nbsp;Manage leave types
					</Typography>
					<Button
						sx={{ textAlign: 'right' }}
						variant='contained'
						onClick={handleOpen}
					>
						Add new leave type
					</Button>
				</Stack>
				<Box
					sx={{ my: 2, bgcolor: 'white', borderRadius: 2, p: 3, boxShadow: 2 }}
				>
					<TableContainer component={Paper} sx={{ boxShadow: 0 }}>
						<Table sx={{ minWidth: 650 }}>
							<TableHead>
								<TableRow>
									<TableCell>Sl.No</TableCell>
									<TableCell>Type</TableCell>
									<TableCell>Description</TableCell>
									<TableCell>Updated at</TableCell>
									<TableCell>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data?.leaveTypes?.map((row, index) => (
									<TableRow key={row.id}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{row.type}</TableCell>
										<TableCell>{row.description}</TableCell>
										<TableCell>
											{moment(row.updatedAt).format('DD-MM-YYYY H:MM A')}
										</TableCell>
										<TableCell>
											<IconButton
												disableRipple
												onClick={() => editLeaveType(row.id)}
											>
												<Typography
													component='span'
													className='ri-edit-box-line'
													color='primary'
												/>
											</IconButton>
											<IconButton
												disableRipple
												onClick={() => deleteLeaveType(row.id)}
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
			<AddLeaveType open={open} handleClose={handleClose} />
		</>
	);
};

export default LeaveType;
