module.exports = {
	dev: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: "localhost",
		port: process.env.DB_PORT,
		dialect: "postgres",
		seederStorage: "sequelize",
	},
	testing: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: "postgres",
		seederStorage: "sequelize",
	},
	production: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: "postgres",
		seederStorage: "sequelize",
	},
};
