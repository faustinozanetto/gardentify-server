import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../graphql/models/error.model';
import { Disease } from '../models/disease.model';

@ObjectType()
export class DiseasesEdge {
  @Field(() => Date, { nullable: true })
  cursor: Date | undefined;

  @Field(() => Disease, { nullable: true })
  node: Disease | undefined;
}

@ObjectType()
export class DiseasesPageInfo {
  @Field(() => Date, { nullable: true })
  startCursor: Date | undefined;

  @Field(() => Date, { nullable: true })
  endCursor: Date | undefined;

  @Field(() => Boolean, { nullable: true })
  hasMore: boolean | undefined;
}

@ObjectType()
export class DiseasesResponse {
  @Field(() => Int, { nullable: true })
  count: number | undefined;

  @Field(() => DiseasesPageInfo, { nullable: true })
  pageInfo: DiseasesPageInfo | undefined;

  @Field(() => [DiseasesEdge], { nullable: true })
  edges: DiseasesEdge[] | undefined;

  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[] | undefined;
}
