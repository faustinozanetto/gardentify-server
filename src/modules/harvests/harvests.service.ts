import { Injectable } from '@nestjs/common';
import { FindUserPlantInput } from 'modules/user-plants/dto/find-user-plant.input';
import { PrismaService } from 'nestjs-prisma';
import { DeleteObjectResponse } from '../graphql/responses/deleteObject.response';
import { CreateHarvestInput } from './dto/create-harvest.input';
import { FindHarvestInput } from './dto/find-harvest.input';
import { PlantHarvestsInput } from './dto/plant-harvests.input';
import { UpdateHarvestInput } from './dto/update-harvest.input';
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

  async createUserPlantHarvest(input: CreateHarvestInput): Promise<HarvestResponse> {
    const createdHarvest = await this.prisma.harvest.create({
      data: {
        image: input.image,
        harvestedOn: input.harvestedOn,
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

  async deleteUserPlantHarvest(input: FindHarvestInput): Promise<DeleteObjectResponse> {
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

  async userPlantHarvests(input: PlantHarvestsInput): Promise<HarvestsResponse> {
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
      await this.prisma.harvest.count({
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

  async updateHarvest(input: UpdateHarvestInput): Promise<HarvestResponse> {
    try {
      const updatedHarvest = await this.prisma.harvest.update({
        where: {
          uuid: input.uuid,
        },
        data: {
          ...input,
        },
      });

      // Updated harvest.
      return {
        harvest: updatedHarvest,
      };
    } catch (error) {
      return {
        errors: [{ field: 'input', message: 'Failed to update harvest' }],
      };
    }
  }
}
