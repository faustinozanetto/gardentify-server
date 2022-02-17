import { Module } from '@nestjs/common';
import { DiseasesResolver } from './diseases.resolver';
import { DiseasesService } from './diseases.service';

@Module({
  imports: [],
  providers: [DiseasesResolver, DiseasesService],
})
export class DiseasesModule {}
