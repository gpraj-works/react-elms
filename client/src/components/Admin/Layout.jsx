import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
	const admin = useSelector((state) => state.admin.user);

	return (
		<Grid container spacing={2}>
			<Grid
				item
				lg={3}
				position='sticky'
				sx={{ height: '99vh', top: 0, pl: 3 }}
			>
				<Sidebar user={admin} />
			</Grid>
			<Grid item lg={9} sx={{ px: 1 }}>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					sx={{
						boxShadow: 1,
						px: 3,
						py: 1,
						mb: 2,
						borderRadius: 2,
						bgcolor: 'white',
					}}
				>
					<Box>
						<Typography fontWeight='bold' variant='h5' color='primary'>
							ELMS
						</Typography>
					</Box>
					<Box>
						<IconButton disableRipple>
							<Typography component='span' className='ri-notification-3-line' />
						</IconButton>
					</Box>
				</Stack>
				<Outlet />
			</Grid>
		</Grid>
	);
};

export default Layout;
