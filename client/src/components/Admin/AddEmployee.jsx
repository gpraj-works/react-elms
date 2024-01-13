import propTypes from 'prop-types';
import Modal from '../Layouts/Modal';
//prettier-ignore
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { server } from '../../utils/server';
import { useDepartments } from '../../hooks/useAdminDashboard';

const AddEmployee = ({ open, handleClose }) => {
	const [showPassword, setShowPassword] = useState(false);
	const { data: departmentsList } = useDepartments();
	const { editing, employee } = useSelector((state) => state.admin);

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

	const [values, setValues] = useState(editing ? employee : initialValues);

	useEffect(() => {
		setValues(editing ? employee : initialValues);
	}, [editing, employee]);

	const [error, setError] = useState(false);

	const handleValues = (e) => {
		setValues({
			...values,
			[e.target.id || e.target.name]: e.target.value,
		});
	};

	const addEmployee = async (e) => {
		e.preventDefault();
		try {
			await server.post('/admin/employees', values);
			handleClose();
		} catch (error) {
			console.log(error?.response?.data);
			setError(error?.response?.data?.message);
			setTimeout(() => setError(false), 5000);
		}
	};

	const updateEmployee = async (e) => {
		e.preventDefault();
		delete values.updatedAt;
		try {
			await server.put(`/admin/employees/${values.id}`, values);
			handleClose();
		} catch (error) {
			console.log(error?.response?.data);
			setError(error?.response?.data?.message);
			setTimeout(() => setError(false), 5000);
		}
	};

	return (
		<Modal open={open} handleClose={handleClose}>
			<>
				<Typography id='keep-mounted-modal-title' variant='h6' component='h2'>
					Add new employee
				</Typography>
				<form onSubmit={editing ? updateEmployee : addEmployee}>
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
							type={editing ? 'text' : 'date'}
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

						<FormControl required fullWidth sx={{ width: '35%' }}>
							<InputLabel id='department-label'>Department</InputLabel>
							<Select
								labelId='department-label'
								id='genddepartmenter'
								name='department'
								label='Department *'
								onChange={handleValues}
								value={values.department || ''}
								defaultValue={values.department}
							>
								{departmentsList?.departments?.map((item, index) => (
									<MenuItem value={item.departmentName} key={index}>
										{item.departmentName}
									</MenuItem>
								))}
							</Select>
						</FormControl>

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
						<FormControl required variant='outlined' sx={{ width: '42%' }}>
							<InputLabel htmlFor='password'>Password</InputLabel>
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
								label='Password'
								onChange={handleValues}
								value={values.password || ''}
							/>
						</FormControl>
					</Stack>
					<Button
						variant='contained'
						size='large'
						type='submit'
						sx={{ mt: 3, mb: 1 }}
					>
						{editing ? 'Update employee' : 'Create employee'}
					</Button>
					<Button
						variant='outlined'
						size='large'
						sx={{ mt: 3, mb: 1, ml: 2 }}
						onClick={handleClose}
					>
						Cancel
					</Button>
					{error && (
						<Typography component='p' textAlign='center' color='red'>
							{error}
						</Typography>
					)}
				</form>
			</>
		</Modal>
	);
};

AddEmployee.propTypes = {
	open: propTypes.bool.isRequired,
	handleClose: propTypes.func.isRequired,
};

export default AddEmployee;
