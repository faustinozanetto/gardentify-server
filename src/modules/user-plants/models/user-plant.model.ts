import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Disease } from 'modules/diseases/models/disease.model';
import { Harvest } from 'modules/harvests/models/harvest.model';
import { Plot } from 'modules/plots/models/plot.model';
import { User } from 'modules/users/models/user.model';
import { BaseModel } from '../../graphql/models/base.model';

export enum PlantType {
  NONE = 'NONE',
  TOMATO = 'TOMATO',
  POTATO = 'POTATO',
  CARROT = 'CARROT',
  ONION = 'ONION',
  CUCUMBER = 'CUCUMBER',
  PEPPER = 'PEPPER',
  PEA = 'PEA',
  BROCCOLI = 'BROCCOLI',
  CABBAGE = 'CABBAGE',
  CORN = 'CORN',
  BEAN = 'BEAN',
  BEET = 'BEET',
  CELERY = 'CELERY',
  EGGPLANT = 'EGGPLANT',
  GARLIC = 'GARLIC',
  GINGER = 'GINGER',
  GREEN_BEAN = 'GREEN_BEAN',
  KALE = 'KALE',
  LETTUCE = 'LETTUCE',
  MUSTARD = 'MUSTARD',
}

// Register plant type from prisma.
registerEnumType(PlantType, {
  name: 'PlantType',
  description: 'Used for declaring the type of plant.',
});

@ObjectType({ isAbstract: true })
export class UserPlant extends BaseModel {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  scientificName?: string;

  @Field(() => String, { nullable: true })
  variety?: string;

  @Field(() => PlantType, { nullable: true })
  type?: PlantType;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Date, { nullable: true })
  plantedSeedsOn?: Date;

  @Field(() => Date, { nullable: true })
  seedsSproutedOn?: Date;

  @Field(() => Plot, { nullable: true })
  plot?: Plot;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [Harvest], { nullable: true })
  harvests?: Harvest[];

  @Field(() => [Disease], { nullable: true })
  diseases?: Disease[];
}
