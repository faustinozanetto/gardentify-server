import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePlotInput {
  @Field(() => String, { nullable: false })
  uuid: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Float, { nullable: true })
  sizeX?: number;

  @Field(() => Float, { nullable: true })
  sizeY?: number;

  @Field(() => Float, { nullable: true })
  dirtDepth?: number;

  @Field(() => String, { nullable: true })
  image?: string;
}
