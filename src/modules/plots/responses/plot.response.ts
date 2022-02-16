import { Field, ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../graphql/models/error.model';
import { Plot } from '../models/plot.model';

@ObjectType()
export class PlotResponse {
  @Field(() => Plot, { nullable: true })
  plot?: Plot;

  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[];
}
