import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateAppointmentInput } from "../dtos/inputs/create-appointment-input";
import { Appointment } from "../dtos/models/appointment-model";

const appointments: Appointment[] = []

@Resolver()
export class appointmentsResolver {
  @Query(() => [Appointment])
  async appointments() {
    return appointments;
  }

  @Mutation(() => Appointment)
  async createAppointment(@Arg('data') data: CreateAppointmentInput): Promise<Appointment>  {
    const appointment = {
      startsAt: data.startsAt,
      endsAt: data.endsAt,
    }
    appointments.push(appointment)
    return appointment;
  }
}