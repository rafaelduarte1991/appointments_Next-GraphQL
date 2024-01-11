import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Customer } from "../dtos/models/customer-model";
import { CreateCustomerInput } from "../dtos/inputs/create-customer-input";

@Resolver(()=>Customer)
export class customerResolver {
  private allCustomers: Customer[] = [];

  getCustomers(): Customer[] {
    return this.allCustomers;
  }

  @Query(()=> [Customer])
  async customers() {
    return this.allCustomers;
  }

  @Mutation(() => Customer)
  async createCustomer(@Arg('data') data: CreateCustomerInput): Promise<Customer>  {
    const customer = {
      id: data.customerId,
      name: data.name,
      address: data.address,
      phone: data.phone,
      identificationNumber: data.identificationNumber,
    }
    this.allCustomers.push(customer)
    return customer;
  }
}