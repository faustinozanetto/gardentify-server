import { Field, InputType } from '@nestjs/graphql';
import { PlantRequirementsCreateInput } from 'modules/plant-requirements/dto/plant-requirements-create.input';
import { PlantType } from '../models/user-plant.model';

@InputType()
export class CreatePlantInput {
  @Field(() => PlantRequirementsCreateInput, { nullable: false })
  requirements: PlantRequirementsCreateInput;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  scientificName: string;

  @Field(() => String, { nullable: false })
  variety: string;

  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => PlantType, { nullable: false })
  type: PlantType;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Date, { nullable: true })
  plantedSeedsOn?: Date;

  @Field(() => Date, { nullable: true })
  seedsSproutedOn?: Date;
}
