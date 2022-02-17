import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { DeleteObjectResponse } from '../graphql/responses/deleteObject.response';
import { CreateHarvestInput } from './dto/createHarvest.input';
import { FindHarvestInput } from './dto/findHarvest.input';
import { HarvestResponse } from './responses/harvest.response';

@Injectable()
export class DiseasesService {
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

  async deleteHarvest(input: FindHarvestInput): Promise<DeleteObjectResponse> {
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
}
