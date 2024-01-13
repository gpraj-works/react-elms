import { Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { server } from '../../utils/server';

const Login = () => {
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const handleUser = async (e) => {
		e.preventDefault();
		try {
			await server.post('/admin/login', {
				username: e.target.username.value,
				password: e.target.password.value,
			});
			navigate('/admin/dashboard');
		} catch (error) {
			console.log(error?.response?.data);
			setError(error?.response?.data?.message);
			setTimeout(() => setError(false), 5000);
		}
	};

	return (
		<form onSubmit={handleUser}>
			<Stack gap={2} p={5}>
				<TextField id='username' label='Username' variant='outlined' required />
				<TextField
					id='password'
					label='Password'
					variant='outlined'
					type='password'
					required
				/>
				<Button variant='contained' size='large' type='submit' color='info'>
					Login Account
				</Button>
				{error && (
					<Typography component='p' textAlign='center' color='red'>
						{error}
					</Typography>
				)}
			</Stack>
		</form>
	);
};

export default Login;
