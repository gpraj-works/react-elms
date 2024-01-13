import { useState } from 'react';
//prettier-ignore
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useLeaveTypes } from '../../hooks/useUserDashboard';
import { server } from '../../utils/server';

const ApplyLeave = () => {
	const [error, setError] = useState(false);
	const { data } = useLeaveTypes();

	const initialValues = {
		leaveType: '',
		from: '',
		to: '',
		description: '',
	};

	const [values, setValues] = useState(initialValues);

	const handleValues = (e) => {
		setValues({
			...values,
			[e.target.id || e.target.name]: e.target.value,
		});
	};

	const applyLeave = async (e) => {
		e.preventDefault();
		try {
			await server.post('/user/request-leave', values);
			setValues(initialValues);
			alert('Leave applied.');
		} catch (error) {
			console.log(error?.response?.data);
			setError(error?.response?.data?.message);
			setTimeout(() => setError(false), 5000);
		}
	};

	return (
		<form onSubmit={applyLeave}>
			<Stack
				direction={{ md: 'column', lg: 'row' }}
				gap={2}
				flexWrap='wrap'
				pt={3}
				alignItems='center'
			>
				<Stack
					direction='row'
					justifyContent='space-between'
					gap={2}
					alignItems='center'
					width='100%'
				>
					<TextField
						id='from'
						type='date'
						label='From'
						variant='outlined'
						required
						fullWidth
						onChange={handleValues}
						value={values.from}
					/>
					<TextField
						id='to'
						type='date'
						label='To'
						variant='outlined'
						required
						fullWidth
						value={values.to}
						onChange={handleValues}
					/>

					<FormControl required fullWidth>
						<InputLabel id='leave-type-label'>Leave type</InputLabel>
						<Select
							labelId='leave-type-label'
							name='leaveType'
							label='Leave type *'
							onChange={handleValues}
							value={values.leaveType}
						>
							{data?.leaveTypes?.map((item, index) => (
								<MenuItem value={item.type} key={index}>
									{item.type}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Stack>

				<TextField
					id='description'
					label='Description'
					variant='outlined'
					required
					fullWidth
					value={values.description}
					onChange={handleValues}
				/>
			</Stack>
			<Button
				variant='contained'
				size='large'
				type='submit'
				sx={{ mt: 3, mb: 1 }}
			>
				Apply leave
			</Button>
			{error && (
				<Typography component='p' textAlign='center' color='red'>
					{error}
				</Typography>
			)}
		</form>
	);
};

export default ApplyLeave;
