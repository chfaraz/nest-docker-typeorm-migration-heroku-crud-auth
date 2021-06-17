module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST, //host should be set to 'localhost' for generating migrations
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  //commment out for local
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migration/*.js'],
  cli: {
    migrationsDir: 'migration',
  },
  migrationsRun: true,
};
