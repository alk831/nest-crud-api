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
  DataType
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { UserGroup } from '../auth/interfaces';
import { USER_GROUP } from 'src/common/consts';

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

  @Default('user')
  @Column(DataType.ENUM(...USER_GROUP))
  group: UserGroup


  @BeforeCreate
  static async hashPassword(user: User) {
    if (user.password && user.password.length) {
      const saltRounds = 2;
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
  }
}