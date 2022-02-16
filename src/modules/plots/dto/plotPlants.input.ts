import { Field, InputType, Int } from '@nestjs/graphql';
import { FindPlantInput } from '../../plants/dto/findPlant.input';

@InputType()
export class PlotPlantsInput {
  @Field(() => Int, { nullable: false })
  skip: number;

  @Field(() => Int, { nullable: false })
  take: number;

  @Field(() => String, { nullable: false })
  plotUuid: string;

  @Field(() => FindPlantInput, { nullable: true })
  where?: FindPlantInput;
}
