import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../graphql/models/base.model';
import { Plant } from '../../user-plants/models/user-plant.model';

@ObjectType()
export class Harvest extends BaseModel {
  @Field(() => Plant, { nullable: true })
  plant?: Plant;

  @Field(() => Int, { nullable: true })
  amountHarvested?: number;

  @Field(() => Float, { nullable: true })
  harvestWeight?: number;

  @Field(() => Date, { nullable: true })
  harvestedOn?: Date;
}
