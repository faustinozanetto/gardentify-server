import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { parsePlantType } from '../../utils/plantUtils';
import { DeleteObjectResponse } from '../graphql/responses/deleteObject.response';
import { CreateUserPlantInput } from './dto/create-user-plant.input';
import { FindUserPlantsInput } from './dto/find-user-plants.input';
import { FindUserPlantInput } from './dto/find-user-plant.input';
import { UserPlantResponse } from './responses/user-plant.response';
import { UserPlantsEdge, UserPlantsResponse } from './responses/user-plants.response';
import { parseUserAuthProvider } from 'utils/userUtilts';
import { UpdateUserPlantInput } from './dto/update-user-plant.input';

@Injectable()
export class UserPlantsService {
  constructor(private prisma: PrismaService) {}

  async findUserPlant(input: FindUserPlantInput): Promise<UserPlantResponse> {
    // Serach for plant.
    const foundPlant = await this.prisma.userPlant.findUnique({
      where: {
        ...input,
      },
      include: {
        diseases: { include: { disease: true } },
        harvests: true,
        plot: true,
        user: true,
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

    const mappedDiseases = foundPlant.diseases.map((d) => d.disease);
    const parsedAuthProvider = parseUserAuthProvider(foundPlant?.user?.authProvider);

    // Plant found.
    return {
      plant: {
        ...foundPlant,
        type: parsePlantType(foundPlant.type),
        diseases: mappedDiseases,
        user: {
          ...foundPlant.user,
          authProvider: parsedAuthProvider,
        },
      },
    };
  }

  async createUserPlant(input: CreateUserPlantInput): Promise<UserPlantResponse> {
    const createdPlant = await this.prisma.userPlant.create({
      data: {
        name: input.name,
        scientificName: input.scientificName,
        variety: input.variety,
        image: input.image,
        plantedSeedsOn: input.plantedSeedsOn,
        seedsSproutedOn: input.seedsSproutedOn,
        user: { connect: { uuid: input.userUuid } },
        type: parsePlantType(input.type),
      },
      include: {
        harvests: true,
        plot: true,
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

    //const mappedDiseases = createdPlant.diseases.map((d) => d.disease);

    // Return created plant
    return {
      plant: {
        ...createdPlant,
        type: parsePlantType(createdPlant.type),
        diseases: [],
      },
    };
  }

  async deleteUserPlant(input: FindUserPlantInput): Promise<DeleteObjectResponse> {
    try {
      await this.prisma.userPlant.delete({
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

  async findUserPlants(input: FindUserPlantsInput): Promise<UserPlantsResponse> {
    // Fetch plants
    const plants = await this.prisma.userPlant.findMany({
      take: input.take,
      skip: input.skip,
      where: { ...input.where },
      orderBy: { createdAt: 'desc' },
      include: {
        plot: true,
        harvests: true,
        diseases: { include: { disease: true } },
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

    const mappedPlants: UserPlantsEdge[] = edges.map((e) => {
      const mappedDiseases = e.e.diseases.map((d) => d.disease);
      return {
        cursor: e.cursor,
        node: {
          ...e.e,
          type: parsePlantType(e.e.type),
          diseases: mappedDiseases,
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

  async updateUserPlant(input: UpdateUserPlantInput): Promise<UserPlantResponse> {
    try {
      const updatedPlant = await this.prisma.userPlant.update({
        where: {
          uuid: input.uuid,
        },
        data: { ...input },
      });

      // Plant updated
      return {
        plant: {
          ...updatedPlant,
          type: parsePlantType(updatedPlant.type),
        },
      };
    } catch (error) {
      // Error happened
      return {
        errors: [{ field: 'uuid', message: 'Failed to update plant' }],
      };
    }
  }
}
