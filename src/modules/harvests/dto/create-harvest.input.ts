import { Field, InputType, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateHarvestInput {
  @Field(() => String, { nullable: false })
  plantUuid: string;

  @Field(() => String, { nullable: false })
  image: string;

  @Field(() => Date, { nullable: false })
  harvestedOn: Date;

  @Field(() => Int, { nullable: false })
  amountHarvested: number;

  @Field(() => Float, { nullable: false })
  harvestWeight: number;
}
