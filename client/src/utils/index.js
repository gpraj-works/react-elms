export const statusText = (text) => {
	switch (text) {
		case 'pending':
			return 'blue';
		case 'declined':
			return 'red';
		case 'approved':
			return 'green';
		default:
			return 'gray';
	}
};
