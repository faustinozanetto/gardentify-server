import { Field, InputType, Int } from '@nestjs/graphql';
import { FindPlantInput } from './findPlant.input';

@InputType()
export class FindPlantsInput {
  @Field(() => Int, { nullable: false })
  skip: number;

  @Field(() => Int, { nullable: false })
  take: number;

  @Field(() => FindPlantInput, { nullable: true })
  where?: FindPlantInput;
}
