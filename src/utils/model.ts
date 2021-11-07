import {
	FindAttributeOptions,
	Includeable,
	ModelAttributes,
	WhereOptions,
} from "sequelize";

import { Context } from "moleculer";
import encryption from "./encryption";

interface Options {
	pageIndex: number;
	pageSize: number;
	filters: string;
	sorter: string[];
	ctx?: Context<any, any>;
	where?: WhereOptions;
	attributes?: FindAttributeOptions;
	raw?: boolean;
	include?: Includeable | Includeable[];
}

export const initModel = <P>(
	Model: any,
	props: ModelAttributes<any, P>,
	table: string,
	ctx: Context<any, any>
) => {
	Model.init(props, {
		timestamps: false,
		tableName: table,
		sequelize: ctx.locals.sequelize,
		modelName: table,
		hooks: {
			beforeUpdate: (instance: any, options: any) => {
				instance.updated_at = new Date();
				options.fields.push("updated_at");
			},
		},
	});
};

export const findAndCountAll = async (
	Model: any,
	options?: Options
): Promise<any> => {
	const {
		pageIndex = 1,
		pageSize = 50,
		filters = "{}",
		sorter = ["created_at", "DESC"],
		where,
		ctx,
		attributes,
		raw,
		include,
	} = options;
	const filtersParse: object = JSON.parse(filters);
	const offset = (pageIndex - 1) * pageSize;

	if (ctx) {
		const cacher = ctx.broker.cacher;
		const queryGenerator =
			Model.sequelize.getQueryInterface().queryGenerator;
		const sql = queryGenerator.selectQuery(
			Model.getTableName(),
			{ where: { ...filtersParse, ...where } },
			Model
		);
		const sqlHashMd5 = encryption.hashMd5(sql);

		let cacheData: any = await cacher.get(sqlHashMd5);
		if (cacheData) {
			return JSON.parse(cacheData);
		}

		cacheData = await Model.findAndCountAll({
			where: { ...filtersParse, ...where },
			order: [sorter],
			limit: pageSize,
			offset,
			attributes,
			raw,
			include,
		});

		await cacher.set(
			sqlHashMd5,
			JSON.stringify(cacheData),
			+process.env.TTL * 60
		);

		return cacheData;
	}

	const data = await Model.findAndCountAll({
		where: { ...filtersParse, ...where },
		order: [sorter],
		limit: pageSize,
		offset,
		attributes,
		raw,
		include,
	});

	return data;
};
