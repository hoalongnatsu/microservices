import { Context, ServiceHooks } from "moleculer";

import db from "./connect.db";

const RootHooks = (): ServiceHooks => {
	const beforeHook = [db.initConnect];

	const hooks: ServiceHooks = {
		before: {
			"*": beforeHook,
		},
		after: {
			"*": (ctx: Context<any, any>, res) => {
				db.closeConnect(ctx);
				return res;
			},
		},
	};

	return hooks;
};

export default RootHooks;
