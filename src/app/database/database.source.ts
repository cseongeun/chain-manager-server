import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'qwer1234',
  database: 'chain_manager',
  migrations: ['migrations/*.ts'],
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: false,
});

dataSource.initialize();

export default dataSource;
