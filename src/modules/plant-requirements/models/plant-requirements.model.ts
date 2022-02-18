import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'modules/graphql/models/base.model';

@ObjectType({ isAbstract: true })
export class PlantRequirements extends BaseModel {
  @Field(() => String, { nullable: true })
  soil?: string;

  @Field(() => String, { nullable: true })
  light?: string;

  @Field(() => String, { nullable: true })
  temperature?: string;

  @Field(() => String, { nullable: true })
  water?: string;
}
