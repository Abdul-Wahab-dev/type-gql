import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Post {
  @Field(() => Number)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => Boolean)
  published: boolean;

  @Field(() => Number)
  authorId: number;
}
