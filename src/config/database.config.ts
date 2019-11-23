import * as path from 'path';
export default {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: process.env.DB_LOGGING,
  entityPrefix: process.env.DB_ENTITYPREFIX,
  synchronize: true,
  dropSchema: false,
  entities: [
    `${path.resolve(__dirname, '..')}${String(process.env.DB_ENTITIES)}`,
  ],
  subscribers: [
    `${path.resolve(__dirname, '..')}${String(process.env.DB_SUBSCRIBERS)}`,
  ],
  // cache: {
  //   type: 'ioredis',
  //   options: {
  //     host: process.env.CACHE_HOST,
  //     port: process.env.CACHE_PORT,
  //     options: {
  //       scaleReads: 'all',
  //     },
  //   },
  // },
};
