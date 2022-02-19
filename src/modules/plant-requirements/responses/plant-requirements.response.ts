import { Field, ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../graphql/models/error.model';
import { PlantRequirements } from '../models/plant-requirements.model';

@ObjectType()
export class PlantRequirementsResponse {
  @Field(() => PlantRequirements, { nullable: true })
  plantRequirements?: PlantRequirements;

  @Field(() => [ErrorResponse], { nullable: true })
  errors?: ErrorResponse[];
}
