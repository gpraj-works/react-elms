import { Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { AdminLogin } from '../components/Admin';
import { EmployeeLogin } from '../components/Employee';

const Login = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const toggleTab = (e, index) => setTabIndex(index);

	return (
		<Container>
			<Grid container justifyContent='center' alignItems='center' height='90vh'>
				<Grid
					item
					lg={5}
					sx={{
						borderRadius: 3,
						border: '1px solid #0003',
						boxShadow: 4,
						bgcolor: 'white',
					}}
				>
					<Tabs value={tabIndex} onChange={toggleTab} centered sx={{ pt: 1 }}>
						<Tab
							icon={<Typography component='span' className='ri-user-line' />}
							iconPosition='start'
							label='Employee'
							sx={{
								p: 3,
							}}
							disableRipple
						/>
						<Tab
							icon={
								<Typography component='span' className='ri-settings-line' />
							}
							iconPosition='start'
							label='Admin'
							disableRipple
						/>
					</Tabs>
					{tabIndex ? <AdminLogin /> : <EmployeeLogin />}
				</Grid>
			</Grid>
		</Container>
	);
};

export default Login;
