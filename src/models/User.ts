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
  Scopes
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { UserGroup } from '../common/types';
import { replaceAt } from '../common/utils';

@Scopes({
  baseAttrs: () => ({
    attributes: ['id', 'email', 'group']
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

  get hiddenEmail(): string {
    const email = this.getDataValue('email');
    const removeCharCount = 1;
    const [firstPart, secondPart] = email.split('@');
    
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
}


type GetAllWithHiddenAttrsResult = {
  id: User['id']
  email: User['email']
  group: User['group']
}[]