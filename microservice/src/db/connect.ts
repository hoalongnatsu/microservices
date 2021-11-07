import { Op, Sequelize } from "sequelize";

export const connect = () => new Sequelize(
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		{
			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			operatorsAliases: {
				$like: Op.like,
				$nlike: Op.notLike,
				$eq: Op.eq,
				$ne: Op.ne,
				$in: Op.in,
				$nin: Op.notIn,
				$gt: Op.gt,
				$gte: Op.gte,
				$lt: Op.lt,
				$lte: Op.lte,
				$bet: Op.between,
				$contains: Op.contains,
			},
			dialect: "postgres",
			logging: (process.env.ENABLE_LOG_QUERY === "true"),
		}
	);
