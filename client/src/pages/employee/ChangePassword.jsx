//prettier-ignore
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { server } from '../../utils/server';

const ChangePassword = () => {
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const updatePassword = async (e) => {
		e.preventDefault();
		try {
			await server.put('/user/change-password', { password });
			alert('Password updated!');
			setPassword('');
		} catch (error) {
			console.log(error);
			alert('Password update failed!');
		}
	};

	return (
		<Box>
			<Stack direction='row' justifyContent='space-between' alignItems='center'>
				<Typography variant='h6' color='gray'>
					<Typography
						component='span'
						className='ri-lock-password-line'
						color='gray'
					/>
					&nbsp;Change password
				</Typography>
			</Stack>
			<Box
				sx={{ my: 3, bgcolor: 'white', borderRadius: 2, p: 3, boxShadow: 2 }}
			>
				<Typography variant='h5' mb={2}>
					Recent leave applications
				</Typography>
				<form
					style={{ marginTop: '2rem', marginBottom: '1rem' }}
					onSubmit={updatePassword}
				>
					<Stack direction='row' alignItems='center' gap={2}>
						<FormControl required variant='outlined' sx={{ width: '42%' }}>
							<InputLabel htmlFor='password'>New password</InputLabel>
							<OutlinedInput
								id='password'
								type={showPassword ? 'text' : 'password'}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											onClick={() => setShowPassword(!showPassword)}
											edge='end'
											disableRipple
										>
											{showPassword ? (
												<Typography className='ri-eye-line' />
											) : (
												<Typography className='ri-eye-off-line' />
											)}
										</IconButton>
									</InputAdornment>
								}
								label='New Password'
								onChange={(e) => setPassword(e.target.value)}
								value={password || ''}
							/>
						</FormControl>
						<Button
							variant='contained'
							size='large'
							type='submit'
							sx={{ p: 1.8 }}
						>
							Change password
						</Button>
					</Stack>
				</form>
			</Box>
		</Box>
	);
};

export default ChangePassword;
