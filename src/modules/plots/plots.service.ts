import { Injectable } from '@nestjs/common';
import { FindPlantInput } from 'modules/user-plants/dto/find-plant.input';
import { PrismaService } from 'nestjs-prisma';
import { parsePlantType } from '../../utils/plantUtils';
import { DeleteObjectResponse } from '../graphql/responses/deleteObject.response';
import { PlantsEdge, PlantsResponse } from '../user-plants/responses/plants.response';
import { CreatePlotInput } from './dto/createPlot.input';
import { FindPlotInput } from './dto/find-plot.inputs';
import { PlotPlantsInput } from './dto/plotPlants.input';
import { UserPlotsInput } from './dto/userPlots.input';
import { PlotPlantResponse } from './responses/plot-plant.response';
import { PlotResponse } from './responses/plot.response';
import { PlotsEdge, PlotsResponse } from './responses/plots.response';

@Injectable()
export class PlotsService {
  constructor(private prisma: PrismaService) {}

  async plotByUuid(input: FindPlotInput): Promise<PlotResponse> {
    // Serach for plant.
    const foundPlot = await this.prisma.plot.findUnique({
      where: { ...input },
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
      },
    };
  }

  async createPlot(input: CreatePlotInput): Promise<PlotResponse> {
    const createdPlot = await this.prisma.plot.create({
      data: {
        sizeX: input.sizeX,
        sizeY: input.sizeY,
        dirtDepth: input.dirtDepth,
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

  async addPlantToPlot(plotUuid: string, plantUuid: string): Promise<PlotPlantResponse> {
    const updatedPlant = await this.prisma.plant.update({
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

  async removePlantFromPlot(plantUuid: string): Promise<DeleteObjectResponse> {
    const updatedPlant = await this.prisma.plant.update({
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

  async plotPlants(input: PlotPlantsInput): Promise<PlantsResponse> {
    // Fetch plants
    const plants = await this.prisma.plant.findMany({
      take: input.take,
      skip: input.skip,
      where: {
        plot: { uuid: input.plotUuid },
      },
      orderBy: { createdAt: 'desc' },
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
