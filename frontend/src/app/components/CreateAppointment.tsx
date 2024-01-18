'use client'
import Link from 'next/link';
import useCustomers from '../hooks/useCustomers';
import { useState } from 'react';

export default function CreateAppointment() {
  const [customerID, setCustomerID] = useState('');
  const [customer, setCustomer] = useState('');
  const customers = useCustomers();

  function checkCustomers() {
    const customerFound = customers?.find(customer => customer.identificationNumber === customerID)
    console.log(customerFound)
    if(customerFound) setCustomer(customerFound.name.toString())
  }

  return (
    <div className="mb-4">
      <div className="mb-5 text-2xl">New Appointment</div>
      <div className="flex flex-row flex-wrap	w-10/12 justify-between">
        <div className="space-x-1">
          <label htmlFor="StartDate">Start Date:</label>
          <input type="text" placeholder="Start Date"/>
        </div>
        <div className="space-x-1">
          <label htmlFor="EndDate">End Date:</label>
          <input type="text" placeholder="End Date"/>
        </div>
        <div className="space-x-1">
          <label htmlFor="Name">CustomerID:</label>
          <input type="text" placeholder="ID" onChange={(e) => setCustomerID(e.target.value)}/>
          <button onClick={checkCustomers} className="bg-slate-500 hover:bg-slate-700 btn">Search</button>
        </div>
      </div>
      <div className="flex flex-row w-2/3 my-5">
        <div className="space-x-1">
          {customer !== '' ?
          (
            <div className="flex flex-row">
              <div className="mr-4">Customer: {customer}</div>
              <button onClick={() => setCustomer('')} className="bg-red-400 hover:bg-red-700 btn">
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
          <button className="bg-blue-500 hover:bg-blue-700 btn">
            Add Appoinment
          </button>
        </div>
    </div>
  );
};
