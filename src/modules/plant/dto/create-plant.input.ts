import { Field, InputType } from '@nestjs/graphql';
import { PlantType } from 'modules/user-plants/models/user-plant.model';

@InputType()
export class CreatePlantInput {
  @Field(() => String, { nullable: false })
  requirementsUuid: string;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  scientificName: string;

  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => String, { nullable: false })
  variety: string;

  @Field(() => PlantType, { nullable: false })
  type: PlantType;

  @Field(() => String, { nullable: true })
  image?: string;
}
