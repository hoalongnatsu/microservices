import { IncomingMessage, ServerResponse } from "http";

import { Context } from "moleculer";

export default {
  path: "/api",
  whitelist: ["*.*"],
  mergeParams: true,
  authentication: false,
  authorization: false,
  autoAliases: true,
  aliases: {},
  callingOptions: {},
  bodyParsers: {
    json: {
      strict: false,
      limit: "1MB",
    },
    urlencoded: {
      extended: true,
      limit: "1MB",
    },
  },
  mappingPolicy: "all",
  logging: true,
};
