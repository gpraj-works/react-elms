import { Box, Modal } from '@mui/material';
import propTypes from 'prop-types';

const style = {
	position: 'absolute',
	top: '40%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50%',
	bgcolor: 'background.paper',
	borderRadius: 3,
	boxShadow: 24,
	p: 4,
};

const AddDepartment = ({ open, handleClose, children }) => {
	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={style}>{children}</Box>
		</Modal>
	);
};

AddDepartment.propTypes = {
	open: propTypes.bool.isRequired,
	handleClose: propTypes.func.isRequired,
	children: propTypes.node.isRequired,
};

export default AddDepartment;
