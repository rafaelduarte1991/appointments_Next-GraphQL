import { IsDate, IsString, isString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCustomerInput {
  @Field()
  @IsString()
  name: String;

  @Field()
  @IsString()
  phone: String;

  @Field()
  @IsString()
  address: String;

  @Field()
  @IsString()
  identificationNumber: String;
}