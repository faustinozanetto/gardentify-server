import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { parsePlantType } from 'utils/plantUtils';
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
        diseases: null,
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
}
