import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindPlantRequirementsInput {
  @Field(() => String, { nullable: false })
  uuid: string;
}
