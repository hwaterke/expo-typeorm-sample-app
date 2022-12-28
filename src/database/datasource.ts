import * as SQLite from 'expo-sqlite'
import {DataSource} from 'typeorm/browser'
import {Item} from './entities/Item'

export const DATASOURCE = new DataSource({
  type: 'expo',
  database: 'app.db',
  driver: SQLite,
  entities: [Item],
  synchronize: true,
  logging: true,
})
