import {
  Model,
  Table,
  Unique,
  AllowNull,
  Column,
  IsEmail,
  BeforeCreate,
  Min,
  Default,
  DataType,
  Scopes,
  Max
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { UserGroup } from '../common/types';
import { replaceAt } from '../common/utils';
import { FavoriteCard } from './FavoriteCard';
import { Op } from 'sequelize';

@Scopes({
  baseAttrs: () => ({
    attributes: ['id', 'email', 'group', 'points']
  }),
  withDates: () => ({
    attributes: ['createdAt', 'updatedAt']
  })
})
@Table({
  tableName: 'users',
  timestamps: true
})
export class User extends Model<User> {

  id: number

  @Unique
  @AllowNull(false)
  @IsEmail
  @Column
  email: string

  @AllowNull(false)
  @Min(4)
  @Column
  password: string

  @AllowNull(false)
  @Default('user')
  @Column(DataType.ENUM('user', 'moderator', 'admin'))
  group: UserGroup

  @AllowNull(false)
  @Default(0)
  @Max(999)
  @Column(DataType.SMALLINT.UNSIGNED)
  points: number

  get hiddenEmail(): string {
    const email = this.getDataValue('email');
    const removeCharCount = 1;
    
    if (!email.length) {
      return '';
    }

    const [firstPart, secondPart] = email.split('@');

    if (firstPart.length <= 2) {
      return '**' + '@' + secondPart;
    }
    
    const replacement = Array
      .from(
        { length: firstPart.length - removeCharCount },
        () => '*'
      )
      .join('');
    const replaced = replaceAt(firstPart, removeCharCount, replacement);
    const hiddenEmail = replaced + '@' + secondPart;

    return hiddenEmail;
  }

  @BeforeCreate
  static async hashPassword(user: User) {
    if (user.password && user.password.length) {
      const saltRounds = 2;
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
  }

  static async getAllWithHiddenAttrs(): Promise<GetAllWithHiddenAttrsResult> {
    const users = await User.scope('baseAttrs', 'withDates').findAll();
    const parsed = users.map(user => ({
      ...user.toJSON(),
      email: user.hiddenEmail
    }));
    return parsed;
  }

  static async getUsersDetail(): Promise<GetUsersDetailResult> {
    const users = await User
      .scope('baseAttrs', 'withDates')
      .findAll({
        where: { [Op.not]: { group: 'admin' }},
        order: [['id', 'DESC']],
        limit: 20
      } as any);

    const likedCardsCount = await Promise.all(
      users.map(user => 
        FavoriteCard.count({ where: { userId: user.id }})
      )
    );

    const parsedUsers = users.map((user, index) => ({
      ...user.toJSON(),
      email: user.hiddenEmail,
      cardsCount: likedCardsCount[index]
    }));

    return parsedUsers as any;
  }
}


type GetAllWithHiddenAttrsResult = {
  id: User['id']
  email: User['email']
  group: User['group']
}[]

type GetUsersDetailResult = {
  id: User['id']
  email: User['email']
  group: User['group']
  cardsCount: number
  updatedAt: User['updatedAt']
  createdAt: User['createdAt']
}