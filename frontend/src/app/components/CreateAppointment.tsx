'use client'
import Link from 'next/link';
import QueryGetCustomers from '../graphql/customers/Query';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import { CREATE_APPOINTMENT } from '../graphql/appointments/Mutations';
import { useMutation } from '@apollo/client';
import "react-datepicker/dist/react-datepicker.css";

interface Customers {
  name: String;
  phone: String;
  identificationNumber: string;
}

export default function CreateAppointment() {
  const [customerID, setCustomerID] = useState('');
  const [customer, setCustomer] = useState<Customers | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const customers = QueryGetCustomers();

  const [createAppointment] = useMutation(CREATE_APPOINTMENT);

  const handleCreateAppointment = async () => {
    try {
      const response = await createAppointment({
        variables: {
          data: {
            startsAt: new Date(startDate),
            endsAt: new Date(endDate),
            customerId: customer?.identificationNumber,
          },
        },
      });

      if (response?.data) {
        console.log('Appointment created successfully:', response.data);
      } else {
        console.error('Error creating appointment:', response.errors);
      }
    } catch (error: any) {
      console.error('Error creating appointment:', error.message);
    }
  };


  function checkCustomers() {
    const customerFound = customers?.find(customer => customer.identificationNumber === customerID)
    console.log(customerFound)
    if(customerFound) setCustomer(customerFound)
  }

  return (
    <div className="mb-4">
      <div className="mb-5 text-2xl">New Appointment</div>
      <div className="flex flex-row flex-wrap	w-10/12 justify-between">
        <div className="space-x-2 mr-6 mb-2">
          <label htmlFor="StartDate">Start Date:</label>
          <DatePicker
            value={startDate.toLocaleDateString('en-US') + ' - ' +  startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric'})}
            showTimeSelect
            onChange={(date:Date) => setStartDate(date)}
          />
        </div>
        <div className="space-x-2 mr-6 mb-2">
          <label htmlFor="EndDate">End Date:</label>
          <DatePicker
            value={endDate > startDate ? endDate.toLocaleDateString('en-US') + ' - ' +  endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric'}) : ('End date < Start date')}
            showTimeSelect
            onChange={(date:Date) => setEndDate(date)}
            />
        </div>
        <div className="space-x-2">
          <label htmlFor="Name">CustomerID:</label>
          <input className='mb-2' type="text" placeholder="ID" onChange={(e) => setCustomerID(e.target.value)}/>
          <button onClick={checkCustomers} className="bg-slate-500 hover:bg-slate-700 btn">Search</button>
        </div>
      </div>
      <div className="flex flex-row w-2/3 my-5">
        <div className="space-x-1">
          {customer !== null ?
          (
            <div className="flex flex-row">
              <div className="mr-4">Customer: {customer?.name.toString()}</div>
              <button onClick={() => setCustomer(null)} className="bg-red-400 hover:bg-red-700 btn">
                Clear
              </button>
            </div>
          )
          :
          (
          <div>
            <Link href="/customers">
              <button onClick={() => '/customers'} className="bg-blue-500 hover:bg-blue-700 btn">
                New Customer
              </button>
            </Link>
          </div>
          )}
        </div>
      </div>
      <div>
          <button onClick={handleCreateAppointment} className="bg-blue-500 hover:bg-blue-700 btn">
            Add Appoinment
          </button>
        </div>
    </div>
  );
};
