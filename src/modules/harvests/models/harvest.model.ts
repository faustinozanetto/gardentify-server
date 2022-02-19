import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../graphql/models/base.model';
import { UserPlant } from '../../user-plants/models/user-plant.model';

@ObjectType()
export class Harvest extends BaseModel {
  @Field(() => UserPlant, { nullable: true })
  plant?: UserPlant;

  @Field(() => Int, { nullable: true })
  amountHarvested?: number;

  @Field(() => Float, { nullable: true })
  harvestWeight?: number;

  @Field(() => Date, { nullable: true })
  harvestedOn?: Date;
}
