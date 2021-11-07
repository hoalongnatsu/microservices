import ApiGateway, { Errors } from "moleculer-web";
import { Context, Service, ServiceBroker } from "moleculer";
import { IncomingMessage, ServerResponse } from "http";

import api from "Routes/api.route";

export default class ApiService extends Service {
	public constructor(broker: ServiceBroker) {
		super(broker);
		// @ts-ignore
		this.parseServiceSchema({
			name: "api",
			mixins: [ApiGateway],
			settings: {
				port: process.env.PORT || 3001,
				cors: {
					origin: "*",
					methods: [
						"GET",
						"OPTIONS",
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					],
					credentials: true,
					maxAge: null,
				},
				routes: [
					api,
				],
				// Do not log client side errors (does not log an error response when the error.code is 400<=X<500)
				log4XXResponses: false,
				logRequestParams: null,
				logResponseData: null,
				assets: {
					folder: "public",
					options: {},
				},
			},
		});
	}
}
