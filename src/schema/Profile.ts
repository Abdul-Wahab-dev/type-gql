import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Profile {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  bio: string;

  @Field(() => Number)
  userId: number;
}
