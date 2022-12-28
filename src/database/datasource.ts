import * as SQLite from 'expo-sqlite'
import {DataSource} from 'typeorm/browser'
import {ENTITIES} from './entities'
import {MIGRATIONS} from './migrations'
import {DATABASE_NAME} from './constants'

export const DATASOURCE = new DataSource({
  type: 'expo',
  database: DATABASE_NAME,
  driver: SQLite,
  entities: ENTITIES,
  migrations: MIGRATIONS,
  migrationsRun: true,
  logging: true,
})
