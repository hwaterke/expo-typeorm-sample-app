import {MigrationInterface, QueryRunner} from 'typeorm'

export class Item1672250072087 implements MigrationInterface {
  name = 'Item1672250072087'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "item" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL)`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "item"`)
  }
}
