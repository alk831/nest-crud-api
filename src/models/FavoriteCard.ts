import {
  Model,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  DataType
} from 'sequelize-typescript';
import { Card } from './Card';
import { User } from './User';

@Table({
  tableName: 'favorite_cards',
  timestamps: true
})
export class FavoriteCard extends Model<FavoriteCard> {

  id: number

  @ForeignKey(() => Card)
  @Column(DataType.BIGINT)
  cardId: number
  
  @ForeignKey(() => User)
  @Column
  userId: number

  
  @BelongsTo(() => Card)
  card: Card

  @BelongsTo(() => User)
  user: User
  
}