import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindUserInput {
  @Field({ nullable: false })
  uuid: string | undefined;
}
