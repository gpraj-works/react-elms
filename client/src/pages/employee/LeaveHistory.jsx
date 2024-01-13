//prettier-ignore
import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import { useLeaves } from '../../hooks/useUserDashboard';
import { statusText } from '../../utils';

const LeaveHistory = () => {
	const { data } = useLeaves();
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
						&nbsp;Leave history
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
									<TableCell>Admin remarks</TableCell>
									<TableCell>Status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data?.leaves?.map((row, index) => (
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
											<Typography component='p'>{row.remark}</Typography>
											<Typography component='p' fontSize={13}>
												{row.remarkedAt
													? moment(row.remarkedAt).format('DD-MM-YYYY, hh:MM A')
													: 'progressing'}
											</Typography>
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

export default LeaveHistory;
