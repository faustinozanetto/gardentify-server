import { Field, InputType, Int } from '@nestjs/graphql';
import { FindUserPlantInput } from '../../user-plants/dto/find-user-plant.input';

@InputType()
export class PlotPlantsInput {
  @Field(() => Int, { nullable: false })
  skip: number;

  @Field(() => Int, { nullable: false })
  take: number;

  @Field(() => String, { nullable: false })
  plotUuid: string;

  @Field(() => FindUserPlantInput, { nullable: true })
  where?: FindUserPlantInput;
}
