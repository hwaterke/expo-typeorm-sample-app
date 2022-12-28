import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column('varchar')
  name: string
}
