import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserPlant } from 'modules/user-plants/models/user-plant.model';
import { ErrorResponse } from '../../graphql/models/error.model';
import { Plot } from '../models/plot.model';

@ObjectType()
export class PlotUserPlantsEdge {
  @Field(() => Date, { nullable: true })
  cursor: Date | undefined;

  @Field(() => UserPlant, { nullable: true })
  node: UserPlant | undefined;
}

@ObjectType()
export class PlotUserPlantsPageInfo {
  @Field(() => Date, { nullable: true })
  startCursor: Date | undefined;

  @Field(() => Date, { nullable: true })
  endCursor: Date | undefined;

  @Field(() => Boolean, { nullable: true })
  hasMore: boolean | undefined;
}

@ObjectType()
export class PlotUserPlantsResponse {
  @Field(() => Int, { nullable: true })
  count: number | undefined;

  @Field(() => Plot, { nullable: true })
  plot: Plot | undefined;

  @Field(() => PlotUserPlantsPageInfo, { nullable: true })
  pageInfo: PlotUserPlantsPageInfo | undefined;

  @Field(() => [PlotUserPlantsEdge], { nullable: true })
  edges: PlotUserPlantsEdge[] | undefined;

  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[] | undefined;
}
