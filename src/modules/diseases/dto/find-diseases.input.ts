import { Field, InputType, Int } from '@nestjs/graphql';
import { FindDiseaseInput } from './find-disease.input';

@InputType()
export class FindDiseasesInput {
  @Field(() => Int, { nullable: false })
  skip: number;

  @Field(() => Int, { nullable: false })
  take: number;

  @Field(() => FindDiseaseInput, { nullable: true })
  where?: FindDiseaseInput;
}
