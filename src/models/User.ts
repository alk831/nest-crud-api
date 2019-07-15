import {
  Model, Table, Unique, AllowNull, Column, IsEmail, BeforeCreate, Min
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';


@Table({
  tableName: 'users'
})
export class User extends Model<User> {

  @Unique
  @AllowNull(false)
  @Column
  @IsEmail
  email: string

  @AllowNull(false)
  @Min(4)
  @Column
  password: string


  @BeforeCreate
  static async hashPassword(user: User) {
    const saltRounds = 2;
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
}