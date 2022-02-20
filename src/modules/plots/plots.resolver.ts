import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeleteObjectResponse } from '../graphql/responses/deleteObject.response';
import { UserPlantsResponse } from '../user-plants/responses/user-plants.response';
import { CreatePlotInput } from './dto/create-plot.input';
import { FindPlotInput } from './dto/find-plot.inputs';
import { PlotPlantsInput } from './dto/plot-user-plants.input';
import { UserPlotsInput } from './dto/user-plots.input';
import { Plot } from './models/plot.model';
import { PlotsService } from './plots.service';
import { PlotPlantResponse } from './responses/plot-plant.response';
import { PlotUserPlantsResponse } from './responses/plot-user-plants.response';
import { PlotResponse } from './responses/plot.response';
import { PlotsResponse } from './responses/plots.response';

@Resolver(() => Plot)
export class PlotsResolver {
  constructor(private plotsService: PlotsService) {}

  /*===================QUERIES===================*/

  @Query(() => PlotResponse, {
    description: 'Returns, if found, a plot with the given input.',
  })
  async findPlot(@Args('input') input: FindPlotInput): Promise<PlotResponse> {
    return await this.plotsService.plotByUuid(input);
  }

  @Query(() => PlotsResponse, {
    description: 'Returns all the user´s plots.',
  })
  async userPlots(@Args('input') input: UserPlotsInput): Promise<PlotsResponse> {
    return await this.plotsService.userPlots(input);
  }

  @Query(() => PlotUserPlantsResponse, {
    description: 'Returns all the plants in a specific user´s plot.',
  })
  async plotUserPlants(@Args('input') input: PlotPlantsInput): Promise<PlotUserPlantsResponse> {
    return await this.plotsService.plotUserPlants(input);
  }

  /*===================MUTATIONS===================*/

  @Mutation(() => PlotResponse)
  async createPlot(@Args('input') input: CreatePlotInput): Promise<PlotResponse> {
    return await this.plotsService.createPlot(input);
  }

  @Mutation(() => DeleteObjectResponse)
  async deletePlot(@Args('uuid') uuid: string): Promise<DeleteObjectResponse> {
    return await this.plotsService.deletePlot(uuid);
  }

  @Mutation(() => PlotPlantResponse)
  async addUserPlantToPlot(
    @Args('plotUuid') plotUuid: string,
    @Args('plantUuid') plantUuid: string,
  ): Promise<PlotPlantResponse> {
    return await this.plotsService.addUserPlantToPlot(plotUuid, plantUuid);
  }

  @Mutation(() => DeleteObjectResponse, {
    description: 'Removes the plant from the current plot if assigned',
  })
  async deleteUserPlantFromPlot(
    @Args('plantUuid') plantUuid: string,
  ): Promise<DeleteObjectResponse> {
    return await this.plotsService.deleteUserPlantFromPlot(plantUuid);
  }
}
