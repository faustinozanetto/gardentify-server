import { Field, InputType, Int } from '@nestjs/graphql';
import { FindUserPlantInput } from './find-user-plant.input';

@InputType()
export class FindUserPlantsInput {
  @Field(() => Int, { nullable: false })
  skip: number;

  @Field(() => Int, { nullable: false })
  take: number;

  @Field(() => FindUserPlantInput, { nullable: true })
  where?: FindUserPlantInput;
}
