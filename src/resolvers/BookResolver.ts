import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Args,
  ArgsType,
  Field,
} from "type-graphql";

import { Book } from "../schema/Book";

@ArgsType()
class bookArgs {
  @Field(() => String)
  id: String;

  @Field(() => String)
  name: String;

  @Field(() => Number)
  price: Number;
}

@Resolver(() => Book)
export class BookResolver {
  @Query((returns) => Book)
  async hello(@Args() { id, name, price }: bookArgs): Promise<Book> {
    const Obj = {
      id,
      name,
      price,
    };
    return Obj;
  }
}
