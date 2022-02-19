import { Field, ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../graphql/models/error.model';
import { UserPlant } from '../models/user-plant.model';

@ObjectType()
export class UserPlantResponse {
  @Field(() => UserPlant, { nullable: true })
  plant?: UserPlant;

  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[];
}
