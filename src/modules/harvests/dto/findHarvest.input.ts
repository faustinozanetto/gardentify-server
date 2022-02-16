import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindHarvestInput {
  @Field(() => String, { nullable: true })
  uuid?: string;
}
