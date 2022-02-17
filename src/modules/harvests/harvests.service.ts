import { Injectable } from '@nestjs/common';
import { FindPlantInput } from 'modules/plants/dto/find-plant.input';
import { PrismaService } from 'nestjs-prisma';
import { DeleteObjectResponse } from '../graphql/responses/deleteObject.response';
import { CreateHarvestInput } from './dto/createHarvest.input';
import { FindHarvestInput } from './dto/findHarvest.input';
import { PlantHarvestsInput } from './dto/plant-harvests.input';
import { HarvestResponse } from './responses/harvest.response';
import { HarvestsEdge, HarvestsResponse } from './responses/harvests.response';

@Injectable()
export class HarvestsService {
  constructor(private prisma: PrismaService) {}

  async findHarvest(input: FindHarvestInput): Promise<HarvestResponse> {
    // Serach for harvest.
    const foundHarvest = await this.prisma.harvest.findUnique({
      where: {
        uuid: input.uuid,
      },
    });

    // Harvest not found.
    if (!foundHarvest) {
      return {
        errors: [
          {
            field: 'uuid',
            message: 'Harvest not found',
          },
        ],
      };
    }

    // Harvest found.
    return {
      harvest: foundHarvest,
    };
  }

  async createPlantHarvest(input: CreateHarvestInput): Promise<HarvestResponse> {
    const createdHarvest = await this.prisma.harvest.create({
      data: {
        amountHarvested: input.amountHarvested,
        harvestWeight: input.harvestWeight,
        plant: { connect: { uuid: input.plantUuid } },
      },
    });

    // Failed to create
    if (!createdHarvest) {
      return {
        errors: [
          {
            field: 'input',
            message: 'Failed to create harvest',
          },
        ],
      };
    }

    // Return created harvest
    return {
      harvest: createdHarvest,
    };
  }

  async deletePlantHarvest(input: FindHarvestInput): Promise<DeleteObjectResponse> {
    try {
      await this.prisma.harvest.delete({
        where: {
          uuid: input.uuid,
        },
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        errors: [{ field: 'uuid', message: 'Failed to delete harvest' }],
      };
    }
  }

  async plantHarvests(input: PlantHarvestsInput): Promise<HarvestsResponse> {
    // Fetch diseases
    const harvests = await this.prisma.harvest.findMany({
      take: input.take,
      skip: input.skip,
      where: { plant: { is: input.where } },
      orderBy: { createdAt: 'desc' },
    });

    // Error handling
    if (!harvests.length) {
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
          createdAt: { lt: harvests[harvests.length - 1].createdAt },
        },
      }),
    );

    // Map edges.
    const edges = harvests.map((e) => ({
      cursor: e.createdAt,
      e,
    }));

    const mappedHarvests: HarvestsEdge[] = edges.map((e) => {
      return {
        cursor: e.cursor,
        node: {
          ...e.e,
        },
      };
    });

    return {
      count: harvests.length,
      edges: mappedHarvests,
      pageInfo: {
        hasMore,
        startCursor: edges[0].cursor,
        endCursor: edges[edges.length - 1].cursor,
      },
    };
  }
}
