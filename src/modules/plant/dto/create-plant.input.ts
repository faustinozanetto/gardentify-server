import { Field, InputType } from '@nestjs/graphql';
import { PlantType } from 'modules/user-plants/models/user-plant.model';

@InputType()
export class CreateUserPlantInput {
  @Field(() => String, { nullable: false })
  name: string;

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
