import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../graphql/models/error.model';
import { Harvest } from '../models/harvest.model';

@ObjectType()
export class HarvestsEdge {
  @Field(() => Date, { nullable: true })
  cursor: Date | undefined;

  @Field(() => Harvest, { nullable: true })
  node: Harvest | undefined;
}

@ObjectType()
export class HarvestsPageInfo {
  @Field(() => Date, { nullable: true })
  startCursor: Date | undefined;

  @Field(() => Date, { nullable: true })
  endCursor: Date | undefined;

  @Field(() => Boolean, { nullable: true })
  hasMore: boolean | undefined;
}

@ObjectType()
export class HarvestsResponse {
  @Field(() => Int, { nullable: true })
  count: number | undefined;

  @Field(() => HarvestsPageInfo, { nullable: true })
  pageInfo: HarvestsPageInfo | undefined;

  @Field(() => [HarvestsEdge], { nullable: true })
  edges: HarvestsEdge[] | undefined;

  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[] | undefined;
}
