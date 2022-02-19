import { Field, InputType } from '@nestjs/graphql';
import { PlantType } from 'modules/user-plants/models/user-plant.model';

@InputType()
export class FindPlantInput {
  @Field(() => String, { nullable: true })
  uuid?: string;

  @Field(() => String, { nullable: true })
  scientificName?: string;

  @Field(() => String, { nullable: true })
  variety?: string;

  @Field(() => PlantType, { nullable: true })
  type?: PlantType;

  @Field(() => String, { nullable: true })
  image?: string;
}
