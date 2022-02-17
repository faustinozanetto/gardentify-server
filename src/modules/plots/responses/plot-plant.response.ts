import { Field, ObjectType } from '@nestjs/graphql';
import { Plant } from 'modules/plants/models/plant.model';
import { ErrorResponse } from '../../graphql/models/error.model';
import { Plot } from '../models/plot.model';

@ObjectType()
export class PlotPlantResponse {
  @Field(() => Plot, { nullable: true })
  plot?: Plot;

  @Field(() => Plant, { nullable: true })
  plant?: Plant;

  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[];
}
