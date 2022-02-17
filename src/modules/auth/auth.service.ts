import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { AuthenticationProvider, UserDetails } from './auth';

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(private prisma: PrismaService) {}

  async validateUser(details: UserDetails) {
    const user = await this.prisma.user.findUnique({
      where: { oauthId: details.oauthId ?? '' },
    });

    if (user) {
      await this.prisma.user.update({
        where: {
          oauthId: details.oauthId ?? '',
        },
        data: details,
      });
      return user;
    }
    return this.createUser(details);
  }

  async createUser(details: UserDetails) {
    return await this.prisma.user.create({
      data: {
        ...details,
      },
    });
  }

  async findUser(oauthId: string): Promise<User | undefined> {
    return await this.prisma.user.findUnique({
      where: { oauthId: oauthId ?? '' },
    });
  }
}
