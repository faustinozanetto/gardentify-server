import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'modules/graphql/models/base.model';
import { Plant } from 'modules/plants/models/plant.model';

@ObjectType()
export class Disease extends BaseModel {
  @Field(() => String, { nullable: true })
  scientificName?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Plant, { nullable: true })
  plant?: Plant;
}
