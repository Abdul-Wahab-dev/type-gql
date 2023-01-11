import { ObjectType, Field } from "type-graphql";
import { Post } from "./Post";
import { ROLE } from "../enums/UserEnum";

@ObjectType()
export class User {
  @Field(() => Number)
  id: number;

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => [Post])
  posts?: Post[];

  @Field((type) => ROLE)
  role: ROLE;
}
