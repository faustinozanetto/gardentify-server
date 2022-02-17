import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeleteObjectResponse } from '../graphql/responses/deleteObject.response';
import { Disease } from './models/disease.model';

@Resolver(() => Disease)
export class DiseasesResolver {
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
  async deleteHarvest(@Args('input') input: FindHarvestInput): Promise<DeleteObjectResponse> {
    return await this.harvestsService.deleteHarvest(input);
  }
}
