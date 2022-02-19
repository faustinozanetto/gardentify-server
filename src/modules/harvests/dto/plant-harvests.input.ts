import { Field, InputType, Int } from '@nestjs/graphql';
import { FindUserPlantInput } from 'modules/user-plants/dto/find-user-plant.input';

@InputType()
export class PlantHarvestsInput {
  @Field(() => Int, { nullable: false })
  skip: number;

  @Field(() => Int, { nullable: false })
  take: number;

  @Field(() => FindUserPlantInput, { nullable: true, description: 'Input to select the plant' })
  where?: FindUserPlantInput;
}
