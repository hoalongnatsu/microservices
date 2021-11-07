import { BrokerOptions, Errors, ServiceBroker } from "moleculer";

import { exec } from "child_process";

const brokerConfig: BrokerOptions = {
	namespace: "",
	nodeID: null,
	metadata: {},
	logger: {
		type: "Console",
		options: {
			colors: true,
			moduleColors: false,
			formatter: "full",
			objectPrinter: null,
			autoPadding: false,
		},
	},
	logLevel: "info",
	transporter: null,
	cacher: "Redis",
	serializer: "JSON",
	requestTimeout: 10 * 1000,
	retryPolicy: {
		enabled: false,
		retries: 5,
		delay: 100,
		maxDelay: 1000,
		factor: 2,
		check: (err: Errors.MoleculerError) => err && !!err.retryable,
	},
	maxCallLevel: 100,
	heartbeatInterval: 10,
	heartbeatTimeout: 30,
	contextParamsCloning: false,
	tracking: {
		enabled: true,
		shutdownTimeout: 5000,
	},
	disableBalancer: false,
	registry: {
		strategy: "RoundRobin",
		preferLocal: true,
	},
	circuitBreaker: {
		enabled: false,
		threshold: 0.5,
		minRequestCount: 20,
		windowTime: 60,
		halfOpenTime: 10 * 1000,
		check: (err: Errors.MoleculerError) => err && err.code >= 500,
	},
	bulkhead: {
		enabled: false,
		concurrency: 10,
		maxQueueSize: 100,
	},
	validator: true,
	errorHandler: null,
	metrics: {
		enabled: false,
	},
	tracing: {
		enabled: false,
	},
	middlewares: [],
	replCommands: null,

	/** Called when broker started, stopped
	 * started: async (broker: ServiceBroker): Promise<void> => {},
	 * stopped: async (broker: ServiceBroker): Promise<void> => {},
	*/
	created: (broker: ServiceBroker): void => {
		if (process.env.NODE_ENV !== "dev" && process.env.SERVICES === "api") {
			const migrate = exec("sequelize-cli db:migrate", { env: process.env }, console.log);
			migrate.stdout.pipe(process.stdout);
			migrate.stderr.pipe(process.stderr);
		}
	},
};

export = brokerConfig;
