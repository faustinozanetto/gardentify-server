import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../graphql/models/base.model';

@ObjectType({ isAbstract: true })
export class User extends BaseModel {
  @Field(() => String, { nullable: true })
  uuid: string | undefined;

  @Field(() => String, { nullable: true })
  username: string | undefined;
}
