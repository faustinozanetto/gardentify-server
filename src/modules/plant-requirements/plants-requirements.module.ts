import { Module } from '@nestjs/common';
import { PlantsRequirementsResolver } from './plants-requirements.resolver';
import { PlantsRequirementsService } from './plants-requirements.service';

@Module({
  imports: [],
  providers: [PlantsRequirementsResolver, PlantsRequirementsService],
})
export class PlantsRequirementsModule {}
