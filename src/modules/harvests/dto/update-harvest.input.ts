import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateHarvestInput {
  @Field(() => String, { nullable: false })
  uuid: string;

  @Field(() => String, { nullable: false })
  image: string;

  @Field(() => Date, { nullable: false })
  harvestedOn: Date;

  @Field(() => Int, { nullable: false })
  amountHarvested: number;

  @Field(() => Float, { nullable: false })
  harvestWeight: number;
}
