import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PlantsRequirementsService {
  constructor(private prisma: PrismaService) {}
}
