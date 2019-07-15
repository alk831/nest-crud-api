import {
  Model, Table, AllowNull, Column, PrimaryKey, Default
} from 'sequelize-typescript';

@Table({
  tableName: 'cards',
  timestamps: true
})
export class Card extends Model<Card> {

  @PrimaryKey
  @Column
  id: number

  @AllowNull(false)
  @Column
  note: string

  @AllowNull(false)
  @Column
  link: string

  @Column
  color: string | null

  @AllowNull(false)
  @Column
  imageUrl: string

  @Default(0)
  @Column
  imageWidth: number

  @Default(0)
  @Column
  imageHeight: number

  @AllowNull(false)
  @Column
  creatorId: number

  @Column
  creatorName: string
  
}