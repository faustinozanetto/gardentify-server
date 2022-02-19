import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeleteObjectResponse } from '../graphql/responses/deleteObject.response';
import { CreateUserPlantInput } from './dto/create-user-plant.input';
import { FindUserPlantsInput } from './dto/find-user-plants.input';
import { FindUserPlantInput } from './dto/find-user-plant.input';
import { UserPlant } from './models/user-plant.model';
import { UserPlantsService } from './user-plants.service';
import { UserPlantResponse } from './responses/user-plant.response';
import { UserPlantsResponse } from './responses/user-plants.response';

@Resolver(() => UserPlant)
export class UserPlantsResolver {
  constructor(private userPlantsService: UserPlantsService) {}

  @Query(() => UserPlantResponse)
  async findUserPlant(@Args('input') input: FindUserPlantInput): Promise<UserPlantResponse> {
    return await this.userPlantsService.findUserPlant(input);
  }

  @Mutation(() => UserPlantResponse)
  async createUserPlant(@Args('input') input: CreateUserPlantInput): Promise<UserPlantResponse> {
    return await this.userPlantsService.createUserPlant(input);
  }

  @Mutation(() => DeleteObjectResponse)
  async deleteUserPlant(@Args('input') input: FindUserPlantInput): Promise<DeleteObjectResponse> {
    return await this.userPlantsService.deleteUserPlant(input);
  }

  @Query(() => UserPlantsResponse)
  async findUserPlants(@Args('input') input: FindUserPlantsInput): Promise<UserPlantsResponse> {
    return await this.userPlantsService.findUserPlants(input);
  }
}
