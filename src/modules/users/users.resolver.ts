import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { GardentifyContext } from '../../utils/types';
import { GraphQLAuthGuard } from '../auth/auth-guards';
import { FindUserInput } from './dto/findUser.input';
import { User } from './models/user.model';
import { UserResponse } from './responses/user.response';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {}

  @UseGuards(GraphQLAuthGuard)
  @Query(() => UserResponse)
  async me(@Context() context: GardentifyContext): Promise<UserResponse> {
    return await this.usersService.me(context);
  }

  @Query(() => UserResponse)
  async user(@Args('input') input: FindUserInput): Promise<UserResponse> {
    return await this.usersService.user(input);
  }
}
