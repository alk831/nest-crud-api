import { Controller, Get, UseGuards, Patch, Delete, Param, Body } from '@nestjs/common';
import { Groups, UserData } from '../common/decorators';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { User } from '../models';

@Controller('user')
@UseGuards(AuthenticatedGuard)
export class UserController {

  @Get()
  @Groups('admin', 'moderator')
  async getAll() {
    return await User.findAll();
  }

  @Patch()
  async updateSelf(
    @UserData() user: User,
    @Body() payload: any
  ) {
    const { id } = user;
    await User.update({ where: { id } }, payload);
  }
  
  @Patch(':id')
  @Groups('admin', 'moderator')
  async update(
    @Param() id: string,
    @Body() payload: any
  ) {
    await User.update({ where: { id }}, payload);
  }

  @Delete(':id')
  @Groups('admin')
  async delete(
    @Param() id: string
  ) {
    return await User.destroy({ where: { id }});
  }

}
