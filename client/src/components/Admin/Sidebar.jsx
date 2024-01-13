//prettier-ignore
import { Box, Collapse, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import propTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { server } from '../../utils/server';

const Sidebar = ({ user }) => {
	const [tabIndex, setTabIndex] = useState(null);
	const navigate = useNavigate();

	const toggleTabIndex = (index) => {
		if (index === tabIndex) {
			return setTabIndex(null);
		}

		return setTabIndex(index);
	};

	const logout = async () => {
		const isOk = confirm('Do you want to logout?');
		if (!isOk) return;

		try {
			await server.get('/admin/logout');
			navigate('/login', { replace: true });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Box
			sx={{ borderRadius: 2, boxShadow: 3, height: '100%', bgcolor: 'white' }}
		>
			<Box sx={{ px: 3, pt: 3 }}>
				<Stack
					justifyContent='center'
					alignItems='center'
					sx={{
						bgcolor: '#0002',
						borderRadius: 25,
						width: 70,
						height: 70,
					}}
				>
					<Typography
						component={'span'}
						fontSize={30}
						className='ri-user-line'
					/>
				</Stack>
				<Typography
					component='p'
					sx={{ py: 1, px: 1, fontWeight: 'bold', textTransform: 'capitalize' }}
				>
					{user.username}
				</Typography>
			</Box>
			<List sx={{ px: 2 }}>
				<ListItemButton href='/admin/dashboard'>
					<Typography
						component='span'
						className='ri-pie-chart-line'
						color='gray'
					/>
					<ListItemText primary='Dashboard' sx={{ px: 1 }} />
				</ListItemButton>

				<ListItemButton href='/admin/department'>
					<Typography
						component='span'
						className='ri-bar-chart-horizontal-line'
						color='gray'
					/>
					<ListItemText primary='Department' sx={{ px: 1 }} />
				</ListItemButton>

				<ListItemButton href='/admin/leave-type'>
					<Typography
						component='span'
						className='ri-list-check-3'
						color='gray'
					/>
					<ListItemText primary='Leave type' sx={{ px: 1 }} />
				</ListItemButton>

				<ListItemButton href='/admin/employees'>
					<Typography component='span' className='ri-group-line' color='gray' />
					<ListItemText primary='Employees' sx={{ px: 1 }} />
				</ListItemButton>

				<ListItemButton onClick={() => toggleTabIndex(3)}>
					<Typography
						component='span'
						className='ri-list-settings-line'
						color='gray'
					/>
					<ListItemText primary='Leave management' sx={{ px: 1 }} />
					<Typography
						component='span'
						className={`ri-arrow-${tabIndex === 3 ? 'down' : 'right'}-s-line`}
						sx={{ fontSize: 20 }}
					/>
				</ListItemButton>

				<Collapse in={tabIndex === 3 && open} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						<ListItemButton sx={{ pl: 5 }} href='/admin/all-leaves'>
							<Typography
								component='span'
								className='ri-list-check'
								color='gray'
							/>
							<ListItemText primary='All leaves' sx={{ px: 1 }} />
						</ListItemButton>
						<ListItemButton sx={{ pl: 5 }} href='/admin/leaves/approved'>
							<Typography
								component='span'
								className='ri-check-double-line'
								color='gray'
							/>
							<ListItemText primary='Approved' sx={{ px: 1 }} />
						</ListItemButton>
						<ListItemButton sx={{ pl: 5 }} href='/admin/leaves/pending'>
							<Typography
								component='span'
								className='ri-loop-right-line'
								color='gray'
							/>
							<ListItemText primary='Pending' sx={{ px: 1 }} />
						</ListItemButton>
						<ListItemButton sx={{ pl: 5 }} href='/admin/leaves/declined'>
							<Typography
								component='span'
								className='ri-close-circle-line'
								color='gray'
							/>
							<ListItemText primary='Declined' sx={{ px: 1 }} />
						</ListItemButton>
					</List>
				</Collapse>
				<ListItemButton href='/admin/change-password'>
					<Typography
						component='span'
						className='ri-lock-password-line'
						color='gray'
					/>
					<ListItemText primary='Change password' sx={{ px: 1 }} />
				</ListItemButton>
				<ListItemButton onClick={logout}>
					<Typography
						component='span'
						className='ri-logout-circle-line'
						color='gray'
					/>
					<ListItemText primary='Logout' sx={{ px: 1 }} />
				</ListItemButton>
			</List>
		</Box>
	);
};

Sidebar.propTypes = {
	user: propTypes.object.isRequired,
};

export default Sidebar;
