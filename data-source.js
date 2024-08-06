// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'inlaze_movies',
  entities: [__dirname + '/dist/**/**/*.entity.js'],
  migrations: [__dirname + '/dist/migrations/*.js'],
  synchronize: false,
  logging: false,
});

module.exports = AppDataSource;
