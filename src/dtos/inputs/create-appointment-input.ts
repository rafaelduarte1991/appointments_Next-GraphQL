import { IsDate, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateAppointmentInput {
  @Field()
  @IsString()
  customerId: String;

  @Field()
  @IsDate()
  startsAt: Date;

  @Field()
  @IsDate()
  endsAt: Date;
}