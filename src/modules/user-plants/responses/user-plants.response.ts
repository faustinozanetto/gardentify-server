import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../graphql/models/error.model';
import { UserPlant } from '../models/user-plant.model';

@ObjectType()
export class UserPlantsEdge {
  @Field(() => Date, { nullable: true })
  cursor: Date | undefined;

  @Field(() => UserPlant, { nullable: true })
  node: UserPlant | undefined;
}

@ObjectType()
export class UserPlantsPageInfo {
  @Field(() => Date, { nullable: true })
  startCursor: Date | undefined;

  @Field(() => Date, { nullable: true })
  endCursor: Date | undefined;

  @Field(() => Boolean, { nullable: true })
  hasMore: boolean | undefined;
}

@ObjectType()
export class UserPlantsResponse {
  @Field(() => Int, { nullable: true })
  count: number | undefined;

  @Field(() => UserPlantsPageInfo, { nullable: true })
  pageInfo: UserPlantsPageInfo | undefined;

  @Field(() => [UserPlantsEdge], { nullable: true })
  edges: UserPlantsEdge[] | undefined;

  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[] | undefined;
}
