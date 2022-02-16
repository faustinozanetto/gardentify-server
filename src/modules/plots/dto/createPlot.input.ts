import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePlotInput {
  @Field(() => String, { nullable: false })
  userUuid: string;

  @Field(() => Float, { nullable: false })
  sizeX: number;

  @Field(() => Float, { nullable: false })
  sizeY: number;

  @Field(() => Float, { nullable: false })
  dirtDepth: number;
}
