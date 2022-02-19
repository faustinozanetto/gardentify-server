import { Module } from '@nestjs/common';
import { UserPlantsResolver } from './user-plants.resolver';
import { UserPlantsService } from './user-plants.service';

@Module({
  imports: [],
  providers: [UserPlantsResolver, UserPlantsService],
})
export class UserPlantsModule {}
