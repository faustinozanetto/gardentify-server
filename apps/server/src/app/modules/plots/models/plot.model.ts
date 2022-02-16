import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../graphql/models/base.model';
import { Plant } from '../../plants/models/plant.model';
import { User } from '../../users/models/user.model';

@ObjectType({ isAbstract: true })
export class Plot extends BaseModel {
  @Field(() => Float, { nullable: true })
  sizeX?: number;

  @Field(() => String, { nullable: true })
  sizeY?: number;

  @Field(() => Float, { nullable: true })
  dirtDepth?: number;

  @Field(() => [Plant], { nullable: true })
  plants?: Plant[];

  @Field(() => User, { nullable: true })
  plotOwner?: User;
}
