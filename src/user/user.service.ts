import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async findById(id: string): Promise<User> {
        return await this.prismaService.user.findFirst({ where: { id } })
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return await this.prismaService.user.create({ data });
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        const user = await this.prismaService.user.findFirst({ where: { id } });
        if (!user) {
            throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
        }

        return await this.prismaService.user.update({
            data,
            where: { id }
        });
    }
}
