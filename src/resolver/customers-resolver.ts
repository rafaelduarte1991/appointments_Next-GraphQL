import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Customer } from "../dtos/models/customer-model";
import { CreateCustomerInput } from "../dtos/inputs/create-customer-input";
import CustomerSchema from '../../models/customers'

@Resolver(() => Customer)
export class customerResolver {

  @Query(()=> [Customer])
  async getCustomers() {
    return await CustomerSchema.find();
  }

  @Query(()=> Customer)
  async getCustomersById(@Arg('id') ID: String) {
    return await CustomerSchema.findById(ID);
  }

  @Mutation(() => Customer)
  async createCustomer(@Arg('data') data: CreateCustomerInput): Promise<Customer>  {
    const customer = new CustomerSchema ({
      name: data.name,
      address: data.address,
      phone: data.phone,
      identificationNumber: data.identificationNumber,
    })
    customer.save();
    return customer;
  }

  @Mutation(() => Number)
  async deleteCustomer(@Arg('id') ID: String) {
    const customerDeleted = (await CustomerSchema.deleteOne({_id: ID})).deletedCount;
    return customerDeleted;
  }

  @Mutation(() => Number)
  async editCustomer(@Arg('id') ID: String, @Arg('data') { name, address, phone, identificationNumber}: CreateCustomerInput) {
    const customerModified = (await CustomerSchema.updateOne({_id: ID}, { name:name, address:address, phone:phone, identificationNumber:identificationNumber}));
    return customerModified;
  }
}