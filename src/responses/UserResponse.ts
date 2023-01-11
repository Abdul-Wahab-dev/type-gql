import { Field, ObjectType } from "type-graphql";
import { User } from "../schema/User";
@ObjectType()
export class UserResponse {
  @Field((type) => [User])
  users: User[];

  @Field(() => Number)
  total: number;
}
