import { Field, InputType } from '@nestjs/graphql';
import { PlantType } from '../models/plant.model';

@InputType()
export class CreatePlantInput {
  @Field(() => String, { nullable: false })
  plotUuid: string;

  @Field(() => String, { nullable: false })
  scientificName: string;

  @Field(() => String, { nullable: false })
  variety: string;

  @Field(() => PlantType, { nullable: false })
  type: PlantType;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Date, { nullable: true })
  plantedSeedsOn?: Date;

  @Field(() => Date, { nullable: true })
  seedsSproutedOn?: Date;
}
