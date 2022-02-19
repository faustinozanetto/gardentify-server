import defaultConfig from './common/config/defaultConfig';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { GraphQLModule } from '@nestjs/graphql';
import { loggingMiddleware } from './common/middleware/logging.middlewere';
import { GqlConfigService } from './modules/graphql/graphql.config.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { UserPlantsModule } from './modules/user-plants/user-plants.module';
import { PlotsModule } from './modules/plots/plots.module';
import { HarvestsModule } from './modules/harvests/harvests.module';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DiseasesModule } from 'modules/diseases/diseases.module';
import { PlantsModule } from 'modules/plant/plants.module';

@Module({
  imports: [
    // Confige module setup.
    ConfigModule.forRoot({ isGlobal: true, load: [defaultConfig] }),
    PassportModule.register({ session: true }),

    // Prisma module setup.
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
      },
    }),

    // Graphql module setup.
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),

    AuthModule,
    UsersModule,
    PlantsModule,
    UserPlantsModule,
    PlotsModule,
    HarvestsModule,
    DiseasesModule,
  ],
})
export class AppModule {}
