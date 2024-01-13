import { Box, Stack, Typography } from '@mui/material';
import { ApplyLeave } from '../../components/Employee';

const RequestLeave = () => {
	return (
		<Box>
			<Stack direction='row' justifyContent='space-between' alignItems='center'>
				<Typography variant='h6' color='gray'>
					<Typography
						component='span'
						className='ri-bar-chart-horizontal-line'
						color='gray'
					/>
					&nbsp;Apply leave
				</Typography>
			</Stack>
			<Box
				sx={{
					my: 2,
					bgcolor: 'white',
					borderRadius: 2,
					px: 5,
					pt: 3,
					pb: 4,
					boxShadow: 2,
				}}
			>
				<ApplyLeave />
			</Box>
		</Box>
	);
};

export default RequestLeave;
