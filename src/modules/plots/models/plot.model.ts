import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../graphql/models/base.model';
import { UserPlant } from '../../user-plants/models/user-plant.model';
import { User } from '../../users/models/user.model';

@ObjectType({ isAbstract: true })
export class Plot extends BaseModel {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Float, { nullable: true })
  sizeX?: number;

  @Field(() => String, { nullable: true })
  sizeY?: number;

  @Field(() => Float, { nullable: true })
  dirtDepth?: number;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => [UserPlant], { nullable: true })
  plants?: UserPlant[];

  @Field(() => User, { nullable: true })
  user?: User;
}
