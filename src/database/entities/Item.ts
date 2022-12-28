import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar')
  name: string
}
