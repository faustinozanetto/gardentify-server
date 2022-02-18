import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PlantRequirementsCreateInput {
  @Field(() => String, { nullable: false })
  soil: string;

  @Field(() => String, { nullable: false })
  light: string;

  @Field(() => String, { nullable: false })
  temperature: string;

  @Field(() => String, { nullable: false })
  water: string;
}
