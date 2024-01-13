import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import App from './App.jsx';
import './index.css';
import store from './toolkit/store.js';

const customTheme = createTheme({
	typography: {
		fontFamily: ['Poppins'],
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<ThemeProvider theme={customTheme}>
					<App />
				</ThemeProvider>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
