//prettier-ignore
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLeaveById } from '../../hooks/useAdminDashboard';
import { statusText } from '../../utils';
import { server } from '../../utils/server';

const LeaveById = () => {
	let { id } = useParams();
	const { data, isLoading, mutate } = useLeaveById(id);
	const [error, setError] = useState(false);

	const initialState = {
		remark: '',
		status: '',
	};

	const [values, setValues] = useState(initialState);

	const handleValues = (e) => {
		setValues({
			...values,
			[e.target.id || e.target.name]: e.target.value,
		});
	};

	const leave = !isLoading ? data.leave : false;

	const updateLeaveStatus = async (e) => {
		e.preventDefault();
		try {
			await server.put(`/admin/leave/${id}`, values);
			mutate(data);
		} catch (error) {
			console.log(error?.response?.data);
			setError(error?.response?.data?.message);
			setTimeout(() => setError(false), 5000);
		}
	};

	return (
		<Box>
			<Stack direction='row' justifyContent='space-between' alignItems='center'>
				<Typography variant='h6' color='gray'>
					<Typography
						component='span'
						className='ri-bar-chart-horizontal-line'
						color='gray'
					/>
					&nbsp;Manage leave
				</Typography>
			</Stack>
			<Box
				sx={{ my: 2, bgcolor: 'white', borderRadius: 2, p: 3, boxShadow: 2 }}
			>
				{leave && (
					<Grid container px={5} py={2}>
						<Grid item>
							<Grid container columns={2} width='100%'>
								<Grid item width='50%' mb={1}>
									<Typography color='gray'>Employee name : </Typography>
								</Grid>
								<Grid item>
									<Typography>{leave.name}</Typography>
								</Grid>
								<Grid item width='50%' mb={1}>
									<Typography color='gray'>Employee email : </Typography>
								</Grid>
								<Grid item>
									<Typography>{leave.email}</Typography>
								</Grid>
							</Grid>
							<Grid container columns={2} width='100%'>
								<Grid item width='50%' mb={1}>
									<Typography color='gray'>Leave type : </Typography>
								</Grid>
								<Grid item>
									<Typography>{leave.leaveType}</Typography>
								</Grid>
								<Grid item width='50%' mb={1}>
									<Typography color='gray'>Leave description : </Typography>
								</Grid>
								<Grid item>
									<Typography>{leave.description}</Typography>
								</Grid>
							</Grid>
							<Grid container columns={2} width='100%'>
								<Grid item width='50%' mb={1}>
									<Typography color='gray'>Status : </Typography>
								</Grid>
								<Grid item>
									<Typography color={statusText(leave.status)}>
										{leave.status}
									</Typography>
								</Grid>
								<Grid item width='50%' mb={1}>
									<Typography color='gray'>Remark : </Typography>
								</Grid>
								<Grid item>
									<Typography>{leave.remark || 'empty'}</Typography>
								</Grid>
							</Grid>
							<Grid container columns={2} width='100%'>
								<Grid item width='50%' mb={1}>
									<Typography color='gray'>Action taken at : </Typography>
								</Grid>
								<Grid item>
									<Typography>
										{leave.remarkedAt
											? moment(leave.remarkedAt).format('DD-MM-YYYY / hh:MM A')
											: 'empty'}
									</Typography>
								</Grid>
								<Grid item width='50%' mb={1}>
									<Typography color='gray'>Employee code : </Typography>
								</Grid>
								<Grid item>
									<Typography>{leave.empId}</Typography>
								</Grid>
							</Grid>
							<Grid container columns={2} width='100%'>
								<Grid item width='50%' mb={1}>
									<Typography color='gray'>Employee mobile : </Typography>
								</Grid>
								<Grid item>
									<Typography>{leave.mobile}</Typography>
								</Grid>
								<Grid item width='50%' mb={1}>
									<Typography color='gray'>Leave date : </Typography>
								</Grid>
								<Grid item>
									<Typography>
										{moment(leave.from).format('DD-MM-YYYY')} to{' '}
										{moment(leave.to).format('DD-MM-YYYY')}{' '}
									</Typography>
								</Grid>
							</Grid>
							<Grid container columns={2} width='100%'>
								<Grid item width='50%' mb={1}>
									<Typography color='gray'>Requested at : </Typography>
								</Grid>
								<Grid item>
									<Typography>
										{moment(leave.requestedAt).format('DD-MM-YYYY / hh:MM A')}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				)}

				<Box px={5}>
					<form onSubmit={updateLeaveStatus}>
						<Stack direction='row' gap={2} pt={1} alignItems='center'>
							<TextField
								id='remark'
								label='Remark message'
								variant='outlined'
								required
								fullWidth
								value={values.remark}
								onChange={handleValues}
							/>
							<FormControl fullWidth>
								<InputLabel id='status-label'>Status</InputLabel>
								<Select
									labelId='status-label'
									id='status'
									name='status'
									value={values.status}
									label='Status'
									onChange={handleValues}
								>
									<MenuItem value='pending'>Pending</MenuItem>
									<MenuItem value='approved'>Approved</MenuItem>
									<MenuItem value='declined'>Declined</MenuItem>
								</Select>
							</FormControl>
						</Stack>
						<Button
							variant='contained'
							size='large'
							type='submit'
							sx={{ mt: 3, mb: 1 }}
						>
							Update status
						</Button>
						{error && (
							<Typography component='p' textAlign='center' color='red'>
								{error}
							</Typography>
						)}
					</form>
				</Box>
			</Box>
		</Box>
	);
};

export default LeaveById;
