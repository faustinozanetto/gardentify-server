import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GardentifyContext } from '../../utils/types';
import { parseUserAuthProvider } from '../../utils/userUtilts';
import { FindUserInput } from './dto/findUser.input';
import { User } from './models/user.model';
import { UserResponse } from './responses/user.response';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async me(context: GardentifyContext): Promise<UserResponse> {
    if (!context.req) {
      return {
        errors: [
          {
            field: 'user',
            message: 'An error ocurred',
          },
        ],
      };
    }
    const user = await this.prisma.user.findUnique({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      where: { uuid: context.req.session.passport.user.id },
    });

    const parsedUser: User = {
      ...user,
      authProvider: parseUserAuthProvider(user.authProvider),
    };
    return { user: parsedUser };
  }

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
      authProvider: parseUserAuthProvider(foundUser.authProvider),
    };
    return {
      user: parsedUser,
    };
  }
}
