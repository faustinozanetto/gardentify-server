import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../graphql/models/error.model';
import { Plot } from '../models/plot.model';

@ObjectType()
export class PlotsEdge {
  @Field(() => Date, { nullable: true })
  cursor: Date | undefined;

  @Field(() => Plot, { nullable: true })
  node: Plot | undefined;
}

@ObjectType()
export class PlotsPageInfo {
  @Field(() => Date, { nullable: true })
  startCursor: Date | undefined;

  @Field(() => Date, { nullable: true })
  endCursor: Date | undefined;

  @Field(() => Boolean, { nullable: true })
  hasMore: boolean | undefined;
}

@ObjectType()
export class PlotsResponse {
  @Field(() => Int, { nullable: true })
  count: number | undefined;

  @Field(() => PlotsPageInfo, { nullable: true })
  pageInfo: PlotsPageInfo | undefined;

  @Field(() => [PlotsEdge], { nullable: true })
  edges: PlotsEdge[] | undefined;

  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[] | undefined;
}
