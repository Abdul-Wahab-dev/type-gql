import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Book {
  @Field(() => String)
  id: String;

  @Field(() => String)
  name: String;

  @Field(() => Number)
  price: Number;
}
