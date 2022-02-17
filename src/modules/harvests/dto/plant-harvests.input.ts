import { Field, InputType, Int } from '@nestjs/graphql';
import { FindPlantInput } from 'modules/plants/dto/findPlant.input';

@InputType()
export class PlantHarvestsInput {
  @Field(() => Int, { nullable: false })
  skip: number;

  @Field(() => Int, { nullable: false })
  take: number;

  @Field(() => FindPlantInput, { nullable: true, description: 'Input to select the plant' })
  where?: FindPlantInput;
}
