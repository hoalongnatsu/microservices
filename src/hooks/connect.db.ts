import { Context } from "moleculer";
import { connect } from "DB/connect";

const db = {
	initConnect: (ctx: Context<any, any>) => {
		if (!ctx.locals.sequelize) {
			ctx.locals.sequelize = connect();
		}
	},
	closeConnect: async (ctx: Context<any, any>) => {
		if (!ctx.locals.keepDBConnect && ctx.locals.sequelize) {
			await ctx.locals.sequelize.close();
			delete ctx.locals.sequelize;
		}
	},
};

export default db;
