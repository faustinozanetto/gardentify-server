import { Field, ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../graphql/models/error.model';
import { Harvest } from '../models/harvest.model';

@ObjectType()
export class HarvestResponse {
  @Field(() => Harvest, { nullable: true })
  harvest?: Harvest;

  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[];
}
