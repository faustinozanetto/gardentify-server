import { Field, InputType, Int } from '@nestjs/graphql';
import { FindPlantInput } from '../../user-plants/dto/find-plant.input';

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
