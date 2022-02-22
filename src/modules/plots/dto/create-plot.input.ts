import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePlotInput {
  @Field(() => String, { nullable: false })
  userUuid: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => Float, { nullable: false })
  sizeX: number;

  @Field(() => Float, { nullable: false })
  sizeY: number;

  @Field(() => Float, { nullable: false })
  dirtDepth: number;

  @Field(() => String, { nullable: true })
  image?: string;
}
