import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DeleteObjectResponse } from 'modules/graphql/responses/deleteObject.response';
import { FindPlantRequirementsInput } from './dto/find-plant-requirements.input';
import { PlantRequirementsCreateInput } from './dto/plant-requirements-create.input';
import { PlantRequirements } from './models/plant-requirements.model';
import { PlantsRequirementsService } from './plants-requirements.service';
import { PlantRequirementsResponse } from './responses/plant-requirements.response';

@Resolver(() => PlantRequirements)
export class PlantsRequirementsResolver {
  constructor(private plantRequirementsService: PlantsRequirementsService) {}

  @Mutation(() => PlantRequirementsResponse)
  async createPlantRequirements(
    @Args('input') input: PlantRequirementsCreateInput,
  ): Promise<PlantRequirementsResponse> {
    return await this.plantRequirementsService.createPlantRequirements(input);
  }

  @Mutation(() => DeleteObjectResponse)
  async deletePlantRequirements(
    @Args('input') input: FindPlantRequirementsInput,
  ): Promise<DeleteObjectResponse> {
    return await this.plantRequirementsService.deletePlantRequirements(input);
  }
}
