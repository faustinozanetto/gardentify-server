import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DiseaseCreateInput {
  @Field(() => String, { nullable: true })
  scientificName?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  image?: string;
}
