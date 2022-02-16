import { Field, InputType, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateHarvestInput {
  @Field(() => String, { nullable: false })
  plantUuid: string;

  @Field(() => Int, { nullable: false })
  amountHarvested: number;

  @Field(() => Float, { nullable: false })
  harvestWeight: number;
}
