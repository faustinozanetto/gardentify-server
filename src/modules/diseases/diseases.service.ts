import { Injectable } from '@nestjs/common';
import { DeleteObjectResponse } from 'modules/graphql/responses/deleteObject.response';
import { FindPlantInput } from 'modules/plants/dto/findPlant.input';
import { PrismaService } from 'nestjs-prisma';
import { DiseaseCreateInput } from './dto/disease-create.input';
import { DiseasesInput } from './dto/diseases.input';
import { FindDiseaseInput } from './dto/find-disease.input';
import { DiseaseResponse } from './responses/disease.response';
import { DiseasesEdge, DiseasesResponse } from './responses/diseases.response';

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

  async addDiseaseToPlant(
    disease: FindDiseaseInput,
    plant: FindPlantInput,
  ): Promise<DiseaseResponse> {
    try {
      const updatedDisease = await this.prisma.diseasesOnPlants.create({
        data: {
          disease: { connect: disease },
          plant: { connect: plant },
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

  async findDiseases(input: DiseasesInput): Promise<DiseasesResponse> {
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
}
