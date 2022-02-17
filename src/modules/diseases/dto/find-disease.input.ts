import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindDiseaseInput {
  @Field(() => String, { nullable: true })
  uuid?: string;

  @Field(() => String, { nullable: true })
  scientificName?: string;
}
