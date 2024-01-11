import { Field, ObjectType } from "type-graphql";
import { Customer } from "./customer-model";

@ObjectType()
export class Appointment {
  @Field()
  startsAt: Date;

  @Field()
  endsAt: Date;

}