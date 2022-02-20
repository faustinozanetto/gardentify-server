import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { parseUserAuthProvider } from 'utils/userUtilts';
import { parsePlantType } from '../../utils/plantUtils';
import { DeleteObjectResponse } from '../graphql/responses/deleteObject.response';
import { UserPlantsEdge, UserPlantsResponse } from '../user-plants/responses/user-plants.response';
import { CreatePlotInput } from './dto/create-plot.input';
import { FindPlotInput } from './dto/find-plot.inputs';
import { PlotPlantsInput } from './dto/plot-user-plants.input';
import { UserPlotsInput } from './dto/user-plots.input';
import { PlotPlantResponse } from './responses/plot-plant.response';
import { PlotUserPlantsResponse } from './responses/plot-user-plants.response';
import { PlotResponse } from './responses/plot.response';
import { PlotsEdge, PlotsResponse } from './responses/plots.response';

@Injectable()
export class PlotsService {
  constructor(private prisma: PrismaService) {}

  async plotByUuid(input: FindPlotInput): Promise<PlotResponse> {
    // Serach for plant.
    const foundPlot = await this.prisma.plot.findUnique({
      where: { ...input },
      include: {
        user: true,
      },
    });

    // Plot not found.
    if (!foundPlot) {
      return {
        errors: [
          {
            field: 'uuid',
            message: 'Plot not found',
          },
        ],
      };
    }

    // Plot found.
    return {
      plot: {
        ...foundPlot,
        user: {
          ...foundPlot.user,
          authProvider: parseUserAuthProvider(foundPlot.user.authProvider),
        },
      },
    };
  }

  async createPlot(input: CreatePlotInput): Promise<PlotResponse> {
    const createdPlot = await this.prisma.plot.create({
      data: {
        sizeX: input.sizeX,
        sizeY: input.sizeY,
        dirtDepth: input.dirtDepth,
        image: input.image,
        name: input.name,
        user: {
          connect: {
            uuid: input.userUuid,
          },
        },
      },
    });

    // Failed to create
    if (!createdPlot) {
      return {
        errors: [
          {
            field: 'input',
            message: 'Failed to create plot',
          },
        ],
      };
    }

    // Return created plant
    return {
      plot: {
        ...createdPlot,
      },
    };
  }

  async deletePlot(uuid: string): Promise<DeleteObjectResponse> {
    try {
      await this.prisma.plot.delete({
        where: { uuid },
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        errors: [{ field: 'uuid', message: 'Failed to delete plot' }],
        success: false,
      };
    }
  }

  async addUserPlantToPlot(plotUuid: string, plantUuid: string): Promise<PlotPlantResponse> {
    const updatedPlant = await this.prisma.userPlant.update({
      where: {
        uuid: plantUuid,
      },
      data: {
        plot: { connect: { uuid: plotUuid } },
      },
      include: { plot: true },
    });

    // Error occurred
    if (!updatedPlant) {
      return {
        errors: [
          {
            field: 'plantUuid',
            message: 'Failed to add plant to plot',
          },
        ],
      };
    }

    // Plant added to plot
    return {
      plant: { ...updatedPlant, type: parsePlantType(updatedPlant.type) },
      plot: updatedPlant.plot,
    };
  }

  async deleteUserPlantFromPlot(plantUuid: string): Promise<DeleteObjectResponse> {
    const updatedPlant = await this.prisma.userPlant.update({
      where: { uuid: plantUuid },
      data: {
        plot: { disconnect: true },
      },
    });

    // Error occurred
    if (!updatedPlant) {
      return {
        errors: [
          {
            field: 'plantUuid',
            message: 'Failed to add plant to plot',
          },
        ],
        success: false,
      };
    }

    // Plant removed from plot
    return {
      success: true,
    };
  }

  async userPlots(input: UserPlotsInput): Promise<PlotsResponse> {
    // Fetch plots
    const plots = await this.prisma.plot.findMany({
      take: input.take,
      skip: input.skip,
      where: {
        user: {
          uuid: input.where.uuid,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Error handling
    if (!plots.length) {
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
      await this.prisma.plot.count({
        take: 1,
        where: {
          createdAt: { lt: plots[plots.length - 1].createdAt },
        },
      }),
    );

    // Map edges.
    const edges = plots.map((e) => ({
      cursor: e.createdAt,
      e,
    }));

    const mappedPlots: PlotsEdge[] = edges.map((e) => {
      return {
        cursor: e.cursor,
        node: {
          ...e.e,
        },
      };
    });

    return {
      count: plots.length,
      edges: mappedPlots,
      pageInfo: {
        hasMore,
        startCursor: edges[0].cursor,
        endCursor: edges[edges.length - 1].cursor,
      },
    };
  }

  async plotUserPlants(input: PlotPlantsInput): Promise<PlotUserPlantsResponse> {
    // Fetch plants
    const plants = await this.prisma.userPlant.findMany({
      take: input.take,
      skip: input.skip,
      where: {
        plot: { uuid: input.plotUuid },
      },
      include: { plot: true, harvests: true },
      orderBy: { createdAt: 'desc' },
    });

    // Error handling
    if (!plants.length) {
      return {
        count: 0,
        edges: [],
        plot: null,
        pageInfo: {
          hasMore: false,
          startCursor: null,
          endCursor: null,
        },
      };
    }

    // Check if there are more pages
    const hasMore = Boolean(
      await this.prisma.plant.count({
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
      return {
        cursor: e.cursor,
        node: {
          ...e.e,
          type: parsePlantType(e.e.type),
        },
      };
    });

    // TODO:  Maybe add a query to get the plot.
    return {
      count: plants.length,
      edges: mappedPlants,
      plot: plants[0].plot,
      pageInfo: {
        hasMore,
        startCursor: edges[0].cursor,
        endCursor: edges[edges.length - 1].cursor,
      },
    };
  }
}
