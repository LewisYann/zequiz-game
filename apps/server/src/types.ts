import { InputType, Field } from "type-graphql";

@InputType()
export class UserInput {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  firstname!: string;

  @Field(() => String)
  lastname!: string;

  @Field(() => String)
  email!: string;
  
  @Field(() => String)
  password!: string;
}
