import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { parsePlantType } from '../../utils/plantUtils';
import { DeleteObjectResponse } from '../graphql/responses/deleteObject.response';
import { CreatePlantInput } from './dto/createPlant.input';
import { FindPlantInput } from './dto/findPlant.input';
import { PlantResponse } from './responses/plant.response';

@Injectable()
export class PlantsService {
  constructor(private prisma: PrismaService) {}

  async plantByUuid(uuid: string): Promise<PlantResponse> {
    // Serach for plant.
    const foundPlant = await this.prisma.plant.findUnique({
      where: {
        uuid: uuid,
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
      },
    };
  }

  async createPlant(input: CreatePlantInput): Promise<PlantResponse> {
    const createdPlant = await this.prisma.plant.create({
      data: {
        scientificName: input.scientificName,
        variety: input.variety,
        image: input.image,
        plantedSeedsOn: input.plantedSeedsOn,
        seedsSproutedOn: input.seedsSproutedOn,
        type: parsePlantType(input.type),
        plot: { connect: { uuid: input.plotUuid } },
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

    // Return created plant
    return {
      plant: {
        ...createdPlant,
        type: parsePlantType(createdPlant.type),
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
