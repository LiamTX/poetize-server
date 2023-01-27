import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<User> {
        return await this.userService.findById(id);
    }

    @Post()
    async create(@Body() data: Prisma.UserCreateInput): Promise<User> {
        return await this.userService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput): Promise<User> {
        return await this.userService.update(id, data);
    }
}
