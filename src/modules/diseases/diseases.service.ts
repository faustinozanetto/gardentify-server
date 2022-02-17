import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { DiseasesInput } from './dto/diseases.input';
import { DiseasesEdge, DiseasesResponse } from './responses/diseases.response';

@Injectable()
export class DiseasesService {
  constructor(private prisma: PrismaService) {}

  async findDiseases(input: DiseasesInput): Promise<DiseasesResponse> {
    // Fetch diseases
    const diseases = await this.prisma.disease.findMany({
      take: input.take,
      skip: input.skip,
      where: input.where,
      orderBy: { createdAt: 'desc' },
    });

    // Error handling
    if (!diseases.length) {
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
          createdAt: { lt: diseases[diseases.length - 1].createdAt },
        },
      }),
    );

    // Map edges.
    const edges = diseases.map((e) => ({
      cursor: e.createdAt,
      e,
    }));

    const mappedDiseases: DiseasesEdge[] = edges.map((e) => {
      return {
        cursor: e.cursor,
        node: {
          ...e.e,
        },
      };
    });

    return {
      count: diseases.length,
      edges: mappedDiseases,
      pageInfo: {
        hasMore,
        startCursor: edges[0].cursor,
        endCursor: edges[edges.length - 1].cursor,
      },
    };
  }
}
