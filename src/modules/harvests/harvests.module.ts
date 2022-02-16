import { Module } from '@nestjs/common';
import { HarvestsResolver } from './harvests.resolver';
import { HarvestsService } from './harvests.service';

@Module({
  imports: [],
  providers: [HarvestsResolver, HarvestsService],
})
export class HarvestsModule {}
