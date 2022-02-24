import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'modules/graphql/models/base.model';
import { UserPlant } from 'modules/user-plants/models/user-plant.model';

@ObjectType()
export class Disease extends BaseModel {
  @Field(() => String, { nullable: true })
  scientificName?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => UserPlant, { nullable: true })
  plant?: UserPlant;

  @Field(() => Date, { nullable: true })
  appearedOn?: Date;
}
