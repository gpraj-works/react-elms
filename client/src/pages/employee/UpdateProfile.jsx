//prettier-ignore
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useGetUser } from '../../hooks/useUser';
import { server } from '../../utils/server';

const UpdateProfile = () => {
	const { data, mutate } = useGetUser();

	let initialValues = {
		empId: '',
		name: '',
		dob: '',
		email: '',
		gender: '',
		department: '',
		country: '',
		address: '',
		mobile: '',
		password: '',
	};

	const [values, setValues] = useState(data ? data.user : initialValues);

	const [error, setError] = useState(false);

	const handleValues = (e) => {
		setValues({
			...values,
			[e.target.id || e.target.name]: e.target.value,
		});
	};

	const updateEmployee = async (e) => {
		e.preventDefault();
		delete values.updatedAt;
		try {
			await server.put(`/user/profile-update/${values.id}`, values);
			alert('Profile updated!');
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
					&nbsp;Profile
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
				<form onSubmit={updateEmployee}>
					<Stack
						direction={{ md: 'column', lg: 'row' }}
						gap={2}
						flexWrap='wrap'
						pt={3}
						alignItems='center'
					>
						<TextField
							id='empId'
							label='Employee code'
							variant='outlined'
							required
							disabled
							sx={{ width: '45%' }}
							onChange={handleValues}
							value={values.empId}
						/>
						<TextField
							id='name'
							label='Name'
							variant='outlined'
							required
							sx={{ width: '50%' }}
							onChange={handleValues}
							value={values.name}
						/>

						<TextField
							id='dob'
							type='text'
							label='Date of birth'
							variant='outlined'
							required
							sx={{ width: '30%' }}
							onChange={handleValues}
							value={values.dob}
						/>

						<FormControl required fullWidth sx={{ width: '30%' }}>
							<InputLabel id='gender-label'>Gender</InputLabel>
							<Select
								labelId='gender-label'
								id='gender'
								name='gender'
								label='Gender *'
								onChange={handleValues}
								value={values.gender || ''}
								defaultValue={values.gender}
							>
								<MenuItem value='male' selected>
									Male
								</MenuItem>
								<MenuItem value='female'>Female</MenuItem>
								<MenuItem value='others'>Others</MenuItem>
							</Select>
						</FormControl>
						<TextField
							id='department'
							label='Department'
							variant='outlined'
							required
							disabled
							sx={{ width: '35%' }}
							onChange={handleValues}
							value={values.department}
						/>
						<TextField
							id='country'
							label='Country'
							variant='outlined'
							required
							sx={{ width: '35%' }}
							onChange={handleValues}
							value={values.country}
						/>
						<TextField
							id='address'
							label='Address'
							variant='outlined'
							required
							sx={{ width: '55%' }}
							onChange={handleValues}
							value={values.address}
						/>
						<TextField
							id='mobile'
							label='Mobile'
							variant='outlined'
							required
							sx={{ width: '42%' }}
							onChange={handleValues}
							value={values.mobile}
						/>
						<TextField
							id='email'
							label='Email'
							variant='outlined'
							required
							sx={{ width: '55%' }}
							onChange={handleValues}
							value={values.email}
						/>
					</Stack>
					<Button
						variant='contained'
						size='large'
						type='submit'
						sx={{ mt: 3, mb: 1 }}
					>
						Update profile
					</Button>
					{error && (
						<Typography component='p' textAlign='center' color='red'>
							{error}
						</Typography>
					)}
				</form>
			</Box>
		</Box>
	);
};

export default UpdateProfile;
