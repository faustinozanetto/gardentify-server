import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeleteObjectResponse } from 'modules/graphql/responses/deleteObject.response';
import { CreatePlantInput } from './dto/create-plant.input';
import { FindPlantInput } from './dto/find-plant.input';
import { FindPlantsInput } from './dto/find-plants.input';
import { Plant } from './models/plant.model';
import { PlantsService } from './plants.service';
import { PlantResponse } from './responses/plant.response';
import { PlantsResponse } from './responses/plants.response';

@Resolver(() => Plant)
export class PlantsResolver {
  constructor(private plantsService: PlantsService) {}

  @Query(() => PlantResponse)
  async findPlant(@Args('input') input: FindPlantInput): Promise<PlantResponse> {
    return await this.plantsService.findPlant(input);
  }

  @Query(() => PlantsResponse)
  async findPlants(@Args('input') input: FindPlantsInput): Promise<PlantsResponse> {
    return await this.plantsService.findPlants(input);
  }

  @Mutation(() => PlantResponse)
  async createPlant(@Args('input') input: CreatePlantInput): Promise<PlantResponse> {
    return await this.plantsService.createPlant(input);
  }

  @Mutation(() => DeleteObjectResponse)
  async deletePlant(@Args('input') input: FindPlantInput): Promise<DeleteObjectResponse> {
    return await this.plantsService.deletePlant(input);
  }
}
