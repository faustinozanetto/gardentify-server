import { Injectable } from '@nestjs/common';
import { DeleteObjectResponse } from 'modules/graphql/responses/deleteObject.response';
import { FindUserPlantInput } from 'modules/user-plants/dto/find-user-plant.input';
import { PrismaService } from 'nestjs-prisma';
import { DiseaseCreateInput } from './dto/disease-create.input';
import { FindDiseasesInput } from './dto/find-diseases.input';
import { FindDiseaseInput } from './dto/find-disease.input';
import { PlantDiseasesInput } from './dto/plant-diseases.input';
import { DiseaseResponse } from './responses/disease.response';
import { DiseasesEdge, DiseasesResponse } from './responses/diseases.response';
import { FindPlantInput } from 'modules/plant/dto/find-plant.input';
import { AddDiseaseToUserPlantInput } from './dto/add-disease-to-user-plant.input';

@Injectable()
export class DiseasesService {
  constructor(private prisma: PrismaService) {}

  async createDisease(input: DiseaseCreateInput): Promise<DiseaseResponse> {
    const disease = await this.prisma.disease.create({
      data: {
        scientificName: input.scientificName,
        description: input.description,
        image: input.image,
      },
    });

    // Could not create
    if (!disease) {
      return {
        errors: [
          {
            field: 'input',
            message: 'Could not create disease',
          },
        ],
      };
    }

    // Return created
    return {
      disease,
    };
  }

  async deleteDisease(input: FindDiseaseInput): Promise<DeleteObjectResponse> {
    try {
      await this.prisma.disease.delete({
        where: input,
      });
      // Delete.
      return {
        success: true,
      };
    } catch (error: unknown) {
      // Could not delete.
      return {
        errors: [
          {
            field: 'input',
            message: 'Could not delete disease',
          },
        ],
        success: false,
      };
    }
  }

  // TODO: Maybe instead of finding a disease add the option to create one on the fly.
  async addDiseaseToUserPlant(
    disease: FindDiseaseInput,
    plant: FindUserPlantInput,
    input: AddDiseaseToUserPlantInput,
  ): Promise<DiseaseResponse> {
    try {
      const updatedDisease = await this.prisma.diseasesOnPlants.create({
        data: {
          disease: { connect: disease },
          plant: { connect: plant },
          appearedOn: input.appearedOn,
        },
        include: { disease: true },
      });
      // Return updated disease.
      return {
        disease: updatedDisease.disease,
      };
    } catch (error: unknown) {
      // Could not add disease.
      return {
        errors: [
          {
            field: 'disease',
            message: 'Could not add disease to plant',
          },
        ],
      };
    }
  }

  async deleteDiseaseFromUserPlant(
    diseaseUuid: string,
    plantUuid: string,
  ): Promise<DeleteObjectResponse> {
    try {
      await this.prisma.diseasesOnPlants.delete({
        where: {
          plantUuid_diseaseUuid: {
            diseaseUuid: diseaseUuid,
            plantUuid: plantUuid,
          },
        },
      });
      // Completed
      return {
        success: true,
      };
    } catch (error: unknown) {
      // Failed to delete.
      return {
        errors: [
          {
            field: 'disease',
            message: 'Could not delete disease from plant',
          },
        ],
        success: false,
      };
    }
  }

  async addDiseaseToPlant(
    disease: FindDiseaseInput,
    plant: FindPlantInput,
  ): Promise<DiseaseResponse> {
    try {
      const updatedDisease = await this.prisma.plant.update({
        where: {
          uuid: plant.uuid,
        },
        data: { diseases: { connect: { uuid: disease.uuid } } },
        include: { diseases: true },
      });
      // Return updated disease.
      return {
        disease: updatedDisease.diseases.find((d) => d.uuid === disease.uuid),
      };
    } catch (error: unknown) {
      // Could not add disease.
      return {
        errors: [
          {
            field: 'disease',
            message: 'Could not add disease to plant',
          },
        ],
      };
    }
  }

  async deleteDiseaseFromPlant(
    diseaseUuid: string,
    plantUuid: string,
  ): Promise<DeleteObjectResponse> {
    try {
      await this.prisma.plant.update({
        where: {
          uuid: plantUuid,
        },
        data: { diseases: { delete: { uuid: diseaseUuid } } },
      });
      // Completed
      return {
        success: true,
      };
    } catch (error: unknown) {
      // Failed to delete.
      return {
        errors: [
          {
            field: 'disease',
            message: 'Could not delete disease from plant',
          },
        ],
        success: false,
      };
    }
  }

  async findDisease(input: FindDiseaseInput): Promise<DiseaseResponse> {
    // Fetch disease
    const disease = await this.prisma.disease.findUnique({
      where: input,
    });

    // Error handling
    if (!disease) {
      return {
        errors: [
          {
            field: 'input',
            message: 'Could not find disease',
          },
        ],
      };
    }

    // Return disease
    return {
      disease,
    };
  }

  async findDiseases(input: FindDiseasesInput): Promise<DiseasesResponse> {
    // Fetch diseases
    const diseases = await this.prisma.disease.findMany({
      take: input.take,
      skip: input.skip,
      where: input.where,
      orderBy: { createdAt: 'desc' },
    });

    // Error handling
    if (!diseases.length) {
      return {
        count: 0,
        edges: [],
        pageInfo: {
          hasMore: false,
          startCursor: null,
          endCursor: null,
        },
      };
    }

    // Check if there are more pages
    const hasMore = Boolean(
      await this.prisma.disease.count({
        take: 1,
        where: {
          createdAt: { lt: diseases[diseases.length - 1].createdAt },
        },
      }),
    );

    // Map edges.
    const edges = diseases.map((e) => ({
      cursor: e.createdAt,
      e,
    }));

    const mappedDiseases: DiseasesEdge[] = edges.map((e) => {
      return {
        cursor: e.cursor,
        node: {
          ...e.e,
        },
      };
    });

    return {
      count: diseases.length,
      edges: mappedDiseases,
      pageInfo: {
        hasMore,
        startCursor: edges[0].cursor,
        endCursor: edges[edges.length - 1].cursor,
      },
    };
  }

  async userPlantDiseases(input: PlantDiseasesInput): Promise<DiseasesResponse> {
    // Get diseases.
    const plantDiseases = await this.prisma.diseasesOnPlants.findMany({
      where: {
        plant: { ...input.where },
      },
      take: input.take,
      skip: input.skip,
      orderBy: { disease: { createdAt: 'desc' } },
      include: {
        disease: true,
        plant: true,
      },
    });

    // Error handling
    if (!plantDiseases.length) {
      return {
        count: 0,
        edges: [],
        pageInfo: {
          hasMore: false,
          startCursor: null,
          endCursor: null,
        },
      };
    }

    // Check if there are more pages
    const hasMore = Boolean(
      await this.prisma.diseasesOnPlants.count({
        take: 1,
        where: {
          disease: { createdAt: { lt: plantDiseases[plantDiseases.length - 1].disease.createdAt } },
        },
      }),
    );

    // Map edges.
    const edges = plantDiseases.map((e) => ({
      cursor: e.disease.createdAt,
      e,
    }));

    const mappedDiseases: DiseasesEdge[] = edges.map((e) => {
      return {
        cursor: e.cursor,
        node: {
          ...e.e.disease,
          appearedOn: e.e.appearedOn,
        },
      };
    });

    return {
      count: plantDiseases.length,
      edges: mappedDiseases,
      pageInfo: {
        hasMore,
        startCursor: edges[0].cursor,
        endCursor: edges[edges.length - 1].cursor,
      },
    };
  }
}
