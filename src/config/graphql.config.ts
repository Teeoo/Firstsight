export default {
  context: ({ req, connection }) =>
    connection ? { req: connection.context } : { req },
  // formatResponse: (res: any, req: any) => {
  //   return res;
  // },
  formatError: err => {
    return err.message;
  },
  uploads: true,
  playground: Boolean(process.env.GRAPHQL_PLAYGROUND),
  debug: false,
  autoSchemaFile: Boolean(process.env.GRAPHQL_AUTOFILE),
  installSubscriptionHandlers: process.env.GRAPHQL_SUBSCRIPTIONS,
  subscriptions: {
    onConnect: (connectionParams: any) => {
      return connectionParams.headers
        ? connectionParams
        : { headers: { authorization: connectionParams.authorization } };
    },
  },
};
