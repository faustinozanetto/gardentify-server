import { Injectable } from '@nestjs/common';
import { DeleteObjectResponse } from 'modules/graphql/responses/deleteObject.response';
import { PrismaService } from 'nestjs-prisma';
import { parsePlantType } from 'utils/plantUtils';
import { CreatePlantInput } from './dto/create-plant.input';
import { FindPlantInput } from './dto/find-plant.input';
import { FindPlantsInput } from './dto/find-plants.input';
import { PlantResponse } from './responses/plant.response';
import { PlantsEdge, PlantsResponse } from './responses/plants.response';

@Injectable()
export class PlantsService {
  constructor(private prisma: PrismaService) {}

  // TODO: Check diseases.
  async findPlant(input: FindPlantInput): Promise<PlantResponse> {
    // Serach for plant.
    const foundPlant = await this.prisma.plant.findUnique({
      where: {
        ...input,
      },
      include: {
        diseases: true,
        requirements: true,
      },
    });

    // Plant not found.
    if (!foundPlant) {
      return {
        errors: [
          {
            field: 'uuid',
            message: 'Plant not found',
          },
        ],
      };
    }
    // Plant found.
    return {
      plant: {
        ...foundPlant,
        type: parsePlantType(foundPlant.type),
        diseases: foundPlant.diseases,
      },
    };
  }

  async findPlants(input: FindPlantsInput): Promise<PlantsResponse> {
    // Fetch plants
    const plants = await this.prisma.plant.findMany({
      take: input.take,
      skip: input.skip,
      where: { ...input.where },
      orderBy: { createdAt: 'desc' },
      include: {
        requirements: true,
      },
    });

    // Error handling
    if (!plants.length) {
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
      await this.prisma.userPlant.count({
        take: 1,
        where: {
          createdAt: { lt: plants[plants.length - 1].createdAt },
        },
      }),
    );

    // Map edges.
    const edges = plants.map((e) => ({
      cursor: e.createdAt,
      e,
    }));

    const mappedPlants: PlantsEdge[] = edges.map((e) => {
      return {
        cursor: e.cursor,
        node: {
          ...e.e,
          type: parsePlantType(e.e.type),
        },
      };
    });

    return {
      count: plants.length,
      edges: mappedPlants,
      pageInfo: {
        hasMore,
        startCursor: edges[0].cursor,
        endCursor: edges[edges.length - 1].cursor,
      },
    };
  }

  async createPlant(input: CreatePlantInput): Promise<PlantResponse> {
    const createdPlant = await this.prisma.plant.create({
      data: {
        scientificName: input.scientificName,
        name: input.name,
        description: input.description,
        variety: input.variety,
        image: input.image ?? '',
        type: parsePlantType(input.type),
        requirements: { connect: { uuid: input.requirementsUuid } },
      },
      include: {
        diseases: true,
        requirements: true,
      },
    });

    // Failed to create
    if (!createdPlant) {
      return {
        errors: [
          {
            field: 'input',
            message: 'Failed to create plant',
          },
        ],
      };
    }

    const mappedDiseases = createdPlant.diseases.map((d) => d);

    // Return created plant
    return {
      plant: {
        ...createdPlant,
        type: parsePlantType(createdPlant.type),
        diseases: mappedDiseases,
      },
    };
  }

  async deletePlant(input: FindPlantInput): Promise<DeleteObjectResponse> {
    try {
      await this.prisma.plant.delete({
        where: {
          uuid: input.uuid,
        },
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        errors: [{ field: 'uuid', message: 'Failed to delete plant' }],
      };
    }
  }
}
