import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class FindPlotInput {
  @Field(() => String, { nullable: true })
  uuid?: string;

  @Field(() => Float, { nullable: true })
  sizeX?: number;

  @Field(() => Float, { nullable: true })
  sizeY?: number;

  @Field(() => Float, { nullable: true })
  dirtDepth?: number;
}
