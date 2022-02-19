import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeleteObjectResponse } from 'modules/graphql/responses/deleteObject.response';
import { FindUserPlantInput } from 'modules/user-plants/dto/find-user-plant.input';
import { DiseasesService } from './diseases.service';
import { DiseaseCreateInput } from './dto/disease-create.input';
import { DiseasesInput } from './dto/diseases.input';
import { FindDiseaseInput } from './dto/find-disease.input';
import { PlantDiseasesInput } from './dto/plant-diseases.input';
import { Disease } from './models/disease.model';
import { DiseaseResponse } from './responses/disease.response';
import { DiseasesResponse } from './responses/diseases.response';

@Resolver(() => Disease)
export class DiseasesResolver {
  constructor(private diseasesService: DiseasesService) {}

  @Mutation(() => DiseaseResponse)
  async createDisease(@Args('input') input: DiseaseCreateInput): Promise<DiseaseResponse> {
    return await this.diseasesService.createDisease(input);
  }

  @Mutation(() => DiseaseResponse)
  async deleteDisease(@Args('input') input: FindDiseaseInput): Promise<DeleteObjectResponse> {
    return await this.diseasesService.deleteDisease(input);
  }

  @Mutation(() => DiseaseResponse)
  async addDiseaseToUserPlant(
    @Args('disease') disease: FindDiseaseInput,
    @Args('plant') plant: FindUserPlantInput,
  ): Promise<DiseaseResponse> {
    return await this.diseasesService.addDiseaseToUserPlant(disease, plant);
  }

  @Mutation(() => DeleteObjectResponse)
  async deleteDiseaseFromUserPlant(
    @Args('diseaseUuid') diseaseUuid: string,
    @Args('plantUuid') plantUuid: string,
  ): Promise<DeleteObjectResponse> {
    return await this.diseasesService.deleteDiseaseFromUserPlant(diseaseUuid, plantUuid);
  }

  @Query(() => DiseaseResponse)
  async findDisease(@Args('input') input: FindDiseaseInput): Promise<DiseaseResponse> {
    return await this.diseasesService.findDisease(input);
  }

  @Query(() => DiseasesResponse)
  async findDiseases(@Args('input') input: DiseasesInput): Promise<DiseasesResponse> {
    return await this.diseasesService.findDiseases(input);
  }

  @Query(() => DiseasesResponse)
  async plantDiseases(@Args('input') input: PlantDiseasesInput): Promise<DiseasesResponse> {
    return await this.diseasesService.plantDiseases(input);
  }
}
