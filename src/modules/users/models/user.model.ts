import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from '../../graphql/models/base.model';

export enum AuthProvider {
  DEFAULT = 'DEFAULT',
  DISCORD = 'DISCORD',
  GITHUB = 'GITHUB',
}

registerEnumType(AuthProvider, {
  name: 'AuthProvider',
  description: 'User auth provider service',
});

@ObjectType({ isAbstract: true })
export class User extends BaseModel {
  @Field(() => String, { nullable: true })
  uuid: string;

  @Field(() => String, { nullable: true })
  oauthId?: string;

  @Field(() => String, { nullable: true })
  username: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => AuthProvider, { nullable: true })
  authProvider?: AuthProvider;
}
