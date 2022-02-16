import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserInput } from './dto/createUser.input';
import { FindUserInput } from './dto/findUser.input';
import { User } from './models/user.model';
import { UserResponse } from './responses/user.response';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(input: FindUserInput): Promise<UserResponse> {
    // Search for user.
    const foundUser = await this.prisma.user.findUnique({
      where: {
        uuid: input.uuid,
      },
    });
    // User was not found.
    if (!foundUser) {
      return {
        errors: [{ field: 'uuid', message: 'User not found' }],
      };
    }
    // Return found user.
    const parsedUser: User = {
      ...foundUser,
    };
    return {
      user: parsedUser,
    };
  }

  async createUser(input: CreateUserInput): Promise<UserResponse> {
    const createdUser = await this.prisma.user.create({
      data: {
        ...input,
      },
    });

    // Failed to create user.
    if (!createdUser) {
      return {
        errors: [
          {
            field: 'input',
            message: 'Failed to create user',
          },
        ],
      };
    }

    // Return created user.
    return {
      user: createdUser,
    };
  }
}
