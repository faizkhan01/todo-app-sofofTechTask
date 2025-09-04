import { DataSourceOptions, DataSource } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'todo_user',
  password: 'todo_pass',
  database: 'todo_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/database/migrations/*.ts'],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(config);
export default dataSource;
