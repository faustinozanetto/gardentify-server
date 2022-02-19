import { Field, InputType, Int } from '@nestjs/graphql';
import { FindPlantInput } from './find-plant.input';

@InputType()
export class FindPlantsInput {
  @Field(() => Int, { nullable: false })
  skip: number;

  @Field(() => Int, { nullable: false })
  take: number;

  @Field(() => FindPlantInput, { nullable: true })
  where?: FindPlantInput;
}
