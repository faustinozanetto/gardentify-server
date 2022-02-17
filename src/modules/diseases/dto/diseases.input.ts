import { Field, InputType, Int } from '@nestjs/graphql';
import { FindDiseaseInput } from './find-disease.input';

@InputType()
export class DiseasesInput {
  @Field(() => Int, { nullable: false })
  skip: number;

  @Field(() => Int, { nullable: false })
  take: number;

  @Field(() => FindDiseaseInput, { nullable: true })
  where?: FindDiseaseInput;
}
