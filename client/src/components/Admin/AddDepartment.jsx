import Modal from '../Layouts/Modal';
import propTypes from 'prop-types';
import { Typography, TextField, Stack, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { server } from '../../utils/server';
import { useSelector } from 'react-redux';

const AddDepartment = ({ open, handleClose }) => {
	const { editing, department } = useSelector((state) => state.admin);

	let initialValues = {
		departmentCode: '',
		departmentName: '',
		departmentAlias: '',
	};

	const [values, setValues] = useState(editing ? department : initialValues);

	useEffect(() => {
		setValues(editing ? department : initialValues);
	}, [editing, department]);

	const [error, setError] = useState(false);

	const handleValues = (e) => {
		setValues({
			...values,
			[e.target.id]: e.target.value,
		});
	};

	const addDepartment = async (e) => {
		e.preventDefault();
		try {
			await server.post('/admin/departments', values);
			handleClose();
		} catch (error) {
			console.log(error?.response?.data);
			setError(error?.response?.data?.message);
			setTimeout(() => setError(false), 5000);
		}
	};

	const updateDepartment = async (e) => {
		e.preventDefault();
		delete values.updatedAt;
		try {
			await server.put(`/admin/departments/${values.id}`, values);
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
					Add new department
				</Typography>
				<form onSubmit={editing ? updateDepartment : addDepartment}>
					<Stack
						direction='row'
						gap={2}
						flexWrap='wrap'
						pt={3}
						alignItems='center'
					>
						<TextField
							id='departmentCode'
							label='Department code'
							variant='outlined'
							sx={{ width: '25%' }}
							required
							onChange={handleValues}
							value={values.departmentCode}
						/>
						<TextField
							id='departmentName'
							label='Department name'
							variant='outlined'
							sx={{ width: '50%' }}
							onChange={handleValues}
							required
							value={values.departmentName}
						/>
						<TextField
							id='departmentAlias'
							label='Department alias'
							variant='outlined'
							sx={{ width: '48%' }}
							onChange={handleValues}
							required
							value={values.departmentAlias}
						/>
					</Stack>
					<Button
						variant='contained'
						size='large'
						type='submit'
						sx={{ mt: 3, mb: 1 }}
					>
						{editing ? 'Update department' : 'Create department'}
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

AddDepartment.propTypes = {
	open: propTypes.bool.isRequired,
	handleClose: propTypes.func.isRequired,
};

export default AddDepartment;
