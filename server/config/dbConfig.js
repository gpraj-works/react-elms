import mysql from 'mysql2/promise';

export const db = mysql.createPool({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

export const dbConnection = async () => {
	try {
		db.getConnection();
		console.log('Database connected..!');
	} catch (error) {
		console.log('Database error :', error);
	}
};
