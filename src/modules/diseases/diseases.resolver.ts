import { Args, Query, Resolver } from '@nestjs/graphql';
import { DiseasesService } from './diseases.service';
import { DiseasesInput } from './dto/diseases.input';
import { Disease } from './models/disease.model';
import { DiseasesResponse } from './responses/diseases.response';

@Resolver(() => Disease)
export class DiseasesResolver {
  constructor(private diseasesService: DiseasesService) {}

  @Query(() => DiseasesResponse)
  async findDiseases(@Args('input') input: DiseasesInput): Promise<DiseasesResponse> {
    return await this.diseasesService.findDiseases(input);
  }
}
