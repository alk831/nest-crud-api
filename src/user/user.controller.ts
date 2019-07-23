import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Delete,
  Param,
  Body,
  ForbiddenException,
} from '@nestjs/common';
import { Groups, UserData } from '../common/decorators';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { User } from '../models';
import { UserUpdateBody } from './dto';

@Controller('users')
@UseGuards(AuthenticatedGuard)
export class UserController {

  @Get()
  @Groups('admin', 'moderator')
  async getAll() {
    const data = await User.getUsersDetail();
    return { data };
  }

  @Patch('self')
  async updateSelf(
    @UserData() user: User,
    @Body() payload: any
  ) {
    const { id } = user;
    await User.update({ where: { id } }, payload);
  }
  
  @Patch(':id')
  @Groups('admin')
  async update(
    @Param('id') id: string,
    @Body() payload: UserUpdateBody
  ) {
    await User.update(payload, { where: { id }});
  }

  @Delete(':id')
  @Groups('admin')
  async delete(
    @Param('id') id: string,
    @UserData() user: User
  ) {
    if (user.id === Number(id)) {
      throw new ForbiddenException(
        'You cannot delete yourself'
      );
    }
    await User.destroy({ where: { id }});
  }

}
