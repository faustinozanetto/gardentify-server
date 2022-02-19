import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Disease } from 'modules/diseases/models/disease.model';
import { PlantRequirements } from 'modules/plant-requirements/models/plant-requirements.model';
import { PlantType } from 'modules/user-plants/models/user-plant.model';
import { BaseModel } from '../../graphql/models/base.model';

// Register plant type from prisma.
registerEnumType(PlantType, {
  name: 'PlantType',
  description: 'Used for declaring the type of plant.',
});

@ObjectType({ isAbstract: true })
export class Plant extends BaseModel {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  scientificName?: string;

  @Field(() => String, { nullable: true })
  variety?: string;

  @Field(() => PlantType, { nullable: true })
  type?: PlantType;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => [Disease], { nullable: true })
  diseases?: Disease[];

  @Field(() => PlantRequirements, { nullable: true })
  requirements?: PlantRequirements;
}
