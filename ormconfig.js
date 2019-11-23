module.exports = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'lee',
  entities: [
    __dirname + '/src/database/entity/*.entity.ts',
    __dirname + '/dist/database/entity/*.entity.js',
  ],
  migrations: [__dirname + '/src/database/migration/**/*.ts'],
  subscribers: ['subscriber/**/*.ts', 'dist/subscriber/**/.js'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'migration',
    subscribersDir: 'subscriber',
  },
  seeds: ['src/database/seeds/*.seed.ts'],
  factories: ['src/database/factories/*.factory.ts'],
};
