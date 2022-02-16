import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { UserEntity } from '../auth/decorators/user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CreateUserInput } from './dto/createUser.input';
import { FindUserInput } from './dto/findUser.input';
import { User } from './models/user.model';
import { UserResponse } from './responses/user.response';
import { UsersService } from './users.service';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {}

  @Query(() => UserResponse)
  async user(@Args('input') input: FindUserInput): Promise<UserResponse> {
    return await this.usersService.user(input);
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Args('input') input: CreateUserInput
  ): Promise<UserResponse> {
    return await this.usersService.createUser(input);
  }

  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }
}
