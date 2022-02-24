import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddDiseaseToUserPlantInput {
  @Field(() => Date, { nullable: false })
  appearedOn: Date;
}
