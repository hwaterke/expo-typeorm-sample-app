import * as SQLite from 'expo-sqlite'
import {DataSource} from 'typeorm/browser'
import {ENTITIES} from './entities'
import {MIGRATIONS} from './migrations'

export const DATASOURCE = new DataSource({
  type: 'expo',
  database: 'app.db',
  driver: SQLite,
  entities: ENTITIES,
  migrations: MIGRATIONS,
  migrationsRun: true,
  logging: true,
})
