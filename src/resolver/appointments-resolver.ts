import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { CreateAppointmentInput } from "../dtos/inputs/create-appointment-input";
import { Appointment } from "../dtos/models/appointment-model";
import { Customer } from "../dtos/models/customer-model";

const appointments: Appointment[] = []

@Resolver(()=>Appointment)
export class appointmentsResolver {
  private customers: Customer[] = [];
  private getCustomerById(id: string): Customer | undefined {
    return this.customers.find(customer => customer.id === id);
  }

  @Query(() => [Appointment])
  async appointments() {
    return appointments;
  }

  @Mutation(() => Appointment)
  async createAppointment(@Arg('customerId') customerId: string, @Arg('data') data: CreateAppointmentInput): Promise<Appointment>  {
    const customer = await this.getCustomerById(customerId);
    const appointment = {
      startsAt: data.startsAt,
      endsAt: data.endsAt,
      customer: customer
    }
    appointments.push(appointment)
    return appointment;
  }
  @FieldResolver(()=> Customer)
  async customer(@Root() appointment:Appointment) {
    console.log(appointment)
    return appointment;
  }
}