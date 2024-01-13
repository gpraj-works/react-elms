import axios from 'axios';

const baseURL = `http://localhost:3001/api/`;

export const server = axios.create({ baseURL, withCredentials: true });

export const fetcher = async (url) => {
	return await axios
		.get(baseURL + url, { withCredentials: true })
		.then((res) => res.data);
};
