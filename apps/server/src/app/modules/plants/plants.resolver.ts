import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeleteObjectResponse } from '../graphql/responses/deleteObject.response';
import { CreatePlantInput } from './dto/createPlant.input';
import { FindPlantInput } from './dto/findPlant.input';
import { Plant } from './models/plant.model';
import { PlantsService } from './plants.service';
import { PlantResponse } from './responses/plant.response';

@Resolver(() => Plant)
export class PlantsResolver {
  constructor(private plantsService: PlantsService) {}

  @Query(() => PlantResponse)
  async plantByUuid(@Args('uuid') uuid: string): Promise<PlantResponse> {
    return await this.plantsService.plantByUuid(uuid);
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
