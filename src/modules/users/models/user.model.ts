import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Plot } from 'modules/plots/models/plot.model';
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
  oauthId?: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => AuthProvider, { nullable: true })
  authProvider?: AuthProvider;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => [Plot], { nullable: true })
  plots?: Plot[];
}
