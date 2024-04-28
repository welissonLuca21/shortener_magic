import {
  Post,
  Body,
  Get,
  Param,
  Put,
  Patch,
  Delete,
  Controller,
} from '@nestjs/common';
import { CreateUserDto } from '@shared/database/dtos/create-user.dto';
import { UpdateUserDto } from '@shared/database/dtos/update-user.dto';
import { CreateUserService } from '../services/create-user.service';
import { DeleteUserService } from '../services/delete-user.service';
import { FindUserByIdService } from '../services/find-user-by-id.service';
import { RestoreUserService } from '../services/restore-user.service';
import { UpdateUserService } from '../services/update-user.service';
import { ListAllUsersService } from '../services/list-all-users.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly findUserById: FindUserByIdService,
    private readonly updateUser: UpdateUserService,
    private readonly deleteUser: DeleteUserService,
    private readonly restoreUser: RestoreUserService,
    private readonly listAllUsers: ListAllUsersService,
  ) {}

  @ApiOperation({ summary: 'Create a new user', operationId: 'createUser' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.createUser.execute(data);
  }

  @ApiParam({ name: 'id', required: true })
  @ApiOperation({
    summary: 'Get user by id',
    operationId: 'findUserById',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.findUserById.execute(id);
  }

  @ApiOperation({
    summary: 'List all users',
    operationId: 'listAllUsers',
  })
  @Get()
  async listAll() {
    return this.listAllUsers.execute();
  }

  @ApiParam({ name: 'id', required: true })
  @ApiOperation({
    summary: 'Delete user by id',
    operationId: 'deleteUser',
  })
  @Delete(':id/delete')
  async delete(@Param('id') id: string) {
    return this.deleteUser.execute(id);
  }

  @ApiParam({ name: 'id', required: true })
  @ApiOperation({
    summary: 'Restore user by id',
    operationId: 'restoreUser',
  })
  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    return this.restoreUser.execute(id);
  }

  @ApiParam({ name: 'id', required: true })
  @ApiOperation({
    summary: 'Update user by id',
    operationId: 'updateUser',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.updateUser.execute(id, data);
  }
}
