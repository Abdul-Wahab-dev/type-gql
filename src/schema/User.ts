import { ObjectType, Field } from "type-graphql";
import { Post } from "./Post";
import { ROLE } from "../enums/UserEnum";

@ObjectType()
export class User {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field((type) => ROLE)
  role: string;

  password?: string;
}
