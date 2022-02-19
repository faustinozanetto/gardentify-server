import { Field, InputType, Int } from '@nestjs/graphql';
import { FindUserInput } from '../../users/dto/findUser.input';

@InputType()
export class UserPlotsInput {
  @Field(() => Int, { nullable: false })
  skip: number;

  @Field(() => Int, { nullable: false })
  take: number;

  @Field(() => FindUserInput, { nullable: true })
  where?: FindUserInput;
}
