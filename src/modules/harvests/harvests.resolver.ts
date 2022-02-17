import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeleteObjectResponse } from '../graphql/responses/deleteObject.response';
import { CreateHarvestInput } from './dto/createHarvest.input';
import { FindHarvestInput } from './dto/findHarvest.input';
import { PlantHarvestsInput } from './dto/plant-harvests.input';
import { HarvestsService } from './harvests.service';
import { Harvest } from './models/harvest.model';
import { HarvestResponse } from './responses/harvest.response';
import { HarvestsResponse } from './responses/harvests.response';

@Resolver(() => Harvest)
export class HarvestsResolver {
  constructor(private harvestsService: HarvestsService) {}

  @Query(() => HarvestResponse)
  async findHarvest(@Args('input') input: FindHarvestInput): Promise<HarvestResponse> {
    return await this.harvestsService.findHarvest(input);
  }

  @Mutation(() => HarvestResponse)
  async createPlantHarvest(@Args('input') input: CreateHarvestInput): Promise<HarvestResponse> {
    return await this.harvestsService.createPlantHarvest(input);
  }

  @Mutation(() => DeleteObjectResponse)
  async deletePlantHarvest(@Args('input') input: FindHarvestInput): Promise<DeleteObjectResponse> {
    return await this.harvestsService.deletePlantHarvest(input);
  }

  @Query(() => HarvestsResponse)
  async plantHarvests(@Args('input') input: PlantHarvestsInput): Promise<HarvestsResponse> {
    return await this.harvestsService.plantHarvests(input);
  }
}
