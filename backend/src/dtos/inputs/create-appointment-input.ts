import { IsDate, IsString, isString } from "class-validator";
import { ObjectId } from "mongoose";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateAppointmentInput {
  @Field()
  @IsDate()
  startsAt: Date;

  @Field()
  @IsDate()
  endsAt: Date;

  @Field()
  @IsString()
  customerId: String;

}