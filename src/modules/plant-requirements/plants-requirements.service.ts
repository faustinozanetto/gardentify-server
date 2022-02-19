import { Injectable } from '@nestjs/common';
import { DeleteObjectResponse } from 'modules/graphql/responses/deleteObject.response';
import { PrismaService } from 'nestjs-prisma';
import { FindPlantRequirementsInput } from './dto/find-plant-requirements.input';
import { PlantRequirementsCreateInput } from './dto/plant-requirements-create.input';
import { PlantRequirementsResponse } from './responses/plant-requirements.response';

@Injectable()
export class PlantsRequirementsService {
  constructor(private prisma: PrismaService) {}

  async createPlantRequirements(
    input: PlantRequirementsCreateInput,
  ): Promise<PlantRequirementsResponse> {
    const plantRequirements = await this.prisma.plantRequirements.create({
      data: {
        ...input,
      },
    });

    // Error handling
    if (!plantRequirements) {
      return {
        errors: [{ field: 'input', message: 'Failed to create plant requirements' }],
      };
    }

    // Return
    return {
      plantRequirements,
    };
  }

  async deletePlantRequirements(input: FindPlantRequirementsInput): Promise<DeleteObjectResponse> {
    try {
      await this.prisma.plantRequirements.delete({
        where: { ...input },
      });
      // Success
      return { success: true };
    } catch (error) {
      // Error
      return { success: false, errors: [{ field: 'input', message: error.message }] };
    }
  }
}
