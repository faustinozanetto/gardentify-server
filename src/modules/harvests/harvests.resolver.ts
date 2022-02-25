import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeleteObjectResponse } from '../graphql/responses/deleteObject.response';
import { CreateHarvestInput } from './dto/create-harvest.input';
import { FindHarvestInput } from './dto/find-harvest.input';
import { PlantHarvestsInput } from './dto/plant-harvests.input';
import { UpdateHarvestInput } from './dto/update-harvest.input';
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

  @Query(() => HarvestsResponse)
  async userPlantHarvests(@Args('input') input: PlantHarvestsInput): Promise<HarvestsResponse> {
    return await this.harvestsService.userPlantHarvests(input);
  }

  @Mutation(() => HarvestResponse)
  async createUserPlantHarvest(@Args('input') input: CreateHarvestInput): Promise<HarvestResponse> {
    return await this.harvestsService.createUserPlantHarvest(input);
  }

  @Mutation(() => DeleteObjectResponse)
  async deleteUserPlantHarvest(
    @Args('input') input: FindHarvestInput,
  ): Promise<DeleteObjectResponse> {
    return await this.harvestsService.deleteUserPlantHarvest(input);
  }

  @Mutation(() => HarvestResponse)
  async updateHarvest(@Args('input') input: UpdateHarvestInput): Promise<HarvestResponse> {
    return await this.harvestsService.updateHarvest(input);
  }
}
