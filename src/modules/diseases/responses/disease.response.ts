import { Field, ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../graphql/models/error.model';
import { Disease } from '../models/disease.model';

@ObjectType()
export class DiseaseResponse {
  @Field(() => Disease, { nullable: true })
  disease?: Disease;

  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[];
}
