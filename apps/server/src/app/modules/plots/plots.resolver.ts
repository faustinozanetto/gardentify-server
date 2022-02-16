import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeleteObjectResponse } from '../graphql/responses/deleteObject.response';
import { PlantsResponse } from '../plants/responses/plants.response';
import { CreatePlotInput } from './dto/createPlot.input';
import { PlotPlantsInput } from './dto/plotPlants.input';
import { UserPlotsInput } from './dto/userPlots.input';
import { Plot } from './models/plot.model';
import { PlotsService } from './plots.service';
import { PlotResponse } from './responses/plot.response';
import { PlotsResponse } from './responses/plots.response';

@Resolver(() => Plot)
export class PlotsResolver {
  constructor(private plotsService: PlotsService) {}

  @Query(() => PlotResponse)
  async plotByUuid(@Args('uuid') uuid: string): Promise<PlotResponse> {
    return await this.plotsService.plotByUuid(uuid);
  }

  @Mutation(() => PlotResponse)
  async createPlot(
    @Args('input') input: CreatePlotInput
  ): Promise<PlotResponse> {
    return await this.plotsService.createPlot(input);
  }

  @Mutation(() => DeleteObjectResponse)
  async deletePlot(@Args('uuid') uuid: string): Promise<DeleteObjectResponse> {
    return await this.plotsService.deletePlot(uuid);
  }
  
  @Query(() => PlotsResponse)
  async userPlots(
    @Args('input') input: UserPlotsInput
  ): Promise<PlotsResponse> {
    return await this.plotsService.userPlots(input);
  }

  @Query(() => PlantsResponse)
  async plotPlants(
    @Args('input') input: PlotPlantsInput
  ): Promise<PlantsResponse> {
    return await this.plotsService.plotPlants(input);
  }
}
