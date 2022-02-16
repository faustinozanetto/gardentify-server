import { Module } from '@nestjs/common';
import { PlotsResolver } from './plots.resolver';
import { PlotsService } from './plots.service';

@Module({
  imports: [],
  providers: [PlotsResolver, PlotsService],
})
export class PlotsModule {}
