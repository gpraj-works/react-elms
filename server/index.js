import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import { dbConnection } from './config/dbConfig.js';

import adminRouter from './routes/adminRoute.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();
const port = 3001;

await dbConnection();

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);

app.use('/', (req, res) => res.json({ message: 'Welcome to our server!' }));

app.listen(port, () => console.log('Server running..!'));
