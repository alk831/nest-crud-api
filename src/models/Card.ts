import {
  Model, Table, AllowNull, Column, PrimaryKey, Default
} from 'sequelize-typescript';

@Table({
  tableName: 'cards'
})
export class Card extends Model<Card> {

  @PrimaryKey
  id: number

  @Column
  @AllowNull(false)
  note: string

  @Column
  @AllowNull(false)
  link: string

  @Column
  color: string | null

  @Column
  @AllowNull(false)
  imageUrl: string

  @Default(0)
  @Column
  imageWidth: number

  @Default(0)
  @Column
  imageHeight: number

  @Column
  @AllowNull(false)
  creatorId: number

  @Column
  creatorName: string
  
}