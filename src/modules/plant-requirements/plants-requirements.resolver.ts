import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PlantRequirements } from './models/plant-requirements.model';
import { PlantsRequirementsService } from './plants-requirements.service';

@Resolver(() => PlantRequirements)
export class PlantsRequirementsResolver {
  constructor(private plantRequirementsService: PlantsRequirementsService) {}
}
