import {
  Model,
  Table,
  AllowNull,
  Column,
  PrimaryKey,
  Default,
  DataType,
  AutoIncrement
} from 'sequelize-typescript';
import { CardCategory } from '../common/types';

@Table({
  tableName: 'cards',
  timestamps: true
})
export class Card extends Model<Card> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number | string

  @AllowNull(false)
  @Column
  note: string

  @AllowNull(false)
  @Column(DataType.ENUM(
    'mobile interaction',
    'mobile app',
    'dashboard',
    'logo'
  ))
  category: CardCategory

  @AllowNull(false)
  @Column
  url: string

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
  @Column(DataType.BIGINT)
  creatorId: number | string

  @Column
  creatorName: string

  @AllowNull(false)
  @Column
  creatorUrl: string
  
}