import { Field, ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../graphql/models/error.model';
import { Plant } from '../models/plant.model';

@ObjectType()
export class PlantResponse {
  @Field(() => Plant, { nullable: true })
  plant?: Plant;

  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[];
}
