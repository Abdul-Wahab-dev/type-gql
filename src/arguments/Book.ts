import { Field, InputType, ArgsType } from "type-graphql";

@ArgsType()
export class bookArgs {
  @Field(() => String)
  id: String;

  @Field(() => String)
  name: String;

  @Field(() => Number)
  price: Number;
}
