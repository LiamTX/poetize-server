import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  imports: []
})
export class UserModule {}