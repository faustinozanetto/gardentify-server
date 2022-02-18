import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../graphql/models/error.model';
import { Plant } from '../models/user-plant.model';

@ObjectType()
export class PlantsEdge {
  @Field(() => Date, { nullable: true })
  cursor: Date | undefined;

  @Field(() => Plant, { nullable: true })
  node: Plant | undefined;
}

@ObjectType()
export class PlantsPageInfo {
  @Field(() => Date, { nullable: true })
  startCursor: Date | undefined;

  @Field(() => Date, { nullable: true })
  endCursor: Date | undefined;

  @Field(() => Boolean, { nullable: true })
  hasMore: boolean | undefined;
}

@ObjectType()
export class PlantsResponse {
  @Field(() => Int, { nullable: true })
  count: number | undefined;

  @Field(() => PlantsPageInfo, { nullable: true })
  pageInfo: PlantsPageInfo | undefined;

  @Field(() => [PlantsEdge], { nullable: true })
  edges: PlantsEdge[] | undefined;

  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[] | undefined;
}
