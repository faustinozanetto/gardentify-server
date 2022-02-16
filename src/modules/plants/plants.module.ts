import { Module } from '@nestjs/common';
import { PlantsResolver } from './plants.resolver';
import { PlantsService } from './plants.service';

@Module({
  imports: [],
  providers: [PlantsResolver, PlantsService],
})
export class PlantsModule {}
