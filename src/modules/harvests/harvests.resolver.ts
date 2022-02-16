import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeleteObjectResponse } from '../graphql/responses/deleteObject.response';
import { CreateHarvestInput } from './dto/createHarvest.input';
import { FindHarvestInput } from './dto/findHarvest.input';
import { HarvestsService } from './harvests.service';
import { Harvest } from './models/harvest.model';
import { HarvestResponse } from './responses/harvest.response';

@Resolver(() => Harvest)
export class HarvestsResolver {
  constructor(private harvestsService: HarvestsService) {}

  @Query(() => HarvestResponse)
  async harvest(@Args('input') input: FindHarvestInput): Promise<HarvestResponse> {
    return await this.harvestsService.harvest(input);
  }

  @Mutation(() => HarvestResponse)
  async createPlantHarvest(@Args('input') input: CreateHarvestInput): Promise<HarvestResponse> {
    return await this.harvestsService.createPlantHarvest(input);
  }

  @Mutation(() => DeleteObjectResponse)
  async deleteHarvest(@Args('input') input: FindHarvestInput): Promise<DeleteObjectResponse> {
    return await this.harvestsService.deleteHarvest(input);
  }
}
