import { Button, Stack, TextField, Typography } from '@mui/material';
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { server } from '../../utils/server';
import Modal from '../Layouts/Modal';

const AddLeaveType = ({ open, handleClose }) => {
	const { editing, leaveType } = useSelector((state) => state.admin);

	let initialValues = { type: '', description: '' };

	const [values, setValues] = useState(editing ? leaveType : initialValues);

	useEffect(() => {
		setValues(editing ? leaveType : initialValues);
	}, [editing, leaveType]);

	const [error, setError] = useState(false);

	const handleValues = (e) => {
		setValues({
			...values,
			[e.target.id]: e.target.value,
		});
	};

	const addLeaveType = async (e) => {
		e.preventDefault();
		try {
			await server.post('/admin/leave-types', values);
			handleClose();
		} catch (error) {
			console.log(error?.response?.data);
			setError(error?.response?.data?.message);
			setTimeout(() => setError(false), 5000);
		}
	};

	const updateLeaveType = async (e) => {
		e.preventDefault();
		delete values.updatedAt;
		try {
			await server.put(`/admin/leave-types/${values.id}`, values);
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
					Add new leave type
				</Typography>
				<form onSubmit={editing ? updateLeaveType : addLeaveType}>
					<Stack
						direction='row'
						gap={2}
						flexWrap='wrap'
						pt={3}
						alignItems='center'
					>
						<TextField
							id='type'
							label='Leave type'
							variant='outlined'
							required
							fullWidth
							onChange={handleValues}
							value={values.type}
						/>
						<TextField
							id='description'
							label='Description'
							variant='outlined'
							required
							fullWidth
							multiline
							rows={4}
							onChange={handleValues}
							value={values.description}
						/>
					</Stack>
					<Button
						variant='contained'
						size='large'
						type='submit'
						sx={{ mt: 3, mb: 1 }}
					>
						{editing ? 'Update leave type' : 'Create leave type'}
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

AddLeaveType.propTypes = {
	open: propTypes.bool.isRequired,
	handleClose: propTypes.func.isRequired,
};

export default AddLeaveType;
