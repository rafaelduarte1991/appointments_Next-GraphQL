import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateAppointmentInput } from "../dtos/inputs/create-appointment-input";
import { Appointment } from "../dtos/models/appointment-model";
import AppointmentSchema from '../../models/appointments'

@Resolver(()=>Appointment)
export class appointmentsResolver {

  @Query(() => [Appointment])
  async getAppointments() {
    return await AppointmentSchema.find();
  }
  @Query(() => Appointment)
  async getAppointmentsById(@Arg('id') ID: String) {
    return await AppointmentSchema.findById(ID);
  }
  @Mutation(() => Appointment)
  async createAppointment(@Arg('data') data: CreateAppointmentInput): Promise<Appointment> {
    const appointment = new AppointmentSchema ({
      startsAt: data.startsAt,
      endsAt: data.endsAt,
      customerId: data.customerId
    })
    appointment.save();
    return appointment;
  }

  @Mutation(() => Number)
  async deleteAppointment(@Arg('id') ID: String) {
    const appointmentDeleted = (await AppointmentSchema.deleteOne({_id: ID})).deletedCount;
    return appointmentDeleted;
  }

  @Mutation(() => Number)
  async editAppointment(@Arg('id') ID: String, @Arg('data') {startsAt, endsAt, customerId}: CreateAppointmentInput) {
    const appointmentModified = (await AppointmentSchema.updateOne({_id: ID}, {startsAt:startsAt, endsAt: endsAt, customerId: customerId}));
    return appointmentModified;
  }
}