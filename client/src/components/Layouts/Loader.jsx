import { Stack } from '@mui/material';

const Loader = () => {
	return (
		<Stack
			flexDirection='row'
			justifyContent='center'
			alignItems='center'
			sx={{
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				overflow: 'hidden',
				position: 'fixed',
			}}
		>
			loading...
		</Stack>
	);
};

export default Loader;
