//prettier-ignore
import { Box, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
//prettier-ignore
import { useCounts, useRecentLeaveRequests } from '../../hooks/useAdminDashboard';
import { statusText } from '../../utils';

const Dashboard = () => {
	const { data } = useCounts();
	const { data: recentLeaves, isLoading } = useRecentLeaveRequests();
	return (
		<>
			<Grid container gap={2}>
				<Grid
					item
					lg={3}
					sx={{ boxShadow: 2, borderRadius: 2, px: 3, py: 2, bgcolor: 'white' }}
				>
					<Typography>Total employees</Typography>
					<Typography
						component='strong'
						fontSize={30}
						p={0}
						fontWeight='bold'
						color='gray'
					>
						{data?.counts?.employees}
					</Typography>
				</Grid>
				<Grid
					item
					lg={3}
					sx={{ boxShadow: 2, borderRadius: 2, px: 3, py: 2, bgcolor: 'white' }}
				>
					<Typography>Total departments</Typography>
					<Typography
						component='strong'
						fontSize={30}
						p={0}
						fontWeight='bold'
						color='gray'
					>
						{data?.counts?.departments}
					</Typography>
				</Grid>
				<Grid
					item
					lg={3}
					sx={{ boxShadow: 2, borderRadius: 2, px: 3, py: 2, bgcolor: 'white' }}
				>
					<Typography>Total leave type</Typography>
					<Typography
						component='strong'
						fontSize={30}
						p={0}
						fontWeight='bold'
						color='gray'
					>
						{data?.counts?.leaveTypes}
					</Typography>
				</Grid>
			</Grid>
			<Box mt={2}>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<Typography variant='h6' textTransform='capitalize' color='gray'>
						<Typography
							component='span'
							className='ri-list-check'
							color='gray'
						/>
						&nbsp;Recent leave request
					</Typography>
				</Stack>
				<Box
					sx={{ my: 2, bgcolor: 'white', borderRadius: 2, px: 3, boxShadow: 2 }}
				>
					<TableContainer component={Paper} sx={{ boxShadow: 0 }}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Sl.No</TableCell>
									<TableCell>Type</TableCell>
									<TableCell>From</TableCell>
									<TableCell>To</TableCell>
									<TableCell>Description</TableCell>
									<TableCell>Applied At</TableCell>
									<TableCell>Status</TableCell>
									<TableCell>Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{!isLoading &&
									recentLeaves?.requests?.map((row, index) => (
										<TableRow key={row.id}>
											<TableCell width={25}>{index + 1}</TableCell>
											<TableCell width={120}>{row.leaveType}</TableCell>
											<TableCell width={80}>
												{moment(row.from).format('DD-MM-YYYY')}
											</TableCell>
											<TableCell width={80}>
												{moment(row.to).format('DD-MM-YYYY')}
											</TableCell>
											<TableCell>{row.description}</TableCell>
											<TableCell>
												{moment(row.appliedAt).format('DD-MM-YYYY, hh:MM A')}
											</TableCell>
											<TableCell>
												{
													<Typography
														component='span'
														color={statusText(row.status)}
													>
														{row.status}
													</Typography>
												}
											</TableCell>
											<TableCell>
												<IconButton
													disableRipple
													sx={{ p: 0, m: 0 }}
													href={`/admin/leave/${row.id}`}
												>
													<Typography
														component='span'
														className='ri-external-link-line'
														fontSize={20}
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
		</>
	);
};

export default Dashboard;
