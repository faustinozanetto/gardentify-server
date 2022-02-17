import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { parsePlantType } from '../../utils/plantUtils';
import { DeleteObjectResponse } from '../graphql/responses/deleteObject.response';
import { PlantsEdge, PlantsResponse } from '../plants/responses/plants.response';
import { CreatePlotInput } from './dto/createPlot.input';
import { PlotPlantsInput } from './dto/plotPlants.input';
import { UserPlotsInput } from './dto/userPlots.input';
import { PlotResponse } from './responses/plot.response';
import { PlotsEdge, PlotsResponse } from './responses/plots.response';

@Injectable()
export class PlotsService {
  constructor(private prisma: PrismaService) {}

  async plotByUuid(uuid: string): Promise<PlotResponse> {
    // Serach for plant.
    const foundPlot = await this.prisma.plot.findUnique({
      where: {
        uuid: uuid,
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
