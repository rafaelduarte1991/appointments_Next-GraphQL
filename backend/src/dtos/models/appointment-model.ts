import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Appointment {
  @Field()
  _id: String;

  @Field()
  startsAt: Date;

  @Field()
  endsAt: Date;

  @Field()
  customerId: String;
}