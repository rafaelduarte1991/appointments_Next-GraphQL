
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Customer {
  @Field()
  _id: String

  @Field()
  name: String

  @Field()
  phone: String

  @Field()
  address: String

  @Field()
  identificationNumber: String
}