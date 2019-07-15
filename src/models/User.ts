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
  @Column(DataType.ENUM('user', 'moderator', 'admin'))
  group: UserGroup


  @BeforeCreate
  static async hashPassword(user: User) {
    const saltRounds = 2;
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
}